"use client";

import { useState } from "react";
import { Api } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, Eye, Edit, Plus, Trash2 } from "lucide-react";
import { ApiForm } from "./ApiForm";
import { getGistContent, updateGistContent } from "@/lib/gistService";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
interface ApiListProps {
  apis: Api[];
  onViewApi: (api: Api) => void;
  setApis: (data: any) => void;
  deleteApi: (data: any) => void;
  loginMode: string;
  handleEditApi: (data: any) => void;

}

const ITEMS_PER_PAGE = 50;

export function ApiList({ apis, onViewApi, setApis, loginMode, deleteApi, handleEditApi }: ApiListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingApi, setEditingApi] = useState<Api | null>(null);

  const totalPages = Math.ceil(apis.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentApis = apis
  const [alert, setAlert] = useState<boolean>(false);
  const [seletedAPI, setSelectedAPI] = useState<Api | null>(null);
  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: "bg-blue-500",
      POST: "bg-green-500",
      PUT: "bg-yellow-500",
      DELETE: "bg-red-500",
      PATCH: "bg-purple-500",
    };
    return colors[method] || "bg-gray-500";
  };

  const handleAddApi = async (newApi: any) => {
    console.log("newAPi");
    const apiData = await getGistContent()
    if (!apiData.apis) {
      apiData.apis = []
    }
    apiData.apis.push(newApi);
    await updateGistContent(apiData)
    setApis(apiData.apis);
    setIsAddOpen(false);
  };

  const hendleDelete = () => {
    if (seletedAPI)
      deleteApi(seletedAPI);
  }

  return (
    <div className="space-y-4">
      {loginMode == "edit" && <div className="flex justify-end">
        <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add API
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[600px] sm:w-[840px]">
            <div className="h-full py-6 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-5">Add New API</h3>
              <ApiForm
                onSubmit={handleAddApi}
                onCancel={() => setIsAddOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Method</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Endpoint</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentApis.map((api) => (
            <TableRow key={api.apiId}>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${getMethodColor(api.method)} text-white`}
                >
                  {api.method}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{api.name}</TableCell>
              <TableCell className="font-mono text-sm">{api.endpoint}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewApi(api)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  {loginMode == "edit" && <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingApi(api)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[800px] sm:w-[740px]">
                      <div className="h-full py-6 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-5">Edit API</h3>
                        <ApiForm
                          api={api}
                          onSubmit={handleEditApi}
                          onCancel={() => setEditingApi(null)}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>}
                  {loginMode == "edit" && <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setSelectedAPI(api); setAlert(true) }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>}
                  <AlertDialog open={alert} onOpenChange={setAlert}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do you want Delete this API?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction onClick={() => hendleDelete()}>Delete</AlertDialogAction>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {
        totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )
      }
    </div >
  );
}
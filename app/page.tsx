"use client";

import { useEffect, useState } from "react";
import { ApiList } from "@/components/api/ApiList";
import { ApiDetail } from "@/components/api/ApiDetail";
import { Api } from "@/lib/types";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { getGistContent, updateGistContent } from "@/lib/gistService";
import { LoginForm } from "@/components/auth/LoginForm";
import { Loader } from "@/components/ui/loader";

export default function Home() {

  const [selectedApi, setSelectedApi] = useState<Api | null>(null);
  const [apis, setApis] = useState<any>([]);
  const [loginMode, setLoginMode] = useState<any>("unauthorized");
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      if (loginMode != "read" && loginMode != "edit") {
        return;
      }
      setLoading(true);
      const apiData = await getGistContent()
      console.log(apiData, 17);
      setApis(apiData.apis);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getData();
  }, [loginMode]);

  const deleteApi = async (api: Api) => {
    try {
      setLoading(true);
      const apiData = await getGistContent()
      apiData.apis = await apiData.apis.filter((apiItem: Api) => apiItem.apiId != api.apiId);
      await updateGistContent(apiData);
      getData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  }
  const handleEditApi = async (api: Api) => {
    try {
      setLoading(true)
      const apiData = await getGistContent()
      apiData.apis = await apiData.apis.map((apiItem: Api) => (apiItem.apiId === api.apiId ? api : apiItem));
      await updateGistContent(apiData);
      getData();
    } catch (error) {
      console.log(error, 17);
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <Loader fullPage />;
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <ThemeToggle />
      </div>
      {loginMode == "unauthorized" && (<LoginForm setLoginMode={setLoginMode}></LoginForm>)}
      {(loginMode == "read" || loginMode == "edit") && <div>
        {selectedApi ? (
          <ApiDetail
            api={selectedApi}
            onClose={() => setSelectedApi(null)}
          />
        ) : (
          <ApiList
            apis={apis}
            onViewApi={setSelectedApi}
            setApis={setApis}
            loginMode={loginMode}
            deleteApi={deleteApi}
            handleEditApi={handleEditApi}
          />
        )}
      </div>}
    </div>
  );
}
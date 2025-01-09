"use client";

import { useState } from "react";
import { Api } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, ExternalLink } from "lucide-react";
import dynamic from 'next/dynamic';
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });
interface ApiDetailProps {
  api: Api;
  onClose: () => void;
}

export function ApiDetail({ api, onClose }: ApiDetailProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleJsonClick = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{api.name}</h2>
          <p className="text-muted-foreground">{api.endpoint}</p>
        </div>
        <Badge variant="outline" className="text-lg">
          {api.method}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <ul className="list-disc list-inside space-y-1">
            {api.description.map((item, index) => (
              <li key={index} className="text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">CURL Command</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(api.curl)}
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Copy
            </Button>
          </div>
          <Textarea
            value={api.curl}
            readOnly
            className="font-mono text-sm h-24"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Payload</h3>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(api.payload)}
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy
              </Button>
              <ExternalLink onClick={handleJsonClick} />
            </div>
          </div>
          <ReactJson src={JSON.parse(api.payload)} name={false} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Success Response</h3>
          <ReactJson src={JSON.parse(api.responses?.success.body)} collapsed={isCollapsed} name={false} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
          <div className="space-y-4">
            {api.responses.failure.map((failure, index) => (
              <div key={index}>
                <Badge variant="outline" className="mb-2">
                  Status {failure.status}
                </Badge>
                <ReactJson src={JSON.parse(failure.body)} name={false} />
              </div>
            ))}
          </div>
        </div>
      </div >


    </Card >
  );
}
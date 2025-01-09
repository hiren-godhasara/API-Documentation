"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useToast } from "../ui/use-toast";

interface LoginFormProps {
  setLoginMode: (data: any) => void;
}

export function LoginForm({ setLoginMode }: LoginFormProps) {
  const { toast } = useToast()
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const readPassword = "1122"
  const masterPassword = "112233"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ksjkjdk");

    if (password === readPassword) {
      setLoginMode("read")
      return;
    } else if (password === masterPassword) {
      setLoginMode("edit")
      return;
    } else {
      alert("Password is incorrect..👎👎")
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="rounded-full bg-primary/10 p-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-center">API Documentation</h1>
          <p className="text-muted-foreground text-center">
            Please enter the password to access the documentation
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                autoFocus
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              Access Documentation
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
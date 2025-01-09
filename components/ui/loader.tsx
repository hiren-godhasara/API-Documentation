'use client';

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
    fullPage?: boolean;
}

export function Loader({
    size = 24,
    fullPage = false,
    className,
    ...props
}: LoaderProps) {
    if (fullPage) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm" {...props}>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className={cn("flex items-center justify-center", className)} {...props}>
            <Loader2
                className="animate-spin text-primary"
                size={size}
            />
        </div>
    );
}
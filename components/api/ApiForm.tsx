"use client";

import { useState } from "react";
import { Api } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface ApiFormProps {
    api?: Api;
    onSubmit: (api: Api) => void;
    onCancel: () => void;
}

export function ApiForm({ api, onSubmit, onCancel }: ApiFormProps) {
    const [formData, setFormData] = useState<Api>(
        api || {
            apiId: crypto.randomUUID(),
            name: "",
            endpoint: "",
            method: "GET",
            curl: "",
            payload: "",
            responses: {
                success: { status: 200, body: "" },
                failure: [{ status: 400, body: "" }],
            },
            description: [""],
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleResponseChange = (
        type: "success" | "failure",
        index: number | null,
        key: "status" | "body",
        value: string
    ) => {
        setFormData((prev) => {
            const updatedResponses = { ...prev.responses };
            if (type === "success") {
                updatedResponses.success[key] = key === "status" ? Number(value) : value;
            } else if (type === "failure" && index !== null) {
                updatedResponses.failure[index][key] = key === "status" ? +value : value;
            }
            return { ...prev, responses: updatedResponses };
        });
    };

    const handleAddFailureResponse = () => {
        setFormData((prev) => ({
            ...prev,
            responses: {
                ...prev.responses,
                failure: [
                    ...prev.responses.failure,
                    { status: 400, body: "" }, // Default values for new failure response
                ],
            },
        }));
    };

    const handleRemoveFailureResponse = (index: number) => {
        setFormData((prev) => {
            const updatedFailureResponses = prev.responses.failure.filter(
                (_, i) => i !== index
            );
            return {
                ...prev,
                responses: {
                    ...prev.responses,
                    failure: updatedFailureResponses,
                },
            };
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                        value={formData.name}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Endpoint</label>
                    <Input
                        value={formData.endpoint}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, endpoint: e.target.value }))
                        }
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Method</label>
                    <Select
                        value={formData.method}
                        onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, method: value }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                            {["GET", "POST", "PUT", "DELETE", "PATCH"].map((method) => (
                                <SelectItem key={method} value={method}>
                                    {method}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                        value={formData.description.join("\n")}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                description: e.target.value.split("\n"),
                            }))
                        }
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">CURL Command</label>
                    <Textarea
                        value={formData.curl}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, curl: e.target.value }))
                        }
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Payload (JSON)</label>
                    <Textarea
                        value={JSON.stringify(formData.payload, null, 2)}
                        onChange={(e) => {
                            setFormData((prev) => ({ ...prev, payload: e.target.value }));
                        }}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Success Response</label>
                    <div>
                        <label className="text-sm font-medium">Status</label>
                        <Input
                            type="number"
                            value={formData.responses.success.status}
                            onChange={(e) =>
                                handleResponseChange("success", null, "status", e.target.value)
                            }
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Body</label>
                        <Textarea
                            value={JSON.stringify(formData.responses.success.body, null, 2)}
                            onChange={(e) =>
                                handleResponseChange("success", null, "body", e.target.value)
                            }
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium flex justify-between">Failure Responses
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddFailureResponse}
                            className="mr-3"
                        >
                            Add Failure Response
                        </Button>
                    </label>
                    {formData.responses.failure.map((response, index) => (
                        <div key={index} className="space-y-2">
                            <div>
                                <label className="text-sm font-medium flex justify-between text-center">Status
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => handleRemoveFailureResponse(index)}
                                        className="mt-2"
                                    >
                                        <Trash2 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    </Button>
                                </label>
                                <Input
                                    type="number"
                                    value={response.status}
                                    onChange={(e) =>
                                        handleResponseChange("failure", index, "status", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Body</label>
                                <Textarea
                                    value={JSON.stringify(response.body, null, 2)}
                                    onChange={(e) =>
                                        handleResponseChange("failure", index, "body", e.target.value)
                                    }
                                />
                            </div>

                        </div>
                    ))}
                </div>

            </div>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
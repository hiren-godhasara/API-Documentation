"use client";
import axios from "axios";
import { GITHUB_TOKEN, GITHUB_GIST_ID, GIST_FILE_NAME } from "./utils";

const BASE_URL = "https://api.github.com/gists";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
    },
});

export default axiosInstance;

export async function getGistContent(): Promise<any> {
    try {
        const response = await axiosInstance.get(`/${GITHUB_GIST_ID}`);
        const fileContent = response.data.files[GIST_FILE_NAME]?.content;
        return JSON.parse(fileContent); // Parse JSON data
    } catch (error) {
        console.error("Error fetching gist content:", error);
        throw error;
    }
}


export async function updateGistContent(newData: any): Promise<void> {
    try {
        const updatedContent = JSON.stringify(newData, null, 2); // Format JSON
        await axiosInstance.patch(`/${GITHUB_GIST_ID}`, {
            files: {
                [GIST_FILE_NAME]: { content: updatedContent },
            },
        });
        console.log("Gist updated successfully!");
    } catch (error) {
        console.error("Error updating gist content:", error);
        throw error;
    }
}

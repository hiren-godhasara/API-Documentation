"use client";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GITHUB_TOKEN = "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";
export const GITHUB_GIST_ID = "2ff4b4bfe462c984fc0ed92212bdaffd";
export const GIST_FILE_NAME = "data.json"




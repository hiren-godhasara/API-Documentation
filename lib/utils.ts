"use client";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GITHUB_TOKEN = "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";
export const GITHUB_GIST_ID = "2ff4b4bfe462c984fc0ed92212bdaffd";
export const GIST_FILE_NAME = "data.json"




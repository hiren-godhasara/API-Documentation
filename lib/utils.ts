import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GITHUB_TOKEN = process.env.NEXT_PUBLIC_TOKEN;
export const GITHUB_GIST_ID = "2ff4b4bfe462c984fc0ed92212bdaffd";

export const GIST_FILE_NAME = "data.json"




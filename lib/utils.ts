import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertToAscii(text: string){
  const asciiString = text.replace(/^[\x00-\x7F]/g, "")
  return asciiString
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleInputType = (field: string) => {
  const availableTextAreas = ["how_did_you_hear", "why_did_you_interested"]
  if (availableTextAreas.includes(field)) {
    return true
  }
  return false
}

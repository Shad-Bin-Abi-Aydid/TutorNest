import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);

  const first = words[0];
  const last = words[words.length - 1];

  if (words.length === 1) {
    return first.charAt(0).toUpperCase();
  }

  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

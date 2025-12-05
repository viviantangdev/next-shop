import { format } from "date-fns";

export function formatDate(dateString: string) {
  return format(new Date(dateString), "yyyy-MM-dd");
}

export function toTitleCase(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
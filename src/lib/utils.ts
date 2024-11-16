import { clsx, type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatDate(dateString: string): string {
  if (dateString) {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'MMMM d, yyyy');
  }
  return 'N/A';
}

export { cn, formatDate };

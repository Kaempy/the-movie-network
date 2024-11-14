import { clsx, type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatDate(dateString: string): string {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, 'MMMM d, yyyy');
}

export { cn, formatDate };

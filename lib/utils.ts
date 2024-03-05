import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64Image(imageData: string){
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}

export function addCreatedDate(dateEndPoint:Date | string){
  const date = new Date(dateEndPoint);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr" , "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year} ${monthNames[month]} ${day} - ${hours}:${minutes}`;
}

export function getTimePassedString(timestamp:Date | string) {
  const currentTime: Date = new Date();
  const targetTime: Date = new Date(timestamp);
  
  const elapsedMilliseconds: number = currentTime.getTime() - targetTime.getTime();
  const elapsedSeconds: number = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes: number = Math.floor(elapsedSeconds / 60);
  const elapsedHours: number = Math.floor(elapsedMinutes / 60);
  const elapsedDays: number = Math.floor(elapsedHours / 24);

  if (elapsedDays > 0) {
      return `${elapsedDays}d ago`;
  } else if (elapsedHours > 0) {
      return `${elapsedHours}h ago`;
  } else if (elapsedMinutes > 0) {
      return `${elapsedMinutes}m ago`;
  } else {
      return `${elapsedSeconds}s ago`;
  }
}
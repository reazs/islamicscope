import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  // Extract local hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Pad minutes with leading zeros if necessary
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Format the time and date string
  const timeStr = `${hours}:${minutesStr} ${ampm}`;
  const dateStr = `${month} ${day}, ${year}`;

  return `${timeStr} - ${dateStr}`;
};

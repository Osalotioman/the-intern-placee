import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FIREBASE_ERROR_MAPPER } from "./api/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserFriendlyError(errorCode: string) {
  return (
		FIREBASE_ERROR_MAPPER[errorCode] ||
		"An unexpected error occured, please try again later."
	);
}

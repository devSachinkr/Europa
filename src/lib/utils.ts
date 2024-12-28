import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = ({ str }: { str: string }) => {
  return str.slice(0, 60).concat("...");
};

export const  validateURLString = (url: string) => {
  const youtubeRegex = new RegExp("www.youtube.com");
  const loomRegex = new RegExp("www.loom.com");

  if (youtubeRegex.test(url)) {
    return {
      type: "YOUTUBE",
      url,
    };
  } else if (loomRegex.test(url)) {
    return {
      type: "LOOM",
      url,
    };
  } else {
    return {
      url: undefined,
      type: "IMAGE",
    };
  }
};

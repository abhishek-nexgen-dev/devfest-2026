export interface Speaker {
  id: string;
  name: string;
  designation: string;
  company: string;
  image: string;
  topic: string;
  category?: "ALL" | "AI / CLOUD" | "WEB" | "MOBILE" | "OPEN SOURCE";
  bio?: string;
  keyTakeaways?: string[];
  timeSlot?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

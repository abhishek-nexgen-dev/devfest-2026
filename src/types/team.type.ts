export type TeamCategory =
  | "ALL"
  | "TECH"
  | "DESIGN"
  | "CONTENT"
  | "OPERATIONS"
  | "VOLUNTEERS"
  | "OUTREACH"
  | "PHOTOGRAPHY";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: TeamCategory;
  image: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
}

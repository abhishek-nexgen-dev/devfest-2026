import { ReactNode } from "react";

export interface Track {
  id: string;
  name: string;
  description: string;
  tagline?: string;
  tags?: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  accentColor?: string;
  level?: string;
  icon?: string | ReactNode;
}

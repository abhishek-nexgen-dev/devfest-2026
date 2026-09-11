export interface AgendaItem {
  id: string;
  time: string;
  endTime: string;
  title: string;
  description: string;
  speaker?: string;
  speakerRole?: string;
  speakerAvatar?: string;
  room: string;
  track: "Keynote" | "AI & Cloud" | "Mobile & Web" | "Workshop" | "General";
  tags: string[];
  level?: "All Levels" | "Intermediate" | "Advanced";
}

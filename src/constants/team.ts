import { TeamMember, TeamCategory } from "../types/team.type";

export const TEAM_CATEGORIES: TeamCategory[] = [
  "ALL",
  "OPERATIONS",
  "TECH",
  "DESIGN",
  "CONTENT",
  "OUTREACH",
  "VOLUNTEERS"
];

export const DEVFEST_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Abhishek Kumar",
    role: "Lead Organizer • GDG Ranchi",
    category: "OPERATIONS",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    bio: "Community builder passionate about fostering developer growth, cloud architectures, and open source collaboration across Jharkhand.",
    social: { 
      linkedin: "https://www.linkedin.com/company/gdgranchi",
      twitter: "https://twitter.com/gdgranchi",
      github: "https://github.com/gdgranchi"
    }
  },
  {
    id: "tm-2",
    name: "Priya Sharma",
    role: "Co-Organizer & WTM Ambassador",
    category: "OPERATIONS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    bio: "Championing diversity in tech and empowering women developers with hands-on AI and cloud computing workshops.",
    social: { 
      linkedin: "https://www.linkedin.com/company/gdgranchi",
      twitter: "https://twitter.com/gdgranchi"
    }
  },
  {
    id: "tm-3",
    name: "Rahul Verma",
    role: "Tech Architecture Lead",
    category: "TECH",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    bio: "Full stack engineer and Google Cloud enthusiast architecting high-scale event platforms and community APIs.",
    social: { 
      github: "https://github.com/gdgranchi",
      linkedin: "https://www.linkedin.com/company/gdgranchi"
    }
  },
  {
    id: "tm-4",
    name: "Ananya Gupta",
    role: "UI/UX & Brand Design Lead",
    category: "DESIGN",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    bio: "Visual designer crafting intuitive human-centered brand identities, stage aesthetics, and conference design systems.",
    social: { 
      linkedin: "https://www.linkedin.com/company/gdgranchi",
      twitter: "https://twitter.com/gdgranchi"
    }
  },
  {
    id: "tm-5",
    name: "Vikram Singh",
    role: "DevOps & Cloud Systems Lead",
    category: "TECH",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    bio: "Kubernetes and Docker specialist focused on container orchestration, cloud security, and reliability engineering.",
    social: { 
      github: "https://github.com/gdgranchi",
      linkedin: "https://www.linkedin.com/company/gdgranchi"
    }
  },
  {
    id: "tm-6",
    name: "Sneha Mukherjee",
    role: "Content & Editorial Lead",
    category: "CONTENT",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    bio: "Tech writer and developer advocate driving technical blogs, speaker interviews, and documentation for GDG Ranchi.",
    social: { 
      twitter: "https://twitter.com/gdgranchi",
      linkedin: "https://www.linkedin.com/company/gdgranchi"
    }
  },
  {
    id: "tm-7",
    name: "Amit Soren",
    role: "Community Outreach & Partnerships",
    category: "OUTREACH",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    bio: "Connecting universities, student chapters, and tech startups across Eastern India with Google Developer resources.",
    social: { 
      linkedin: "https://www.linkedin.com/company/gdgranchi",
      twitter: "https://twitter.com/gdgranchi"
    }
  },
  {
    id: "tm-8",
    name: "Kavita Roy",
    role: "Volunteer Operations Coordinator",
    category: "VOLUNTEERS",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop",
    bio: "Managing registrations, badge distribution, and attendee experience to ensure a flawless conference flow.",
    social: { 
      linkedin: "https://www.linkedin.com/company/gdgranchi",
      github: "https://github.com/gdgranchi"
    }
  }
];

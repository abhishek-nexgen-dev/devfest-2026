import { Speaker } from "../types/speaker.type";

export const DEVFEST_SPEAKERS: Speaker[] = [
  {
    id: "spk-1",
    name: "Keynote Speaker",
    designation: "Tech Leader & Architect",
    company: "Google",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    topic: "Scaling Next-Gen Multimodal AI Systems",
    category: "AI / CLOUD",
    timeSlot: "10:00 AM - 10:45 AM",
    bio: "Leading engineer specializing in large-scale model architectures, high-throughput cloud pipelines, and generative agent frameworks across the Google cloud ecosystem.",
    keyTakeaways: [
      "Production deployment strategies for Gemini 2.0 models",
      "Cost and latency optimizations for multimodal reasoning",
      "Building resilient agentic tool loops"
    ],
    social: { linkedin: "#", twitter: "#" }
  },
  {
    id: "spk-2",
    name: "Featured Speaker",
    designation: "Principal Web Architect",
    company: "Tech Corp",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    topic: "Modern Web Performance & View Transitions",
    category: "WEB",
    timeSlot: "11:15 AM - 12:00 PM",
    bio: "Senior software architect focused on web standards, Core Web Vitals optimization, and building buttery 60fps single-page experiences.",
    keyTakeaways: [
      "Architecting smooth transitions using browser native APIs",
      "Diagnosing interaction to next paint (INP) bottlenecks",
      "Maximizing hydration performance in React 19"
    ],
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    id: "spk-3",
    name: "Featured Speaker",
    designation: "Google Developer Expert",
    company: "Community",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    topic: "Declarative Mobile with Flutter & Material 3",
    category: "MOBILE",
    timeSlot: "02:00 PM - 02:45 PM",
    bio: "Recognized Google Developer Expert (GDE) with over 8 years in the cross-platform ecosystem, building high-volume apps used by millions.",
    keyTakeaways: [
      "State management patterns for reactive Flutter architectures",
      "Material 3 design token synchronization",
      "Profiling memory and frame drops on Android devices"
    ],
    social: { github: "#", twitter: "#" }
  },
  {
    id: "spk-4",
    name: "Featured Speaker",
    designation: "Open Source Contributor & Maintainer",
    company: "OSS",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=600&auto=format&fit=crop",
    topic: "The Future of Open Source Collaboration",
    category: "OPEN SOURCE",
    timeSlot: "03:15 PM - 04:00 PM",
    bio: "Passionate open-source advocate and maintainer actively helping Indian tech communities contribute to global developer tooling and packages.",
    keyTakeaways: [
      "How to make your first high-impact open source contribution",
      "Managing RFCs, triage, and distributed maintainership",
      "Sponsoring and sustaining critical public developer infrastructure"
    ],
    social: { twitter: "#", github: "#" }
  }
];


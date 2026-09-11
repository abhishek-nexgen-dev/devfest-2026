import { Track } from "../types/track.type";

export const DEVFEST_TRACKS: Track[] = [
  {
    id: "ai",
    name: "AI & Machine Learning",
    tagline: "Gemini 2.0, Multimodal Agents & Edge AI",
    description: "Explore the bleeding edge of generative models, function calling with Google GenAI SDK, and on-device machine learning with MediaPipe and LiteRT.",
    tags: ["Gemini 2.0", "Vertex AI", "MediaPipe", "Function Calling"],
    accentColor: "#4285F4",
    level: "Advanced",
    codeSnippet: {
      language: "typescript",
      filename: "gemini-agent.ts",
      code: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Build resilient architectures for DevFest Ranchi",
  config: { temperature: 0.2, maxOutputTokens: 1024 }
});

console.log(response.text);`
    }
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    tagline: "Serverless, Cloud Run & Kubernetes",
    description: "Learn about planet-scale architectures, zero-downtime microservices on Google Cloud Run, and modern container orchestration.",
    tags: ["Google Cloud", "Cloud Run", "GKE", "Terraform"],
    accentColor: "#34A853",
    level: "Intermediate",
    codeSnippet: {
      language: "bash",
      filename: "deploy-cloudrun.sh",
      code: `# Deploy container directly to Google Cloud Run
gcloud run deploy devfest-ranchi-service \\
  --image gcr.io/gdg-ranchi/applet:v2026 \\
  --platform managed \\
  --region asia-south1 \\
  --allow-unauthenticated \\
  --min-instances 2 --max-instances 100`
    }
  },
  {
    id: "web",
    name: "Web Technologies",
    tagline: "Core Web Vitals, WASM & Modern Standards",
    description: "Dive deep into sub-millisecond frontends, View Transitions API, modern React 19 architecture, and high-performance WebAssembly engines.",
    tags: ["React 19", "View Transitions", "Core Web Vitals", "WebAssembly"],
    accentColor: "#FBBC04",
    level: "All Levels",
    codeSnippet: {
      language: "typescript",
      filename: "view-transition.ts",
      code: `// Native smooth view transition for modern browsers
document.startViewTransition(async () => {
  await navigateToRoute("/schedule");
  updateDOMState({ isNavigating: false });
});

// Performance optimization with requestIdleCallback
requestIdleCallback(() => preloadDevFestAssets());`
    }
  },
  {
    id: "mobile",
    name: "Mobile & Flutter",
    tagline: "Cross-Platform Flutter & Jetpack Compose",
    description: "Craft pixel-perfect experiences across mobile, desktop, and embedded displays with Flutter 3.x and modern declarative Jetpack Compose.",
    tags: ["Flutter 3", "Dart", "Jetpack Compose", "Material 3"],
    accentColor: "#4285F4",
    level: "Intermediate",
    codeSnippet: {
      language: "dart",
      filename: "devfest_app.dart",
      code: `import 'package:flutter/material.dart';

class DevFestScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('DevFest Ranchi 2026')),
      body: AnimatedSpeakerFeed(
        onSessionSelect: (id) => context.push('/session/$id'),
      ),
    );
  }
}`
    }
  },
  {
    id: "firebase",
    name: "Firebase & Backend",
    tagline: "Realtime Data, App Check & Genkit",
    description: "Supercharge your backend stack with Firestore rules, Firebase Genkit flows, and serverless background event triggers.",
    tags: ["Firestore", "Firebase Genkit", "Security Rules", "App Check"],
    accentColor: "#EA4335",
    level: "All Levels",
    codeSnippet: {
      language: "typescript",
      filename: "genkit-flow.ts",
      code: `import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const ai = genkit({ plugins: [googleAI()] });

export const devfestAssistant = ai.defineFlow(
  { name: 'speakerQnA' },
  async (prompt) => {
    return await ai.generate({ prompt });
  }
);`
    }
  },
  {
    id: "opensource",
    name: "Open Source",
    tagline: "Community Contributions & Architecture",
    description: "Learn how to contribute to tier-1 open source repositories, manage open governance, and build software that benefits the global community.",
    tags: ["GitHub", "OSS Governance", "Licensing", "Public Good"],
    accentColor: "#34A853",
    level: "All Levels",
    codeSnippet: {
      language: "markdown",
      filename: "CONTRIBUTING.md",
      code: `## Contributing to GDG Ranchi Projects

1. Fork the repo and create your feature branch:
   \`git checkout -b feature/devfest-experience\`
2. Write clean, accessible TypeScript components
3. Run tests and submit PR:
   \`npm run lint && npm run build\``
    }
  }
];


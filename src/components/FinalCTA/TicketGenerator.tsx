import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { DEVFEST_EVENT } from "../../constants/event";
import confetti from "canvas-confetti";
import { soundFx } from "../../utils/audio";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink,
  Twitter,
  Linkedin,
  MessageCircle,
  Tag,
  Upload,
  Image as ImageIcon,
  Trash2,
  Circle,
  Square,
  Hexagon,
  Pentagon,
  Sparkle
} from "lucide-react";

type AccentColor = "blue" | "green" | "yellow" | "red";
export type FrameShape = "circle" | "rounded" | "blob" | "hexagon" | "pentagon";

export const TicketGenerator: React.FC = () => {
  const [attendeeName, setAttendeeName] = useState("Alex Sharma");
  const [attendeeHandle, setAttendeeHandle] = useState("@alex_dev");
  const [attendeeRole, setAttendeeRole] = useState("Full Stack Developer");
  const [selectedTrack, setSelectedTrack] = useState("AI & Cloud Architecture");
  const [accentColor, setAccentColor] = useState<AccentColor>("blue");
  const [frameShape, setFrameShape] = useState<FrameShape>("circle");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [ticketNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const [copiedText, setCopiedText] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const tracks = [
    { id: "AI & Cloud Architecture", label: "AI & Cloud Architecture" },
    { id: "Mobile & Flutter", label: "Mobile & Flutter Ecosystem" },
    { id: "Web & High-Perf Systems", label: "Modern Web Systems" },
    { id: "Open Source & Security", label: "Open Source & Security" }
  ];

  const tags = [
    "#DevFestRanchi",
    "#GDGRanchi",
    "#DevFest2026",
    "#GoogleDevelopers",
    "#Commudle"
  ];

  const shareText = `I just generated my official attendee pass for GDG Ranchi DevFest 2026! 🚀 Excited to learn, build, and connect with 1,000+ developers.\n\nClaim your badge & register on Commudle: ${DEVFEST_EVENT.commudleUrl}\n\n#DevFestRanchi #GDGRanchi #DevFest2026 #GoogleDevelopers #Commudle`;

  const colorStyles: Record<AccentColor, { 
    border: string; 
    text: string; 
    glow: string; 
    hex: string;
    bg: string;
    badgeBg: string;
  }> = {
    blue: {
      border: "border-brand-blue/50",
      text: "text-brand-blue",
      glow: "rgba(66, 133, 244, 0.25)",
      hex: "#4285F4",
      bg: "bg-brand-blue",
      badgeBg: "bg-brand-blue/10"
    },
    green: {
      border: "border-brand-green/50",
      text: "text-brand-green",
      glow: "rgba(52, 168, 83, 0.25)",
      hex: "#34A853",
      bg: "bg-brand-green",
      badgeBg: "bg-brand-green/10"
    },
    yellow: {
      border: "border-brand-yellow/50",
      text: "text-brand-yellow",
      glow: "rgba(251, 188, 4, 0.25)",
      hex: "#FBBC04",
      bg: "bg-brand-yellow",
      badgeBg: "bg-brand-yellow/10"
    },
    red: {
      border: "border-brand-red/50",
      text: "text-brand-red",
      glow: "rgba(234, 67, 53, 0.25)",
      hex: "#EA4335",
      bg: "bg-brand-red",
      badgeBg: "bg-brand-red/10"
    },
  };

  // Image Upload Handlers
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }
    soundFx.playPop();
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemovePhoto = () => {
    soundFx.playClick(600);
    setPhotoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCopyShare = () => {
    soundFx.playClick(850);
    navigator.clipboard.writeText(shareText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleCopyTag = (tag: string) => {
    soundFx.playClick(900);
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  const handleTwitterShare = () => {
    soundFx.playClick(950);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    soundFx.playClick(950);
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(DEVFEST_EVENT.commudleUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppShare = () => {
    soundFx.playClick(950);
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Canvas Clip Path helper for selected Frame Shape
  const drawClipPath = (
    ctx: CanvasRenderingContext2D, 
    shape: FrameShape, 
    cx: number, 
    cy: number, 
    size: number
  ) => {
    const r = size / 2;
    ctx.beginPath();

    if (shape === "circle") {
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
    } else if (shape === "rounded") {
      const radius = 28;
      ctx.roundRect(cx - r, cy - r, size, size, radius);
    } else if (shape === "hexagon") {
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    } else if (shape === "pentagon") {
      for (let i = 0; i < 5; i++) {
        const angle = ((Math.PI * 2) / 5) * i - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    } else if (shape === "blob") {
      // Smooth organic 8-point blob
      const points = 8;
      const step = (Math.PI * 2) / points;
      const offsets = [1, 0.88, 1.05, 0.85, 1.02, 0.9, 1.06, 0.86];
      for (let i = 0; i <= points; i++) {
        const idx = i % points;
        const angle = idx * step;
        const dist = r * offsets[idx];
        const x = cx + dist * Math.cos(angle);
        const y = cy + dist * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else {
          const prevIdx = (i - 1) % points;
          const prevAngle = prevIdx * step;
          const prevDist = r * offsets[prevIdx];
          const cpx = cx + ((dist + prevDist) / 2) * Math.cos(prevAngle + step / 2);
          const cpy = cy + ((dist + prevDist) / 2) * Math.sin(prevAngle + step / 2);
          ctx.quadraticCurveTo(cpx, cpy, x, y);
        }
      }
      ctx.closePath();
    }
  };

  // High-Resolution Pass Card Generator (HTML5 Canvas)
  const handleDownloadCard = async () => {
    soundFx.playPop();
    setIsDownloading(true);

    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4285F4", "#EA4335", "#FBBC04", "#34A853"],
    });

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // 1. Dark Background
      ctx.fillStyle = "#0A0B0E";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Radial Glow with active accent color
      const currentAccent = colorStyles[accentColor];
      const radGrad = ctx.createRadialGradient(880, 200, 40, 880, 200, 550);
      radGrad.addColorStop(0, currentAccent.hex + "33");
      radGrad.addColorStop(1, "transparent");
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Decorative subtle background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 60; x < canvas.width - 60; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 40);
        ctx.lineTo(x, canvas.height - 40);
        ctx.stroke();
      }

      // 4. Card Outer Container
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

      // Top Google 4-color strip
      const stripW = (canvas.width - 80) / 4;
      ctx.fillStyle = "#4285F4";
      ctx.fillRect(40, 40, stripW, 6);
      ctx.fillStyle = "#EA4335";
      ctx.fillRect(40 + stripW, 40, stripW, 6);
      ctx.fillStyle = "#FBBC04";
      ctx.fillRect(40 + stripW * 2, 40, stripW, 6);
      ctx.fillStyle = "#34A853";
      ctx.fillRect(40 + stripW * 3, 40, stripW, 6);

      // 5. Header Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.moveTo(40, 125);
      ctx.lineTo(canvas.width - 40, 125);
      ctx.stroke();

      // GDG Ranchi Brand Header
      ctx.font = "bold 26px sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("GOOGLE DEVELOPER GROUP RANCHI", 80, 92);

      ctx.font = "bold 16px monospace";
      ctx.fillStyle = currentAccent.hex;
      ctx.fillText(`DEVFEST 2026  •  PASS #DFR-${ticketNumber}`, 800, 92);

      // Left Column: I'M ATTENDING DEVFEST'26 #RANCHI
      ctx.font = "bold 16px monospace";
      ctx.fillStyle = currentAccent.hex;
      ctx.fillText("OFFICIAL ATTENDEE BADGE", 80, 185);

      ctx.font = "900 48px sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("I'M ATTENDING", 80, 240);

      ctx.fillStyle = currentAccent.hex;
      ctx.fillText("DEVFEST'26 #RANCHI", 80, 295);

      // Attendee Name
      ctx.font = "800 36px sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(attendeeName || "Attendee", 80, 375);

      // Handle & Role
      ctx.font = "bold 20px monospace";
      ctx.fillStyle = "#9CA3AF";
      ctx.fillText(`${attendeeHandle || "@developer"}  •  ${attendeeRole || "Developer"}`, 80, 415);

      // Specialization Track Pill
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.fillRect(80, 445, 480, 60);
      ctx.strokeStyle = currentAccent.hex + "55";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(80, 445, 480, 60);

      ctx.font = "14px monospace";
      ctx.fillStyle = "#9CA3AF";
      ctx.fillText("SPECIALIZATION TRACK", 100, 470);

      ctx.font = "bold 18px sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(selectedTrack, 100, 493);

      // Bottom Footer Metadata
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "#6B7280";
      ctx.fillText("DECEMBER 27, 2026 • AUDITORIUM, RANCHI • DEVFEST.GDGRANCHI.IN", 80, 560);

      // Right Column: Image with selected Frame Shape
      const photoSize = 240;
      const photoCx = 900;
      const photoCy = 300;

      // Draw outer shape glow and stroke
      ctx.save();
      drawClipPath(ctx, frameShape, photoCx, photoCy, photoSize + 16);
      ctx.strokeStyle = currentAccent.hex;
      ctx.lineWidth = 4;
      ctx.shadowColor = currentAccent.hex;
      ctx.shadowBlur = 25;
      ctx.stroke();
      ctx.restore();

      // Clip and draw image or placeholder
      ctx.save();
      drawClipPath(ctx, frameShape, photoCx, photoCy, photoSize);
      ctx.clip();

      if (photoUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = photoUrl;
        });
        ctx.drawImage(img, photoCx - photoSize / 2, photoCy - photoSize / 2, photoSize, photoSize);
      } else {
        // Aesthetic geometric developer avatar
        ctx.fillStyle = "#1E222D";
        ctx.fillRect(photoCx - photoSize / 2, photoCy - photoSize / 2, photoSize, photoSize);
        ctx.fillStyle = currentAccent.hex;
        ctx.font = "bold 72px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const initials = (attendeeName || "GDG").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
        ctx.fillText(initials, photoCx, photoCy);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
      }
      ctx.restore();

      // Verification Badge below photo
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "#34A853";
      ctx.fillText("✓ VERIFIED ATTENDEE • COMMUDLE REGISTERED", 730, 560);

      // Convert canvas to image and trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `DevFest-Ranchi-Pass-${attendeeName ? attendeeName.replace(/\s+/g, "-") : "2026"}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
    } catch (err) {
      console.error("Canvas export error:", err);
      setIsDownloading(false);
    }
  };

  const activeColor = colorStyles[accentColor];

  // Helper CSS class for shape masking on live preview
  const getShapeClasses = (shape: FrameShape) => {
    switch (shape) {
      case "circle":
        return "rounded-full";
      case "rounded":
        return "rounded-3xl";
      case "hexagon":
        return "[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]";
      case "pentagon":
        return "[clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]";
      case "blob":
        return "rounded-[40%_60%_70%_30%/40%_50%_60%_55%]";
      default:
        return "rounded-full";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 bg-dark-surface/90 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
      
      {/* Top Banner with Official GDG Branding & Commudle Partnership */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img 
            src={DEVFEST_EVENT.logoUrl} 
            alt="GDG Logo" 
            className="h-8 w-auto object-contain" 
          />
          <div>
            <span className="text-base font-black font-display text-white tracking-tight block">
              GDG Ranchi DevFest 2026
            </span>
            <span className="text-xs font-mono text-gray-400">
              Official Delegate Badge Generator
            </span>
          </div>
        </div>

        {/* Commudle Verified Partnership Pill */}
        <a 
          href={DEVFEST_EVENT.commudleUrl} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-mono text-brand-blue hover:bg-brand-blue/20 transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <span>Official Booking Partner: <strong>Commudle</strong></span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>

      {/* Main Two-Column Layout: Controls vs Badge Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Form & Actions */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-brand-yellow uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Attendee Badge</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-display text-white mb-2">
              CLAIM & SHARE YOUR PASS
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
              Personalize your experience! Upload your photo and enter your name to generate your official DevFest attendee badge.
            </p>
          </div>

          {/* Form Controls */}
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={attendeeName}
                maxLength={28}
                onChange={(e) => setAttendeeName(e.target.value)}
                placeholder="e.g. Alex Sharma"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            {/* Social Handle & Role */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  Handle / GitHub
                </label>
                <input
                  type="text"
                  value={attendeeHandle}
                  maxLength={24}
                  onChange={(e) => setAttendeeHandle(e.target.value)}
                  placeholder="e.g. @alex_dev"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={attendeeRole}
                  maxLength={26}
                  onChange={(e) => setAttendeeRole(e.target.value)}
                  placeholder="e.g. Full Stack Developer"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            {/* Photo Upload Section */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                Your Photo
              </label>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/jpg"
                onChange={handleFileChange}
                className="hidden"
                id="badge-photo-upload"
              />

              {!photoUrl ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-brand-blue bg-brand-blue/10 scale-[1.01]"
                      : "border-white/20 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/40"
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-mono text-white mb-1">
                    <span className="font-bold text-brand-blue">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[11px] font-mono text-gray-400">
                    PNG, JPG, or WEBP (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/15">
                  <div className="flex items-center gap-3">
                    <img
                      src={photoUrl}
                      alt="Uploaded avatar"
                      className="w-12 h-12 rounded-xl object-cover border border-white/20"
                    />
                    <div>
                      <p className="text-xs font-mono font-bold text-white">
                        Photo Uploaded
                      </p>
                      <p className="text-[10px] font-mono text-brand-green flex items-center gap-1">
                        <Check className="w-3 h-3" /> Ready for badge
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Remove photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Frame Shape Selector (Inspired by Screenshot 4) */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                Frame Shape
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: "circle", label: "Circle", icon: Circle },
                  { id: "rounded", label: "Square", icon: Square },
                  { id: "blob", label: "Blob", icon: Sparkle },
                  { id: "hexagon", label: "Hexagon", icon: Hexagon },
                  { id: "pentagon", label: "Pentagon", icon: Pentagon },
                ].map((s) => {
                  const Icon = s.icon;
                  const isSelected = frameShape === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        soundFx.playClick(750);
                        setFrameShape(s.id as FrameShape);
                      }}
                      className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white/20 border-white text-white font-bold shadow-md scale-105"
                          : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <span className="text-[10px]">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Track Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                Primary Track
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tracks.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      soundFx.playClick(750);
                      setSelectedTrack(t.id);
                    }}
                    className={`px-3 py-2 text-xs font-mono rounded-lg border transition-all text-left cursor-pointer ${
                      selectedTrack === t.id
                        ? "bg-white/15 text-white border-white/40 font-bold shadow-sm"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hologram Accent Color */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                Hologram Accent Color
              </label>
              <div className="flex items-center gap-3">
                {(["blue", "green", "yellow", "red"] as AccentColor[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      soundFx.playClick(800);
                      setAccentColor(c);
                    }}
                    className={`w-7 h-7 rounded-full transition-transform cursor-pointer border ${
                      accentColor === c ? "scale-125 border-white ring-2 ring-white/30" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: colorStyles[c].hex }}
                    title={`Google ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons: Download & Book on Commudle */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleDownloadCard}
              disabled={isDownloading}
              className="flex-1 py-3.5 px-5 bg-white hover:bg-gray-100 text-black font-black text-xs font-mono tracking-wider uppercase rounded-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Rendering Badge..." : "Download Badge (PNG)"}
            </button>

            <a
              href={DEVFEST_EVENT.commudleUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick(900)}
              className="flex-1 py-3.5 px-5 bg-brand-blue hover:bg-blue-600 text-white font-black text-xs font-mono tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_25px_rgba(66,133,244,0.4)]"
            >
              <span>Book on Commudle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social Share Strip */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-gray-400 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-brand-green" /> Share on Social Media
              </span>
              <button
                type="button"
                onClick={handleCopyShare}
                className="text-[11px] font-mono text-gray-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedText ? <Check className="w-3 h-3 text-brand-green" /> : <Copy className="w-3 h-3" />}
                {copiedText ? "Copied announcement!" : "Copy announcement"}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleTwitterShare}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Twitter className="w-3.5 h-3.5 text-[#1DA1F2]" />
                Post to X / Twitter
              </button>

              <button
                type="button"
                onClick={handleLinkedInShare}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                Share on LinkedIn
              </button>

              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                WhatsApp
              </button>
            </div>

            {/* Official Hashtags to Click & Copy */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Tag className="w-3 h-3 text-gray-500 mr-1" />
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleCopyTag(t)}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-brand-blue hover:border-brand-blue/40 transition-colors cursor-pointer"
                  title="Click to copy hashtag"
                >
                  {copiedTag === t ? "Copied!" : t}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Live Badge Card (Landscape Ticket Style inspired by DevFest Patna) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div 
            ref={badgeRef}
            className={`w-full max-w-md rounded-3xl overflow-hidden border ${activeColor.border} bg-gradient-to-b from-[#111318] via-black to-[#111318] p-6 sm:p-7 backdrop-blur-2xl shadow-2xl relative transition-all duration-300`}
            style={{ boxShadow: `0 10px 60px ${activeColor.glow}` }}
          >
            {/* Top 4-Color Google Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="flex-1 bg-brand-blue" />
              <div className="flex-1 bg-brand-red" />
              <div className="flex-1 bg-brand-yellow" />
              <div className="flex-1 bg-brand-green" />
            </div>

            {/* Header: GDG Logo & Pass Details */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-5 mt-1">
              <div className="flex items-center gap-2.5">
                <img 
                  src={DEVFEST_EVENT.logoUrl} 
                  alt="GDG Logo" 
                  className="h-6 w-auto object-contain" 
                />
                <div className="text-left">
                  <span className="text-xs font-black font-display text-white block leading-tight">
                    GDG RANCHI
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-gray-400 uppercase">
                    DEVFEST 2026
                  </span>
                </div>
              </div>

              <span className={`text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 border ${activeColor.border} ${activeColor.text}`}>
                #DFR-{ticketNumber}
              </span>
            </div>

            {/* Center Area: Photo in Frame Shape + Bold Attendee Declaration */}
            <div className="flex flex-col items-center text-center my-4">
              
              {/* Photo Masked inside Selected Shape */}
              <div className="relative mb-4 group">
                <div 
                  className={`w-28 h-28 sm:w-32 sm:h-32 overflow-hidden flex items-center justify-center transition-all duration-300 border-2 ${activeColor.border} bg-white/5 ${getShapeClasses(frameShape)}`}
                  style={{ boxShadow: `0 0 30px ${activeColor.glow}` }}
                >
                  {photoUrl ? (
                    <img 
                      src={photoUrl} 
                      alt={attendeeName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8 mb-1 opacity-60" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">
                        Upload Photo
                      </span>
                    </div>
                  )}
                </div>

                {/* Shape indicator label */}
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                  <span className="px-2 py-0.5 rounded-full bg-black/80 border border-white/20 text-[9px] font-mono uppercase text-gray-300">
                    {frameShape}
                  </span>
                </div>
              </div>

              {/* Bold Badge Slogan */}
              <div className="mt-2">
                <p className={`text-xs font-mono uppercase tracking-widest font-black ${activeColor.text}`}>
                  I'M ATTENDING DEVFEST'26
                </p>
                <h4 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mt-1 truncate max-w-[320px]">
                  {attendeeName || "Attendee"}
                </h4>
                <p className="text-xs font-mono text-gray-400 mt-0.5">
                  {attendeeHandle || "@developer"} • <span className="text-gray-300">{attendeeRole || "Developer"}</span>
                </p>
              </div>

              {/* Track Pill */}
              <div className="mt-3">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-bold text-white">
                  {selectedTrack}
                </span>
              </div>
            </div>

            {/* Event Coordinates & Venue Info */}
            <div className="bg-white/5 rounded-2xl p-3 my-4 border border-white/10 text-left text-xs font-mono flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 uppercase">DATE & VENUE</p>
                <p className="text-white font-bold">Dec 27, 2026 • Ranchi</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase">LOCATION</p>
                <p className="text-gray-300">Auditorium Hall</p>
              </div>
            </div>

            {/* Barcode, QR Code & Security Stamp */}
            <div className="border-t border-dashed border-white/20 pt-4 flex items-center justify-between">
              <div className="text-left space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-brand-green font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>COMMUDLE REGISTERED</span>
                </div>
                <p className="text-[10px] font-mono text-gray-500">
                  Dec 27, 2026 • Ranchi, Jharkhand
                </p>
              </div>

              <div className="p-1.5 rounded-lg bg-white text-black shadow-md flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
            </div>

          </div>

          <p className="text-[11px] font-mono text-gray-500 mt-4 text-center">
            Tip: Upload your picture, choose your favorite frame shape, and share with #DevFestRanchi!
          </p>
        </div>

      </div>

    </div>
  );
};

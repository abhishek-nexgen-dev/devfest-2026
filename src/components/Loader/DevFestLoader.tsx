import React, { useState, useEffect } from "react";
import { soundFx } from "../../utils/audio";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import { DEVFEST_EVENT } from "../../constants/event";

interface DevFestLoaderProps {
  onComplete: () => void;
}

export const DevFestLoader: React.FC<DevFestLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const logs = [
    "Initializing GDG Ranchi core systems...",
    "Mounting AI, Cloud & Mobile tracks...",
    "Configuring speaker auditoriums & codelabs...",
    "Syncing Commudle verified attendee passes...",
    "DevFest Ranchi 2026 ready for launch."
  ];

  useEffect(() => {
    // Quick progress loader
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 8;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 450);

    return () => clearInterval(logInterval);
  }, [logs.length]);

  const handleEnter = () => {
    soundFx.playPop();
    setIsExiting(true);
    setTimeout(() => {
      sessionStorage.setItem("devfest_loader_seen", "true");
      onComplete();
    }, 600);
  };

  const handleSkip = () => {
    soundFx.playClick(600);
    setIsExiting(true);
    setTimeout(() => {
      sessionStorage.setItem("devfest_loader_seen", "true");
      onComplete();
    }, 200);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#060709] flex flex-col items-center justify-between p-6 sm:p-12 text-white selection:bg-brand-blue selection:text-white transition-opacity duration-500 ${
        isExiting ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Top Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <img src={DEVFEST_EVENT.logoUrl} alt="GDG Logo" className="h-6 w-auto" />
          <span className="text-gray-300 font-bold hidden sm:inline">GDG RANCHI</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          <span className="text-gray-300">DEVFEST 2026</span>
        </div>
      </div>

      {/* Centerpiece: Glowing Brackets & Experience Prompt (Inspired by Screenshot 6) */}
      <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto my-auto">
        
        {/* Glowing Developer Angle Brackets < > */}
        <div className="relative mb-8 flex items-center justify-center gap-2 sm:gap-4 select-none">
          <div className="text-6xl sm:text-8xl md:text-9xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red animate-pulse">
            &lt;
          </div>
          
          <div className="relative mx-1 sm:mx-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-[0_0_50px_rgba(66,133,244,0.3)]">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-brand-yellow animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            {/* Ambient background blur */}
            <div className="absolute inset-0 bg-brand-blue/20 rounded-2xl blur-xl -z-10" />
          </div>

          <div className="text-6xl sm:text-8xl md:text-9xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-green animate-pulse">
            &gt;
          </div>
        </div>

        {/* Subtitle / Title */}
        <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white mb-3">
          GDG RANCHI DEVFEST 2026
        </h2>

        <p className="text-xs sm:text-sm font-mono text-gray-400 mb-8 max-w-md">
          Eastern India&apos;s Flagship Engineering &amp; AI Assembly
        </p>

        {/* Technical Loading Progress */}
        <div className="w-full max-w-xs sm:max-w-sm mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
            <span className="flex items-center gap-1.5 truncate">
              <Terminal className="w-3.5 h-3.5 text-brand-green shrink-0" />
              <span className="truncate">{logs[logIndex]}</span>
            </span>
            <span className="font-bold text-white ml-2 shrink-0">{progress}%</span>
          </div>

          {/* Progress track */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-green transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Interactive Enter Button */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <button
            type="button"
            onClick={handleEnter}
            className={`w-full py-3.5 px-6 rounded-full font-mono text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              isReady || progress > 70
                ? "bg-white text-black hover:bg-gray-100 hover:scale-105 shadow-[0_0_35px_rgba(255,255,255,0.3)]"
                : "bg-white/20 text-gray-400 cursor-wait"
            }`}
          >
            <span>ENTER THE DEVFEST EXPERIENCE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Skip Option (Inspired by Screenshot 6) */}
      <div className="w-full max-w-5xl flex items-center justify-between pt-6 border-t border-white/5">
        <span className="text-[11px] font-mono text-gray-500">
          Dec 27, 2026 • Ranchi, India
        </span>

        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-mono text-gray-400 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>I DON&apos;T LIKE ANIMATIONS</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
};

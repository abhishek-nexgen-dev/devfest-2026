
import React, { useEffect, useState } from "react";
import { Sparkles, Terminal, Zap } from "lucide-react";
import { DEVFEST_EVENT } from "../../constants/event";

interface DevFestLoaderProps {
  onComplete: () => void;
}

export const DevFestLoader: React.FC<DevFestLoaderProps> = ({
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);

  const logs = [
    "Initializing GDG Ranchi systems...",
    "Loading AI, Cloud & Mobile tracks...",
    "Preparing speaker sessions & codelabs...",
    "Syncing DevFest experience...",
    "DevFest Ranchi 2026 ready.",
  ];

  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000;

    const progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.round(percentage));

      const nextLog = Math.min(
        Math.floor((percentage / 100) * logs.length),
        logs.length - 1,
      );

      setLogIndex(nextLog);

      if (percentage >= 100) {
        window.clearInterval(progressInterval);

        sessionStorage.setItem("devfest_loader_seen", "true");

        window.setTimeout(() => {
          onComplete();
        }, 250);
      }
    }, 30);

    return () => {
      window.clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] flex min-h-screen items-center justify-center overflow-hidden bg-[#030405] text-white">
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/[0.07] blur-[120px]" />

      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-brand-red/[0.04] blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-brand-green/[0.04] blur-[100px]" />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative flex w-full max-w-3xl flex-col items-center px-6">
        {/* ===================================================
            TOP BRAND
        ==================================================== */}

        <div className="absolute left-6 right-6 top-[-38vh] flex items-center justify-between sm:left-0 sm:right-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl">
              <img
                src={DEVFEST_EVENT.logoUrl}
                alt="GDG Ranchi"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-[10px] font-bold tracking-[0.25em] text-white/40">
                GOOGLE DEVELOPER GROUP
              </p>

              <p className="mt-0.5 text-xs font-semibold tracking-wide text-white/80">
                RANCHI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
            </span>

            <span className="font-mono text-[10px] font-bold tracking-wider text-white/50">
              ONLINE
            </span>
          </div>
        </div>

        {/* ===================================================
            LOGO / CORE
        ==================================================== */}

        <div className="relative mb-10">
          {/* Outer rings */}
          <div className="absolute inset-[-30px] rounded-[38px] border border-white/[0.025]" />

          <div className="absolute inset-[-18px] rounded-[32px] border border-brand-blue/[0.08]" />

          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-brand-blue/10 blur-2xl" />

          {/* Core */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_0_80px_rgba(66,133,244,0.12)] backdrop-blur-2xl sm:h-28 sm:w-28">
            <Sparkles
              className="h-11 w-11 text-brand-yellow"
              strokeWidth={1.4}
            />

            {/* Accent dots */}
            <span className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-brand-red" />
            <span className="absolute bottom-5 left-5 h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="absolute bottom-5 right-5 h-1.5 w-1.5 rounded-full bg-brand-blue" />
          </div>
        </div>

        {/* ===================================================
            TITLE
        ==================================================== */}

        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-blue/50" />

            <span className="font-mono text-[10px] font-bold tracking-[0.35em] text-white/35">
              DEVFEST 2026
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-green/50" />
          </div>

          <h1 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            GDG RANCHI
            <span className="block bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-green bg-clip-text text-transparent">
              DEVFEST
            </span>
          </h1>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:text-xs">
            Eastern India&apos;s Engineering &amp; AI Assembly
          </p>
        </div>

        {/* ===================================================
            TERMINAL LOADER
        ==================================================== */}

        <div className="w-full max-w-lg">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] shadow-2xl backdrop-blur-2xl">
            {/* Terminal header */}
            <div className="flex h-10 items-center justify-between border-b border-white/[0.06] px-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-red/80" />
                <span className="h-2 w-2 rounded-full bg-brand-yellow/80" />
                <span className="h-2 w-2 rounded-full bg-brand-green/80" />
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/25">
                <Terminal className="h-3 w-3" />
                DEVFEST_BOOT
              </div>

              <Zap className="h-3 w-3 text-brand-yellow/50" />
            </div>

            {/* Terminal body */}
            <div className="p-4 sm:p-5">
              <div className="mb-4 flex min-h-[18px] items-center gap-2 font-mono text-[10px] text-white/45 sm:text-xs">
                <span className="text-brand-green">›</span>

                <span className="truncate">
                  {logs[logIndex]}
                </span>

                <span className="h-3 w-1 animate-pulse bg-white/40" />
              </div>

              {/* Progress */}
              <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-green transition-[width] duration-100 ease-linear"
                  style={{
                    width: `${progress}%`,
                  }}
                />

                {/* Shine */}
                <div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
                  style={{
                    left: `calc(${progress}% - 80px)`,
                  }}
                />
              </div>

              {/* Stats */}
              <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider">
                <span className="text-white/25">
                  Loading experience
                </span>

                <span className="font-bold text-white/70">
                  {String(progress).padStart(3, "0")}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            FOOTER INFO
        ==================================================== */}

        <div className="mt-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/20">
          <span>DEC 27, 2026</span>

          <span className="h-1 w-1 rounded-full bg-white/20" />

          <span>RANCHI, INDIA</span>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BRANDING
      ====================================================== */}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] tracking-[0.3em] text-white/15">
        CONNECT • LEARN • GROW
      </div>
    </div>
  );
};

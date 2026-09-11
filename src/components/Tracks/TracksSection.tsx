import { BookOpen, Box, Cloud, Code2, Database, Layout, Smartphone, Blocks } from "lucide-react";
import { DEVFEST_TRACKS } from "../../constants/tracks";
import { SpotlightCard } from "../ui/SpotlightCard";

const trackIcons: Record<string, any> = {
  "ai": Code2,
  "cloud": Cloud,
  "web": Layout,
  "mobile": Smartphone,
  "firebase": Database,
  "opensource": BookOpen,
  default: Box
};

export function TracksSection() {
  return (
    <section id="tracks" className="py-24 lg:py-32 px-4 sm:px-6 relative z-10 bg-dark-bg border-t border-white/5">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-green uppercase mb-6">
            <Blocks className="w-3.5 h-3.5" />
            TECHNOLOGIES FOCUSED
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter mb-6 font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            Tracks & Domains
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed">
            Deep technical deep-dives spanning Generative AI, Cloud Infrastructure, Cross-Platform Mobile, and Modern Web Systems delivered by Google Developer Experts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DEVFEST_TRACKS.map((track) => {
            const IconComp = trackIcons[track.id] || trackIcons.default;
            return (
              <SpotlightCard 
                key={track.id}
                spotlightColor={track.accentColor ? `${track.accentColor}25` : "rgba(255, 255, 255, 0.1)"}
                className="p-8 sm:p-10 border-white/10 hover:border-white/20 bg-dark-surface/60 transition-all flex flex-col items-center text-center rounded-[2rem]"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto"
                  style={{ 
                    backgroundColor: `${track.accentColor}15`,
                    border: `1px solid ${track.accentColor}30`,
                    color: track.accentColor 
                  }}
                >
                  <IconComp className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black font-display text-white mb-4">
                  {track.name}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-6 flex-1">
                  {track.description}
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-2 mt-auto">
                  {track.tags?.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

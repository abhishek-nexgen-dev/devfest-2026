import { DEVFEST_SPEAKERS } from "../../constants/speakers";
import { Speaker } from "../../types/speaker.type";
import { Sparkles, Building, ArrowRight, Linkedin } from "lucide-react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { soundFx } from "../../utils/audio";
import { SpeakerModal } from "./SpeakerModal";
import { SpotlightCard } from "../ui/SpotlightCard";

export function SpeakersSection() {
  const container = useRef<HTMLElement>(null);
  const [activeSpeakerModal, setActiveSpeakerModal] = useState<Speaker | null>(null);

  useGSAP(() => {
    gsap.fromTo(".speaker-header > *",
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".speaker-header",
          start: "top 80%"
        }
      }
    );

    gsap.fromTo(".speaker-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".speakers-grid", start: "top 75%" }
      }
    );
  }, { scope: container });

  return (
    <>
      <section id="speakers" ref={container} className="py-24 lg:py-36 px-4 md:px-6 relative bg-dark-bg border-t border-white/5 overflow-hidden">
        <div className="container max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center text-center mb-16 lg:mb-24 speaker-header">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-red uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              KEYNOTE LEADERS & GUEST EXPERTS
            </div>
            <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] font-black tracking-tighter mb-6 font-display leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              SPEAKERS.
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl font-light leading-relaxed">
              Learn directly from Google Developer Experts, open source maintainers, and seasoned system engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 speakers-grid">
            {DEVFEST_SPEAKERS.map((speaker) => (
              <div
                key={speaker.id}
                onClick={() => {
                  soundFx.playClick(900);
                  setActiveSpeakerModal(speaker);
                }}
                className="speaker-card cursor-pointer group"
              >
                <div className="h-full bg-dark-bg border border-white/10 hover:border-white/25 rounded-[2rem] p-3 flex flex-col transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white/5 mb-4">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      loading="lazy"
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  
                  <div className="px-3 pb-3 flex flex-row items-end justify-between flex-1">
                    <div className="flex flex-col">
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-1 group-hover:text-brand-blue transition-colors">
                        {speaker.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-medium">
                        {speaker.designation}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 font-mono mt-1">
                        {speaker.company}
                      </p>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#0A66C2] group-hover:text-white group-hover:border-[#0A66C2] transition-all shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SpeakerModal
        speaker={activeSpeakerModal}
        onClose={() => setActiveSpeakerModal(null)}
      />
    </>
  );
}


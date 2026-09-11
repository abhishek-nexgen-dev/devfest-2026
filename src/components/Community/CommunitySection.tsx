import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Users, Award, Calendar, HeartHandshake, Sparkles } from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";

export function CommunitySection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".community-header",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%"
        }
      }
    );

    gsap.fromTo(".stat-card-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".community-stats-grid",
          start: "top 80%"
        }
      }
    );
  }, { scope: container });

  const stats = [
    { icon: Users, value: "15,000+", label: "Ecosystem Members", color: "text-brand-blue" },
    { icon: Calendar, value: "50+", label: "Workshops & Meetups", color: "text-brand-green" },
    { icon: Award, value: "120+", label: "Tech Talks Hosted", color: "text-brand-yellow" },
    { icon: HeartHandshake, value: "100%", label: "Volunteer-Led", color: "text-brand-red" },
  ];

  return (
    <section id="community" ref={container} className="py-24 lg:py-36 px-4 md:px-6 relative bg-dark-bg border-t border-white/5">
      <div className="container max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <div className="max-w-4xl community-header mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-green uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            THE GDG RANCHI COLLECTIVE
          </div>

          <h2 className="text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.92] font-black tracking-tighter mb-8 font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">
            MORE THAN AN EVENT.<br/>
            <span className="text-gray-500">A COMMUNITY.</span>
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl mx-auto">
            GDG Ranchi exists beyond one conference. We are a year-round open developer platform empowering coders, designers, students, and engineers across Jharkhand.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="community-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full max-w-6xl">
          {stats.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.label} className="stat-card-item h-full">
                <SpotlightCard 
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                  className="p-4 sm:p-8 text-center flex flex-col items-center justify-center border-white/10 bg-white/[0.03] h-full rounded-[1.5rem] sm:rounded-[2rem] hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 flex items-center justify-center mb-3 sm:mb-5 border border-white/10 shadow-lg">
                    <Icon className={`w-5 h-5 sm:w-7 sm:h-7 ${st.color}`} />
                  </div>
                  <span className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-1 sm:mb-3">
                    {st.value}
                  </span>
                  <span className="text-[10px] sm:text-sm font-mono text-gray-400 uppercase tracking-widest font-semibold leading-tight">
                    {st.label}
                  </span>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


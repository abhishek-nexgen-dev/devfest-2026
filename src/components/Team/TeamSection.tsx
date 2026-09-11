import { useState, useRef, useEffect } from "react";
import { DEVFEST_TEAM, TEAM_CATEGORIES } from "../../constants/team";
import { TeamCategory } from "../../types/team.type";
import { Sparkles, Linkedin, Github, Twitter } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { soundFx } from "../../utils/audio";
import { SpotlightCard } from "../ui/SpotlightCard";

export function TeamSection() {
  const [activeCategory, setActiveCategory] = useState<TeamCategory>("ALL");
  const container = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredTeam = DEVFEST_TEAM.filter(
    (member) => activeCategory === "ALL" || member.category === activeCategory
  );

  useGSAP(() => {
    gsap.fromTo(".team-header-content",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%"
        }
      }
    );
  }, { scope: container });

  // Re-animate grid items on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.35, stagger: 0.04, ease: "power2.out" }
    );
  }, [activeCategory]);

  const handleFilterClick = (category: TeamCategory) => {
    soundFx.playClick(780);
    setActiveCategory(category);
  };

  return (
    <section id="team" ref={container} className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 md:px-8 relative bg-dark-surface border-t border-white/10">
      <div className="container max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 sm:mb-16 gap-6 sm:gap-10">
          <div className="max-w-2xl team-header-content">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-yellow uppercase mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              ORGANIZING COMMITTEE & CREW
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6 font-display leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">
              THE PEOPLE<br />BEHIND IT.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed">
              Meet the community organizers, domain architects, and volunteers powering DevFest Ranchi.
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 w-full lg:max-w-md justify-start lg:justify-end team-header-content">
            {TEAM_CATEGORIES.map((category) => {
              if (category !== "ALL" && !DEVFEST_TEAM.some(m => m.category === category)) return null;
              
              return (
                <button
                  key={category}
                  onClick={() => handleFilterClick(category)}
                  className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    activeCategory === category 
                      ? "bg-white text-black font-bold shadow-lg" 
                      : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col h-full transform hover:-translate-y-1 transition-all duration-300"
            >
              <SpotlightCard
                spotlightColor="rgba(251, 188, 4, 0.15)"
                className="p-3 border-white/10 hover:border-white/25 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 h-full flex flex-col justify-between rounded-[2rem] bg-dark-bg"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden mb-4 bg-white/5 border border-white/10">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover filter grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    
                    {/* Category Tag Overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-yellow">
                        {member.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-brand-yellow transition-colors mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 tracking-wide uppercase mb-3">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2 mb-4">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Always-visible, responsive social profile links */}
                <div className="pt-3 pb-1 px-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    CONNECT
                  </span>

                  <div className="flex items-center gap-1.5">
                    {member.social?.linkedin && (
                      <a 
                        href={member.social.linkedin} 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={() => soundFx.playClick(900)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0A66C2] text-gray-400 hover:text-white flex items-center justify-center transition-colors border border-white/10 hover:border-[#0A66C2] cursor-pointer"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.social?.github && (
                      <a 
                        href={member.social.github} 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={() => soundFx.playClick(900)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white text-gray-400 hover:text-black flex items-center justify-center transition-colors border border-white/10 hover:border-white cursor-pointer"
                        title="GitHub Profile"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.social?.twitter && (
                      <a 
                        href={member.social.twitter} 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={() => soundFx.playClick(900)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#1DA1F2] text-gray-400 hover:text-white flex items-center justify-center transition-colors border border-white/10 hover:border-[#1DA1F2] cursor-pointer"
                        title="Twitter Profile"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

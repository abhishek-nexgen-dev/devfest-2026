import { DEVFEST_EVENT } from "../../constants/event";
import { MapPin, Navigation, Calendar, Clock, Sparkles } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { soundFx } from "../../utils/audio";

export function RanchiSection() {
  const container = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Parallax background
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Content Reveal
    gsap.fromTo(".ranchi-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%"
        }
      }
    );
  }, { scope: container });

  const mapsQuery = encodeURIComponent(`${DEVFEST_EVENT.venue}, ${DEVFEST_EVENT.address}, Ranchi`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <section id="location" ref={container} className="relative py-28 md:py-44 px-4 md:px-6 overflow-hidden border-t border-white/10">
      {/* Background Image with Ambient Darkness */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          ref={bgRef}
          src="https://images.unsplash.com/photo-1596423735880-5c62d00fb5c8?q=80&w=2000&auto=format&fit=crop" 
          alt="Ranchi City" 
          loading="lazy"
          className="w-full h-[125%] -top-[10%] absolute object-cover filter grayscale opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/85 to-dark-bg" />
      </div>
      
      <div className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Label Tag */}
        <div className="ranchi-content inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-red uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          OFFLINE HOST VENUE
        </div>

        {/* Section Title */}
        <div className="overflow-hidden mb-12 pb-2">
          <h2 className="ranchi-content text-[clamp(3.5rem,9vw,8rem)] font-black tracking-tighter font-display leading-[0.92]">
            SEE YOU IN<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">
              {DEVFEST_EVENT.city.toUpperCase()}.
            </span>
          </h2>
        </div>
        
        {/* Venue Spotlight Cards */}
        <div className="ranchi-content w-full max-w-4xl">
          <SpotlightCard 
            spotlightColor="rgba(234, 67, 53, 0.15)"
            className="p-8 md:p-12 border-white/15 bg-black/60 backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              
              {/* Venue details */}
              <div className="md:col-span-7 flex flex-col items-start">
                <div className="relative mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
                  </span>
                </div>

                <h3 className="font-bold text-2xl sm:text-3xl font-display mb-1 text-white">
                  {DEVFEST_EVENT.venue}
                </h3>
                <p className="text-gray-300 font-light text-base sm:text-lg mb-6 leading-relaxed">
                  {DEVFEST_EVENT.address}
                </p>

                <a 
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick(850)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-all cursor-pointer shadow-lg"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Google Maps Directions
                </a>
              </div>
              
              {/* Divider on Desktop */}
              <div className="hidden md:block md:col-span-1 w-px h-32 bg-white/10 mx-auto" />
              
              {/* Schedule and Transit */}
              <div className="md:col-span-4 flex flex-col gap-5 border-t md:border-t-0 pt-6 md:pt-0 border-white/10">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-blue" /> Event Date
                  </span>
                  <p className="font-bold text-xl font-display text-white">{DEVFEST_EVENT.date}</p>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-yellow" /> Door Opening & Time
                  </span>
                  <p className="font-bold text-xl font-display text-white">{DEVFEST_EVENT.time}</p>
                </div>

                <div className="pt-2 border-t border-white/10 text-xs font-mono text-gray-400">
                  <span>📍 Ranchi Junction: ~15 mins</span><br />
                  <span>✈️ Birsa Munda Airport: ~25 mins</span>
                </div>
              </div>

            </div>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
}


import { useRef, useState } from "react";
import { PREVIOUS_DEVFEST_GALLERY } from "../../constants/gallery";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GalleryLightbox } from "./GalleryLightbox";
import { soundFx } from "../../utils/audio";
import { Sparkles, Calendar, Maximize2 } from "lucide-react";

export function PreviousDevFestSection() {
  const container = useRef<HTMLElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number | "ALL">("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery = selectedYear === "ALL" 
    ? PREVIOUS_DEVFEST_GALLERY 
    : PREVIOUS_DEVFEST_GALLERY.filter(item => item.year === selectedYear);

  const gRow1 = PREVIOUS_DEVFEST_GALLERY.slice(0, 6);
  const gRow2 = PREVIOUS_DEVFEST_GALLERY.slice(6, 12);
  
  const extendedRow1 = [...gRow1, ...gRow1];
  const extendedRow2 = [...gRow2, ...gRow2];

  useGSAP(() => {
    // Title reveal
    gsap.fromTo(".archive-title",
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%"
        }
      }
    );

    // Infinite GSAP marquee
    const marquee = (el: HTMLElement | null, duration: number, direction: 1 | -1) => {
      if (!el) return;
      gsap.fromTo(el,
        { xPercent: direction === 1 ? 0 : -50 },
        { 
          xPercent: direction === 1 ? -50 : 0, 
          duration, 
          ease: "none", 
          repeat: -1 
        }
      );
    };

    marquee(row1.current, 45, -1);
    marquee(row2.current, 50, 1);

  }, { scope: container });

  const handlePhotoClick = (index: number) => {
    soundFx.playClick(900);
    setLightboxIndex(index);
  };

  return (
    <>
      <section id="previous-devfest" ref={container} className="py-24 lg:py-36 overflow-hidden bg-black relative border-t border-white/5">
        
        {/* Archive Title & Header */}
        <div className="container max-w-7xl mx-auto px-4 md:px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 archive-title">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-blue uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                HISTORICAL ARCHIVES • 2023 - 2025
              </div>

              <h2 className="text-[clamp(2.75rem,7vw,6rem)] leading-none font-black tracking-tighter font-display text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
                PREVIOUS DEVFEST.
              </h2>
            </div>

            {/* Year Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mr-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Filter:
              </span>
              {(["ALL", 2025, 2024, 2023] as const).map((yr) => (
                <button
                  key={yr}
                  onClick={() => {
                    soundFx.playClick(750);
                    setSelectedYear(yr);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    selectedYear === yr
                      ? "bg-white text-black font-bold shadow-md"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/5"
                  }`}
                >
                  {yr === "ALL" ? "ALL YEARS" : yr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Dual Marquee */}
        <div className="flex flex-col gap-6 -rotate-1 scale-[1.02] transform origin-center">
          
          {/* ROW 1 */}
          <div className="flex w-[200%] md:w-max">
            <div ref={row1} className="flex gap-6 w-full px-2">
              {extendedRow1.map((item, i) => (
                <div 
                  key={`${item.id}-${i}`} 
                  onClick={() => handlePhotoClick(i % PREVIOUS_DEVFEST_GALLERY.length)}
                  className="w-[70vw] md:w-[460px] aspect-[16/10] rounded-2xl overflow-hidden shrink-0 relative group cursor-pointer border border-white/10 shadow-2xl bg-dark-surface"
                >
                  <img 
                    src={item.image} 
                    alt={item.title || "Previous DevFest"} 
                    loading="lazy" 
                    className="w-full h-full object-cover filter grayscale opacity-75 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-brand-yellow uppercase tracking-widest block">
                          DEVFEST {item.year}
                        </span>
                        <h4 className="text-sm font-bold font-display text-white truncate max-w-[280px]">
                          {item.title}
                        </h4>
                      </div>
                      <div className="p-2 rounded-full bg-white/20 text-white">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2 */}
          <div className="flex w-[200%] md:w-max -ml-[30%] md:-ml-[200px]">
            <div ref={row2} className="flex gap-6 w-full px-2">
              {extendedRow2.map((item, i) => (
                <div 
                  key={`${item.id}-${i}`} 
                  onClick={() => handlePhotoClick((i + 6) % PREVIOUS_DEVFEST_GALLERY.length)}
                  className="w-[65vw] md:w-[420px] aspect-[16/10] rounded-2xl overflow-hidden shrink-0 relative group cursor-pointer border border-white/10 shadow-2xl bg-dark-surface"
                >
                  <img 
                    src={item.image} 
                    alt={item.title || "Previous DevFest"} 
                    loading="lazy" 
                    className="w-full h-full object-cover filter grayscale opacity-75 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-brand-green uppercase tracking-widest block">
                          DEVFEST {item.year}
                        </span>
                        <h4 className="text-sm font-bold font-display text-white truncate max-w-[280px]">
                          {item.title}
                        </h4>
                      </div>
                      <div className="p-2 rounded-full bg-white/20 text-white">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        {/* Edge Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
      </section>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        items={PREVIOUS_DEVFEST_GALLERY}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}


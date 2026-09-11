import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { soundFx } from "../../utils/audio";

const sliderImages = [
  {
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop",
    title: "Build sessions",
    desc: "Come, vibe, build, share your projects with an amazing audience."
  },
  {
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    title: "Hackathons",
    desc: "36-hour sprint sessions turning prototypes into working products."
  },
  {
    url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200&auto=format&fit=crop",
    title: "Workshops",
    desc: "Guided deep dives in modern frameworks and scalable architectures."
  }
];

export function CommunityMomentsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    soundFx.playPop();
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    soundFx.playPop();
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-dark-bg border-t border-white/5">
      <div className="container max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-blue uppercase mb-4">
            <Camera className="w-3.5 h-3.5" />
            GLIMPSES
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
            Community Moments
          </h2>
        </div>

        <div 
          className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-white/10 bg-dark-surface shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {sliderImages.map((slide, index) => (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-left">
                <h3 className="text-3xl md:text-5xl font-black font-display text-white mb-3">
                  {slide.title}
                </h3>
                <p className="text-sm md:text-lg text-gray-300 font-light max-w-xl">
                  {slide.desc}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all cursor-pointer z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all cursor-pointer z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFx.playPop();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? "bg-white w-6" : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { DEVFEST_EVENT } from "../../constants/event";
import { ArrowRight, ChevronDown, Sparkles, Terminal, MapPin } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DeveloperGridCanvas } from "../ui/DeveloperGridCanvas";
import { DecryptedText } from "../ui/DecryptedText";
import { MagneticButton } from "../ui/MagneticButton";

import { SplitText } from "../ui/SplitText";

export function HeroSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(".hero-title-char", { yPercent: 120, opacity: 0, rotateX: 55 });
    
    tl.fromTo(".hero-bg", 
      { scale: 1.15, filter: "blur(15px)" }, 
      { scale: 1.02, filter: "blur(0px)", duration: 2.2, ease: "power3.inOut" }
    )
    .fromTo(".hero-badge", 
      { y: 25, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
      "-=1.4"
    )
    .to(".hero-title-char",
      { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.04, ease: "expo.out" },
      "-=0.9"
    )
    .fromTo(".hero-subtitle",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      "-=0.7"
    )
    .fromTo(".hero-cta",
      { y: 20, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.6)" },
      "-=0.6"
    )
    .fromTo(".hero-ticker",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // Subtle scroll parallax for background
    gsap.to(".hero-bg", {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Smooth fade out on scroll
    gsap.to(".hero-content-wrapper", {
      opacity: 0,
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom 30%",
        scrub: true
      }
    });

  }, { scope: container });

  const titleChars = "DEVFEST".split("");

  const techStack = [
    "Gemini 2.0",
    "Google Cloud Run",
    "Flutter 3",
    "Firebase Genkit",
    "Android Jetpack",
    "WebAssembly",
    "Kubernetes / GKE",
    "MediaPipe & Edge AI",
    "Material Design 3",
    "Open Source Ecosystem"
  ];

  return (
    <section 
      ref={container} 
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-dark-bg"
    >
      {/* Interactive Developer Grid Canvas */}
      <DeveloperGridCanvas className="opacity-60" />

      {/* Cinematic Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 hero-bg origin-center pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop" 
          alt="DevFest Crowd" 
          className="w-full h-full object-cover opacity-25 mix-blend-luminosity filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-dark-bg/85 to-dark-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(66,133,244,0.12),transparent_65%)]" />
      </div>
      
      {/* Main Content */}
      <div className="hero-content-wrapper container relative z-10 px-4 md:px-6 max-w-6xl mx-auto flex flex-col items-center text-center mt-6">
        
        {/* Top Developer Meta Badge */}
        <div className="hero-badge flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl text-xs font-mono tracking-widest text-gray-200 uppercase shadow-lg">
            <img 
              src={DEVFEST_EVENT.logoUrl} 
              alt="GDG Logo" 
              className="h-4 w-auto object-contain" 
            />
            <DecryptedText 
              text="GDG RANCHI PRESENTS" 
              characters="01GDGRANCHI_DEVFEST" 
              className="text-white font-bold"
            />
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-brand-green/30 bg-brand-green/10 text-[11px] font-mono tracking-widest text-brand-green uppercase font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>COMMUDLE OFFICIAL • 2026</span>
          </div>
        </div>

        
        {/* Oversized Cinematic DevFest Headline */}
        <div className="overflow-hidden pb-2 mb-3">
          <h1 className="flex text-[clamp(4.2rem,16vw,17rem)] font-black tracking-tighter leading-[0.82] font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 drop-shadow-2xl select-none">
            {titleChars.map((char, i) => (
              <span key={i} className="hero-title-char inline-block origin-bottom">{char}</span>
            ))}
            <span className="text-brand-blue hero-title-char inline-block">.</span>
          </h1>
        </div>
        
        {/* Subtitle & Coordinates */}
        <div className="hero-subtitle flex flex-col items-center gap-6 mb-12 max-w-3xl">
           <SplitText text="BUILD WHAT'S NEXT." delay={1.2} className="text-2xl sm:text-3xl md:text-5xl font-extralight tracking-tight text-gray-200" /> 
            
          

          <p className="text-sm md:text-base text-gray-400 max-w-xl font-light leading-relaxed">
            Eastern India's premier developer assembly. A confluence of software architects, system builders, and community pioneers shaping the intelligence era.</p>
          

          {/* Geo Coordinates & City Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs font-mono text-gray-400 uppercase tracking-widest bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              {DEVFEST_EVENT.city}, {DEVFEST_EVENT.country}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">23.3441° N, 85.3096° E</span>
            <span className="text-gray-600">•</span>
            <span className="text-brand-green font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
              REGISTRATION OPEN
            </span>
          </div>
        </div>
        
        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mb-14">
          <MagneticButton 
            href={DEVFEST_EVENT.registrationUrl}
            className="w-full sm:w-auto px-10 py-4 bg-white text-black font-black text-xs tracking-widest uppercase rounded-full hover:bg-gray-100 shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-transform group flex items-center justify-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-brand-blue" />
            CLAIM YOUR PASS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <a 
            href="#tracks"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs tracking-widest uppercase rounded-full transition-colors flex items-center justify-center gap-2"
          >
            EXPLORE TRACKS
          </a>
        </div>
      </div>

      {/* Infinite Horizontal Technology Stack Ticker */}
      <div className="hero-ticker w-full border-y border-white/10 bg-white/[0.02] backdrop-blur-md py-4 overflow-hidden relative z-10">
        <div className="flex w-fit animate-marquee whitespace-nowrap gap-10 items-center">
          {[...techStack, ...techStack].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase hover:text-white transition-colors cursor-default">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="mt-8 flex flex-col items-center gap-1 text-gray-500 relative z-10">
        <span className="text-[10px] font-mono tracking-widest uppercase">DISCOVER DEVFEST</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-brand-blue" />
      </div>
    </section>
  );
}


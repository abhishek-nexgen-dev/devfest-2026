import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import { SplitText } from "../ui/SplitText";

export function WhatIsDevFestSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".about-content", 
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="py-24 lg:py-36 px-4 md:px-6 relative bg-dark-bg z-10 overflow-hidden border-t border-white/5">
      <div className="container max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="z-10">
            <div className="about-content inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-blue uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              ABOUT DEVFEST
            </div>
            
            <SplitText 
              text="MORE THAN A CONFERENCE." 
              className="text-[clamp(2.75rem,7vw,4.5rem)] font-black tracking-tighter mb-6 font-display leading-[1.1] text-white drop-shadow-lg" 
            />
            
            <p className="about-content text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed font-light mb-8 mt-6">
              DevFest is the flagship decentralized conference organized by Google Developer Groups worldwide. In Ranchi, we unite students, senior engineers, researchers, and creators to accelerate regional tech innovation.
            </p>
            <p className="about-content text-base sm:text-lg text-gray-400 leading-relaxed font-light mb-8">
              Join us for a full day of deep technical dives spanning Generative AI, Cloud Infrastructure, Cross-Platform Mobile, and Modern Web Systems. Let's come together to learn from industry leading experts and build the future.
            </p>

            <div className="about-content flex flex-col gap-4 border-l border-white/10 pl-6 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>COMMUNITY-LED • VOLUNTEER-DRIVEN</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>EQUAL OPPORTUNITY & OPEN ACCESS</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                <span>IN-PERSON EXPERIENCES IN RANCHI</span>
              </div>
            </div>
          </div>

          <div className="about-content relative rounded-3xl overflow-hidden aspect-square lg:aspect-[4/5] border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop" 
              alt="DevFest Audience"
              className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}

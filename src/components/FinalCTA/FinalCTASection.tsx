import { DEVFEST_EVENT } from "../../constants/event";
import { ArrowRight, Sparkles, Ticket } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TicketGenerator } from "./TicketGenerator";
import { MagneticButton } from "../ui/MagneticButton";

export function FinalCTASection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".cta-header-block",
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%"
        }
      }
    );

    gsap.fromTo(".ticket-gen-wrapper",
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".ticket-gen-wrapper",
          start: "top 80%"
        }
      }
    );
  }, { scope: container });

  return (
    <section id="register" ref={container} className="py-28 lg:py-36 px-4 md:px-6 relative bg-dark-bg border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="cta-header-block text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-blue uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            GDG RANCHI DEVFEST 2026
          </div>

          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter mb-6 font-display leading-[0.95] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">
            CLAIM & SHARE<br />YOUR PASS
          </h2>

          <p className="text-base sm:text-xl text-gray-300 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Get your official DevFest 2026 badge! Upload your photo, choose your custom frame shape, and let the tech community know you are attending DevFest Ranchi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={DEVFEST_EVENT.commudleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black text-sm font-mono tracking-widest uppercase rounded-full hover:bg-gray-100 hover:scale-105 transition-all group shadow-[0_0_35px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              BOOK ON COMMUDLE
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </MagneticButton>

            <a
              href="#generate-pass"
              className="px-6 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-widest uppercase transition-colors"
            >
              CREATE BADGE ↓
            </a>
          </div>
        </div>

        {/* Interactive Ticket Generator / Pass Customizer */}
        <div id="generate-pass" className="ticket-gen-wrapper">
          <TicketGenerator />
        </div>


      </div>
    </section>
  );
}


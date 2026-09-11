import { useState, useEffect, useRef } from "react";
import { NAVIGATION_LINKS } from "../../constants/navigation";
import { Menu, X, Volume2, VolumeX, Sparkles } from "lucide-react";
import { DEVFEST_EVENT } from "../../constants/event";
import { soundFx } from "../../utils/audio";
import { MagneticButton } from "../ui/MagneticButton";
import gsap from "gsap";

interface NavbarProps {
  onNavigateAgenda?: () => void;
}

export function Navbar({ onNavigateAgenda }: NavbarProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scrollspy active section
      const sections = NAVIGATION_LINKS.map(link => link.href.replace("#", ""));
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile menu items with GSAP
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        ".mobile-nav-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-dark-bg/85 backdrop-blur-2xl border-b border-white/10 py-3.5 shadow-2xl" 
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Brand Logo with Official GDG Logo */}
          <a 
            href="#" 
            onClick={() => soundFx.playClick(900)}
            className="group flex items-center gap-3 z-50 relative"
          >
            <div className="flex items-center justify-center p-1.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/25 transition-colors">
              <img 
                src={DEVFEST_EVENT.logoUrl} 
                alt="GDG Logo" 
                className="h-6 w-auto object-contain" 
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base md:text-lg font-black font-display tracking-tight text-white group-hover:text-brand-blue transition-colors">
                GDG {DEVFEST_EVENT.city}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-brand-blue uppercase -mt-1 font-semibold">
                DEVFEST 2026
              </span>
            </div>
          </a>


          {/* Desktop Floating Navigation */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={(e) => {
                    soundFx.playClick(700);
                    if (link.href === "#agenda" && onNavigateAgenda) {
                      e.preventDefault();
                      onNavigateAgenda();
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wider uppercase transition-all ${
                    isActive 
                      ? "bg-white/15 text-white shadow-sm" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
              title={isMuted ? "Enable UI Sound Effects" : "Mute Sound Effects"}
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-brand-green animate-pulse" />
              )}
            </button>

            {/* Registration CTA Button */}
            <MagneticButton
              href={DEVFEST_EVENT.registrationUrl}
              className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-100 shadow-md hover:shadow-white/20 transition-all group"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                Register
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 lg:hidden z-50">
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400"
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-green" />}
            </button>

            <button 
              className="p-2.5 rounded-full bg-white/10 text-gray-300 hover:text-white border border-white/15 cursor-pointer"
              onClick={() => {
                soundFx.playClick(500);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Nav Overlay */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-0 bg-dark-bg/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-6"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 w-full px-6 max-w-sm">
          {NAVIGATION_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={(e) => {
                soundFx.playClick(600);
                if (link.href === "#agenda" && onNavigateAgenda) {
                  e.preventDefault();
                  onNavigateAgenda();
                }
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-item text-3xl sm:text-4xl font-black font-display tracking-tight text-white hover:text-brand-blue transition-colors text-center"
            >
              {link.label}
            </a>
          ))}
          <a 
            href={DEVFEST_EVENT.registrationUrl}
            onClick={() => {
              soundFx.playClick(900);
              setMobileMenuOpen(false);
            }}
            className="mobile-nav-item w-full text-center py-4 mt-6 rounded-full bg-white text-black font-black text-sm tracking-widest uppercase shadow-2xl hover:bg-gray-100 transition-colors"
          >
            Claim Your Pass
          </a>
        </nav>
      </div>
    </>
  );
}


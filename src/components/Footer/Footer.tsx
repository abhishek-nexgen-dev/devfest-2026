import { DEVFEST_EVENT } from "../../constants/event";
import { NAVIGATION_LINKS } from "../../constants/navigation";
import { soundFx } from "../../utils/audio";
import { ArrowUpRight, Github, Linkedin, Twitter, Youtube, MessageSquare } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { label: "Discord", icon: MessageSquare, href: "https://discord.gg/gdgranchi" },
    { label: "Twitter/X", icon: Twitter, href: "https://twitter.com/gdgranchi" },
    { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/gdgranchi" },
    { label: "GitHub", icon: Github, href: "https://github.com/gdgranchi" },
    { label: "YouTube", icon: Youtube, href: "https://youtube.com/@gdgranchi" },
  ];

  return (
    <footer className="relative bg-dark-bg border-t border-white/10 overflow-hidden">
      
      {/* Google 4-Color Gradient Accent Line */}
      <div className="h-1 w-full flex">
        <div className="h-full flex-1 bg-brand-blue" />
        <div className="h-full flex-1 bg-brand-red" />
        <div className="h-full flex-1 bg-brand-yellow" />
        <div className="h-full flex-1 bg-brand-green" />
      </div>

      <div className="py-20 md:py-28 px-4 md:px-6">
        <div className="container max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Brand column */}
            <div className="md:col-span-6 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center p-1.5 rounded-xl bg-white/5 border border-white/10">
                  <img 
                    src={DEVFEST_EVENT.logoUrl} 
                    alt="GDG Logo" 
                    className="h-6 w-auto object-contain" 
                  />
                </div>
                <h3 className="text-2xl font-black font-display tracking-tight text-white">
                  GDG {DEVFEST_EVENT.city}
                </h3>
              </div>

              <p className="text-gray-400 font-light text-base max-w-md mb-6 leading-relaxed">
                Google Developer Group Ranchi is an independent, volunteer-led community supported by Google Developers. We organize talks, workshops, and decentralized DevFests for tech makers.
              </p>

              {/* Social Channels */}
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFx.playClick(900)}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white flex items-center justify-center transition-all hover:scale-110"
                      title={s.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Navigation links */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-2">
                Quick Navigation
              </span>
              {NAVIGATION_LINKS.map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => soundFx.playClick(800)}
                  className="text-sm font-mono text-gray-400 hover:text-white transition-colors flex items-center justify-between group py-1"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>

            {/* Legal / Community */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-2">
                Community & Policies
              </span>
              <a 
                href="https://developers.google.com/community-guidelines" 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-mono text-gray-400 hover:text-white transition-colors"
              >
                Community Guidelines
              </a>
              <a 
                href="https://developers.google.com/community/gdg" 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-mono text-gray-400 hover:text-white transition-colors"
              >
                About Google Developer Groups
              </a>
              <a 
                href="https://gdg.community.dev/gdg-ranchi/" 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-mono text-gray-400 hover:text-white transition-colors"
              >
                GDG Ranchi Chapter Page
              </a>
              <a 
                href="mailto:contact@gdgranchi.in" 
                className="text-sm font-mono text-gray-400 hover:text-white transition-colors"
              >
                contact@gdgranchi.in
              </a>
            </div>

          </div>
          
          {/* Massive DEVFEST Typography Background */}
          <div className="w-full border-t border-white/10 pt-16 mb-8 flex items-center justify-center">
            <h2 className="text-[17vw] leading-none font-black font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 via-white/5 to-transparent select-none">
              DEVFEST
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono uppercase text-gray-500 gap-4 pt-6 border-t border-white/5">
            <p>© {new Date().getFullYear()} GDG {DEVFEST_EVENT.city}. BUILT FOR DEVELOPERS BY DEVELOPERS.</p>
            <div className="flex items-center gap-6">
              <span>RANCHI, JHARKHAND</span>
              <span>•</span>
              <span className="text-brand-blue">#DevFestRanchi</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}


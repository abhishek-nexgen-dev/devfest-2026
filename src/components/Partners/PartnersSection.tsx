import { Sparkles, ExternalLink, ShieldCheck, Heart } from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { soundFx } from "../../utils/audio";
import { DEVFEST_EVENT } from "../../constants/event";

interface Partner {
  name: string;
  category: "TITLE PARTNER" | "COMMUNITY PLATFORM" | "ECOSYSTEM PARTNER" | "DIVERSITY PARTNER";
  description: string;
  url: string;
  logo: string;
  badgeColor: string;
}

export function PartnersSection() {
  const partners: Partner[] = [
    {
      name: "Google for Developers",
      category: "TITLE PARTNER",
      description: "Supporting community tech leaders, developer toolkits, and open developer access worldwide.",
      url: "https://developers.google.com",
      logo: "https://www.gstatic.com/devrel-devsite/prod/v22998f804cc61408894101e40eb5ea87f1ea5d28a3036a449fa81f44005b630e/developers/images/touchicon-180.png",
      badgeColor: "border-brand-blue/40 text-brand-blue bg-brand-blue/10"
    },
    {
      name: "Commudle",
      category: "COMMUNITY PLATFORM",
      description: "Official ticketing, RSVP, and verified registration platform for GDG Ranchi DevFest 2026.",
      url: DEVFEST_EVENT.commudleUrl,
      logo: "https://www.commudle.com/favicon.ico",
      badgeColor: "border-brand-green/40 text-brand-green bg-brand-green/10"
    },
    {
      name: "Women Techmakers",
      category: "DIVERSITY PARTNER",
      description: "Google's global program providing visibility, community, and resources for women in technology.",
      url: "https://developers.google.com/womentechmakers",
      logo: "https://developers.google.com/static/womentechmakers/images/wtm-logo.png",
      badgeColor: "border-brand-yellow/40 text-brand-yellow bg-brand-yellow/10"
    },
    {
      name: "GitHub Education & Campus",
      category: "ECOSYSTEM PARTNER",
      description: "Empowering student builders and open source contributors with tools, credits, and community packs.",
      url: "https://github.com",
      logo: "https://github.githubassets.com/favicons/favicon.png",
      badgeColor: "border-white/20 text-gray-200 bg-white/5"
    }
  ];

  return (
    <section id="partners" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-dark-bg border-t border-white/10">
      <div className="container max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-blue uppercase mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            SUPPORTING ORGANIZATIONS
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 font-display text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">
            PARTNERS & ECOSYSTEM
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed">
            Proudly organized with support from global technology leaders, regional developer communities, and education partners.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick(850)}
              className="group block h-full"
            >
              <SpotlightCard
                spotlightColor="rgba(66, 133, 244, 0.15)"
                className="p-6 border-white/10 hover:border-white/25 transition-all duration-300 h-full flex flex-col justify-between rounded-2xl bg-dark-surface/60 group-hover:bg-dark-surface/90"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border ${partner.badgeColor}`}>
                      {partner.category}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-brand-blue transition-colors mb-2">
                    {partner.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-1 text-[11px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                  <span>Verified Community Supporter</span>
                </div>
              </SpotlightCard>
            </a>
          ))}
        </div>

        {/* Community Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold font-display text-white">
                Interested in Sponsoring DevFest Ranchi 2026?
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 font-light">
                Connect your engineering brand with 1,000+ developers, tech leaders, and students across Jharkhand.
              </p>
            </div>
          </div>

          <a
            href={`mailto:gdgranchi@gmail.com?subject=DevFest%20Ranchi%202026%20Sponsorship`}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap border border-white/20 hover:border-white"
          >
            BECOME A PARTNER
          </a>
        </div>

      </div>
    </section>
  );
}

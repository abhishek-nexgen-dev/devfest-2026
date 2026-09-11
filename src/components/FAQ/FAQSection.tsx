import { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles, ExternalLink } from "lucide-react";
import { soundFx } from "../../utils/audio";
import { DEVFEST_EVENT } from "../../constants/event";

interface FAQItem {
  question: string;
  answer: string;
  linkText?: string;
  linkUrl?: string;
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is DevFest Ranchi 2026?",
      answer: "DevFest is an annual decentralized tech conference hosted by Google Developer Groups across the globe. DevFest Ranchi is Eastern India's largest community-led developer assembly, featuring keynotes, technical tracks, codelabs, and networking with Google Developer Experts (GDEs) and tech makers."
    },
    {
      question: "How do I register and reserve my seat?",
      answer: "Official attendee registrations and ticketing are managed exclusively via Commudle. Head over to our official Commudle community page, select DevFest Ranchi 2026, and complete your RSVP. You will receive your official conference QR code upon confirmation.",
      linkText: "Book Tickets on Commudle",
      linkUrl: DEVFEST_EVENT.commudleUrl
    },
    {
      question: "Is there an entry fee to attend DevFest Ranchi?",
      answer: "GDG Ranchi is a volunteer-led non-profit community. DevFest ticket tiers are kept maximally accessible and subsidized through the generous support of Google for Developers and our community partners."
    },
    {
      question: "Will lunch, refreshments, and conference swag be provided?",
      answer: "Yes! All verified attendees with a valid Commudle conference ticket receive lunch, morning and afternoon refreshments, and an exclusive DevFest Ranchi 2026 delegate kit packed with official stickers, badges, and goodies."
    },
    {
      question: "Who can attend DevFest? Can college students and beginners join?",
      answer: "Absolutely! DevFest welcomes everyone—from first-year university students and coding bootcamp learners to senior architects, founders, and engineering managers. Sessions range from foundational workshops to advanced architectural masterclasses."
    },
    {
      question: "Will attendees receive a certificate of participation?",
      answer: "Yes, all verified attendees who check in with their Commudle QR code at the venue will receive an official verifiable digital Certificate of Attendance from Google Developer Group Ranchi."
    }
  ];

  const handleToggle = (index: number) => {
    soundFx.playClick(800);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-dark-surface border-t border-white/10">
      <div className="container max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-green uppercase mb-4 sm:mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 font-display text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">
            EVERYTHING YOU NEED<br />TO KNOW
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed">
            Got questions about attending DevFest Ranchi 2026? Here are answers to the most common inquiries.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white/[0.04] border-white/20 shadow-xl"
                    : "bg-white/[0.015] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold font-display text-white">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-300 ${isOpen ? "rotate-180 bg-white/15" : ""}`}>
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-gray-300 font-light leading-relaxed border-t border-white/5">
                    <p>{faq.answer}</p>
                    {faq.linkText && faq.linkUrl && (
                      <a
                        href={faq.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-xs sm:text-sm font-mono font-bold text-brand-blue hover:underline"
                      >
                        <span>{faq.linkText}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

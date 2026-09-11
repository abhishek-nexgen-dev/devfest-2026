import React, { useEffect } from "react";
import { Speaker } from "../../types/speaker.type";
import { X, Clock, Linkedin, Twitter, Github, Globe, CheckCircle2, Building, Sparkles } from "lucide-react";
import { soundFx } from "../../utils/audio";

interface SpeakerModalProps {
  speaker: Speaker | null;
  onClose: () => void;
}

export const SpeakerModal: React.FC<SpeakerModalProps> = ({ speaker, onClose }) => {
  useEffect(() => {
    if (!speaker) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundFx.playClick(400);
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [speaker, onClose]);

  if (!speaker) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-8 transition-all"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-dark-surface border border-white/15 rounded-3xl p-6 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick(400);
            onClose();
          }}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Speaker Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-white/20 shadow-xl">
            <img 
              src={speaker.image} 
              alt={speaker.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-blue text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {speaker.category || speaker.topic}
            </div>
            <h3 className="text-3xl font-black font-display text-white mb-1">{speaker.name}</h3>
            <p className="text-gray-300 font-light text-base flex items-center justify-center sm:justify-start gap-2">
              <Building className="w-4 h-4 text-brand-green" />
              <span>{speaker.designation}</span>
              <span className="text-gray-600">•</span>
              <span className="font-semibold text-white">{speaker.company}</span>
            </p>
          </div>
        </div>

        {/* Session Details */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-yellow uppercase tracking-widest mb-2">
            <Clock className="w-4 h-4" />
            <span>{speaker.timeSlot || "Keynote Session • Main Hall"}</span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold font-display text-white mb-3">
            {speaker.topic}
          </h4>
          <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed mb-6">
            {speaker.bio || "Industry leader delivering a keynote presentation at DevFest Ranchi 2026, exploring cutting-edge developer platforms and practical architectural patterns."}
          </p>

          {/* Key Takeaways */}
          {speaker.keyTakeaways && speaker.keyTakeaways.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 mb-6">
              <h5 className="text-xs font-mono font-bold tracking-widest text-gray-300 uppercase mb-3">
                Key Session Takeaways:
              </h5>
              <ul className="space-y-2">
                {speaker.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Social connections */}
        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Connect with Speaker</span>
          <div className="flex items-center gap-3">
            {speaker.social?.linkedin && (
              <a 
                href={speaker.social.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {speaker.social?.twitter && (
              <a 
                href={speaker.social.twitter} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {speaker.social?.github && (
              <a 
                href={speaker.social.github} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {speaker.social?.website && (
              <a 
                href={speaker.social.website} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

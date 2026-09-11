import React, { useState } from "react";
import { DEVFEST_AGENDA } from "../../constants/agenda";
import { AgendaItem } from "../../types/agenda.type";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  Filter,
  User,
  ChevronRight,
  CalendarPlus
} from "lucide-react";
import { soundFx } from "../../utils/audio";
import { DEVFEST_EVENT } from "../../constants/event";

interface AgendaSectionProps {
  onOpenFullAgenda?: () => void;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({ onOpenFullAgenda }) => {
  const [selectedTrack, setSelectedTrack] = useState<string>("ALL");
  const [activeSession, setActiveSession] = useState<AgendaItem | null>(null);

  const tracks = [
    { id: "ALL", label: "All Sessions" },
    { id: "Keynote", label: "Keynote" },
    { id: "AI & Cloud", label: "AI & Cloud" },
    { id: "Mobile & Web", label: "Mobile & Web" },
    { id: "Workshop", label: "Workshops" }
  ];

  const filteredAgenda = selectedTrack === "ALL" 
    ? DEVFEST_AGENDA 
    : DEVFEST_AGENDA.filter(item => item.track === selectedTrack);

  const getTrackBadgeColor = (track: string) => {
    switch (track) {
      case "Keynote":
        return "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30";
      case "AI & Cloud":
        return "bg-brand-blue/10 text-brand-blue border-brand-blue/30";
      case "Mobile & Web":
        return "bg-brand-green/10 text-brand-green border-brand-green/30";
      case "Workshop":
        return "bg-brand-red/10 text-brand-red border-brand-red/30";
      default:
        return "bg-white/5 text-gray-300 border-white/10";
    }
  };

  const getGoogleCalendarUrl = (item: AgendaItem) => {
    const title = encodeURIComponent(`${item.title} - GDG Ranchi DevFest 2026`);
    const details = encodeURIComponent(`${item.description}\n\nVenue: ${DEVFEST_EVENT.venue}, ${DEVFEST_EVENT.city}\nTrack: ${item.track}`);
    const location = encodeURIComponent(`${DEVFEST_EVENT.venue}, ${DEVFEST_EVENT.city}, India`);
    
    // Dec 27, 2026
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261227T033000Z/20261227T120000Z`;
  };

  return (
    <section id="agenda" className="py-24 lg:py-32 px-4 sm:px-6 relative bg-dark-bg border-t border-white/10">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 font-display text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">
              AGENDA
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light max-w-2xl leading-relaxed">
              DevFest Ranchi 2026 Schedule — Join us for an amazing full day of cutting-edge tech sessions, hands-on codelabs, and community building.
            </p>
          </div>

          {/* Quick Details Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2.5 text-xs font-mono text-gray-200">
              <Calendar className="w-4 h-4 text-brand-blue" />
              <span className="font-bold text-white">December 27, 2026</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2.5 text-xs font-mono text-gray-200">
              <Clock className="w-4 h-4 text-brand-green" />
              <span>09:00 AM - 05:30 PM</span>
            </div>
          </div>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <Filter className="w-4 h-4 text-gray-500 mr-1 hidden sm:block" />
            {tracks.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  soundFx.playClick(750);
                  setSelectedTrack(t.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedTrack === t.id
                    ? "bg-white text-black font-bold shadow-md scale-105"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {onOpenFullAgenda && (
            <button
              type="button"
              onClick={onOpenFullAgenda}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-blue hover:text-white transition-colors cursor-pointer"
            >
              <span>View Full Agenda Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Schedule Table / List Layout */}
        <div className="space-y-4">
          {filteredAgenda.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                soundFx.playClick(800);
                setActiveSession(activeSession?.id === item.id ? null : item);
              }}
              className={`rounded-2xl border transition-all duration-300 p-5 sm:p-6 cursor-pointer ${
                activeSession?.id === item.id
                  ? "bg-white/[0.06] border-white/30 shadow-2xl scale-[1.005]"
                  : "bg-dark-surface/80 border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Time & Room Column */}
                <div className="md:w-56 shrink-0 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-mono font-bold text-white">
                    <Clock className="w-4 h-4 text-brand-blue" />
                    <span>{item.time}</span>
                    <span className="text-gray-500 font-normal">-</span>
                    <span className="text-gray-400 font-normal">{item.endTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span className="truncate">{item.room}</span>
                  </div>
                </div>

                {/* Session Title & Speaker Column */}
                <div className="flex-1 text-left">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getTrackBadgeColor(item.track)}`}>
                      {item.track}
                    </span>
                    {item.level && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                        {item.level}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.speaker && (
                    <div className="flex items-center gap-2.5 mt-2.5">
                      {item.speakerAvatar ? (
                        <img 
                          src={item.speakerAvatar} 
                          alt={item.speaker} 
                          className="w-7 h-7 rounded-full object-cover border border-white/20" 
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-bold text-gray-200 block leading-tight">
                          {item.speaker}
                        </span>
                        {item.speakerRole && (
                          <span className="text-[11px] font-mono text-gray-400 block">
                            {item.speakerRole}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions: Add to Calendar & Expand */}
                <div className="shrink-0 flex items-center gap-2 self-end md:self-center pt-2 md:pt-0">
                  <a
                    href={getGoogleCalendarUrl(item)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick(900);
                    }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
                    title="Add to Google Calendar"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-brand-green" />
                    <span className="hidden sm:inline">Add to Calendar</span>
                  </a>
                </div>
              </div>

              {/* Collapsible Session Details */}
              {activeSession?.id === item.id && (
                <div className="mt-5 pt-4 border-t border-white/10 text-left">
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Tag className="w-3 h-3 text-gray-500 mr-1" />
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-brand-blue/10 via-brand-green/10 to-brand-yellow/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-lg sm:text-xl font-black font-display text-white mb-1">
              Want the full schedule saved on your phone?
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              RSVP on Commudle to get live notification alerts, speaker room updates, and verified delegate badges.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={DEVFEST_EVENT.commudleUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick(900)}
              className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-gray-100 transition-colors shadow-lg whitespace-nowrap"
            >
              RESERVE SEAT ON COMMUDLE
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

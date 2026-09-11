import React, { useState, useMemo } from "react";
import { DEVFEST_AGENDA } from "../../constants/agenda";
import { AgendaItem } from "../../types/agenda.type";
import { DEVFEST_EVENT } from "../../constants/event";
import { soundFx } from "../../utils/audio";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  ArrowLeft, 
  CalendarPlus, 
  Tag, 
  User, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  Share2,
  Check
} from "lucide-react";

interface AgendaPageProps {
  onBackToHome: () => void;
}

export const AgendaPage: React.FC<AgendaPageProps> = ({ onBackToHome }) => {
  const [selectedTrack, setSelectedTrack] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedSession, setExpandedSession] = useState<string | null>("session-3");
  const [copiedSchedule, setCopiedSchedule] = useState(false);

  const tracks = [
    { id: "ALL", label: "All Sessions" },
    { id: "Keynote", label: "Keynotes" },
    { id: "AI & Cloud", label: "AI & Cloud" },
    { id: "Mobile & Web", label: "Mobile & Web" },
    { id: "Workshop", label: "Workshops & Codelabs" },
    { id: "General", label: "Networking & Food" }
  ];

  const filteredSessions = useMemo(() => {
    return DEVFEST_AGENDA.filter((item) => {
      const matchesTrack = selectedTrack === "ALL" || item.track === selectedTrack;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.speaker && item.speaker.toLowerCase().includes(q)) ||
        (item.room && item.room.toLowerCase().includes(q)) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
      return matchesTrack && matchesQuery;
    });
  }, [selectedTrack, searchQuery]);

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
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261227T033000Z/20261227T120000Z`;
  };

  const handleShareSchedule = () => {
    soundFx.playClick(850);
    const text = `Check out the complete agenda for GDG Ranchi DevFest 2026! 📅 December 27, 2026 at Auditorium Hall, Ranchi. Keynotes on Gemini 2.0, Jetpack Compose, Cloud Run & hands-on workshops.\n\nRegister: ${DEVFEST_EVENT.commudleUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 2500);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-blue selection:text-white font-sans">
      
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 bg-dark-bg/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick(700);
              onBackToHome();
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-200 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to DevFest Home</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShareSchedule}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              {copiedSchedule ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedSchedule ? "Copied!" : "Share Schedule"}</span>
            </button>

            <a
              href={DEVFEST_EVENT.commudleUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick(900)}
              className="px-4 py-1.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors shadow-[0_0_20px_rgba(66,133,244,0.3)] inline-flex items-center gap-1.5"
            >
              <span>Book on Commudle</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-brand-yellow uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            OFFICIAL CONFERENCE AGENDA
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white mb-4">
            AGENDA
          </h1>

          <p className="text-sm sm:text-lg text-gray-400 font-light leading-relaxed mb-8">
            DevFest Ranchi 2026 Schedule — Join us for an amazing full day of cutting-edge tech sessions, visionary keynotes, hands-on codelabs, and community building.
          </p>

          {/* Quick Schedule Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs sm:text-sm font-mono text-gray-200">
              <Calendar className="w-4 h-4 text-brand-blue" />
              <span className="font-bold text-white">December 27, 2026</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs sm:text-sm font-mono text-gray-200">
              <Clock className="w-4 h-4 text-brand-green" />
              <span>09:00 AM - 05:30 PM IST</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs sm:text-sm font-mono text-gray-200">
              <MapPin className="w-4 h-4 text-brand-red" />
              <span>Auditorium Hall, Ranchi</span>
            </div>
          </div>
        </div>

        {/* Filter Controls: Search and Tracks */}
        <div className="bg-dark-surface/90 border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, speakers, tags..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            {/* Track Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {tracks.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick(750);
                    setSelectedTrack(t.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedTrack === t.id
                      ? "bg-white text-black font-bold shadow-md"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/5"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Sessions Count indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 px-2 mb-4">
          <span>Showing {filteredSessions.length} sessions</span>
          <span>Click any session to view takeaways & details</span>
        </div>

        {/* Sessions Timeline List */}
        <div className="space-y-4">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl border border-white/10 bg-white/[0.02]">
              <p className="text-gray-400 font-mono text-sm mb-3">No sessions found matching your search.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack("ALL");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredSessions.map((session) => {
              const isExpanded = expandedSession === session.id;
              return (
                <div
                  key={session.id}
                  onClick={() => {
                    soundFx.playClick(800);
                    setExpandedSession(isExpanded ? null : session.id);
                  }}
                  className={`rounded-2xl border transition-all duration-300 p-5 sm:p-6 cursor-pointer ${
                    isExpanded
                      ? "bg-white/[0.12] border-brand-blue/50 shadow-[0_0_30px_rgba(66,133,244,0.15)] scale-[1.01]"
                      : "bg-white/[0.05] border-white/20 hover:border-white/40 hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Time & Location Column */}
                    <div className="md:w-56 shrink-0 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
                      <div className="flex items-center gap-2 text-sm sm:text-base font-mono font-bold text-white">
                        <Clock className="w-4 h-4 text-brand-blue" />
                        <span>{session.time}</span>
                        <span className="text-gray-500 font-normal">-</span>
                        <span className="text-gray-400 font-normal">{session.endTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span className="truncate">{session.room}</span>
                      </div>
                    </div>

                    {/* Session Info & Speaker */}
                    <div className="flex-1 text-left">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getTrackBadgeColor(session.track)}`}>
                          {session.track}
                        </span>
                        {session.level && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                            {session.level}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-brand-blue transition-colors">
                        {session.title}
                      </h3>

                      {session.speaker && (
                        <div className="flex items-center gap-2.5 mt-2.5">
                          {session.speakerAvatar ? (
                            <img 
                              src={session.speakerAvatar} 
                              alt={session.speaker} 
                              className="w-8 h-8 rounded-full object-cover border border-white/20" 
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                          <div>
                            <span className="text-xs font-bold text-gray-200 block leading-tight">
                              {session.speaker}
                            </span>
                            {session.speakerRole && (
                              <span className="text-[11px] font-mono text-gray-400 block">
                                {session.speakerRole}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Add Calendar Button */}
                    <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                      <a
                        href={getGoogleCalendarUrl(session)}
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
                      <div className={`p-2 rounded-xl bg-white/5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                  </div>

                  {/* Expanded Session Details */}
                  {isExpanded && (
                    <div className="mt-5 pt-4 border-t border-white/10 text-left">
                      <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-4">
                        {session.description}
                      </p>
                      
                      {session.tags && session.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Tag className="w-3 h-3 text-gray-500 mr-1" />
                          {session.tags.map((tag) => (
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
              );
            })
          )}
        </div>

        {/* Back to Home CTA Footer */}
        <div className="mt-16 text-center py-10 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick(700);
              onBackToHome();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-bold tracking-widest uppercase transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO DEVFEST RANCHI 2026 HOMEPAGE</span>
          </button>
        </div>

      </main>

    </div>
  );
};

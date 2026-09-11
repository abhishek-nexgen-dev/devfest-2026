import React, { useEffect, useCallback } from "react";
import { GalleryItem } from "../../types/gallery.type";
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { soundFx } from "../../utils/audio";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  const isOpen = currentIndex !== null;
  const currentItem = currentIndex !== null ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    soundFx.playClick(600);
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    soundFx.playClick(800);
    onSelectIndex((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundFx.playClick(400);
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 md:p-10 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top controls */}
      <div 
        className="absolute top-6 inset-x-6 flex items-center justify-between z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-mono tracking-widest uppercase">
          <Calendar className="w-3.5 h-3.5 text-brand-blue" />
          <span>DevFest {currentItem.year}</span>
          <span className="text-gray-500">•</span>
          <span>{currentIndex + 1} of {items.length}</span>
        </div>

        <button
          onClick={() => {
            soundFx.playClick(400);
            onClose();
          }}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div 
        className="relative max-w-5xl w-full flex flex-col items-center justify-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] max-h-[72vh] rounded-3xl overflow-hidden bg-dark-surface shadow-[0_25px_70px_rgba(0,0,0,0.8)] border border-white/10">
          <img
            src={currentItem.image}
            alt={currentItem.title || `DevFest ${currentItem.year}`}
            className="w-full h-full object-contain md:object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Bottom metadata */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-[11px] font-mono uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Community Archive
            </div>
            <h3 className="text-2xl md:text-3xl font-black font-display text-white mb-1">
              {currentItem.title || `DevFest Ranchi ${currentItem.year}`}
            </h3>
            {currentItem.caption && (
              <p className="text-sm md:text-base text-gray-300 font-light max-w-2xl">
                {currentItem.caption}
              </p>
            )}
          </div>
        </div>

        {/* Prev / Next navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

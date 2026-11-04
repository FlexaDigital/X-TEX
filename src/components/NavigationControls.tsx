import React from 'react';
import { ChevronDown } from 'lucide-react';

interface NavigationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
  slideLabels?: string[];
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentSlide,
  totalSlides,
  onNavigate,
  slideLabels = [],
}) => {
  return (
    <>
      {/* Right Vertical Dot Navigation Indicator */}
      <nav
        aria-label="Story progress navigation"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 sm:gap-2.5 bg-white/50 backdrop-blur-md px-2 py-3 rounded-full border border-white/70 shadow-[0_4px_24px_rgba(74,46,104,0.08)]"
      >
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = currentSlide === idx;
          const label = slideLabels[idx] || `Slide ${idx + 1}`;

          return (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              aria-label={`Go to slide ${idx + 1}: ${label}`}
              className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
            >
              {/* Tooltip on hover (desktop) */}
              <span className="hidden md:block absolute right-7 px-2.5 py-1 rounded-md bg-[#4A2E68] text-white text-[11px] font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all pointer-events-none shadow-md">
                {idx + 1}. {label}
              </span>

              {/* Dot indicator */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-3 bg-[#4A2E68] ring-3 ring-[#E6E0FA]'
                    : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B8A5E6]/70 hover:bg-[#7E52A0] hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Floating Bottom Scroll Hint (on slides before the last) */}
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={() => onNavigate(currentSlide + 1)}
          aria-label="Scroll to next slide"
          className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-[#7E52A0]/80 hover:text-[#4A2E68] transition-colors group cursor-pointer focus:outline-none"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-medium opacity-70 group-hover:opacity-100 transition-opacity">
            Scroll down
          </span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce text-[#7E52A0]" />
        </button>
      )}
    </>
  );
};

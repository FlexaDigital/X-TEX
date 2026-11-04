import React, { useState } from 'react';
import { FallInLoveItem } from '../../data/storyData';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { RomanticImage } from '../RomanticArtworks';

interface FallInLoveSlideProps {
  heading: string;
  subtitle: string;
  moments: FallInLoveItem[];
  imageUrl?: string;
}

export const FallInLoveSlide: React.FC<FallInLoveSlideProps> = ({
  heading,
  subtitle,
  moments,
  imageUrl,
}) => {
  const [activeMoment, setActiveMoment] = useState<number>(0);

  return (
    <section className="slide-section flex items-center justify-center px-4 sm:px-6 lg:px-12 py-6 relative">
      <div className="max-w-6xl w-full mx-auto z-10 flex flex-col justify-center h-full max-h-[92vh]">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-6">
          <span className="font-script-romantic text-2xl text-[#7E52A0]">Chapter 02 · The Turning Points</span>
          <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-semibold text-[#4A2E68] tracking-tight mt-0.5">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B4B8B]/80 max-w-xl mx-auto mt-1">
            {subtitle}
          </p>
        </div>

        {/* Main Content Split: Keepsake Polaroid on Left & Interactive Turning Point Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-h-[72vh] p-2">
          {/* Left Column: Polaroid Keepsake */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-[#E6E0FA]/60 rounded-2xl blur-lg group-hover:bg-[#F5D0E3]/60 transition-all duration-500" />
              
              <div className="relative polaroid-frame rounded-2xl w-60 sm:w-68 md:w-72 -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-1" />

                <div className="w-full h-60 sm:h-72 md:h-80 rounded-xl overflow-hidden bg-[#FAF5FF] border border-[#F0EBF9]">
                  <RomanticImage
                    src={imageUrl}
                    alt="Falling in love with you"
                    fallbackType="fall_in_love"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-script-romantic text-lg text-[#4A2E68]">
                    falling harder every day 🌸
                  </p>
                </div>
              </div>
            </div>

            {/* Quote of active moment */}
            <div className="mt-3 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E6E0FA] text-center w-full max-w-xs">
              <Quote className="w-3.5 h-3.5 text-[#E87A90] mx-auto mb-1 fill-pink-100" />
              <p className="font-script-romantic text-base text-[#4A2E68]">
                "{moments[activeMoment]?.quote || moments[0]?.quote}"
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Turning Points */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {moments.map((item, idx) => {
              const isSelected = activeMoment === idx;
              const isHeroCard = moments.length === 3 && idx === 0;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveMoment(idx)}
                  className={`glass-card p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                    isHeroCard ? 'sm:col-span-2' : ''
                  } ${
                    isSelected
                      ? 'border-[#7E52A0] ring-2 ring-[#E6E0FA] shadow-md bg-white/95 scale-[1.01]'
                      : 'hover:border-[#B8A5E6] hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-semibold text-[#7E52A0]">
                      MOMENT {item.number}
                    </span>
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isSelected ? 'text-[#E87A90] fill-[#E87A90]' : 'text-slate-300'
                      }`}
                    />
                  </div>

                  <h3 className="font-serif-romantic text-lg sm:text-xl font-semibold text-[#4A2E68] mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5D3D80] leading-relaxed mb-3">
                    {item.story}
                  </p>

                  <div className="pt-2 border-t border-[#F0EBF9] flex items-center gap-1.5 text-xs text-[#E87A90]">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span className="font-script-romantic text-sm leading-none truncate">
                      {item.quote}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { SpecialAspect } from '../../data/storyData';
import { ShieldCheck, Compass, Sun, Sparkles, Heart, Star } from 'lucide-react';

interface SpecialSlideProps {
  heading: string;
  subtitle: string;
  aspects: SpecialAspect[];
}

export const SpecialSlide: React.FC<SpecialSlideProps> = ({
  heading,
  subtitle,
  aspects,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldHeart':
        return <ShieldCheck className="w-5 h-5 text-[#E87A90]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#7E52A0]" />;
      case 'SunMedium':
        return <Sun className="w-5 h-5 text-[#E8A598]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#B8A5E6]" />;
    }
  };

  return (
    <section className="slide-section flex items-center justify-center px-4 sm:px-6 lg:px-12 py-6 relative">
      <div className="max-w-6xl w-full mx-auto z-10 flex flex-col justify-center h-full max-h-[92vh]">
        {/* Section Header */}
        <div className="text-center mb-5 sm:mb-6">
          <span className="font-script-romantic text-2xl text-[#7E52A0]">Chapter 05 · Irreplaceable</span>
          <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-semibold text-[#4A2E68] tracking-tight mt-0.5">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B4B8B]/80 max-w-xl mx-auto mt-1">
            {subtitle}
          </p>
        </div>

        {/* Centerpiece Stat Strip */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E6E0FA] text-xs font-medium text-[#4A2E68] shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#E87A90] fill-pink-100" />
            <span className="font-mono tabular-nums font-semibold">1 in 8,000,000,000</span>
            <span className="text-[#D1C4E9]">·</span>
            <span>Completely My Person</span>
          </div>
        </div>

        {/* 4 Balanced Glassmorphism Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[60vh] p-2">
          {aspects.map((item, idx) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF5FF] border border-[#E6E0FA] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FAF5FF] border border-[#E6E0FA] text-[10px] uppercase font-semibold tracking-wider text-[#7E52A0]">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="font-serif-romantic text-xl font-semibold text-[#4A2E68] mb-2 group-hover:text-[#7E52A0] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5D3D80] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0EBF9] flex items-center justify-between text-xs text-[#7E52A0]">
                <span className="font-script-romantic text-base text-[#E87A90]">
                  why no one compares to you ✨
                </span>
                <Star className="w-3.5 h-3.5 text-[#FFE082] fill-amber-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

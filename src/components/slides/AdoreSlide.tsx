import React, { useState } from 'react';
import { AdoreReason } from '../../data/storyData';
import { Sparkles, HeartHandshake, ShieldCheck, Flame, Heart, ChevronRight } from 'lucide-react';

interface AdoreSlideProps {
  heading: string;
  subtitle: string;
  reasons: AdoreReason[];
}

export const AdoreSlide: React.FC<AdoreSlideProps> = ({
  heading,
  subtitle,
  reasons,
}) => {
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#E87A90]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#7E52A0]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#E87A90]" />;
      case 'Flame':
      default:
        return <Flame className="w-5 h-5 text-[#B8A5E6]" />;
    }
  };

  return (
    <section className="slide-section flex items-center justify-center px-4 sm:px-6 lg:px-12 py-5 relative">
      <div className="max-w-5xl w-full mx-auto z-10 flex flex-col justify-center h-full max-h-[92vh]">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-6">
          <span className="font-script-romantic text-2xl text-[#7E52A0]">Page 04 · Pure Reasons</span>
          <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-semibold text-[#4A2E68] tracking-tight mt-0.5">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B4B8B]/80 max-w-xl mx-auto mt-1">
            {subtitle}
          </p>
        </div>

        {/* 4 Clean, Heartfelt Reasons in a Balanced 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 overflow-y-auto max-h-[64vh] p-2">
          {reasons.map((item, idx) => {
            const isRevealed = revealedIds[item.id];

            return (
              <div
                key={item.id}
                onClick={() => toggleReveal(item.id)}
                className="group relative cursor-pointer glass-card glass-card-hover rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-[#E6E0FA] hover:border-[#B8A5E6] transition-all"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF5FF] border border-[#E6E0FA] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(item.icon)}
                    </div>
                    <span className="text-xs font-mono tabular-nums text-[#7E52A0]/80 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-romantic text-xl font-bold text-[#4A2E68] mb-2 group-hover:text-[#7E52A0] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#5D3D80] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Secret Whisper on Click / Hover */}
                <div className="mt-4 pt-3 border-t border-[#F0EBF9]">
                  {isRevealed ? (
                    <div className="p-3 rounded-xl bg-[#FAF5FF] border border-[#E6E0FA] text-[#7E52A0] animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#E87A90] mb-0.5">
                        <Heart className="w-3 h-3 fill-current" />
                        <span>My Little Whisper</span>
                      </div>
                      <p className="font-script-romantic text-base sm:text-lg text-[#4A2E68] leading-tight">
                        "{item.secretNote}"
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-[#7E52A0]/80 group-hover:text-[#4A2E68] transition-colors">
                      <span className="italic">Tap to reveal my secret whisper</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

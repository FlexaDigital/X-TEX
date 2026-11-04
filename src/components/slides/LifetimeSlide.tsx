import React from 'react';
import { LifetimePromise } from '../../data/storyData';
import { Heart, Sparkles, Home, Shield, Award, HeartHandshake } from 'lucide-react';
import { RomanticImage } from '../RomanticArtworks';

interface LifetimeSlideProps {
  heading: string;
  subtitle: string;
  promises: LifetimePromise[];
  imageUrl?: string;
}

export const LifetimeSlide: React.FC<LifetimeSlideProps> = ({
  heading,
  subtitle,
  promises,
  imageUrl,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-5 h-5 text-[#7E52A0]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#E87A90]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#E87A90]" />;
      case 'Award':
      default:
        return <Award className="w-5 h-5 text-[#E8A598]" />;
    }
  };

  return (
    <section className="slide-section flex items-center justify-center px-4 sm:px-6 lg:px-12 py-5 relative">
      <div className="max-w-5xl w-full mx-auto z-10 flex flex-col justify-center h-full max-h-[92vh]">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-5">
          <span className="font-script-romantic text-2xl text-[#7E52A0]">Forever & Always · Lifetime Vows</span>
          <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-semibold text-[#4A2E68] tracking-tight mt-0.5">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B4B8B]/80 max-w-xl mx-auto mt-1">
            {subtitle}
          </p>
        </div>

        {/* Keepsake Photo / Romantic Banner */}
        <div className="relative group w-full max-w-3xl mx-auto h-36 sm:h-44 rounded-2xl overflow-hidden border border-[#E6E0FA] shadow-md mb-4 sm:mb-5">
          <RomanticImage
            src={imageUrl}
            alt="A lifetime of love"
            fallbackType="lifetime"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E68]/80 via-[#4A2E68]/20 to-transparent flex items-end p-4 sm:p-5">
            <p className="font-script-romantic text-xl sm:text-2xl text-white drop-shadow-md">
              "here's to growing old and silver-haired together with you"
            </p>
          </div>
        </div>

        {/* 4 Lifetime Vows in Clean 2x2 Grid (No bucket list) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-4xl mx-auto w-full overflow-y-auto max-h-[46vh] p-1">
          {promises.map((item, idx) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-[#E6E0FA] hover:border-[#B8A5E6]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5FF] border border-[#E6E0FA] flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#7E52A0]">
                    LIFETIME VOW 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif-romantic text-base sm:text-lg font-bold text-[#4A2E68] mb-1">
                  {item.title}
                </h3>

                <p className="text-xs text-[#5D3D80] leading-relaxed">
                  {item.vow}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F0EBF9] flex items-center gap-1.5 text-[11px] text-[#E87A90]">
                <Heart className="w-3 h-3 fill-pink-200" />
                <span className="font-script-romantic text-sm leading-none">my sacred lifetime promise</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

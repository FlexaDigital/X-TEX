import React from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { RomanticImage } from '../RomanticArtworks';
import { romanticAudio } from '../../utils/audioPlayer';

interface HeroSlideProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl?: string;
  recipientName: string;
  onStartClick: () => void;
}

export const HeroSlide: React.FC<HeroSlideProps> = ({
  title,
  subtitle,
  buttonText,
  imageUrl,
  recipientName,
  onStartClick,
}) => {
  const handleStart = () => {
    // If music isn't playing yet, smoothly start ambient music on user interaction
    if (!romanticAudio.getIsPlaying()) {
      romanticAudio.start();
    }
    onStartClick();
  };

  return (
    <section className="slide-section flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8 relative">
      {/* Decorative floating heart badges */}
      <div className="absolute top-16 left-8 sm:left-16 text-[#F5D0E3]/70 animate-float-slow pointer-events-none">
        <Heart className="w-8 h-8 fill-current drop-shadow-sm" />
      </div>
      <div className="absolute bottom-20 right-12 sm:right-24 text-[#E6E0FA]/80 animate-float-delayed pointer-events-none">
        <Heart className="w-12 h-12 fill-current drop-shadow-sm" />
      </div>

      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center z-10">
        {/* Soft Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#E6E0FA] text-[#7E52A0] text-xs font-medium tracking-wide mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B8A5E6]" />
          <span>A Special Birthday Story for {recipientName}</span>
        </div>

        {/* Primary Heading */}
        <h1 className="font-serif-romantic text-4xl sm:text-6xl md:text-7xl font-semibold text-[#4A2E68] tracking-tight text-balance leading-[1.1] mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#6B4B8B]/90 max-w-2xl font-normal leading-relaxed text-balance mb-8">
          {subtitle}
        </p>

        {/* Visual Centerpiece: Polaroid Frame with soft lilac drop shadow */}
        <div className="relative mb-9 group">
          {/* Subtle glowing halo behind the polaroid */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#E6E0FA] via-[#F5D0E3] to-[#E2D5F8] rounded-3xl blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-700" />

          {/* Polaroid Frame */}
          <div className="relative polaroid-frame rounded-2xl w-64 sm:w-72 md:w-80 transform -rotate-1 group-hover:rotate-0 transition-all duration-500">
            {/* Corner washi tape */}
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-1" />

            <div className="w-full h-52 sm:h-60 md:h-64 rounded-xl overflow-hidden bg-[#FAF5FF] border border-[#F0EBF9]">
              <RomanticImage
                src={imageUrl}
                alt="Us Together"
                fallbackType="hero"
              />
            </div>
            <div className="mt-3.5 text-center">
              <p className="font-script-romantic text-xl sm:text-2xl text-[#4A2E68] font-medium leading-none">
                you make my world softer ✨
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Pulsing Pastel Purple Button */}
        <button
          onClick={handleStart}
          className="relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-[#4A2E68] hover:bg-[#3B1E54] shadow-[0_0_24px_rgba(126,82,160,0.4)] hover:shadow-[0_0_32px_rgba(126,82,160,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group"
        >
          <span className="relative z-10">{buttonText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10 text-pink-200" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7E52A0] to-[#4A2E68] opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </section>
  );
};

import React from 'react';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import { RomanticImage } from '../RomanticArtworks';

interface StorySlideProps {
  heading: string;
  storyDate: string;
  storyText: string;
  imageUrl?: string;
}

export const StorySlide: React.FC<StorySlideProps> = ({
  heading,
  storyDate,
  storyText,
  imageUrl,
}) => {
  return (
    <section className="slide-section flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8 relative">
      <div className="max-w-5xl w-full mx-auto z-10">
        {/* Subtle section label */}
        <div className="text-center mb-6">
          <span className="font-script-romantic text-2xl text-[#7E52A0]">Chapter 01 · Beginnings</span>
          <h2 className="font-serif-romantic text-3xl sm:text-5xl font-semibold text-[#4A2E68] tracking-tight mt-1">
            {heading}
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Polaroid Photo with Taped Corner Effect */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Soft glow */}
              <div className="absolute -inset-2 bg-[#E6E0FA]/60 rounded-2xl blur-lg group-hover:bg-[#F5D0E3]/60 transition-all duration-500" />
              
              {/* Polaroid */}
              <div className="relative polaroid-frame rounded-2xl w-64 sm:w-72 md:w-80 -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                {/* Washi tape on top-left corner */}
                <div className="washi-tape -top-3 -left-4 -rotate-12" />
                {/* Washi tape on bottom-right corner */}
                <div className="washi-tape -bottom-2 -right-4 -rotate-6" />

                <div className="w-full h-64 sm:h-76 md:h-84 rounded-xl overflow-hidden bg-[#FAF5FF] border border-[#F0EBF9]">
                  <RomanticImage
                    src={imageUrl}
                    alt="Where It All Began"
                    fallbackType="story"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-script-romantic text-xl text-[#4A2E68]">
                    the moment everything changed 🕊️
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heartfelt Micro-Story & Vintage Calendar Date Stamp */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="glass-card p-6 sm:p-8 rounded-3xl relative">
              {/* Vintage Calendar Date Stamp */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF5FF] border border-[#E6E0FA] text-[#7E52A0] text-xs font-semibold tracking-wide mb-5 shadow-2xs">
                <Calendar className="w-4 h-4 text-[#7E52A0]" />
                <span className="font-medium">{storyDate}</span>
              </div>

              {/* Heartfelt Story Text */}
              <p className="text-sm sm:text-base lg:text-[1.05rem] text-[#4A2E68] leading-relaxed font-medium tracking-wide mb-6">
                {storyText}
              </p>

              {/* Romantic Highlight Box */}
              <div className="p-4 rounded-2xl bg-[#FFFDFE] border border-[#E6E0FA]/80 flex items-start gap-3">
                <Heart className="w-5 h-5 text-[#E87A90] shrink-0 mt-0.5 fill-pink-100" />
                <p className="text-xs sm:text-sm text-[#7E52A0] italic leading-snug">
                  "I didn't know it back then, but that was the exact moment my favorite love story started writing itself."
                </p>
              </div>

              {/* Cute corner sparkle */}
              <div className="absolute top-4 right-4 text-[#D8B4E2]/60">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Heart, Clock, MessageSquareHeart, Sparkles, Infinity as InfinityIcon } from 'lucide-react';

interface MilestoneSlideProps {
  heading: string;
  subtitle: string;
  anniversaryDate: string;
  endlessChats: string;
  foreheadKisses: string;
}

export const MilestoneSlide: React.FC<MilestoneSlideProps> = ({
  heading,
  subtitle,
  anniversaryDate,
  endlessChats,
  foreheadKisses,
}) => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHeartbeats: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(anniversaryDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      // Average 72 heartbeats per minute
      const totalHeartbeats = Math.floor((diff / 1000 / 60) * 72);

      setTimeTogether({ days, hours, minutes, seconds, totalHeartbeats });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [anniversaryDate]);

  return (
    <section className="slide-section flex items-center justify-center px-4 sm:px-6 lg:px-12 py-5 relative">
      <div className="max-w-5xl w-full mx-auto z-10 flex flex-col justify-center h-full max-h-[92vh]">
        {/* Section Header */}
        <div className="text-center mb-5 sm:mb-6">
          <span className="font-script-romantic text-2xl text-[#7E52A0]">Our Journey · Milestones</span>
          <h2 className="font-serif-romantic text-3xl sm:text-5xl font-semibold text-[#4A2E68] tracking-tight mt-0.5">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B4B8B]/80 max-w-xl mx-auto mt-1">
            {subtitle}
          </p>
        </div>

        {/* Live Precision Ticker Bar (Starts from 11th March 2026) */}
        <div className="mb-6 mx-auto max-w-2xl w-full">
          <div className="glass-card rounded-2xl p-4 sm:p-5 text-center relative overflow-hidden border border-[#E6E0FA]">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7E52A0] mb-3">
              <Clock className="w-3.5 h-3.5 text-[#E87A90]" />
              <span>Time Spent Loving You · Since March 2026</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2 sm:gap-4 font-mono tabular-nums">
              <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-[#E6E0FA]">
                <div className="text-2xl sm:text-4xl font-bold text-[#4A2E68] font-serif-romantic">
                  {timeTogether.days}
                </div>
                <div className="text-[10px] sm:text-xs font-sans text-[#7E52A0] uppercase tracking-wider mt-0.5">Days</div>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-[#E6E0FA]">
                <div className="text-2xl sm:text-4xl font-bold text-[#4A2E68] font-serif-romantic">
                  {timeTogether.hours}
                </div>
                <div className="text-[10px] sm:text-xs font-sans text-[#7E52A0] uppercase tracking-wider mt-0.5">Hours</div>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-[#E6E0FA]">
                <div className="text-2xl sm:text-4xl font-bold text-[#4A2E68] font-serif-romantic">
                  {timeTogether.minutes}
                </div>
                <div className="text-[10px] sm:text-xs font-sans text-[#7E52A0] uppercase tracking-wider mt-0.5">Minutes</div>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-[#E6E0FA]">
                <div className="text-2xl sm:text-4xl font-bold text-[#E87A90] font-serif-romantic">
                  {timeTogether.seconds}
                </div>
                <div className="text-[10px] sm:text-xs font-sans text-[#7E52A0] uppercase tracking-wider mt-0.5">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Minimalist Milestone Badges / Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto w-full">
          {/* Card 1: X Days */}
          <div className="glass-card glass-card-hover p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#FAF5FF] border border-[#E6E0FA] flex items-center justify-center mb-2.5">
              <Heart className="w-5 h-5 text-[#E87A90] fill-pink-100" />
            </div>
            <div className="font-serif-romantic text-2xl sm:text-3xl font-bold text-[#4A2E68] tabular-nums">
              {timeTogether.days}+
            </div>
            <div className="text-xs font-medium text-[#7E52A0] mt-1">Days Together</div>
            <div className="text-[11px] text-[#6B4B8B]/70 mt-0.5">Cherishing every single one</div>
          </div>

          {/* Card 2: Endless Chats (No 1200+ number, just Endless Chats) */}
          <div className="glass-card glass-card-hover p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#FAF5FF] border border-[#E6E0FA] flex items-center justify-center mb-2.5">
              <MessageSquareHeart className="w-5 h-5 text-[#7E52A0]" />
            </div>
            <div className="font-serif-romantic text-2xl sm:text-3xl font-bold text-[#4A2E68]">
              Endless Chats
            </div>
            <div className="text-xs font-medium text-[#7E52A0] mt-1">Our Favorite Talks</div>
            <div className="text-[11px] text-[#6B4B8B]/70 mt-0.5">Conversations with no end</div>
          </div>

          {/* Card 3: Countless Forehead Kisses (Replaced Inside Jokes) */}
          <div className="glass-card glass-card-hover p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#FAF5FF] border border-[#E6E0FA] flex items-center justify-center mb-2.5">
              <Sparkles className="w-5 h-5 text-[#E87A90]" />
            </div>
            <div className="font-serif-romantic text-2xl sm:text-3xl font-bold text-[#4A2E68]">
              {foreheadKisses}
            </div>
            <div className="text-xs font-medium text-[#7E52A0] mt-1">Forehead Kisses</div>
            <div className="text-[11px] text-[#6B4B8B]/70 mt-0.5">Gentle reminders of my love</div>
          </div>

          {/* Card 4: One Infinite Love */}
          <div className="glass-card glass-card-hover p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#FAF5FF] border border-[#E6E0FA] flex items-center justify-center mb-2.5">
              <InfinityIcon className="w-5 h-5 text-[#4A2E68]" />
            </div>
            <div className="font-serif-romantic text-2xl sm:text-3xl font-bold text-[#4A2E68]">
              One
            </div>
            <div className="text-xs font-medium text-[#7E52A0] mt-1">Infinite Love</div>
            <div className="text-[11px] text-[#6B4B8B]/70 mt-0.5">Forever & always yours</div>
          </div>
        </div>

        {/* Heartbeat counter footer */}
        <div className="mt-5 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-[#7E52A0]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E87A90]"></span>
            </span>
            <span className="font-mono tabular-nums font-semibold text-[#4A2E68]">
              ~{timeTogether.totalHeartbeats.toLocaleString()}
            </span>
            <span>heartbeats shared since March 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

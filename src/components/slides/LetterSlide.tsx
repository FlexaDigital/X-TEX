import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Heart, RotateCcw, CheckCircle } from 'lucide-react';

interface LetterSlideProps {
  heading: string;
  subtitle: string;
  greeting: string;
  body: string[];
  signoff: string;
  senderName: string;
  recipientName: string;
  onScrollToTop: () => void;
}

export const LetterSlide: React.FC<LetterSlideProps> = ({
  heading,
  subtitle,
  greeting,
  body,
  signoff,
  senderName,
  recipientName,
  onScrollToTop,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerConfetti = () => {
    // Subtle romantic confetti burst
    const count = 70;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#E6E0FA', '#F5D0E3', '#B8A5E6', '#FAF5FF', '#E87A90', '#4A2E68'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 45,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 35,
    });
  };

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    triggerConfetti();
  };

  return (
    <section className="slide-section flex items-center justify-center px-4 sm:px-6 lg:px-12 py-6 relative">
      <div className="max-w-4xl w-full mx-auto z-10 flex flex-col justify-center items-center h-full max-h-[95vh]">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#E6E0FA] text-[#7E52A0] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E87A90]" />
            <span>Grand Finale & Wishes</span>
          </div>
          <h2 className="font-serif-romantic text-4xl sm:text-5xl md:text-6xl font-semibold text-[#4A2E68] tracking-tight">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B4B8B]/80 max-w-md mx-auto mt-1">
            {subtitle}
          </p>
        </div>

        {/* Envelope vs Letter Unfolded */}
        {!isOpen ? (
          /* Sealed Digital Envelope Graphic */
          <div className="flex flex-col items-center justify-center my-auto">
            <div
              onClick={handleOpenEnvelope}
              className="group relative cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              {/* Soft pulsating glow behind envelope */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E6E0FA] via-[#F5D0E3] to-[#DEC7EB] rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity animate-pulse-glow" />

              {/* Envelope Body */}
              <div className="relative w-72 sm:w-88 md:w-96 h-48 sm:h-56 bg-[#FFFDFE] rounded-2xl border-2 border-[#E6E0FA] shadow-[0_12px_36px_-6px_rgba(74,46,104,0.15)] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                {/* Envelope Flap Lines */}
                <div className="absolute top-0 left-0 right-0 h-28 bg-[#FAF5FF] border-b border-[#E6E0FA] clip-path-envelope" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />

                {/* Wax Seal */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#E87A90] to-[#B3435C] shadow-lg flex items-center justify-center border-2 border-white/80 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white fill-white drop-shadow-xs" />
                </div>

                <div className="relative z-10 mt-4">
                  <span className="font-serif-romantic text-xl sm:text-2xl font-bold text-[#4A2E68]">
                    Open Me 💌
                  </span>
                  <p className="text-xs text-[#7E52A0] mt-0.5">
                    For {recipientName}, with all my love
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={handleOpenEnvelope}
                className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#4A2E68] hover:bg-[#3B1E54] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Tap to unseal your birthday letter ✨
              </button>
            </div>
          </div>
        ) : (
          /* Unfolded Heartfelt Birthday Love Letter */
          <div className="w-full max-w-2xl bg-[#FFFDFE] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E6E0FA] shadow-[0_16px_40px_-10px_rgba(74,46,104,0.12)] relative max-h-[64vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-300">
            {/* Corner washi tape */}
            <div className="washi-tape -top-3 left-10 rotate-2" />
            <div className="washi-tape -top-3 right-10 -rotate-2" />

            {/* Letter Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EBF9] mb-5">
              <span className="font-script-romantic text-2xl text-[#E87A90]">
                {greeting}
              </span>
              <button
                onClick={triggerConfetti}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#7E52A0] bg-[#FAF5FF] border border-[#E6E0FA] hover:bg-white transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E87A90]" />
                <span>More Confetti 🎊</span>
              </button>
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-3.5 text-sm sm:text-base text-[#5D3D80] leading-relaxed font-normal">
              {body.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Signoff */}
            <div className="mt-6 pt-5 border-t border-[#F0EBF9] text-right">
              <p className="font-script-romantic text-2xl sm:text-3xl font-semibold text-[#4A2E68]">
                {signoff}
              </p>
              <p className="text-xs text-[#7E52A0] mt-1 font-medium">
                — {senderName}
              </p>
            </div>

            {/* Bottom Actions inside the card */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3">
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-[#7E52A0] hover:text-[#4A2E68] transition-colors underline underline-offset-4 cursor-pointer"
              >
                Close envelope
              </button>

              <button
                onClick={onScrollToTop}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#4A2E68] bg-[#FAF5FF] border border-[#E6E0FA] hover:bg-[#E6E0FA] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Back to start 💖</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

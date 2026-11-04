import React, { useState } from 'react';
import { GalleryMoment, FutureVision } from '../../data/storyData';
import { RomanticImage } from '../RomanticArtworks';
import { Heart, ChevronLeft, ChevronRight, Sparkles, Camera, Lock, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fileToOptimizedDataUrl } from '../../utils/imageCompressor';

interface UnifiedGallerySlideProps {
  heading: string;
  subtitle: string;
  moments: GalleryMoment[];
  futureVision: FutureVision;
  onUpdateMomentPhoto: (momentId: string, newUrl: string) => void;
  onUpdateFuturePhoto: (newUrl: string) => void;
  onUnlockFuture: () => void;
  onAdvanceToNextSlide?: () => void;
}

export const UnifiedGallerySlide: React.FC<UnifiedGallerySlideProps> = ({
  heading,
  subtitle,
  moments,
  futureVision,
  onUpdateMomentPhoto,
  onUpdateFuturePhoto,
  onUnlockFuture,
  onAdvanceToNextSlide,
}) => {
  // 0 to 6 are Moments 1 to 7; 7 is Future Photo 8 (Wedding 💍); 8 is Future Photo 9 (Child 👶)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [uploading, setUploading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Independent unlock states for Future Photo 8 and Future Photo 9
  const [unlocked8, setUnlocked8] = useState<boolean>(futureVision.isUnlocked8 || false);
  const [unlocked9, setUnlocked9] = useState<boolean>(futureVision.isUnlocked9 || false);

  const totalItems = 9;
  const isPhoto8 = currentIndex === 7;
  const isPhoto9 = currentIndex === 8;
  const isFutureSlide = isPhoto8 || isPhoto9;
  const currentMoment = !isFutureSlide && moments[currentIndex] ? moments[currentIndex] : null;

  const changeIndex = (newIndex: number, direction: 'next' | 'prev') => {
    if (newIndex < 0 || newIndex >= totalItems) return;
    setSlideDirection(direction);
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => {
      setIsAnimating(false);
    }, 350);
  };

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      changeIndex(currentIndex + 1, 'next');
    } else if (onAdvanceToNextSlide) {
      onAdvanceToNextSlide();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      changeIndex(currentIndex - 1, 'prev');
    }
  };

  const handleLike = (id: string) => {
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRevealPhoto8 = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD54F', '#F8B4C8', '#E6E0FA', '#E87A90', '#FFFDFE', '#4A2E68'],
    });
    setUnlocked8(true);
    onUnlockFuture();
  };

  const handleRevealPhoto9 = () => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFE082', '#FF80AB', '#B388FF', '#80D8FF', '#FFFDFE'],
    });
    setUnlocked9(true);
    onUnlockFuture();
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const dataUrl = await fileToOptimizedDataUrl(file);
      if (isPhoto8 || isPhoto9) {
        onUpdateFuturePhoto(dataUrl);
      } else if (currentMoment) {
        onUpdateMomentPhoto(currentMoment.id, dataUrl);
      }
    } catch (err) {
      console.error('Failed to upload image', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="slide-section flex items-center justify-center px-3 sm:px-6 lg:px-12 py-3 relative select-none">
      <div className="max-w-4xl w-full mx-auto z-10 flex flex-col justify-between h-full max-h-[94vh]">
        {/* Top Header */}
        <div className="text-center shrink-0 mb-1 sm:mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/80 border border-[#E6E0FA] text-xs font-semibold text-[#7E52A0] mb-1">
            <Sparkles className="w-3 h-3 text-[#E87A90]" />
            <span>
              {isPhoto8
                ? "Secret Frame 08 · Our Future Wedding 💍"
                : isPhoto9
                ? "Secret Frame 09 · Our Little Family 👶✨"
                : `Moment ${currentIndex + 1} of 7 · Our Most Memorable Moments`}
            </span>
          </div>

          <h2 className="font-serif-romantic text-2xl sm:text-3xl md:text-4xl font-semibold text-[#4A2E68] tracking-tight leading-tight">
            {isPhoto8
              ? "The Day We Say 'I Do' 💍"
              : isPhoto9
              ? "Our Tomorrow & Our Sweet Child 👶"
              : heading}
          </h2>
          <p className="text-[11px] sm:text-xs text-[#6B4B8B]/80 max-w-lg mx-auto">
            {isPhoto8
              ? "A glimpse into our wedding day & forever promise"
              : isPhoto9
              ? "A sunset dream with our little child on the beach"
              : subtitle}
          </p>
        </div>

        {/* ONE-BY-ONE BIG SCREEN CINEMATIC DISPLAY CONTAINER */}
        <div className="relative flex-1 flex items-center justify-center my-auto min-h-0 w-full">
          {/* Floating Left / Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous photo"
            className="absolute left-0 sm:left-2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-[#4A2E68] border border-[#E6E0FA] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Floating Right / Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-0 sm:right-2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#4A2E68] to-[#7E52A0] hover:from-[#3B1E54] hover:to-[#6C458F] text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Big Screen Frame */}
          <div
            className={`w-full max-w-md sm:max-w-lg md:max-w-xl transition-all duration-350 ease-out transform ${
              isAnimating
                ? slideDirection === 'next'
                  ? 'opacity-0 translate-x-10 scale-95'
                  : 'opacity-0 -translate-x-10 scale-95'
                : 'opacity-100 translate-x-0 scale-100'
            }`}
          >
            {/* DISPLAY CASE 1: MEMORIES 1 TO 7 (PURE PHOTO, NO CAPTIONS) */}
            {!isFutureSlide && currentMoment && (
              <div className="polaroid-frame rounded-3xl bg-white p-3 sm:p-4 pb-3.5 border-2 border-[#E6E0FA] shadow-[0_16px_40px_-10px_rgba(74,46,104,0.14)] mx-auto">
                {/* Washi tape at top */}
                <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 w-20 h-5 opacity-80" />

                {/* Big Clean Photo Viewport (No Captions) */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-[#FAF5FF] border border-[#F0EBF9]">
                  <RomanticImage
                    src={currentMoment.imageUrl}
                    alt={currentMoment.title}
                    fallbackType={currentMoment.imageFallbackType}
                    className="w-full h-full object-cover"
                  />

                  {/* Corner Upload Button */}
                  <label
                    title="Change photo"
                    className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-[#4A2E68] backdrop-blur-md border border-[#E6E0FA] text-[11px] font-medium shadow-md flex items-center gap-1 cursor-pointer hover:scale-105 transition-all"
                  >
                    <Camera className="w-3 h-3 text-[#E87A90]" />
                    <span className="hidden sm:inline">Change</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                  </label>

                  {uploading && (
                    <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex items-center justify-center text-xs font-semibold text-[#4A2E68]">
                      Saving photo...
                    </div>
                  )}
                </div>

                {/* Clean Bottom Bar (No Captions) */}
                <div className="mt-2.5 px-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF5FF] border border-[#E6E0FA] text-xs font-bold text-[#7E52A0]">
                      {currentMoment.number} / 07
                    </span>
                    <span className="font-serif-romantic font-semibold text-sm text-[#4A2E68]">
                      Our Memory
                    </span>
                  </div>

                  <button
                    onClick={() => handleLike(currentMoment.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EC] text-[#E87A90] text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{likesMap[currentMoment.id] || 1}</span>
                  </button>
                </div>
              </div>
            )}

            {/* DISPLAY CASE 2: PHOTO 8 · FUTURE WEDDING (LOCKED BEHIND REVEAL BUTTON) */}
            {isPhoto8 && (
              <div className="polaroid-frame rounded-3xl bg-gradient-to-br from-[#FFFDFE] via-white to-[#FFF5F8] p-3 sm:p-4 pb-3.5 border-2 border-[#F8B4C8] shadow-[0_20px_50px_rgba(232,122,144,0.22)] mx-auto">
                <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-gradient-to-r from-[#F8B4C8] to-[#E6E0FA] opacity-90" />

                {!unlocked8 ? (
                  /* LOCKED REVEAL SCREEN FOR PHOTO 8 */
                  <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-[#2E1B45] via-[#4A2E68] to-[#5D3D80] p-6 sm:p-8 flex flex-col items-center justify-center text-center text-white border-2 border-[#E6E0FA]/40 shadow-inner">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/40 flex items-center justify-center mb-3 shadow-lg">
                      <Lock className="w-7 h-7 text-[#FFE082]" />
                    </div>

                    <span className="relative z-10 text-xs uppercase tracking-widest font-semibold text-[#F8B4C8] mb-1">
                      Secret Frame 08 · Our Future
                    </span>

                    <h3 className="relative z-10 font-serif-romantic text-2xl sm:text-3xl font-bold text-white mb-2">
                      Our Wedding & Ring Ceremony 💍
                    </h3>

                    <p className="relative z-10 text-xs sm:text-sm text-pink-100/90 max-w-sm mx-auto leading-relaxed mb-5">
                      {futureVision.photo8Teaser || "Locked behind curiosity. Click to reveal our sacred promise and the day we say 'I Do'."}
                    </p>

                    <button
                      onClick={handleRevealPhoto8}
                      className="relative z-10 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#E87A90] via-[#D87093] to-[#7E52A0] hover:from-[#d6657c] hover:to-[#6b3e8c] text-white text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(232,122,144,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#FFE082]" />
                      <span>{futureVision.photo8ButtonText || "Click to Reveal 💍"}</span>
                    </button>
                  </div>
                ) : (
                  /* UNLOCKED VIEW FOR PHOTO 8 */
                  <div>
                    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-[#FAF5FF] border-2 border-[#F8B4C8]">
                      <RomanticImage
                        src={futureVision.photo8ImageUrl || "/public/assets/aistudio/IMG-8_6eecd377.jpeg"}
                        alt="Our Wedding"
                        fallbackType="future_wedding_child"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#4A2E68]/90 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFE082]" />
                        <span>Our Wedding Day · Better Together 💍</span>
                      </div>
                    </div>

                    <div className="mt-2.5 px-1 flex items-center justify-between">
                      <span className="font-serif-romantic font-bold text-sm sm:text-base text-[#4A2E68]">
                        The Day We Say 'I Do' 💍
                      </span>
                      <button
                        onClick={() => handleLike('future-8')}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EC] text-[#E87A90] text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>{likesMap['future-8'] || 1}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DISPLAY CASE 3: PHOTO 9 · FUTURE CHILD & FAMILY (LOCKED BEHIND REVEAL BUTTON) */}
            {isPhoto9 && (
              <div className="polaroid-frame rounded-3xl bg-gradient-to-br from-[#FFFDFE] via-white to-[#FFF5F8] p-3 sm:p-4 pb-3.5 border-2 border-[#F8B4C8] shadow-[0_20px_50px_rgba(232,122,144,0.22)] mx-auto">
                <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-gradient-to-r from-[#F8B4C8] to-[#E6E0FA] opacity-90" />

                {!unlocked9 ? (
                  /* LOCKED REVEAL SCREEN FOR PHOTO 9 */
                  <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-[#2E1B45] via-[#4A2E68] to-[#5D3D80] p-6 sm:p-8 flex flex-col items-center justify-center text-center text-white border-2 border-[#E6E0FA]/40 shadow-inner">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/40 flex items-center justify-center mb-3 shadow-lg">
                      <Lock className="w-7 h-7 text-[#FFE082]" />
                    </div>

                    <span className="relative z-10 text-xs uppercase tracking-widest font-semibold text-[#F8B4C8] mb-1">
                      Secret Frame 09 · Our Future
                    </span>

                    <h3 className="relative z-10 font-serif-romantic text-2xl sm:text-3xl font-bold text-white mb-2">
                      Our Little Family & Child 👶✨
                    </h3>

                    <p className="relative z-10 text-xs sm:text-sm text-pink-100/90 max-w-sm mx-auto leading-relaxed mb-5">
                      {futureVision.photo9Teaser || "Locked behind curiosity. Click to reveal a sunset glimpse of us playing with our sweet little child."}
                    </p>

                    <button
                      onClick={handleRevealPhoto9}
                      className="relative z-10 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#E87A90] via-[#D87093] to-[#7E52A0] hover:from-[#d6657c] hover:to-[#6b3e8c] text-white text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(232,122,144,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#FFE082]" />
                      <span>{futureVision.photo9ButtonText || "Click to Reveal 👶"}</span>
                    </button>
                  </div>
                ) : (
                  /* UNLOCKED VIEW FOR PHOTO 9 */
                  <div>
                    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-[#FAF5FF] border-2 border-[#F8B4C8]">
                      <RomanticImage
                        src={futureVision.photo9ImageUrl || "/public/assets/aistudio/IMG-9_0b06cbb2.jpeg"}
                        alt="Our Little Family"
                        fallbackType="future_wedding_child"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#4A2E68]/90 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFE082]" />
                        <span>Our Little Family & Tomorrow 👶✨</span>
                      </div>
                    </div>

                    <div className="mt-2.5 px-1 flex items-center justify-between">
                      <span className="font-serif-romantic font-bold text-sm sm:text-base text-[#4A2E68]">
                        Sunset Beach With Our Little One 👶
                      </span>
                      <button
                        onClick={() => handleLike('future-9')}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EC] text-[#E87A90] text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>{likesMap['future-9'] || 1}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM FILMSTRIP TRACKER & NAVIGATION CONTROLS */}
        <div className="shrink-0 mt-2 flex flex-col items-center gap-1.5">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-[#E6E0FA] shadow-xs">
            {moments.map((mom, idx) => (
              <button
                key={mom.id}
                onClick={() => changeIndex(idx, idx > currentIndex ? 'next' : 'prev')}
                aria-label={`Go to moment ${idx + 1}`}
                className={`transition-all duration-200 cursor-pointer rounded-full flex items-center justify-center ${
                  currentIndex === idx
                    ? 'w-7 sm:w-8 h-6 bg-[#4A2E68] text-white text-[10px] font-bold shadow-xs'
                    : 'w-5 sm:w-6 h-5 bg-[#FAF5FF] hover:bg-[#E6E0FA] text-[#7E52A0] text-[9px]'
                }`}
              >
                0{idx + 1}
              </button>
            ))}

            {/* Photo 8 Button (Future Wedding 💍) */}
            <button
              onClick={() => changeIndex(7, 'next')}
              aria-label="Go to Future Photo 8: Wedding"
              className={`transition-all duration-200 cursor-pointer rounded-full px-2.5 py-0.5 flex items-center gap-1 text-[10px] font-bold ${
                currentIndex === 7
                  ? 'bg-gradient-to-r from-[#E87A90] to-[#7E52A0] text-white shadow-xs'
                  : 'bg-[#FFF0F5] text-[#E87A90] hover:bg-[#FFE4EC] border border-[#F8B4C8]'
              }`}
            >
              <span>08</span>
              <span>💍</span>
              {!unlocked8 && <Lock className="w-2.5 h-2.5 ml-0.5" />}
            </button>

            {/* Photo 9 Button (Future Child 👶) */}
            <button
              onClick={() => changeIndex(8, 'next')}
              aria-label="Go to Future Photo 9: Child"
              className={`transition-all duration-200 cursor-pointer rounded-full px-2.5 py-0.5 flex items-center gap-1 text-[10px] font-bold ${
                currentIndex === 8
                  ? 'bg-gradient-to-r from-[#E87A90] to-[#7E52A0] text-white shadow-xs'
                  : 'bg-[#FFF0F5] text-[#E87A90] hover:bg-[#FFE4EC] border border-[#F8B4C8]'
              }`}
            >
              <span>09</span>
              <span>👶</span>
              {!unlocked9 && <Lock className="w-2.5 h-2.5 ml-0.5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

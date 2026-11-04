import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getStoredStoryConfig, StoryConfig, saveStoredStoryConfig } from './data/storyData';
import { RomanticCanvas } from './components/RomanticCanvas';
import { MusicPlayerToggle } from './components/MusicPlayerToggle';
import { NavigationControls } from './components/NavigationControls';
import { HeroSlide } from './components/slides/HeroSlide';
import { StorySlide } from './components/slides/StorySlide';
import { FallInLoveSlide } from './components/slides/FallInLoveSlide';
import { AdoreSlide } from './components/slides/AdoreSlide';
import { SpecialSlide } from './components/slides/SpecialSlide';
import { UnifiedGallerySlide } from './components/slides/UnifiedGallerySlide';
import { MilestoneSlide } from './components/slides/MilestoneSlide';
import { LifetimeSlide } from './components/slides/LifetimeSlide';
import { LetterSlide } from './components/slides/LetterSlide';
import { PersonalizeModal } from './components/PersonalizeModal';
import { ChevronUp, ChevronDown, Camera } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<StoryConfig>(getStoredStoryConfig());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);

  const totalSlides = 9;
  const slideLabels = [
    'Welcome',
    'Where It Began',
    'Why I Fell In Love',
    'Adore You',
    'Why You Are Special',
    'Photo Gallery & Future',
    'Milestones',
    'Lifetime Promise',
    'Love Letter',
  ];

  // Navigation state & wheel cooldown lock
  const isTransitioningRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return;
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setCurrentSlide(index);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 600);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Wheel listener: PowerPoint slide transition style
  useEffect(() => {
    let wheelCooldown = false;
    const handleWheel = (e: WheelEvent) => {
      // Ignore if user is inside a scrolling sub-container like modal or grid
      if ((e.target as HTMLElement)?.closest('.overflow-y-auto')) {
        const scrollEl = (e.target as HTMLElement)?.closest('.overflow-y-auto') as HTMLElement;
        const atTop = scrollEl.scrollTop === 0;
        const atBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 2;

        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      if (wheelCooldown || isTransitioningRef.current) return;

      if (Math.abs(e.deltaY) > 20) {
        wheelCooldown = true;
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }

        setTimeout(() => {
          wheelCooldown = false;
        }, 650);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextSlide, prevSlide]);

  // Touch listener for mobile swipe slide deck
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      if (Math.abs(diffY) > 45) {
        if (diffY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      touchStartY.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  // Photo handlers for Single Unified Gallery
  const handleUpdateMomentPhoto = (momentId: string, newUrl: string) => {
    const updated = {
      ...config,
      galleryMoments: config.galleryMoments.map((m) => (m.id === momentId ? { ...m, imageUrl: newUrl } : m)),
    };
    setConfig(updated);
    saveStoredStoryConfig(updated);
  };

  const handleUpdateFuturePhoto = (newUrl: string) => {
    const updated = {
      ...config,
      futureVision: {
        ...config.futureVision,
        imageUrl: newUrl,
        isUnlocked: true,
      },
    };
    setConfig(updated);
    saveStoredStoryConfig(updated);
  };

  const handleUnlockFuture = () => {
    const updated = {
      ...config,
      futureVision: {
        ...config.futureVision,
        isUnlocked: true,
      },
    };
    setConfig(updated);
    saveStoredStoryConfig(updated);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#FFFDFE] text-[#4A2E68] select-none">
      {/* Romantic ambient canvas with pastel orbs and floating heart particles */}
      <RomanticCanvas />

      {/* Floating Top Bar (Clean 3-Zone Contract) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 pointer-events-none">
        {/* Zone 1: Wordmark */}
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="font-serif-romantic text-xl sm:text-2xl font-semibold tracking-tight text-[#4A2E68] whitespace-nowrap shrink-0">
            Our Story
          </span>
          <span className="hidden sm:inline-block text-xs font-script-romantic text-[#7E52A0] text-lg">
            · for {config.recipientName}
          </span>
        </div>

        {/* Zone 2: Slide Indicator */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#E6E0FA] text-xs font-medium text-[#7E52A0] shadow-2xs">
          <span className="font-mono tabular-nums text-[#4A2E68] font-bold">
            0{currentSlide + 1}
          </span>
          <span>/</span>
          <span className="font-mono tabular-nums">0{totalSlides}</span>
          <span className="text-[#D1C4E9]">·</span>
          <span>{slideLabels[currentSlide]}</span>
        </div>

        {/* Zone 3: Settings / Photo Uploads & Music Toggle */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsPersonalizeOpen(true)}
            aria-label="Settings and photo uploads"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 backdrop-blur-md border border-[#E6E0FA] text-[#7E52A0] hover:text-[#4A2E68] hover:bg-white transition-all shadow-xs cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-[#E87A90]" />
            <span className="hidden sm:inline">Settings & Photos</span>
            <span className="sm:hidden">Settings</span>
          </button>

          <MusicPlayerToggle customAudioUrl={config.customAudioUrl} />
        </div>
      </header>

      {/* Right Vertical Dot Navigation Indicator (1 to 9) */}
      <NavigationControls
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNavigate={goToSlide}
        slideLabels={slideLabels}
      />

      {/* Presentation Deck Slide Switcher: Up/Down Arrow Deck Controls */}
      <div className="fixed left-4 bottom-5 z-40 hidden sm:flex items-center gap-1.5 bg-white/60 backdrop-blur-md p-1 rounded-full border border-white/80 shadow-xs">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
          className="w-7 h-7 rounded-full flex items-center justify-center text-[#7E52A0] hover:text-[#4A2E68] hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-mono font-semibold text-[#4A2E68] px-1 tabular-nums">
          {currentSlide + 1}/{totalSlides}
        </span>
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          aria-label="Next slide"
          className="w-7 h-7 rounded-full flex items-center justify-center text-[#7E52A0] hover:text-[#4A2E68] hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* PowerPoint-style Presentation Slides Viewport */}
      <main className="deck-viewport">
        {/* Slide 0: Hero / Welcoming Screen */}
        <div className={`presentation-slide ${currentSlide === 0 ? 'slide-active' : currentSlide > 0 ? 'slide-past' : 'slide-future'}`}>
          <HeroSlide
            title={config.heroTitle}
            subtitle={config.heroSubtitle}
            buttonText={config.heroButtonText}
            imageUrl={config.heroImageUrl}
            recipientName={config.recipientName}
            onStartClick={() => goToSlide(1)}
          />
        </div>

        {/* Slide 1: Where It All Began */}
        <div className={`presentation-slide ${currentSlide === 1 ? 'slide-active' : currentSlide > 1 ? 'slide-past' : 'slide-future'}`}>
          <StorySlide
            heading={config.storyHeading}
            storyDate={config.storyDate}
            storyText={config.storyText}
            imageUrl={config.storyImageUrl}
          />
        </div>

        {/* Slide 2: Why I Fell In Love With You */}
        <div className={`presentation-slide ${currentSlide === 2 ? 'slide-active' : currentSlide > 2 ? 'slide-past' : 'slide-future'}`}>
          <FallInLoveSlide
            heading={config.fallInLoveHeading}
            subtitle={config.fallInLoveSubtitle}
            moments={config.fallInLoveMoments}
            imageUrl={config.fallInLoveImageUrl}
          />
        </div>

        {/* Slide 3: Little Things I Adore About You */}
        <div className={`presentation-slide ${currentSlide === 3 ? 'slide-active' : currentSlide > 3 ? 'slide-past' : 'slide-future'}`}>
          <AdoreSlide
            heading={config.reasonsHeading}
            subtitle={config.reasonsSubtitle}
            reasons={config.reasons}
          />
        </div>

        {/* Slide 4: What Makes You Irreplaceable & Special */}
        <div className={`presentation-slide ${currentSlide === 4 ? 'slide-active' : currentSlide > 4 ? 'slide-past' : 'slide-future'}`}>
          <SpecialSlide
            heading={config.specialHeading}
            subtitle={config.specialSubtitle}
            aspects={config.specialAspects}
          />
        </div>

        {/* Slide 5: THE ONE AND ONLY SINGLE PHOTO GALLERY PRESENTATION
            8 Memorable Moments + 1 Secret Curiosity AI Future Vision Photo (Marriage & Child) */}
        <div className={`presentation-slide ${currentSlide === 5 ? 'slide-active' : currentSlide > 5 ? 'slide-past' : 'slide-future'}`}>
          <UnifiedGallerySlide
            heading={config.galleryHeading}
            subtitle={config.gallerySubtitle}
            moments={config.galleryMoments}
            futureVision={config.futureVision}
            onUpdateMomentPhoto={handleUpdateMomentPhoto}
            onUpdateFuturePhoto={handleUpdateFuturePhoto}
            onUnlockFuture={handleUnlockFuture}
            onAdvanceToNextSlide={() => goToSlide(6)}
          />
        </div>

        {/* Slide 6: The Days We've Shared (Milestone Counter) */}
        <div className={`presentation-slide ${currentSlide === 6 ? 'slide-active' : currentSlide > 6 ? 'slide-past' : 'slide-future'}`}>
          <MilestoneSlide
            heading={config.milestonesHeading}
            subtitle={config.milestonesSubtitle}
            anniversaryDate={config.anniversaryDate}
            endlessChats={config.endlessChats}
            foreheadKisses={config.foreheadKisses}
          />
        </div>

        {/* Slide 7: I Want You For A Lifetime */}
        <div className={`presentation-slide ${currentSlide === 7 ? 'slide-active' : currentSlide > 7 ? 'slide-past' : 'slide-future'}`}>
          <LifetimeSlide
            heading={config.lifetimeHeading}
            subtitle={config.lifetimeSubtitle}
            promises={config.lifetimePromises}
            imageUrl={config.lifetimeImageUrl}
          />
        </div>

        {/* Slide 8: Grand Finale & Birthday Love Letter */}
        <div className={`presentation-slide ${currentSlide === 8 ? 'slide-active' : currentSlide > 8 ? 'slide-past' : 'slide-future'}`}>
          <LetterSlide
            heading={config.letterHeading}
            subtitle={config.letterSubtitle}
            greeting={config.letterGreeting}
            body={config.letterBody}
            signoff={config.letterSignoff}
            senderName={config.senderName}
            recipientName={config.recipientName}
            onScrollToTop={() => goToSlide(0)}
          />
        </div>
      </main>

      {/* Settings, Customization & Photo Upload Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        config={config}
        onSave={(updatedConfig) => setConfig(updatedConfig)}
      />
    </div>
  );
}

export interface GalleryMoment {
  id: string;
  number: string;
  title: string;
  caption: string;
  date: string;
  tag: string;
  location: string;
  imageFallbackType: 'sunset_picnic' | 'cozy_cafe' | 'stargazing' | 'flowers' | 'roadtrip' | 'morning' | 'fall_in_love' | 'special';
  imageUrl?: string;
  rotation?: number;
}

export interface FutureVision {
  title: string;
  tagline: string;
  caption: string;
  vowText: string;
  curiosityQuestion: string;
  teaserText: string;
  buttonText: string;
  imageUrl?: string;
  isUnlocked?: boolean;
  photo8Title?: string;
  photo8Teaser?: string;
  photo8ButtonText?: string;
  photo8ImageUrl?: string;
  isUnlocked8?: boolean;
  photo9Title?: string;
  photo9Teaser?: string;
  photo9ButtonText?: string;
  photo9ImageUrl?: string;
  isUnlocked9?: boolean;
}

export interface AdoreReason {
  id: string;
  title: string;
  icon: string;
  description: string;
  secretNote: string;
}

export interface FallInLoveItem {
  id: string;
  number: string;
  title: string;
  story: string;
  quote: string;
}

export interface SpecialAspect {
  id: string;
  title: string;
  description: string;
  highlight: string;
  icon: string;
}

export interface LifetimePromise {
  id: string;
  title: string;
  vow: string;
  icon: string;
}

export interface StoryConfig {
  recipientName: string;
  senderName: string;
  anniversaryDate: string; // YYYY-MM-DD
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroImageUrl?: string;
  
  storyDate: string;
  storyHeading: string;
  storyText: string;
  storyImageUrl?: string;

  // Slide: Why I Fell In Love With You
  fallInLoveHeading: string;
  fallInLoveSubtitle: string;
  fallInLoveImageUrl?: string;
  fallInLoveMoments: FallInLoveItem[];
  
  // Slide: Little Things I Adore (Page 4 - Simple & Deep)
  reasonsHeading: string;
  reasonsSubtitle: string;
  reasons: AdoreReason[];

  // Slide: How You Are Special To Me
  specialHeading: string;
  specialSubtitle: string;
  specialImageUrl?: string;
  specialAspects: SpecialAspect[];

  // The One & Only Single Photo Gallery Presentation:
  // 8 Most Memorable Moments + 1 Curiosity AI Future Vision Photo (Marriage & Child)
  galleryHeading: string;
  gallerySubtitle: string;
  galleryMoments: GalleryMoment[];
  futureVision: FutureVision;
  
  // Slide: Milestones (Updated: Endless Chats & Countless Forehead Kisses)
  milestonesHeading: string;
  milestonesSubtitle: string;
  endlessChats: string;
  foreheadKisses: string;
  customMilestoneLabel: string;
  customMilestoneValue: string;

  // Slide: Lifetime Promise (Bucket list removed as requested)
  lifetimeHeading: string;
  lifetimeSubtitle: string;
  lifetimeImageUrl?: string;
  lifetimePromises: LifetimePromise[];
  
  // Slide: Grand Finale & Letter
  letterHeading: string;
  letterSubtitle: string;
  letterGreeting: string;
  letterBody: string[];
  letterSignoff: string;
  customAudioUrl?: string;
}

export const initialStoryConfig: StoryConfig = {
  recipientName: "Babe",
  senderName: "Yours Forever",
  anniversaryDate: "2026-03-09",
  heroTitle: "hiiiiiii babeeeee!! 💖✨",
  heroSubtitle: "Today is all about you. Ready for a little journey through our favorite moments?",
  heroButtonText: "Click to start 💌",
  heroImageUrl: "/assets/aistudio/WhatsApp_Image_2026-11-04_at_3.36.06_PM_cb4da4aa.jpeg",

  storyDate: "March 2026",
  storyHeading: "The Day You Changed My World",
  storyText: "MNE HJI E DIVAS YAAD CHHE JYARE TU OFFICE AAVI HTI ANE HU BAAR GYO HTO, KALAK PACHI HU AVVYO AND TU SOFA PR BETHI HTI TYARE ME TNE HASTA JOIIII!!! BAS TYAA J HU PIGDI GYO MNE BADHE J TU DEKHAVA LAGI, HUU SUU KAV KEVA MA TO LIVE KAIS JO KE KIDHU J CHHE PN TOY KAIS, E PACHIII EK RAAT EVI NATHI K TNE YAAD NA KRI  HOY TARU FACE NAA DEKHAYU HOY E HASTU FACE, E J MARU MOTIVATION HTU MENIFEST KRVANU, THEN AAPDI VAAT START THAIII 9 MARCH E J DIVS HTO MARI LIFE AAKHI BADLAI GAI, TU AAVI MARI LIFE MA E MARI LIFE NO BEST PART CHHEE",
  storyImageUrl: "/assets/aistudio/WhatsApp_Image_2026-11-04_at_3.36.06_PM_cb4da4aa.jpeg",

  // Why I Fell In Love With You
  fallInLoveHeading: "Why I Fell In Love With You",
  fallInLoveSubtitle: "It wasn't just one single moment — it was a thousand gentle everyday wonders",
  fallInLoveImageUrl: "/assets/aistudio/PAGE-3_6f97d9db.jpeg",
  fallInLoveMoments: [
    {
      id: "fil-1",
      number: "01",
      title: "Your Genuine, Selfless Heart",
      story: "I watched how patiently you care for everyone around you, how you remember the smallest details about people's lives, and how you spread warmth without expecting anything in return. My soul instantly felt safe with you.",
      quote: "You have a goodness that makes the whole world feel softer.",
    },
    {
      id: "fil-2",
      number: "02",
      title: "The Way You Believe in Me",
      story: "Even on days when I doubted myself, you looked at me with unshakeable faith. You became my loudest cheerleader, my calmest confidante, and the person whose opinion matters more than anyone else's.",
      quote: "Your belief in me gave me wings I didn't know I had.",
    },
    {
      id: "fil-3",
      number: "03",
      title: "Your Unfiltered, Playful Soul",
      story: "Seeing your playful laughter, your spontaneous giggle attacks, and the wild dreams you talk about late at night made me realize I want to laugh like this with you for the rest of my days.",
      quote: "You showed me that true love is both comfortable and thrilling.",
    },
  ],

  // Page 4: A Few Reasons Why You Own My Heart (Simplified to user's exact 4 pure points)
  reasonsHeading: "A Few Reasons Why You Own My Heart",
  reasonsSubtitle: "Simple, honest, and the deepest reasons why you are my whole world",
  reasons: [
    {
      id: "reason-1",
      title: "Your Simplicity",
      icon: "Sparkles",
      description: "In a noisy and complicated world, your effortless simplicity and pure heart are the most precious things I have ever known. You don't need to try; you are naturally beautiful in everything you do.",
      secretNote: "Your pure simplicity is what makes you so infinitely attractive to me.",
    },
    {
      id: "reason-2",
      title: "Your Understanding of Things",
      icon: "HeartHandshake",
      description: "You understand me without me even needing to find the right words. You listen with patience, see beneath the surface, and always understand things with gentle maturity and grace.",
      secretNote: "You are the only person who truly gets my heart and mind.",
    },
    {
      id: "reason-3",
      title: "How You Care About Me",
      icon: "ShieldHeart",
      description: "The way you check in on me, notice whenever I'm tired, and look out for me in every small gesture. Feeling your tender care wrapped around me is the safest feeling in the universe.",
      secretNote: "Nobody has ever cared for my heart the way you do.",
    },
    {
      id: "reason-4",
      title: "Each & Every Small Thing Is A Blessing",
      icon: "Flame",
      description: "Each and every small thing about you, every glance, every message, every quiet moment we share, is an absolute blessing in my life. You make ordinary life feel like a gift.",
      secretNote: "Having you in my life is the greatest blessing I will ever receive.",
    },
  ],

  // How You Are Special To Me
  specialHeading: "What Makes You Irreplaceable & Special",
  specialSubtitle: "Out of 8 billion people, there is nobody who makes life feel as magical as you do",
  specialImageUrl: "",
  specialAspects: [
    {
      id: "sp-1",
      title: "My Safe Haven & Emotional Anchor",
      description: "No matter how turbulent the world gets, wrapping my arms around you brings an immediate feeling of relief. You ground my anxious thoughts with just a gentle stroke of my hair.",
      highlight: "My ultimate sanctuary",
      icon: "ShieldHeart",
    },
    {
      id: "sp-2",
      title: "You Understand My Unspoken Words",
      description: "You know what I'm feeling before I even open my mouth. A quick glance across a room, a tiny tilt of your head, and we already know what each other is thinking.",
      highlight: "Telepathic connection",
      icon: "Compass",
    },
    {
      id: "sp-3",
      title: "My Favorite Partner in Every Adventure",
      description: "Whether we are driving through pouring rain, trying silly recipes at midnight, or just grocery shopping for snacks, every mundane task becomes a core memory with you.",
      highlight: "Every moment is adventure",
      icon: "SunMedium",
    },
    {
      id: "sp-4",
      title: "The Radiance You Bring Into My Life",
      description: "You taught me how to look at the sky and see poetry, how to appreciate the little flowers growing through cracks, and how to love with an open, brave heart.",
      highlight: "My daily inspiration",
      icon: "Sparkle",
    },
  ],

  // ONE AND ONLY SINGLE PHOTO GALLERY PRESENTATION:
  // 7 Most Memorable Moments + 2 Secret Curiosity Future Vision Photos (Marriage & Child)
  galleryHeading: "Our Most Memorable Moments",
  gallerySubtitle: "7 precious memories of us, plus two secret glimpses of what's waiting ahead...",
  galleryMoments: [
    {
      id: "mom-1",
      number: "01",
      title: "Memory 01",
      caption: "",
      date: "",
      tag: "",
      location: "",
      imageFallbackType: "cozy_cafe",
      imageUrl: "/assets/aistudio/WhatsApp_Image_2026-11-04_at_4.46.07_PM_be4e11ba.jpeg",
      rotation: 0,
    },
    {
      id: "mom-2",
      number: "02",
      title: "Memory 02",
      caption: "",
      date: "",
      tag: "",
      location: "",
      imageFallbackType: "sunset_picnic",
      imageUrl: "/assets/aistudio/IMG-2_9c0c5d77.jpeg",
      rotation: 0,
    },
    {
      id: "mom-3",
      number: "03",
      title: "Memory 03",
      caption: "",
      date: "",
      tag: "",
      location: "",
      imageFallbackType: "stargazing",
      imageUrl: "/assets/aistudio/IMG-3_406a0bb9.jpeg",
      rotation: 0,
    },
    {
      id: "mom-4",
      number: "04",
      title: "Memory 04",
      caption: "",
      date: "",
      tag: "",
      location: "",
      imageFallbackType: "flowers",
      imageUrl: "/assets/aistudio/IMG-4_54b324a5.jpeg",
      rotation: 0,
    },
    {
      id: "mom-5",
      number: "05",
      title: "Memory 05",
      caption: "",
      date: "",
      tag: "",
      location: "",
      imageFallbackType: "roadtrip",
      imageUrl: "/assets/aistudio/IMG-5_b882366b.jpeg",
      rotation: 0,
    },
    {
      id: "mom-6",
      number: "06",
      title: "Memory 06",
      caption: "",
      date: "",
      tag: "",
      location: "",
      imageFallbackType: "morning",
      imageUrl: "/assets/aistudio/IMG-6_01f56917.jpeg",
      rotation: 0,
    },
    {
      id: "mom-7",
      number: "07",
      title: "Memory 07",
      caption: "",
      date: "",
      tag: "",
      location: "",
      imageFallbackType: "fall_in_love",
      imageUrl: "/assets/aistudio/IMG-7_66c3e2c9.jpeg",
      rotation: 0,
    },
  ],

  // THE 8TH AND 9TH SECRET FUTURE VISION PHOTOS (LOCKED BEHIND REVEAL BUTTONS)
  futureVision: {
    title: "Our Secret Future Vision",
    tagline: "A Glimpse Into Tomorrow · Marriage & Family",
    caption: "",
    vowText: "",
    curiosityQuestion: "Curious to peek into our future? 💍👶",
    teaserText: "A secret vision of what is waiting for us ahead",
    buttonText: "Reveal Our Future",
    imageUrl: "/assets/aistudio/IMG-8_6eecd377.jpeg",
    isUnlocked: false,

    photo8Title: "Our Wedding Day: The Day We Say 'I Do' 💍",
    photo8Teaser: "This photo is locked behind curiosity. Click to reveal our sacred promise and the beginning of our forever.",
    photo8ButtonText: "Click to Reveal 💍",
    photo8ImageUrl: "/assets/aistudio/IMG-8_6eecd377.jpeg",
    isUnlocked8: false,

    photo9Title: "Our Little Family & Tomorrow 👶✨",
    photo9Teaser: "This photo is locked behind curiosity. Click to reveal a sunset glimpse of us with our sweet little child.",
    photo9ButtonText: "Click to Reveal 👶",
    photo9ImageUrl: "/assets/aistudio/IMG-9_0b06cbb2.jpeg",
    isUnlocked9: false,
  },

  // Milestones (Replaced lateNightCalls with endlessChats and insideJokes with foreheadKisses)
  milestonesHeading: "Every Single Second Counts",
  milestonesSubtitle: "Tracking our milestones, our endless chats, and every heartbeat together",
  endlessChats: "1,200+",
  foreheadKisses: "Countless",
  customMilestoneLabel: "Photos Taken",
  customMilestoneValue: "4,800+",

  // How I Want You For The Lifetime (Bucket list removed as requested)
  lifetimeHeading: "I Want You For A Lifetime",
  lifetimeSubtitle: "Not just for the easy sunny days, but for every season, every gray hair, and every tomorrow",
  lifetimeImageUrl: "",
  lifetimePromises: [
    {
      id: "lp-1",
      title: "To Always Choose You, Every Single Day",
      vow: "Love isn't just a feeling; it is an active decision. I promise to wake up every single morning and choose your happiness, your dreams, and our bond over everything else.",
      icon: "Award",
    },
    {
      id: "lp-2",
      title: "To Hold Your Hand Through Every Storm",
      vow: "When life throws unexpected challenges our way, you will never have to face them alone. I will be your shield, your shoulder to cry on, and the steady hand pulling you through.",
      icon: "HeartHandshake",
    },
    {
      id: "lp-3",
      title: "To Never Stop Courting Your Heart",
      vow: "Even when we are 80 years old sitting on the front porch with blankets over our knees, I will still flirt with you, bring you your favorite tea, and gaze at you like I did on day one.",
      icon: "Sparkles",
    },
    {
      id: "lp-4",
      title: "To Grow & Build Our Dream Life Together",
      vow: "I want to share every achievement, celebrate your every triumph, build a warm home filled with laughter, plants, good food, and memories that will echo forever.",
      icon: "Home",
    },
  ],

  // Grand Finale
  letterHeading: "Happy Birthday, Beautiful",
  letterSubtitle: "A heartfelt love letter sealed with everything I feel for you",
  letterGreeting: "My Dearest Love,",
  letterBody: [
    "Happy Birthday, my favorite person in the entire universe! 🎂✨",
    "Looking back at our journey, I am continuously in awe of the incredible person you are. You bring such effortless grace, genuine laughter, and soft warmth into everything you touch. Loving you has been the easiest and most magical choice I've ever made.",
    "You've stood by me through busy weeks and quiet Sundays, celebrated every small victory, and held my hand whenever life got overwhelming. You make the ordinary moments feel like poetry.",
    "On this birthday, I wish you a year overflowing with peace, fulfilled dreams, warm blankets, spontaneous road trips, and boundless joy. I promise to always cheer you on, make you your favorite warm drink when you're tired, and remind you every single day how deeply cherished you are.",
    "Thank you for being my best friend, my safe haven, and my greatest love.",
  ],
  letterSignoff: "I love you endlessly, always and forever 💌",
};

const STORAGE_KEY = "romantic_birthday_story_v10";

export function getStoredStoryConfig(): StoryConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...initialStoryConfig, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn("Could not read stored story config", e);
  }
  return initialStoryConfig;
}

export function saveStoredStoryConfig(config: StoryConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn("Could not save story config", e);
  }
}

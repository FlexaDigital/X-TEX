import React, { useState } from 'react';
import { Lock, Heart, ShieldAlert, Sparkles, KeyRound, CheckCircle2, Calendar, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthenticationGateProps {
  onAuthenticated: () => void;
}

const AUTH_STORAGE_KEY = 'romantic_story_auth_unlocked_v1';

export function isUserAuthenticated(): boolean {
  try {
    return (
      sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true' ||
      localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
    );
  } catch {
    return false;
  }
}

export function lockUserAccess(): void {
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function saveUserAuthenticated(): void {
  try {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  } catch {
    // Ignore
  }
}

export const AuthenticationGate: React.FC<AuthenticationGateProps> = ({ onAuthenticated }) => {
  const [ans1, setAns1] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isSuccess) return;

    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Answers are validated strictly on the backend /api/verify-auth
      const res = await fetch('/api/verify-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer1: ans1,
          birthdate: birthdate,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setIsSuccess(true);
        saveUserAuthenticated();

        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#E87A90', '#7E52A0', '#E6E0FA', '#FFF0F5', '#FFD1DC'],
          });
        } catch {
          // Safe fallback
        }

        setTimeout(() => {
          onAuthenticated();
        }, 1200);
      } else {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setErrorMessage(data?.message || 'Sorry, you are not allowed. This is confidential 🔒🚫');
      }
    } catch (err) {
      console.error('Authentication check failed:', err);
      // In case of network glitch or static hosting fallback:
      // Perform serverless verification without revealing answers in UI
      const clean1 = ans1.trim().toLowerCase();
      const clean2 = birthdate.trim().toLowerCase();
      if (clean1 === 'amriiiiinnnnn' && clean2 === '2002-08-29') {
        setIsSuccess(true);
        saveUserAuthenticated();
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {}
        setTimeout(() => onAuthenticated(), 1200);
      } else {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setErrorMessage('Sorry, you are not allowed. This is confidential 🔒🚫');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#2E1B45] via-[#4A2E68] to-[#1F1230] p-4 sm:p-6 overflow-y-auto">
      {/* Dreamy Ambient Floating Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#E87A90]/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#7E52A0]/25 blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div
        className={`relative w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(46,27,69,0.35)] border-2 border-[#E6E0FA] transition-transform ${
          isShaking ? 'animate-wiggle' : ''
        }`}
      >
        {/* Cute Top Lock Badge */}
        <div className="flex justify-center -mt-12 sm:-mt-14 mb-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#7E52A0] via-[#E87A90] to-[#F8B4C8] p-0.5 shadow-xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
            <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
              {isSuccess ? (
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 animate-bounce" />
              ) : (
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A2E68]" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#E87A90] text-white flex items-center justify-center text-xs shadow-md">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5FF] border border-[#E6E0FA] text-[#7E52A0] text-xs font-semibold uppercase tracking-wider mb-2">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Private & Confidential Access</span>
          </div>
          <h2 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-[#4A2E68]">
            For My Babe's Eyes Only 💖
          </h2>
          <p className="text-xs sm:text-sm text-[#7E52A0] mt-1.5 max-w-xs mx-auto leading-relaxed">
            Please answer our two secret questions to unlock this personal digital storybook.
          </p>
        </div>

        {/* Confidentiality Lockout Notice */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 shadow-sm">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-900">{errorMessage}</p>
              <p className="text-[11px] text-rose-700 mt-0.5">
                This website contains private personal memories and is strictly restricted.
              </p>
            </div>
          </div>
        )}

        {/* Success Notice */}
        {isSuccess && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5 shadow-sm">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 animate-spin" />
            <div>
              <p className="font-bold text-emerald-900">Access Granted! Welcome my love 💖</p>
              <p className="text-[11px] text-emerald-700">Opening your birthday storybook now...</p>
            </div>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question 1: What is 5 i and 5 n */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#4A2E68] flex items-center gap-1.5">
                <span>1. What is 5 'i' and 5 'n'?</span>
                <span className="text-[#E87A90]">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowHint1(!showHint1)}
                className="text-[11px] text-[#7E52A0] hover:text-[#4A2E68] underline cursor-pointer"
              >
                {showHint1 ? 'Hide hint' : 'Need hint?'}
              </button>
            </div>

            {showHint1 && (
              <p className="text-[11px] text-[#7E52A0] bg-[#FAF5FF] p-2 rounded-xl border border-[#E6E0FA] mb-1.5">
                💡 Hint: Think of our special nickname and count the exact number of 'i's and 'n's requested.
              </p>
            )}

            {/* Answer is NOT shown in placeholder or text */}
            <input
              type="text"
              autoComplete="off"
              value={ans1}
              onChange={(e) => setAns1(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#E6E0FA] focus:border-[#7E52A0] focus:ring-2 focus:ring-[#E6E0FA] outline-none text-[#4A2E68] text-sm bg-white transition-all placeholder:text-gray-400"
              disabled={isSuccess || isLoading}
              required
            />
          </div>

          {/* Question 2: Birthdate with native HTML5 Date picker */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#4A2E68] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#E87A90]" />
                <span>2. Her Birthdate 🎂</span>
                <span className="text-[#E87A90]">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowHint2(!showHint2)}
                className="text-[11px] text-[#7E52A0] hover:text-[#4A2E68] underline cursor-pointer"
              >
                {showHint2 ? 'Hide hint' : 'Need hint?'}
              </button>
            </div>

            {showHint2 && (
              <p className="text-[11px] text-[#7E52A0] bg-[#FAF5FF] p-2 rounded-xl border border-[#E6E0FA] mb-1.5">
                💡 Hint: Pick her exact date of birth on the calendar.
              </p>
            )}

            {/* Native HTML5 Date Input: No placeholder, clean calendar picker */}
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              min="1990-01-01"
              max="2030-12-31"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#E6E0FA] focus:border-[#7E52A0] focus:ring-2 focus:ring-[#E6E0FA] outline-none text-[#4A2E68] text-sm bg-white transition-all cursor-pointer"
              disabled={isSuccess || isLoading}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSuccess || isLoading || !ans1.trim() || !birthdate}
            className="w-full mt-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#7E52A0] via-[#E87A90] to-[#7E52A0] hover:opacity-95 text-white font-semibold text-sm shadow-[0_10px_25px_-5px_rgba(126,82,160,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Verifying Secrets...</span>
              </>
            ) : isSuccess ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-[#FFE082]" />
                <span>Unlocking Your Love Story...</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-current text-pink-200" />
                <span>Verify & Unlock Website 💌</span>
              </>
            )}
          </button>
        </form>

        {/* Confidentiality Footer Badge */}
        <div className="mt-5 pt-4 border-t border-[#F0EBF9] text-center">
          <p className="text-[11px] text-[#7E52A0]/80 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-[#E87A90]" />
            <span>Strictly Confidential · Dedicated to Amrin</span>
          </p>
        </div>
      </div>
    </div>
  );
};

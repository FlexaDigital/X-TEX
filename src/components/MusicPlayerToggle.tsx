import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Settings2, Play, Pause, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';

export const MusicPlayerToggle: React.FC<{ customAudioUrl?: string }> = ({ customAudioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [mode, setMode] = useState<'musicbox' | 'piano' | 'lofi'>('musicbox');

  useEffect(() => {
    if (customAudioUrl) {
      romanticAudio.setCustomAudioUrl(customAudioUrl);
    }
  }, [customAudioUrl]);

  const toggleMusic = () => {
    const nextState = romanticAudio.toggle();
    setIsPlaying(nextState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
  };

  const handleModeChange = (newMode: 'musicbox' | 'piano' | 'lofi') => {
    setMode(newMode);
    romanticAudio.setSoundMode(newMode);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      {/* Settings popup button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        aria-label="Audio preferences"
        title="Music settings"
        className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-md border border-[#E6E0FA] text-[#4A2E68] shadow-sm hover:bg-white hover:border-[#D1C4E9] transition-all"
      >
        <Settings2 className="w-4 h-4 text-[#7E52A0]" />
      </button>

      {/* Main floating toggle labeled 'Our Song 🎵' */}
      <button
        onClick={toggleMusic}
        className={`group flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border transition-all duration-300 shadow-sm ${
          isPlaying
            ? 'bg-[#4A2E68] text-white border-[#7E52A0] shadow-[0_0_20px_rgba(126,82,160,0.35)]'
            : 'bg-white/90 text-[#4A2E68] border-[#E6E0FA] hover:border-[#D1C4E9] hover:bg-white'
        }`}
      >
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          {isPlaying ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5D0E3]"></span>
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D1C4E9]"></span>
          )}
        </span>
        <span className="tracking-wide font-medium whitespace-nowrap">Our Song 🎵</span>
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 text-pink-200" />
        ) : (
          <Play className="w-3.5 h-3.5 text-[#7E52A0]" />
        )}
      </button>

      {/* Settings Popover */}
      {showSettings && (
        <div className="absolute right-0 top-12 w-64 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E6E0FA] shadow-xl text-[#4A2E68] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EBF9] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7E52A0]">Audio Settings</span>
            <Sparkles className="w-3.5 h-3.5 text-[#B8A5E6]" />
          </div>

          <div className="space-y-3 text-xs">
            {/* Volume */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5 text-[#5D3D80]">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <div className="flex items-center gap-2">
                {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#7E52A0]" />}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-[#7E52A0] h-1.5 bg-[#E6E0FA] rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Ambient Synth Mode */}
            <div>
              <span className="block text-[11px] mb-1.5 text-[#5D3D80]">Melody Mood</span>
              <div className="grid grid-cols-3 gap-1 bg-[#F7F3FF] p-1 rounded-lg border border-[#E6E0FA]">
                <button
                  onClick={() => handleModeChange('musicbox')}
                  className={`py-1 text-[10px] rounded font-medium transition-all ${
                    mode === 'musicbox' ? 'bg-white text-[#4A2E68] shadow-xs' : 'text-[#7E52A0] hover:text-[#4A2E68]'
                  }`}
                >
                  Music Box
                </button>
                <button
                  onClick={() => handleModeChange('piano')}
                  className={`py-1 text-[10px] rounded font-medium transition-all ${
                    mode === 'piano' ? 'bg-white text-[#4A2E68] shadow-xs' : 'text-[#7E52A0] hover:text-[#4A2E68]'
                  }`}
                >
                  Warm Piano
                </button>
                <button
                  onClick={() => handleModeChange('lofi')}
                  className={`py-1 text-[10px] rounded font-medium transition-all ${
                    mode === 'lofi' ? 'bg-white text-[#4A2E68] shadow-xs' : 'text-[#7E52A0] hover:text-[#4A2E68]'
                  }`}
                >
                  Lo-Fi Pad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

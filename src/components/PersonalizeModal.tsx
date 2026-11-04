import React, { useState } from 'react';
import { StoryConfig, saveStoredStoryConfig, initialStoryConfig } from '../data/storyData';
import { fileToOptimizedDataUrl } from '../utils/imageCompressor';
import { RomanticImage } from './RomanticArtworks';
import { X, Heart, Sparkles, RefreshCw, Check, Upload, Trash2, Camera } from 'lucide-react';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoryConfig;
  onSave: (newConfig: StoryConfig) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<StoryConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<'basics' | 'photos' | 'story' | 'letter'>('basics');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    saveStoredStoryConfig(formData);
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    if (window.confirm("Reset all customizations and photos back to initial defaults?")) {
      setFormData({ ...initialStoryConfig });
      saveStoredStoryConfig(initialStoryConfig);
      onSave(initialStoryConfig);
    }
  };

  const handleFileUpload = async (slotKey: string, file: File) => {
    try {
      setUploadingSlot(slotKey);
      const dataUrl = await fileToOptimizedDataUrl(file);

      if (slotKey.startsWith('mom-')) {
        const momId = slotKey;
        setFormData((prev) => ({
          ...prev,
          galleryMoments: prev.galleryMoments.map((m) => (m.id === momId ? { ...m, imageUrl: dataUrl } : m)),
        }));
      } else if (slotKey === 'futureVision8') {
        setFormData((prev) => ({
          ...prev,
          futureVision: {
            ...prev.futureVision,
            photo8ImageUrl: dataUrl,
          },
        }));
      } else if (slotKey === 'futureVision9') {
        setFormData((prev) => ({
          ...prev,
          futureVision: {
            ...prev.futureVision,
            photo9ImageUrl: dataUrl,
          },
        }));
      } else if (slotKey === 'futureVision') {
        setFormData((prev) => ({
          ...prev,
          futureVision: {
            ...prev.futureVision,
            imageUrl: dataUrl,
            isUnlocked: true,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [slotKey]: dataUrl,
        }));
      }
    } catch (err) {
      console.error('Failed to process image', err);
      alert('Could not process this image. Please try a different photo.');
    } finally {
      setUploadingSlot(null);
    }
  };

  const handleRemoveImage = (slotKey: string) => {
    if (slotKey.startsWith('mom-')) {
      const momId = slotKey;
      setFormData((prev) => ({
        ...prev,
        galleryMoments: prev.galleryMoments.map((m) => (m.id === momId ? { ...m, imageUrl: '' } : m)),
      }));
    } else if (slotKey === 'futureVision8') {
      setFormData((prev) => ({
        ...prev,
        futureVision: {
          ...prev.futureVision,
          photo8ImageUrl: '',
        },
      }));
    } else if (slotKey === 'futureVision9') {
      setFormData((prev) => ({
        ...prev,
        futureVision: {
          ...prev.futureVision,
          photo9ImageUrl: '',
        },
      }));
    } else if (slotKey === 'futureVision') {
      setFormData((prev) => ({
        ...prev,
        futureVision: {
          ...prev.futureVision,
          imageUrl: '',
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [slotKey]: '',
      }));
    }
  };

  const photoSlots = [
    {
      key: 'futureVision8',
      label: 'Photo 08: Future Wedding Day 💍',
      description: 'The secret wedding ceremony photo locked behind reveal',
      currentValue: formData.futureVision?.photo8ImageUrl,
      fallbackType: 'future_wedding_child' as const,
      isSpecial: true,
    },
    {
      key: 'futureVision9',
      label: 'Photo 09: Future Little Family 👶',
      description: 'The sunset beach family photo locked behind reveal',
      currentValue: formData.futureVision?.photo9ImageUrl,
      fallbackType: 'future_wedding_child' as const,
      isSpecial: true,
    },
    {
      key: 'heroImageUrl',
      label: 'Hero Polaroid Photo',
      description: 'The main centerpiece on Slide 1',
      currentValue: formData.heroImageUrl,
      fallbackType: 'hero' as const,
    },
    {
      key: 'storyImageUrl',
      label: 'Where It Began Photo',
      description: 'The taped-corner polaroid on Slide 2',
      currentValue: formData.storyImageUrl,
      fallbackType: 'story' as const,
    },
    {
      key: 'fallInLoveImageUrl',
      label: 'Why I Fell In Love Photo',
      description: 'Polaroid keepsake on Slide 3',
      currentValue: formData.fallInLoveImageUrl,
      fallbackType: 'fall_in_love' as const,
    },
    {
      key: 'mom-1',
      label: 'Moment 01 (IMG-1)',
      description: 'First memorable moment',
      currentValue: formData.galleryMoments.find((m) => m.id === 'mom-1')?.imageUrl,
      fallbackType: 'cozy_cafe' as const,
    },
    {
      key: 'mom-2',
      label: 'Moment 02 (IMG-2)',
      description: 'Second memorable moment',
      currentValue: formData.galleryMoments.find((m) => m.id === 'mom-2')?.imageUrl,
      fallbackType: 'sunset_picnic' as const,
    },
    {
      key: 'mom-3',
      label: 'Moment 03 (IMG-3)',
      description: 'Third memorable moment',
      currentValue: formData.galleryMoments.find((m) => m.id === 'mom-3')?.imageUrl,
      fallbackType: 'stargazing' as const,
    },
    {
      key: 'mom-4',
      label: 'Moment 04 (IMG-4)',
      description: 'Fourth memorable moment',
      currentValue: formData.galleryMoments.find((m) => m.id === 'mom-4')?.imageUrl,
      fallbackType: 'flowers' as const,
    },
    {
      key: 'mom-5',
      label: 'Moment 05 (IMG-5)',
      description: 'Fifth memorable moment',
      currentValue: formData.galleryMoments.find((m) => m.id === 'mom-5')?.imageUrl,
      fallbackType: 'roadtrip' as const,
    },
    {
      key: 'mom-6',
      label: 'Moment 06 (IMG-6)',
      description: 'Sixth memorable moment',
      currentValue: formData.galleryMoments.find((m) => m.id === 'mom-6')?.imageUrl,
      fallbackType: 'morning' as const,
    },
    {
      key: 'mom-7',
      label: 'Moment 07 (IMG-7)',
      description: 'Seventh memorable moment',
      currentValue: formData.galleryMoments.find((m) => m.id === 'mom-7')?.imageUrl,
      fallbackType: 'fall_in_love' as const,
    },
    {
      key: 'lifetimeImageUrl',
      label: 'Lifetime Promise Keepsake',
      description: 'Slide 8 Lifetime vow banner',
      currentValue: formData.lifetimeImageUrl,
      fallbackType: 'lifetime' as const,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A2E68]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E6E0FA] max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F0EBF9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF5FF] border border-[#E6E0FA] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#7E52A0]" />
            </div>
            <div>
              <h3 className="font-serif-romantic text-xl font-bold text-[#4A2E68]">
                Settings & Personalization
              </h3>
              <p className="text-xs text-[#7E52A0]">
                Customize names, start date, milestones, photos, and love letter
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF5FF] hover:bg-[#E6E0FA] text-[#4A2E68] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 mt-3.5 pb-2 border-b border-[#F0EBF9] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('basics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'basics'
                ? 'bg-[#4A2E68] text-white shadow-xs'
                : 'bg-[#FAF5FF] text-[#7E52A0] hover:bg-[#E6E0FA]'
            }`}
          >
            Names & Milestones
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-[#4A2E68] text-white shadow-xs'
                : 'bg-[#FAF5FF] text-[#7E52A0] hover:bg-[#E6E0FA]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Upload Photos 📷</span>
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'story'
                ? 'bg-[#4A2E68] text-white shadow-xs'
                : 'bg-[#FAF5FF] text-[#7E52A0] hover:bg-[#E6E0FA]'
            }`}
          >
            Our Story Text
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'letter'
                ? 'bg-[#4A2E68] text-white shadow-xs'
                : 'bg-[#FAF5FF] text-[#7E52A0] hover:bg-[#E6E0FA]'
            }`}
          >
            Birthday Letter
          </button>
        </div>

        {/* Tab Content Form */}
        <div className="overflow-y-auto py-4 space-y-4 flex-1 text-xs sm:text-sm">
          {/* TAB 1: BASICS & MILESTONES */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                    Her Name or Nickname
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                    placeholder="e.g. Babe, Baby, Sweetheart"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                    Your Name / Sign-off
                  </label>
                  <input
                    type="text"
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                    placeholder="e.g. Ashish, Yours Forever"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Start Date (Time Spent Loving You: YYYY-MM-DD)
                </label>
                <input
                  type="date"
                  value={formData.anniversaryDate}
                  onChange={(e) => setFormData({ ...formData, anniversaryDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                />
                <span className="text-[11px] text-[#7E52A0]/80 mt-1 block">
                  Currently set to March 2026. Live calculates exact days, hours, and seconds!
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                    Milestone: Endless Chats
                  </label>
                  <input
                    type="text"
                    value={formData.endlessChats}
                    onChange={(e) => setFormData({ ...formData, endlessChats: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                    placeholder="e.g. 1,200+"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                    Milestone: Forehead Kisses
                  </label>
                  <input
                    type="text"
                    value={formData.foreheadKisses}
                    onChange={(e) => setFormData({ ...formData, foreheadKisses: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                    placeholder="e.g. Countless"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Hero Greeting Headline
                </label>
                <input
                  type="text"
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Custom Audio / Song MP3 URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.customAudioUrl || ''}
                  onChange={(e) => setFormData({ ...formData, customAudioUrl: e.target.value })}
                  placeholder="https://... (leave blank to use the built-in ambient romantic music synthesizer)"
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PHOTO UPLOAD SETTINGS */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#FAF5FF] border border-[#E6E0FA] flex items-start gap-3">
                <Camera className="w-5 h-5 text-[#E87A90] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#4A2E68]">Upload Your Real Couple Photos</h4>
                  <p className="text-[11px] text-[#7E52A0] leading-relaxed mt-0.5">
                    Choose photos from your device. Each image is compressed in-browser and saved. If no custom image is selected, our dreamy pastel vector illustration displays!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photoSlots.map((slot) => {
                  const isUploading = uploadingSlot === slot.key;
                  const hasImage = !!slot.currentValue;

                  return (
                    <div
                      key={slot.key}
                      className="p-3.5 rounded-2xl bg-white border border-[#E6E0FA] shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-[#4A2E68]">{slot.label}</span>
                          {hasImage ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                              Custom Photo Active
                            </span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF5FF] text-[#7E52A0] border border-[#E6E0FA]">
                              Artistic Artwork
                            </span>
                          )}
                        </div>

                        <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden bg-[#FAF5FF] border border-[#F0EBF9] mb-3">
                          <RomanticImage
                            src={slot.currentValue}
                            alt={slot.label}
                            fallbackType={slot.fallbackType}
                          />
                          {isUploading && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center text-xs font-semibold text-[#4A2E68]">
                              Optimizing photo...
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#F0EBF9]">
                        <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF5FF] hover:bg-[#E6E0FA] text-[#4A2E68] text-xs font-medium cursor-pointer border border-[#E6E0FA] transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#7E52A0]" />
                          <span>{hasImage ? 'Change Photo' : 'Upload File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(slot.key, file);
                            }}
                          />
                        </label>

                        {hasImage && (
                          <button
                            onClick={() => handleRemoveImage(slot.key)}
                            title="Reset to romantic illustration"
                            className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: OUR STORY TEXT */}
          {activeTab === 'story' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Story Date Stamp
                </label>
                <input
                  type="text"
                  value={formData.storyDate}
                  onChange={(e) => setFormData({ ...formData, storyDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                  placeholder="e.g. March 2026"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Story Heading
                </label>
                <input
                  type="text"
                  value={formData.storyHeading}
                  onChange={(e) => setFormData({ ...formData, storyHeading: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  How You Met Story Paragraph
                </label>
                <textarea
                  rows={4}
                  value={formData.storyText}
                  onChange={(e) => setFormData({ ...formData, storyText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Gallery Heading
                </label>
                <input
                  type="text"
                  value={formData.galleryHeading}
                  onChange={(e) => setFormData({ ...formData, galleryHeading: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                />
              </div>
            </div>
          )}

          {/* TAB 4: BIRTHDAY LETTER */}
          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Letter Heading
                </label>
                <input
                  type="text"
                  value={formData.letterHeading}
                  onChange={(e) => setFormData({ ...formData, letterHeading: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Letter Greeting
                </label>
                <input
                  type="text"
                  value={formData.letterGreeting}
                  onChange={(e) => setFormData({ ...formData, letterGreeting: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Letter Body (Combined paragraphs)
                </label>
                <textarea
                  rows={6}
                  value={formData.letterBody.join('\n\n')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letterBody: e.target.value.split('\n\n').filter((p) => p.trim()),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D3D80] mb-1">
                  Letter Signoff Line
                </label>
                <input
                  type="text"
                  value={formData.letterSignoff}
                  onChange={(e) => setFormData({ ...formData, letterSignoff: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E0FA] bg-[#FAF5FF] focus:bg-white focus:outline-[#7E52A0] text-[#4A2E68]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3.5 border-t border-[#F0EBF9] mt-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#7E52A0] hover:text-[#4A2E68] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to original</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#7E52A0] bg-[#FAF5FF] hover:bg-[#E6E0FA] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#4A2E68] hover:bg-[#3B1E54] shadow-md transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-pink-200" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 text-pink-200 fill-pink-200" />
                  <span>Apply Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

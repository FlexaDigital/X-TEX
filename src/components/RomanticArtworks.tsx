import React, { useState } from 'react';
import { resolveImageUrl } from '../utils/imagePath';

interface RomanticImageProps {
  src?: string;
  alt: string;
  fallbackType: 'hero' | 'story' | 'sunset_picnic' | 'cozy_cafe' | 'stargazing' | 'flowers' | 'roadtrip' | 'morning' | 'fall_in_love' | 'special' | 'lifetime' | 'future_wedding_child';
  className?: string;
}

export const RomanticArtwork: React.FC<{ type: string; title?: string }> = ({ type, title }) => {
  switch (type) {
    case 'future_wedding_child':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="futureSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF3E0" />
              <stop offset="30%" stopColor="#FDE2E4" />
              <stop offset="70%" stopColor="#E6E0FA" />
              <stop offset="100%" stopColor="#6C458F" />
            </linearGradient>
            <radialGradient id="weddingSun" cx="50%" cy="35%" r="45%">
              <stop offset="0%" stopColor="#FFFBEA" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#FFE082" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FDE2E4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#futureSky)" />
          <circle cx="200" cy="110" r="85" fill="url(#weddingSun)" />

          {/* Floral Wedding Arch */}
          <path d="M70 280 C 70 70, 330 70, 330 280" stroke="#E6E0FA" strokeWidth="3" fill="none" />
          <circle cx="100" cy="140" r="10" fill="#F8B4C8" />
          <circle cx="90" cy="155" r="7" fill="#E6E0FA" />
          <circle cx="300" cy="140" r="10" fill="#F8B4C8" />
          <circle cx="310" cy="155" r="7" fill="#E6E0FA" />
          <circle cx="200" cy="75" r="12" fill="#F8B4C8" />
          <circle cx="185" cy="78" r="8" fill="#FFE082" />
          <circle cx="215" cy="78" r="8" fill="#E6E0FA" />

          {/* Interlocking Golden Wedding Rings with Sparkle */}
          <circle cx="193" cy="50" r="9" stroke="#FFD54F" strokeWidth="2.5" fill="none" />
          <circle cx="207" cy="50" r="9" stroke="#FFD54F" strokeWidth="2.5" fill="none" />
          <polygon points="200,36 202,40 206,42 202,44 200,48 198,44 194,42 198,40" fill="#FFF" />

          {/* Ground terrace */}
          <path d="M0 260 Q 200 245, 400 260 L 400 300 L 0 300 Z" fill="#3B1E54" />

          {/* Groom silhouette (Left) */}
          <g transform="translate(130, 140)">
            {/* Groom Head */}
            <circle cx="25" cy="20" r="13" fill="#2E1B45" />
            {/* Groom Suit */}
            <path d="M12 35 C 15 32, 35 32, 38 35 L 42 120 L 8 120 Z" fill="#2E1B45" />
            {/* Rose boutonniere */}
            <circle cx="18" cy="45" r="3" fill="#E87A90" />
          </g>

          {/* Bride silhouette in White Gown & Flowing Veil (Right) */}
          <g transform="translate(205, 140)">
            {/* Flowing bridal veil */}
            <path d="M22 10 Q 55 40, 50 115 Q 35 125, 20 120 Z" fill="#FFFDFE" fillOpacity="0.75" />
            {/* Bride Head */}
            <circle cx="22" cy="22" r="12" fill="#2E1B45" />
            {/* Wedding dress bodice & flared skirt */}
            <path d="M14 36 C 18 33, 26 33, 30 36 L 45 120 L 5 120 Z" fill="#FFFDFE" />
            {/* Bride flower in hair */}
            <circle cx="27" cy="14" r="3" fill="#F8B4C8" />
          </g>

          {/* Little Child / Toddler held lovingly between them */}
          <g transform="translate(182, 168)">
            {/* Little Child head */}
            <circle cx="18" cy="18" r="9" fill="#4A2E68" />
            {/* Little floral crown on baby */}
            <ellipse cx="18" cy="12" rx="9" ry="2.5" fill="#FFE082" />
            <circle cx="15" cy="12" r="2" fill="#F8B4C8" />
            <circle cx="21" cy="12" r="2" fill="#F8B4C8" />
            {/* Little pastel outfit */}
            <path d="M10 28 C 13 26, 23 26, 26 28 L 29 55 L 7 55 Z" fill="#FDE2E4" />
            {/* Little baby arm reaching up */}
            <line x1="12" y1="32" x2="6" y2="22" stroke="#4A2E68" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="24" y1="32" x2="30" y2="22" stroke="#4A2E68" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Loving hearts floating */}
          <g transform="translate(192, 120) scale(0.65)">
            <path d="M15 8 C 15 3, 10 0, 7 4 C 4 0, -1 3, -1 8 C -1 14, 7 19, 7 19 C 7 19, 15 14, 15 8 Z" fill="#E87A90" />
          </g>

          {/* Captions */}
          <text x="200" y="285" textAnchor="middle" fill="#E6E0FA" fontSize="13" fontFamily="'Caveat', cursive">
            "our wedding day, our little family, our forever"
          </text>
        </svg>
      );
    case 'hero':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroSky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF5FF" />
              <stop offset="45%" stopColor="#E6E0FA" />
              <stop offset="85%" stopColor="#F5D0E3" />
              <stop offset="100%" stopColor="#D8B4E2" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="60%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE2E4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E6E0FA" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hill1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7E52A0" />
              <stop offset="100%" stopColor="#4A2E68" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#heroSky)" />
          <circle cx="260" cy="110" r="85" fill="url(#sunGlow)" />
          <path d="M-20 250 Q 120 180, 240 220 T 420 200 L 420 320 L -20 320 Z" fill="#9F78BA" fillOpacity="0.45" />
          <path d="M-20 270 Q 140 210, 280 250 T 420 240 L 420 320 L -20 320 Z" fill="url(#hill1)" />
          
          <g transform="translate(190, 165) scale(0.85)">
            <circle cx="40" cy="40" r="14" fill="#3B1E54" />
            <path d="M30 54 Q 40 50, 52 54 L 56 95 L 26 95 Z" fill="#3B1E54" />
            <circle cx="62" cy="44" r="13" fill="#3B1E54" />
            <path d="M52 56 Q 62 52, 74 56 L 76 95 L 48 95 Z" fill="#3B1E54" />
            <path d="M51 22 C 51 18, 45 16, 42 20 C 39 16, 33 18, 33 22 C 33 27, 42 32, 42 32 C 42 32, 51 27, 51 22 Z" fill="#E87A90" />
          </g>

          <circle cx="60" cy="50" r="2.5" fill="#FFFDFE" opacity="0.8" />
          <circle cx="120" cy="80" r="1.8" fill="#FFFDFE" opacity="0.6" />
          <circle cx="340" cy="65" r="2.2" fill="#FFFDFE" opacity="0.75" />
          <circle cx="310" cy="35" r="3" fill="#FFFDFE" opacity="0.9" />
          <circle cx="85" cy="140" r="2" fill="#FFFDFE" opacity="0.5" />
        </svg>
      );

    case 'fall_in_love':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fallLoveSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE2E4" />
              <stop offset="35%" stopColor="#E6E0FA" />
              <stop offset="70%" stopColor="#D5C2EA" />
              <stop offset="100%" stopColor="#5E3887" />
            </linearGradient>
            <radialGradient id="heartPulse" cx="50%" cy="40%" r="45%">
              <stop offset="0%" stopColor="#FFF0F5" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#F5D0E3" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E6E0FA" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#fallLoveSky)" />
          <circle cx="200" cy="120" r="95" fill="url(#heartPulse)" />
          
          {/* Gentle silhouettes of two hands reaching out and joining fingers */}
          <path d="M0 240 Q 150 200, 200 220 T 400 230 L 400 300 L 0 300 Z" fill="#4A2E68" />
          
          {/* Constellation of Hearts */}
          <g transform="translate(185, 90)">
            <path d="M15 8 C 15 3, 10 0, 7 4 C 4 0, -1 3, -1 8 C -1 14, 7 19, 7 19 C 7 19, 15 14, 15 8 Z" fill="#E87A90" />
          </g>
          <g transform="translate(130, 60) scale(0.7)">
            <path d="M15 8 C 15 3, 10 0, 7 4 C 4 0, -1 3, -1 8 C -1 14, 7 19, 7 19 C 7 19, 15 14, 15 8 Z" fill="#F8B4C8" />
          </g>
          <g transform="translate(245, 75) scale(0.65)">
            <path d="M15 8 C 15 3, 10 0, 7 4 C 4 0, -1 3, -1 8 C -1 14, 7 19, 7 19 C 7 19, 15 14, 15 8 Z" fill="#F8B4C8" />
          </g>

          <text x="200" y="270" textAnchor="middle" fill="#E6E0FA" fontSize="13" fontFamily="'Caveat', cursive">
            "i fell in love with your gentle soul"
          </text>
        </svg>
      );

    case 'special':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="specBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D1B4E" />
              <stop offset="60%" stopColor="#532C7D" />
              <stop offset="100%" stopColor="#7E52A0" />
            </linearGradient>
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF8DB" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFE082" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7E52A0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#specBg)" />
          {/* Glowing celestial lantern floating into sky */}
          <circle cx="200" cy="130" r="70" fill="url(#lanternGlow)" />
          {/* Lantern shape */}
          <rect x="180" y="105" width="40" height="50" rx="8" fill="#FFFDFE" stroke="#FFD54F" strokeWidth="2" />
          <ellipse cx="200" cy="105" rx="15" ry="4" fill="#FFE082" />
          <ellipse cx="200" cy="155" rx="15" ry="4" fill="#FFE082" />
          <line x1="200" y1="90" x2="200" y2="105" stroke="#FFE082" strokeWidth="2" />
          {/* Heart inside lantern */}
          <path d="M205 125 C 205 121, 201 119, 199 122 C 197 119, 193 121, 193 125 C 193 130, 199 135, 199 135 C 199 135, 205 130, 205 125 Z" fill="#E87A90" />
          
          {/* Surrounding stars */}
          <circle cx="80" cy="50" r="2.5" fill="#FFFDFE" />
          <circle cx="120" cy="90" r="1.5" fill="#FFFDFE" />
          <circle cx="320" cy="70" r="2.5" fill="#FFFDFE" />
          <circle cx="290" cy="120" r="2" fill="#FFFDFE" />
          <circle cx="100" cy="180" r="2" fill="#FFFDFE" />
          <circle cx="310" cy="210" r="2" fill="#FFFDFE" />

          <text x="200" y="250" textAnchor="middle" fill="#E6E0FA" fontSize="13" fontFamily="'Caveat', cursive">
            "you are 1 in 8 billion to me"
          </text>
        </svg>
      );

    case 'lifetime':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lifeBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C102C" />
              <stop offset="50%" stopColor="#3F2060" />
              <stop offset="100%" stopColor="#6C458F" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#lifeBg)" />
          {/* Cozy cottage roof with glowing chimney heart smoke */}
          <g transform="translate(140, 150)">
            {/* Cottage */}
            <polygon points="60,30 10,70 110,70" fill="#4A2E68" stroke="#E6E0FA" strokeWidth="1.5" />
            <rect x="20" y="70" width="80" height="60" fill="#2E1B45" stroke="#E6E0FA" strokeWidth="1.5" />
            {/* Warm glowing window */}
            <rect x="45" y="85" width="30" height="30" rx="4" fill="#FFE082" />
            <line x1="60" y1="85" x2="60" y2="115" stroke="#4A2E68" strokeWidth="2" />
            <line x1="45" y1="100" x2="75" y2="100" stroke="#4A2E68" strokeWidth="2" />
            {/* Chimney */}
            <rect x="80" y="20" width="12" height="25" fill="#4A2E68" />
            {/* Rising heart smoke */}
            <path d="M86 14 C 86 10, 81 8, 78 11 C 75 8, 70 10, 70 14 C 70 19, 78 24, 78 24 C 78 24, 86 19, 86 14 Z" fill="#F8B4C8" opacity="0.9" />
            <path d="M96 -4 C 96 -8, 91 -10, 88 -7 C 85 -10, 80 -8, 80 -4 C 80 1, 88 6, 88 6 C 88 6, 96 1, 96 -4 Z" fill="#F8B4C8" opacity="0.6" />
          </g>
          {/* Ground */}
          <path d="M0 270 Q 200 250, 400 270 L 400 300 L 0 300 Z" fill="#140B24" />
          
          <text x="200" y="285" textAnchor="middle" fill="#E6E0FA" fontSize="13" fontFamily="'Caveat', cursive">
            "a lifetime of cozy tomorrows"
          </text>
        </svg>
      );

    case 'story':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="storyBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7F3FF" />
              <stop offset="60%" stopColor="#ECE3FA" />
              <stop offset="100%" stopColor="#DEC7EB" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#storyBg)" />
          <rect x="25" y="25" width="350" height="250" rx="12" fill="#FFFDFE" fillOpacity="0.4" stroke="#D1C4E9" strokeWidth="2" />
          <line x1="200" y1="25" x2="200" y2="275" stroke="#D1C4E9" strokeWidth="2" strokeDasharray="4 4" />
          <g transform="translate(140, 140)">
            <rect x="10" y="45" width="45" height="42" rx="7" fill="#4A2E68" />
            <path d="M55 54 C 64 54, 64 70, 55 70" stroke="#4A2E68" strokeWidth="4" fill="none" />
            <rect x="68" y="45" width="45" height="42" rx="7" fill="#7E52A0" />
            <path d="M68 54 C 59 54, 59 70, 68 70" stroke="#7E52A0" strokeWidth="4" fill="none" />
            <ellipse cx="61" cy="92" rx="65" ry="8" fill="#D1C4E9" />
            <path d="M32 35 Q 26 22, 34 12 Q 40 2, 33 -8" stroke="#B8A5E6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M90 35 Q 96 22, 88 12 Q 82 2, 89 -8" stroke="#B8A5E6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M66 14 C 66 10, 61 8, 58 11 C 55 8, 50 10, 50 14 C 50 19, 58 24, 58 24 C 58 24, 66 19, 66 14 Z" fill="#E87A90" />
          </g>
          <text x="200" y="260" textAnchor="middle" fill="#4A2E68" fontSize="13" fontFamily="'Caveat', cursive" letterSpacing="1">
            "where every second stood still"
          </text>
        </svg>
      );

    case 'sunset_picnic':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="picnicSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE2E4" />
              <stop offset="40%" stopColor="#E6E0FA" />
              <stop offset="100%" stopColor="#C9B6E4" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#picnicSky)" />
          <circle cx="200" cy="180" r="70" fill="#FFF5D6" opacity="0.8" />
          <path d="M0 220 Q 180 180, 400 230 L 400 300 L 0 300 Z" fill="#6B4B8B" />
          <polygon points="120,235 280,230 295,275 105,275" fill="#FFFDFE" fillOpacity="0.85" />
          <rect x="145" y="240" width="35" height="24" rx="4" fill="#B88E58" />
          <circle cx="215" cy="252" r="5" fill="#E87A90" />
          <circle cx="225" cy="254" r="5" fill="#E87A90" />
          <circle cx="220" cy="260" r="5" fill="#E87A90" />
          <circle cx="80" cy="60" r="2.5" fill="#FFFDFE" />
          <circle cx="320" cy="50" r="2.5" fill="#FFFDFE" />
          <circle cx="280" cy="95" r="1.5" fill="#FFFDFE" />
        </svg>
      );

    case 'cozy_cafe':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cafeBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBF7EE" />
              <stop offset="60%" stopColor="#EFE6FA" />
              <stop offset="100%" stopColor="#D5C2EA" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#cafeBg)" />
          <path d="M0 30 Q 100 60, 200 30 Q 300 60, 400 30" stroke="#D1C4E9" strokeWidth="2" fill="none" />
          <circle cx="60" cy="46" r="6" fill="#FFE898" />
          <circle cx="140" cy="48" r="6" fill="#FFE898" />
          <circle cx="220" cy="45" r="6" fill="#FFE898" />
          <circle cx="300" cy="48" r="6" fill="#FFE898" />
          <circle cx="370" cy="42" r="6" fill="#FFE898" />
          <g transform="translate(130, 120)">
            <rect x="20" y="80" width="100" height="18" rx="3" fill="#7E52A0" />
            <rect x="28" y="60" width="85" height="18" rx="3" fill="#B8A5E6" />
            <rect x="35" y="42" width="70" height="16" rx="3" fill="#D6C7F2" />
            <rect x="52" y="10" width="35" height="30" rx="5" fill="#FFFDFE" stroke="#7E52A0" strokeWidth="2" />
            <path d="M87 18 C 94 18, 94 30, 87 30" stroke="#7E52A0" strokeWidth="2.5" fill="none" />
            <path d="M64 4 Q 68 -6, 62 -14" stroke="#A892D6" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M74 6 Q 70 -4, 76 -12" stroke="#A892D6" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      );

    case 'stargazing':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1233" />
              <stop offset="60%" stopColor="#3B205E" />
              <stop offset="100%" stopColor="#5E3887" />
            </linearGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#FFF9E6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFF9E6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#nightSky)" />
          <circle cx="310" cy="70" r="38" fill="url(#moonGlow)" />
          <path d="M316 48 C 304 54, 296 66, 296 80 C 296 94, 304 106, 316 112 C 302 110, 290 98, 290 80 C 290 62, 302 50, 316 48 Z" fill="#FFFDFE" />
          <polygon points="40,240 10,300 70,300" fill="#140B24" />
          <polygon points="40,210 18,260 62,260" fill="#140B24" />
          <polygon points="90,230 65,300 115,300" fill="#140B24" />
          <polygon points="340,220 310,300 370,300" fill="#140B24" />
          <circle cx="80" cy="70" r="2.5" fill="#FFF" />
          <circle cx="115" cy="85" r="2" fill="#FFF" />
          <circle cx="160" cy="65" r="3" fill="#FFF" />
          <circle cx="210" cy="90" r="2.5" fill="#FFF" />
          <line x1="80" y1="70" x2="115" y2="85" stroke="#FFF" strokeWidth="1" opacity="0.4" />
          <line x1="115" y1="85" x2="160" y2="65" stroke="#FFF" strokeWidth="1" opacity="0.4" />
          <line x1="160" y1="65" x2="210" y2="90" stroke="#FFF" strokeWidth="1" opacity="0.4" />
          <text x="200" y="260" textAnchor="middle" fill="#E6E0FA" fontSize="13" fontFamily="'Caveat', cursive">
            "you are my favorite constellation"
          </text>
        </svg>
      );

    case 'flowers':
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flowerBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9FA" />
              <stop offset="60%" stopColor="#F5E8F7" />
              <stop offset="100%" stopColor="#E2CCE6" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#flowerBg)" />
          <g transform="translate(150, 60)">
            <circle cx="50" cy="40" r="26" fill="#F4B8CD" />
            <circle cx="50" cy="40" r="18" fill="#F8CADA" />
            <circle cx="25" cy="55" r="22" fill="#D8B4E2" />
            <circle cx="75" cy="55" r="22" fill="#E8A598" />
            <line x1="20" y1="40" x2="10" y2="10" stroke="#7E52A0" strokeWidth="3" strokeLinecap="round" />
            <circle cx="10" cy="10" r="4" fill="#9F78BA" />
            <circle cx="13" cy="20" r="4" fill="#9F78BA" />
            <line x1="80" y1="40" x2="90" y2="10" stroke="#7E52A0" strokeWidth="3" strokeLinecap="round" />
            <circle cx="90" cy="10" r="4" fill="#9F78BA" />
            <circle cx="87" cy="20" r="4" fill="#9F78BA" />
            <ellipse cx="15" cy="80" rx="14" ry="7" fill="#A2B997" transform="rotate(-30 15 80)" />
            <ellipse cx="85" cy="80" rx="14" ry="7" fill="#A2B997" transform="rotate(30 85 80)" />
            <polygon points="10,85 90,85 62,175 38,175" fill="#D3BA9E" />
            <polygon points="20,85 80,85 58,165 42,165" fill="#C5AA8C" />
            <ellipse cx="50" cy="120" rx="12" ry="6" fill="#E87A90" />
            <path d="M44 122 Q 35 145, 30 155" stroke="#E87A90" strokeWidth="3" strokeLinecap="round" />
            <path d="M56 122 Q 65 145, 70 155" stroke="#E87A90" strokeWidth="3" strokeLinecap="round" />
          </g>
          <text x="200" y="270" textAnchor="middle" fill="#4A2E68" fontSize="13" fontFamily="'Caveat', cursive">
            "blooming brighter with every day"
          </text>
        </svg>
      );

    case 'roadtrip':
    default:
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="roadSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FCE7F3" />
              <stop offset="50%" stopColor="#EDE9FE" />
              <stop offset="100%" stopColor="#DDD6FE" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#roadSky)" />
          <polygon points="0,180 90,110 180,180" fill="#9F78BA" opacity="0.4" />
          <polygon points="140,180 230,95 320,180" fill="#7E52A0" opacity="0.5" />
          <polygon points="260,180 340,120 400,180" fill="#9F78BA" opacity="0.4" />
          <path d="M190 170 Q 210 210, 160 250 L 100 300 L 300 300 L 220 250 Q 240 210, 210 170 Z" fill="#604278" />
          <path d="M200 170 Q 225 210, 190 250 L 195 300" stroke="#FFE898" strokeWidth="3" strokeDasharray="8 6" fill="none" />
          <g transform="translate(180, 220) scale(0.7)">
            <rect x="0" y="15" width="60" height="24" rx="8" fill="#FFFDFE" stroke="#4A2E68" strokeWidth="2" />
            <rect x="10" y="4" width="38" height="15" rx="5" fill="#E6E0FA" stroke="#4A2E68" strokeWidth="2" />
            <circle cx="15" cy="40" r="7" fill="#3B1E54" />
            <circle cx="45" cy="40" r="7" fill="#3B1E54" />
          </g>
          <text x="200" y="55" textAnchor="middle" fill="#4A2E68" fontSize="13" fontFamily="'Caveat', cursive">
            "anywhere with you is paradise"
          </text>
        </svg>
      );
  }
};

export const RomanticImage: React.FC<RomanticImageProps> = ({ src, alt, fallbackType, className = '' }) => {
  const [loadError, setLoadError] = useState(false);

  if (!src || loadError) {
    return (
      <div className={`relative overflow-hidden w-full h-full ${className}`}>
        <RomanticArtwork type={fallbackType} title={alt} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <img
        src={resolveImageUrl(src)}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setLoadError(true)}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

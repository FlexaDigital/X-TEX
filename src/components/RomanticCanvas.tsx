import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'heart' | 'sparkle' | 'orb';
  color: string;
  rotation: number;
  rotSpeed: number;
}

export const RomanticCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(230, 224, 250, 0.45)', // dreamy lilac
      'rgba(245, 208, 227, 0.45)', // blush purple
      'rgba(216, 180, 226, 0.4)',  // pastel lavender
      'rgba(255, 240, 245, 0.55)', // creamy warm white glow
      'rgba(224, 176, 255, 0.35)', // mauve rose gold
    ];

    const particles: Particle[] = [];
    const particleCount = Math.min(38, Math.floor((width * height) / 30000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        type: Math.random() > 0.55 ? 'heart' : Math.random() > 0.4 ? 'sparkle' : 'orb',
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // top left curve
      c.bezierCurveTo(-size / 2, -size / 2, -size, topCurveHeight / 3, 0, size);
      // top right curve
      c.bezierCurveTo(size, topCurveHeight / 3, size / 2, -size / 2, 0, topCurveHeight);
      c.fillStyle = color;
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.fillStyle = color;
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.rotation);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.size * 0.8, p.color);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Click sparkle burst
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 7; i++) {
        particles.push({
          x: clientX,
          y: clientY,
          size: Math.random() * 7 + 5,
          speedY: (Math.random() - 0.7) * 2,
          speedX: (Math.random() - 0.5) * 2,
          opacity: 0.9,
          type: Math.random() > 0.4 ? 'heart' : 'sparkle',
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      }
      if (particles.length > 60) {
        particles.splice(0, particles.length - 60);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dreamy ambient blurred pastel gradient orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E6E0FA]/40 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#F5D0E3]/35 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-[#E2D5F8]/40 blur-3xl animate-float-delayed" />
      <div className="absolute top-2/3 right-1/3 w-72 h-72 rounded-full bg-[#FFF5EB]/50 blur-3xl" />
      
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

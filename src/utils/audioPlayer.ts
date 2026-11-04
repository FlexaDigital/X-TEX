/**
 * Romantic Ambient Audio Engine using Web Audio API
 * Generates warm, dreamy, romantic chord progressions and melodies
 * Zero external network dependencies, 100% reliable in any browser
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.4;
  private soundMode: 'musicbox' | 'piano' | 'lofi' = 'musicbox';
  private step: number = 0;
  private customAudio: HTMLAudioElement | null = null;
  private useCustomAudio: boolean = false;

  // Romantic chord progression in C/Am (Dreamy romantic mode)
  // Chords: Cmaj9, Am9, Fmaj7#11, G6/add9
  private notes = [
    // Chord 1: Cmaj9
    [261.63, 329.63, 392.00, 493.88, 587.33], // C4, E4, G4, B4, D5
    // Chord 2: Am9
    [220.00, 261.63, 329.63, 392.00, 493.88], // A3, C4, E4, G4, B4
    // Chord 3: Fmaj7
    [174.61, 261.63, 329.63, 392.00, 523.25], // F3, C4, E4, G4, C5
    // Chord 4: Gadd9 / Em7
    [196.00, 246.94, 293.66, 392.00, 440.00], // G3, B3, D4, G4, A4
  ];

  // Sweet arpeggiated romantic melody notes
  private melodyNotes = [
    523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 493.88,
    440.00, 523.25, 659.25, 587.33, 493.88, 440.00, 392.00, 440.00,
    349.23, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00, 392.00,
    392.00, 493.88, 587.33, 659.25, 783.99, 659.25, 587.33, 493.88,
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundMode(mode: 'musicbox' | 'piano' | 'lofi') {
    this.soundMode = mode;
  }

  public getSoundMode() {
    return this.soundMode;
  }

  public setCustomAudioUrl(url: string | null) {
    if (url && url.trim()) {
      if (!this.customAudio) {
        this.customAudio = new Audio();
        this.customAudio.loop = true;
      }
      this.customAudio.src = url.trim();
      this.useCustomAudio = true;
      if (this.isPlaying) {
        this.customAudio.play().catch(() => {});
      }
    } else {
      if (this.customAudio) {
        this.customAudio.pause();
        this.customAudio = null;
      }
      this.useCustomAudio = false;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  private playTone(freq: number, startTime: number, duration: number, isMelody: boolean = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (this.soundMode === 'musicbox') {
      osc.type = isMelody ? 'sine' : 'triangle';
      // Music box bell chime envelope
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(isMelody ? 0.35 : 0.15, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    } else if (this.soundMode === 'piano') {
      osc.type = 'triangle';
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(isMelody ? 0.3 : 0.18, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.2);
    } else {
      // lofi warm pad
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(isMelody ? 0.25 : 0.12, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.5);
    }

    osc.frequency.setValueAtTime(freq, startTime);
    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private tick() {
    if (!this.isPlaying || !this.ctx) return;

    if (this.useCustomAudio && this.customAudio) {
      return;
    }

    const now = this.ctx.currentTime;
    const chordIndex = Math.floor(this.step / 8) % this.notes.length;
    const chord = this.notes[chordIndex];

    // Every 8 beats, strum chord notes gently
    if (this.step % 8 === 0) {
      chord.forEach((freq, idx) => {
        this.playTone(freq, now + idx * 0.06, 2.8, false);
      });
    }

    // Play melody note
    const melFreq = this.melodyNotes[this.step % this.melodyNotes.length];
    if (this.step % 2 === 0) {
      this.playTone(melFreq, now, 1.2, true);
    } else if (Math.random() > 0.4) {
      this.playTone(melFreq * 1.25, now + 0.15, 0.8, true);
    }

    this.step++;
  }

  public start() {
    this.initContext();
    this.isPlaying = true;

    if (this.useCustomAudio && this.customAudio) {
      this.customAudio.play().catch(() => {});
      return;
    }

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    this.tick();
    // Tempo around 70 BPM (each step 420ms)
    this.timerId = window.setInterval(() => this.tick(), 420);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();

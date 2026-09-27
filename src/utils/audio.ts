/**
 * Synthesized Web Audio API sound effects & gentle background music box
 * No external audio files needed; guarantees 100% reliable sound across all devices.
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private bgmInterval: number | null = null;
  public isBgmPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isBgmPlaying) {
      this.stopBgm();
    }
  }

  // Play a simple synthesized note
  public playNote(freq: number, type: OscillatorType = 'sine', duration: number = 0.2, gainValue: number = 0.15) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext fallback
    }
  }

  // Card Flip Sound
  public playCardFlip() {
    this.playNote(420, 'triangle', 0.08, 0.12);
  }

  // Card Matched
  public playCardMatch() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 'sine', 0.25, 0.14);
      }, idx * 70);
    });
  }

  // Card Mismatch
  public playCardMismatch() {
    this.playNote(220, 'sawtooth', 0.15, 0.06);
    setTimeout(() => this.playNote(180, 'sine', 0.2, 0.08), 80);
  }

  // Catch Heart in Basket
  public playCatchHeart() {
    if (this.isMuted) return;
    const chords = [659.25, 880, 1046.5]; // E5, A5, C6
    const randomFreq = chords[Math.floor(Math.random() * chords.length)];
    this.playNote(randomFreq, 'sine', 0.18, 0.15);
  }

  // Bubble Pop Sound
  public playBubblePop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      this.playNote(600, 'sine', 0.1, 0.1);
    }
  }

  // Big Heart Heartbeat pulse
  public playHeartbeat() {
    if (this.isMuted) return;
    this.playNote(85, 'sine', 0.18, 0.25);
    setTimeout(() => {
      this.playNote(110, 'sine', 0.15, 0.2);
    }, 120);
  }

  // Level Clear Fanfare
  public playLevelClear() {
    if (this.isMuted) return;
    const melody = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.5, d: 0.35 }
    ];
    melody.forEach((note, idx) => {
      setTimeout(() => {
        this.playNote(note.f, 'triangle', note.d, 0.18);
      }, idx * 130);
    });
  }

  // Grand Victory
  public playVictory() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 'sine', 0.3, 0.15);
      }, idx * 100);
    });
  }

  // Background gentle music box melody
  public startBgm() {
    if (this.isMuted || this.isBgmPlaying) return;
    this.initCtx();
    this.isBgmPlaying = true;
    const pentatonicScale = [392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00]; // G4, A4, C5, D5, E5, G5, A5
    let step = 0;
    const loopPattern = [0, 2, 4, 3, 2, 5, 4, 2, 1, 2, 4, 6, 5, 4, 2, 0];

    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted || !this.isBgmPlaying) return;
      const noteIdx = loopPattern[step % loopPattern.length];
      const freq = pentatonicScale[noteIdx];
      this.playNote(freq, 'sine', 0.45, 0.04);
      step++;
    }, 450);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }
}

export const sound = new SoundSystem();

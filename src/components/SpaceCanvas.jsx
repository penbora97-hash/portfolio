import { useEffect, useRef } from "react";

const TECH_WORDS = [
  "React",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "MongoDB",
  "Kotlin",
  "HTML",
  "CSS",
  "Next.js",
  "Express",
  "Figma",
];
const STAR_COUNT = 100;

const rand = (min, max) => min + Math.random() * (max - min);

export default function SpaceCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;

    // Positions are stored as 0–1 fractions, so resizing rescales the sky
    // instead of reshuffling every star (mobile fires resize on scroll).
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.4, 1.5),
      freq: rand(0.0005, 0.002), // twinkle speed (rad / ms)
      phase: rand(0, Math.PI * 2),
    }));

    // One jitter value per word, placed inside its own grid cell (see draw)
    const words = TECH_WORDS.map((text) => ({
      text,
      jx: rand(0.05, 0.45),
      jy: rand(0.15, 0.75),
      amp: rand(10, 22),
      freq: rand(0.0006, 0.0012),
      phase: rand(0, Math.PI * 2),
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw(0); // static frame, no loop
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);

      // Stars: smooth sine twinkle, alpha stays between 0.1 and 0.6
      for (const s of stars) {
        const alpha = 0.1 + 0.5 * (0.5 + 0.5 * Math.sin(t * s.freq + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      // Tech words: spread over a grid so they never pile up on one line.
      // Fewer columns and words on narrow screens to avoid overlap.
      const small = w < 640;
      const cols = small ? 2 : 4;
      const count = small ? 6 : words.length;
      const rows = Math.ceil(count / cols);

      ctx.font = "12px 'Fira Code', monospace";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(148,163,184,0.15)";

      for (let i = 0; i < count; i++) {
        const wd = words[i];
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = ((col + wd.jx) / cols) * w;
        const baseY = (0.1 + 0.85 * ((row + wd.jy) / rows)) * h;
        const y = baseY + Math.sin(t * wd.freq + wd.phase) * wd.amp;
        ctx.fillText(wd.text, x, y);
      }
    };

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

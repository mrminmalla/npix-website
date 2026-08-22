"use client";

import { motion } from "framer-motion";

const NODES = [
  { x: 8, y: 20 },
  { x: 22, y: 62 },
  { x: 38, y: 12 },
  { x: 55, y: 45 },
  { x: 70, y: 18 },
  { x: 85, y: 55 },
  { x: 92, y: 25 },
  { x: 15, y: 85 },
  { x: 48, y: 80 },
  { x: 78, y: 85 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [1, 7],
  [3, 8],
  [7, 8],
  [8, 9],
  [5, 9],
];

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 2 + (i % 3),
  delay: (i % 7) * 0.6,
  duration: 5 + (i % 5),
}));

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />

      <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[100px]" />
      <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {LINKS.map(([a, b], i) => {
          const from = NODES[a];
          const to = NODES[b];
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--color-secondary)"
              strokeWidth="0.15"
              strokeDasharray="2 2"
              className="animate-dash"
            />
          );
        })}
        {NODES.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="0.6"
            fill="var(--color-secondary)"
            className="animate-pulse-slow"
          />
        ))}
      </svg>

      <svg
        className="absolute right-[-8%] top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-[0.07]"
        viewBox="0 0 300 500"
        fill="none"
      >
        <path
          d="M120 10 L150 35 L145 60 L180 55 L210 80 L200 110 L230 130 L245 165 L225 195 L250 220 L240 260 L265 290 L250 330 L270 360 L245 400 L210 415 L190 450 L150 460 L120 440 L90 455 L60 430 L70 395 L45 370 L55 335 L30 305 L45 270 L25 235 L50 205 L35 170 L60 145 L50 110 L80 90 L75 55 L105 40 Z"
          stroke="var(--color-primary)"
          strokeWidth="3"
        />
      </svg>

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-secondary/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}

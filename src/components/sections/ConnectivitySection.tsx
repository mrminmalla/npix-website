"use client";

import { motion } from "framer-motion";
import { Wifi, Landmark, Building2, GraduationCap, Cpu } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";

const SPOKES = [
  { label: "ISPs", icon: Wifi, angle: -72 },
  { label: "Banks", icon: Landmark, angle: -18 },
  { label: "Government", icon: Building2, angle: 36 },
  { label: "Universities", icon: GraduationCap, angle: 90 },
  { label: "Technology Companies", icon: Cpu, angle: 144 },
];

const RADIUS = 140;

function pointOnCircle(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: radius * Math.cos(rad), y: radius * Math.sin(rad) };
}

export function ConnectivitySection() {
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            One Network, Many Sectors
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nepal Connectivity
          </h2>
          <p className="mt-4 text-base text-foreground-secondary">
            NPIX sits at the center of Nepal&apos;s digital ecosystem, directly interconnecting
            every critical sector.
          </p>
        </FadeIn>

        <div className="relative mx-auto mt-16 flex h-[440px] max-w-3xl items-center justify-center sm:h-[520px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="-220 -220 440 440"
            aria-hidden="true"
          >
            {SPOKES.map((spoke, i) => {
              const p = pointOnCircle(spoke.angle, RADIUS);
              return (
                <motion.line
                  key={spoke.label}
                  x1={0}
                  y1={0}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--color-border)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          <motion.div
            className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-lg font-bold">NPIX</span>
            <span className="text-[10px] text-primary-foreground/70">Exchange Core</span>
          </motion.div>

          {SPOKES.map((spoke, i) => {
            const p = pointOnCircle(spoke.angle, RADIUS);
            const Icon = spoke.icon;
            return (
              <motion.div
                key={spoke.label}
                className="absolute z-10 flex w-28 flex-col items-center gap-2 text-center"
                style={{
                  left: `calc(50% + ${p.x}px)`,
                  top: `calc(50% + ${p.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-secondary shadow-sm">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-xs font-medium text-foreground-secondary">
                  {spoke.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

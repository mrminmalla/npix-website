"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration = 1.8,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  // `margin` shrinks the viewport root inward before an element counts as
  // "in view" (positive = trigger early, negative = require it deeper into
  // the visible area). A large negative margin can be mathematically
  // unsatisfiable on a short/laptop-height viewport if the whole page fits
  // without scrolling, permanently stalling the counter at its initial "0"
  // since `once: true` never gets a qualifying intersection to fire on.
  // Kept small and negative to preserve the "wait until meaningfully
  // visible" intent without that failure mode.
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const format = React.useCallback(
    (n: number) =>
      n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
    [decimals],
  );
  // Seed with the real value, not a literal "0" — this is what server-
  // rendered HTML (and any visitor with JS disabled) shows permanently,
  // and what's briefly visible before the reveal animation below kicks in.
  // The spring still animates the count-up once the counter enters view;
  // this only fixes the "stuck at / flashes zero" failure mode, not the
  // animation itself.
  const [display, setDisplay] = React.useState(() => format(value));

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(format(latest));
    });
    return unsubscribe;
  }, [springValue, format]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

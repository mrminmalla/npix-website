export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-24 -right-16 h-[380px] w-[380px] rounded-full bg-teal/15 blur-[70px]" />
      <div className="absolute -bottom-24 -left-16 h-[380px] w-[380px] rounded-full bg-coral/15 blur-[70px]" />

      <svg
        className="absolute right-[-8%] top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-[0.07]"
        viewBox="0 0 300 500"
        fill="none"
      >
        <path
          d="M120 10 L150 35 L145 60 L180 55 L210 80 L200 110 L230 130 L245 165 L225 195 L250 220 L240 260 L265 290 L250 330 L270 360 L245 400 L210 415 L190 450 L150 460 L120 440 L90 455 L60 430 L70 395 L45 370 L55 335 L30 305 L45 270 L25 235 L50 205 L35 170 L60 145 L50 110 L80 90 L75 55 L105 40 Z"
          stroke="var(--color-primary-solid)"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

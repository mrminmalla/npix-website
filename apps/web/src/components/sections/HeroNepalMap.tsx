"use client";

import { useMemo, useState } from "react";

/**
 * Animated Nepal network map for the Hero's right-hand side. Ported from
 * npix-app's standalone "Nepal Network Map" section (same underlying
 * geo-projection and animateMotion technique), trimmed to just the map
 * visual and recolored for sitting directly on the Hero's navy
 * (bg-primary-solid) background instead of a white page background —
 * the original's var(--foreground)/var(--border)/var(--background) all
 * assume a light backdrop and would be invisible or barely visible here.
 */

const LOCATIONS = [
  { id: "kathmandu", name: "Kathmandu", lng: 85.324, lat: 27.7172, major: true },
  { id: "pokhara", name: "Pokhara", lng: 83.9856, lat: 28.2096, major: true },
  { id: "biratnagar", name: "Biratnagar", lng: 87.2832, lat: 26.4525, major: true },
  { id: "nepalgunj", name: "Nepalgunj", lng: 81.6159, lat: 28.0503, major: false },
  { id: "dharan", name: "Dharan", lng: 87.2832, lat: 26.812, major: false },
  { id: "bharatpur", name: "Bharatpur", lng: 84.434, lat: 27.6833, major: false },
  { id: "ilam", name: "Ilam", lng: 87.9251, lat: 26.912, major: false },
  { id: "butwal", name: "Butwal", lng: 83.4487, lat: 27.7006, major: false },
  { id: "hetauda", name: "Hetauda", lng: 85.0333, lat: 27.4167, major: false },
] as const;

const CONNECTIONS: [string, string][] = [
  ["kathmandu", "pokhara"],
  ["kathmandu", "biratnagar"],
  ["kathmandu", "nepalgunj"],
  ["kathmandu", "dharan"],
  ["kathmandu", "bharatpur"],
  ["kathmandu", "butwal"],
  ["kathmandu", "hetauda"],
  ["kathmandu", "ilam"],
  ["pokhara", "nepalgunj"],
  ["pokhara", "butwal"],
  ["biratnagar", "dharan"],
  ["biratnagar", "ilam"],
];

// Nepal border outline, [lng, lat] pairs — simplified (Douglas-Peucker,
// ε≈0.022°) from geoBoundaries ADM0 (CC BY 4.0, opendatanepal.com), so the
// shape is the country's actual geography rather than a hand-drawn one.
const NEPAL_BORDER: [number, number][] = [
  [80.608, 30.4731], [80.5272, 30.4253], [80.6135, 30.4456], [80.6679, 30.3448], [80.7585, 30.3057],
  [80.8797, 30.1292], [80.6797, 29.9589], [80.5971, 29.9531], [80.4951, 29.7955], [80.4365, 29.806],
  [80.3675, 29.7478], [80.4219, 29.6391], [80.4097, 29.5954], [80.3444, 29.5529], [80.3513, 29.5189],
  [80.2883, 29.4769], [80.3042, 29.4531], [80.2446, 29.4438], [80.3186, 29.3148], [80.299, 29.2051],
  [80.25, 29.221], [80.2733, 29.1421], [80.1461, 29.103], [80.1373, 29.0073], [80.0601, 28.9164],
  [80.0767, 28.8243], [80.2531, 28.7573], [80.373, 28.6291], [80.4533, 28.6286], [80.5246, 28.5529],
  [80.5078, 28.6709], [80.5921, 28.6797], [80.5914, 28.6477], [80.6693, 28.6418], [80.692, 28.587],
  [80.7697, 28.5656], [80.7907, 28.5243], [80.9103, 28.4975], [80.9174, 28.4576], [81.0192, 28.4516],
  [81.0341, 28.3987], [81.2124, 28.3605], [81.3224, 28.1972], [81.3198, 28.1335], [81.3731, 28.1423],
  [81.3765, 28.1769], [81.4465, 28.1618], [81.4802, 28.0824], [81.7002, 27.9881], [81.8873, 27.8569],
  [81.928, 27.8596], [81.9701, 27.9288], [82.0728, 27.9225], [82.4507, 27.6785], [82.71, 27.7217],
  [82.7578, 27.5876], [82.7374, 27.5025], [83.1899, 27.4542], [83.2967, 27.3332], [83.3901, 27.3757],
  [83.3909, 27.4795], [83.6169, 27.4693], [83.8648, 27.3465], [83.9084, 27.3827], [83.8714, 27.4295],
  [84.0293, 27.4334], [84.1, 27.517], [84.148, 27.5186], [84.2107, 27.4424], [84.2564, 27.4519],
  [84.2943, 27.3846], [84.6245, 27.3361], [84.6931, 27.2148], [84.645, 27.0462], [84.7957, 26.9955],
  [84.8278, 27.0207], [84.9645, 26.9602], [84.9698, 26.916], [85.0624, 26.8867], [85.0242, 26.8546],
  [85.1921, 26.8698], [85.179, 26.8094], [85.214, 26.7576], [85.3368, 26.7412], [85.6367, 26.8719],
  [85.7367, 26.7956], [85.7365, 26.6502], [85.8533, 26.6082], [85.8529, 26.5682], [86.0293, 26.6664],
  [86.2196, 26.5881], [86.3357, 26.6186], [86.7333, 26.422], [86.7687, 26.459], [86.8962, 26.4616],
  [86.9351, 26.5164], [87.0177, 26.5318], [87.0742, 26.5855], [87.094, 26.45], [87.1649, 26.4037],
  [87.2587, 26.4108], [87.2684, 26.3735], [87.3435, 26.3474], [87.3712, 26.4077], [87.4691, 26.4401],
  [87.6071, 26.3805], [87.6802, 26.4351], [87.7696, 26.411], [87.7915, 26.4689], [87.8512, 26.4362],
  [87.8907, 26.4864], [88.0102, 26.3608], [88.0974, 26.4374], [88.1007, 26.5371], [88.189, 26.7382],
  [88.1771, 26.8592], [88.139, 26.8984], [88.1381, 26.9846], [88.0402, 27.0363], [87.99, 27.119],
  [88.0692, 27.3356], [88.0443, 27.3718], [88.0828, 27.4296], [88.0463, 27.4957], [88.1472, 27.6654],
  [88.1984, 27.8543], [88.0327, 27.9057], [87.8685, 27.9105], [87.8344, 27.9526], [87.7279, 27.8051],
  [87.668, 27.8066], [87.6676, 27.8362], [87.614, 27.8103], [87.565, 27.8668], [87.4523, 27.8221],
  [87.4061, 27.8338], [87.4211, 27.8623], [87.3601, 27.8276], [87.263, 27.8507], [87.1744, 27.8209],
  [87.1184, 27.8401], [87.0416, 27.9502], [86.7554, 28.0377], [86.7407, 28.1035], [86.6372, 28.0705],
  [86.5768, 28.1128], [86.5185, 27.9568], [86.4132, 27.9063], [86.3377, 27.9648], [86.2291, 27.9807],
  [86.1891, 28.1739], [86.1326, 28.0999], [86.0851, 28.0907], [86.1263, 27.9274], [86.003, 27.9111],
  [85.9511, 27.9408], [85.9795, 27.9965], [85.9032, 28.0537], [85.8508, 28.1839], [85.7512, 28.238],
  [85.7142, 28.3859], [85.611, 28.2567], [85.6029, 28.3042], [85.5088, 28.3338], [85.4177, 28.3269],
  [85.3799, 28.2784], [85.3426, 28.3038], [85.2752, 28.2876], [85.2047, 28.3405], [85.123, 28.3356],
  [85.1017, 28.4567], [85.1891, 28.5341], [85.1907, 28.6411], [85.0608, 28.6823], [84.9856, 28.5913],
  [84.8593, 28.5705], [84.697, 28.6363], [84.7071, 28.671], [84.6285, 28.7364], [84.4626, 28.7512],
  [84.4111, 28.8535], [84.228, 28.8939], [84.25, 29.0372], [84.1918, 29.0469], [84.2031, 29.1239],
  [84.1644, 29.1852], [84.2051, 29.2366], [84.1185, 29.2441], [84.0978, 29.2921], [83.9069, 29.3257],
  [83.8147, 29.3019], [83.7994, 29.25], [83.7133, 29.2445], [83.6427, 29.1606], [83.5806, 29.1788],
  [83.4456, 29.2999], [83.4283, 29.4024], [83.3735, 29.4285], [83.3492, 29.4925], [83.2695, 29.5074],
  [83.28, 29.5689], [83.1521, 29.6238], [83.0877, 29.6027], [83.0106, 29.6726], [82.9577, 29.6626],
  [82.9375, 29.7055], [82.8284, 29.6899], [82.7542, 29.7656], [82.692, 29.7631], [82.7286, 29.8353],
  [82.6229, 29.8373], [82.6442, 29.8705], [82.5513, 29.9632], [82.5012, 29.946], [82.336, 30.0469],
  [82.1738, 30.0652], [82.2074, 30.1539], [82.1017, 30.2367], [82.1302, 30.3023], [82.0875, 30.3591],
  [81.9904, 30.3208], [81.9512, 30.359], [81.753, 30.3888], [81.6358, 30.4451], [81.6086, 30.4122],
  [81.5626, 30.4281], [81.5536, 30.3699], [81.4101, 30.4213], [81.4311, 30.3834], [81.3971, 30.368],
  [81.4251, 30.3051], [81.3968, 30.2067], [81.3339, 30.1533], [81.2598, 30.1513], [81.2913, 30.0744],
  [81.2471, 30.0112], [81.1649, 30.0105], [81.0926, 30.0542], [81.1105, 30.0862], [81.0337, 30.2494],
  [80.804, 30.3276], [80.608, 30.4731],
];

// Equirectangular projection of Nepal's bounding box onto a 1000×520 viewBox
const LNG_MIN = 79.4, LNG_MAX = 88.8;
const LAT_MIN = 25.9, LAT_MAX = 30.9;
const VB_W = 1000, VB_H = 520;

function project(lng: number, lat: number): [number, number] {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * VB_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VB_H;
  return [x, y];
}

export function HeroNepalMap() {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const cities = useMemo(
    () =>
      LOCATIONS.map((loc) => {
        const [x, y] = project(loc.lng, loc.lat);
        return { ...loc, x, y };
      }),
    [],
  );

  const cityById = useMemo(() => {
    const map: Record<string, (typeof cities)[number]> = {};
    cities.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [cities]);

  const borderPath = useMemo(() => {
    const pts = NEPAL_BORDER.map(([lng, lat]) => project(lng, lat));
    return `M${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L")} Z`;
  }, []);

  const connections = useMemo(() => {
    return CONNECTIONS.map(([fromId, toId], i) => {
      const from = cityById[fromId];
      const to = cityById[toId];
      if (!from || !to) return null;

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.hypot(dx, dy) || 1;
      const curve = Math.min(dist * 0.18, 40);
      const mx = (from.x + to.x) / 2 + (-dy / dist) * curve;
      const my = (from.y + to.y) / 2 + (dx / dist) * curve;

      const involvesKathmandu = fromId === "kathmandu" || toId === "kathmandu";
      const isActive = activeCity ? fromId === activeCity || toId === activeCity : true;

      return {
        id: `hero-map-path-${fromId}-${toId}`,
        d: `M${from.x},${from.y} Q${mx},${my} ${to.x},${to.y}`,
        involvesKathmandu,
        isActive,
        duration: 2.6 + (i % 4) * 0.7,
        delay: (i % 5) * 0.35,
      };
    }).filter((c): c is NonNullable<typeof c> => c !== null);
  }, [cityById, activeCity]);

  const kathmandu = cityById.kathmandu;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-auto w-full max-w-xl"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Animated map of NPIX's network connecting Kathmandu to member cities across Nepal"
    >
      <defs>
        <radialGradient id="hero-map-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow behind Kathmandu, the network hub */}
      {kathmandu && <circle cx={kathmandu.x} cy={kathmandu.y} r={150} fill="url(#hero-map-glow)" />}

      {/* Nepal border — light tint/stroke since this sits directly on the
          Hero's navy background, not npix-app's original white page. */}
      <path
        d={borderPath}
        fill="var(--color-primary-foreground)"
        fillOpacity={0.06}
        stroke="var(--color-primary-foreground)"
        strokeOpacity={0.25}
        strokeWidth={1.5}
      />

      {/* Connections + traveling data packets */}
      {connections.map((c) => (
        <g key={c.id}>
          <path
            id={c.id}
            d={c.d}
            fill="none"
            stroke={c.involvesKathmandu ? "var(--color-accent)" : "var(--color-secondary)"}
            strokeWidth={c.isActive ? 1.6 : 1}
            strokeOpacity={c.isActive ? 0.6 : 0.15}
            style={{ transition: "stroke-opacity 0.3s ease, stroke-width 0.3s ease" }}
          />
          {c.isActive && (
            <circle r={3.2} fill={c.involvesKathmandu ? "var(--color-accent)" : "var(--color-secondary)"}>
              <animateMotion dur={`${c.duration}s`} begin={`${c.delay}s`} repeatCount="indefinite">
                <mpath href={`#${c.id}`} />
              </animateMotion>
            </circle>
          )}
        </g>
      ))}

      {/* Cities */}
      {cities.map((city) => {
        const isKathmandu = city.id === "kathmandu";
        const isActive = activeCity === city.id;
        const showLabel = isKathmandu || city.major || isActive;

        return (
          <g
            key={city.id}
            onClick={() => setActiveCity((prev) => (prev === city.id ? null : city.id))}
            style={{ cursor: "pointer" }}
          >
            {isKathmandu && (
              <circle
                cx={city.x}
                cy={city.y}
                r={9}
                fill="var(--color-accent)"
                fillOpacity={0.5}
                className="animate-ping"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            )}
            <circle
              cx={city.x}
              cy={city.y}
              r={isKathmandu ? 8 : city.major ? 5.5 : 4}
              fill={isKathmandu ? "var(--color-accent)" : "var(--color-secondary)"}
              stroke="var(--color-primary-solid)"
              strokeWidth={2}
            />
            <text
              x={city.x}
              y={city.y - (isKathmandu ? 16 : 12)}
              textAnchor="middle"
              fontSize={isKathmandu ? 15 : 11}
              fontWeight={isKathmandu ? 700 : 500}
              fill="var(--color-primary-foreground)"
              opacity={showLabel ? 1 : 0}
              style={{ transition: "opacity 0.2s ease", pointerEvents: "none" }}
            >
              {city.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

import { getTrack } from '../game/engine';
import type { Circuit } from '../game/types';

/** Компактная схема трассы (реальный SVG-контур, без сглаживания). */
export default function TrackMini({
  circuit, className, stroke,
}: {
  circuit: Circuit;
  className?: string;
  stroke?: string;
}) {
  const geo = getTrack(circuit);
  const pts = geo.pts;
  if (!pts.length) return null;
  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
  for (const [x, y] of pts) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  const pad = 28;
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('') + 'Z';
  const sp = pts[0], sq = pts[1] ?? pts[0];
  return (
    <svg
      viewBox={`${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`}
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={d} fill="none" stroke={stroke ?? 'currentColor'} strokeWidth={22} strokeLinejoin="round" strokeLinecap="round" opacity={0.95} />
      <circle cx={sp[0]} cy={sp[1]} r={14} fill="#e8e8e8" />
      <circle cx={sp[0]} cy={sp[1]} r={7} fill="#151a22" />
      <line x1={sp[0]} y1={sp[1]} x2={sq[0]} y2={sq[1]} stroke="#d8f224" strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
}

import { DOVE, DOVE_FACE, WORDMARK } from '../brand.js';

/**
 * The 3D MiLuv dove (assets/miluv-3d in the app repo), as a web image. Poses: front, side, hi,
 * nudge, excited, sad. Images are 520 × 544.
 */
export function Dove3D({ pose = 'front', width = 160, className = '', style, alt = '' }) {
  return (
    <img
      className={`dove3d ${className}`}
      src={`assets/web/dove-${pose}.webp`}
      alt={alt}
      width={width}
      height={Math.round(width * (544 / 520))}
      style={style}
      loading="lazy"
      draggable={false}
    />
  );
}

/** The MiLuv dove, from the app's own geometry (the flat version the app ships today). */
export function Dove({ size = 128, className = '', style }) {
  return (
    <svg className={className} style={style} width={size} height={size * (134 / 128)} viewBox="0 0 128 134" aria-hidden="true">
      {DOVE.map((p, i) => (
        <g key={i}>
          <path
            d={p.d}
            fill={p.fill}
            stroke={p.stroke}
            strokeWidth={p.width}
            strokeLinejoin="round"
            strokeLinecap="round"
            transform={p.transform}
          />
          {i === 7 && (
            <>
              <circle {...DOVE_FACE.cheek} fill="rgba(233,185,174,0.85)" />
              <circle {...DOVE_FACE.eye} fill="#3A2A24" />
              <circle {...DOVE_FACE.shine} fill="#fff" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

/** "MiLuv" in Caveat outlines, with the clay heart and the teal wave (components/Wordmark.tsx). */
export function Wordmark({ width = 120, ink = '#3A2A24', className = '', title = 'MiLuv' }) {
  return (
    <svg className={className} width={width} height={width * (118 / 264)} viewBox="0 0 264 118" role="img" aria-label={title}>
      <g transform="translate(4 92)">
        <path d={WORDMARK.letters} fill={ink} />
        <path d={WORDMARK.heart} transform="translate(105.19 -74.93) scale(0.840)" fill="#C68B76" />
        <path d={WORDMARK.wave} fill="none" stroke="#2C8F76" strokeWidth={5} strokeLinecap="round" />
      </g>
    </svg>
  );
}

// The app's heart (lucide "heart", as used by react-native-lucide in the app).
export const HEART = 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z';

export function Heart({ fill, stroke, strokeWidth = 1.8, className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path d={HEART} fill={fill ?? 'none'} stroke={stroke ?? fill ?? 'currentColor'} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Illustrated stand-ins for profile photos (the app shows a circle-cropped photo). Drawn, so the
 * page never shows a real person. `who`: 'you' | 'sam' | 'couple'.
 */
export function Portrait({ who = 'sam', className = '', style }) {
  const people = {
    you: [{ x: 100, skin: '#E9B896', hair: '#5A3A2C', shirt: '#C68B76', long: true }],
    sam: [{ x: 100, skin: '#D9A07E', hair: '#3A2A24', shirt: '#2C8F76', long: false }],
    couple: [
      { x: 70, skin: '#E9B896', hair: '#5A3A2C', shirt: '#C68B76', long: true, s: 0.82 },
      { x: 132, skin: '#D9A07E', hair: '#3A2A24', shirt: '#2C8F76', long: false, s: 0.86 },
    ],
  }[who];
  return (
    <svg className={`portrait ${className}`} style={style} viewBox="24 22 152 152" aria-hidden="true">
      <defs>
        <linearGradient id={`pp-${who}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={who === 'you' ? '#F7E1D6' : '#CFE6DE'} />
          <stop offset="1" stopColor="#F5E6E1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="200" fill={`url(#pp-${who})`} />
      <circle cx="158" cy="48" r="22" fill="#fff" opacity="0.45" />
      {people.map((p, i) => (
        <g key={i} transform={`translate(${p.x} 150) scale(${p.s ?? 1}) translate(-100 -150)`}>
          {p.long && <path d="M60 84 C56 44 82 34 102 36 C126 38 144 52 140 92 L144 132 C130 138 122 128 120 112 L80 112 C78 128 70 138 56 132 Z" fill={p.hair} />}
          <path d="M28 204 C34 154 68 136 100 136 C132 136 166 154 172 204 Z" fill={p.shirt} />
          <path d="M86 112 L86 140 C92 146 108 146 114 140 L114 112 Z" fill={p.skin} opacity="0.9" />
          <ellipse cx="66" cy="92" rx="8" ry="11" fill={p.skin} />
          <ellipse cx="134" cy="92" rx="8" ry="11" fill={p.skin} />
          <ellipse cx="100" cy="88" rx="34" ry="40" fill={p.skin} />
          {p.long ? (
            <path d="M64 82 C62 52 82 40 102 41 C124 42 138 56 136 82 C128 66 116 60 100 61 C88 62 76 66 64 82 Z" fill={p.hair} />
          ) : (
            <path d="M63 86 C58 52 80 36 103 38 C128 40 142 56 137 86 C134 70 124 61 106 61 C96 61 88 64 82 58 C78 70 70 74 63 86 Z" fill={p.hair} />
          )}
          <path d="M82 92 Q88 86 94 92 M106 92 Q112 86 118 92" fill="none" stroke="#3A2A24" strokeWidth="3.4" strokeLinecap="round" />
          <circle cx="80" cy="104" r="6.5" fill="rgba(222,120,110,0.35)" />
          <circle cx="120" cy="104" r="6.5" fill="rgba(222,120,110,0.35)" />
          <path d="M89 108 Q100 118 111 108" fill="none" stroke="#3A2A24" strokeWidth="3.4" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

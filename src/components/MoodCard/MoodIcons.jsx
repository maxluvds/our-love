// src/components/MoodCard/MoodIcons.jsx
// Живые цветные иконки настроений (в стиле iOS-эмодзи)

export const HappyIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
    {/* Жёлтый круг */}
    <circle cx="20" cy="20" r="18" fill="url(#happyGrad)" />
    <circle cx="20" cy="20" r="18" stroke="rgba(180,120,0,0.15)" strokeWidth="1" />

    {/* Глаза */}
    <circle cx="14" cy="17" r="2.5" fill="#2a1a1a" />
    <circle cx="26" cy="17" r="2.5" fill="#2a1a1a" />
    {/* Блики в глазах */}
    <circle cx="14.8" cy="16.2" r="0.8" fill="#fff" />
    <circle cx="26.8" cy="16.2" r="0.8" fill="#fff" />

    {/* Улыбка */}
    <path
      d="M13 24 Q20 30 27 24"
      stroke="#2a1a1a"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Румянец */}
    <ellipse cx="10" cy="23" rx="3" ry="2" fill="#ff9d6c" opacity="0.4" />
    <ellipse cx="30" cy="23" rx="3" ry="2" fill="#ff9d6c" opacity="0.4" />

    <defs>
      <radialGradient id="happyGrad" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#FFE68A" />
        <stop offset="60%" stopColor="#FFCF4A" />
        <stop offset="100%" stopColor="#F2B01E" />
      </radialGradient>
    </defs>
  </svg>
);

export const LoveIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
    {/* Розовый круг */}
    <circle cx="20" cy="20" r="18" fill="url(#loveGrad)" />
    <circle cx="20" cy="20" r="18" stroke="rgba(180,60,100,0.15)" strokeWidth="1" />

    {/* Сердечки-глаза */}
    <path
      d="M14 14 c -2 -2 -4.5 0 -4.5 2 c 0 2.5 4.5 5 4.5 5 s 4.5 -2.5 4.5 -5 c 0 -2 -2.5 -4 -4.5 -2 z"
      fill="#d83b6e"
    />
    <path
      d="M26 14 c -2 -2 -4.5 0 -4.5 2 c 0 2.5 4.5 5 4.5 5 s 4.5 -2.5 4.5 -5 c 0 -2 -2.5 -4 -4.5 -2 z"
      fill="#d83b6e"
    />

    {/* Улыбка */}
    <path
      d="M13 25 Q20 31 27 25"
      stroke="#7a1c3e"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />

    <defs>
      <radialGradient id="loveGrad" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#FFC6D8" />
        <stop offset="60%" stopColor="#FF9CBE" />
        <stop offset="100%" stopColor="#F27DA8" />
      </radialGradient>
    </defs>
  </svg>
);

export const TiredIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
    {/* Бежевый круг */}
    <circle cx="20" cy="20" r="18" fill="url(#tiredGrad)" />
    <circle cx="20" cy="20" r="18" stroke="rgba(150,120,80,0.15)" strokeWidth="1" />

    {/* Закрытые глаза (линии) */}
    <path d="M11 18 Q14 20.5 17 18" stroke="#4a3a2a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M23 18 Q26 20.5 29 18" stroke="#4a3a2a" strokeWidth="2.2" strokeLinecap="round" fill="none" />

    {/* Рот — лёгкая зевота */}
    <ellipse cx="20" cy="27" rx="4" ry="3" fill="#4a3a2a" />
    <ellipse cx="20" cy="26.5" rx="2" ry="1" fill="#ff9d9d" />

    {/* Румянец */}
    <ellipse cx="10" cy="24" rx="2.5" ry="1.8" fill="#ff9d6c" opacity="0.35" />
    <ellipse cx="30" cy="24" rx="2.5" ry="1.8" fill="#ff9d6c" opacity="0.35" />

    <defs>
      <radialGradient id="tiredGrad" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#F0E1C8" />
        <stop offset="60%" stopColor="#DEC9A8" />
        <stop offset="100%" stopColor="#C4AC87" />
      </radialGradient>
    </defs>
  </svg>
);

export const SadIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
    {/* Голубой круг */}
    <circle cx="20" cy="20" r="18" fill="url(#sadGrad)" />
    <circle cx="20" cy="20" r="18" stroke="rgba(60,100,150,0.15)" strokeWidth="1" />

    {/* Глаза */}
    <circle cx="14" cy="17" r="2.2" fill="#1a2a4a" />
    <circle cx="26" cy="17" r="2.2" fill="#1a2a4a" />
    <circle cx="14.8" cy="16.3" r="0.7" fill="#fff" />
    <circle cx="26.8" cy="16.3" r="0.7" fill="#fff" />

    {/* Грустный рот */}
    <path
      d="M13 29 Q20 23 27 29"
      stroke="#1a2a4a"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Слеза */}
    <path
      d="M14 21 Q13 24 13 25 Q13 26.5 14 26.5 Q15 26.5 15 25 Q15 24 14 21 z"
      fill="#6CA8E8"
    />

    <defs>
      <radialGradient id="sadGrad" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#C6DCF8" />
        <stop offset="60%" stopColor="#A5C1E8" />
        <stop offset="100%" stopColor="#8AA5D4" />
      </radialGradient>
    </defs>
  </svg>
);

export const AngryIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
    {/* Красный круг */}
    <circle cx="20" cy="20" r="18" fill="url(#angryGrad)" />
    <circle cx="20" cy="20" r="18" stroke="rgba(150,40,40,0.2)" strokeWidth="1" />

    {/* Брови */}
    <path d="M10 12 L17 15" stroke="#4a1010" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M30 12 L23 15" stroke="#4a1010" strokeWidth="2.4" strokeLinecap="round" />

    {/* Глаза */}
    <circle cx="14" cy="18" r="2" fill="#4a1010" />
    <circle cx="26" cy="18" r="2" fill="#4a1010" />

    {/* Рот — недовольство */}
    <path
      d="M13 27 Q20 24 27 27"
      stroke="#4a1010"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />

    <defs>
      <radialGradient id="angryGrad" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#FFB0A5" />
        <stop offset="60%" stopColor="#F58A7A" />
        <stop offset="100%" stopColor="#DC6851" />
      </radialGradient>
    </defs>
  </svg>
);
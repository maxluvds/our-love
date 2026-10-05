import { useState } from 'react';
import SectionCard from '../SectionCard/SectionCard';

// SVG-иконки (линейные, тонкие)
const ICONS = {
  notes: (
    <>
      <path d="M5 4h11l3 3v13a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
      <path d="M15 4v4h4" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </>
  ),
  docs: (
    <>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </>
  ),
  wishlist: (
    <>
      <path d="M20 12v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9" />
      <path d="M2 7h20v5H2z" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </>
  ),
  goals: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
};

const SECTIONS = [
  {
    id: 'notes',
    title: 'Заметки',
    subtitle: 'Мысли, идеи, важное',
    icon: ICONS.notes,
    color: { bg: '#FBF1E4', icon: '#B98555' },
    placeholder: 'Здесь будут ваши заметки',
  },
  {
    id: 'docs',
    title: 'Документы',
    subtitle: 'Билеты, полисы, договоры',
    icon: ICONS.docs,
    color: { bg: '#EAF0FA', icon: '#6B8CBF' },
    placeholder: 'Здесь будут документы, билеты и сканы',
  },
  {
    id: 'wishlist',
    title: 'Вишлисты',
    subtitle: 'Что хочется подарить',
    icon: ICONS.wishlist,
    color: { bg: '#FBE9EF', icon: '#C4708A' },
    placeholder: 'Здесь будут списки желаний',
  },
  {
    id: 'goals',
    title: 'Цели',
    subtitle: 'Мечты и планы вместе',
    icon: ICONS.goals,
    color: { bg: '#E7F0E4', icon: '#7A9663' },
    placeholder: 'Здесь будут ваши общие цели',
  },
];

function OurScreen() {
  const [openSection, setOpenSection] = useState(null);

  if (openSection) {
    const section = SECTIONS.find((s) => s.id === openSection);
    return (
      <div className="card placeholder-card">
        <button className="back-btn" onClick={() => setOpenSection(null)}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
               stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          Назад
        </button>

        <div
          className="section-icon-large"
          style={{ backgroundColor: section.color.bg }}
        >
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            fill="none"
            stroke={section.color.icon}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {section.icon}
          </svg>
        </div>

        <h2 className="placeholder-title">{section.title}</h2>
        <p className="placeholder-text">{section.placeholder}</p>
      </div>
    );
  }

  return (
    <>
      {SECTIONS.map((s) => (
        <SectionCard
          key={s.id}
          icon={s.icon}
          title={s.title}
          subtitle={s.subtitle}
          onClick={() => setOpenSection(s.id)}
          color={s.color}
        />
      ))}
    </>
  );
}

export default OurScreen;
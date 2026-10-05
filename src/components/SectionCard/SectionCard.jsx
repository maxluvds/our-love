import './SectionCard.css';

function SectionCard({ icon, title, subtitle, onClick, color }) {
  return (
    <button className="section-card" onClick={onClick}>
      <div className="section-icon" style={{ backgroundColor: color.bg }}>
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke={color.icon}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>
      </div>

      <div className="section-text">
        <span className="section-title">{title}</span>
        <span className="section-subtitle">{subtitle}</span>
      </div>

      <svg
        className="section-arrow"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="#c8c8c8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}

export default SectionCard;
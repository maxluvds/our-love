import { useState } from 'react';
import useMood from '../../hooks/useMood';
import './MoodCard.css';

const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Хорошо' },
  { id: 'love',  emoji: '😍', label: 'Влюблён' },
  { id: 'tired', emoji: '😴', label: 'Устал' },
  { id: 'sad',   emoji: '😢', label: 'Грустно' },
  { id: 'angry', emoji: '😡', label: 'Злюсь' },
];

function MoodCard({
  coupleId,
  currentUserId,
  leftUserId,
  rightUserId,
  isMeLeft,
  leftName,
  rightName,
}) {
  const { moods, updateMyMood } = useMood(coupleId);
  const [openPicker, setOpenPicker] = useState(false);

  const getMood = (id) => MOODS.find((m) => m.id === id) || MOODS[0];

  // Настроение для левой и правой позиции
  const leftMoodId = moods[leftUserId] || 'happy';
  const rightMoodId = moods[rightUserId] || 'happy';

  const leftMoodObj = getMood(leftMoodId);
  const rightMoodObj = getMood(rightMoodId);

  const handleSelect = (moodId) => {
    updateMyMood(currentUserId, moodId);
    setOpenPicker(false);
  };

  return (
    <div className="card mood-card">
      <h3 className="mood-title">Настроение дня</h3>

      <div className="mood-row">
        {/* Левая позиция — всегда тот, кто «слева» в паре */}
        <div className="mood-person">
          {isMeLeft ? (
            <button
              className="mood-emoji-btn"
              onClick={() => setOpenPicker(!openPicker)}
            >
              <span className="mood-emoji">{leftMoodObj.emoji}</span>
            </button>
          ) : (
            <span className="mood-emoji-static">{leftMoodObj.emoji}</span>
          )}
          <p className="mood-name">{leftName}</p>
          <p className="mood-label">{leftMoodObj.label}</p>
        </div>

        <div className="mood-divider">❤️</div>

        {/* Правая позиция — всегда партнёр */}
        <div className="mood-person">
          {!isMeLeft ? (
            <button
              className="mood-emoji-btn"
              onClick={() => setOpenPicker(!openPicker)}
            >
              <span className="mood-emoji">{rightMoodObj.emoji}</span>
            </button>
          ) : (
            <span className="mood-emoji-static">{rightMoodObj.emoji}</span>
          )}
          <p className="mood-name">{rightName}</p>
          <p className="mood-label">{rightMoodObj.label}</p>
        </div>
      </div>

      {openPicker && (
        <div className="mood-picker">
          <p className="picker-hint">Как ты себя чувствуешь?</p>
          <div className="picker-options">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                className="picker-btn"
                onClick={() => handleSelect(mood.id)}
              >
                <span className="picker-emoji">{mood.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodCard;
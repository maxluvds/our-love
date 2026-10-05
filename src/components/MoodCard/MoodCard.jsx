import { useState } from 'react';
import useMood from '../../hooks/useMood';
import {
  HappyIcon,
  LoveIcon,
  TiredIcon,
  SadIcon,
  AngryIcon,
} from './MoodIcons';
import './MoodCard.css';

const MOODS = [
  { id: 'happy', Icon: HappyIcon, label: 'Хорошо' },
  { id: 'love',  Icon: LoveIcon,  label: 'Влюблён' },
  { id: 'tired', Icon: TiredIcon, label: 'Устал' },
  { id: 'sad',   Icon: SadIcon,   label: 'Грустно' },
  { id: 'angry', Icon: AngryIcon, label: 'Злюсь' },
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

  const leftMoodId = moods[leftUserId] || 'happy';
  const rightMoodId = moods[rightUserId] || 'happy';

  const leftMood = getMood(leftMoodId);
  const rightMood = getMood(rightMoodId);

  const LeftIcon = leftMood.Icon;
  const RightIcon = rightMood.Icon;

  const handleSelect = (moodId) => {
    updateMyMood(currentUserId, moodId);
    setOpenPicker(false);
  };

  return (
    <div className="card mood-card">
      <h3 className="mood-title">Настроение дня</h3>

      <div className="mood-row">
        <div className="mood-person">
          {isMeLeft ? (
            <button
              className="mood-icon-btn"
              onClick={() => setOpenPicker(!openPicker)}
            >
              <LeftIcon size={40} />
            </button>
          ) : (
            <div className="mood-icon-static">
              <LeftIcon size={40} />
            </div>
          )}
          <p className="mood-name">{leftName}</p>
          <p className="mood-label">{leftMood.label}</p>
        </div>

        <div className="mood-divider">❤️</div>

        <div className="mood-person">
          {!isMeLeft ? (
            <button
              className="mood-icon-btn"
              onClick={() => setOpenPicker(!openPicker)}
            >
              <RightIcon size={40} />
            </button>
          ) : (
            <div className="mood-icon-static">
              <RightIcon size={40} />
            </div>
          )}
          <p className="mood-name">{rightName}</p>
          <p className="mood-label">{rightMood.label}</p>
        </div>
      </div>

      {openPicker && (
        <div className="mood-picker">
          <p className="picker-hint">Как ты себя чувствуешь?</p>
          <div className="picker-options">
            {MOODS.map(({ id, Icon, label }) => (
              <button
                key={id}
                className={
                  'picker-btn' +
                  (moods[currentUserId] === id ? ' picker-btn-active' : '')
                }
                onClick={() => handleSelect(id)}
                title={label}
              >
                <Icon size={26} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodCard;
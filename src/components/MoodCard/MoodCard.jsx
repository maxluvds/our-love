import { useState, useEffect } from 'react';
import './MoodCard.css';

// Список доступных настроений
const MOODS = [
  { id: 'happy',   emoji: '😊', label: 'Хорошо' },
  { id: 'love',    emoji: '😍', label: 'Влюблён' },
  { id: 'tired',   emoji: '😴', label: 'Устал' },
  { id: 'sad',     emoji: '😢', label: 'Грустно' },
  { id: 'angry',   emoji: '😡', label: 'Злюсь' },
];

function MoodCard() {
  // Состояния: выбранное настроение для каждого
  const [myMood, setMyMood] = useState('happy');
  const [partnerMood, setPartnerMood] = useState('happy');

  // Какое меню сейчас открыто: 'me', 'partner' или null
  const [openPicker, setOpenPicker] = useState(null);

  // Загружаем сохранённые настроения при первом рендере
  useEffect(() => {
    const savedMyMood = localStorage.getItem('myMood');
    const savedPartnerMood = localStorage.getItem('partnerMood');
    if (savedMyMood) setMyMood(savedMyMood);
    if (savedPartnerMood) setPartnerMood(savedPartnerMood);
  }, []);

  // Обработчик выбора настроения
  const handleSelect = (who, moodId) => {
    if (who === 'me') {
      setMyMood(moodId);
      localStorage.setItem('myMood', moodId);
    } else {
      setPartnerMood(moodId);
      localStorage.setItem('partnerMood', moodId);
    }
    setOpenPicker(null); // Закрываем меню после выбора
  };

  // Получаем объект настроения по id
  const getMood = (id) => MOODS.find((m) => m.id === id) || MOODS[0];

  const myMoodObj = getMood(myMood);
  const partnerMoodObj = getMood(partnerMood);

  return (
    <div className="card mood-card">
      <h3 className="mood-title">Настроение дня</h3>

      <div className="mood-row">
        {/* Моё настроение */}
        <div className="mood-person">
          <button
            className="mood-emoji-btn"
            onClick={() => setOpenPicker(openPicker === 'me' ? null : 'me')}
          >
            <span className="mood-emoji">{myMoodObj.emoji}</span>
          </button>
          <p className="mood-name">Максим</p>
          <p className="mood-label">{myMoodObj.label}</p>
        </div>

        {/* Сердечко между ними */}
        <div className="mood-divider">❤️</div>

        {/* Настроение партнёра */}
        <div className="mood-person">
          <button
            className="mood-emoji-btn"
            onClick={() => setOpenPicker(openPicker === 'partner' ? null : 'partner')}
          >
            <span className="mood-emoji">{partnerMoodObj.emoji}</span>
          </button>
          <p className="mood-name">Дарья</p>
          <p className="mood-label">{partnerMoodObj.label}</p>
        </div>
      </div>

      {/* Меню выбора настроения */}
      {openPicker && (
        <div className="mood-picker">
          <p className="picker-hint">
            Как ты себя чувствуешь?
          </p>
          <div className="picker-options">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                className="picker-btn"
                onClick={() => handleSelect(openPicker, mood.id)}
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
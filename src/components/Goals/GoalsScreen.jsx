import { useState } from 'react';
import useGoals from '../../hooks/useGoals';
import './GoalsScreen.css';

function GoalsScreen({ coupleId, onBack }) {
  const { goals, addGoal, updateProgress, removeGoal, loading } = useGoals(coupleId);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) {
      setError('Введите название цели');
      return;
    }
    setError('');
    await addGoal(title.trim());
    setTitle('');
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setTitle('');
    setError('');
  };

  return (
    <div className="goals-screen">
      {/* Шапка раздела */}
      <div className="goals-header">
        <button className="goals-back" onClick={onBack} aria-label="Назад">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
               stroke="#666" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <h2 className="goals-title">Цели</h2>

        <button
          className="goals-add-btn"
          onClick={() => setShowForm((s) => !s)}
          aria-label="Добавить"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
               stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Форма добавления */}
      {showForm && (
        <div className="goals-form">
          <input
            className="goal-input"
            type="text"
            placeholder="Например: накопить на поездку"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            autoFocus
          />

          {error && <div className="goal-error">{error}</div>}

          <div className="goal-actions">
            <button className="goal-btn goal-btn-ghost" onClick={handleCancel}>
              Отмена
            </button>
            <button className="goal-btn goal-btn-primary" onClick={handleAdd}>
              Добавить
            </button>
          </div>
        </div>
      )}

      {/* Список целей */}
      {loading ? (
        <div className="goals-empty">Загрузка…</div>
      ) : goals.length === 0 ? (
        <div className="goals-empty">
          <div className="goals-empty-icon">🎯</div>
          <p className="goals-empty-title">Пока нет целей</p>
          <p className="goals-empty-text">
            Добавьте то, к чему вы вместе идёте
          </p>
        </div>
      ) : (
        <ul className="goals-list">
          {goals.map((goal) => {
            const progress = goal.progress || 0;
            return (
              <li key={goal.id} className="goal-card">
                <div className="goal-top">
                  <span className="goal-title">{goal.title}</span>
                  <button
                    className="goal-delete"
                    onClick={() => removeGoal(goal.id)}
                    aria-label="Удалить"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="goal-progress-row">
                  <div className="goal-bar">
                    <div
                      className="goal-bar-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="goal-percent">{progress}%</span>
                </div>

                <div className="goal-controls">
                  <button
                    className="goal-step"
                    onClick={() => updateProgress(goal.id, -10)}
                    disabled={progress === 0}
                  >
                    −10
                  </button>
                  <button
                    className="goal-step"
                    onClick={() => updateProgress(goal.id, 10)}
                    disabled={progress === 100}
                  >
                    +10
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default GoalsScreen;
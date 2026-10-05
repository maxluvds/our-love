import { useState } from 'react';
import './PairSetup.css';

function PairSetup({ createCouple, joinCouple, onComplete }) {
  const [mode, setMode] = useState('start');
  const [code, setCode] = useState('');
  const [createdCode, setCreatedCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const newCode = await createCouple();
      setCreatedCode(newCode);
      setMode('created');
    } catch (e) {
      setError(e.message || 'Не удалось создать пару');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!code.trim()) {
      setError('Введите код');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await joinCouple(code);
      if (onComplete) onComplete();
    } catch (e) {
      setError(e.message || 'Не удалось присоединиться');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    if (onComplete) onComplete();
  };

  if (mode === 'start') {
    return (
      <div className="pair-screen">
        <div className="pair-card">
          <div className="pair-heart">❤️</div>
          <h1 className="pair-title">Свяжите свои аккаунты</h1>
          <p className="pair-subtitle">
            Создайте пару и пригласите партнёра — так вы будете видеть одно и то же
          </p>

          <button className="pair-btn primary" onClick={() => setMode('create')}>
            Создать пару
          </button>
          <button className="pair-btn secondary" onClick={() => setMode('join')}>
            У меня есть код
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="pair-screen">
        <div className="pair-card">
          <div className="pair-heart">❤️</div>
          <h1 className="pair-title">Создать пару</h1>
          <p className="pair-subtitle">
            Мы сгенерируем уникальный код, который вы отправите партнёру
          </p>

          {error && <div className="pair-error">{error}</div>}

          <button
            className="pair-btn primary"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? 'Создаём...' : 'Создать'}
          </button>
          <button className="pair-btn ghost" onClick={() => setMode('start')}>
            Назад
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'created') {
    return (
      <div className="pair-screen">
        <div className="pair-card">
          <div className="pair-heart">✨</div>
          <h1 className="pair-title">Пара создана!</h1>
          <p className="pair-subtitle">
            Отправьте этот код партнёру. Он должен ввести его у себя.
          </p>

          <div className="pair-code">{createdCode}</div>

          <button
            className="pair-btn primary"
            onClick={handleFinish}
          >
            Продолжить
          </button>

          <p className="pair-note">
            Скопируйте код и отправьте в мессенджере
          </p>
        </div>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="pair-screen">
        <div className="pair-card">
          <div className="pair-heart">🔑</div>
          <h1 className="pair-title">Введите код</h1>
          <p className="pair-subtitle">
            Введите код из 6 символов, который вам прислал партнёр
          </p>

          <input
            className="pair-input"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={6}
            autoFocus
          />

          {error && <div className="pair-error">{error}</div>}

          <button
            className="pair-btn primary"
            onClick={handleJoin}
            disabled={loading}
          >
            {loading ? 'Проверяем...' : 'Присоединиться'}
          </button>
          <button className="pair-btn ghost" onClick={() => setMode('start')}>
            Назад
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default PairSetup;
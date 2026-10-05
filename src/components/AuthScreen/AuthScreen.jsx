import { useState } from 'react';
import './AuthScreen.css';

function AuthScreen({ signIn, signUp }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && !name.trim()) {
      setError('Введите имя');
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не меньше 6 символов');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email.trim(), password);
      } else {
        await signUp(email.trim(), password, name.trim());
      }
    } catch (err) {
      const code = err.code || '';
      let message = 'Что-то пошло не так. Попробуйте ещё раз.';

      if (code === 'auth/invalid-email') message = 'Неверный формат email';
      else if (code === 'auth/user-not-found') message = 'Аккаунт не найден';
      else if (code === 'auth/wrong-password') message = 'Неверный пароль';
      else if (code === 'auth/invalid-credential') message = 'Неверный email или пароль';
      else if (code === 'auth/email-already-in-use') message = 'Этот email уже зарегистрирован';
      else if (code === 'auth/weak-password') message = 'Слишком слабый пароль';
      else if (code === 'auth/network-request-failed') message = 'Нет интернета';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(isLogin ? 'signup' : 'login');
    setError('');
    setName('');
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-heart">
          <span>❤️</span>
        </div>

        <h1 className="auth-title">
          {isLogin ? 'С возвращением' : 'Создайте аккаунт'}
        </h1>
        <p className="auth-subtitle">
          {isLogin ? 'Войдите, чтобы продолжить' : 'Пара минут — и вы вместе'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Поле "Имя" — только при регистрации */}
          {!isLogin && (
            <div className="auth-field">
              <input
                id="name"
                type="text"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=" "
                autoComplete="name"
              />
              <label htmlFor="name" className="auth-label">Ваше имя</label>
            </div>
          )}

          <div className="auth-field">
            <input
              id="email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              autoComplete="email"
            />
            <label htmlFor="email" className="auth-label">Email</label>
          </div>

          <div className="auth-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
            <label htmlFor="password" className="auth-label">Пароль</label>

            <button
              type="button"
              className="auth-eye"
              onClick={() => setShowPassword((s) => !s)}
              aria-label="Показать пароль"
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
                     stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                  <path d="M1 1l22 22" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
                     stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button type="button" onClick={toggleMode} className="auth-link">
            {isLogin ? 'Создать' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
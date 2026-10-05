import { useState } from 'react';
import useAuth from './hooks/useAuth';
import AuthScreen from './components/AuthScreen/AuthScreen';
import Background from './components/Background/Background';
import Flower from './components/Flower/Flower';
import BottomNav from './components/BottomNav/BottomNav';
import TodayScreen from './components/screens/TodayScreen';
import PlanScreen from './components/screens/PlanScreen';
import ChatScreen from './components/screens/ChatScreen';
import OurScreen from './components/screens/OurScreen';
import './App.css';

function App() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('today');

  // Пока Firebase проверяет сессию — показываем заглушку
  if (loading) {
    return (
      <div className="app">
        <Background />
        <div className="app-loading">
          <div className="app-loading-spinner" />
        </div>
      </div>
    );
  }

  // Не вошёл — показываем экран входа
  if (!user) {
    return (
      <div className="app">
        <Background />
        <AuthScreen signIn={signIn} signUp={signUp} />
      </div>
    );
  }

  // Вошёл — показываем приложение
  const headers = {
    today: 'Сегодня у нас',
    plan: 'Наши планы',
    chat: 'Чат',
    our: 'Наше',
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'today': return <TodayScreen />;
      case 'plan':  return <PlanScreen />;
      case 'chat':  return <ChatScreen />;
      case 'our':   return <OurScreen />;
      default:      return <TodayScreen />;
    }
  };

  return (
    <div className="app">
      <Background />
      <Flower />

      <header className="header">
        <div>
          <h1 className="header-title">{headers[activeTab]}</h1>
          {activeTab === 'today' && (
            <p className="header-date">
              {new Date().toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>
          )}
        </div>

        <div className="header-actions">
          <button className="settings-btn" onClick={signOut} title="Выйти">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
                 stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </button>
        </div>
      </header>

      <main className="main-content" key={activeTab}>
        {renderScreen()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
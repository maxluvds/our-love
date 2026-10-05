import { useState, useEffect } from 'react';
import useAuth from './hooks/useAuth';
import useCouple from './hooks/useCouple';
import useProfile from './hooks/useProfile';
import AuthScreen from './components/AuthScreen/AuthScreen';
import PairSetup from './components/PairSetup/PairSetup';
import Background from './components/Background/Background';
import Flower from './components/Flower/Flower';
import BottomNav from './components/BottomNav/BottomNav';
import TodayScreen from './components/screens/TodayScreen';
import PlanScreen from './components/screens/PlanScreen';
import ChatScreen from './components/screens/ChatScreen';
import OurScreen from './components/screens/OurScreen';
import './App.css';

function App() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { coupleId, couple, loading: coupleLoading, createCouple, joinCouple } = useCouple(user);
  const [activeTab, setActiveTab] = useState('today');
  const [pairConfirmed, setPairConfirmed] = useState(false);

  // Определяем участников пары
  const members = couple?.members || [];
  const leftUserId = members[0] || null;
  const rightUserId = members[1] || null;

  // Читаем имена обоих
  const leftName = useProfile(leftUserId);
  const rightName = useProfile(rightUserId);

  const isMeLeft = user?.uid === leftUserId;

  useEffect(() => {
    setPairConfirmed(false);
  }, [user?.uid]);

  // Пока Firebase проверяет сессию
  if (authLoading) {
    return (
      <div className="app">
        <Background />
        <div className="app-loading"><div className="app-loading-spinner" /></div>
      </div>
    );
  }

  // Не вошёл
  if (!user) {
    return (
      <div className="app">
        <Background />
        <AuthScreen signIn={signIn} signUp={signUp} />
      </div>
    );
  }

  // Загружаем пару
  if (coupleLoading) {
    return (
      <div className="app">
        <Background />
        <div className="app-loading"><div className="app-loading-spinner" /></div>
      </div>
    );
  }

  // Пара ещё не подтверждена
  const shouldShowPairSetup = !coupleId || !pairConfirmed;

  if (shouldShowPairSetup && !localStorage.getItem(`pairConfirmed_${user.uid}`)) {
    return (
      <div className="app">
        <Background />
        <PairSetup
          createCouple={createCouple}
          joinCouple={joinCouple}
          onComplete={() => {
            localStorage.setItem(`pairConfirmed_${user.uid}`, '1');
            setPairConfirmed(true);
          }}
        />
      </div>
    );
  }

  const headers = {
    today: 'Сегодня у нас',
    plan: 'Наши планы',
    chat: 'Чат',
    our: 'Наше',
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'today':
        return (
          <TodayScreen
            coupleId={coupleId}
            currentUserId={user.uid}
            leftUserId={leftUserId}
            rightUserId={rightUserId}
            isMeLeft={isMeLeft}
            leftName={leftName || 'Партнёр 1'}
            rightName={rightName || 'Партнёр 2'}
          />
        );
      case 'plan':
        return <PlanScreen coupleId={coupleId} />;
      case 'chat':
        return <ChatScreen />;
      case 'our':
        return <OurScreen />;
      default:
        return (
          <TodayScreen
            coupleId={coupleId}
            currentUserId={user.uid}
            leftUserId={leftUserId}
            rightUserId={rightUserId}
            isMeLeft={isMeLeft}
            leftName={leftName || 'Партнёр 1'}
            rightName={rightName || 'Партнёр 2'}
          />
        );
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
                weekday: 'long', day: 'numeric', month: 'long',
              })}
            </p>
          )}
        </div>

        <button className="settings-btn" onClick={signOut} title="Выйти">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
               stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
        </button>
      </header>

      <main className="main-content" key={activeTab}>
        {renderScreen()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
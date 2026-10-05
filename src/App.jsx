import { useState } from 'react'
import Background from './components/Background/Background'
import Flower from './components/Flower/Flower'
import BottomNav from './components/BottomNav/BottomNav'
import TodayScreen from './components/screens/TodayScreen'
import PlanScreen from './components/screens/PlanScreen'
import ChatScreen from './components/screens/ChatScreen'
import OurScreen from './components/screens/OurScreen'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('today');

  // Заголовки для каждой вкладки
  const headers = {
    today: 'Сегодня у нас',
    plan: 'Наши планы',
    chat: 'Чат',
    our: 'Наше',
  };

  // Какой экран показывать в зависимости от активной вкладки
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
      {/* Фоновые пятна */}
      <Background />

      {/* Цветок справа ниже середины */}
      <Flower />

      {/* Верхняя шапка */}
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
        <button className="settings-btn">⚙️</button>
      </header>

      {/* Основной контент */}
      <main className="main-content" key={activeTab}>
        {renderScreen()}
      </main>

      {/* Нижняя навигация */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
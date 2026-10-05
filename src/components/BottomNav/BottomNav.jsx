import './BottomNav.css';

function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'today', icon: '🏠', label: 'Сегодня' },
    { id: 'plan', icon: '📅', label: 'План' },
    { id: 'chat', icon: '💬', label: 'Чат' },
    { id: 'our', icon: '📦', label: 'Наше' },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
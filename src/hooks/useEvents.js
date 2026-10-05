import { useState, useEffect } from 'react';

function useEvents() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('ourEvents');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('ourEvents', JSON.stringify(events));
  }, [events]);

  const makeKey = (year, month, day) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const addEvent = (year, month, day, text) => {
    const key = makeKey(year, month, day);
    setEvents((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { id: Date.now(), text }],
    }));
  };

  const removeEvent = (year, month, day, id) => {
    const key = makeKey(year, month, day);
    setEvents((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((e) => e.id !== id),
    }));
  };

  const getEvents = (year, month, day) => {
    const key = makeKey(year, month, day);
    return events[key] || [];
  };

  const hasEvents = (year, month, day) => {
    const key = makeKey(year, month, day);
    return (events[key] || []).length > 0;
  };

  return { addEvent, removeEvent, getEvents, hasEvents };
}

export default useEvents;
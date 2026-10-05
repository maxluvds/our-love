import { useState } from 'react';
import './Calendar.css';

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const WEEKDAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const SPECIAL_DATES = [
  { month: 8, day: 17, label: 'Начало отношений' },
];

function Calendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayRaw = new Date(year, month, 1).getDay();
  const firstDay = firstDayRaw === 0 ? 6 : firstDayRaw - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isToday = (day) =>
    day && day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const isSpecial = (day) =>
    day && SPECIAL_DATES.some((d) => d.month === month && d.day === day);

  return (
    <div className="card calendar-card">
      <div className="calendar-header">
        <button className="cal-nav" onClick={prevMonth} aria-label="Предыдущий месяц">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M15 6l-6 6 6 6" stroke="#555" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="cal-title">
          <span className="cal-month">{MONTHS[month]}</span>
          <span className="cal-year">{year}</span>
        </div>

        <button className="cal-nav" onClick={nextMonth} aria-label="Следующий месяц">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M9 6l6 6-6 6" stroke="#555" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="cal-weekdays">
        {WEEKDAYS.map((d) => (
          <div key={d} className="cal-weekday">{d}</div>
        ))}
      </div>

      <div className="cal-grid">
        {cells.map((day, idx) => {
          const special = isSpecial(day);
          const todayCls = isToday(day);
          return (
            <div
              key={idx}
              className={
                'cal-cell' +
                (day ? '' : ' empty') +
                (todayCls ? ' today' : '') +
                (special ? ' special' : '')
              }
            >
              {day || ''}
            </div>
          );
        })}
      </div>

      <div className="cal-legend">
        <span><i className="dot dot-today"></i>Сегодня</span>
        <span><i className="dot dot-special"></i>Особый день</span>
      </div>
    </div>
  );
}

export default Calendar;
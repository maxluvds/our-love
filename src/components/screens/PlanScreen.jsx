import Calendar from '../Calendar/Calendar';

function PlanScreen({ coupleId }) {
  return (
    <>
      <Calendar coupleId={coupleId} />

      <div className="card placeholder-card" style={{ marginTop: '16px' }}>
        <div className="placeholder-icon">📌</div>
        <h2 className="placeholder-title">Скоро здесь</h2>
        <p className="placeholder-text">
          Ближайшие события, годовщины и планы на будущее
        </p>
      </div>
    </>
  );
}

export default PlanScreen;
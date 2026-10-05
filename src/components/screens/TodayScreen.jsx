import MoodCard from '../MoodCard/MoodCard';

function TodayScreen({ coupleId, currentUserId, leftUserId, rightUserId, isMeLeft }) {
  const startDate = new Date(2024, 8, 17);
  const yourName = "Максим";
  const partnerName = "Дарья";

  const formatDate = (date) => {
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="card counter-card">
        <div className="heart">❤️</div>
        <h2 className="names">{yourName} и {partnerName}</h2>
        <div className="counter">{days}</div>
        <p className="subtitle">дней вместе</p>
        <p className="start-date">с {formatDate(startDate)}</p>
      </div>

      <MoodCard
        coupleId={coupleId}
        currentUserId={currentUserId}
        leftUserId={leftUserId}
        rightUserId={rightUserId}
        isMeLeft={isMeLeft}
        leftName={yourName}
        rightName={partnerName}
      />
    </>
  );
}

export default TodayScreen;
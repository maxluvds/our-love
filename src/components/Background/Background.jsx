import './Background.css';

function Background() {
  return (
    <div className="bg-container">
      <div className="bg-blob-wrapper bg-blob-1">
        <div className="bg-blob-inner"></div>
      </div>
      <div className="bg-blob-wrapper bg-blob-2">
        <div className="bg-blob-inner"></div>
      </div>
      <div className="bg-blob-wrapper bg-blob-3">
        <div className="bg-blob-inner"></div>
      </div>
    </div>
  );
}

export default Background;
import { useState } from 'react';
import useWishlist from '../../hooks/useWishlist';
import './WishlistScreen.css';

function WishlistScreen({ coupleId, onBack }) {
  const { items, addItem, removeItem, loading } = useWishlist(coupleId);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) {
      setError('Введите название');
      return;
    }
    setError('');
    await addItem({
      title: title.trim(),
      price: price.trim(),
      link: link.trim(),
    });
    setTitle('');
    setPrice('');
    setLink('');
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setTitle('');
    setPrice('');
    setLink('');
    setError('');
  };

  return (
    <div className="wishlist-screen">
      {/* Шапка раздела */}
      <div className="wishlist-header">
        <button className="wishlist-back" onClick={onBack} aria-label="Назад">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
               stroke="#666" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <h2 className="wishlist-title">Вишлисты</h2>

        <button
          className="wishlist-add-btn"
          onClick={() => setShowForm((s) => !s)}
          aria-label="Добавить"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
               stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Форма добавления */}
      {showForm && (
        <div className="wishlist-form">
          <input
            className="wl-input"
            type="text"
            placeholder="Что хочется?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div className="wl-row">
            <input
              className="wl-input wl-input-small"
              type="text"
              placeholder="Цена"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="wl-input wl-input-small"
              type="url"
              placeholder="Ссылка"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {error && <div className="wl-error">{error}</div>}

          <div className="wl-actions">
            <button className="wl-btn wl-btn-ghost" onClick={handleCancel}>
              Отмена
            </button>
            <button className="wl-btn wl-btn-primary" onClick={handleAdd}>
              Добавить
            </button>
          </div>
        </div>
      )}

      {/* Список */}
      {loading ? (
        <div className="wishlist-empty">Загрузка…</div>
      ) : items.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">🎁</div>
          <p className="wishlist-empty-title">Пока пусто</p>
          <p className="wishlist-empty-text">
            Добавьте то, что хочется — подарок, мечту, любую мелочь
          </p>
        </div>
      ) : (
        <ul className="wishlist-list">
          {items.map((item) => (
            <li key={item.id} className="wishlist-item">
              <div className="wishlist-item-content">
                <span className="wishlist-item-title">{item.title}</span>

                {(item.price || item.link) && (
                  <div className="wishlist-item-meta">
                    {item.price && (
                      <span className="wishlist-price">{item.price}</span>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="wishlist-link"
                      >
                        Ссылка ↗
                      </a>
                    )}
                  </div>
                )}
              </div>

              <button
                className="wishlist-delete"
                onClick={() => removeItem(item.id)}
                aria-label="Удалить"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WishlistScreen;
import { useRef, useEffect } from 'react';
import './Flower.css';

function Flower() {
  const flowerRef = useRef(null);

  useEffect(() => {
    let tx = 0, ty = 0, tPitch = 0, tYaw = 0;
    let x = 0, y = 0, pitch = 0, yaw = 0;
    let rafId;

    const handleMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;

      tx = nx * 30;         // движение вправо-влево
      ty = ny * 22;         // движение вверх-вниз
      tYaw = nx * 20;       // поворот вокруг вертикальной оси
      tPitch = -ny * 15;    // наклон вперёд-назад
    };

    const handleLeave = () => {
      tx = 0; ty = 0; tYaw = 0; tPitch = 0;
    };

    const animate = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      yaw += (tYaw - yaw) * 0.075;
      pitch += (tPitch - pitch) * 0.075;

      if (flowerRef.current) {
        flowerRef.current.style.transform = `
          translate3d(${x}px, ${y}px, 0)
          perspective(800px)
          rotateX(${pitch}deg)
          rotateY(${yaw}deg)
        `;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerleave', handleLeave);
    animate();

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="flower-container">
      <div className="flower-scene" ref={flowerRef}>
        <img
          src="/flower.png"
          alt="Цветок"
          className="flower-image"
          draggable="false"
        />
      </div>
    </div>
  );
}

export default Flower;
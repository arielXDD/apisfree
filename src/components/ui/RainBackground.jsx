import { useEffect, useMemo, useState } from 'react';

const seeded = (value) => {
  const result = Math.sin(value * 9187.13) * 43758.5453;
  return result - Math.floor(result);
};

export default function RainBackground({ intensity = 220, speed = .72, angle = 10, children }) {
  const drops = useMemo(() => Array.from({ length: intensity }, (_, id) => ({
    id, left: seeded(id + 1) * 112 - 6, duration: (seeded(id + 91) * .75 + .45) / speed,
    opacity: seeded(id + 181) * .45 + .18, width: seeded(id + 271) * 1.2 + .6,
    height: seeded(id + 361) * 45 + 35, delay: seeded(id + 451) * -3,
  })), [intensity, speed]);
  const [lightning, setLightning] = useState(null);

  useEffect(() => {
    let timeout;
    const schedule = () => {
      timeout = setTimeout(() => {
        setLightning({ id: Date.now(), bolt: Math.random() > .62, x: 25 + Math.random() * 50 });
        setTimeout(() => setLightning(null), 520);
        schedule();
      }, 6500 + Math.random() * 7500);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return <div className="rain-background">
    {lightning && <div className={`lightning-effect ${lightning.bolt ? 'with-bolt' : ''}`} key={lightning.id}>{lightning.bolt && <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ left: `${lightning.x}%` }}><path d="M50 0 L43 25 L55 31 L40 55 L49 60 L32 100" /></svg>}</div>}
    <div className="rain-canvas" style={{ transform: `rotate(${angle}deg)`, inset: '-15% -12%' }}>{drops.map(drop => <i key={drop.id} style={{ left: `${drop.left}%`, width: `${drop.width}px`, height: `${drop.height}px`, opacity: drop.opacity, animationDuration: `${drop.duration}s`, animationDelay: `${drop.delay}s` }} />)}</div>
    <div className="rain-content">{children}</div>
  </div>;
}

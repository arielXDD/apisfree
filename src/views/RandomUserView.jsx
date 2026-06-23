import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, MapPin, RefreshCw, Sparkles } from 'lucide-react';

function UserCard({ user, position, onShuffle }) {
  const startX = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const isFront = position === 0;

  const finishDrag = (event) => {
    if (!isFront || !dragging) return;
    const distance = event.clientX - startX.current;
    setDragging(false);
    setDragX(0);
    if (Math.abs(distance) > 90) onShuffle();
  };

  return (
    <article
      className={`user-deck-card ${isFront ? 'is-front' : ''} ${dragging ? 'is-dragging' : ''}`}
      style={{
        '--position': position,
        '--rest-x': `${Math.min(position, 3) * 31}px`,
        '--rest-rotate': `${Math.min(position, 3) * 4 - 6}deg`,
        transform: `translateX(calc(var(--rest-x) + ${dragX}px)) rotate(calc(var(--rest-rotate) + ${dragX * 0.025}deg))`,
        zIndex: 10 - position,
      }}
      onPointerDown={(event) => {
        if (!isFront) return;
        startX.current = event.clientX;
        setDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (dragging) setDragX(event.clientX - startX.current);
      }}
      onPointerUp={finishDrag}
      onPointerCancel={() => { setDragging(false); setDragX(0); }}
    >
      <div className="user-card-number">{String(position + 1).padStart(2, '0')}</div>
      <div className="user-portrait-wrap">
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} draggable="false" />
        <span>{user.nat}</span>
      </div>
      <div className="user-card-copy">
        <small>IDENTIDAD GENERADA</small>
        <h2>{user.name.first}<br /><em>{user.name.last}</em></h2>
        <div className="user-data-row"><Mail size={14} /><span>{user.email}</span></div>
        <div className="user-data-row"><MapPin size={14} /><span>{user.location.city}, {user.location.country}</span></div>
      </div>
      {isFront && <div className="drag-hint"><span>Arrastra para cambiar</span><ArrowRight size={15} /></div>}
    </article>
  );
}

export default function RandomUserView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://randomuser.me/api/?results=8');
      if (!response.ok) throw new Error('No se pudo conectar con el servicio');
      const data = await response.json();
      setUsers(data.results);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=8')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo conectar con el servicio');
        return response.json();
      })
      .then((data) => setUsers(data.results))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const shuffle = () => setUsers((current) => [...current.slice(1), current[0]]);

  return (
    <main className="random-user-page">
      <div className="random-user-grid" aria-hidden="true" />
      <nav className="random-user-nav">
        <Link to="/" className="random-back"><ArrowLeft size={17} /> Volver al atlas</Link>
        <span><i /> API conectada</span>
      </nav>

      <section className="random-user-layout">
        <header className="random-user-intro">
          <div className="random-eyebrow"><Sparkles size={14} /> RANDOM USER / 01</div>
          <h1>Personas<br />que aún no <em>existen.</em></h1>
          <p>Genera identidades completas para tus prototipos. Cada tarjeta contiene datos reales en estructura, pero totalmente ficticios.</p>
          <div className="random-actions">
            <button onClick={fetchUsers} disabled={loading}><RefreshCw size={17} className={loading ? 'is-spinning' : ''} /> Generar nuevo grupo</button>
            <span>{users.length || 8} perfiles disponibles</span>
          </div>
        </header>

        <div className="user-deck-area">
          {loading && !users.length ? <div className="deck-loader"><div className="spinner" /><span>Creando identidades...</span></div> : null}
          {error && !users.length ? <div className="deck-error"><p>{error}</p><button onClick={fetchUsers}>Reintentar</button></div> : null}
          <div className="user-deck">
            {users.slice(0, 4).map((user, position) => <UserCard key={user.login.uuid} user={user} position={position} onShuffle={shuffle} />)}
          </div>
          {!!users.length && <div className="deck-progress"><span>Perfil actual</span><div><i /></div><b>01 / {String(users.length).padStart(2, '0')}</b></div>}
        </div>
      </section>
    </main>
  );
}

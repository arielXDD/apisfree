import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, CircleDot, CloudRain, Database, Globe2, Search,
  Smile, Swords, Tv, UserSquare2, Zap, Rocket, X, Activity,
} from 'lucide-react';

const APIS = [
  { title: 'Chuck Norris', short: 'CN', description: 'Chistes aleatorios y categorías para experimentar con respuestas simples.', to: '/chuck', icon: Smile, color: '#ffb454', category: 'Entretenimiento', endpoint: 'api.chucknorris.io', status: 'online' },
  { title: 'Rick & Morty', short: 'RM', description: 'Explora personajes, episodios y ubicaciones de todo el multiverso.', to: '/rick-morty', icon: Tv, color: '#79e7a5', category: 'Entretenimiento', endpoint: 'rickandmortyapi.com', status: 'online' },
  { title: 'PokeAPI', short: 'PK', description: 'Datos, estadísticas y especies del universo Pokémon.', to: '/pokemon', icon: CircleDot, color: '#ff6b6b', category: 'Datos', endpoint: 'pokeapi.co', status: 'online' },
  { title: 'Marvel', short: 'MV', description: 'Una puerta de entrada a personajes y cómics de Marvel.', to: '/marvel', icon: Zap, color: '#ffd05a', category: 'Entretenimiento', endpoint: 'gateway.marvel.com', status: 'setup' },
  { title: 'NASA', short: 'NS', description: 'La imagen astronómica del día con contexto científico.', to: '/nasa', icon: Rocket, color: '#86a8ff', category: 'Ciencia', endpoint: 'api.nasa.gov', status: 'online' },
  { title: 'Open Weather', short: 'OW', description: 'Clima actual por ciudad, temperatura y condiciones.', to: '/weather', icon: CloudRain, color: '#67d7ff', category: 'Utilidad', endpoint: 'api.openweathermap.org', status: 'setup' },
  { title: 'JSONPlaceholder', short: 'JP', description: 'Posts simulados para probar interfaces y operaciones REST.', to: '/jsonplaceholder', icon: Database, color: '#a99cff', category: 'Desarrollo', endpoint: 'jsonplaceholder.typicode.com', status: 'online' },
  { title: 'Random User', short: 'RU', description: 'Perfiles aleatorios listos para prototipos y pruebas.', to: '/random-user', icon: UserSquare2, color: '#ff8fc7', category: 'Desarrollo', endpoint: 'randomuser.me', status: 'online' },
  { title: 'REST Countries', short: 'RC', description: 'Banderas, regiones, población y datos geográficos.', to: '/countries', icon: Globe2, color: '#63e6c1', category: 'Datos', endpoint: 'restcountries.com', status: 'online' },
  { title: 'Star Wars', short: 'SW', description: 'Personajes y metadatos de una galaxia muy, muy lejana.', to: '/swapi', icon: Swords, color: '#e8edf5', category: 'Entretenimiento', endpoint: 'swapi.tech', status: 'online' },
];

const CATEGORIES = ['Todas', 'Entretenimiento', 'Datos', 'Ciencia', 'Utilidad', 'Desarrollo'];

export default function Dashboard() {
  const [active, setActive] = useState(APIS[4]);
  const [category, setCategory] = useState('Todas');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => APIS.filter((api) => {
    const matchesCategory = category === 'Todas' || api.category === category;
    const haystack = `${api.title} ${api.description} ${api.category}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [category, query]);

  return (
    <div className="api-atlas">
      <div className="atlas-grid" aria-hidden="true" />
      <nav className="atlas-nav">
        <Link to="/" className="brand" aria-label="API Atlas, inicio">
          <span className="brand-mark"><span /></span>
          <span>API<span>ATLAS</span></span>
        </Link>
        <div className="nav-meta"><Activity size={14} /><span>8 servicios activos</span></div>
      </nav>

      <main className="atlas-main">
        <header className="atlas-hero">
          <div className="hero-kicker"><span>Directorio interactivo</span><i /></div>
          <h1>Diez APIs.<br /><em>Infinitas ideas.</em></h1>
          <p>Un espacio para descubrir, probar y entender servicios públicos desde una interfaz hecha para explorar.</p>
        </header>

        <section className="atlas-toolbar" aria-label="Buscar y filtrar APIs">
          <label className="atlas-search">
            <Search size={17} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar una API..." />
            {query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={15} /></button>}
          </label>
          <div className="category-list">
            {CATEGORIES.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
        </section>

        <section className="atlas-explorer">
          <div className="orbit-stage">
            <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" />
            <div className="orbit-core">
              <span className="core-pulse" />
              <small>API HUB</small><strong>{filtered.length.toString().padStart(2, '0')}</strong><span>servicios</span>
            </div>
            {filtered.map((api, index) => {
              const angle = (360 / Math.max(filtered.length, 1)) * index - 90;
              const Icon = api.icon;
              return <button key={api.title} className={`orbit-node ${active.title === api.title ? 'active' : ''}`} style={{ '--angle': `${angle}deg`, '--accent': api.color }} onClick={() => setActive(api)} aria-label={`Ver ${api.title}`}>
                <span className="node-icon"><Icon size={18} /></span><b>{api.short}</b>
              </button>;
            })}
            {!filtered.length && <div className="empty-orbit">Sin resultados<br /><button onClick={() => { setQuery(''); setCategory('Todas'); }}>Limpiar filtros</button></div>}
          </div>

          <aside className="api-detail" style={{ '--accent': active.color }}>
            <div className="detail-topline"><span>{active.category}</span><span className={`status ${active.status}`}><i />{active.status === 'online' ? 'Operativa' : 'Requiere clave'}</span></div>
            <div className="detail-icon"><active.icon size={24} /></div>
            <span className="detail-index">{String(APIS.indexOf(active) + 1).padStart(2, '0')} / {APIS.length}</span>
            <h2>{active.title}</h2>
            <p>{active.description}</p>
            <div className="endpoint"><span>ENDPOINT</span><code>{active.endpoint}</code></div>
            <Link className="launch-api" to={active.to}><span>Explorar API</span><ArrowUpRight size={19} /></Link>
          </aside>
        </section>
      </main>

      <footer className="atlas-footer"><span>React · REST · Datos abiertos</span><span>API Atlas — 2026</span></footer>
    </div>
  );
}

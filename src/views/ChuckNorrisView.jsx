import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, RefreshCw, Repeat2, Share, VerifiedIcon } from 'lucide-react';

export default function ChuckNorrisView() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const loadJoke = async () => {
    setLoading(true); setError('');
    try { const response = await fetch('https://api.chucknorris.io/jokes/random'); if (!response.ok) throw new Error('El chiste no pudo cargar'); setJoke(await response.json()); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetch('https://api.chucknorris.io/jokes/random').then(r => r.json()).then(setJoke).catch(() => setError('El chiste no pudo cargar')).finally(() => setLoading(false)); }, []);
  return <main className="social-api-page">
    <nav className="api-subnav"><Link to="/"><ArrowLeft size={16}/> Volver al atlas</Link><span>CHUCK NORRIS / FEED</span></nav>
    <section className="social-stage">
      <header><small>PUBLICACIÓN ALEATORIA</small><h1>Una leyenda.<br/><em>Un nuevo hecho.</em></h1><p>Cada actualización consulta en tiempo real la API pública de Chuck Norris.</p></header>
      <div className="x-card-shell">
        <article className="x-card">
          <div className="x-author"><img src={joke?.icon_url || 'https://api.chucknorris.io/img/avatar/chuck-norris.png'} alt="Chuck Norris"/><div><strong>Chuck Norris <VerifiedIcon size={16}/></strong><span>@chucknorris · ahora</span></div><b>𝕏</b></div>
          <div className={`x-content ${loading ? 'is-loading' : ''}`}>{error || joke?.value || 'Cargando una verdad incuestionable...'}</div>
          <time>{new Date().toLocaleTimeString('es-MX', {hour:'2-digit',minute:'2-digit'})} · API Atlas</time>
          <div className="x-metrics"><span><MessageCircle size={17}/> 42</span><span><Repeat2 size={17}/> 1.2K</span><span><Heart size={17}/> 8.4K</span><span><Share size={17}/></span></div>
          <div className="x-reply"><img src="https://api.chucknorris.io/img/avatar/chuck-norris.png" alt="API Atlas"/><div><strong>API Atlas <VerifiedIcon size={13}/></strong><span>@apiatlas · ahora</span><p>Confirmado por la API. No recomendamos intentar verificarlo.</p></div></div>
        </article>
      </div>
      <button className="refresh-post" onClick={loadJoke} disabled={loading}><RefreshCw size={17} className={loading?'is-spinning':''}/> Publicar otro hecho</button>
    </section>
  </main>;
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Dna } from 'lucide-react';

export default function RickAndMortyView(){
 const [characters,setCharacters]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 useEffect(()=>{fetch('https://rickandmortyapi.com/api/character').then(r=>r.json()).then(d=>setCharacters(d.results.slice(0,12))).catch(()=>setError('El portal interdimensional no responde')).finally(()=>setLoading(false))},[]);
 const next=()=>setCharacters(current=>[...current.slice(1),current[0]]);
 return <main className="rm-page"><nav className="api-subnav"><Link to="/"><ArrowLeft size={16}/> Volver al atlas</Link><span>DIMENSIÓN C-137</span></nav><section className="rm-layout"><header><small><Dna size={13}/> REGISTRO INTERDIMENSIONAL</small><h1>Sujetos del<br/><em>multiverso.</em></h1><p>Arrastra la tarjeta visualmente o usa el control para recorrer los perfiles recuperados de la API.</p><button onClick={next} disabled={!characters.length}>Siguiente sujeto <ArrowRight size={16}/></button></header>
 <div className="rm-deck-area">{loading&&<div className="api-state"><div className="spinner"/>Abriendo portal...</div>}{error&&<div className="api-state error">{error}</div>}<div className="rm-deck">{characters.slice(0,4).map((c,i)=><article className="rm-card" key={c.id} style={{'--i':i,zIndex:5-i}}><img src={c.image} alt={c.name}/><div className="rm-card-content"><span className={`life ${c.status.toLowerCase()}`}><i/>{c.status}</span><small>SUJETO #{String(c.id).padStart(3,'0')}</small><h2>{c.name}</h2><p>{c.species} · {c.gender}</p><dl><dt>ÚLTIMA UBICACIÓN</dt><dd>{c.location.name}</dd><dt>ORIGEN</dt><dd>{c.origin.name}</dd></dl></div></article>)}</div></div>
 </section></main>;
}

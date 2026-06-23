import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CircleDot } from 'lucide-react';

function PokemonCard({pokemon}){return <article className="poke-marquee-card"><div className="poke-number">#{String(pokemon.id).padStart(3,'0')}</div><img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name}/><h2>{pokemon.name}</h2><div>{pokemon.types.map(t=><span key={t.type.name}>{t.type.name}</span>)}</div><dl><span><dt>HP</dt><dd>{pokemon.stats[0].base_stat}</dd></span><span><dt>ATK</dt><dd>{pokemon.stats[1].base_stat}</dd></span></dl></article>}
export default function PokeApiView(){
 const [pokemon,setPokemon]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 useEffect(()=>{fetch('https://pokeapi.co/api/v2/pokemon?limit=12').then(r=>r.json()).then(d=>Promise.all(d.results.map(p=>fetch(p.url).then(r=>r.json())))).then(setPokemon).catch(()=>setError('La Pokédex no responde')).finally(()=>setLoading(false))},[]);
 const half=Math.ceil(pokemon.length/2);const rows=[pokemon.slice(0,half),pokemon.slice(half)];
 return <main className="poke-page"><nav className="api-subnav"><Link to="/"><ArrowLeft size={16}/> Volver al atlas</Link><span>POKÉDEX / GEN 01</span></nav><section className="poke-wrap"><header><small><CircleDot size={13}/> ARCHIVO DE ESPECIES</small><h1>Pokémon en<br/><em>movimiento.</em></h1><p>Una Pokédex tridimensional alimentada directamente por PokeAPI.</p></header>{loading&&<div className="api-state"><div className="spinner"/>Cargando especies...</div>}{error&&<div className="api-state error">{error}</div>}
 {!!pokemon.length&&<div className="poke-viewport"><div className="poke-tilt">{rows.map((row,i)=><div className={`poke-marquee ${i?'reverse':''}`} key={i}>{[...row,...row,...row].map((p,j)=><PokemonCard pokemon={p} key={`${p.id}-${j}`}/>)}</div>)}</div><i className="fade top"/><i className="fade bottom"/></div>}
 </section></main>;
}

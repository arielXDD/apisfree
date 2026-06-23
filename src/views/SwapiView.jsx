import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Orbit } from 'lucide-react';

export default function SwapiView(){
 const [people,setPeople]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const [active,setActive]=useState(0);
 useEffect(()=>{fetch('https://www.swapi.tech/api/people?page=1&limit=10').then(r=>{if(!r.ok)throw new Error('No se pudo conectar con SWAPI');return r.json()}).then(async d=>Promise.all((d.results||[]).map(p=>fetch(p.url).then(r=>r.json())))).then(d=>setPeople(d.map(p=>p.result.properties))).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[]);
 const move=(step)=>setActive(current=>(current+step+people.length)%people.length);
 return <main className="sw-page"><div className="stars"/><nav className="api-subnav"><Link to="/"><ArrowLeft size={16}/> Volver al atlas</Link><span>SWAPI / ARCHIVO IMPERIAL</span></nav><section className="sw-wrap"><header><small><Orbit size={13}/> BASE DE DATOS GALÁCTICA</small><h1>Personajes de<br/>otra <em>galaxia.</em></h1></header>
 {loading&&<div className="api-state"><div className="spinner"/>Interceptando transmisión...</div>}{error&&<div className="api-state error">{error}</div>}
 {!!people.length&&<><div className="sw-carousel">{people.map((person,index)=>{let pos=index-active;if(pos>people.length/2)pos-=people.length;if(pos<-(people.length/2))pos+=people.length;return <button key={person.name} className={`sw-card ${pos===0?'active':''}`} onClick={()=>setActive(index)} style={{'--pos':pos,opacity:Math.abs(pos)>2?0:1,pointerEvents:Math.abs(pos)>2?'none':'auto'}}><span className="cut-line"/><small>ARCHIVO {String(index+1).padStart(2,'0')}</small><div className="sw-avatar">{person.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><h2>{person.name}</h2><p>{person.birth_year} · {person.gender}</p><dl><div><dt>ALTURA</dt><dd>{person.height} cm</dd></div><div><dt>MASA</dt><dd>{person.mass} kg</dd></div><div><dt>CABELLO</dt><dd>{person.hair_color}</dd></div></dl></button>})}</div><div className="carousel-controls"><button onClick={()=>move(-1)} aria-label="Anterior"><ChevronLeft/></button><span>{String(active+1).padStart(2,'0')} / {String(people.length).padStart(2,'0')}</span><button onClick={()=>move(1)} aria-label="Siguiente"><ChevronRight/></button></div></>}
 </section></main>;
}

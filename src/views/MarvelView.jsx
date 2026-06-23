import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound, Search, Sparkles } from 'lucide-react';
import md5 from 'md5';
import { ImageAutoSlider } from '../components/ui/image-auto-slider';

const DEMO_CHARACTERS = [
  { id: 1009610, name: 'Spider-Man', description: 'Peter Parker protege Nueva York con agilidad arácnida, ingenio y un fuerte sentido de responsabilidad.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b', extension: 'jpg' } },
  { id: 1009368, name: 'Iron Man', description: 'Tony Stark combina ingeniería avanzada, estrategia y una armadura capaz de enfrentarse a amenazas globales.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55', extension: 'jpg' } },
  { id: 1009220, name: 'Captain America', description: 'Steve Rogers representa valor, liderazgo y determinación como el primer Vengador.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087', extension: 'jpg' } },
  { id: 1009664, name: 'Thor', description: 'El dios del trueno empuña Mjolnir para defender Asgard, Midgard y los Nueve Reinos.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350', extension: 'jpg' } },
  { id: 1009351, name: 'Hulk', description: 'La brillante mente de Bruce Banner comparte espacio con una fuerza imparable alimentada por la furia.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0', extension: 'jpg' } },
  { id: 1009268, name: 'Deadpool', description: 'Wade Wilson es un mercenario impredecible con factor curativo, gran habilidad en combate y un humor imposible de contener.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/0/02/5261a86c2d2ee', extension: 'jpg' } },
  { id: 1009262, name: 'Daredevil', description: 'Matt Murdock protege Hell’s Kitchen usando sentidos extraordinarios, disciplina y una voluntad inquebrantable.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d494bd4', extension: 'jpg' } },
  { id: 1009718, name: 'Wolverine', description: 'Logan posee sentidos aumentados, factor curativo y un esqueleto reforzado con adamantium.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/60/537bca3c2e9c7', extension: 'jpg' } },
  { id: 1009629, name: 'Storm', description: 'Ororo Munroe controla los elementos y lidera a los X-Men con serenidad, poder y experiencia.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/40/526963dad214d', extension: 'jpg' } },
  { id: 1009417, name: 'Magneto', description: 'Erik Lehnsherr domina el magnetismo y lucha por el futuro de los mutantes según sus propias convicciones.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/4/60/5261a7e53f827', extension: 'jpg' } },
  { id: 1009282, name: 'Doctor Strange', description: 'Stephen Strange domina las artes místicas como protector de la realidad y Hechicero Supremo.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/5/f0/5261a85ca4e7e', extension: 'jpg' } },
  { id: 1009189, name: 'Black Widow', description: 'Natasha Romanoff es una espía de élite, experta en combate e inteligencia táctica.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/03/5239c80f2a6be', extension: 'jpg' } },
  { id: 1009407, name: 'Loki', description: 'El dios del engaño altera destinos con magia, astucia y ambición.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/d/90/526547f509313', extension: 'jpg' } },
  { id: 1009504, name: 'Punisher', description: 'Frank Castle libra una guerra personal contra el crimen con métodos implacables.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/90/526547f509313', extension: 'jpg' } },
  { id: 1009281, name: 'Doctor Doom', description: 'Victor Von Doom combina ciencia, magia y poder político como uno de los villanos más formidables de Marvel.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/8/40/52602f8c154f4', extension: 'jpg' } },
  { id: 1009338, name: 'Hawkeye', description: 'Clint Barton convierte precisión, táctica y temple en armas definitivas.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/7/03/526547c8d4f90', extension: 'jpg' } },
  { id: 1009187, name: 'Black Panther', description: 'T’Challa protege Wakanda con inteligencia, tecnología avanzada y legado real.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/03/537ba26276348', extension: 'jpg' } },
  { id: 1009267, name: 'Captain Marvel', description: 'Carol Danvers canaliza energía cósmica y liderazgo en escala intergaláctica.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/03/5261a8b704a33', extension: 'jpg' } },
  { id: 1009562, name: 'Scarlet Witch', description: 'Wanda Maximoff altera probabilidades y realidades con una fuerza mística devastadora.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/b0/537bc2375dfb9', extension: 'jpg' } },
  { id: 1009552, name: 'Silver Surfer', description: 'Norrin Radd cruza el cosmos sobre su tabla como heraldo y protector errante.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/60/526963d0c424a', extension: 'jpg' } },
  { id: 1009662, name: 'Thing', description: 'Ben Grimm aporta fuerza, corazón y resistencia como miembro esencial de los Cuatro Fantásticos.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/8/03/5260323c350bc', extension: 'jpg' } },
  { id: 1009367, name: 'Human Torch', description: 'Johnny Storm transforma audacia y fuego vivo en velocidad aérea y espectáculo.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/70/526959a4c3c0b', extension: 'jpg' } },
  { id: 1009499, name: 'Mister Fantastic', description: 'Reed Richards lidera con ciencia, elasticidad corporal y pensamiento imposible.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/d/c0/51127e9337538', extension: 'jpg' } },
  { id: 1009366, name: 'Invisible Woman', description: 'Sue Storm domina la invisibilidad y campos de fuerza con precisión estratégica.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/30/537bc39690c43', extension: 'jpg' } },
  { id: 1009471, name: 'Nick Fury', description: 'Nick Fury coordina operaciones imposibles desde las sombras de S.H.I.E.L.D.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/70/526547f3be11a', extension: 'jpg' } },
  { id: 1009297, name: 'Falcon', description: 'Sam Wilson combina vuelo táctico, visión aérea y compromiso heroico.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/f/b0/5111505fb7009', extension: 'jpg' } },
  { id: 1010743, name: 'Groot', description: 'Groot protege a los Guardianes con fuerza orgánica, nobleza y una presencia inconfundible.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/10/538769EF93738', extension: 'jpg' } },
  { id: 1010733, name: 'Star-Lord', description: 'Peter Quill mezcla aventura espacial, improvisación y espíritu de equipo.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/d0/5387692c2fd55', extension: 'jpg' } },
  { id: 1010763, name: 'Gamora', description: 'Gamora es una combatiente letal que busca redención entre los Guardianes de la Galaxia.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/70/537ba56d31087', extension: 'jpg' } },
  { id: 1010744, name: 'Rocket Raccoon', description: 'Rocket aporta ingeniería, armas pesadas y sarcasmo en misiones galácticas.', thumbnail: { path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/b0/50fec1e49298a', extension: 'jpg' } },
];

export default function MarvelView() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [characters, setCharacters] = useState(DEMO_CHARACTERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMarvelData = async (event) => {
    event.preventDefault();
    if (!publicKey || !privateKey) return setError('Ingresa las claves pública y privada.');
    setLoading(true); setError('');
    const ts = Date.now().toString();
    try {
      const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5(ts + privateKey + publicKey)}&limit=20`);
      if (!response.ok) throw new Error('No fue posible autenticar la solicitud. Revisa tus claves.');
      const data = await response.json();
      setCharacters(data.data.results);
    } catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  };

  return (
    <main className="marvel-page">
      <nav className="api-subnav">
        <Link to="/"><ArrowLeft size={15} /> Volver al atlas</Link>
        <span><i /> MARVEL ARCHIVE / EN LÍNEA</span>
      </nav>
      <header className="marvel-hero">
        <div>
          <small><Sparkles size={13} /> BASE DE DATOS / PERSONAJES</small>
          <h1>EL UNIVERSO,<br/><em>EN MOVIMIENTO.</em></h1>
          <p>Explora expedientes visuales de héroes, villanos y leyendas. El archivo de demostración prueba un banco amplio de personajes Marvel y solo muestra las imágenes que cargan correctamente.</p>
        </div>
        <form onSubmit={fetchMarvelData} className="marvel-auth">
          <span><KeyRound size={15}/> CONECTAR MARVEL API</span>
          <label>Clave pública<input value={publicKey} onChange={(e) => setPublicKey(e.target.value)} autoComplete="off" /></label>
          <label>Clave privada<input type="password" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} autoComplete="off" /></label>
          {error && <p>{error}</p>}
          <div><button type="button" onClick={() => { setCharacters(DEMO_CHARACTERS); setError(''); }}>Ver datos de prueba</button><button type="submit" disabled={loading}>{loading ? 'Cargando…' : <><Search size={14}/> Consultar</>}</button></div>
        </form>
      </header>
      {characters.length > 0 && <ImageAutoSlider characters={characters} />}
      <footer className="marvel-footer"><span>{characters.length} CANDIDATOS MARVEL VERIFICADOS EN NAVEGADOR</span><span>DATOS VISUALES · MARVEL API</span></footer>
    </main>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileJson, MessageSquare, Radio, UserRound } from 'lucide-react';

const SPANISH_POSTS = [
 ['Cómo construir una interfaz que se sienta rápida','La percepción de velocidad también depende de una jerarquía clara, respuestas inmediatas y estados de carga bien diseñados.'],
 ['El valor de empezar con datos simulados','Los datos ficticios permiten validar componentes y flujos completos antes de conectar servicios reales o bases de datos.'],
 ['Diseñar primero para los casos difíciles','Los textos largos, estados vacíos y errores de red deben formar parte del diseño desde el primer prototipo.'],
 ['Una arquitectura sencilla escala mejor','Separar datos, presentación e interacción mantiene el código comprensible y reduce errores durante el crecimiento del producto.'],
 ['Detalles pequeños que mejoran la experiencia','Un buen contraste, espacios consistentes y mensajes claros pueden transformar completamente una interfaz cotidiana.'],
 ['Probar ideas sin comprometer producción','Un entorno de pruebas permite experimentar con libertad, medir resultados y descartar soluciones con muy poco riesgo.'],
 ['La accesibilidad también es diseño','Teclado, lectores de pantalla y movimiento reducido deben considerarse como partes esenciales de cualquier experiencia digital.'],
 ['Componentes que cuentan una historia','Cada tarjeta debe comunicar qué contiene, por qué importa y cuál es la siguiente acción disponible para el usuario.'],
 ['Datos claros para decisiones mejores','Presentar información con contexto y jerarquía ayuda a detectar patrones sin obligar al usuario a interpretar ruido.'],
 ['Del prototipo al producto terminado','Una base visual coherente hace que nuevas funciones puedan integrarse sin perder claridad ni personalidad.'],
 ];

export default function JsonPlaceholderView(){
 const [posts,setPosts]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 useEffect(()=>{fetch('https://jsonplaceholder.typicode.com/posts?_limit=10').then(r=>{if(!r.ok)throw new Error('No se pudieron cargar las publicaciones');return r.json()}).then(data=>setPosts(data.map((post,index)=>({...post,title:SPANISH_POSTS[index][0],body:SPANISH_POSTS[index][1]})))).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[]);
 return <main className="json-page"><nav className="api-subnav"><Link to="/"><ArrowLeft size={16}/> Volver al atlas</Link><span>JSONPLACEHOLDER / POSTS</span></nav><section className="json-wrap"><header><small><FileJson size={13}/> SANDBOX REST</small><h1>Datos ficticios.<br/><em>Interfaces reales.</em></h1><p>Una colección de respuestas listas para prototipar, probar estados y construir experiencias.</p></header>
 {loading&&<div className="api-state"><div className="spinner"/>Consultando endpoint...</div>}{error&&<div className="api-state error">{error}</div>}
 <div className="json-bento">{posts.map((post,index)=><article key={post.id} className={`bento-post ${index===0||index===5?'wide':''} ${index===0?'featured':''}`}><div className="bento-icon">{index%3===0?<Radio/>:index%3===1?<MessageSquare/>:<UserRound/>}</div><span className="bento-status"><i/> RESPUESTA 200</span><div><small>PUBLICACIÓN #{String(post.id).padStart(2,'0')} · USUARIO {post.userId}</small><h2>{post.title}</h2><p>{post.body}</p></div><footer><span>#DATOS</span><span>#PRUEBAS</span><b>Explorar →</b></footer></article>)}</div>
 </section></main>;
}

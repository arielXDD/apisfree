# Sitio de APIs Gratuitas

Este proyecto es una aplicación web moderna construida con React y Vite. Actúa como un panel de control interactivo para explorar diez de las mejores APIs públicas gratuitas disponibles.

La interfaz de usuario ha sido diseñada utilizando CSS puro (Vanilla CSS) con un enfoque en estética avanzada, incorporando técnicas como Glassmorphism, gradientes, animaciones fluidas y un modo oscuro nativo. Esto garantiza un alto rendimiento y una experiencia de usuario óptima.

---

## Lista de APIs Integradas y Funcionalidades

A continuación se detalla cada una de las APIs integradas en este proyecto y la información que extraen:

1. **Chuck Norris Jokes API**
   - **Propósito:** Proporciona contenido humorístico relacionado con Chuck Norris.
   - **Implementación:** Permite cargar datos aleatorios a través de una interfaz interactiva.

2. **Rick and Morty API**
   - **Propósito:** Proporciona información sobre los personajes, lugares y episodios de la serie "Rick and Morty".
   - **Implementación:** Extrae y presenta un listado visual de los personajes mostrando sus imágenes, estados vitales y especies.

3. **PokeAPI**
   - **Propósito:** Base de datos integral sobre la franquicia Pokémon.
   - **Implementación:** Despliega una lista de Pokémon mostrando su número de identificación en la Pokédex, tipos elementales y recursos gráficos.

4. **Marvel API**
   - **Propósito:** Brinda acceso al catálogo de cómics y personajes de Marvel.
   - **Implementación:** Muestra un formulario para ingresar credenciales de autenticación (Public y Private Key). Cuenta con un modo de prueba ("Mock") para garantizar la visualización del diseño independientemente de la disponibilidad de la plataforma de desarrolladores de Marvel.

5. **NASA API (APOD)**
   - **Propósito:** Obtiene la "Imagen Astronómica del Día" y su explicación científica oficial.
   - **Implementación:** Muestra el contenido multimedia diario (imágenes o reproductor de video integrado). El entorno visual está apoyado por un fondo tridimensional generado mediante WebGL y Three.js.

6. **Open Weather API**
   - **Propósito:** Provee datos meteorológicos actuales para cualquier ubicación geográfica.
   - **Implementación:** Funciona como un buscador de clima por ciudad, incluyendo soporte para datos de demostración si los límites de la API se han excedido.

7. **JSONPlaceholder API**
   - **Propósito:** API REST de prueba orientada al prototipado rápido de aplicaciones.
   - **Implementación:** Simula un muro de publicaciones ("posts") con títulos y contenido de texto generado aleatoriamente.

8. **Random User Generator API**
   - **Propósito:** Genera perfiles de usuarios ficticios.
   - **Implementación:** Muestra tarjetas de identidad aleatorias con fotografía, ubicación, datos de contacto y nombre.

9. **REST Countries API**
   - **Propósito:** Proporciona información demográfica y geográfica sobre países.
   - **Implementación:** Incluye un buscador en tiempo real para localizar países por nombre y visualizar instantáneamente su bandera y datos principales.

10. **Star Wars API (SWAPI)**
    - **Propósito:** Ofrece datos relacionados con el universo de Star Wars.
    - **Implementación:** Recupera y presenta una lista de personajes estructurada en un formato visual navegable.

---

## Requisitos del Sistema

Para la correcta ejecución de este proyecto en un entorno local, es necesario contar con:

- Node.js (Versión 16.x o superior).
- Un navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.).

---

## Instrucciones de Instalación y Ejecución

Siga los siguientes pasos para desplegar el proyecto localmente:

1. **Preparación del entorno**
   Abra una terminal en el directorio principal del proyecto (donde se ubica el archivo package.json).

2. **Instalación de dependencias**
   Ejecute el siguiente comando para descargar los paquetes requeridos (react, react-router-dom, lucide-react, three, entre otros):
   
   pnpm install

3. **Ejecución del servidor de desarrollo**
   Inicie el entorno de desarrollo de Vite con el comando:
   
   pnpm run dev

4. **Visualización de la aplicación**
   El servidor proveerá una dirección local (por defecto, http://localhost:5173). Acceda a esta dirección a través de su navegador.

---

## Estructura del Proyecto

- src/main.jsx: Archivo de entrada de la aplicación y configuración de enrutamiento.
- src/App.jsx: Componente principal de la estructura de la aplicación.
- src/index.css: Definición de estilos globales y arquitectura CSS.
- src/components/: Directorio de componentes reutilizables (ej. Dashboard.jsx, ApiCard.jsx, ui/animated-shader-background.jsx).
- src/views/: Directorio que contiene el código fuente y la lógica individual correspondiente a cada una de las APIs integradas.

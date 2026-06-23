import React, { useEffect, useState } from 'react';

const imageUrl = (character) =>
  character.image || `${character.thumbnail.path.replace('http://', 'https://')}.${character.thumbnail.extension}`;

export function ImageAutoSlider({ characters }) {
  const [visibleCharacters, setVisibleCharacters] = useState([]);
  const [checkingImages, setCheckingImages] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setCheckingImages(true);

    Promise.all(characters.map((character) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(character);
      image.onerror = () => resolve(null);
      image.src = imageUrl(character);
    }))).then((results) => {
      if (cancelled) return;
      setVisibleCharacters(results.filter(Boolean));
      setCheckingImages(false);
    });

    return () => { cancelled = true; };
  }, [characters]);

  if (checkingImages) {
    return <div className="marvel-image-check"><span /> Verificando archivos visuales…</div>;
  }

  if (!visibleCharacters.length) {
    return <div className="marvel-image-check">No hay imágenes disponibles desde el servidor de Marvel.</div>;
  }

  const repeated = [...visibleCharacters, ...visibleCharacters];

  return (
    <section className="marvel-slider" aria-label="Galería de personajes Marvel">
      <div className="marvel-slider-track">
        {repeated.map((character, index) => (
          <article className="marvel-slide" key={`${character.id}-${index}`} aria-hidden={index >= visibleCharacters.length}>
            <img src={imageUrl(character)} alt={index < visibleCharacters.length ? character.name : ''} />
            <div className="marvel-slide-shade" />
            <span>{String((index % visibleCharacters.length) + 1).padStart(2, '0')}</span>
            <div className="marvel-slide-copy">
              <p>ARCHIVO DE PERSONAJE</p>
              <h2>{character.name}</h2>
              <small>{character.description || 'Sin descripción disponible.'}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

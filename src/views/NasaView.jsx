import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, ExternalLink, ImageOff, RefreshCw, Sparkles } from 'lucide-react';
import AnoAI from '../components/ui/animated-shader-background';

const NASA_SPACE_FALLBACK_IMAGE = '/nasa-space.svg';

const NASA_FALLBACK_APOD = {
  media_type: 'image',
  title: 'Universo en silencio',
  date: 'Hoy',
  copyright: 'NASA / respaldo local',
  url: NASA_SPACE_FALLBACK_IMAGE,
  explanation:
    'La API pública de NASA está limitada por la DEMO_KEY. Esta vista mantiene la experiencia activa con un respaldo visual y un mensaje claro para que no se rompa la pantalla. Si quieres evitar el límite, configura `VITE_NASA_API_KEY` en tu entorno.',
};

const IMAGE_URL_PATTERN = /\.(avif|gif|jpe?g|png|webp)(\?.*)?$/i;

function looksLikeImageUrl(url) {
  if (!url) return false;
  return IMAGE_URL_PATTERN.test(url) || url.includes('/image/');
}

function getApodImageUrl(apod) {
  if (!apod) return '';
  const candidates = [apod.hdurl, apod.url, apod.thumbnail_url].filter(Boolean);

  if (apod.media_type === 'image') {
    return candidates.find(looksLikeImageUrl) || apod.hdurl || apod.url || '';
  }

  return [apod.thumbnail_url, apod.hdurl, apod.url].find(looksLikeImageUrl) || '';
}

function getEmbeddableVideoUrl(url) {
  if (!url) return '';

  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    if (hostname === 'youtube.com' || hostname === 'youtu.be' || hostname === 'player.vimeo.com') {
      return url;
    }
  } catch {
    return '';
  }

  return '';
}

export default function NasaView() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);
  const [mediaFallbackActive, setMediaFallbackActive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
    const cacheKey = 'nasa-apod-cache-v2';
    const cacheDateKey = 'nasa-apod-cache-date-v2';
    const today = new Date().toISOString().slice(0, 10);

    try {
      const cachedDate = window.localStorage.getItem(cacheDateKey);
      const cachedApod = window.localStorage.getItem(cacheKey);

      if (cachedDate === today && cachedApod) {
        setApod(JSON.parse(cachedApod));
        setUsingFallback(false);
        setLoading(false);
        return;
      }
    } catch {
      window.localStorage.removeItem(cacheKey);
      window.localStorage.removeItem(cacheDateKey);
    }

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&thumbs=true`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 429) {
            throw new Error(
              'Se ha excedido el límite de peticiones de la DEMO_KEY pública de la NASA. Usa `VITE_NASA_API_KEY` para evitar este límite.'
            );
          }
          throw new Error('Error al conectar con la API de la NASA.');
        }
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.error) throw new Error(data.error.message);
        setApod(data);
        setUsingFallback(false);
        setMediaFallbackActive(false);
        setLoading(false);
        try {
          window.localStorage.setItem(cacheKey, JSON.stringify(data));
          window.localStorage.setItem(cacheDateKey, today);
        } catch {
          // Ignore cache failures.
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setApod(NASA_FALLBACK_APOD);
        setUsingFallback(true);
        setMediaFallbackActive(false);
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const imageUrl = getApodImageUrl(apod);
  const displayImageUrl = imageUrl || NASA_SPACE_FALLBACK_IMAGE;
  const showImageFallbackNotice = usingFallback || mediaFallbackActive || !imageUrl;
  const videoUrl = apod?.media_type === 'video' ? getEmbeddableVideoUrl(apod.url) : '';

  return (
    <div className="container" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <AnoAI />

      <div className="view-header" style={{ position: 'relative', zIndex: 1 }}>
        <Link to="/" className="btn btn-secondary">
          <ArrowLeft size={20} /> Volver
        </Link>
        <h1 className="view-title" style={{ color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          NASA API - APOD
        </h1>
      </div>

      {loading ? (
        <div className="loader-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="spinner"></div>
        </div>
      ) : apod ? (
        <div
          className="glass-panel"
          style={{
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
          }}
        >
          {usingFallback && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(251, 191, 36, 0.12)',
              }}
            >
              <AlertTriangle size={18} color="#fbbf24" />
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fde68a', fontWeight: 700 }}>NASA limitó la demo pública</div>
                <div style={{ color: '#f8fafc', opacity: 0.8, fontSize: '0.92rem' }}>{error}</div>
              </div>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={16} />
                Reintentar
              </button>
            </div>
          )}

          {displayImageUrl ? (
            <div style={{ position: 'relative' }}>
              <img
                src={displayImageUrl}
                alt={apod.title}
                onError={(event) => {
                  if (event.currentTarget.dataset.fallbackApplied === 'true') return;
                  event.currentTarget.dataset.fallbackApplied = 'true';
                  event.currentTarget.src = NASA_SPACE_FALLBACK_IMAGE;
                  setMediaFallbackActive(true);
                }}
                style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', display: 'block' }}
              />
              {apod.media_type === 'video' && apod.url && (
                <a
                  href={apod.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    bottom: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(3, 7, 18, 0.72)',
                    color: '#fff',
                    textDecoration: 'none',
                    backdropFilter: 'blur(16px)',
                    fontWeight: 700,
                  }}
                >
                  <ExternalLink size={16} />
                  Abrir video
                </a>
              )}
              {showImageFallbackNotice && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 'auto 1rem 1rem 1rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '1rem',
                    background: 'rgba(3, 7, 18, 0.72)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(18px)',
                    color: '#e2e8f0',
                    maxWidth: '52rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.35rem',
                      color: '#fbbf24',
                      fontSize: '0.82rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}
                  >
                    <Sparkles size={14} />
                    Imagen de ejemplo activa
                  </div>
                  <div style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                    La imagen oficial no pudo mostrarse. Se usa una imagen espacial de respaldo para que la vista no quede vacia.
                  </div>
                </div>
              )}
            </div>
          ) : apod.media_type === 'video' && videoUrl ? (
            <iframe
              src={videoUrl}
              title={apod.title}
              style={{ width: '100%', height: '500px', border: 'none' }}
              allowFullScreen
            />
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#e2e8f0' }}>
              <ImageOff size={44} style={{ margin: '0 auto 1rem', opacity: 0.75 }} />
              <p style={{ marginBottom: '1rem' }}>La NASA no entregó una imagen directa para este APOD.</p>
              {apod.url && (
                <a
                  href={apod.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#93c5fd', fontWeight: 700 }}
                >
                  Abrir contenido original
                </a>
              )}
            </div>
          )}

          <div style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>
              {apod.title}
            </h2>
            <p style={{ color: 'var(--accent-color)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {apod.date} &copy; {apod.copyright || 'NASA'}
            </p>
            <p
              style={{
                color: 'var(--text-primary)',
                lineHeight: '1.7',
                fontSize: '1.05rem',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              {apod.explanation}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="glass-panel"
          style={{
            padding: '3rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
          }}
        >
          <AlertTriangle size={48} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>¡Ups! Problema con la API</h2>
          <p style={{ color: '#fca5a5', lineHeight: '1.6' }}>
            No se pudo cargar APOD y tampoco hay respaldo disponible.
          </p>
        </div>
      )}
    </div>
  );
}

// Componente Hero: Seccion de portada a pantalla completa.
// Incluye video inmersivo de fondo, imagen de respaldo y relojes mundiales en vivo.
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import heroPoster from '../assets/images/hero_gallery_poster_1794524582684.jpg';
import { formatCityTimes } from '../utils/catalogue';
import { WordsPullUp } from './shared/WordsPullUp';

const HERO_VIDEO = 'https://cdn.5sdesign.art/projects/Muse/muse-hero.mp4';

interface HeroProps {
  onBookViewing: () => void;
}

export function Hero({ onBookViewing }: HeroProps) {
  // Estado local para los relojes de Londres, Kioto y CDMX, actualizados cada 30 segundos.
  const [clocks, setClocks] = useState(() => formatCityTimes());
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setClocks(formatCityTimes());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] overflow-hidden flex flex-col bg-ink"
    >
      {/* Imagen de respaldo local para carga inmediata y funcionamiento sin conexion */}
      <img
        src={heroPoster}
        alt="Interior arquitectónico de la galería Muse con luz natural de tarde"
        className="absolute inset-0 w-full h-full object-cover sepia-tint"
      />

      {/* Video ambiental de la galeria con manejo de error fallback */}
      {!videoFailed && (
        <video
          src={HERO_VIDEO}
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Capas superpuestas: degradado para contraste y textura de grano editorial */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/65 pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" aria-hidden="true" />

      {/* Barra superior de metadatos con ano de fundacion y horas mundiales */}
      <div className="absolute top-24 left-0 right-0 px-6 md:px-10 flex items-start justify-between text-bone z-10">
        <span className="text-xs tracking-meta uppercase">
          EST. 2014 — LONDRES · KIOTO · CIUDAD DE MÉXICO
        </span>

        <div
          aria-label="Hora local de las galerías"
          className="hidden lg:flex items-center gap-3 text-xs tracking-meta uppercase tabular-nums text-bone/90"
        >
          {clocks.map((clock, index) => (
            <span key={clock.code} className="inline-flex items-center gap-3">
              {index > 0 && <span aria-hidden="true">·</span>}
              <span>
                {clock.time} {clock.code}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Tarjeta editorial con extracto curatorial y boton de reserva de visita */}
      <div className="absolute bottom-32 sm:bottom-36 md:bottom-40 left-6 right-6 sm:left-auto sm:right-6 md:right-10 max-w-md text-bone z-10">
        <p className="text-xs tracking-meta uppercase text-bone/70">
          EXPOSICIÓN 01
        </p>
        <p className="mt-3 text-base md:text-lg leading-[1.4]">
          Muse comisaría arte contemporáneo entre tres ciudades. Pintura, escultura, fotografía e instalación — sostenidas bajo un rigor museístico, pausadas como un libro.
        </p>
        <button
          type="button"
          onClick={onBookViewing}
          className="mt-6 inline-flex items-center gap-3 bg-bone/10 backdrop-blur-md border border-bone/30 rounded-full px-2 py-2 pr-5 group hover:bg-bone/15 transition-colors focus-visible:outline-2 focus-visible:outline-bone focus-visible:outline-offset-2"
        >
          <span className="w-9 h-9 rounded-full bg-ink flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-bone transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-sm font-medium whitespace-nowrap">
            Reservar una visita
          </span>
        </button>
      </div>

      {/* Logotipo monumental inferior con animacion de aparicion */}
      <div className="absolute bottom-0 left-0 right-0 px-6 sm:pl-12 md:pl-14 md:pr-10 pointer-events-none z-10">
        <h1 className="font-display font-light text-bone text-[33vw] md:text-[26vw] lg:text-[24vw] tracking-[-0.045em] leading-[0.9]">
          <WordsPullUp text="Muse" immediate />
        </h1>
      </div>

      {/* Indicador vertical animado para invitar al desplazamiento */}
      <div
        aria-hidden="true"
        className="hidden sm:flex absolute bottom-10 left-3 md:left-4 vertical-rl text-bone/80 text-xs tracking-meta uppercase items-center gap-3 z-10 pointer-events-none"
      >
        <span>DESPLAZAR</span>
        <span className="relative w-px h-[60px] overflow-hidden bg-bone/15">
          <span className="absolute inset-0 bg-gradient-to-b from-bone/0 via-bone/80 to-bone/0 animate-scroll-line" />
        </span>
      </div>
    </section>
  );
}

// Componente NowShowing (En Sala): Muestra la exposicion actual "Luz Serena".
// Renderiza una cuadricula editorial de 6 obras con animacion de entrada gradual.
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Artwork, NOW_SHOWING_ARTWORKS } from '../data/artworks';

// Curva de transicion cinematica reutilizable para animaciones fluidas.
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface NowShowingProps {
  onSelectArtwork: (artwork: Artwork) => void;
  onViewAllWorks: () => void;
}

export function NowShowing({ onSelectArtwork, onViewAllWorks }: NowShowingProps) {
  // Hook para desactivar animaciones si el usuario configuro reducir movimiento en su SO.
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="en-sala"
      className="py-24 md:py-40 px-6 md:px-10 max-w-[1280px] mx-auto"
    >
      {/* Encabezado editorial con numeracion de seccion y titulo tipografico */}
      <header className="mb-12 md:mb-20">
        <div className="flex items-center gap-3 text-xs tracking-meta uppercase text-oxblood">
          <span className="w-8 h-px bg-oxblood" />
          <span>01 / EN SALA</span>
        </div>

        <h2 className="font-display font-light text-4xl md:text-6xl tracking-[-0.03em] leading-[1.05] mt-6 text-balance">
          Luz Serena{' '}
          <span className="font-italic">
            — seis pintores sobre lo que la mirada lenta puede sostener
          </span>
        </h2>

        <p className="mt-6 text-sm tracking-meta uppercase text-ash tabular-nums">
          4 MAR — 12 JUN, 2026 · LONDRES
        </p>
      </header>

      {/* Cuadricula responsive de 6 obras con tratamiento sepia y grano */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {NOW_SHOWING_ARTWORKS.map((art, i) => (
          <motion.figure
            key={art.id}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.7, delay: i * 0.08, ease: EASE_OUT }
            }
            className="group"
          >
            {/* Boton accesible que dispara el modal con la ficha tecnica completa */}
            <button
              type="button"
              onClick={() => onSelectArtwork(art)}
              aria-label={`Ver ficha técnica de ${art.artist}, ${art.title}`}
              className="w-full text-left focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-4"
            >
              <div className="relative overflow-hidden aspect-painting sepia-tint bg-paper">
                <img
                  src={art.image}
                  alt={`${art.artist}, ${art.title}, ${art.medium}, ${art.year}`}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                    art.imagePosition ?? ''
                  }`}
                />
                <div className="absolute inset-0 grain pointer-events-none" aria-hidden="true" />
              </div>

              {/* Pie de lamina con autor, titulo en cursiva clasica y tecnica */}
              <figcaption className="mt-5 space-y-1">
                <div className="text-xs tracking-meta uppercase text-ash tabular-nums">
                  {art.year}
                </div>
                <div className="font-display text-lg leading-tight">
                  <span className="font-medium">{art.artist}</span>
                  {' — '}
                  <span className="font-italic text-ink/80">{art.title}</span>
                </div>
                <div className="text-xs text-ash">{art.medium}</div>
              </figcaption>
            </button>
          </motion.figure>
        ))}
      </div>

      {/* Enlace para abrir el catalogo completo de las 38 obras */}
      <div className="mt-16 flex justify-end">
        <button
          type="button"
          onClick={onViewAllWorks}
          className="inline-flex items-center gap-2 text-sm tracking-meta uppercase text-oxblood group py-2 focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-4"
        >
          <span>Ver las 38 obras</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

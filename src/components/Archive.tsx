// Componente Archive: Seccion oscura de archivo historico con disposicion tipo mosaico (masonry).
// Permite filtrar obras por disciplina (Pintura, Escultura, Fotografia, Sobre papel).
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ARCHIVE_CATEGORIES,
  ARCHIVE_ITEMS,
  ArchiveCategory,
  ArchiveItem,
} from '../data/archive';
import { filterArchiveItems } from '../utils/catalogue';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ArchiveProps {
  onSelectArchiveItem?: (item: ArchiveItem) => void;
}

export function Archive({ onSelectArchiveItem }: ArchiveProps) {
  // Estado local para la categoria activa en los botones de filtrado.
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory>('Todo');
  const prefersReducedMotion = useReducedMotion();

  // Memoriza los elementos filtrados para optimizar el rendimiento y evitar recalculos innecesarios.
  const filteredItems = useMemo(
    () => filterArchiveItems(ARCHIVE_ITEMS, selectedCategory),
    [selectedCategory]
  );

  return (
    <section
      id="archivo"
      className="bg-ink text-bone py-24 md:py-40 px-6 md:px-10"
    >
      {/* Cabecera de la seccion y selector de categorias por pestañas */}
      <div className="max-w-[1280px] mx-auto mb-12 md:mb-16">
        <div className="flex items-center gap-3 text-xs tracking-meta uppercase text-bone">
          <span className="w-8 h-px bg-bone" />
          <span>02 / ARCHIVO — UN REGISTRO VIVO</span>
        </div>

        <h2 className="font-display font-light text-4xl md:text-6xl tracking-[-0.03em] leading-[1.05] mt-6 text-balance">
          Cuarenta y siete exposiciones,{' '}
          <span className="font-italic">catorce años.</span>
        </h2>

        <p className="mt-6 text-bone/70 max-w-md leading-[1.6]">
          Cada muestra de Muse permanece en el archivo — el mismo cuidado, los mismos encuadres, las mismas fichas que la noche de su inauguración. Mira hacia atrás tan despacio como miraste hacia adelante.
        </p>

        {/* Botonera de filtros accesibles con roles semanticos ARIA */}
        <div
          role="tablist"
          aria-label="Filtrar archivo por disciplina"
          className="mt-10 flex flex-wrap gap-2"
        >
          {ARCHIVE_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 min-h-[44px] md:min-h-0 rounded-full border border-bone/20 text-xs tracking-meta uppercase whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-bone focus-visible:outline-offset-2 ${
                  isActive
                    ? 'bg-bone text-ink'
                    : 'text-bone/70 hover:bg-bone hover:text-ink'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Disposicion de columnas (masonry) con revelado animado al hacer scroll */}
      <div
        data-testid="archive-masonry"
        className="mt-12 max-w-[1440px] mx-auto columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6"
      >
        {filteredItems.map((item, i) => (
          <motion.figure
            key={item.id}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.7, delay: (i % 4) * 0.08, ease: EASE_OUT }
            }
            className="break-inside-avoid mb-4 md:mb-6 group relative overflow-hidden"
          >
            {/* Tarjeta interactiva con superposicion descriptiva en hover */}
            <button
              type="button"
              onClick={() => onSelectArchiveItem?.(item)}
              aria-label={`${item.title}, ${item.category}, ${item.year}`}
              className="block w-full text-left focus-visible:outline-2 focus-visible:outline-bone focus-visible:outline-offset-2"
            >
              <div className={`relative overflow-hidden ${item.aspectClass} bg-ink`}>
                <img
                  src={item.image}
                  alt={`${item.artist}, ${item.title}, ${item.medium}, ${item.year}`}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover sepia-tint transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 grain pointer-events-none" aria-hidden="true" />

                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/95 to-transparent text-bone translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition-all duration-500">
                  <div className="text-xs tracking-meta uppercase text-bone/70 tabular-nums">
                    {item.year} · {item.category}
                  </div>
                  <div className="font-display mt-1 text-base leading-snug">
                    {item.title}
                  </div>
                </div>
              </div>
            </button>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

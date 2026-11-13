// Componente ArtworkModal: Modal accesible para consultar la ficha curatorial de una obra
// o desplegar el indice completo de 38 piezas de la muestra "Luz Serena".
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Artwork, NOW_SHOWING_ARTWORKS } from '../../data/artworks';
import { ArchiveItem } from '../../data/archive';

type ModalSelection =
  | { kind: 'artwork'; artwork: Artwork }
  | { kind: 'archive'; item: ArchiveItem }
  | { kind: 'catalogue' };

interface ArtworkModalProps {
  selection: ModalSelection | null;
  onClose: () => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onRequestViewing: (context: string) => void;
}

export function ArtworkModal({
  selection,
  onClose,
  onSelectArtwork,
  onRequestViewing,
}: ArtworkModalProps) {
  // Cierra el modal al pulsar la tecla Escape para cumplir con estandares WCAG de accesibilidad.
  useEffect(() => {
    if (!selection) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selection, onClose]);

  if (!selection) return null;

  return (
    // Fondo semitransparente con desenfoque; cerrar al hacer clic en el backdrop.
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ficha de catálogo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4 md:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl bg-bone text-ink border border-ink/15 p-6 md:p-9 max-h-[92vh] overflow-y-auto md:overflow-hidden">
        {/* Encabezado del modal con indicador de seccion y boton cerrar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-ink/10">
          <div className="flex items-center gap-3 text-xs tracking-meta uppercase text-oxblood">
            <span className="w-8 h-px bg-oxblood" />
            <span>
              {selection.kind === 'catalogue'
                ? 'LUZ SERENA · ÍNDICE DE SALA (38 OBRAS)'
                : selection.kind === 'archive'
                ? `ARCHIVO · ${selection.item.year}`
                : `CATÁLOGO · ${selection.artwork.year}`}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha"
            className="text-xs tracking-meta uppercase text-ash hover:text-oxblood transition-colors py-1 px-1"
          >
            Cerrar
          </button>
        </div>

        {/* Vista 1: Indice de las 38 obras del catalogo general */}
        {selection.kind === 'catalogue' ? (
          <div className="mt-6">
            <h2 className="font-display font-light text-2xl md:text-3xl tracking-[-0.02em] leading-[1.1] text-balance">
              Luz Serena —{' '}
              <span className="font-italic">Obras destacadas de la exposición</span>
            </h2>
            <p className="mt-3 text-sm text-ink/75 leading-[1.55] max-w-[60ch]">
              La muestra completa reúne 38 piezas en las tres salas de Heddon Street. Selecciona una lámina para abrir su ficha curatorial o solicita una visita guiada privada para consultar el dosier completo.
            </p>

            {/* Listado en cuadricula de laminas en miniatura */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {NOW_SHOWING_ARTWORKS.map((art, index) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => onSelectArtwork(art)}
                  className="flex items-center gap-3 text-left border-t border-ink/10 pt-3 group hover:border-oxblood transition-colors"
                >
                  <div className="w-14 h-18 shrink-0 overflow-hidden sepia-tint bg-paper">
                    <img
                      src={art.image}
                      alt={art.title}
                      className={`w-full h-full object-cover ${art.imagePosition ?? ''}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] tracking-meta uppercase text-ash tabular-nums">
                      LÁM. 0{index + 1} · {art.year}
                    </div>
                    <div className="font-display text-base leading-snug group-hover:text-oxblood transition-colors">
                      {art.artist} — <span className="font-italic">{art.title}</span>
                    </div>
                    <div className="text-xs text-ash truncate">{art.medium}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs tracking-meta uppercase text-ash">
                4 MAR — 12 JUN, 2026 · LONDRES
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestViewing('Luz Serena (Dosier 38 obras)');
                }}
                className="inline-flex items-center gap-3 bg-ink text-bone rounded-full pl-5 pr-2 py-2 group hover:bg-oxblood transition-colors"
              >
                <span className="text-sm font-medium">Solicitar dosier y visita</span>
                <span className="w-8 h-8 rounded-full bg-bone/15 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-bone" />
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Vista 2: Ficha tecnica detallada de una obra individual (dimensiones, procedencia, etc.) */
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            {/* Fotografia ampliada de la pieza con marco de proporcion museistica */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative overflow-hidden h-[min(56vh,460px)] w-auto max-w-full aspect-painting sepia-tint bg-paper">
                <img
                  src={
                    selection.kind === 'artwork'
                      ? selection.artwork.image
                      : selection.item.image
                  }
                  alt={
                    selection.kind === 'artwork'
                      ? `${selection.artwork.artist}, ${selection.artwork.title}`
                      : selection.item.title
                  }
                  className={`w-full h-full object-cover ${
                    selection.kind === 'artwork'
                      ? selection.artwork.imagePosition ?? ''
                      : ''
                  }`}
                />
                <div className="absolute inset-0 grain pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* Metadatos tecnicos: tecnica, dimensiones, ano de creacion y procedencia */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <p className="text-xs tracking-meta uppercase text-ash">
                  {selection.kind === 'artwork'
                    ? selection.artwork.artist
                    : selection.item.artist}
                </p>
                <h2 className="mt-2 font-display font-light text-3xl md:text-4xl leading-[1.1]">
                  <span className="font-italic">
                    {selection.kind === 'artwork'
                      ? selection.artwork.title
                      : selection.item.title}
                  </span>
                </h2>
              </div>

              <dl className="divide-y divide-ink/10 border-y border-ink/10 text-sm">
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-xs tracking-meta uppercase text-ash">Técnica</dt>
                  <dd className="text-right">
                    {selection.kind === 'artwork'
                      ? selection.artwork.medium
                      : selection.item.medium}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-xs tracking-meta uppercase text-ash">Año</dt>
                  <dd className="tabular-nums">
                    {selection.kind === 'artwork'
                      ? selection.artwork.year
                      : selection.item.year}
                  </dd>
                </div>
                {selection.kind === 'artwork' ? (
                  <>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-xs tracking-meta uppercase text-ash">
                        Dimensiones
                      </dt>
                      <dd className="tabular-nums">{selection.artwork.dimensions}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-xs tracking-meta uppercase text-ash">
                        Procedencia
                      </dt>
                      <dd className="text-right text-ink/80 max-w-xs">
                        {selection.artwork.provenance}
                      </dd>
                    </div>
                  </>
                ) : (
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-xs tracking-meta uppercase text-ash">
                      Disciplina
                    </dt>
                    <dd>{selection.item.category}</dd>
                  </div>
                )}
              </dl>

              {/* Boton para solicitar cita de visualizacion vinculada a esta obra */}
              <button
                type="button"
                onClick={() => {
                  const label =
                    selection.kind === 'artwork'
                      ? `${selection.artwork.artist} — ${selection.artwork.title}`
                      : selection.item.title;
                  onClose();
                  onRequestViewing(label);
                }}
                className="inline-flex items-center gap-3 bg-ink text-bone rounded-full pl-5 pr-2 py-2 group hover:bg-oxblood transition-colors"
              >
                <span className="text-sm font-medium">Consultar o concertar cita</span>
                <span className="w-8 h-8 rounded-full bg-bone/15 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-bone" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

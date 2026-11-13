// Componente Curator (La Curadora): Presenta la declaracion editorial de Elena Marchetti.
// Combina retrato fotografico, cita animada por palabras, capitular (dropcap) y firma SVG.
import curatorPortrait from '../assets/images/curator_portrait_1794524585702.jpg';
import { WordsPullUp } from './shared/WordsPullUp';

export function Curator() {
  return (
    <section
      id="curaduria"
      className="py-24 md:py-40 px-6 md:px-10 max-w-[1280px] mx-auto"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
        {/* Retrato curatorial con tratamiento sepia y escala de grises sutil */}
        <figure className="col-span-12 md:col-span-4 md:col-start-2">
          <div className="relative overflow-hidden aspect-[3/4] sepia-tint grayscale-[0.3]">
            <img
              src={curatorPortrait}
              alt="Elena Marchetti, Curadora Fundadora, fotografiada en la galería de Kioto, 2025"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 grain pointer-events-none" aria-hidden="true" />
          </div>
          <figcaption className="mt-4 font-italic text-sm text-ash">
            Elena Marchetti — Curadora Fundadora, fotografiada en la galería de Kioto, 2025
          </figcaption>
        </figure>

        {/* Columna de texto editorial, manifiesto y credenciales */}
        <div className="col-span-12 md:col-span-6 md:col-start-6">
          <div className="flex items-center gap-3 text-xs tracking-meta uppercase text-oxblood">
            <span className="w-8 h-px bg-oxblood" />
            <span>03 / LA CURADORA</span>
          </div>

          {/* Cita curatorial con animacion de revelado progresivo de palabras */}
          <blockquote className="mt-8 font-display font-light text-3xl md:text-4xl tracking-[-0.02em] leading-[1.15] text-balance">
            <WordsPullUp
              segments={[
                { text: 'Una galería es un lugar donde te das permiso de ' },
                { text: 'permanecer.', italic: true },
              ]}
            />
          </blockquote>

          {/* Biografia con capitular clasica estilizada en color oxblood */}
          <p className="mt-10 text-base leading-[1.7] text-ink/85 dropcap max-w-[60ch]">
            Elena fundó Muse en 2014 con una promesa sencilla: cada obra exhibida sería una con la que hubiera pasado al menos una hora primero. Catorce años después, la regla no se ha aflojado. Se formó en la Slade, trabajó para Hauser &amp; Wirth, y luego se marchó para hacer esto — más lento, más pequeño y con más cuidado del que cualquier institución le permitiría.
          </p>

          {/* Firma vectorial manuscrita trazada en SVG nativo */}
          <div className="mt-10 inline-block" aria-label="Firma manuscrita de Elena Marchetti">
            <svg
              viewBox="0 0 240 80"
              className="w-32 h-auto text-oxblood"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 52 C24 30, 42 18, 46 24 C48 28, 22 44, 24 54 C26 62, 46 56, 56 44 C64 34, 70 18, 72 16 C73 15, 63 45, 68 53 C72 59, 84 48, 90 42 C96 36, 98 48, 92 52 C88 54, 96 54, 108 42 C114 36, 118 46, 116 52 C122 44, 130 38, 134 45 C137 50, 145 46, 152 38 C162 24, 168 16, 170 22 C172 30, 164 46, 166 53 C174 42, 184 26, 188 30 C191 34, 188 48, 194 50 C200 52, 212 40, 224 38"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 38 C32 34, 52 32, 62 31"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="212" cy="48" r="1.4" fill="currentColor" />
            </svg>
          </div>

          {/* Credenciales academicas e institucionales de la curadora */}
          <ul className="mt-8 space-y-1 text-xs tracking-meta uppercase text-ash">
            <li>SLADE SCHOOL OF FINE ART · LONDRES</li>
            <li>EX CURADORA ASOCIADA · HAUSER &amp; WIRTH</li>
            <li>MIEMBRO · ASOCIACIÓN INTERNACIONAL DE CRÍTICOS DE ARTE</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

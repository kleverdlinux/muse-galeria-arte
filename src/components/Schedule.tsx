// Componente Schedule (Agenda): Presenta las proximas 4 exposiciones anuales.
// Incorpora un efecto hover expansivo con color oxblood y seleccion para agendar visitas.
import { ArrowUpRight } from 'lucide-react';
import { UPCOMING_SCHEDULE, ScheduleExhibition } from '../data/schedule';

interface ScheduleProps {
  onSelectExhibition: (exhibition: ScheduleExhibition) => void;
}

export function Schedule({ onSelectExhibition }: ScheduleProps) {
  return (
    <section id="agenda" className="bg-paper py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Cabecera de la seccion de agenda */}
        <div className="flex items-center gap-3 text-xs tracking-meta uppercase text-oxblood">
          <span className="w-8 h-px bg-oxblood" />
          <span>04 / LO QUE VIENE</span>
        </div>

        <h2 className="font-display font-light text-4xl md:text-6xl tracking-[-0.03em] leading-[1.05] mt-6 text-balance">
          El año por delante,{' '}
          <span className="font-italic">brevemente.</span>
        </h2>

        {/* Lista interactiva de fechas con animacion cortina de color al pasar el cursor */}
        <div className="mt-16 border-b border-ink/10">
          {UPCOMING_SCHEDULE.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectExhibition(item)}
              className="relative w-full text-left group cursor-pointer border-t border-ink/10 py-8 md:py-10 grid grid-cols-12 gap-6 items-center transition-colors focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-2 overflow-hidden"
            >
              {/* Fondo oxblood animado que se expande horizontalmente en hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 bg-oxblood transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"
              />

              {/* Columna de fecha (mes y dia) con numeros tabulares */}
              <div className="col-span-2 md:col-span-1 relative z-10 text-xs tracking-meta uppercase font-medium tabular-nums transition-colors duration-300 group-hover:text-bone">
                <div>{item.month}</div>
                <div className="mt-0.5">{item.day}</div>
              </div>

              {/* Columna de titulo y subtitulo descriptivo */}
              <div className="col-span-10 md:col-span-5 relative z-10">
                <div className="font-display text-2xl md:text-3xl font-light transition-colors duration-300 group-hover:text-bone">
                  {item.title}
                </div>
                <div className="font-italic text-base text-ink/70 mt-1 transition-colors duration-300 group-hover:text-bone/80">
                  {item.subtitle}
                </div>
              </div>

              {/* Columna con sinopsis conceptual de la muestra */}
              <div className="hidden md:block md:col-span-4 relative z-10 text-sm text-ink/70 leading-[1.5] max-w-md transition-colors duration-300 group-hover:text-bone/80">
                {item.description}
              </div>

              {/* Columna con la ciudad sede e icono de flecha diagonal con micro-interaccion */}
              <div className="col-span-12 md:col-span-2 relative z-10 flex items-center justify-end gap-2 text-xs tracking-meta uppercase transition-colors duration-300 group-hover:text-bone">
                <span>{item.city}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:-translate-y-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

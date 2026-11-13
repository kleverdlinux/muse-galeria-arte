// Componente Footer (Pie de pagina): Informacion de visita fisica, boletin trimestral,
// marquesina cinetica de lectura lenta y gran palabra tipografica "MUSE" animada.
import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import visitLondonImg from '../assets/images/visit_london_gallery_1794524587453.jpg';
import { validateNewsletterEmail } from '../utils/catalogue';
import { MarqueeRow } from './shared/MarqueeRow';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface FooterProps {
  onPlanVisit: () => void;
  emailInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function Footer({ onPlanVisit, emailInputRef }: FooterProps) {
  // Estados para validacion y envio interactivo del correo del boletin.
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Valida el formato del correo mediante la funcion pura del modulo utils/catalogue.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateNewsletterEmail(email);
    if (!validation.valid) {
      setError(validation.error ?? 'Dirección no válida.');
      setSubscribed(false);
      return;
    }
    setError(null);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="visita" className="bg-bone pt-24 md:pt-32 px-6 md:px-10">
      {/* Nivel 1: Tarjeta con direccion de la galeria de Londres, horarios y boton de cita */}
      <div className="max-w-[1280px] mx-auto border border-ink/15 p-8 md:p-12 grid grid-cols-12 gap-6 md:gap-10 relative overflow-hidden">
        <div className="col-span-12 md:col-span-6 z-10">
          <div className="flex items-center gap-3 text-xs tracking-meta uppercase text-oxblood">
            <span className="w-8 h-px bg-oxblood" />
            <span>05 / VISITA</span>
          </div>

          <address className="not-italic mt-6 font-display font-light text-3xl md:text-4xl tracking-[-0.02em] leading-[1.1]">
            14 Heddon Street
            <br />
            Londres W1B 4DA
          </address>

          <div className="mt-6 text-sm text-ink/70 leading-[1.7]">
            <p>Martes — Sábado · 11:00 – 18:00</p>
            <p>Domingo · Con cita previa</p>
            <p>Lunes cerrado</p>
          </div>

          <button
            type="button"
            onClick={onPlanVisit}
            className="mt-8 inline-flex items-center gap-3 bg-ink text-bone rounded-full pl-5 pr-2 py-2 group hover:bg-oxblood transition-colors focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-2"
          >
            <span className="text-sm font-medium whitespace-nowrap">
              Planifica tu visita
            </span>
            <span className="w-8 h-8 rounded-full bg-bone/15 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 text-bone transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

        {/* Imagen arquitectonica de la sede con mascara de degradado para fusion elegante */}
        <div className="col-span-12 md:col-span-6 md:col-start-7 md:-mt-12 md:-mb-12 md:-mr-12 relative">
          <div className="relative h-64 md:h-auto md:absolute md:inset-0">
            <img
              src={visitLondonImg}
              alt="Galería Muse en Heddon Street, Londres"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover sepia-tint"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 35%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 35%)',
              }}
            />
            <div
              className="absolute inset-0 grain pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Nivel 2: Formulario de suscripcion al boletin trimestral con validacion en tiempo real */}
      <div
        id="boletin"
        className="max-w-[1280px] mx-auto mt-24 md:mt-32 grid grid-cols-12 gap-6 md:gap-10"
      >
        <div className="col-span-12 md:col-span-3">
          <span className="text-xs tracking-meta uppercase text-oxblood">
            BOLETÍN TRIMESTRAL
          </span>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h3 className="font-display font-light text-3xl md:text-5xl tracking-[-0.03em] leading-[1.1] text-balance">
            Una carta, cuatro veces al año.{' '}
            <span className="font-italic">Ni una más, ni una menos.</span>
          </h3>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-10 max-w-md"
          >
            <div className="flex items-end gap-4">
              <label htmlFor="newsletter-email" className="sr-only">
                Tu correo electrónico
              </label>
              <input
                ref={emailInputRef}
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                  if (subscribed) setSubscribed(false);
                }}
                placeholder="Tu correo electrónico"
                className="flex-1 bg-transparent border-b border-ink/30 focus:border-oxblood outline-none py-3 text-base placeholder-ink/40 transition-colors"
              />
              <button
                type="submit"
                aria-label="Suscribirse al boletín trimestral"
                className="text-oxblood p-3 hover:translate-x-1 transition-transform focus-visible:outline-2 focus-visible:outline-oxblood focus-visible:outline-offset-2"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <p role="alert" className="mt-3 text-xs text-oxblood">
                {error}
              </p>
            )}

            {subscribed && (
              <p role="status" className="mt-3 text-sm text-ink/80 font-italic">
                Gracias. Tu correo ha quedado registrado para nuestro próximo envío trimestral.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Nivel 3: Marquesina infinita con la declaracion "Mira despacio · Vuelve a mirar" */}
      <div className="mt-24 md:mt-32 border-t border-ink/10 py-8 marquee-mask overflow-hidden">
        <MarqueeRow speed={40}>
          <span className="font-italic text-2xl md:text-4xl text-ink/40 whitespace-nowrap">
            Mira despacio · Vuelve a mirar · Mira despacio · Vuelve a mirar · Mira despacio · Vuelve a mirar
          </span>
        </MarqueeRow>
      </div>

      {/* Nivel 4: Logotipo monumental M-U-S-E animado letra por letra en la base */}
      <div
        aria-hidden="true"
        className="max-w-full px-0 md:px-4 select-none pointer-events-none overflow-hidden"
      >
        <div className="flex justify-between items-end leading-[0.85] -mb-[2vw]">
          {['M', 'U', 'S', 'E'].map((char, i) => (
            <motion.span
              key={char}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 60 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.9, delay: i * 0.15, ease: EASE_OUT }
              }
              className="font-display font-light text-ink text-[26vw] md:text-[25vw] tracking-[-0.045em]"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Nivel 5: Barra inferior de derechos de autor, enlaces sociales y creditos de diseno */}
      <div className="border-t border-ink/10 mt-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs tracking-meta uppercase text-ash">
        <div>© MUSE · 2014–2026</div>
        <div className="flex items-center gap-4">
          <a
            href="#visita"
            onClick={(e) => {
              e.preventDefault();
              onPlanVisit();
            }}
            className="hover:text-oxblood transition-colors"
          >
            INSTAGRAM
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#archivo"
            className="hover:text-oxblood transition-colors"
          >
            ARE.NA
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#boletin"
            className="hover:text-oxblood transition-colors"
          >
            SUBSTACK
          </a>
        </div>
        <div>Diseño por Hdezign</div>
      </div>
    </footer>
  );
}

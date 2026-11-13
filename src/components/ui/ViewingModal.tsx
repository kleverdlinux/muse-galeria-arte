// Componente ViewingModal: Dialogo modal interactivo para agendar visitas privadas guiadas.
// Incluye validacion de formulario (nombre, email, sede y fecha) y pantalla de confirmacion.
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { validateViewingRequest } from '../../utils/catalogue';

interface ViewingModalProps {
  isOpen: boolean;
  defaultCity?: string;
  exhibitionContext?: string;
  onClose: () => void;
}

export function ViewingModal({
  isOpen,
  defaultCity = 'Londres',
  exhibitionContext,
  onClose,
}: ViewingModalProps) {
  // Estados para los campos del formulario, control de errores y confirmacion de envio.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(defaultCity);
  const [date, setDate] = useState('2026-05-20');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Sincroniza la ciudad por defecto si el usuario hizo clic en una muestra de Kioto o CDMX.
  useEffect(() => {
    setCity(defaultCity);
  }, [defaultCity]);

  // Accesibilidad: Cierre con tecla Escape para mejorar la experiencia de navegacion por teclado.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Valida los datos introducidos; si son validos pasa al estado de confirmacion.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateViewingRequest({ name, email, city, date });
    if (!result.valid) {
      setErrors(result.errors as Record<string, string>);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  // Limpia el formulario y cierra el modal para futuras interacciones.
  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="w-full max-w-xl bg-bone text-ink border border-ink/15 p-8 md:p-12 relative">
        {/* Cabecera del modal de reserva */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs tracking-meta uppercase text-oxblood">
            <span className="w-8 h-px bg-oxblood" />
            <span>CITA PRIVADA</span>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Cerrar reserva"
            className="text-xs tracking-meta uppercase text-ash hover:text-oxblood transition-colors py-2 px-1"
          >
            Cerrar
          </button>
        </div>

        <h2
          id="viewing-modal-title"
          className="font-display font-light text-3xl md:text-4xl tracking-[-0.02em] leading-[1.1] mt-6 text-balance"
        >
          Reservar una visita <span className="font-italic">sin prisa.</span>
        </h2>

        {exhibitionContext && (
          <p className="mt-3 text-xs tracking-meta uppercase text-ash">
            EXPOSICIÓN · {exhibitionContext}
          </p>
        )}

        {/* Pantalla 1: Mensaje de exito tras confirmar la reserva */}
        {submitted ? (
          <div className="mt-8 pt-8 border-t border-ink/10 space-y-4">
            <p className="font-display text-2xl font-light text-ink">
              Tu visita ha quedado solicitada.
            </p>
            <p className="text-sm text-ink/75 leading-[1.6] max-w-[60ch]">
              Hemos reservado un espacio de lectura y sala para <strong className="font-medium">{name}</strong> en nuestra sede de <strong className="font-medium">{city}</strong> el <strong className="font-medium tabular-nums">{date}</strong>. Recibirás la nota de acceso en {email}.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-4 inline-flex items-center gap-3 bg-ink text-bone rounded-full px-6 py-3 text-sm font-medium hover:bg-oxblood transition-colors"
            >
              Volver al catálogo
            </button>
          </div>
        ) : (
          /* Pantalla 2: Formulario de entrada de datos del usuario */
          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="viewing-name"
                className="block text-xs tracking-meta uppercase text-ash"
              >
                Nombre completo
              </label>
              <input
                id="viewing-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full bg-transparent border-b border-ink/30 focus:border-oxblood outline-none py-3 text-base placeholder-ink/40 transition-colors"
              />
              {errors.name && (
                <p className="mt-2 text-xs text-oxblood">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="viewing-email"
                className="block text-xs tracking-meta uppercase text-ash"
              >
                Correo electrónico
              </label>
              <input
                id="viewing-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-transparent border-b border-ink/30 focus:border-oxblood outline-none py-3 text-base placeholder-ink/40 transition-colors"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-oxblood">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="viewing-city"
                  className="block text-xs tracking-meta uppercase text-ash"
                >
                  Sede
                </label>
                <select
                  id="viewing-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent border-b border-ink/30 focus:border-oxblood outline-none py-3 text-base transition-colors"
                >
                  <option value="Londres">Londres — 14 Heddon Street</option>
                  <option value="Kioto">Kioto — Nakagyo-ku</option>
                  <option value="Ciudad de México">Ciudad de México — Col. Roma</option>
                </select>
                {errors.city && (
                  <p className="mt-2 text-xs text-oxblood">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="viewing-date"
                  className="block text-xs tracking-meta uppercase text-ash"
                >
                  Fecha preferida
                </label>
                <input
                  id="viewing-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-b border-ink/30 focus:border-oxblood outline-none py-3 text-base tabular-nums transition-colors"
                />
                {errors.date && (
                  <p className="mt-2 text-xs text-oxblood">{errors.date}</p>
                )}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-ink text-bone rounded-full pl-5 pr-2 py-2 group hover:bg-oxblood transition-colors"
              >
                <span className="text-sm font-medium">Confirmar cita</span>
                <span className="w-8 h-8 rounded-full bg-bone/15 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-bone transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

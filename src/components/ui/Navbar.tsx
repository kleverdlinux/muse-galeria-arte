// Componente Navbar: Barra de navegacion superior fija y adaptativa (desktop y movil).
// Cambia dinamicamente de transparente a vidrio esmerilado al superar la seccion Hero.
import { useEffect, useState } from 'react';

interface NavbarProps {
  onSubscribeClick: () => void;
  onNavigate?: (sectionId: string) => void;
}

// Enlaces de navegacion correspondientes a cada seccion semantica de la pagina.
const NAV_LINKS = [
  { id: 'en-sala', label: 'En sala' },
  { id: 'archivo', label: 'Archivo' },
  { id: 'curaduria', label: 'Curaduría' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'visita', label: 'Visita' },
] as const;

export function Navbar({ onSubscribeClick, onNavigate }: NavbarProps) {
  // Estados para detectar posicion del scroll y controlar el menu desplegable movil.
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Listener pasivo de scroll para alternar estilos de contraste cuando se pasa el Hero.
  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.88);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Controla el desplazamiento suave hacia la seccion y cierra el menu movil si estaba abierto.
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
        pastHero
          ? 'bg-bone/85 backdrop-blur-sm border-b border-border text-ink'
          : 'bg-transparent text-bone'
      }`}
    >
      <div className="px-6 md:px-10 py-5 flex items-center justify-between gap-8">
        {/* Logotipo de cabecera con ancla directa a la seccion Hero */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, 'hero')}
          className="text-xl font-display tracking-[-0.02em] whitespace-nowrap shrink-0"
        >
          Muse
        </a>

        {/* Menu horizontal visible en pantallas medianas y de escritorio */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-oxblood"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Boton de llamada a la accion (CTA) de suscripcion y disparador del menu movil */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onSubscribeClick}
            className={`px-5 py-2 rounded-full border text-xs tracking-micro uppercase font-medium whitespace-nowrap shrink-0 transition-colors duration-300 min-h-[40px] ${
              pastHero
                ? 'border-oxblood text-ink hover:bg-oxblood hover:text-bone'
                : 'border-bone/50 text-bone hover:bg-oxblood hover:border-oxblood'
            }`}
          >
            Suscribirse
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden px-3 py-2 text-xs tracking-meta uppercase whitespace-nowrap shrink-0 min-h-[40px]"
          >
            {mobileMenuOpen ? 'Cerrar' : 'Menú'}
          </button>
        </div>
      </div>

      {/* Menu desplegable accesible para dispositivos moviles */}
      {mobileMenuOpen && (
        <nav
          aria-label="Menú móvil"
          className="md:hidden bg-bone text-ink border-b border-border px-6 pb-8 pt-2 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="py-2 text-lg font-display border-b border-border last:border-b-0 hover:text-oxblood transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

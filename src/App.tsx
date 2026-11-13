// Componente orquestador principal de la aplicacion Muse.
// Coordina el scroll suave con Lenis, la navegacion y el estado de modales.
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { Archive } from './components/Archive';
import { Curator } from './components/Curator';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { NowShowing } from './components/NowShowing';
import { Schedule } from './components/Schedule';
import { MagneticCursor } from './components/shared/MagneticCursor';
import { ScrollProgress } from './components/shared/ScrollProgress';
import { ArtworkModal } from './components/ui/ArtworkModal';
import { Navbar } from './components/ui/Navbar';
import { ViewingModal } from './components/ui/ViewingModal';
import { ArchiveItem } from './data/archive';
import { Artwork } from './data/artworks';
import { ScheduleExhibition } from './data/schedule';

// Tipado discriminado para controlar que contenido se visualiza en el modal de obras.
type ModalSelection =
  | { kind: 'artwork'; artwork: Artwork }
  | { kind: 'archive'; item: ArchiveItem }
  | { kind: 'catalogue' };

export default function App() {
  // Referencias para la instancia de scroll suave Lenis y el input del boletin.
  const lenisRef = useRef<Lenis | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // Estados locales para controlar apertura de modales y ciudad seleccionada.
  const [viewingOpen, setViewingOpen] = useState(false);
  const [viewingCity, setViewingCity] = useState('Londres');
  const [viewingContext, setViewingContext] = useState<string | undefined>(
    undefined
  );
  const [artworkSelection, setArtworkSelection] =
    useState<ModalSelection | null>(null);

  // Inicializacion del motor de scroll inercial Lenis respetando accesibilidad.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Desplaza la vista suavemente hacia la seccion indicada por su id.
  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Redirige al pie de pagina y enfoca el campo de suscripcion al boletin.
  const handleSubscribeClick = () => {
    scrollToSection('boletin');
    window.setTimeout(() => {
      emailInputRef.current?.focus();
    }, 550);
  };

  // Abre el modal de reserva de visita con la sede y el contexto seleccionados.
  const openViewing = (city = 'Londres', context?: string) => {
    setViewingCity(city);
    setViewingContext(context);
    setViewingOpen(true);
  };

  // Maneja el clic en una exposicion de la agenda para agendar visita guiada.
  const handleSelectSchedule = (exhibition: ScheduleExhibition) => {
    const cityMap: Record<string, string> = {
      LONDRES: 'Londres',
      KIOTO: 'Kioto',
      'CIUDAD DE MÉXICO': 'Ciudad de México',
    };
    openViewing(
      cityMap[exhibition.city] ?? 'Londres',
      `${exhibition.title} (${exhibition.month} ${exhibition.day})`
    );
  };

  return (
    <>
      {/* Componentes visuales globales: barra de progreso y cursor magnetico */}
      <ScrollProgress />
      <MagneticCursor />

      {/* Barra de navegacion superior fija */}
      <Navbar
        onSubscribeClick={handleSubscribeClick}
        onNavigate={scrollToSection}
      />

      {/* Contenedor principal con las 5 secciones editoriales */}
      <main className="min-h-screen bg-bone text-ink">
        <Hero onBookViewing={() => openViewing('Londres', 'Luz Serena — Londres')} />
        <NowShowing
          onSelectArtwork={(artwork) =>
            setArtworkSelection({ kind: 'artwork', artwork })
          }
          onViewAllWorks={() => setArtworkSelection({ kind: 'catalogue' })}
        />
        <Archive
          onSelectArchiveItem={(item) =>
            setArtworkSelection({ kind: 'archive', item })
          }
        />
        <Curator />
        <Schedule onSelectExhibition={handleSelectSchedule} />
        <Footer
          onPlanVisit={() => openViewing('Londres', '14 Heddon Street, Londres')}
          emailInputRef={emailInputRef}
        />
      </main>

      {/* Modales interactivos para reserva de visitas y ficha tecnica de obras */}
      <ViewingModal
        isOpen={viewingOpen}
        defaultCity={viewingCity}
        exhibitionContext={viewingContext}
        onClose={() => setViewingOpen(false)}
      />

      <ArtworkModal
        selection={artworkSelection}
        onClose={() => setArtworkSelection(null)}
        onSelectArtwork={(artwork) =>
          setArtworkSelection({ kind: 'artwork', artwork })
        }
        onRequestViewing={(context) => openViewing('Londres', context)}
      />
    </>
  );
}

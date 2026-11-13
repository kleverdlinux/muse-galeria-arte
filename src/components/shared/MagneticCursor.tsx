// Componente MagneticCursor: Puntero personalizado con fisica elastica de resorte (Spring physics).
// Reacciona y se expande suavemente al posarse sobre botones, enlaces y campos interactivos.
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function MagneticCursor() {
  // Valores de movimiento y resortes fisicos para calcular la trayectoria inercial.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Desactiva el cursor custom en pantallas tactiles o si el usuario prefiere movimiento reducido.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');

    if (reducedMotion.matches || !finePointer.matches) {
      document.documentElement.classList.remove('has-magnetic-cursor');
      return;
    }

    // Activa la coordenada inicial y oculta el cursor nativo del sistema operativo.
    const activateCursor = (clientX: number, clientY: number) => {
      x.set(clientX - 6);
      y.set(clientY - 6);
      setVisible(true);
      document.documentElement.classList.add('has-magnetic-cursor');
    };

    const handleMove = (e: MouseEvent | PointerEvent) => {
      activateCursor(e.clientX, e.clientY);
    };

    const handleLeave = () => {
      setVisible(false);
      document.documentElement.classList.remove('has-magnetic-cursor');
    };

    // Al pasar sobre un boton o enlace, el punto se agranda y se vuelve semitransparente.
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, input, select, [data-cursor="hover"]')) {
        innerRef.current?.classList.add(
          'scale-[2.6]',
          'bg-oxblood/25',
          'border-oxblood'
        );
        innerRef.current?.classList.remove('bg-oxblood', 'border-bone/80');
      }
    };

    // Restablece el tamano compacto del cursor al salir del elemento interactivo.
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, input, select, [data-cursor="hover"]')) {
        innerRef.current?.classList.remove(
          'scale-[2.6]',
          'bg-oxblood/25',
          'border-oxblood'
        );
        innerRef.current?.classList.add('bg-oxblood', 'border-bone/80');
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.documentElement.classList.remove('has-magnetic-cursor');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [x, y]);

  return (
    // Contenedor animado posicionado de forma absoluta con z-index elevado para estar siempre visible.
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      <div
        ref={innerRef}
        className="w-3 h-3 rounded-full bg-oxblood border border-bone/80 transition-all duration-200"
      />
    </motion.div>
  );
}

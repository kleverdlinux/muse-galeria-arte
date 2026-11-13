// Componente ScrollProgress: Linea sutil de 1px en el borde superior de la pantalla.
// Muestra el progreso de lectura a lo largo de la pagina vinculada al hook useScroll.
import { motion, useScroll } from 'motion/react';

export function ScrollProgress() {
  // Obtiene el progreso de scroll normalizado de 0 a 1 mediante Motion.
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-px bg-oxblood origin-left z-50 pointer-events-none"
    />
  );
}

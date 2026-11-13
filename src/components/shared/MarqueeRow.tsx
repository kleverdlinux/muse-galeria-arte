// Componente MarqueeRow: Marquesina de texto continuo e infinito con bucle CSS sin saltos.
// Desactiva la animacion y centra el contenido estaticamente si el usuario prefiere movimiento reducido.
import { ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

interface MarqueeRowProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function MarqueeRow({ children, speed = 40, className = '' }: MarqueeRowProps) {
  // Deteccion de accesibilidad para respetar las preferencias del usuario.
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={`flex items-center justify-center overflow-hidden ${className}`}>
        <div className="whitespace-nowrap">{children}</div>
      </div>
    );
  }

  return (
    // Duplica el contenido en dos capas consecutivas para crear un flujo infinito sin cortes.
    <div className={`relative flex overflow-hidden select-none ${className}`}>
      <div
        className="flex shrink-0 items-center gap-12 pr-12 animate-[muse-marquee_linear_infinite]"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex shrink-0 items-center gap-12 pr-12 animate-[muse-marquee_linear_infinite]"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <style>{`
        @keyframes muse-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

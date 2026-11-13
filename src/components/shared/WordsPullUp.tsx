// Componente WordsPullUp: Descompone un texto en palabras individuales y las anima
// emergiendo verticalmente (pull-up) de forma escalonada con retraso configurable.
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface TextSegment {
  text: string;
  italic?: boolean;
}

interface WordsPullUpProps {
  text?: string;
  segments?: TextSegment[];
  className?: string;
  immediate?: boolean;
}

export function WordsPullUp({
  text,
  segments,
  className = '',
  immediate = false,
}: WordsPullUpProps) {
  // Dispara la animacion cuando el elemento entra en el campo visual del usuario.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const prefersReducedMotion = useReducedMotion();

  // Divide el texto o los segmentos en tokens de palabras independientes.
  const wordTokens: Array<{ word: string; italic?: boolean }> = [];

  if (segments && segments.length > 0) {
    for (const seg of segments) {
      const split = seg.text.trim().split(/\s+/).filter(Boolean);
      for (const word of split) {
        wordTokens.push({ word, italic: seg.italic });
      }
    }
  } else if (text) {
    const split = text.trim().split(/\s+/).filter(Boolean);
    for (const word of split) {
      wordTokens.push({ word, italic: false });
    }
  }

  const shouldAnimate = immediate || inView;

  return (
    // Envuelve cada palabra en una mascara con overflow-hidden para la transicion vertical.
    <span ref={ref} className={`inline ${className}`}>
      {wordTokens.map((token, idx) => (
        <span key={`${token.word}-${idx}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            animate={shouldAnimate || prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 0.9,
                    delay: idx * 0.08,
                    ease: EASE_OUT,
                  }
            }
            className={`inline-block ${token.italic ? 'font-italic' : ''}`}
          >
            {token.word}
            {idx < wordTokens.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Datos curatoriales de las 6 obras principales expuestas en la muestra actual "Luz Serena".
// Incluye detalles de autor, titulo, tecnica, ano, dimensiones, procedencia y fotografia local.
import art01 from '../assets/images/art_01_tanaka_1794524583060.jpg';
import art02 from '../assets/images/art_02_roux_1794524582945.jpg';
import art03 from '../assets/images/art_03_ferraz_1794524583791.jpg';
import art04 from '../assets/images/art_04_park_1794524585223.jpg';
import art05 from '../assets/images/art_05_adeyemi_1794524585053.jpg';
import art06 from '../assets/images/art_06_stern_1794524586037.jpg';

// Interfaz TypeScript que define la estructura estricta de cada ficha de obra de arte.
export interface Artwork {
  id: string;
  artist: string;
  title: string;
  medium: string;
  year: string;
  dimensions: string;
  provenance: string;
  image: string;
  imagePosition?: string;
}

// Catalogo tipado con las 6 obras destacadas en exhibicion.
export const NOW_SHOWING_ARTWORKS: Artwork[] = [
  {
    id: 'art-01',
    artist: 'Aiko Tanaka',
    title: 'Mañana, despacio',
    medium: 'Óleo sobre lino',
    year: '2024',
    dimensions: '140 × 100 cm',
    provenance: 'Cortesía del estudio de la artista y Muse Londres',
    image: art01,
  },
  {
    id: 'art-02',
    artist: 'Mathilde Roux',
    title: 'La hora anterior',
    medium: 'Temple al huevo sobre tabla',
    year: '2023',
    dimensions: '95 × 68 cm',
    provenance: 'Colección privada, París · Préstamo para Luz Serena',
    image: art02,
  },
  {
    id: 'art-03',
    artist: 'Diego Ferraz',
    title: 'Sin título (Ventana)',
    medium: 'Pigmento sobre papel',
    year: '2024',
    dimensions: '76 × 54 cm',
    provenance: 'Cortesía del artista y Muse Ciudad de México',
    image: art03,
  },
  {
    id: 'art-04',
    artist: 'Hana Park',
    title: 'Campo quieto VII',
    medium: 'Óleo y cera sobre lienzo',
    year: '2024',
    dimensions: '150 × 108 cm',
    provenance: 'Adquisición directa del estudio, Seúl, 2024',
    image: art04,
    imagePosition: 'object-[50%_24%] scale-[1.24]',
  },
  {
    id: 'art-05',
    artist: 'Olu Adeyemi',
    title: 'Vocal larga',
    medium: 'Óleo sobre lino',
    year: '2025',
    dimensions: '180 × 130 cm',
    provenance: 'Encargo para Muse Londres, Primavera 2026',
    image: art05,
  },
  {
    id: 'art-06',
    artist: 'Yael Stern',
    title: 'Luz tardía, Kioto',
    medium: 'Óleo sobre madera',
    year: '2024',
    dimensions: '110 × 80 cm',
    provenance: 'Residencia Muse Kioto, otoño de 2024',
    image: art06,
  },
];

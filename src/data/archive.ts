// Registro historico de 12 exposiciones archivadas desde 2017 a 2023.
// Clasificadas por disciplina para permitir filtrado dinamico e interactivo en la UI.
import archive01 from '../assets/images/archive_01_memory_1794524586057.jpg';
import archive02 from '../assets/images/archive_02_slow_burn_1794524586984.jpg';
import archive03 from '../assets/images/archive_03_glass_hour_1794524587768.jpg';
import archive04 from '../assets/images/archive_04_notations_1794524589350.jpg';
import archive05 from '../assets/images/archive_05_salt_light_1794524588878.jpg';
import archive06 from '../assets/images/archive_06_quiet_field_1794524666954.jpg';
import archive07 from '../assets/images/archive_07_soft_address_1794524592001.jpg';
import archive08 from '../assets/images/archive_08_tessera_1794524590208.jpg';
import archive09 from '../assets/images/archive_09_drafts_1794524590980.jpg';
import archive10 from '../assets/images/archive_10_kyoto_edges_1794524668715.jpg';
import archive11 from '../assets/images/archive_11_hands_1794524673101.jpg';
import archive12 from '../assets/images/archive_12_morning_earlier_1794524590743.jpg';

// Tipos de categorias artisticas disponibles para el filtro del archivo.
export type ArchiveCategory =
  | 'Todo'
  | 'Pintura'
  | 'Escultura'
  | 'Fotografía'
  | 'Instalación'
  | 'Video'
  | 'Sobre papel';

export const ARCHIVE_CATEGORIES: ArchiveCategory[] = [
  'Todo',
  'Pintura',
  'Escultura',
  'Fotografía',
  'Instalación',
  'Video',
  'Sobre papel',
];

// Estructura de metadatos de cada pieza archivada con su clase de proporcion de aspecto.
export interface ArchiveItem {
  id: string;
  title: string;
  artist: string;
  year: string;
  category: Exclude<ArchiveCategory, 'Todo'>;
  image: string;
  aspectClass: string;
  medium: string;
}

// Catalogo cronologico de las 12 piezas del archivo.
export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'arc-01',
    title: 'Arquitecturas de la memoria',
    artist: 'Colectiva · Londres',
    year: '2023',
    category: 'Instalación',
    image: archive01,
    aspectClass: 'aspect-[4/3]',
    medium: 'Lino suspendido y luz cenital',
  },
  {
    id: 'arc-02',
    title: 'Combustión lenta',
    artist: 'Mateo Valdés',
    year: '2023',
    category: 'Pintura',
    image: archive02,
    aspectClass: 'aspect-[5/7]',
    medium: 'Veladuras al óleo y tierra quemada sobre lino',
  },
  {
    id: 'arc-03',
    title: 'La hora de cristal',
    artist: 'Clara Lindqvist',
    year: '2022',
    category: 'Escultura',
    image: archive03,
    aspectClass: 'aspect-square',
    medium: 'Vidrio fundido ahumado y piedra caliza',
  },
  {
    id: 'arc-04',
    title: 'Anotaciones',
    artist: 'Kenji Takahashi',
    year: '2022',
    category: 'Sobre papel',
    image: archive04,
    aspectClass: 'aspect-[3/4]',
    medium: 'Tinta y grafito sobre papel washi',
  },
  {
    id: 'arc-05',
    title: 'Luz de sal',
    artist: 'Nora Bergström',
    year: '2021',
    category: 'Fotografía',
    image: archive05,
    aspectClass: 'aspect-[4/3]',
    medium: 'Copia en gelatina de plata sobre papel baritado',
  },
  {
    id: 'arc-06',
    title: 'Campo quieto IV',
    artist: 'Hana Park',
    year: '2021',
    category: 'Pintura',
    image: archive06,
    aspectClass: 'aspect-[5/7]',
    medium: 'Óleo sobre lienzo',
  },
  {
    id: 'arc-07',
    title: 'Una dirección suave',
    artist: 'Lucía Sarti',
    year: '2020',
    category: 'Video',
    image: archive07,
    aspectClass: 'aspect-[4/3]',
    medium: 'Película de 16 mm transferida a video de un canal',
  },
  {
    id: 'arc-08',
    title: 'Tesela',
    artist: 'Tomás Ibarra',
    year: '2020',
    category: 'Escultura',
    image: archive08,
    aspectClass: 'aspect-square',
    medium: 'Cerámica chamotada y bronce crudo sobre travertino',
  },
  {
    id: 'arc-09',
    title: 'Vocal larga (Borradores)',
    artist: 'Olu Adeyemi',
    year: '2019',
    category: 'Sobre papel',
    image: archive09,
    aspectClass: 'aspect-[3/4]',
    medium: 'Carboncillo y tiza terracota sobre papel algodón',
  },
  {
    id: 'arc-10',
    title: 'Bordes (Kioto)',
    artist: 'Sora Watanabe',
    year: '2019',
    category: 'Fotografía',
    image: archive10,
    aspectClass: 'aspect-[4/3]',
    medium: 'Fotografía analógica de formato medio',
  },
  {
    id: 'arc-11',
    title: 'Manos, repitiendo',
    artist: 'Inés Morales',
    year: '2018',
    category: 'Instalación',
    image: archive11,
    aspectClass: 'aspect-[3/4]',
    medium: 'Barro crudo sin cocer y mesa de roble envejecido',
  },
  {
    id: 'arc-12',
    title: 'Luz de mañana, antes',
    artist: 'Aiko Tanaka',
    year: '2017',
    category: 'Pintura',
    image: archive12,
    aspectClass: 'aspect-square',
    medium: 'Óleo diluido sobre lino crudo',
  },
];

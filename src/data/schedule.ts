// Cronograma editorial de las 4 proximas exposiciones del ano (Londres, Kioto y CDMX).
// Almacena fechas, titulos, notas curatoriales y sedes para alimentar la seccion Agenda.

export interface ScheduleExhibition {
  id: string;
  month: string;
  day: string;
  title: string;
  subtitle: string;
  description: string;
  city: string;
  curatorNote: string;
}

// Lista cronologica de muestras programadas para 2026.
export const UPCOMING_SCHEDULE: ScheduleExhibition[] = [
  {
    id: 'sch-01',
    month: 'MAY',
    day: '16',
    title: 'Arquitecturas de la memoria',
    subtitle: 'Ocho artistas sobre lo que una habitación recuerda.',
    description:
      'Dibujos de posguerra, techos habitados, el peso suave de un umbral doméstico.',
    city: 'LONDRES',
    curatorNote:
      'Inauguración en el espacio de Heddon Street con piezas de archivo rara vez mostradas fuera de colecciones europeas.',
  },
  {
    id: 'sch-02',
    month: 'JUL',
    day: '04',
    title: 'Combustión lenta',
    subtitle: 'Seis pintores trabajando a la velocidad de la atención.',
    description:
      'Temple al huevo, paneles de yeso, veladuras superpuestas — obra hecha por repetición, no por gesto.',
    city: 'CIUDAD DE MÉXICO',
    curatorNote:
      'Seis meses de diálogo en taller reunidos en la casa de la Colonia Roma con luz cenital natural.',
  },
  {
    id: 'sch-03',
    month: 'SEP',
    day: '12',
    title: 'La hora de cristal',
    subtitle: 'Escultura y fotografía en la penumbra.',
    description:
      'Vidrio fundido, exposiciones lentas y el minuto luminoso antes de que el crepúsculo abandone el estudio.',
    city: 'KIOTO',
    curatorNote:
      'Exposición concebida para recorrerse sin iluminación artificial durante la última hora de la tarde.',
  },
  {
    id: 'sch-04',
    month: 'NOV',
    day: '22',
    title: 'Anotaciones',
    subtitle: 'Dibujos de un archivo de catorce años.',
    description:
      'Estudios, marginalia, notas de trabajo — el registro íntimo bajo la obra terminada.',
    city: 'LONDRES',
    curatorNote:
      'Más de cuarenta hojas sobre papel washi, algodón y cuadernos de estudio conservados desde 2014.',
  },
];

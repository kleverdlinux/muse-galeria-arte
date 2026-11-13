// Modulo utilitario con funciones puras para calculo de husos horarios,
// filtrado de catalogos y validacion de formularios en frontend.

export interface CityClock {
  code: string;
  timeZone: string;
  time: string;
}

// Configuracion de husos horarios IANA de las tres sedes de la galeria.
export const GALLERY_CITIES = [
  { code: 'LON', label: 'Londres', timeZone: 'Europe/London' },
  { code: 'KYO', label: 'Kioto', timeZone: 'Asia/Tokyo' },
  { code: 'CDMX', label: 'Ciudad de México', timeZone: 'America/Mexico_City' },
] as const;

// Convierte la hora actual a formato 24h (HH:MM) segun cada zona horaria.
export function formatCityTimes(date: Date = new Date()): CityClock[] {
  return GALLERY_CITIES.map((city) => {
    const time = new Intl.DateTimeFormat('es-ES', {
      timeZone: city.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);

    return {
      code: city.code,
      timeZone: city.timeZone,
      time,
    };
  });
}

// Filtra un arreglo de elementos segun su categoria; 'Todo' devuelve la coleccion completa.
export function filterArchiveItems<T extends { category: string }>(
  items: readonly T[],
  selectedCategory: string
): T[] {
  if (!selectedCategory || selectedCategory === 'Todo') {
    return [...items];
  }
  return items.filter((item) => item.category === selectedCategory);
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// Expresion regular estricta para comprobar el formato de direcciones de correo electronico.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Valida que el email del boletin no este vacio y cumpla con el patron estandar.
export function validateNewsletterEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Introduce tu correo electrónico para recibir la carta trimestral.',
    };
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return {
      valid: false,
      error: 'Introduce una dirección de correo electrónico válida.',
    };
  }
  return { valid: true };
}

export interface ViewingRequestInput {
  name: string;
  email: string;
  city: string;
  date: string;
}

export interface ViewingValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ViewingRequestInput, string>>;
}

// Valida todos los campos requeridos para agendar una cita privada guiada.
export function validateViewingRequest(
  input: ViewingRequestInput
): ViewingValidationResult {
  const errors: Partial<Record<keyof ViewingRequestInput, string>> = {};

  if (!input.name.trim()) {
    errors.name = 'Indica tu nombre completo.';
  }
  const emailCheck = validateNewsletterEmail(input.email);
  if (!emailCheck.valid) {
    errors.email = emailCheck.error;
  }
  if (!input.city.trim()) {
    errors.city = 'Selecciona una sede.';
  }
  if (!input.date.trim()) {
    errors.date = 'Elige una fecha para tu visita.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

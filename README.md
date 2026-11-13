# Muse — Galería de Arte Editorial Contemporánea

> **Proyecto Académico — SENATI (V Semestre)**  
> **Carrera:** Ingeniería de Software con Inteligencia Artificial  
> **Estudiante:** Kleverd Gabriel Apaza Quispe  
> **Curso:** Fullstack Developer Software (Semana 3 / HT-03: *Usa tecnología Frontend con JavaScript*)  
> **Instructor:** José Ángel Guillén Herrera  

---

## 🏛️ Descripción del Proyecto

**Muse** es una aplicación web tipo *Single Page Application* (SPA) diseñada bajo un concepto editorial contemporáneo y curatorial de alta gama. Combina una arquitectura modular de componentes reactivos en **React 19** con tipado estricto en **TypeScript**, un sistema de diseño con tokens semánticos en **Tailwind CSS v4**, desplazamiento inercial cinemático con **Lenis**, y microinteracciones de física de resortes mediante **Motion**.

El proyecto resuelve la necesidad de una galería de arte internacional con sedes en **Londres**, **Kioto** y **Ciudad de México**, ofreciendo sincronización horaria en tiempo real, catálogo interactivo con filtrado instantáneo en memoria, modales de reserva y ficha técnica, y una experiencia inmersiva accesible.

---

## 🚀 Tecnologías y Librerías Utilizadas

| Categoría | Tecnología / Herramienta | Versión / Función |
| :--- | :--- | :--- |
| **Framework Base** | [React](https://react.dev/) | `v19.0.1` — Biblioteca declarativa basada en componentes y hooks |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | `v7.0.2` — Tipado estricto (`strict: true`) y seguridad estática |
| **Empaquetador** | [Vite](https://vite.dev/) | `v8.3.8` — Servidor de desarrollo ultrarrápido y bundle optimizado |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com/) | `v4.3.3` — Tokens `@theme`, aspect-ratios personalizados y utilitarios |
| **Animaciones** | [Motion](https://motion.dev/) | `v12.23.24` — Animaciones físicas de resorte y revelado escalonado |
| **Scroll Inercial** | [Lenis](https://lenis.darkroom.engineering/) | `v1.3.27` — Desplazamiento suave cinemático emulando lectura pausada |
| **Iconografía** | [Lucide React](https://lucide.dev/) | `v0.546.0` — Íconos SVG limpios y accesibles |
| **Testing** | Node Test Runner (`node:test`) | Pruebas unitarias nativas sin dependencias externas |

---

## ✨ Características Principales

1. **Sincronización Horaria Global en Tiempo Real:** Cabecera interactiva que calcula y formatea automáticamente la hora local de Londres (BST), Kioto (JST) y CDMX (CST) mediante la API nativa `Intl.DateTimeFormat`.
2. **Exposición en Sala ("Luz Serena"):** Cuadrícula curatorial de pinturas con efectos visuales de textura analógica, grano cinematográfico y filtros sepia.
3. **Archivo Histórico Dinámico:** Filtrado reactivo en tiempo real mediante `useMemo` clasificado en 6 disciplinas artísticas sin recargar la página.
4. **Modales Accesibles y Validación Estricta:** Formularios tipados para agendar citas privadas de coleccionistas y suscripción a cartas curatoriales con validación por expresiones regulares.
5. **Cursor Magnético y Barra de Lectura:** Microinteracción que acompaña el puntero con física de resorte y barra de progreso de lectura vertical sincronizada con el scroll.
6. **Accesibilidad Integrada:** Soporte para la directiva `prefers-reduced-motion` del sistema operativo para usuarios con sensibilidad al movimiento.

---

## 📂 Arquitectura del Proyecto

```text
muse-galeria-arte/
├── index.html                   # Documento HTML principal con fuentes tipográficas
├── package.json                 # Metadatos, scripts y dependencias del proyecto
├── tsconfig.json                # Configuración estricta del compilador TypeScript
├── vite.config.ts               # Plugins de Vite (React, Tailwind CSS v4) y alias @/
├── src/
│   ├── main.tsx                 # Punto de entrada y montaje del Virtual DOM
│   ├── App.tsx                  # Componente orquestador raíz con Lenis y estado global
│   ├── index.css                # Tokens de diseño @theme y estilos utilitarios
│   ├── components/              # Componentes visuales desacoplados
│   │   ├── Header.tsx           # Navegación superior editorial y accesos rápidos
│   │   ├── Hero.tsx             # Portada inmersiva con video y relojes mundiales
│   │   ├── NowShowing.tsx       # Cuadrícula curatorial de la muestra actual
│   │   ├── CuratorialEssay.tsx  # Ensayo editorial con tipografía Instrument Serif
│   │   ├── Archive.tsx          # Mosaico histórico con botonera de filtrado reactivo
│   │   ├── ArtworkModal.tsx     # Diálogo modal con ficha técnica de la obra
│   │   ├── ViewingModal.tsx     # Formulario modal de reserva de citas guiadas
│   │   ├── Newsletter.tsx       # Sección de suscripción al boletín editorial
│   │   ├── Footer.tsx           # Pie de página con enlaces institucionales
│   │   ├── MagneticCursor.tsx   # Cursor flotante reactivo con física de resortes
│   │   └── ScrollProgress.tsx   # Indicador superior de progreso de desplazamiento
│   ├── data/                    # Modelos y fuentes de datos tipados
│   │   ├── artworks.ts          # Colección curatorial de obras en sala
│   │   └── archive.ts           # Catálogo del archivo histórico multidisciplinario
│   └── utils/                   # Lógica de negocio y funciones puras
│       ├── catalogue.ts         # Filtrado, validación de formularios y formateo horario
│       └── catalogue.test.ts    # Suite de pruebas unitarias automatizadas
```

---

## 🛠️ Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/kleverdlinux/muse-galeria-arte.git
cd muse-galeria-arte
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:5173`.

### 4. Ejecutar pruebas unitarias automatizadas
```bash
npm test
```
Ejecuta las 4 pruebas unitarias de validación y cálculo en `node:test`.

### 5. Compilar para producción
```bash
npm run build
```
Genera la versión optimizada y minificada en la carpeta `dist/`.

---

## 🌐 Despliegue en Producción

- **Repositorio GitHub:** [https://github.com/kleverdlinux/muse-galeria-arte](https://github.com/kleverdlinux/muse-galeria-arte)
- **Despliegue en Render / Cloud:** Enlace generado para revisión docente en vivo.

---

## 👤 Autor

- **Estudiante:** Kleverd Gabriel Apaza Quispe
- **ID:** `001643199` | **Bloque:** `49PIADS501`
- **Institución:** SENATI — Dirección Zonal Puno / UCP Juliaca ETI
- **Año:** 2026

# Guía de Assets - UniSalas

## Estructura de carpetas

```
src/assets/
├── index.ts          # Exportaciones centralizadas
├── images/           # Imágenes generales (fondos, fotos de salas, etc.)
├── icons/            # Iconos SVG o PNG pequeños
└── logos/            # Logos de la universidad y del sistema
```

## Formatos recomendados

### Imágenes
- **JPG/JPEG**: Para fotos de salas, fondos, imágenes con muchos colores
- **PNG**: Para imágenes con transparencia, capturas de pantalla
- **WebP**: Para mejor compresión (navegadores modernos)

### Iconos
- **SVG**: Preferible para iconos escalables
- **PNG**: Para iconos complejos o con muchos colores (16x16, 24x24, 32x32, 48x48)

### Logos
- **SVG**: Para logos vectoriales
- **PNG**: Para logos con transparencia
- **JPG**: Solo si no necesita transparencia

## Convenciones de nombres

- Usar kebab-case: `room-image-1.jpg`
- Incluir dimensiones si es necesario: `logo-200x100.png`
- Usar nombres descriptivos: `classroom-panoramic.jpg`, `lab-computers.jpg`

## Cómo usar las imágenes

### Método 1: Importación directa
```tsx
import heroImage from '../assets/images/hero-background.jpg';

function Hero() {
  return (
    <div style={{backgroundImage: `url(${heroImage})`}}>
      <h1>Bienvenido a UniSalas</h1>
    </div>
  );
}
```

### Método 2: Exportación centralizada (recomendado)
```tsx
// En assets/index.ts
export { default as HeroBackground } from './images/hero-background.jpg';
export { default as UniSalasLogo } from './logos/unisalas-logo.png';

// En tu componente
import { HeroBackground, UniSalasLogo } from '../assets';

function Header() {
  return (
    <header style={{backgroundImage: `url(${HeroBackground})`}}>
      <img src={UniSalasLogo} alt="UniSalas" />
    </header>
  );
}
```

### Método 3: En CSS
```css
.hero-section {
  background-image: url('../assets/images/hero-background.jpg');
  background-size: cover;
  background-position: center;
}
```

## Optimización

### Tamaños recomendados
- **Logos**: Máximo 200x200px
- **Iconos**: 24x24, 32x32, 48x48px
- **Imágenes de salas**: 800x600px para gallery, 1200x800px para hero
- **Avatares**: 150x150px

### Compresión
- Usar herramientas como TinyPNG para optimizar antes de agregar al proyecto
- Vite automáticamente optimiza las imágenes durante el build

## Ejemplos para UniSalas

### Logos sugeridos
- `unisalas-logo.png` - Logo principal del sistema
- `university-logo.png` - Logo de la universidad
- `favicon.ico` - Icono del navegador

### Iconos sugeridos
- `calendar.svg` - Para reservas y fechas
- `room.svg` - Para salas
- `user.svg` - Para usuarios
- `search.svg` - Para búsqueda
- `filter.svg` - Para filtros
- `qr-code.svg` - Para códigos QR

### Imágenes sugeridas
- `hero-background.jpg` - Imagen principal del home
- `classroom-default.jpg` - Imagen por defecto de aulas
- `lab-default.jpg` - Imagen por defecto de laboratorios
- `auditorium-default.jpg` - Imagen por defecto de auditorios
- `empty-state.svg` - Para cuando no hay resultados

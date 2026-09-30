# Corigari Cosmetics

Landing page de **Corigari**, empresa de cosmética orgánica. Proyecto estático construido únicamente con HTML, CSS y JavaScript (sin frameworks, sin dependencias ni build).

## Estructura

```
Corigari-Cosmetics/
├── index.html            # Estructura semántica de la landing
├── css/
│   └── styles.css        # Estilos, paleta de marca y diseño responsive
├── js/
│   └── main.js           # Interacciones (menú, scroll, formularios, animaciones)
└── assets/
    └── img/
        └── favicon.svg   # Icono del sitio
```

## Secciones

1. **Inicio** (`#inicio`) — hero con imagen y llamados a la acción.
2. **Nosotros** (`#nosotros`) — propuesta de marca y beneficios.
3. **Productos** (`#productos`) — colección en tarjetas con imagen, descripción y precio.
4. **Testimonios** (`#testimonios`) — reseñas de clientas con valoración.
5. **Sostenibilidad** (`#sostenibilidad`) — compromiso ambiental con estadísticas animadas.
6. **Contacto** (`#contacto`) — datos de atención y formulario con validación.
7. **CTA / Newsletter** — suscripción antes del pie de página.
8. **Pie** (`#pie`) — enlaces, contacto y año dinámico.

## Interacciones (JavaScript)

- Menú móvil accesible (`aria-expanded`, cierre con `Escape` y al elegir un enlace).
- Header con sombra al hacer scroll.
- Resaltado del enlace activo del menú según la sección visible.
- Animaciones de aparición al hacer scroll (respetan `prefers-reduced-motion`).
- Contadores animados en las estadísticas.
- Validación accesible de los formularios de contacto y newsletter, con mensajes de error y estado de éxito (`aria-live`). Al no existir backend, el envío es simulado.
- Botón "volver arriba".
- Año del copyright calculado dinámicamente.

## Paleta de marca

| Color      | Variable            | Hex       |
| ---------- | ------------------- | --------- |
| Verde      | `--color-green`     | `#2e8b57` |
| Azul agua  | `--color-aqua`      | `#5fc9c4` |
| Blanco     | `--color-white`     | `#ffffff` |
| Rosa claro | `--color-pink`      | `#f7c6d4` |

Además de la tipografía: **Cormorant Garamond** (títulos) y **Poppins** (texto), cargadas desde Google Fonts.

## Imágenes

Las fotografías se cargan por URL directa desde **Unsplash** (hero, nosotros y productos). Se usan parámetros simples (`?w=<ancho>&q=70`) para garantizar compatibilidad entre navegadores; el recorte se realiza con `object-fit` en CSS. Si necesitas el proyecto 100 % offline, descarga las imágenes a `assets/img/` y actualiza las rutas `src` en `index.html`.

## Accesibilidad

- HTML semántico con `aria-labelledby`/`aria-label` en las secciones y controles.
- Enlace "saltar al contenido principal".
- Foco visible consistente (`:focus-visible`) adaptado a fondos claros y oscuros.
- Imágenes con texto alternativo descriptivo.
- Respeto por `prefers-reduced-motion`.

## Uso

Abrir `index.html` directamente en el navegador o servirlo con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

Luego visitar `http://localhost:8000`.

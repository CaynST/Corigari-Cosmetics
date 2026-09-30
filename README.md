# Corigari Cosmetics

Landing page de **Corigari**, empresa de cosmética orgánica. Proyecto estático construido únicamente con HTML, CSS y JavaScript (sin frameworks ni dependencias).

## Estructura

```
corigari-cosmetics/
├── index.html        # Estructura semántica de la landing
├── css/
│   └── styles.css    # Estilos, paleta de marca y diseño responsive
├── js/
│   └── main.js       # Interacciones (menú móvil, scroll, año dinámico)
└── assets/
    └── img/          # Imágenes del proyecto
```

## Paleta de marca

| Color         | Variable            | Hex       |
| ------------- | ------------------- | --------- |
| Verde         | `--color-green`     | `#2e8b57` |
| Azul agua     | `--color-aqua`      | `#5fc9c4` |
| Blanco        | `--color-white`     | `#ffffff` |
| Rosa claro    | `--color-pink`      | `#f7c6d4` |

## Uso

Abrir `index.html` directamente en el navegador o servirlo con cualquier
servidor estático:

```bash
python3 -m http.server 8000
```

Luego visitar `http://localhost:8000`.

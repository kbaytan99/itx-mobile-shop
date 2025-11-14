# ITX Mobile Shop

Mini SPA para comprar dispositivos móviles.

- Vistas: listado de productos y detalle del producto.
- SPA con enrutado en cliente (react-router-dom). Sin SSR/MPA.
- Implementado con React + Vite (JS ES6, sin TypeScript).
- Se añaden pruebas básicas con Vitest y Testing Library.
- Linter: ESLint (flat config).

## Requisitos previos
- Node.js 18+
- npm 9+

## Instalación
```bash
npm install
```

## Scripts
- Desarrollo: `npm start`
- Build producción: `npm run build`
- Tests: `npm test`
- Linter: `npm run lint`

Ejemplos:
```bash
# modo desarrollo
npm start

# ejecutar linter
npm run lint

# ejecutar pruebas
npm test

# compilar a producción
npm run build
```

## Estructura
```
src/
  api/              # llamadas HTTP a la API pública
  components/       # componentes UI (common, layout, products)
  context/          # contexto de carrito con contador y cache en localStorage
  hooks/            # hooks reutilizables (cache simple con TTL en localStorage)
  pages/            # ProductListPage y ProductDetailsPage
  router/           # AppRouter (rutas SPA)
  styles/           # estilos globales
```

## Notas de implementación
- Caché de datos y contador de carrito persistidos en localStorage con TTL de 1h.
- Búsqueda local por marca/modelo en la vista de listado.
- En la vista de detalle se preseleccionan color y almacenamiento disponibles.
- Se usa `axios` para las peticiones a `https://itx-frontend-test.onrender.com`.

## Pruebas
- Se usa Vitest con entorno jsdom y Testing Library.
- Para evitar problemas de JSX en tests, Vitest usa el plugin de React de Vite.

## Hitos sugeridos (commits)
- init: Vite + React + ESLint
- feat: routing + páginas base
- feat: API + caché + listado
- feat: detalles + añadir al carrito
- test: vitest + tests básicos
- docs: README

## Troubleshooting
- Si Vitest muestra "React is not defined", asegúrate de tener `@vitejs/plugin-react` configurado en `vitest.config.js`.
- Si hay límite CORS/red de la API pública, vuelve a intentar o usa conexión estable.

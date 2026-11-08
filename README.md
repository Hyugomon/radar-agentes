# Radar de Agentes IA — web

Ranking público de agentes de IA. Cada repositorio se evalúa **uno por uno** y la web muestra el
veredicto, la cuenta que lo produce y el modo versus.

- **Stack**: Nuxt 4.6 (Vue 3.5, Nitro, Vite 8) · TypeScript · CSS propio (sin dependencias de UI).
- **Versus 3D**: `three` 0.187 + `postprocessing` 6.39 (bloom + SMAA + viñeta en un solo pase), cargado
  por import dinámico solo al abrir la batalla. Sin WebGL cae a un duelo CSS y el resultado no cambia.
- **Datos**: tabla `public.radar_agents` en InsForge (Postgres + PostgREST), con RLS de solo lectura
  para el rol `anon`. El sitio lee con la clave anónima; solo el pipeline de Python escribe.
- **Hosting**: Coolify en el VPS (build con `Dockerfile`, Node 24) detrás de Traefik + Let's Encrypt.

## Rutas

| Ruta | Qué es |
|---|---|
| `/` | Ranking con filtros, tabla y ficha lateral |
| `/agente/[slug]` | Ficha completa (SSR, indexable) |
| `/versus` | Selector con buscador + batalla animada + tarjeta PNG |
| `/metodologia` | Rúbrica, pesos, tiers y límites |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Variables de entorno

```
INSFORGE_URL=https://insforge.amaqon.cloud
INSFORGE_ANON_KEY=<jwt anónimo, solo lectura>
NUXT_PUBLIC_SITE_URL=https://radar.amaqon.cloud
```

Sin `INSFORGE_URL` la app cae al snapshot `data/agents.json` (generado con
`python ../scripts/export_web.py`), así que también funciona offline.

## Datos

1. El pipeline local (`radar.py sync / dossiers / apply / rank`) llena `data/radar.db` (SQLite).
2. `python scripts/export_web.py` genera `web/data/agents.json`.
3. `python scripts/make_seed.py` + `bulk-upsert` de InsForge publican las filas en `radar_agents`.
4. La web lee de Postgres. Un `update` en la tabla se refleja en ≤60 s (caché en memoria del servidor).

## Deploy

```
git push origin main        # Coolify despliega con el webhook
```

La app se creó en Coolify: proyecto `Radar Agentes IA` (rq35j3ph76pt5ffuu4xongop),
aplicación `radar-agentes` (qounqlrwueb9zixwhjw5bpb8), servidor 72.60.159.20.

## Pendiente

- Apuntar `radar.amaqon.cloud` → `72.60.159.20` (registro A). La API de Hostinger respondía 530
  el día del deploy, así que quedó publicado con la URL temporal
  `https://radar-agentes.72.60.159.20.sslip.io`. En cuanto exista el registro, basta actualizar el
  dominio en Coolify y volver a desplegar para que emita el certificado.

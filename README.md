# Radar de Agentes IA — web

Ranking de **repos open source** de agentes y bots, no de frameworks ni de productos cerrados. Cada repo
se investiga con su README, su web oficial, sus releases y el snapshot previo del pipeline. El listón es
**Grok Bot**: un producto cerrado que define identidad, computadora, memoria, rutinas, apps reales,
coordinación y aprobaciones. Grok Bot **no compite** en el ranking; se usa como referencia.

## Rutas

| Ruta | Qué es |
|---|---|
| `/` | Ranking open source, shortlist, filtros y ficha lateral |
| `/agente/[slug]` | Ficha completa (SSR, indexable) con fuentes y dossier |
| `/versus` | Selector con buscador + batalla animada + tarjeta PNG |
| `/metodologia` | Rúbrica, ADN Grok Bot, tiers, límites y qué queda fuera |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Investigación por proyecto

Cada repo tiene una carpeta en `research/<slug>/`:

| Archivo | Contenido |
|---|---|
| `meta.json` | Datos actuales de GitHub: estrellas, forks, licencia, lenguaje, último push, topics |
| `readme.md` | README descargado (extracto de 40k caracteres) |
| `homepage.txt` | Texto extraído de la web oficial, si existe |
| `releases.json` | Últimas releases desde el Atom de GitHub |
| `sources.json` | URLs consultadas y fecha de consulta |
| `dossier.md` | Qué es, evidencia por cada pieza del ADN, puntuación, fortalezas, riesgos y fuentes |

`research/index.json` consolida todos los dossiers. `research/overrides.json` guarda las correcciones
manuales de features y metadatos de producto (tagline, setup, plataformas, canales), con una nota de
verificación.

Scripts:

```bash
# 1) Investigar/actualizar repos (GitHub API + README + web + releases)
node scripts/research-projects.mjs
node scripts/research-projects.mjs --refresh
node scripts/research-projects.mjs --only=openmausbot

# 2) Aplicar overrides y reescribir dossiers (sin red)
node scripts/rebuild-research.mjs

# 3) Generar data/agents.json desde research/index.json
node scripts/build-products.mjs

# 4) Subir el catálogo a InsForge
INSFORGE_URL=https://insforge.amaqon.cloud \
INSFORGE_API_KEY=ik_... \
node scripts/sync-insforge.mjs
```

## Esquema de datos (InsForge)

La tabla antigua `radar_agents` (un JSON por repositorio) queda como legado y **no se usa** en este
ranking. El catálogo nuevo vive en:

| Tabla | Para qué |
|---|---|
| `radar_catalog_meta` | Una fila (`id = 'main'`) con dimensiones, pilares, tiers, calibración, límites, referencia y reglas |
| `radar_products` | Un repo por fila: identidad, maker, licencia, setup, plataformas, scores, ADN, payload completo y `published` |
| `radar_product_sources` | Fuentes oficiales por repo (`product_slug`, `label`, `url`, `checked_at`) |
| `radar_product_revisions` | Historial de cada revisión: score, tier, ADN, dimensiones, pilares y payload |
| `radar_analysis_jobs` | Cola privada del pipeline: `queued/running/done/failed`, prioridad, modelo, fuentes y resultado |

El DDL reproducible está en `db/001_radar_products.sql`. RLS: lectura pública solo de repos publicados
y metadatos; las escrituras se hacen con la `INSFORGE_API_KEY` desde el script de sincronización.

> Si tu pipeline actual sigue escribiendo en `radar_agents`, no alimenta esta web. Debe escribir en
> `radar_products` (y sus tablas de fuentes/revisiones) o ejecutar `npm run sync` después de generar
> `data/agents.json`.

## Variables de entorno

```bash
INSFORGE_URL=https://insforge.amaqon.cloud
INSFORGE_ANON_KEY=anon_...          # lectura pública (o JWT con role anon)
# INSFORGE_API_KEY=ik_...           # solo para scripts de escritura
NUXT_PUBLIC_SITE_URL=https://radar-agentes.72.60.159.20.sslip.io
```

Sin `INSFORGE_URL`/`INSFORGE_ANON_KEY` la app funciona con el snapshot local. El dominio
`radar.amaqon.cloud` sigue pendiente de registro A; mientras tanto el canonical apunta al host de
Coolify. Cuando exista el dominio, basta cambiarlo en Coolify y volver a desplegar.

## Stack

- Nuxt 4.6 (Vue 3.5, Nitro, Vite 8) · TypeScript · CSS propio.
- Versus 2D con `animejs` sobre SVG/CSS.
- Datos en InsForge (Postgres + PostgREST), con fallback al snapshot `data/agents.json`.
- Hosting: Coolify en el VPS, build con `Dockerfile`, Node 24.

## Deploy

```bash
git push origin main
# y, si el webhook no dispara:
# GET /api/v1/deploy?uuid=qounqlrwueb9zixwhjw5bpb8 en Coolify
```

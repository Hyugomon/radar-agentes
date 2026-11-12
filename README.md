# Radar de Agentes IA — web

Ranking de **productos** de IA, no de repositorios ni frameworks. Cada agente, bot o workspace se
mide contra el listón de **Grok Bot**: identidad propia, computadora, memoria, rutinas, apps reales,
coordinación y aprobaciones. Frameworks como LangChain, LangGraph, CrewAI o AutoGen quedan fuera.

- **Stack**: Nuxt 4.6 (Vue 3.5, Nitro, Vite 8) · TypeScript · CSS propio (sin dependencias de UI).
- **Versus 2D**: `animejs` 4.5 (timeline, springs, offsets) sobre SVG/CSS, inline en la misma página.
- **Datos**: InsForge (Postgres + PostgREST). La web lee `radar_products` y `radar_catalog_meta`
  con la clave anónima; si la BD falla, cae al snapshot `data/agents.json`.
- **Hosting**: Coolify en el VPS (build con `Dockerfile`, Node 24) detrás de Traefik + Let's Encrypt.

## Rutas

| Ruta | Qué es |
|---|---|
| `/` | Ranking de productos, shortlist, filtros y ficha lateral |
| `/agente/[slug]` | Ficha completa (SSR, indexable) con fuentes |
| `/versus` | Selector con buscador + batalla animada + tarjeta PNG |
| `/metodologia` | Rúbrica, ADN Grok Bot, tiers, límites y qué queda fuera |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Esquema de datos (InsForge)

La tabla antigua `radar_agents` (un JSON por repositorio) queda como legado y **no se usa** en este
ranking. El catálogo nuevo vive en:

> Si tu pipeline actual sigue escribiendo en `radar_agents`, no alimenta esta web. Debe escribir en
> `radar_products` (y sus tablas de fuentes/revisiones) o ejecutar `npm run sync` después de exportar
> `data/agents.json`.

| Tabla | Para qué |
|---|---|
| `radar_catalog_meta` | Una fila (`id = 'main'`) con dimensiones, pilares, tiers, calibración, límites, referencia y reglas |
| `radar_products` | Un producto por fila: identidad, maker, precios, setup, plataformas, scores, ADN, payload completo y `published` |
| `radar_product_sources` | Fuentes oficiales por producto (`product_slug`, `label`, `url`, `checked_at`) |
| `radar_product_revisions` | Historial de cada revisión: score, tier, ADN, dimensiones, pilares y payload |
| `radar_analysis_jobs` | Cola privada del pipeline: `queued/running/done/failed`, prioridad, modelo, fuentes y resultado |

Columnas pensadas para filtrar sin abrir el JSON: `category`, `license_type`, `pricing`, `setup`,
`maturity`, `tier`, `total`, `agency`, `confidence`, `is_reference`, `published`, `reviewed_at`.
El campo `payload` conserva la ficha completa que consume la web.

RLS: lectura pública solo de productos publicados y metadatos; las escrituras se hacen con la
`INSFORGE_API_KEY` desde el script de sincronización, nunca desde el navegador. El DDL reproducible
está en `db/001_radar_products.sql`.

## Scripts

```bash
# 1) Regenerar el snapshot local y recalcular scores/ranks
node scripts/build-products.mjs

# 2) Subir el catálogo a InsForge (requiere la project admin key)
INSFORGE_URL=https://insforge.amaqon.cloud \
INSFORGE_API_KEY=ik_... \
node scripts/sync-insforge.mjs
```

`scripts/sync-insforge.mjs` hace upsert de productos y metadatos, reemplaza fuentes e inserta una
revisión nueva por producto si cambió la fecha de revisión. `--dry` muestra lo que haría.

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

## Deploy

```bash
git push origin main        # Coolify despliega con el webhook
```

Aplicación Coolify: `radar-agentes` (`qounqlrwueb9zixwhjw5bpb8`), servidor `72.60.159.20`.

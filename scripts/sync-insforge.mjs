/**
 * Sincroniza data/agents.json con InsForge.
 *
 * Variables:
 *   INSFORGE_URL=https://insforge.amaqon.cloud
 *   INSFORGE_API_KEY=ik_... (project admin key; no la pongas en el repo)
 *
 * Uso:
 *   node scripts/sync-insforge.mjs
 *   node scripts/sync-insforge.mjs --dry
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(readFileSync(join(__dirname, '..', 'data', 'agents.json'), 'utf8'))
const dry = process.argv.includes('--dry')

const base = (process.env.INSFORGE_URL || 'https://insforge.amaqon.cloud').replace(/\/$/, '')
const key = process.env.INSFORGE_API_KEY || ''

if (!key) {
  console.error('Falta INSFORGE_API_KEY (project admin key).')
  process.exit(1)
}

const authHeaders = key.startsWith('anon_') || key.startsWith('ik_')
  ? { 'x-api-key': key }
  : { Authorization: `Bearer ${key}` }

async function request(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  })
  const text = await res.text()
  let body = null
  try { body = text ? JSON.parse(text) : null } catch { body = text }
  if (!res.ok) {
    throw new Error(`${options.method || 'GET'} ${path} -> ${res.status}: ${typeof body === 'string' ? body : JSON.stringify(body)}`)
  }
  return body
}

function dbRow(row) {
  return {
    slug: row.slug,
    name: row.full_name,
    maker: row.maker,
    tagline: row.tagline,
    summary: row.summary,
    description: row.description,
    website: row.website,
    repo: row.repo,
    docs: row.docs,
    category: row.category,
    cat_label: row.catLabel,
    license_type: row.licenseType,
    license: row.license,
    pricing: row.pricing,
    price_label: row.priceLabel,
    price_note: row.priceNote,
    setup: row.setup,
    setup_label: row.setupLabel,
    maturity: row.maturity,
    maturity_label: row.maturityLabel,
    platforms: row.platforms,
    models: row.models,
    channels: row.channels,
    is_reference: row.reference,
    kind: row.kind,
    total: row.total,
    tier: row.tier,
    agency: row.agency,
    confidence: row.confidence,
    dimensions: row.dimensions,
    pillars: row.pillars,
    strengths: row.strengths,
    weaknesses: row.weaknesses,
    comparison: row.comparison,
    featured: row.rank <= 4,
    published: true,
    reviewed_at: row.judged_day,
    payload: row
  }
}

async function upsert(table, rows, conflict) {
  if (dry) {
    console.log(`[dry] ${table}: ${rows.length} filas`)
    return
  }
  if (!rows.length) return
  await request(`/api/database/records/${table}?on_conflict=${conflict}`, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows)
  })
  console.log(`OK ${table}: ${rows.length} filas`)
}

const products = data.groups.ready.map(dbRow)

const meta = {
  id: 'main',
  generated_at: data.generated_iso,
  reference: data.meta.reference,
  dimensions: data.meta.dimensions,
  pillars: data.meta.pillars,
  tiers: data.meta.tiers,
  calibration: data.meta.calibration,
  limits: data.meta.limits,
  excluded: data.meta.excluded,
  included: data.meta.included,
  ranking_rule: data.meta.ranking_rule,
  updated_at: new Date().toISOString()
}

const sources = []
for (const row of data.groups.ready) {
  for (const source of row.sources || []) {
    sources.push({
      product_slug: row.slug,
      label: source.label,
      url: source.url,
      kind: 'official',
      checked_at: row.judged_day
    })
  }
}

const revisions = data.groups.ready.map(row => ({
  product_slug: row.slug,
  reviewed_at: row.judged_day,
  total: row.total,
  tier: row.tier,
  agency: row.agency,
  dimensions: row.dimensions,
  pillars: row.pillars,
  notes: 'Import inicial del catálogo de productos',
  payload: row
}))

console.log(`Sync ${products.length} productos -> ${base}${dry ? ' (dry)' : ''}`)
await upsert('radar_products', products, 'slug')
await upsert('radar_catalog_meta', [meta], 'id')

if (!dry) {
  // Quita productos que ya no están en el catálogo (p. ej. los comerciales de la versión anterior).
  const existingProducts = await request('/api/database/records/radar_products?select=slug')
  const keep = new Set(products.map(p => p.slug))
  const stale = (existingProducts || []).filter(p => !keep.has(p.slug))
  for (const p of stale) {
    await request(`/api/database/records/radar_products?slug=eq.${encodeURIComponent(p.slug)}`, { method: 'DELETE' })
  }
  if (stale.length) console.log(`OK radar_products: ${stale.length} filas fuera del catálogo eliminadas`)

  // Las fuentes se reemplazan para no dejar URLs viejas.
  await request('/api/database/records/radar_product_sources', { method: 'DELETE' })
  await upsert('radar_product_sources', sources, 'product_slug,url')

  // Historial: solo insertamos si no existe una revisión idéntica para la fecha.
  const existing = await request('/api/database/records/radar_product_revisions?select=product_slug,reviewed_at')
  const seen = new Set((existing || []).map(r => `${r.product_slug}|${String(r.reviewed_at).slice(0, 10)}`))
  const fresh = revisions.filter(r => !seen.has(`${r.product_slug}|${r.reviewed_at}`))
  if (fresh.length) {
    await request('/api/database/records/radar_product_revisions', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(fresh)
    })
    console.log(`OK radar_product_revisions: ${fresh.length} filas`)
  }
}

console.log('Listo.')
console.log(`Productos: ${products.length} · Fuentes: ${sources.length} · Revisiones nuevas: ${dry ? '—' : 'ver arriba'}`)

/**
 * Sincroniza data/ades.json con InsForge (radar_ades).
 * Uso:
 *   INSFORGE_URL=https://insforge.amaqon.cloud INSFORGE_API_KEY=ik_... node scripts/sync-ades.mjs
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const data = JSON.parse(readFileSync(join(root, 'data', 'ades.json'), 'utf8'))
const base = (process.env.INSFORGE_URL || 'https://insforge.amaqon.cloud').replace(/\/$/, '')
const key = process.env.INSFORGE_API_KEY || ''
if (!key) { console.error('Falta INSFORGE_API_KEY'); process.exit(1) }
const auth = key.startsWith('anon_') || key.startsWith('ik_') ? { 'x-api-key': key } : { Authorization: `Bearer ${key}` }

async function request(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: { ...auth, 'Content-Type': 'application/json', ...(options.headers || {}) }
  })
  const text = await res.text()
  let body = null
  try { body = text ? JSON.parse(text) : null } catch { body = text }
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} -> ${res.status}: ${typeof body === 'string' ? body : JSON.stringify(body)}`)
  return body
}

const rows = data.groups.ready.map(a => ({
  slug: a.slug,
  name: a.name,
  category: a.category,
  license_type: a.licenseType,
  license: a.license,
  tier: a.tier,
  total: a.total,
  payload: a,
  published: true,
  updated_at: new Date().toISOString()
}))

await request('/api/database/records/radar_ades?on_conflict=slug', {
  method: 'POST',
  headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
  body: JSON.stringify(rows)
})
console.log(`OK radar_ades: ${rows.length} filas`)

const existing = await request('/api/database/records/radar_ades?select=slug')
const keep = new Set(rows.map(r => r.slug))
const stale = (existing || []).filter(r => !keep.has(r.slug))
for (const r of stale) {
  await request(`/api/database/records/radar_ades?slug=eq.${encodeURIComponent(r.slug)}`, { method: 'DELETE' })
}
if (stale.length) console.log(`OK radar_ades: ${stale.length} filas fuera del catálogo eliminadas`)
console.log('Listo.')

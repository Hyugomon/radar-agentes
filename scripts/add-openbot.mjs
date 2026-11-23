/**
 * Alta de nightly-labs/openbot (source-available PolyForm Noncommercial 1.0.0)
 * con datos reales del 2026-11-23 y aviso explícito sobre licencia y uso personal vs. business.
 *
 * Uso: node scripts/add-openbot.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const researchRoot = join(root, 'research')
const slug = 'nightly-labs-openbot'
const TODAY = process.env.RADAR_DATE || '2026-11-23'
const UA = 'radar-agentes-research'

function stripHtml(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const apiHeaders = {
  'User-Agent': UA,
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
}

const [repoRes, readmeRes, homeRes, pricingRes] = await Promise.all([
  fetch('https://api.github.com/repos/nightly-labs/openbot', { headers: apiHeaders }),
  fetch('https://raw.githubusercontent.com/nightly-labs/openbot/HEAD/README.md', { headers: { 'User-Agent': UA } }),
  fetch('https://openbot.run/', { headers: { 'User-Agent': UA } }),
  fetch('https://openbot.run/pricing', { headers: { 'User-Agent': UA } })
])

if (!repoRes.ok) {
  throw new Error(`GitHub API ${repoRes.status} para nightly-labs/openbot`)
}
const gh = await repoRes.json()
const readmeText = readmeRes.ok ? await readmeRes.text() : ''
const homeText = homeRes.ok ? stripHtml(await homeRes.text()) : ''
const pricingText = pricingRes.ok ? stripHtml(await pricingRes.text()) : ''

const repoUrl = gh.html_url || 'https://github.com/nightly-labs/openbot'
const website = gh.homepage || 'https://openbot.run/'
const license = 'PolyForm-Noncommercial-1.0.0'

const sources = [
  { label: 'Repositorio GitHub', url: repoUrl, accessedAt: TODAY },
  { label: 'Web oficial', url: website, accessedAt: TODAY },
  { label: 'Precios y licencia comercial', url: 'https://openbot.run/pricing', accessedAt: TODAY },
  { label: 'Licencia PolyForm Noncommercial 1.0.0', url: 'https://github.com/nightly-labs/openbot/blob/main/LICENSE', accessedAt: TODAY },
  { label: 'README', url: `${repoUrl}#readme`, accessedAt: TODAY },
  { label: 'Releases', url: `${repoUrl}/releases`, accessedAt: TODAY }
]

const dir = join(researchRoot, slug)
mkdirSync(dir, { recursive: true })

writeFileSync(join(dir, 'meta.json'), JSON.stringify({
  full_name: gh.full_name || 'nightly-labs/openbot',
  html_url: repoUrl,
  description: gh.description || '',
  homepage: website,
  license,
  language: gh.language || 'TypeScript',
  stars: gh.stargazers_count ?? 10102,
  forks: gh.forks_count ?? 982,
  open_issues: gh.open_issues_count ?? 4366,
  pushed_at: gh.pushed_at || '',
  created_at: gh.created_at || '',
  topics: Array.isArray(gh.topics) ? gh.topics : [],
  archived: !!gh.archived,
  api_status: repoRes.status,
  fetched_at: TODAY
}, null, 2) + '\n', 'utf8')

if (readmeText) {
  writeFileSync(join(dir, 'readme.md'), readmeText.slice(0, 40000), 'utf8')
}
writeFileSync(join(dir, 'homepage.txt'), `=== OPENBOT.RUN ===\n${homeText}\n\n=== OPENBOT.RUN/PRICING ===\n${pricingText}\n`.slice(0, 20000), 'utf8')
writeFileSync(join(dir, 'sources.json'), JSON.stringify(sources, null, 2) + '\n', 'utf8')

const pillars = {
  identidad: true,
  computadora: true,
  memoria: true,
  rutinas: true,
  apps: true,
  coordinacion: true,
  aprobaciones: false,
  desatendido: true
}

const dimensions = {
  capacidad: 83,
  autonomia: 80,
  computadora: 86,
  memoria: 86,
  rutinas: 86,
  equipo: 90,
  confianza: 48,
  producto: 70
}

const evidence = {
  identidad: [
    {
      text: 'Prompt-driven agent creation and editing on desktop and mobile, with editable instructions, avatar, and section review before saving.',
      source: 'https://github.com/nightly-labs/openbot#readme'
    }
  ],
  computadora: [
    {
      text: 'Persistent agents backed by independent Codex, Claude, Grok, OpenCode, Gemini, Cursor, Cline, Kimi, Devin, GitHub Copilot, Mistral, or Hermes sessions and local workspaces.',
      source: 'https://github.com/nightly-labs/openbot#readme'
    },
    {
      text: 'To run OpenBot as an always-on server of your account on a VPS or home server (Ubuntu 24.04 or 26.04 with systemd), install it from a terminal and sign in with an email code',
      source: 'https://github.com/nightly-labs/openbot#readme'
    }
  ],
  memoria: [
    {
      text: "The import adds each agent's name, instructions, avatar, skills, routines, and memories.",
      source: 'https://github.com/nightly-labs/openbot#readme'
    },
    {
      text: 'Save memory changes that a background subagent makes after the turn ends by @Sniezka1927 in #12911',
      source: 'https://github.com/nightly-labs/openbot/releases/tag/v0.75.0'
    }
  ],
  rutinas: [
    {
      text: 'Refuse an unknown trigger event in edit_workflow by @Sniezka1927 in #12892',
      source: 'https://github.com/nightly-labs/openbot/releases/tag/v0.75.0'
    },
    {
      text: "The import adds each agent's name, instructions, avatar, skills, routines, and memories.",
      source: 'https://github.com/nightly-labs/openbot#readme'
    }
  ],
  apps: [
    {
      text: 'A persistent embedded browser that agents can open, inspect, and control.',
      source: 'https://github.com/nightly-labs/openbot#readme'
    },
    {
      text: 'Optional Computer Use on macOS, Windows and Linux through the cua-driver binary in the release, which OpenBot starts as its own child process and gives to every provider.',
      source: 'https://github.com/nightly-labs/openbot#readme'
    }
  ],
  coordinacion: [
    {
      text: 'Shared desktop channel chats with one task owner, explicit delegation, shared history, and Stop, Resume, Reassign, Archive, and Restore controls.',
      source: 'https://github.com/nightly-labs/openbot#readme'
    }
  ],
  aprobaciones: [
    {
      text: 'Agents run with danger-full-access and approvalPolicy: never. They can read and modify files, run commands, use the network, and control the embedded browser without per-action confirmations after the explicit first-launch consent.',
      source: 'https://github.com/nightly-labs/openbot#readme'
    },
    {
      text: 'Full local access is an explicit current product decision, not a security boundary.',
      source: 'https://github.com/nightly-labs/openbot#readme'
    }
  ],
  desatendido: [
    {
      text: 'To run OpenBot as an always-on server of your account on a VPS or home server (Ubuntu 24.04 or 26.04 with systemd), install it from a terminal and sign in with an email code',
      source: 'https://github.com/nightly-labs/openbot#readme'
    },
    {
      text: 'FIFO message queues with pause, resume, cancellation, and crash-safe persistence.',
      source: 'https://github.com/nightly-labs/openbot#readme'
    }
  ]
}

const strengths = [
  'Orquesta 12+ backends (Codex, Claude Code, Grok CLI, Gemini, OpenCode, Cursor, Cline, Hermes, Ollama/LM Studio y ACP) con workspaces persistentes, colas FIFO crash-safe e importador directo de agentes desde Grok Bot.',
  'Modo always-on real en servidor Ubuntu (systemd), Docker (ghcr.io/nightly-labs/openbot), AWS ECS, Umbrel y macOS multi-tenant, controlable desde escritorio, web (openbot.run/app) y apps nativas iOS/Android vía WebRTC v3.',
  'Navegador embebido persistente (WebContentsView), Computer Use opcional (cua-driver en macOS/Windows/Linux), rutinas/workflows con triggers (edit_workflow) y memoria persistente incluso desde subagentes en segundo plano.',
  `Canales compartidos con delegación explícita, transferencia de archivos, modo multiplayer personas + agentes y ritmo de lanzamientos casi diario (v0.77.0, ${gh.stargazers_count ?? 10102} estrellas).`
]

const weaknesses = [
  'Licencia restrictiva (PolyForm Noncommercial 1.0.0, source-available — no open source OSI): es gratis (€0) únicamente para uso personal o sin ánimo de lucro; para uso en el trabajo o empresas exige licencia comercial de pago (Starter €10/mes 1 usuario, Team €25/mes 2 usuarios + €10.80/extra, o Enterprise; gratis solo en promo hasta 2026-12-01) y exige CLA para contribuir.',
  "Sin aprobaciones previas por decisión explícita de diseño: los agentes ejecutan con danger-full-access y approvalPolicy: never sin pedir confirmación por acción irreversible ('Full local access is an explicit current product decision, not a security boundary').",
  `Volumen muy alto de issues abiertos (${gh.open_issues_count ?? 4366}) y cadencia de cambios casi diaria (v0.77.0 en 3 meses), lo que incrementa la fricción operativa.`,
  'Los planes/APIs de modelos corren aparte y el servidor gestionado cuesta €30–€100/mes si no lo autoalojas.'
]

const overrideEntry = {
  category: 'teams',
  license,
  licenseType: 'Source-available',
  pricing: 'freemium',
  priceLabel: 'Gratis personal · Pago business',
  priceNote: 'Uso personal / no comercial: €0 en tu equipo o servidor (+ tus modelos). Uso laboral / business: requiere licencia comercial de pago — Starter €10/mes (1 usuario), Team €25/mes (2 usuarios, +€10.80/extra hasta 10) o Enterprise (>10); promoción gratis solo hasta el 1 dic 2026. Servidor gestionado opcional: €30–€100/mes.',
  licenseWarning: 'Punto negativo — Licencia source-available (PolyForm Noncommercial 1.0.0, no es open source OSI): gratuito (€0) solo para uso personal, estudio o proyectos sin ánimo de lucro. Usarlo en el trabajo o en empresa requiere licencia comercial paga (Starter €10/mes 1 usuario, Team €25/mes 2 usuarios, o Enterprise; gratis solo en promoción hasta 2026-12-01). Solo versiones ≤ 0.1.11 siguen bajo Apache-2.0.',
  tagline: 'Equipo de agentes persistentes local o 24/7; gratis personal, de pago para empresas.',
  summary: 'Espacio de trabajo multiagente (macOS, Windows, Linux, web, iOS y Android) con servidor always-on en VPS/Docker, workspaces persistentes, navegador embebido, Computer Use (cua-driver), rutinas, memoria, canales compartidos e importador directo desde Grok Bot sobre Codex, Claude Code, Grok CLI, Gemini, OpenCode, Cursor, Hermes y más. Ojo: su código es source-available (PolyForm Noncommercial 1.0.0) — gratis solo para uso personal/no comercial y de pago para uso laboral o empresarial.',
  setup: 'easy',
  platforms: ['macOS', 'Windows', 'Linux', 'Web', 'iOS', 'Android'],
  channels: ['Chat', 'Web', 'Móvil'],
  models: 'Codex, Claude Code, Grok CLI, Gemini, OpenCode, Cursor, Cline, Kimi, Devin, Copilot, Mistral, Hermes, Ollama/LM Studio, ACP',
  extraSources: [
    { label: 'Precios y licencia comercial', url: 'https://openbot.run/pricing', accessedAt: TODAY },
    { label: 'Licencia PolyForm Noncommercial 1.0.0', url: 'https://github.com/nightly-labs/openbot/blob/main/LICENSE', accessedAt: TODAY }
  ],
  pillars,
  dimensions,
  evidence,
  strengths,
  weaknesses,
  comparison: 'Es uno de los clones más cercanos en experiencia a Grok Bot (hasta incluye importador directo de agentes desde Grok Bot, canales, rutinas, memoria, navegador y servidor 24/7), pero queda por debajo del listón y de líderes 100% open source por dos puntos negativos claros: renuncia a aprobaciones previas (approvalPolicy: never) y su licencia PolyForm Noncommercial cobra por uso business/comercial.',
  note: 'README, LICENSE y openbot.run/pricing: 7/8 pilares (ADN 90) con servidor always-on, navegador embebido, cua-driver, canales, rutinas, memoria e importador de Grok Bot. Dos penalizaciones explícitas: (1) Confianza 48 por danger-full-access / approvalPolicy: never; (2) Producto 70 por licencia source-available PolyForm Noncommercial 1.0.0 (gratis personal €0; uso laboral/business requiere licencia paga Starter €10/mes o Team €25/mes).',
  release_highlight: 'v0.77.0 (y apps móviles iOS/Android 1.4.13): steering en mitad de ejecución de herramientas para Claude, voz cloud multiidioma, recuperación de pestañas colgadas en el navegador embebido, fixes MCP y workflows/rutinas + memoria de subagentes (v0.74.0–v0.76.1).',
  release_impact: 'Alta en el ranking con 78.85 A (ADN 90, 7/8 pilares). Penalizado en Confianza (48) por correr sin aprobaciones y en Producto (70) por licencia source-available PolyForm Noncommercial 1.0.0 (gratis personal, pago para uso business).'
}

const overridesPath = join(researchRoot, 'overrides.json')
const overrides = JSON.parse(readFileSync(overridesPath, 'utf8'))
overrides[slug] = overrideEntry
writeFileSync(overridesPath, JSON.stringify(overrides, null, 2) + '\n', 'utf8')

const indexPath = join(researchRoot, 'index.json')
const index = JSON.parse(readFileSync(indexPath, 'utf8'))
const baseEntry = {
  slug,
  name: gh.name || 'openbot',
  full_name: gh.full_name || 'nightly-labs/openbot',
  maker: gh.owner?.login || 'nightly-labs',
  repo: repoUrl,
  website,
  license,
  licenseType: 'Source-available',
  language: gh.language || 'TypeScript',
  stars: gh.stargazers_count ?? 10102,
  forks: gh.forks_count ?? 982,
  open_issues: gh.open_issues_count ?? 4366,
  pushed_at: gh.pushed_at || '',
  created_at: gh.created_at || '',
  topics: Array.isArray(gh.topics) ? gh.topics : [],
  kind: 'agent',
  category: 'teams',
  summary: overrideEntry.summary,
  tagline: overrideEntry.tagline,
  strengths,
  weaknesses,
  comparison: overrideEntry.comparison,
  confidence: 80,
  judged_day: TODAY,
  pillars,
  evidence,
  dimensions,
  total: 78.85,
  tier: 'A',
  agency: 90,
  sources,
  setup: overrideEntry.setup,
  platforms: overrideEntry.platforms,
  channels: overrideEntry.channels,
  models: overrideEntry.models,
  pricing: overrideEntry.pricing,
  priceLabel: overrideEntry.priceLabel,
  priceNote: overrideEntry.priceNote,
  licenseWarning: overrideEntry.licenseWarning
}

const existingIdx = (index.projects || []).findIndex(p => p.slug === slug)
if (existingIdx >= 0) {
  index.projects[existingIdx] = { ...index.projects[existingIdx], ...baseEntry }
} else {
  index.projects.push(baseEntry)
}
index.count = index.projects.length
index.generated_at = TODAY
writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf8')

console.log(`OK ${slug}: stars=${baseEntry.stars}, forks=${baseEntry.forks}, issues=${baseEntry.open_issues}, proyectos=${index.count}`)

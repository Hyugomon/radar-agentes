/**
 * Alta de agentes investigados el 2026-11-15.
 * Crea research/<slug>/ con README, homepage, meta y fuentes; añade la ficha
 * al índice y deja los overrides listos para rebuild-research.mjs.
 *
 * Fuente de metadata/README: GitHub API + raw.githubusercontent + webs oficiales.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const researchRoot = join(root, 'research')
const temp = join(process.env.TEMP, 'radar-new-repos')
const indexPath = join(researchRoot, 'index.json')
const overridesPath = join(researchRoot, 'overrides.json')
const index = JSON.parse(readFileSync(indexPath, 'utf8'))
const overrides = JSON.parse(readFileSync(overridesPath, 'utf8'))
const TODAY = '2026-11-15'

const WEIGHTS = { capacidad: .15, autonomia: .15, computadora: .15, memoria: .10, rutinas: .10, equipo: .10, confianza: .10, producto: .15 }
const AGENCY_WEIGHTS = { identidad: 10, computadora: 18, memoria: 10, rutinas: 16, apps: 14, coordinacion: 12, aprobaciones: 10, desatendido: 10 }

function tierFor(total) {
  if (total >= 92) return 'SS'
  if (total >= 80) return 'S'
  if (total >= 70) return 'A'
  if (total >= 60) return 'B'
  if (total >= 50) return 'C'
  if (total >= 40) return 'D'
  if (total >= 30) return 'E'
  return 'F'
}

function metaFor(tempSlug, slug) {
  const cached = join(temp, tempSlug, 'meta.json')
  const local = join(researchRoot, slug, 'meta.json')
  return JSON.parse(readFileSync(existsSync(cached) ? cached : local, 'utf8'))
}

function sourcesFor(repo, website) {
  return [
    { label: 'Repositorio GitHub', url: repo, accessedAt: TODAY },
    ...(website ? [{ label: 'Web oficial', url: website, accessedAt: TODAY }] : []),
    { label: 'README', url: `${repo}#readme`, accessedAt: TODAY },
    { label: 'Releases', url: `${repo}/releases`, accessedAt: TODAY }
  ]
}

function evidence(repo, entries) {
  const base = `${repo}#readme`
  return Object.fromEntries(Object.entries(entries).map(([key, quotes]) => [
    key,
    quotes.map(q => ({ text: q.text, source: q.home ? q.source : base }))
  ]))
}

const NEW = [
  {
    slug: 'agentes-chat',
    tempSlug: 'agentes-chat',
    repo: 'https://github.com/agentes-chat/agentes-chat',
    website: 'https://agentes.chat',
    category: 'teams',
    summary: 'Alternativa open source a Slack donde personas y agentes comparten canales y DMs: cada agente tiene rol, presupuesto, computadora, navegador, memoria, rutinas, MCP y aprobaciones; web, escritorio y móvil.',
    tagline: 'Slack con agentes que trabajan de verdad.',
    setup: 'moderate',
    platforms: ['macOS', 'Windows', 'Linux', 'Web', 'iOS', 'Android'],
    channels: ['Chat', 'Email', 'Slack', 'Web'],
    strengths: [
      'Slack open source con agentes como miembros de canales y DMs, no un bot lateral',
      'Computadora y navegador propios con takeover humano y aislamiento por workspace',
      'Rutinas, memoria, MCP/Composio y aprobaciones en el mismo producto',
      'Web, escritorio, iOS y Android'
    ],
    weaknesses: [
      'Producto muy joven: creado en noviembre de 2026 y en beta abierta',
      'Self-hosting exige Docker/Postgres y operación',
      'La calidad de los agentes depende del modelo y del runtime conectado'
    ],
    comparison: 'Es la alternativa open source más directa a Grok Bot en formato Slack: equipo, computadora, rutinas, memoria y aprobaciones. Le falta madurez y recorrido.',
    confidence: 58,
    pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
    dimensions: { capacidad: 83, autonomia: 80, computadora: 87, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 74 },
    evidence: {
      identidad: [{ text: `Agents are members of the workspace, not a sidebar bot: they read the channel, answer when it's theirs to answer, and hand work back and forth.` }],
      computadora: [{ text: `Agents run commands and code on a computer that runs the runner: the server itself (the setup makes it the agents' computer by default), or a server, VM or laptop you connect.` }],
      memoria: [{ text: `Agents keep decisions, facts, preferences and lessons from conversations, learn from corrections and refused approvals, and propose changes to their own instructions for a person to accept.` }],
      rutinas: [{ text: `An agent works on a schedule ("every weekday at 9am") or on an event (a GitHub pull request, a Sentry issue, a new task, an incoming email) and delivers to a channel, a DM or the Drive.` }],
      apps: [{ text: `With a Composio key, Google Drive, Calendar, Sheets and Docs, Slack, Microsoft Teams, OneDrive, HubSpot, Salesforce, Zendesk, Asana, Figma, Intercom, Dropbox, Square, Instagram, Facebook, LinkedIn, YouTube, Pinterest, Reddit and WhatsApp Business connect through Composio.` }],
      coordinacion: [{ text: `Up to four agents answer, or none, and the message says who picked.` }],
      aprobaciones: [{ text: `Merge, deploy, rollback and anything a connector marks sensitive wait for the agent's owner or an admin, as a card in the chat.` }],
      desatendido: [{ text: `An agent works on a schedule ("every weekday at 9am") or on an event (a GitHub pull request, a Sentry issue, a new task, an incoming email) and delivers to a channel, a DM or the Drive.` }]
    },
    note: 'README y web oficial: Slack open source con agentes miembros del workspace, computadora y navegador propios, rutinas, memoria, MCP/Composio, aprobaciones y apps web/escritorio/móvil. Proyecto creado el 2026-11-09; se puntúa como beta abierta.',
    release_highlight: '0.8.8: correcciones de escritorio y móvil; la base ya incluye canales, computadora y aprobaciones.',
    release_impact: 'Nuevo en el ranking: 84.60 S. 8/8 pilares; producto joven y en beta abierta.'
  },
  {
    slug: 'clawboo',
    tempSlug: 'clawboo',
    repo: 'https://github.com/clawboo/clawboo',
    website: 'https://www.claw.boo',
    category: 'teams',
    summary: 'Estudio open source para desplegar equipos de agentes con un jefe que reparte tareas, memoria compartida, rutinas, conectores y aprobaciones; los agentes corren sobre Claude Code, Codex, Hermes, OpenClaw o el runtime propio.',
    tagline: 'Un jefe AI para tu equipo de agentes.',
    setup: 'easy',
    platforms: ['macOS', 'Windows', 'Linux', 'Web'],
    channels: ['Chat', 'Web'],
    strengths: [
      'Boo Zero reparte tareas y coordina varios runtimes',
      'Memoria compartida y tablero durable',
      'Rutinas, conectores MCP/Composio y aprobaciones',
      'Corre local con una sola orden'
    ],
    weaknesses: [
      'Proyecto pequeño (171 estrellas) y ecosistema joven',
      'La computadora es el entorno local, no una VM aislada por agente',
      'Depende de runtimes externos y de sus propios límites de permisos'
    ],
    comparison: 'Coordina agentes como un equipo real, pero su computadora es local y su ecosistema aún es pequeño frente a Grok Bot.',
    confidence: 62,
    pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
    dimensions: { capacidad: 78, autonomia: 74, computadora: 70, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 68 },
    evidence: {
      identidad: [{ text: `Ask once. Boo Zero, your team lead, splits the work into jobs on one board and hands each job to a teammate.` }],
      computadora: [{ text: `Share the Playwright or Chrome DevTools connector with an agent, and its Browser tab shows the latest screenshot from its browser. Each of those agents gets its own browser profile, so its logins stay its own.` }],
      memoria: [{ text: `Memory lives in Clawboo itself, so a fact one teammate saves can be recalled by any teammate, whatever tool it runs on.` }],
      rutinas: [{ text: `Put work on a clock. A team routine posts into the group chat for Boo Zero to pick up, and an agent routine hands one agent a task.` }],
      apps: [{ text: `A Connectors page starts or signs in to popular MCP servers for you (GitHub, Linear, Notion, Figma, Stripe, Playwright, a local folder and more; some ask for a key or token once). Gmail, Slack, Jira and 38 more apps connect through your Composio account: paste a Composio project key once, and Composio keeps those apps' sign-ins.` }],
      coordinacion: [{ text: `Boo Zero splits your request into jobs, hands them out, and pulls the results together in the chat.` }],
      aprobaciones: [{ text: `Risky tool calls that go through Clawboo ask you first, on any runtime.` }],
      desatendido: [{ text: `Every handoff is a real task on a durable board that survives restarts, and the team talks it through in one room.` }]
    },
    note: 'README: estudio de equipos de agentes con Boo Zero como jefe, varios runtimes, memoria compartida, rutinas, conectores y aprobaciones. La computadora es el entorno local; no hay VM aislada por agente.',
    release_highlight: '0.7.0: Cua Driver para que los agentes usen apps de su propia pantalla en Linux.',
    release_impact: 'Nuevo en el ranking: 79.50 A. Equipo y memoria fuertes; computadora local y ecosistema pequeño.'
  },
  {
    slug: 'rerun-build',
    tempSlug: 'rerun-build',
    repo: 'https://github.com/rerun-build/rerun',
    website: 'https://rerun.build',
    category: 'teams',
    summary: 'App open source de AI coworkers: el Chief of Staff contrata y coordina agentes con memoria, skills, computadora propia, rutinas, integraciones y aprobaciones, en local o en Rerun Cloud.',
    tagline: 'AI coworkers que trabajan mientras duermes.',
    setup: 'technical',
    platforms: ['macOS', 'Windows', 'Linux', 'Web'],
    channels: ['Chat', 'Email', 'Slack'],
    strengths: [
      'Chief of Staff que contrata y coordina coworkers',
      'Computadora propia con navegador y takeover',
      'Memoria, skills, rutinas e integraciones 200+',
      'Aprobaciones antes de enviar, pagar o borrar'
    ],
    weaknesses: [
      'Self-hosting requiere Docker, Node y Supabase',
      'Producto joven (octubre 2026) con poca validación pública',
      'El modelo y el coste corren por cuenta del usuario'
    ],
    comparison: 'Se acerca al listón en equipo, computadora y aprobaciones; todavía debe demostrar estabilidad y casos de uso a escala.',
    confidence: 60,
    pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
    dimensions: { capacidad: 82, autonomia: 82, computadora: 88, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 74 },
    evidence: {
      identidad: [{ text: `Each coworker gets a job, its own memory, its own skills and its own computer.` }],
      computadora: [{ text: `A browser and a screen you can watch, and take over at any time` }],
      memoria: [{ text: `a soul, skills, a memory that grows with every task` }],
      rutinas: [{ text: `Schedules and webhook triggers: the 7am run happens without you` }],
      apps: [{ text: `200+ ready integrations, any MCP server, Composio` }],
      coordinacion: [{ text: `One finds the leads, the next writes to them, a third files the result.` }],
      aprobaciones: [{ text: `They stop and ask before they send, pay or delete anything` }],
      desatendido: [{ text: `Schedules and webhook triggers: the 7am run happens without you` }]
    },
    note: 'README: Chief of Staff que crea y coordina coworkers con memoria, skills, computadora propia, rutinas, integraciones y aprobaciones. Self-hosting con Docker, Node y Supabase.',
    release_highlight: '0.15.0: los coworkers responden sobre la documentación y el Foreman estrena General con hilos.',
    release_impact: 'Nuevo en el ranking: 84.90 S. 8/8 pilares; self-hosting técnico y producto joven.'
  },
  {
    slug: 'cludegods',
    tempSlug: 'cludegods',
    repo: 'https://github.com/AKamaly/CludeGods',
    website: '',
    category: 'personal',
    summary: 'Toolkit para macOS que convierte Claude Code en un equipo de workers always-on con voz en tiempo real, computer use, memoria, horarios, espacios, Slack y aprobaciones por clic.',
    tagline: 'Claude Code con voz y workers always-on.',
    setup: 'moderate',
    platforms: ['macOS'],
    channels: ['Voz', 'Chat', 'Slack'],
    strengths: [
      'Voz en tiempo real y workers always-on sobre Claude Code',
      'Computer use con navegador, terminal y archivos',
      'Aprobaciones por clic y permisos por worker',
      'Spaces, Slack y memoria compartida'
    ],
    weaknesses: [
      'Solo macOS Apple Silicon; es un toolkit, no un producto hosted',
      'No coordina workers entre sí ni reparte trabajo automáticamente',
      'Proyecto pequeño (53 estrellas) y dependiente de Claude Code/VoiceMode'
    ],
    comparison: 'Excelente para voz y workers always-on en Mac, pero no es un equipo coordinado ni un producto multiplataforma como Grok Bot.',
    confidence: 58,
    pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: false, aprobaciones: true, desatendido: true },
    dimensions: { capacidad: 76, autonomia: 74, computadora: 78, memoria: 84, rutinas: 86, equipo: 55, confianza: 84, producto: 54 },
    evidence: {
      identidad: [{ text: `Each worker is its own Claude Code chat with a name, a role, a god, a voice and its own hours.` }],
      computadora: [{ text: `Computer use: browser, terminal & files` }],
      memoria: [{ text: `A built-in Memory space holds the rules every worker reads before it starts; it changes only through a draft you approve, whatever the setting.` }],
      rutinas: [{ text: `Give a worker a schedule, and the pane wakes it at that time: to run its charter if it has one, or to check in on its role if not.` }],
      apps: [{ text: `mention a worker in your own Slack workspace and it answers in the thread` }],
      aprobaciones: [{ text: `Permissions by click, never by voice` }],
      desatendido: [{ text: `Give a worker a schedule, and the pane wakes it at that time: to run its charter if it has one, or to check in on its role if not.` }]
    },
    note: 'README: toolkit macOS sobre Claude Code y VoiceMode con workers always-on, voz, computer use, memoria, horarios, Spaces, Slack y aprobaciones por clic. No hay evidencia de coordinación entre workers.',
    release_highlight: '0.5.0: instalación en una línea, voz guiada y plantillas de workers.',
    release_impact: 'Nuevo en el ranking: 73.20 A. 7/8 pilares; sin coordinación entre workers y solo macOS.'
  },
  {
    slug: 'cubebot',
    tempSlug: 'cubebot',
    repo: 'https://github.com/vicotrbb/cubebot',
    website: 'https://cubebot.io',
    category: 'teams',
    summary: 'Plataforma self-hosted para un equipo de agentes persistentes: cada uno con memoria, workspace y computadora aislada (KVM o contenedor), salas, equipos, tareas, rutinas, conectores y aprobaciones.',
    tagline: 'Agentes persistentes en tu propia infraestructura.',
    setup: 'technical',
    platforms: ['Linux', 'macOS', 'Web'],
    channels: ['Chat', 'Voz'],
    strengths: [
      'Aislamiento fuerte: KVM o contenedor por agente',
      'Salas, equipos, org chart y orquestador de tareas',
      'Memoria, rutinas, 34 conectores y voz',
      'Grants, aprobaciones, auditoría y SSO'
    ],
    weaknesses: [
      'Instalación y operación técnica (Docker/Kubernetes)',
      'Proyecto joven y de nicho (119 estrellas)',
      'El orquestador necesita el socket de Docker, con riesgo de privilegios'
    ],
    comparison: 'Tiene la infraestructura y el aislamiento que Grok Bot promete, pero su operación es técnica y su producto aún es joven.',
    confidence: 62,
    pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
    dimensions: { capacidad: 82, autonomia: 78, computadora: 92, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 62 },
    evidence: {
      identidad: [{ text: `Each agent has its own name, memory, workspace and computer.` }],
      computadora: [{ text: `Each agent runs in its own sandbox, a KVM virtual machine or a container, with a terminal, a browser and a desktop you can watch live.` }],
      memoria: [{ text: `One permanent conversation, one memory and one workspace per agent, kept across restarts, upgrades and moves.` }],
      rutinas: [{ text: `Schedule recurring work, see every agent's runs on one calendar, and layer in your own calendars.` }],
      apps: [{ text: `34 of them, including GitHub, Google, Microsoft 365, Slack, Notion, Linear, Jira and Home Assistant, plus any MCP server.` }],
      coordinacion: [{ text: `Talk to one agent, mention several in a room, or group them into teams with an org chart. Describe an outcome in Tasks and the orchestrator splits the work across the right agents.` }],
      aprobaciones: [{ text: `Grants per agent and connection, approvals for sensitive actions, an encrypted vault, an audit log, single sign-on with OpenID Connect, and backups to S3.` }],
      desatendido: [{ text: `Idle agents sleep, then "dream" to tidy their memory, and you can see what changed.` }, { text: `Schedule recurring work, see every agent's runs on one calendar, and layer in your own calendars.` }]
    },
    note: 'README: plataforma self-hosted con agentes persistentes, sandbox KVM/contenedor, salas, equipos, orquestador, rutinas, conectores, voz, grants y auditoría. Instalación técnica con Docker o Kubernetes.',
    release_highlight: '0.2.15: actualización de dependencias; sin cambios funcionales mayores.',
    release_impact: 'Nuevo en el ranking: 83.10 S. 8/8 pilares; producto técnico y de nicho.'
  },
  {
    slug: 'rakazo',
    tempSlug: 'rakazo',
    repo: 'https://github.com/elie222/rakazo',
    website: 'https://rakazo.com',
    category: 'teams',
    summary: 'Alternativa open source a Grok Bot con bots persistentes, memoria, rutinas, computadora y navegador, grupos y delegación, miles de integraciones y apps web, escritorio y móvil.',
    tagline: 'Tus AI teammates, en tus propios servidores.',
    setup: 'moderate',
    platforms: ['macOS', 'Windows', 'Linux', 'Web', 'iOS', 'Android'],
    channels: ['Chat', 'Email', 'Slack', 'Voz'],
    strengths: [
      'Bots persistentes con computadora, navegador y escritorio',
      'Grupos, delegación y subagentes',
      'Rutinas, memoria, miles de apps y MCP',
      'Web, escritorio, iPhone/iPad y Android'
    ],
    weaknesses: [
      'Self-hosting requiere Docker y varios secretos',
      'Muchas integraciones dependen de Composio/Pipedream',
      'Producto en evolución con 218 issues abiertos'
    ],
    comparison: 'Cubre casi todas las piezas de Grok Bot con más adopción y multiplataforma; le falta madurez operativa y evidencias públicas de escala.',
    confidence: 68,
    pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
    dimensions: { capacidad: 82, autonomia: 80, computadora: 87, memoria: 90, rutinas: 90, equipo: 88, confianza: 90, producto: 79 },
    evidence: {
      identidad: [{ text: `Persistent AI teammates with their own memory, routines, apps, and computer.` }],
      computadora: [{ text: `A browser, terminal, files, and a full desktop. Watch it work, take control to sign in, and hand it back.` }],
      memoria: [{ text: `Persistent AI teammates with their own memory, routines, apps, and computer.` }],
      rutinas: [{ text: `Run a bot on a schedule, from an email, or from a webhook, and see every run.` }],
      apps: [{ text: `Gmail, Slack, GitHub, Notion, Linear and thousands more, plus your own MCP servers and OpenAPI tools.` }],
      coordinacion: [{ text: `Put bots in a group and @mention them. They split the work, check each other, and report back.` }],
      aprobaciones: [{ text: `Decide which actions need your approval.`, home: true, source: 'https://rakazo.com' }],
      desatendido: [{ text: `Keeps working while your computer is off.`, home: true, source: 'https://rakazo.com' }, { text: `Run a bot on a schedule, from an email, or from a webhook, and see every run.` }]
    },
    note: 'README y web: bots persistentes con computadora/navegador, grupos, delegación, rutinas, memoria, integraciones y aprobaciones. Self-hosting con Docker; apps web, escritorio y móvil.',
    release_highlight: '0.11.0: computadora local sin Docker en Mac, DMs de Teams y rutinas que vigilan una URL.',
    release_impact: 'Nuevo en el ranking: 85.00 S. 8/8 pilares; la alternativa más completa a Grok Bot por producto.'
  }
]

const rows = NEW.map(p => {
  const meta = metaFor(p.tempSlug, p.slug)
  const total = Math.round(Object.entries(WEIGHTS).reduce((sum, [k, w]) => sum + p.dimensions[k] * w, 0) * 100) / 100
  const agency = Object.entries(p.pillars).reduce((sum, [k, on]) => sum + (on ? AGENCY_WEIGHTS[k] : 0), 0)
  return {
    slug: p.slug,
    name: meta.name,
    full_name: meta.full_name,
    maker: meta.owner?.login || meta.full_name.split('/')[0],
    repo: p.repo,
    website: p.website,
    license: meta.license?.spdx_id || null,
    licenseType: 'Open source',
    language: meta.language || '',
    stars: meta.stargazers_count || 0,
    forks: meta.forks_count || 0,
    open_issues: meta.open_issues_count || 0,
    pushed_at: meta.pushed_at || '',
    created_at: meta.created_at || '',
    last_release: null,
    releases_recent: [],
    releases_90: 0,
    release_status: 'sin revisar',
    release_source: 'none',
    release_checked_at: null,
    topics: meta.topics || [],
    kind: 'agent',
    category: p.category,
    summary: p.summary,
    tagline: p.tagline,
    strengths: p.strengths,
    weaknesses: p.weaknesses,
    comparison: p.comparison,
    confidence: p.confidence,
    judged_day: TODAY,
    pillars: p.pillars,
    evidence: evidence(p.repo, p.evidence),
    dimensions: p.dimensions,
    total,
    tier: tierFor(total),
    agency,
    sources: sourcesFor(p.repo, p.website),
    setup: p.setup,
    platforms: p.platforms,
    channels: p.channels,
    release_highlight: p.release_highlight,
    release_impact: p.release_impact
  }
})

// Copia evidencia documental al árbol de research.
for (const p of NEW) {
  const dir = join(researchRoot, p.slug)
  mkdirSync(dir, { recursive: true })
  for (const name of ['readme.md', 'homepage.txt', 'meta.json']) {
    const source = join(temp, p.tempSlug, name)
    if (existsSync(source)) copyFileSync(source, join(dir, name))
  }
  writeFileSync(join(dir, 'sources.json'), JSON.stringify(rows.find(r => r.slug === p.slug).sources, null, 2) + '\n', 'utf8')
}

const bySlug = new Map(index.projects.map(p => [p.slug, p]))
for (const row of rows) {
  const prev = bySlug.get(row.slug)
  if (prev) {
    for (const key of ['last_release', 'last_release_tag', 'last_release_url', 'last_release_days', 'releases_90', 'releases_recent', 'release_note', 'release_status', 'release_source', 'release_checked_at', 'release_http', 'changelog_url']) {
      if (prev[key] !== undefined) row[key] = prev[key]
    }
  }
  bySlug.set(row.slug, row)
}

// Suparagent ya existía como Open Duet; actualizamos nombre, repo y ficha sin cambiar el slug.
const supMeta = metaFor('suparagent', 'anil-matcha-open-duet')
const sup = bySlug.get('anil-matcha-open-duet')
if (sup) {
  const dims = { capacidad: 82, autonomia: 78, computadora: 85, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 63 }
  const total = Math.round(Object.entries(WEIGHTS).reduce((sum, [k, w]) => sum + dims[k] * w, 0) * 100) / 100
  Object.assign(sup, {
    name: 'suparagent',
    full_name: 'Anil-matcha/suparagent',
    maker: 'Anil-matcha',
    repo: 'https://github.com/Anil-matcha/suparagent',
    website: 'https://suparagent.ai',
    license: 'Apache-2.0',
    language: supMeta.language,
    stars: supMeta.stargazers_count,
    forks: supMeta.forks_count,
    open_issues: supMeta.open_issues_count,
    pushed_at: supMeta.pushed_at,
    created_at: supMeta.created_at,
    topics: supMeta.topics || [],
    summary: 'Alternativa open source y autoalojable a Grok Bot y Claude Duet: agentes con nombre, memoria, rutinas, computadora aislada propia y aprobación antes de actuar; ahora con espacios compartidos, roles y permisos.',
    tagline: 'Equipo de agentes con computadoras aisladas.',
    strengths: [
      'Replica casi todo el listón: computadora aislada, rutinas, memoria y aprobaciones',
      'Espacios compartidos con miembros, roles y permisos',
      'Autoalojable, con app de escritorio y servicio alojado opcional'
    ],
    weaknesses: [
      'En desarrollo activo, con limitaciones reconocidas para trabajo importante',
      'El autoalojamiento añade fricción operativa',
      'Poca evidencia pública de tests, escala y casos de uso reales'
    ],
    comparison: 'Es de lo más cercano en concepto a Grok Bot dentro del open source; los espacios compartidos mejoran el equipo, pero su madurez sigue por demostrar.',
    confidence: 60,
    dimensions: dims,
    total,
    tier: tierFor(total),
    agency: 100,
    release_highlight: '0.8.6: espacios compartidos con miembros, roles y permisos; móvil chat-first y cambio de modelo.',
    release_impact: 'Sube de 80.55 a 82.20 S por espacios compartidos, roles/permisos y móvil.'
  })
  sup.evidence = {
    ...(sup.evidence || {}),
    coordinacion: [
      ...(sup.evidence?.coordinacion || []),
      { text: 'Share a server install with other people: members, roles and permissions', source: 'https://github.com/Anil-matcha/suparagent/releases/tag/v0.8.6' }
    ],
    aprobaciones: [
      ...(sup.evidence?.aprobaciones || []),
      { text: 'Share a server install with other people: members, roles and permissions', source: 'https://github.com/Anil-matcha/suparagent/releases/tag/v0.8.6' }
    ]
  }
  sup.sources = sourcesFor('https://github.com/Anil-matcha/suparagent', 'https://suparagent.ai')
}

index.projects = [...bySlug.values()].sort((a, b) => b.total - a.total || b.agency - a.agency)
index.generated_at = TODAY
index.count = index.projects.length
writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf8')

// Overrides editoriales para que rebuild-research.mjs sea reproducible.
for (const p of NEW) {
  const row = rows.find(r => r.slug === p.slug)
  overrides[p.slug] = {
    category: p.category,
    tagline: p.tagline,
    summary: p.summary,
    setup: p.setup,
    platforms: p.platforms,
    channels: p.channels,
    pillars: p.pillars,
    dimensions: p.dimensions,
    strengths: p.strengths,
    weaknesses: p.weaknesses,
    comparison: p.comparison,
    evidence: row.evidence,
    note: p.note,
    release_highlight: p.release_highlight,
    release_impact: p.release_impact
  }
}
overrides['anil-matcha-open-duet'] = {
  category: 'teams',
  tagline: sup.tagline,
  summary: sup.summary,
  setup: 'technical',
  platforms: ['macOS', 'Windows', 'Linux', 'Web'],
  channels: ['Chat', 'Telegram'],
  pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
  dimensions: sup.dimensions,
  strengths: sup.strengths,
  weaknesses: sup.weaknesses,
  comparison: sup.comparison,
  evidence: {
    identidad: [{ text: 'Give agents a name, role, engine, workspace, memory, and approval settings.', source: 'https://github.com/Anil-matcha/suparagent#readme' }],
    computadora: [{ text: 'Docker is only needed for the optional isolated agent computers.', source: 'https://github.com/Anil-matcha/suparagent#readme' }],
    memoria: [{ text: 'Suparagent keeps conversations, memory, routines, and approvals in one place.', source: 'https://github.com/Anil-matcha/suparagent#readme' }],
    rutinas: [{ text: 'Add teammates or create a routine when you want to split up or repeat work.', source: 'https://github.com/Anil-matcha/suparagent#readme' }],
    coordinacion: [
      { text: 'A lead can delegate work to specialists or coordinate agents in shared rooms.', source: 'https://github.com/Anil-matcha/suparagent#readme' },
      { text: 'Share a server install with other people: members, roles and permissions', source: 'https://github.com/Anil-matcha/suparagent/releases/tag/v0.8.6' }
    ],
    aprobaciones: [
      { text: 'a routine never approves an action by itself.', source: 'https://github.com/Anil-matcha/suparagent#readme' },
      { text: 'Share a server install with other people: members, roles and permissions', source: 'https://github.com/Anil-matcha/suparagent/releases/tag/v0.8.6' }
    ],
    desatendido: [{ text: 'Create routines for scheduled, webhook, or manual runs.', source: 'https://github.com/Anil-matcha/suparagent#readme' }]
  },
  note: 'Revisión de release v0.8.6 (2026-11-11): espacios compartidos con miembros, roles y permisos, móvil chat-first y cambio de modelo. Se mantiene el slug histórico anil-matcha-open-duet.',
  release_highlight: sup.release_highlight,
  release_impact: sup.release_impact
}
writeFileSync(overridesPath, JSON.stringify(overrides, null, 2) + '\n', 'utf8')

console.log(`OK ${index.count} agentes en el índice`)
for (const row of rows) console.log(`${row.total} | ${row.tier} | ADN ${row.agency} | ${row.full_name}`)
console.log(`${sup.total} | ${sup.tier} | ADN ${sup.agency} | ${sup.full_name} (actualizado)`)

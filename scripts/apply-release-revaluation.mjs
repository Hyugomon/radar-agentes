/**
 * Revaluación post-revisión de releases (2026-11-15).
 * Aplica solo cambios justificados por capacidades nuevas documentadas.
 *
 * - Rowboat v1.0.9: Spaces, AI teammates, roles, aprobaciones, superagentes y web/móvil.
 * - Maestri 0.59.0: Computer Use con aprobación por app y Maestri Remote.
 * - OpenChamber v2.7.2: share pages, PDF anotado y navegador controlado.
 * - Paseo 0.16.0-beta.2: background tasks con Stop, plugins y composer controls.
 * - Jean 1.0.15: QwenCloud, Claude Fable 5.2 y CLIProxyAPI.
 * - T3 Code nightly 2026-11-15: reanudar Cursor, compactar contexto y diffs grandes de PR.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const agentsPath = join(root, 'research', 'overrides.json')
const adesPath = join(root, 'research', 'ades', 'overrides.json')
const agents = JSON.parse(readFileSync(agentsPath, 'utf8'))
const ades = JSON.parse(readFileSync(adesPath, 'utf8'))

const RELEASE = 'https://github.com/rowboatlabs/rowboat/releases/tag/v1.0.9'

agents['rowboatlabs-rowboat'] = {
  category: 'teams',
  tagline: 'Tu equipo de AI coworkers con memoria.',
  summary: 'Asistente open source que organiza equipos de AI coworkers en Spaces: agentes hosted o locales con rol y personalidad, tableros compartidos, aprobaciones y acceso web/móvil, sobre una memoria en grafo y correo integrado.',
  comparison: 'Ya compite como equipo de AI coworkers con roles, aprobaciones y Spaces, pero sigue por debajo de Grok Bot en computadora propia persistente y trabajo desatendido.',
  setup: 'moderate',
  platforms: ['macOS', 'Windows', 'Linux', 'Web', 'iOS'],
  channels: ['Chat', 'Email', 'Reuniones', 'Web'],
  pillars: {
    identidad: true,
    computadora: false,
    memoria: true,
    rutinas: false,
    apps: false,
    coordinacion: true,
    aprobaciones: true,
    desatendido: false
  },
  dimensions: {
    capacidad: 80,
    autonomia: 68,
    computadora: 60,
    memoria: 90,
    rutinas: 60,
    equipo: 82,
    confianza: 78,
    producto: 76
  },
  strengths: [
    'Equipos de AI coworkers en Spaces: agentes hosted o locales con rol, personalidad y espacio compartido',
    'Aprobaciones dentro de la conversación y superagentes que crean y delegan en otros agentes',
    'Memoria en grafo, correo, reuniones y archivos compartidos, con acceso web y móvil'
  ],
  weaknesses: [
    'No documenta una computadora propia persistente: orquesta agentes hosted o locales, no un escritorio completo',
    'Las rutinas programadas y el trabajo desatendido siguen sin evidencia clara',
    'El stack TypeScript y la coordinación de varios agentes pueden encarecer cada tarea'
  ],
  note: 'Revisión de release v1.0.9 (2026-11-11): Spaces con AI teammates, roles y personalidades, agentes hosted Hermes/Claude Code/Codex, Composio, superagentes que delegan, aprobaciones y acceso web/móvil. Se marcan Identidad, Coordinación y Aprobaciones. Computadora sigue en falso: no se documenta un entorno persistente propio.',
  evidence: {
    identidad: [
      { text: 'Give them roles and personalities, add them to a shared space, and let them work alongside you and each other.', source: RELEASE }
    ],
    coordinacion: [
      { text: 'Managed agents gain Composio integrations for connected services, and super agents can create other agents to delegate work to, with permission prompts on by default.', source: RELEASE }
    ],
    aprobaciones: [
      { text: 'Choose who can ask each agent for help, follow its progress, and handle approvals in the conversation.', source: RELEASE }
    ]
  },
  release_highlight: 'v1.0.9: Spaces con AI teammates, roles, agentes hosted y aprobaciones; superagentes y Composio.',
  release_impact: 'Sube a Tier A (+8.05): Equipo 55→82 y Confianza 55→78; Identidad, Coordinación y Aprobaciones pasan a ON. Computadora sigue en falso.'
}

ades['maestri'] = {
  ...ades['maestri'],
  summary: 'Canvas visual donde cada agente tiene rol, terminal y contexto; ahora con Computer Use que pide permiso por app y control remoto mientras estás fuera.',
  scores: {
    harnesses: 84,
    paralelo: 80,
    orquestacion: 84,
    revision: 75,
    remoto: 70,
    movil: 78,
    extensiones: 55,
    control: 70,
    abierto: 40,
    producto: 74
  },
  strengths: [
    'Canvas visual muy claro',
    'Computer Use con aprobación por app',
    'Control remoto desde Maestri Remote',
    'Roles y flujos de agentes'
  ],
  weaknesses: [
    'Cerrado',
    'Extensiones/MCP limitados',
    'Computer Use depende de permisos y app por app'
  ],
  evidence: {
    ...(ades['maestri'].evidence || {}),
    control: [
      { text: 'They ask before using each app, and you can answer on your computer or from Maestri Remote.', source: 'https://themaestri.app/en/changelog' }
    ],
    remoto: [
      { text: 'An agent can also ask to control the whole computer with your pointer and keyboard while you are away.', source: 'https://themaestri.app/en/changelog' }
    ]
  },
  release_highlight: '0.59.0: Computer Use con aprobación por app y control remoto desde Maestri Remote.',
  release_impact: 'Tier A (+2.12): Control 55→70 y Remoto 65→70; Computer Use y Remote lo justifican.'
}

ades['openchamber'] = {
  ...ades['openchamber'],
  summary: 'Entorno de desarrollo agéntico open source con sesiones, extensiones, revisión, share pages para pedir ayuda a personas y un navegador que actúa como humano.',
  scores: {
    harnesses: 84,
    paralelo: 82,
    orquestacion: 75,
    revision: 80,
    remoto: 84,
    movil: 82,
    extensiones: 78,
    control: 68,
    abierto: 90,
    producto: 79
  },
  strengths: [
    'Open source y multiplataforma',
    'Share pages para colaborar con personas',
    'Navegador controlado y PDF anotado',
    'Buena adopción'
  ],
  weaknesses: [
    'Orquestación menos profunda',
    'Aprobaciones todavía básicas',
    'Ecosistema joven'
  ],
  evidence: {
    ...(ades['openchamber'].evidence || {}),
    revision: [
      { text: 'New Share pages: an agent can ask your teammates. When an answer has to come from someone else, the agent sends them a page, and the chat shows a link and PIN for each person.', source: 'https://github.com/openchamber/openchamber/releases/tag/v2.7.2' }
    ],
    remoto: [
      { text: 'Share pages: a shared link pasted into the composer opens the page in your own OpenChamber, so your agent sees it too.', source: 'https://github.com/openchamber/openchamber/releases/tag/v2.7.2' }
    ]
  },
  release_highlight: 'v2.7.2: share pages con PIN, PDF anotado y navegador que actúa como humano.',
  release_impact: 'Tier A (+1.78): Revisión 76→80, Orquestación 72→75, Remoto 80→84 y Producto 76→79.'
}

ades['paseo'] = {
  ...ades['paseo'],
  summary: 'Workspace para acceder a sesiones de agentes de código desde distintos dispositivos, con worktrees, plugins, tareas en segundo plano y orquestación.',
  scores: {
    harnesses: 88,
    paralelo: 86,
    orquestacion: 84,
    revision: 76,
    remoto: 84,
    movil: 88,
    extensiones: 84,
    control: 70,
    abierto: 50,
    producto: 82
  },
  strengths: [
    'Móvil y acceso entre dispositivos',
    'Plugins y worktrees',
    'Tareas en segundo plano con Stop por tarea',
    'Open source'
  ],
  weaknesses: [
    'Revisión y PRs no son el foco',
    'SSH no verificado',
    'Orquestación más de sesiones que de tareas'
  ],
  evidence: {
    ...(ades['paseo'].evidence || {}),
    control: [
      { text: 'Background tasks: Paseo now shows the background tasks an agent is running, such as shells and monitors, above the composer, with a Stop button for each.', source: 'https://github.com/getpaseo/paseo/releases/tag/v0.16.0-beta.2' }
    ],
    extensiones: [
      { text: 'Plugin sidebar views: A plugin can replace the sidebar content with its own layout of workspaces, agents, projects and terminals across every connected host.', source: 'https://github.com/getpaseo/paseo/releases/tag/v0.16.0-beta.2' }
    ]
  },
  release_highlight: '0.16.0-beta.2: tareas en segundo plano con Stop, plugins con vistas de sidebar y controles de composer.',
  release_impact: 'Tier A (+1.16): Control 65→70, Extensiones 80→84 y Producto 80→82.'
}

ades['jean'] = {
  ...ades['jean'],
  summary: 'Workspace open source para agentes de código, worktrees, MCP y entrega con GitHub, con acceso local, SSH o servidor propio y más proveedores como QwenCloud y CLIProxyAPI.',
  scores: {
    harnesses: 88,
    paralelo: 84,
    orquestacion: 78,
    revision: 80,
    remoto: 84,
    movil: 80,
    extensiones: 70,
    control: 65,
    abierto: 90,
    producto: 80
  },
  strengths: [
    'Local, SSH o self-hosted',
    'Worktrees y PRs',
    'QwenCloud, Claude Fable 5.2 y CLIProxyAPI',
    'Open source'
  ],
  weaknesses: [
    'Sin foco en orquestación multi-agente',
    'Extensiones limitadas',
    'Menos adopción'
  ],
  evidence: {
    ...(ades['jean'].evidence || {}),
    harnesses: [
      { text: 'Added QwenCloud provider presets with region and billing mode selection and automatic model fetching. Added CLIProxyAPI as a provider for every backend, with an option to pick it as the default provider.', source: 'https://github.com/coollabsio/jean/releases/tag/v1.0.15' }
    ]
  },
  release_highlight: '1.0.15: QwenCloud, Claude Fable 5.2 y CLIProxyAPI como proveedor para todos los backends.',
  release_impact: 'Tier A (+0.92): Harnesses 86→88, Extensiones 65→70 y Producto 78→80.'
}

ades['t3-code'] = {
  ...ades['t3-code'],
  scores: {
    harnesses: 95,
    paralelo: 92,
    orquestacion: 86,
    revision: 89,
    remoto: 88,
    movil: 84,
    extensiones: 82,
    control: 74,
    abierto: 95,
    producto: 91
  },
  strengths: [
    'Open source con mucha adopción',
    'Acceso remoto y móvil',
    'Multi-harness y worktrees',
    'Revisión de PRs grandes y reanudación de Cursor'
  ],
  weaknesses: [
    'Cambios frecuentes entre Nightly y Stable',
    'No trae modelo propio',
    'La revisión es más de workspace que de code review profundo'
  ],
  evidence: {
    ...(ades['t3-code'].evidence || {}),
    revision: [
      { text: 'Resume a stopped Cursor turn from its latest checkpoint without sending a new message. Load a pull request file diff on demand when it is too large to show automatically.', source: 'https://github.com/pingdotgg/t3code/releases/tag/v0.1.10-nightly.20261115.4723' }
    ]
  },
  release_highlight: 'Nightly 2026-11-15: reanudar turnos de Cursor, compactar contexto y cargar diffs grandes de PR.',
  release_impact: 'Tier S (+0.58): Revisión 86→89, Control 72→74 y Producto 90→91.'
}

writeFileSync(agentsPath, JSON.stringify(agents, null, 2) + '\n', 'utf8')
writeFileSync(adesPath, JSON.stringify(ades, null, 2) + '\n', 'utf8')
console.log('OK overrides actualizados: Rowboat + Maestri, OpenChamber, Paseo, Jean, T3 Code')

/**
 * Genera data/agents.json para el ranking de PRODUCTOS.
 *
 * Regla editorial:
 * - Solo entran agentes/bots que una persona puede usar como producto final.
 * - Grok Bot es el listón (SS) y se puntúa contra sus piezas: identidad,
 *   computadora propia, memoria, rutinas, apps reales, coordinación,
 *   aprobaciones y trabajo desatendido.
 * - Frameworks, SDKs y runtimes (LangChain, LangGraph, CrewAI, AutoGen,
 *   OpenAI Agents SDK, etc.) NO entran: no son agentes, son piezas.
 *
 * Ejecutar: node scripts/build-products.mjs
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'data', 'agents.json')

const DIMENSIONS = [
  { key: 'capacidad', label: 'Capacidad', hint: 'Qué puede hacer de verdad: tareas largas, herramientas, apps, voz, archivos.', weight: 0.15 },
  { key: 'autonomia', label: 'Autonomía', hint: 'Cuánto trabaja sin ti: planifica, corrige y sigue en segundo plano.', weight: 0.15 },
  { key: 'computadora', label: 'Computadora', hint: 'Entorno propio persistente: navegador, terminal, archivos y apps reales.', weight: 0.15 },
  { key: 'memoria', label: 'Memoria', hint: 'Contexto que sobrevive a la conversación: preferencias, archivos, aprendizajes.', weight: 0.10 },
  { key: 'rutinas', label: 'Rutinas', hint: 'Skills y trabajo programado o por evento, sin que se lo pidas cada vez.', weight: 0.10 },
  { key: 'equipo', label: 'Equipo', hint: 'Varios bots con rol propio que se pasan trabajo y coordinan.', weight: 0.10 },
  { key: 'confianza', label: 'Confianza', hint: 'Aprobaciones, permisos, límites y control sobre lo irreversible.', weight: 0.10 },
  { key: 'producto', label: 'Producto', hint: 'Facilidad de uso, canales, estabilidad, precio y soporte.', weight: 0.15 }
]

const PILLARS = [
  { key: 'identidad', label: 'Identidad', hint: 'El bot tiene nombre y rol propio; no es solo un chat.', weight: 10 },
  { key: 'computadora', label: 'Computadora propia', hint: 'Navegador, terminal, archivos y sesiones que sobreviven a la tarea.', weight: 18 },
  { key: 'memoria', label: 'Memoria', hint: 'Recuerda y acumula contexto por bot.', weight: 10 },
  { key: 'rutinas', label: 'Rutinas', hint: 'Ejecuta trabajo programado o por evento sin prompt.', weight: 16 },
  { key: 'apps', label: 'Apps reales', hint: 'Opera sitios y programas reales, no solo APIs.', weight: 14 },
  { key: 'coordinacion', label: 'Coordinación', hint: 'Varios bots se reparten el trabajo y lo entregan juntos.', weight: 12 },
  { key: 'aprobaciones', label: 'Aprobaciones', hint: 'Pide permiso antes de publicar, pagar o borrar.', weight: 10 },
  { key: 'desatendido', label: 'Desatendido', hint: 'Sigue trabajando mientras no estás conectado.', weight: 10 }
]

const TIERS = [
  { name: 'SS', floor: 92 },
  { name: 'S', floor: 85 },
  { name: 'A', floor: 75 },
  { name: 'B', floor: 65 },
  { name: 'C', floor: 55 },
  { name: 'D', floor: 45 },
  { name: 'E', floor: 35 },
  { name: 'F', floor: 0 }
]

const CAT_LABEL = {
  reference: 'Referencia',
  hosted: 'Comercial',
  open: 'Open source',
  teams: 'Equipos'
}

const PRICE_LABEL = {
  free: 'Gratis',
  freemium: 'Freemium',
  paid: 'Pago',
  invite: 'Invitación',
  unknown: 'Sin verificar'
}

const SETUP_LABEL = {
  easy: 'Fácil',
  moderate: 'Medio',
  technical: 'Técnico'
}

const MATURITY_LABEL = {
  released: 'Released',
  beta: 'Beta',
  prototype: 'Prototipo'
}

const f = (o = {}) => ({
  identity: true,
  computer: false,
  memory: false,
  routines: false,
  apps: false,
  multiBot: false,
  coordination: false,
  approvals: false,
  background: false,
  ...o
})

const PRODUCTS = [
  {
    id: 'grok-bot',
    name: 'Grok Bot',
    maker: 'xAI',
    tagline: 'AI teammates with their own computer.',
    summary: 'El listón. Varios bots con nombre que comparten una computadora en la nube con navegador, terminal y archivos; memoria, skills y rutinas, y aprobaciones antes de actuar.',
    website: 'https://x.ai/bot',
    docs: 'https://docs.x.ai/grok-bot/overview',
    cat: 'reference',
    license: null,
    pricing: 'paid',
    priceNote: 'Desde US$30/mes',
    setup: 'easy',
    maturity: 'released',
    platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android', 'Slack', 'X'],
    models: 'Propio (Grok)',
    channels: ['Chat', 'Voz', 'Slack', 'X'],
    scores: { capacidad: 96, autonomia: 94, computadora: 99, memoria: 94, rutinas: 96, equipo: 94, confianza: 88, producto: 94 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 88,
    strengths: [
      'Varios bots con rol e identidad propia, no un solo chat',
      'Computadora persistente con navegador, terminal, archivos y logins',
      'Skills que se guardan y rutinas que corren solas; aprobaciones antes de lo delicado'
    ],
    weaknesses: [
      'Atado al modelo y al ecosistema de xAI; no eliges otro proveedor',
      'La computadora es compartida entre bots: no es una frontera de seguridad',
      'Precio de suscripción más consumo; no es self-hosted'
    ],
    comparison: 'Es la referencia: cualquier producto que quiera competir tiene que igualar identidad, computadora, memoria, rutinas y coordinación al mismo tiempo.',
    sources: [
      { label: 'Grok Bot · documentación oficial', url: 'https://docs.x.ai/grok-bot/overview' },
      { label: 'Grok Bot · producto', url: 'https://x.ai/bot' }
    ]
  },
  {
    id: 'openai-dots',
    name: 'OpenAI Dots',
    maker: 'OpenAI',
    tagline: 'An agent that keeps your projects moving.',
    summary: 'El agente siempre activo de OpenAI: computadora y navegador propios, memoria, skills y rutinas dentro de ChatGPT. Le falta el equipo de varios bots que sí tiene Grok Bot.',
    website: 'https://chatgpt.com/features/dots/',
    cat: 'hosted',
    license: null,
    pricing: 'paid',
    priceNote: 'Incluido en planes Pro/Business',
    setup: 'easy',
    maturity: 'released',
    platforms: ['Web', 'macOS', 'Windows'],
    models: 'Propio (OpenAI)',
    channels: ['Chat', 'Voz'],
    scores: { capacidad: 94, autonomia: 92, computadora: 96, memoria: 90, rutinas: 92, equipo: 72, confianza: 88, producto: 92 },
    features: f({ computer: true, memory: true, routines: true, apps: true, approvals: true, background: true }),
    confidence: 82,
    strengths: [
      'Computadora y navegador gestionados por OpenAI, con muy poco setup',
      'Memoria, skills y trabajo en segundo plano dentro de ChatGPT',
      'Aprobaciones y controles de cuenta maduros'
    ],
    weaknesses: [
      'Un solo agente por cuenta/proyecto: no hay equipo de bots con roles',
      'Menos control sobre el entorno que una alternativa self-hosted',
      'Depende del plan y de los límites de uso de ChatGPT'
    ],
    comparison: 'Hace casi todo lo de Grok Bot para una sola persona; pierde en la coordinación de varios bots y en la libertad de modelo.',
    sources: [
      { label: 'OpenAI Dots · página oficial', url: 'https://chatgpt.com/features/dots/' }
    ]
  },
  {
    id: 'meta-muse',
    name: 'Meta Muse',
    maker: 'Meta',
    tagline: 'A personal agent for everyday life.',
    summary: 'El agente personal de Meta: VM dedicada, memoria, navegador y rutinas, con apps de móvil y escritorio. Su coordinación multi-bot es más limitada que la de Grok Bot.',
    website: 'https://ai.meta.com/muse/',
    cat: 'hosted',
    license: null,
    pricing: 'freemium',
    priceNote: 'Gratis con límites + planes',
    setup: 'easy',
    maturity: 'released',
    platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'],
    models: 'Propio (Meta)',
    channels: ['Chat', 'Voz'],
    scores: { capacidad: 90, autonomia: 88, computadora: 94, memoria: 90, rutinas: 88, equipo: 84, confianza: 84, producto: 86 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 78,
    strengths: [
      'VM dedicada y navegador, con integración en el ecosistema Meta',
      'Memoria y rutinas para uso personal diario',
      'Apps móviles y de escritorio desde el primer día'
    ],
    weaknesses: [
      'Coordinación de bots menos profunda que la de Grok Bot',
      'Dependencia total del ecosistema Meta',
      'Disponibilidad y límites varían por región y plan'
    ],
    comparison: 'Se parece a Grok Bot en computadora y memoria; queda atrás en equipo de bots y en libertad de modelo.',
    sources: [
      { label: 'Meta Muse · página oficial', url: 'https://ai.meta.com/muse/' }
    ]
  },
  {
    id: 'cue',
    name: 'Cue',
    maker: 'Manus',
    tagline: 'Agents with their own identity, memory and tools.',
    summary: 'Agentes con identidad propia, memoria y herramientas, nacidos en el móvil. Más fuerte en conversación, canales y coordinación que en una computadora completa.',
    website: 'https://cue.im/',
    cat: 'hosted',
    license: null,
    pricing: 'invite',
    priceNote: 'Invitación + planes in-app',
    setup: 'easy',
    maturity: 'released',
    platforms: ['Web', 'iOS', 'Android'],
    models: 'Propio / mixto',
    channels: ['Chat', 'Voz', 'Email', 'WhatsApp'],
    scores: { capacidad: 88, autonomia: 86, computadora: 82, memoria: 90, rutinas: 88, equipo: 88, confianza: 82, producto: 84 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 72,
    strengths: [
      'Varios agentes con identidad y memoria propia, y chats de grupo',
      'Canales de mensajería y telefonía muy cuidados',
      'Rutinas y herramientas conectadas sin setup técnico'
    ],
    weaknesses: [
      'Acceso por invitación: no está disponible para cualquiera',
      'Computadora menos completa que la de Grok Bot',
      'Precios y límites cambian según región y plan'
    ],
    comparison: 'Es el competidor más cercano en identidad y coordinación; pierde en computadora persistente y disponibilidad abierta.',
    sources: [
      { label: 'Cue · página oficial', url: 'https://cue.im/' }
    ]
  },
  {
    id: 'mausbot',
    name: 'MausBot',
    maker: 'OpenMausBot',
    tagline: 'Every bot with its own computer.',
    summary: 'La alternativa open source más completa: cada bot con su propia VM, memoria, apps, rutinas, canales y aprobaciones. Autoalojable o con nube gestionada.',
    website: 'https://mausbot.com/',
    repo: 'https://github.com/milind-soni/OpenMausBot',
    cat: 'open',
    license: 'Apache-2.0',
    pricing: 'freemium',
    priceNote: 'Gratis local; nube desde US$15/mes',
    setup: 'easy',
    maturity: 'beta',
    platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'],
    models: 'BYOK / Claude, Codex y más',
    channels: ['Chat', 'Voz', 'WhatsApp', 'Telegram'],
    scores: { capacidad: 88, autonomia: 86, computadora: 94, memoria: 88, rutinas: 90, equipo: 86, confianza: 88, producto: 80 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 80,
    strengths: [
      'Un bot con nombre y computadora propia, no un chat con herramientas',
      'Memoria, rutinas, canales y aprobaciones en el mismo producto',
      'Open source y autoalojable; también hay nube gestionada'
    ],
    weaknesses: [
      'Beta y con poco historial de estabilidad',
      'Depende de los modelos que conectes (Claude, Codex, etc.)',
      'La nube y el consumo de modelos se cobran aparte'
    ],
    comparison: 'Es lo más parecido a Grok Bot que puedes instalar hoy; cambia la comodidad de xAI por control y modelo libre.',
    sources: [
      { label: 'MausBot · web oficial', url: 'https://mausbot.com/' },
      { label: 'OpenMausBot · repositorio', url: 'https://github.com/milind-soni/OpenMausBot' }
    ]
  },
  {
    id: 'codync',
    name: 'Codync',
    maker: 'leepokai',
    tagline: 'Your agents, together. Desktop to iPhone.',
    summary: 'Tus agentes CLI (Claude Code, Codex, Cursor, Gemini y 40+) convertidos en bots con nombre, memoria y acceso desde iPhone, Mac, Windows, Linux o terminal. Gratis y open source.',
    website: 'https://www.codync.dev',
    repo: 'https://github.com/leepokai/Codync',
    cat: 'open',
    license: 'Apache-2.0',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'easy',
    maturity: 'released',
    platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Web'],
    models: 'BYOK / 40+ agentes CLI',
    channels: ['Chat', 'Voz', 'Móvil'],
    scores: { capacidad: 86, autonomia: 84, computadora: 88, memoria: 86, rutinas: 86, equipo: 84, confianza: 86, producto: 82 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 78,
    strengths: [
      'Convierte los agentes que ya pagas en bots con identidad y memoria',
      'Funciona en escritorio, terminal y iPhone; open source',
      'Rutinas, grupos y voz sin montar tu propio backend'
    ],
    weaknesses: [
      'Depende de los CLI y planes que tengas instalados',
      'No es un agente propio: orquesta motores de terceros',
      'Pensado para usuarios cómodos con agentes CLI'
    ],
    comparison: 'Te da el “equipo de bots” de Grok Bot sobre tus propias suscripciones; no te da la computadora en la nube ni el modelo propio.',
    sources: [
      { label: 'Codync · web oficial', url: 'https://www.codync.dev' },
      { label: 'Codync · repositorio', url: 'https://github.com/leepokai/Codync' }
    ]
  },
  {
    id: 'rakazo',
    name: 'Rakazo',
    maker: 'elie222',
    tagline: 'Your AI team, on any device.',
    summary: 'Equipo de bots open source con modelo y sandbox a elección, memoria, rutinas, canales y apps. Más control y más setup que las opciones gestionadas.',
    website: 'https://rakazo.com',
    repo: 'https://github.com/elie222/rakazo',
    cat: 'open',
    license: 'Apache-2.0',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'moderate',
    maturity: 'released',
    platforms: ['Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android'],
    models: 'BYOK / modelo y sandbox libres',
    channels: ['Chat', 'Voz', 'WhatsApp', 'Telegram'],
    scores: { capacidad: 85, autonomia: 83, computadora: 88, memoria: 84, rutinas: 85, equipo: 83, confianza: 84, producto: 80 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 74,
    strengths: [
      'Eliges modelo y sandbox en vez de quedar atado a un proveedor',
      'Bots con memoria, rutinas, canales y coordinación',
      'Open source y desplegable en tu propia infraestructura'
    ],
    weaknesses: [
      'Setup más técnico que Grok Bot o Dots',
      'Menos pulido de producto y soporte',
      'El coste real depende de los modelos y del hosting'
    ],
    comparison: 'Es el “hazlo tú” de Grok Bot: misma idea, más control y más trabajo de configuración.',
    sources: [
      { label: 'Rakazo · web oficial', url: 'https://rakazo.com' },
      { label: 'Rakazo · repositorio', url: 'https://github.com/elie222/rakazo' }
    ]
  },
  {
    id: 'openbot',
    name: 'OpenBot',
    maker: 'nightly-labs',
    tagline: 'Persistent AI teammates for you and your team.',
    summary: 'Equipo persistente en un workspace compartido, con carriles de trabajo, handoffs, skills, navegador y canales. Para individuos y equipos que quieren self-hosted.',
    website: 'https://openbot.run/',
    repo: 'https://github.com/nightly-labs/openbot',
    cat: 'open',
    license: 'PolyForm Noncommercial',
    pricing: 'free',
    priceNote: 'Gratis personal + modelos',
    setup: 'moderate',
    maturity: 'beta',
    platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'],
    models: 'BYOK / Codex, Claude, Gemini, Grok y más',
    channels: ['Chat', 'WhatsApp', 'Telegram', 'Slack'],
    scores: { capacidad: 82, autonomia: 82, computadora: 84, memoria: 82, rutinas: 84, equipo: 84, confianza: 80, producto: 74 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 72,
    strengths: [
      'Workspace con agentes, personas y carriles de trabajo compartidos',
      'Handoffs, skills y rutinas con navegador integrado',
      'Multi-modelo y self-hosted'
    ],
    weaknesses: [
      'Beta y licencia no comercial para equipos',
      'Más complejo de operar que un producto SaaS',
      'La versión móvil depende de un servidor propio'
    ],
    comparison: 'Aporta la parte de equipo y workspace que Grok Bot también cubre, pero con más control y menos acabado.',
    sources: [
      { label: 'OpenBot · web oficial', url: 'https://openbot.run/' },
      { label: 'OpenBot · repositorio', url: 'https://github.com/nightly-labs/openbot' }
    ]
  },
  {
    id: 'nanoclaw',
    name: 'nanoClaw',
    maker: 'nanocoai',
    tagline: 'Agentes en contenedores, con canales reales.',
    summary: 'Agentes en contenedores aislados, con memoria, tareas programadas y canales como WhatsApp, Telegram, Slack y Gmail. Ligero y pensado para self-hosting.',
    website: 'https://nanoclaw.dev',
    repo: 'https://github.com/nanocoai/nanoclaw',
    cat: 'open',
    license: 'MIT',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'moderate',
    maturity: 'beta',
    platforms: ['Web', 'Linux', 'macOS'],
    models: 'BYOK / Anthropic Agents SDK',
    channels: ['WhatsApp', 'Telegram', 'Slack', 'Gmail'],
    scores: { capacidad: 82, autonomia: 80, computadora: 82, memoria: 84, rutinas: 84, equipo: 82, confianza: 78, producto: 76 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: false, background: true }),
    confidence: 70,
    strengths: [
      'Contenedor aislado por agente, con identidad y memoria propias',
      'Canales de mensajería reales y tareas programadas',
      'Base ligera y fácil de personalizar'
    ],
    weaknesses: [
      'Sin aprobaciones tan claras como Grok Bot',
      'Setup de contenedores y modelos a tu cargo',
      'Poca documentación para equipos grandes'
    ],
    comparison: 'Se acerca en aislamiento y canales; le falta la capa de producto y las aprobaciones del listón.',
    sources: [
      { label: 'nanoClaw · web oficial', url: 'https://nanoclaw.dev' },
      { label: 'nanoClaw · repositorio', url: 'https://github.com/nanocoai/nanoclaw' }
    ]
  },
  {
    id: 'nanomuse',
    name: 'nanoMuse',
    maker: 'nano-muse',
    tagline: 'Tu agente, en todos tus dispositivos.',
    summary: 'Agente personal open source con identidad, memoria y computer-use en móvil, escritorio y web. Muy joven, pero con una propuesta muy alineada al listón.',
    website: 'https://nanomuse.cn/',
    repo: 'https://github.com/nano-muse/nanoMuse',
    cat: 'open',
    license: 'GPL-3.0',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'moderate',
    maturity: 'beta',
    platforms: ['Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android'],
    models: 'BYOK',
    channels: ['Chat', 'Voz', 'Móvil'],
    scores: { capacidad: 84, autonomia: 82, computadora: 82, memoria: 84, rutinas: 80, equipo: 70, confianza: 82, producto: 78 },
    features: f({ computer: true, memory: true, routines: false, apps: true, approvals: true, background: true }),
    confidence: 66,
    strengths: [
      'Cobertura real de móvil, escritorio y navegador',
      'Memoria y computer-use con aprobaciones',
      'Identidad de agente personal, no asistente genérico'
    ],
    weaknesses: [
      'Proyecto reciente, sin historial de estabilidad',
      'Sin coordinación de varios bots',
      'Documentación y ecosistema incipientes'
    ],
    comparison: 'Tiene la identidad y la computadora; le falta el equipo y la madurez de Grok Bot.',
    sources: [
      { label: 'nanoMuse · repositorio', url: 'https://github.com/nano-muse/nanoMuse' }
    ]
  },
  {
    id: 'anymodelbot',
    name: 'AnyModelBot',
    maker: 'Modelflare',
    tagline: 'Local-first personal AI bots.',
    summary: 'Bots locales con workspace, memoria y control del escritorio; multi-modelo, canales y aprobaciones. Sin coordinación entre bots ni computadora en la nube.',
    website: 'https://anymodel.bot/en/',
    repo: 'https://github.com/modelflare-ai/AnyModelBot',
    cat: 'open',
    license: 'MIT',
    pricing: 'freemium',
    priceNote: 'Gratis; pagas los modelos',
    setup: 'moderate',
    maturity: 'beta',
    platforms: ['macOS', 'Windows', 'Linux', 'Telegram', 'Slack', 'Discord'],
    models: 'BYOK / GPT, Claude, Gemini, Grok y más',
    channels: ['Telegram', 'Slack', 'Discord', 'WeChat'],
    scores: { capacidad: 82, autonomia: 78, computadora: 86, memoria: 82, rutinas: 82, equipo: 62, confianza: 84, producto: 76 },
    features: f({ computer: true, memory: true, routines: true, apps: true, approvals: true, background: true }),
    confidence: 68,
    strengths: [
      'Bots con workspace, memoria y control de tu escritorio',
      'Modelo libre y canales de mensajería',
      'Local-first: tus datos se quedan en tu equipo'
    ],
    weaknesses: [
      'No hay computadora persistente en la nube',
      'Sin coordinación de varios bots',
      'Proyecto joven y en beta'
    ],
    comparison: 'Es un Grok Bot de escritorio, local y de un solo bot; pierde equipo y disponibilidad 24/7.',
    sources: [
      { label: 'AnyModelBot · web oficial', url: 'https://anymodel.bot/en/' },
      { label: 'AnyModelBot · repositorio', url: 'https://github.com/modelflare-ai/AnyModelBot' }
    ]
  },
  {
    id: 'open-duet',
    name: 'Open Duet',
    maker: 'Suparagent',
    tagline: 'Agentes con nombre, memoria y rutinas.',
    summary: 'Workspace autoalojable con agentes con nombre, memoria, rutinas, computadora aislada y aprobaciones. Experimental, pero con casi todas las piezas del listón.',
    website: 'https://suparagent.ai/',
    repo: 'https://github.com/Anil-matcha/open-duet',
    cat: 'open',
    license: 'Apache-2.0',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'technical',
    maturity: 'prototype',
    platforms: ['macOS', 'Windows', 'Linux', 'Web'],
    models: 'BYOK',
    channels: ['Chat', 'Telegram'],
    scores: { capacidad: 80, autonomia: 78, computadora: 84, memoria: 80, rutinas: 82, equipo: 84, confianza: 82, producto: 72 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 62,
    strengths: [
      'Agentes con nombre, memoria y computadora aislada',
      'Rutinas y aprobaciones, con coordinación de equipo',
      'Autoalojable y sin suscripción del proyecto'
    ],
    weaknesses: [
      'Prototipo experimental y con fricción técnica',
      'Integraciones nativas limitadas',
      'Sin soporte ni historial de producción'
    ],
    comparison: 'Copia la estructura de Grok Bot, pero todavía está en fase de prototipo.',
    sources: [
      { label: 'Open Duet · web oficial', url: 'https://suparagent.ai/' },
      { label: 'Open Duet · repositorio', url: 'https://github.com/Anil-matcha/open-duet' }
    ]
  },
  {
    id: 'hermes-agent',
    name: 'Hermes Agent',
    maker: 'Nous Research',
    tagline: 'An agent that grows with you.',
    summary: 'Plataforma de agentes generalista, potente y muy configurable; el coste es el setup técnico y la falta de una capa de producto tan pulida.',
    website: 'https://hermes-agent.nousresearch.com',
    repo: 'https://github.com/NousResearch/hermes-agent',
    cat: 'open',
    license: 'MIT',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'technical',
    maturity: 'released',
    platforms: ['Web', 'macOS', 'Windows', 'Linux', 'VPS'],
    models: 'BYOK / modelo libre',
    channels: ['Chat', 'Voz', 'Telegram'],
    scores: { capacidad: 80, autonomia: 78, computadora: 82, memoria: 80, rutinas: 80, equipo: 70, confianza: 76, producto: 60 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 68,
    strengths: [
      'Muy completo: computadora, memoria, rutinas y multi-modelo',
      'Autoalojable y con ecosistema de herramientas',
      'Comunidad y desarrollo activos'
    ],
    weaknesses: [
      'Setup claramente técnico',
      'Poca coordinación real entre bots',
      'Documentación y soporte irregulares'
    ],
    comparison: 'Tiene las piezas técnicas, pero no la experiencia de producto ni la coordinación de Grok Bot.',
    sources: [
      { label: 'Hermes Agent · web oficial', url: 'https://hermes-agent.nousresearch.com' },
      { label: 'Hermes Agent · repositorio', url: 'https://github.com/NousResearch/hermes-agent' }
    ]
  },
  {
    id: 'touri',
    name: 'Touri',
    maker: 'touri-ai',
    tagline: 'Local AI teammates powered by your agent CLIs.',
    summary: 'Equipo local de agentes sobre tus CLIs (Codex, Claude Code, OpenCode), con memoria, skills y grupos. Muy alineado al concepto, pero técnico.',
    website: 'https://touri.ai/',
    repo: 'https://github.com/touri-ai/touri',
    cat: 'open',
    license: 'Apache-2.0',
    pricing: 'free',
    priceNote: 'Gratis + tus suscripciones',
    setup: 'technical',
    maturity: 'beta',
    platforms: ['macOS', 'Windows', 'Linux'],
    models: 'BYOK / CLIs instalados',
    channels: ['Chat', 'Grupos'],
    scores: { capacidad: 78, autonomia: 76, computadora: 82, memoria: 78, rutinas: 74, equipo: 84, confianza: 76, producto: 64 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 66,
    strengths: [
      'Bots con instrucciones, memoria, skills y chats separados',
      'Colaboración en grupo y ejecución local por defecto',
      'Reutiliza las suscripciones de IA que ya pagas'
    ],
    weaknesses: [
      'Requiere CLIs y conocimientos técnicos',
      'Beta y con builds por plataforma',
      'Sin computadora en la nube ni soporte comercial'
    ],
    comparison: 'Es un Grok Bot local para técnicos: mucha capacidad, poca comodidad.',
    sources: [
      { label: 'Touri · web oficial', url: 'https://touri.ai/' },
      { label: 'Touri · repositorio', url: 'https://github.com/touri-ai/touri' }
    ]
  },
  {
    id: 'pally',
    name: 'Pally',
    maker: 'Pally',
    tagline: 'One text away from done.',
    summary: 'Asistente por mensajes (iMessage, WhatsApp, Telegram) para recordatorios, reservas y seguimientos. Menos computadora, más conversación y hábito diario.',
    website: 'https://pally.com/',
    cat: 'hosted',
    license: null,
    pricing: 'freemium',
    priceNote: 'Gratis con límite; VIP US$1.000/mes',
    setup: 'easy',
    maturity: 'released',
    platforms: ['Web', 'iOS', 'Android', 'iMessage', 'WhatsApp', 'Telegram'],
    models: 'Propio',
    channels: ['iMessage', 'WhatsApp', 'Telegram', 'Voz'],
    scores: { capacidad: 76, autonomia: 80, computadora: 70, memoria: 84, rutinas: 84, equipo: 60, confianza: 82, producto: 86 },
    features: f({ computer: false, memory: true, routines: true, apps: true, approvals: true, background: true }),
    confidence: 74,
    strengths: [
      'Funciona donde ya estás: iMessage, WhatsApp o Telegram',
      'Memoria, seguimientos y rutinas con muy poco setup',
      'Voz y llamadas para encargos del día a día'
    ],
    weaknesses: [
      'No es un equipo de bots ni una computadora completa',
      'El plan VIP es caro y el gratuito tiene límites',
      'Depende de que el servicio siga disponible'
    ],
    comparison: 'Es el asistente conversacional que Grok Bot también quiere ser; no compite en computadora ni en equipo.',
    sources: [
      { label: 'Pally · web oficial', url: 'https://pally.com/' }
    ]
  },
  {
    id: 'hark-pro',
    name: 'Hark Pro',
    maker: 'Hark Labs',
    tagline: 'A minimal personal assistant with Panels and cloud actions.',
    summary: 'Asistente minimalista con Panels, acciones en la nube y tareas programadas. Muy fácil de usar; no es un equipo de bots.',
    website: 'https://hark.com/',
    cat: 'hosted',
    license: null,
    pricing: 'freemium',
    priceNote: 'Gratis con límites; Pro desde US$20/mes',
    setup: 'easy',
    maturity: 'released',
    platforms: ['Web', 'iOS', 'Android'],
    models: 'Propio',
    channels: ['Chat', 'Voz', 'Email'],
    scores: { capacidad: 78, autonomia: 80, computadora: 82, memoria: 80, rutinas: 80, equipo: 60, confianza: 84, producto: 84 },
    features: f({ computer: true, memory: true, routines: true, apps: true, approvals: true, background: true }),
    confidence: 72,
    strengths: [
      'Interfaz limpia y Panels para tareas concretas',
      'Computadora en la nube para acciones web',
      'Tareas programadas y memoria sin setup'
    ],
    weaknesses: [
      'Un asistente, no varios bots con roles',
      'Las capacidades dependen del plan',
      'Poca coordinación y ecosistema cerrado'
    ],
    comparison: 'Tiene computadora y rutinas, pero le falta la identidad múltiple de Grok Bot.',
    sources: [
      { label: 'Hark Pro · web oficial', url: 'https://hark.com/' }
    ]
  },
  {
    id: 'instinct',
    name: 'Instinct',
    maker: 'Instinct',
    tagline: 'An assistant you can call or text.',
    summary: 'Asistente al que llamas o escribes para encargos en cuentas conectadas. Simple y directo, pero con poca autonomía profunda y acceso por beta.',
    website: 'https://instinct.com/',
    cat: 'hosted',
    license: null,
    pricing: 'unknown',
    priceNote: 'Beta por invitación',
    setup: 'easy',
    maturity: 'beta',
    platforms: ['iOS', 'Android', 'Web'],
    models: 'Propio',
    channels: ['Chat', 'Voz', 'SMS'],
    scores: { capacidad: 72, autonomia: 76, computadora: 80, memoria: 78, rutinas: 72, equipo: 50, confianza: 72, producto: 88 },
    features: f({ computer: true, memory: true, routines: false, apps: true, approvals: true, background: true }),
    confidence: 58,
    strengths: [
      'La experiencia más simple: llamas o escribes y delega',
      'Acceso a cuentas conectadas y acciones cotidianas',
      'Enfoque claro en personas no técnicas'
    ],
    weaknesses: [
      'Beta por invitación y precio no verificado',
      'Sin equipo de bots ni rutinas avanzadas',
      'Depende de permisos amplios sobre tus cuentas'
    ],
    comparison: 'Es el “asistente de bolsillo” del listón; no pretende ser una computadora con equipo.',
    sources: [
      { label: 'Instinct · web oficial', url: 'https://instinct.com/' }
    ]
  },
  {
    id: 'today-ai',
    name: 'Today AI',
    maker: 'Today',
    tagline: 'A personal assistant with apps and its own cloud computer.',
    summary: 'Asistente con apps y computadora en la nube para investigación, seguimiento y trabajo en apps conectadas. Menos ecosistema abierto que las alternativas self-hosted.',
    website: 'https://today.ai/',
    cat: 'hosted',
    license: null,
    pricing: 'unknown',
    priceNote: 'Precio no verificado',
    setup: 'easy',
    maturity: 'released',
    platforms: ['Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android'],
    models: 'Propio',
    channels: ['Chat', 'Voz', 'Email'],
    scores: { capacidad: 78, autonomia: 80, computadora: 82, memoria: 80, rutinas: 78, equipo: 62, confianza: 76, producto: 76 },
    features: f({ computer: true, memory: true, routines: false, apps: true, approvals: true, background: true }),
    confidence: 60,
    strengths: [
      'Computadora en la nube y apps en todas las plataformas',
      'Memoria y skills para trabajo recurrente',
      'Enfoque de asistente personal completo'
    ],
    weaknesses: [
      'Precios y límites poco claros',
      'Sin equipo de bots ni coordinación',
      'Ecosistema cerrado y poca transparencia'
    ],
    comparison: 'Se parece en computadora y memoria; le falta coordinación, rutinas y transparencia.',
    sources: [
      { label: 'Today AI · web oficial', url: 'https://today.ai/' }
    ]
  },
  {
    id: 'kylon',
    name: 'Kylon',
    maker: 'Pure Reason',
    tagline: 'A business workspace for people and AI agents.',
    summary: 'Workspace de negocio con agentes con nombre, memoria, rooms y workflows; más equipo que bot personal. Buena opción si lo que buscas es coordinar personas y agentes.',
    website: 'https://kylon.io/',
    cat: 'teams',
    license: null,
    pricing: 'paid',
    priceNote: 'Desde US$50/mes por workspace',
    setup: 'moderate',
    maturity: 'released',
    platforms: ['Web', 'macOS', 'iOS', 'Android'],
    models: 'Mixto / Claude Code y Codex',
    channels: ['Chat', 'Rooms', 'Email'],
    scores: { capacidad: 78, autonomia: 72, computadora: 74, memoria: 80, rutinas: 78, equipo: 84, confianza: 80, producto: 68 },
    features: f({ computer: false, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 68,
    strengths: [
      'Rooms, hilos, archivos y agentes en un mismo workspace',
      'Agentes con memoria y skills que el equipo menciona',
      'Workflows y aprobaciones para trabajo compartido'
    ],
    weaknesses: [
      'No es un bot personal con computadora propia',
      'Precio por workspace y créditos',
      'Más complejo que un asistente individual'
    ],
    comparison: 'Grok Bot es tu equipo personal; Kylon es el equipo de tu empresa. Se cruzan en coordinación, no en uso individual.',
    sources: [
      { label: 'Kylon · web oficial', url: 'https://kylon.io/' }
    ]
  },
  {
    id: 'bloks',
    name: 'Bloks',
    maker: 'hamedgitty',
    tagline: 'Personal agents and rooms on your own computer.',
    summary: 'Agentes y rooms local-first en tu computadora, con memoria, automatizaciones, herramientas y app de iPhone. El control es tuyo; el setup también.',
    website: 'https://bloks.dev/',
    repo: 'https://github.com/hamedgitty/bloks',
    cat: 'open',
    license: 'FSL-1.1-MIT',
    pricing: 'freemium',
    priceNote: 'Local gratis; nube desde US$5/mes',
    setup: 'moderate',
    maturity: 'released',
    platforms: ['macOS', 'Windows', 'Linux', 'iOS'],
    models: 'BYOK / multi-modelo',
    channels: ['Chat', 'Rooms', 'iPhone'],
    scores: { capacidad: 78, autonomia: 74, computadora: 80, memoria: 76, rutinas: 76, equipo: 80, confianza: 78, producto: 66 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 62,
    strengths: [
      'Agentes con rol, memoria y rooms compartidos en tu equipo',
      'Automatizaciones y control de aprobaciones',
      'Local-first con opción de nube e iPhone'
    ],
    weaknesses: [
      'Producto joven y con poca tracción pública',
      'Configuración y modelos a tu cargo',
      'Ecosistema y documentación limitados'
    ],
    comparison: 'Ofrece la estructura de equipo de Grok Bot, pero en tu computadora y con menos acabado.',
    sources: [
      { label: 'Bloks · web oficial', url: 'https://bloks.dev/' },
      { label: 'Bloks · repositorio', url: 'https://github.com/hamedgitty/bloks' }
    ]
  },
  {
    id: 'kwant',
    name: 'Kwant',
    maker: 'Oleksandr Ivanchenko',
    tagline: 'Your own bot team, with a leader who delegates.',
    summary: 'Equipo de bots autoalojado con líder que delega, canales, memoria por bot y skills. Muy fiel a la idea de Grok Bot, con setup técnico.',
    website: 'https://kwant.si/',
    repo: 'https://github.com/alexsergivan/kwant',
    cat: 'open',
    license: 'AGPL-3.0',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'technical',
    maturity: 'beta',
    platforms: ['Web', 'macOS', 'Linux', 'VPS'],
    models: 'BYOK / Claude, Codex, Grok y endpoints propios',
    channels: ['Chat', 'Canales', 'WhatsApp'],
    scores: { capacidad: 76, autonomia: 74, computadora: 76, memoria: 80, rutinas: 82, equipo: 84, confianza: 76, producto: 62 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 64,
    strengths: [
      'Líder que reparte trabajo y canales para organizar al equipo',
      'Memoria por bot, skills y rutinas programadas',
      'Autoalojado y con modelos a elección'
    ],
    weaknesses: [
      'Beta y setup técnico',
      'Interfaz menos pulida que la de Grok Bot',
      'Depende de tu servidor y de tus suscripciones'
    ],
    comparison: 'Es el “equipo con líder” de Grok Bot, en versión self-hosted y sin la comodidad del producto original.',
    sources: [
      { label: 'Kwant · web oficial', url: 'https://kwant.si/' },
      { label: 'Kwant · repositorio', url: 'https://github.com/alexsergivan/kwant' }
    ]
  },
  {
    id: 'lorca',
    name: 'Lorca',
    maker: 'EGOIST',
    tagline: 'Bots on your computers, reachable from your devices.',
    summary: 'Bots en tus computadoras, accesibles desde el móvil, con memoria y grupos. Local y open source; la ejecución depende de que tu equipo esté encendido.',
    website: 'https://lorca.app/',
    repo: 'https://github.com/egoist/lorca',
    cat: 'open',
    license: 'GPL-3.0',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'moderate',
    maturity: 'beta',
    platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'],
    models: 'BYOK',
    channels: ['Chat', 'Grupos', 'Móvil'],
    scores: { capacidad: 74, autonomia: 72, computadora: 76, memoria: 74, rutinas: 74, equipo: 82, confianza: 74, producto: 66 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: false }),
    confidence: 62,
    strengths: [
      'Bots con nombre y grupos en tus propias computadoras',
      'Memoria por bot y recuperación entre chats',
      'Open source y con apps de móvil'
    ],
    weaknesses: [
      'Si tu computadora se apaga, el bot se detiene',
      'Proyecto en beta y con poca tracción',
      'Configuración de proveedores a tu cargo'
    ],
    comparison: 'Tiene la identidad y el equipo; le falta la computadora en la nube y el trabajo desatendido de Grok Bot.',
    sources: [
      { label: 'Lorca · web oficial', url: 'https://lorca.app/' },
      { label: 'Lorca · repositorio', url: 'https://github.com/egoist/lorca' }
    ]
  },
  {
    id: 'agentes-chat',
    name: 'agentes.chat',
    maker: 'CODARI',
    tagline: 'A team workspace where people and AI agents work together.',
    summary: 'Workspace compartido para personas y agentes, con canales, tareas y contexto. Beta por invitación; más equipo que asistente personal.',
    website: 'https://agentes.chat/',
    cat: 'teams',
    license: null,
    pricing: 'invite',
    priceNote: 'Beta por invitación; ~US$29/mes',
    setup: 'moderate',
    maturity: 'beta',
    platforms: ['Web'],
    models: 'BYOK',
    channels: ['Canales', 'Chat', 'Tareas'],
    scores: { capacidad: 76, autonomia: 70, computadora: 70, memoria: 78, rutinas: 76, equipo: 84, confianza: 74, producto: 66 },
    features: f({ computer: false, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 58,
    strengths: [
      'Canales y tareas compartidas entre personas y agentes',
      'Contexto común en vez de chats privados separados',
      'Enfoque de equipo, no de asistente individual'
    ],
    weaknesses: [
      'Acceso cerrado y planes sin confirmar',
      'Sin computadora propia para los agentes',
      'Beta con poca evidencia pública de uso'
    ],
    comparison: 'Es un workspace de equipo; no intenta ser el bot personal con computadora de Grok Bot.',
    sources: [
      { label: 'agentes.chat · web oficial', url: 'https://agentes.chat/' }
    ]
  },
  {
    id: 'klex-bots',
    name: 'Klex Bots',
    maker: 'Stagewise',
    tagline: 'AI coworkers with their own accounts in your tools.',
    summary: 'AI coworkers con cuenta propia en Slack o Linear, memoria y handoffs; para equipos técnicos que ya trabajan en esas herramientas.',
    website: 'https://www.klex.bot/',
    repo: 'https://github.com/stagewise-io/klex',
    cat: 'teams',
    license: 'Apache-2.0',
    pricing: 'unknown',
    priceNote: 'Open source; cloud sin verificar',
    setup: 'technical',
    maturity: 'released',
    platforms: ['Web', 'Slack', 'Linear', 'VPS'],
    models: 'BYOK / multi-modelo',
    channels: ['Slack', 'Linear', 'Chat'],
    scores: { capacidad: 74, autonomia: 72, computadora: 70, memoria: 76, rutinas: 78, equipo: 80, confianza: 72, producto: 66 },
    features: f({ computer: false, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 58,
    strengths: [
      'Bots con cuenta propia dentro de Slack y Linear',
      'Memoria y handoffs entre agentes',
      'Open source y multi-modelo'
    ],
    weaknesses: [
      'Enfoque de equipo técnico, no personal',
      'Sin computadora propia ni navegador completo',
      'Precio cloud no verificado'
    ],
    comparison: 'Es el equipo de bots que vive en tus herramientas; no reemplaza la computadora personal de Grok Bot.',
    sources: [
      { label: 'Klex · web oficial', url: 'https://www.klex.bot/' },
      { label: 'Klex · repositorio', url: 'https://github.com/stagewise-io/klex' }
    ]
  },
  {
    id: 'guilds',
    name: 'Guilds',
    maker: 'CigaleAI',
    tagline: 'Standing agent teams with inspectable runs.',
    summary: 'Equipos de agentes con runs inspeccionables, notas versionadas, memoria por agente y rutinas. Para quien quiere auditoría y control, no solo resultados.',
    website: 'https://www.guilds.run/',
    repo: 'https://github.com/CigaleAI/guilds',
    cat: 'teams',
    license: 'AGPL-3.0',
    pricing: 'free',
    priceNote: 'Self-hosted; modelos aparte',
    setup: 'technical',
    maturity: 'beta',
    platforms: ['Web', 'Linux', 'VPS'],
    models: 'BYOK / multi-modelo',
    channels: ['Chat', 'Grupos'],
    scores: { capacidad: 74, autonomia: 70, computadora: 72, memoria: 78, rutinas: 80, equipo: 82, confianza: 74, producto: 58 },
    features: f({ computer: false, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 56,
    strengths: [
      'Runs y cambios de memoria inspeccionables',
      'Notas versionadas y recetas exportables',
      'Equipos con roles y rutinas'
    ],
    weaknesses: [
      'Setup técnico y AGPL',
      'Sin computadora persistente completa',
      'Producto joven y con poca comunidad'
    ],
    comparison: 'Aporta auditoría que Grok Bot no muestra; pierde en computadora y facilidad de uso.',
    sources: [
      { label: 'Guilds · web oficial', url: 'https://www.guilds.run/' },
      { label: 'Guilds · repositorio', url: 'https://github.com/CigaleAI/guilds' }
    ]
  },
  {
    id: 'mercury-agent',
    name: 'Mercury Agent',
    maker: 'cosmicstack-labs',
    tagline: 'A self-hosted assistant with memory, routines and persistent bots.',
    summary: 'Asistente autoalojado con memoria, rutinas y bots persistentes; terminal, web y mensajería. El control es alto y el setup también.',
    website: 'https://mercuryagent.sh/',
    repo: 'https://github.com/cosmicstack-labs/mercury-agent',
    cat: 'open',
    license: 'MIT',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'technical',
    maturity: 'released',
    platforms: ['Linux', 'macOS', 'VPS', 'Web'],
    models: 'BYOK / modelo local',
    channels: ['Chat', 'Terminal', 'WhatsApp', 'Voz'],
    scores: { capacidad: 74, autonomia: 72, computadora: 78, memoria: 76, rutinas: 78, equipo: 72, confianza: 76, producto: 56 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 60,
    strengths: [
      'Mismo agente desde terminal, web y mensajería',
      'Memoria, rutinas y bots persistentes',
      'Autoalojado y con modelo local opcional'
    ],
    weaknesses: [
      'Setup técnico y sin soporte comercial',
      'Interfaz y documentación básicas',
      'La nube opcional no tiene precio verificado'
    ],
    comparison: 'Tiene casi todas las piezas, pero está pensado para quien disfruta operando su propio servidor.',
    sources: [
      { label: 'Mercury Agent · web oficial', url: 'https://mercuryagent.sh/' },
      { label: 'Mercury Agent · repositorio', url: 'https://github.com/cosmicstack-labs/mercury-agent' }
    ]
  },
  {
    id: 'clawboo',
    name: 'Clawboo',
    maker: 'clawboo',
    tagline: 'One request, a lead bot and a shared team board.',
    summary: 'Estudio self-hosted de equipos de bots con un líder que reparte tareas, agentes conectados y un tablero compartido. Para quien quiere un equipo, no un asistente.',
    website: 'https://www.claw.boo',
    repo: 'https://github.com/clawboo/clawboo',
    cat: 'open',
    license: 'MIT',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'technical',
    maturity: 'released',
    platforms: ['Web', 'Linux', 'VPS'],
    models: 'BYOK / Codex, Claude Code, Hermes y OpenClaw',
    channels: ['Chat', 'Tablero'],
    scores: { capacidad: 72, autonomia: 72, computadora: 72, memoria: 72, rutinas: 76, equipo: 82, confianza: 70, producto: 56 },
    features: f({ computer: false, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 56,
    strengths: [
      'Líder que divide el trabajo y lo reparte entre bots',
      'Tablero compartido para seguir el equipo',
      'Conecta motores como Codex, Claude Code u OpenClaw'
    ],
    weaknesses: [
      'Setup técnico y sin producto gestionado',
      'Sin computadora propia completa',
      'Ecosistema y documentación incipientes'
    ],
    comparison: 'Es un equipo de bots de código abierto; no la comodidad llave en mano de Grok Bot.',
    sources: [
      { label: 'Clawboo · web oficial', url: 'https://www.claw.boo' },
      { label: 'Clawboo · repositorio', url: 'https://github.com/clawboo/clawboo' }
    ]
  },
  {
    id: 'rowboat',
    name: 'Rowboat',
    maker: 'Rowboat Labs',
    tagline: 'Your AI coworker, with memory.',
    summary: 'Coworker de escritorio con memoria en grafo, email, reuniones y tareas de navegador. Más memoria y contexto que autonomía de equipo.',
    website: 'https://www.rowboatlabs.com/',
    repo: 'https://github.com/rowboatlabs/rowboat',
    cat: 'open',
    license: 'Apache-2.0',
    pricing: 'free',
    priceNote: 'Gratis + tus modelos',
    setup: 'moderate',
    maturity: 'released',
    platforms: ['macOS', 'Windows', 'Linux'],
    models: 'BYOK',
    channels: ['Chat', 'Email', 'Reuniones'],
    scores: { capacidad: 74, autonomia: 70, computadora: 70, memoria: 80, rutinas: 72, equipo: 64, confianza: 74, producto: 70 },
    features: f({ computer: false, memory: true, routines: false, apps: true, approvals: true, background: true }),
    confidence: 64,
    strengths: [
      'Memoria editable en grafo a partir de email y reuniones',
      'Coworker de escritorio con tareas de navegador',
      'Espacios compartidos para personas y asistentes'
    ],
    weaknesses: [
      'Sin computadora persistente ni equipo de bots',
      'Rutinas limitadas',
      'Requiere conectar tus propias fuentes y modelos'
    ],
    comparison: 'Gana en memoria y contexto; pierde en computadora, rutinas y coordinación frente a Grok Bot.',
    sources: [
      { label: 'Rowboat · web oficial', url: 'https://www.rowboatlabs.com/' },
      { label: 'Rowboat · repositorio', url: 'https://github.com/rowboatlabs/rowboat' }
    ]
  },
  {
    id: 'martin',
    name: 'Martin',
    maker: 'DCWU',
    tagline: 'An iOS-focused personal assistant for voice, email and calendar.',
    summary: 'Asistente iOS-first para voz, email y calendario. Muy pulido para el día a día; no es un equipo de bots ni una computadora completa.',
    website: 'https://www.trymartin.com/',
    cat: 'hosted',
    license: null,
    pricing: 'paid',
    priceNote: 'Desde US$35/mes',
    setup: 'easy',
    maturity: 'released',
    platforms: ['iOS', 'Web', 'SMS', 'WhatsApp', 'Slack', 'Email'],
    models: 'Propio',
    channels: ['Voz', 'SMS', 'WhatsApp', 'Email', 'Slack'],
    scores: { capacidad: 68, autonomia: 70, computadora: 64, memoria: 76, rutinas: 78, equipo: 54, confianza: 74, producto: 84 },
    features: f({ computer: false, memory: true, routines: true, apps: true, approvals: true, background: true }),
    confidence: 72,
    strengths: [
      'Voz y mensajería muy naturales en iPhone',
      'Calendario, email, recordatorios y briefings',
      'Canales múltiples sin setup'
    ],
    weaknesses: [
      'Sin computadora propia ni navegador completo',
      'Precio alto para un asistente de un solo bot',
      'Depende del ecosistema iOS'
    ],
    comparison: 'Es el asistente personal clásico; Grok Bot añade computadora, equipo y trabajo desatendido.',
    sources: [
      { label: 'Martin · web oficial', url: 'https://www.trymartin.com/' }
    ]
  },
  {
    id: 'zapia',
    name: 'Zapia',
    maker: 'Zapia',
    tagline: 'A phone-first assistant for email, calendars and everyday tasks.',
    summary: 'Asistente phone-first para email, calendario y tareas recurrentes. Buen precio y foco móvil; menos profundidad y menos control.',
    website: 'https://zapia.com/?lang=en',
    cat: 'hosted',
    license: null,
    pricing: 'freemium',
    priceNote: 'Gratis limitado; Pro US$9,99/mes',
    setup: 'easy',
    maturity: 'released',
    platforms: ['iOS', 'Android', 'Web'],
    models: 'Propio',
    channels: ['Chat', 'Voz', 'Email'],
    scores: { capacidad: 66, autonomia: 68, computadora: 62, memoria: 74, rutinas: 78, equipo: 52, confianza: 70, producto: 80 },
    features: f({ computer: false, memory: true, routines: true, apps: true, approvals: true, background: true }),
    confidence: 70,
    strengths: [
      'Precio accesible y apps móviles cuidadas',
      'Memoria y rutinas para el día a día',
      'Email, calendario y tareas en un solo sitio'
    ],
    weaknesses: [
      'Sin computadora ni equipo de bots',
      'Funciones avanzadas atadas a planes',
      'Ecosistema cerrado'
    ],
    comparison: 'Es un asistente móvil competente; no intenta igualar la computadora ni la coordinación de Grok Bot.',
    sources: [
      { label: 'Zapia · web oficial', url: 'https://zapia.com/?lang=en' }
    ]
  },
  {
    id: 'appubot',
    name: 'AppuBot',
    maker: 'sarthakguptadev',
    tagline: 'AI teammates that work in your apps and answer on Telegram.',
    summary: 'Bots en tu computadora que trabajan en tus apps y responden por Telegram. Prometedor y en beta; buena opción si quieres empezar sin nube.',
    website: 'https://appubot.com/',
    repo: 'https://github.com/sarthakguptadev/appubot',
    cat: 'open',
    license: null,
    pricing: 'free',
    priceNote: 'Gratis en early access',
    setup: 'moderate',
    maturity: 'beta',
    platforms: ['macOS', 'Windows', 'Linux', 'Telegram'],
    models: 'BYOK / cuentas de agente',
    channels: ['Telegram', 'Chat'],
    scores: { capacidad: 76, autonomia: 76, computadora: 82, memoria: 76, rutinas: 78, equipo: 80, confianza: 72, producto: 64 },
    features: f({ computer: true, memory: true, routines: true, apps: true, multiBot: true, coordination: true, approvals: true, background: true }),
    confidence: 58,
    strengths: [
      'Ejecuta agentes en tu computadora y los controla por Telegram',
      'Varios bots con memoria, skills y rutinas',
      'Aprovecha cuentas de agente que ya tengas'
    ],
    weaknesses: [
      'Beta y sin plan de precios público',
      'Depende de que tu equipo esté encendido',
      'Documentación y soporte limitados'
    ],
    comparison: 'Tiene el equipo y la computadora local; le falta la nube y la madurez de Grok Bot.',
    sources: [
      { label: 'AppuBot · web oficial', url: 'https://appubot.com/' },
      { label: 'AppuBot · repositorio', url: 'https://github.com/sarthakguptadev/appubot' }
    ]
  },
  {
    id: 'orchid',
    name: 'Orchid',
    maker: 'Orchid',
    tagline: 'A second brain, through messages.',
    summary: 'Segundo cerebro por mensajes: email, calendario, recordatorios y contexto. No opera una computadora completa; su valor está en la memoria y el hábito.',
    website: 'https://orchid.ai/',
    cat: 'hosted',
    license: null,
    pricing: 'paid',
    priceNote: 'Desde US$29,99/mes',
    setup: 'easy',
    maturity: 'released',
    platforms: ['Web', 'iOS', 'Android', 'iMessage'],
    models: 'Propio',
    channels: ['iMessage', 'Chat', 'Email'],
    scores: { capacidad: 64, autonomia: 66, computadora: 60, memoria: 78, rutinas: 76, equipo: 52, confianza: 72, producto: 76 },
    features: f({ computer: false, memory: true, routines: true, apps: true, approvals: true, background: true }),
    confidence: 66,
    strengths: [
      'Memoria persistente y contexto personal',
      'Email, calendario y recordatorios por mensaje',
      'Experiencia simple, sin setup'
    ],
    weaknesses: [
      'Sin computadora ni navegador propio',
      'Precio alto para las funciones que ofrece',
      'Poca coordinación y ecosistema cerrado'
    ],
    comparison: 'Es memoria y mensajería; Grok Bot además ejecuta trabajo real en una computadora.',
    sources: [
      { label: 'Orchid · web oficial', url: 'https://orchid.ai/' }
    ]
  },
  {
    id: 'boba',
    name: 'Boba',
    maker: 'Boba',
    tagline: 'A personal assistant in iMessage and on the web.',
    summary: 'Asistente en iMessage y web para recordatorios, calendario y planes compartidos. Simple y gratuito; sin computadora ni equipo.',
    website: 'https://boba.app/',
    cat: 'hosted',
    license: null,
    pricing: 'free',
    priceNote: 'Gratis (sujeto a cambios)',
    setup: 'easy',
    maturity: 'released',
    platforms: ['iOS', 'Web', 'iMessage'],
    models: 'Propio',
    channels: ['iMessage', 'Chat', 'Grupos'],
    scores: { capacidad: 62, autonomia: 64, computadora: 58, memoria: 72, rutinas: 74, equipo: 58, confianza: 68, producto: 80 },
    features: f({ computer: false, memory: true, routines: true, apps: true, approvals: true, background: true }),
    confidence: 62,
    strengths: [
      'Se usa desde iMessage y web sin instalar nada',
      'Recordatorios, calendario y planes en grupo',
      'Gratis y muy fácil de probar'
    ],
    weaknesses: [
      'Sin computadora ni autonomía profunda',
      'Modelo de negocio y futuro inciertos',
      'Poca coordinación y control'
    ],
    comparison: 'Es un asistente de mensajería; no compite en la parte de computadora y equipo del listón.',
    sources: [
      { label: 'Boba · web oficial', url: 'https://boba.app/' }
    ]
  },
  {
    id: 'brea',
    name: 'Brea',
    maker: 'Brea',
    tagline: 'An iMessage assistant for connected apps and browser tasks.',
    summary: 'Asistente iMessage para email, calendario, recordatorios y tareas de navegador. Cómodo y ligero; le falta profundidad y transparencia.',
    website: 'https://brea.ai/',
    cat: 'hosted',
    license: null,
    pricing: 'freemium',
    priceNote: 'Gratis con límites; planes in-app',
    setup: 'easy',
    maturity: 'released',
    platforms: ['iOS', 'iMessage', 'Web'],
    models: 'Propio',
    channels: ['iMessage', 'Chat', 'Email'],
    scores: { capacidad: 64, autonomia: 64, computadora: 60, memoria: 70, rutinas: 72, equipo: 54, confianza: 70, producto: 74 },
    features: f({ computer: false, memory: true, routines: true, apps: true, approvals: true, background: true }),
    confidence: 58,
    strengths: [
      'Tareas de navegador y apps conectadas desde iMessage',
      'Rutinas y memoria sin setup',
      'Buen punto de entrada para quien no quiere otra app'
    ],
    weaknesses: [
      'Sin computadora persistente completa',
      'Precios y canales no del todo verificados',
      'Poca coordinación y ecosistema'
    ],
    comparison: 'Aporta conversación y algo de navegador; Grok Bot aporta la computadora y el equipo completos.',
    sources: [
      { label: 'Brea · web oficial', url: 'https://brea.ai/' }
    ]
  }
]

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function tierFor(total) {
  return TIERS.find(t => total >= t.floor)?.name || 'F'
}

function nextTierFor(total) {
  const higher = TIERS.filter(t => t.floor > total).sort((a, b) => a.floor - b.floor)[0]
  return higher ? { name: higher.name, delta: round2(higher.floor - total) } : { name: null, delta: null }
}

function generationFor(agency) {
  if (agency >= 70) return 'bots 2026'
  if (agency >= 45) return 'agentes 2025'
  return 'sesion 2024'
}

const rows = PRODUCTS.map((p) => {
  const total = round2(DIMENSIONS.reduce((sum, d) => sum + (p.scores[d.key] || 0) * d.weight, 0))
  const pillars = {}
  for (const pillar of PILLARS) {
    const featureKey = pillar.key === 'identidad' ? 'identity'
      : pillar.key === 'computadora' ? 'computer'
      : pillar.key === 'memoria' ? 'memory'
      : pillar.key === 'rutinas' ? 'routines'
      : pillar.key === 'coordinacion' ? 'coordination'
      : pillar.key === 'aprobaciones' ? 'approvals'
      : pillar.key === 'desatendido' ? 'background'
      : pillar.key
    pillars[pillar.key] = !!p.features?.[featureKey]
  }
  const agency = PILLARS.reduce((sum, pillar) => sum + (pillars[pillar.key] ? pillar.weight : 0), 0)
  const tier = tierFor(total)
  const next = nextTierFor(total)
  const catLabel = CAT_LABEL[p.cat] || p.cat
  const licenseType = p.license ? 'Open source' : 'Comercial'
  const priceLabel = PRICE_LABEL[p.pricing] || p.pricing
  const setupLabel = SETUP_LABEL[p.setup] || p.setup
  const maturityLabel = MATURITY_LABEL[p.maturity] || p.maturity
  return {
    id: p.id,
    slug: p.id,
    full_name: p.name,
    maker: p.maker,
    tagline: p.tagline,
    summary: p.summary,
    description: p.tagline,
    url: p.website,
    website: p.website,
    repo: p.repo || null,
    docs: p.docs || null,
    category: p.cat,
    catLabel,
    licenseType,
    license: p.license || null,
    pricing: p.pricing,
    priceLabel,
    priceNote: p.priceNote,
    setup: p.setup,
    setupLabel,
    maturity: p.maturity,
    maturityLabel,
    platforms: p.platforms,
    models: p.models,
    channels: p.channels,
    reference: p.cat === 'reference',
    kind: p.cat === 'teams' ? 'platform' : p.cat === 'hosted' ? 'assistant' : 'agent',
    archetype: p.cat,
    archetype_label: catLabel,
    generation: generationFor(agency),
    tier,
    total,
    agency,
    confidence: p.confidence,
    dimensions: p.scores,
    pillars,
    pillars_detail: PILLARS.map(pillar => ({ ...pillar, on: pillars[pillar.key] })),
    agency_max: PILLARS.reduce((sum, pillar) => sum + pillar.weight, 0),
    has_pillars: true,
    next_tier: next.name,
    delta_next: next.delta,
    strengths: p.strengths,
    weaknesses: p.weaknesses,
    comparison: p.comparison,
    sources: p.sources,
    stars: 0,
    forks: 0,
    open_issues: 0,
    language: '',
    created_at: '',
    created_day: '',
    pushed_at: '',
    last_release: null,
    releases_90: 0,
    releases_recent: [],
    judged_day: '2026-11-12',
    readme: '',
    topics: [catLabel, priceLabel, setupLabel],
    homepage: p.website
  }
})

rows.sort((a, b) => b.total - a.total || b.agency - a.agency || a.full_name.localeCompare(b.full_name))
rows.forEach((row, index) => { row.rank = index + 1 })

const counts = {
  ready: rows.length,
  open: rows.filter(r => r.licenseType === 'Open source').length,
  hosted: rows.filter(r => r.licenseType === 'Comercial').length,
  teams: rows.filter(r => r.category === 'teams').length,
  reference: rows.filter(r => r.reference).length
}

const payload = {
  generated_at: '2026-11-12 08:00',
  generated_iso: '2026-11-12T13:00:00Z',
  meta: {
    reference: {
      name: 'Grok Bot',
      maker: 'xAI',
      score: rows.find(r => r.reference)?.total || 0,
      url: 'https://docs.x.ai/grok-bot/overview',
      note: 'Bots con nombre, computadora en la nube, memoria, skills, rutinas, coordinación y aprobaciones. Es el listón contra el que se mide todo lo demás.'
    },
    dimensions: DIMENSIONS,
    pillars: PILLARS,
    agency_max: PILLARS.reduce((sum, pillar) => sum + pillar.weight, 0),
    tiers: TIERS,
    generations: [
      { key: 'bots 2026', label: 'Bots persistentes (2026)', min: 70, emoji: '🤖', hint: 'Identidad, entorno persistente y rutinas: trabajan cuando no estás.' },
      { key: 'agentes 2025', label: 'Agentes autónomos (2025)', min: 45, emoji: '🧭', hint: 'Tareas de varios pasos, pero atados a una sesión o a tu máquina.' },
      { key: 'sesion 2024', label: 'Agentes de sesión (2024)', min: 0, emoji: '💬', hint: 'Prompt → resultado dentro de un IDE o chat, sin persistencia ni rutinas.' }
    ],
    calibration: [
      { band: '92-100', verdict: 'el listón', text: 'Como Grok Bot o mejor: varios bots, computadora propia, memoria, rutinas, apps reales y aprobaciones.' },
      { band: '85-91', verdict: 'casi Grok', text: 'Paquete muy completo; le falta una pieza menor o algo de acabado.' },
      { band: '75-84', verdict: 'excelente', text: 'Producto serio que hace trabajo real, pero con una carencia clara frente al listón.' },
      { band: '65-74', verdict: 'bueno', text: 'Útil y con identidad, pero limitado en computadora, equipo o autonomía.' },
      { band: '55-64', verdict: 'limitado', text: 'Asistente o workspace correcto, pero lejos de trabajar desatendido.' },
      { band: '0-54', verdict: 'flojo', text: 'Automatización frágil o producto claramente superado.' }
    ],
    limits: [
      'Puntuación editorial basada en documentación oficial y fuentes públicas; no es una prueba práctica de cada tarea.',
      'Grok Bot es el listón y también el producto de referencia: no hay independencia de marca, hay criterio explícito.',
      'Precios, límites y funciones cambian; confirma siempre en la web oficial antes de contratar.',
      'Los frameworks, SDKs y runtimes no se puntúan: no son agentes que puedas usar, son piezas para construirlos.',
      'Una nota alta no significa que el producto sea seguro para tus datos: revisa permisos, privacidad y aprobaciones.'
    ],
    ranking_rule: 'Orden: Grok Score (0-100) de mayor a menor. El ADN (0-100) desempata. Solo productos finales; ningún framework.',
    excluded: ['LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'OpenAI Agents SDK', 'Vercel AI SDK', 'Mastra', 'Pydantic AI', 'LlamaIndex'],
    included: 'Solo agentes, bots, asistentes y workspaces que una persona puede usar como producto final.'
  },
  counts,
  pending: 0,
  total_repos: rows.length,
  total_analyzed: rows.length,
  groups: {
    ready: rows
  }
}

writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8')
console.log(`OK ${OUT}`)
console.log(`${rows.length} productos · ${counts.open} open source · ${counts.hosted} comerciales · ${counts.teams} equipos`)
console.log(rows.slice(0, 8).map(r => `${r.rank}. ${r.full_name} — ${r.total} (${r.tier})`).join('\n'))

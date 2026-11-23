/**
 * Revaluación post-revisión de releases y metadata real (2026-11-23).
 * Actualiza research/overrides.json y research/ades/overrides.json de forma
 * reproducible, conservando las citas y campos previos donde corresponde.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const agentsOvPath = join(root, 'research', 'overrides.json')
const adesOvPath = join(root, 'research', 'ades', 'overrides.json')
const agentsIdxPath = join(root, 'research', 'index.json')
const adesIdxPath = join(root, 'research', 'ades', 'index.json')

const agentsOv = JSON.parse(readFileSync(agentsOvPath, 'utf8'))
const adesOv = JSON.parse(readFileSync(adesOvPath, 'utf8'))
const agentsIdx = new Map(JSON.parse(readFileSync(agentsIdxPath, 'utf8')).projects.map(p => [p.slug, p]))
const adesIdx = new Map(JSON.parse(readFileSync(adesIdxPath, 'utf8')).projects.map(p => [p.slug, p]))

function appendUnique(list, item) {
  const arr = Array.isArray(list) ? [...list] : []
  if (!arr.includes(item)) arr.push(item)
  return arr
}

function mergeEvidence(existingOv, existingIdx, updates) {
  const base = { ...(existingIdx || {}), ...(existingOv || {}) }
  for (const [k, quotes] of Object.entries(updates)) {
    const prev = Array.isArray(base[k]) ? [...base[k]] : []
    for (const q of quotes) {
      if (!prev.some(x => x.text === q.text && x.source === q.source)) prev.push(q)
    }
    base[k] = prev
  }
  return base
}

function updateAgent(slug, patch) {
  const cur = agentsOv[slug] || {}
  const idx = agentsIdx.get(slug) || {}
  agentsOv[slug] = { ...cur, ...patch }
  if (patch.pillars) {
    agentsOv[slug].pillars = { ...(idx.pillars || {}), ...(cur.pillars || {}), ...patch.pillars }
  }
  if (patch.dimensions) {
    agentsOv[slug].dimensions = { ...(idx.dimensions || {}), ...(cur.dimensions || {}), ...patch.dimensions }
  }
}

function updateAde(slug, patch) {
  const cur = adesOv[slug] || {}
  adesOv[slug] = { ...cur, ...patch }
}

// ============================================================================
// A. AGENTES (research/overrides.json)
// ============================================================================

// 1. rakazo (85.00 S -> 86.00 S)
updateAgent('rakazo', {
  dimensions: { capacidad: 84, autonomia: 80, computadora: 87, memoria: 90, rutinas: 90, equipo: 88, confianza: 94, producto: 81 },
  strengths: appendUnique(
    agentsOv.rakazo?.strengths || agentsIdx.get('rakazo')?.strengths,
    'Auto Review contra prompt injection tras contenido externo, cifrado en reposo y bots que se unen a reuniones con transcripción'
  ),
  evidence: mergeEvidence(agentsOv.rakazo?.evidence, agentsIdx.get('rakazo')?.evidence, {
    aprobaciones: [
      {
        text: 'Auto Review knows when a recipient, site, payee or bank account appeared only in content the bot read, and asks before sending private data, granting access or paying that party.',
        source: 'https://github.com/elie222/rakazo/releases/tag/v0.14.0'
      }
    ]
  }),
  release_highlight: 'v0.15.0 (y v0.12–v0.14): Auto Review anti-prompt-injection, bots en reuniones con transcripción, adjuntos Word/PowerPoint, rutinas en tu Mac/PC y Android OTA.',
  release_impact: 'Sube a 86.00 S (+1.00): Confianza 90→94, Capacidad 82→84 y Producto 79→81 por endurecimiento de aprobaciones y bots de reuniones.'
})

// 2. rerun-build (84.90 S -> 85.35 S)
updateAgent('rerun-build', {
  dimensions: { capacidad: 83, autonomia: 82, computadora: 88, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 76 },
  release_highlight: 'v0.22.3 (y v0.21–v0.22): Vault compartido con múltiples cuentas por app (LinkedIn/WhatsApp Pro, MCP), Chief of Staff respondiendo tarjetas en espera y pip en Boxes.',
  release_impact: 'Sube a 85.35 S (+0.45): Capacidad 82→83 y Producto 74→76 por Vault multi-cuenta y mejoras del Chief of Staff.'
})

// 3. agentes-chat (84.60 S -> 84.60 S)
updateAgent('agentes-chat', {
  release_highlight: 'iOS 0.1.6 / Android 0.1.10: apps móviles activas, anotaciones en archivos con pines y visibilidad en vivo cuando un agente consulta a otro.',
  release_impact: 'Se mantiene en 84.60 S: avances de acabado móvil y colaboración en beta abierta sin cambios de pilares.'
})

// 4. nousresearch-hermes-agent (83.55 S -> 83.85 S)
updateAgent('nousresearch-hermes-agent', {
  dimensions: { capacidad: 80, autonomia: 75, computadora: 85, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 79 },
  release_highlight: 'v0.23.3 estable (y canary 2026-11-23): consolida ~370 PRs y 1,657 commits para CLI, Desktop (macOS/Windows MSIX), Microsoft Store, Docker y Hermes Cloud.',
  release_impact: 'Sube a 83.85 S (+0.30): Producto 77→79 por la consolidación estable multiplataforma v0.23.3.'
})

// 5. cubebot (83.10 S -> 83.85 S)
updateAgent('cubebot', {
  dimensions: { capacidad: 84, autonomia: 78, computadora: 92, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 65 },
  release_highlight: 'v0.5.3 (y v0.4–v0.5): solicitudes de sala ejecutadas como equipo con agente líder, tarjetas de pago en Vault, coding harness, conector Devin y trazabilidad por respuesta.',
  release_impact: 'Sube a 83.85 S (+0.75): Capacidad 82→84 y Producto 62→65 por el salto v0.2→v0.5 en equipo, trazas y conectores.'
})

// 6. leepokai-codync (76.15 A -> 83.60 S, ADN 74 -> 100)
updateAgent('leepokai-codync', {
  platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'],
  pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
  dimensions: { capacidad: 80, autonomia: 78, computadora: 86, memoria: 90, rutinas: 86, equipo: 90, confianza: 90, producto: 76 },
  summary: 'Convierte más de 40 agentes CLI (Claude Code, Codex, Gemini, Hermes, OpenCode…) en bots persistentes con memoria, rutinas, trabajo en segundo plano, aprobaciones, pantalla remota, Codync Cloud y apps nativas para macOS, Windows, Linux, iOS y Android.',
  strengths: [
    'Bots persistentes con memoria, chats grupales, delegación, modo Advisor y subagentes visibles',
    'Trabajo en segundo plano con event box, rutinas, webhooks y watchdog de tareas atascadas',
    'Codync Cloud para levantar computadoras en la nube desde iPhone, Android o escritorio, además de pantalla remota WebRTC',
    'App nativa en App Store y Google Play con relay E2E gratuito'
  ],
  weaknesses: [
    'Sigue dependiendo de suscripciones/CLIs externos para los motores de los agentes',
    'Pantalla remota aún no disponible en hosts Windows',
    'Ecosistema todavía mediano frente a plataformas más antiguas'
  ],
  comparison: 'Con rutinas, trabajo en segundo plano, Codync Cloud y Android ya cubre los 8/8 pilares de Grok Bot usando tus propios agentes CLI; su madurez de producto aún es menor.',
  evidence: {
    ...(agentsIdx.get('leepokai-codync')?.evidence || {}),
    ...(agentsOv['leepokai-codync']?.evidence || {}),
    rutinas: [
      {
        text: "Background work and the event box : a bot hands long work to background agents and keeps answering... Routines and other bots' requests run there too, background work can ask for approval or a choice and send files in the chat, and an hourly look picks up work no event reported.",
        source: 'https://github.com/leepokai/Codync/releases/tag/v2.49.1'
      }
    ],
    desatendido: [
      {
        text: "Codync Cloud : first-time setup on the iPhone and Android apps can start a cloud computer instead of installing Codync on one of yours, then waits until it's ready and opens your bots.",
        source: 'https://github.com/leepokai/Codync/releases/tag/v2.51.0'
      }
    ]
  },
  note: 'Revisión v2.49.1–v2.53.0 (2026-11-22): añade trabajo en segundo plano con event box, rutinas y webhooks, Codync Cloud desde iOS/Android/escritorio, modo Advisor, ACP elicitation y app en Google Play. Rutinas y Desatendido pasan a ON (ADN 100).',
  release_highlight: 'v2.53.0 (y v2.49–v2.52): Codync Cloud, rutinas con event box y watchdog, modo Advisor, subagentes en transcript y app Android en Google Play.',
  release_impact: 'Sube a Tier S (+7.45, ADN 74→100): Rutinas 55→86, Autonomía 60→78, Computadora 83→86 y Producto 70→76; Rutinas y Desatendido pasan a ON.'
})

// 7. milind-soni-openmausbot (81.45 S -> 82.80 S)
updateAgent('milind-soni-openmausbot', {
  dimensions: { capacidad: 80, autonomia: 77, computadora: 83, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 72 },
  release_highlight: 'v0.1.177 (y v0.1.170–v0.1.176): conversaciones bot-a-bot visibles en vivo, revisión "Check before done" por otro bot, auto-recordatorios, autocompactación y OpenCode en un clic.',
  release_impact: 'Sube a 82.80 S (+1.35): Capacidad 78→80, Autonomía 74→77 y Producto 68→72. Desatendido sigue en falso para uso local sin nube/servidor.'
})

// 8. anil-matcha-open-duet / suparagent (82.20 S -> 82.65 S)
updateAgent('anil-matcha-open-duet', {
  dimensions: { capacidad: 83, autonomia: 78, computadora: 85, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 65 },
  release_highlight: 'v0.8.7: servidores MCP personalizados con login en navegador, búsqueda de herramientas y compartición en equipo.',
  release_impact: 'Sube a 82.65 S (+0.45): Capacidad 82→83 y Producto 63→65 por MCP compartido en equipo.'
})

// 9. cosmicstack-labs-mercury-agent (80.70 S -> 82.40 S)
updateAgent('cosmicstack-labs-mercury-agent', {
  platforms: ['macOS', 'Windows', 'Linux', 'Web', 'iOS', 'Android'],
  channels: ['Chat', 'WhatsApp', 'Telegram', 'Slack', 'Discord', 'Signal', 'Voz'],
  dimensions: { capacidad: 78, autonomia: 78, computadora: 79, memoria: 90, rutinas: 90, equipo: 90, confianza: 92, producto: 73 },
  evidence: mergeEvidence(agentsOv['cosmicstack-labs-mercury-agent']?.evidence, agentsIdx.get('cosmicstack-labs-mercury-agent')?.evidence, {
    aprobaciones: [
      {
        text: "Sends, shares, uploads and deletes always ask you , even under Allow All. They're refused in scheduled tasks and for bots.",
        source: 'https://github.com/cosmicstack-labs/mercury-agent/releases/tag/v1.5.3'
      }
    ]
  }),
  release_highlight: 'v1.5.5 (y v1.5.3–v1.5.4): apps móviles iOS/Android con llamadas de voz en ~2s, Google Workspace en un comando, defensa anti-prompt-injection, tokens de dispositivo y escalado humano multicanal.',
  release_impact: 'Sube a 82.40 S (+1.70): Capacidad 74→78, Confianza 90→92 y Producto 67→73 por móvil/voz, Google Workspace y seguridad.'
})

// 10. nanocoai-nanoclaw (78.55 A -> 81.40 S, ADN 76 -> 86)
updateAgent('nanocoai-nanoclaw', {
  pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: false, coordinacion: true, aprobaciones: true, desatendido: true },
  dimensions: { capacidad: 82, autonomia: 72, computadora: 85, memoria: 90, rutinas: 90, equipo: 90, confianza: 76, producto: 73 },
  evidence: mergeEvidence(agentsOv['nanocoai-nanoclaw']?.evidence, agentsIdx.get('nanocoai-nanoclaw')?.evidence, {
    aprobaciones: [
      {
        text: 'Each agent gets only the keys you give it. OneCLI moves to 1.45, where new agent groups get only their model key and other keys go to the groups you choose.',
        source: 'https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0'
      },
      {
        text: 'gateway approval cards mark anything they shorten, an approval card changes only after NanoClaw accepts the click',
        source: 'https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0-beta.4'
      }
    ]
  }),
  note: 'Revisión v2026.11.0 estable (2026-11-21): añade tarjetas de aprobación en gateway, aislamiento de llaves por agente con OneCLI 1.45, Cursor Agent SDK, plantillas de agentes y tarjetas con KPIs/gráficos en Slack. Aprobaciones pasa a ON.',
  release_highlight: 'v2026.11.0 estable: llaves aisladas por agente (OneCLI 1.45), tarjetas de aprobación en gateway, creación de agentes desde plantillas, Cursor SDK y tarjetas KPI en Slack.',
  release_impact: 'Sube a Tier S (+2.85, ADN 76→86): Confianza 55→76, Capacidad 80→82 y Producto 70→73; Aprobaciones pasa a ON.'
})

// 11. clawboo (79.50 A -> 81.00 S)
updateAgent('clawboo', {
  dimensions: { capacidad: 78, autonomia: 74, computadora: 78, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 70 },
  weaknesses: (agentsOv.clawboo?.weaknesses || agentsIdx.get('clawboo')?.weaknesses || []).map(w =>
    w.includes('no una VM aislada')
      ? 'Aislamiento por usuario OS disponible solo en Linux (en macOS/Windows comparte entorno local)'
      : w
  ),
  evidence: mergeEvidence(agentsOv.clawboo?.evidence, agentsIdx.get('clawboo')?.evidence, {
    computadora: [
      {
        text: 'On Linux, each agent can now run as an operating system user of its own, so agents are walled off from each other as well as from Clawboo.',
        source: 'https://github.com/clawboo/clawboo/releases/tag/clawboo%400.8.0'
      }
    ]
  }),
  release_highlight: '0.9.1 (y 0.8.0–0.9.0): aislamiento por usuario de sistema operativo en Linux (perfil de navegador, display y procesos propios por agente) y dashboard rediseñado.',
  release_impact: 'Sube a Tier S (+1.50): Computadora 70→78 y Producto 68→70 por aislamiento real por usuario OS en Linux.'
})

// 12. orkas-ai-orkas (79.60 A -> 79.60 A)
updateAgent('orkas-ai-orkas', {
  release_highlight: 'v2026.11.16: Content workbench, líneas de tiempo de vídeo, etiquetas Orkas·Voice y herramientas mejoradas de imágenes RAW, PDF y Office.',
  release_impact: 'Se mantiene en 79.60 A: mejoras creativas y multimedia sin cambios en aprobaciones ni ejecución desatendida.'
})

// 13. modelflare-ai-anymodelbot (78.25 A -> 79.35 A)
updateAgent('modelflare-ai-anymodelbot', {
  dimensions: { capacidad: 84, autonomia: 78, computadora: 89, memoria: 90, rutinas: 90, equipo: 55, confianza: 92, producto: 60 },
  release_highlight: 'v0.1.47 (y v0.1.42–v0.1.46): sandbox estricto con bubblewrap en Linux, carpeta de trabajo in-place con aprobación fuera del límite, adjuntos ZIP/imágenes y generación de imágenes con confirmación de coste.',
  release_impact: 'Sube a 79.35 A (+1.10): Confianza 90→92 y Producto 54→60 por sandbox bubblewrap, carpeta de trabajo y mejoras de UX.'
})

// 14. sentelabsai-openexecutive (71.05 A -> 78.40 A, ADN 32 -> 82)
updateAgent('sentelabsai-openexecutive', {
  channels: ['Chat', 'Email', 'Slack', 'Telegram', 'Discord', 'Google Chat'],
  pillars: { identidad: true, computadora: false, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
  dimensions: { capacidad: 82, autonomia: 78, computadora: 62, memoria: 84, rutinas: 82, equipo: 90, confianza: 90, producto: 70 },
  summary: 'Equipo ejecutivo open source (ahora bajo ForeactLabs) con una voz unificada, memoria episódica en SQLite, scheduler integrado, aprobaciones por montos/reglas, extensión de Chrome para operar webs e integraciones con Slack, Google Chat, Email, Google Workspace, Microsoft 365 y MCP.',
  weaknesses: (agentsIdx.get('sentelabsai-openexecutive')?.weaknesses || []).map(w =>
    w.includes('No opera apps')
      ? 'Depende de la extensión Chrome abierta en el navegador de la persona; no tiene máquina/VM propia'
      : w
  ),
  evidence: mergeEvidence(agentsOv['sentelabsai-openexecutive']?.evidence, agentsIdx.get('sentelabsai-openexecutive')?.evidence, {
    memoria: [
      {
        text: 'Episodic memory — After every response, a background claude-haiku-5-5 pass extracts key decisions, initiatives, and advice into SQLite.',
        source: 'https://github.com/ForeactLabs/OpenExecutive#readme'
      }
    ],
    rutinas: [
      {
        text: 'Scheduler — A built-in job runner claims due actions via UPDATE … RETURNING to prevent double-firing.',
        source: 'https://github.com/ForeactLabs/OpenExecutive#readme'
      }
    ],
    apps: [
      {
        text: "With the Open Executive extension in Chrome, it looks at the page you're on, clicks, types, fills in forms and opens pages until the job is done.",
        source: 'https://github.com/ForeactLabs/OpenExecutive#readme'
      }
    ],
    desatendido: [
      {
        text: 'workflows: run background passes in one loop with no step count (#923)',
        source: 'https://github.com/ForeactLabs/OpenExecutive/releases/tag/v0.7.7'
      }
    ]
  }),
  note: 'Revisión v0.7.4–v0.7.7 y README actual (ForeactLabs/OpenExecutive): documenta memoria episódica en SQLite, scheduler propio con página Schedule, control de navegador Chrome por extensión, canales corporativos y workflows en segundo plano. Computadora propia sigue en falso (usa el Chrome del usuario, no una VM/terminal propia).',
  release_highlight: 'v0.7.7 (y v0.7.4–v0.7.6): navegador del usuario desde extensión Chrome, aprobación directa en chat/Slack/Google Chat con "Or tell me", página Schedule y workflows en segundo plano.',
  release_impact: 'Sube a 78.40 A (+7.35, ADN 32→82): Memoria, Rutinas, Apps reales y Desatendido pasan a ON con evidencia del README y releases v0.7.5–v0.7.7.'
})

// 15. agentscope-ai-qwenpaw (65.70 B -> 78.05 A, ADN 28 -> 100)
updateAgent('agentscope-ai-qwenpaw', {
  category: 'teams',
  platforms: ['macOS', 'Windows', 'Linux', 'Web'],
  channels: ['Chat', 'Web', 'Telegram', 'Discord', 'DingTalk', 'WeChat', 'QQ', 'iMessage'],
  pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
  dimensions: { capacidad: 78, autonomia: 74, computadora: 81, memoria: 86, rutinas: 84, equipo: 78, confianza: 78, producto: 70 },
  summary: 'Asistente open source de AgentScope (local o en la nube) con memoria en tres capas (ReMe), browser-use y computer-use, tareas programadas (cron), subagentes y protocolo ACP, modelos locales Piccolo para revisión de herramientas y conexión a Telegram, Discord, DingTalk, Lark, WeChat y QQ.',
  strengths: [
    'Despliegue local, Docker o cloud con memoria de 3 capas (ReMe), cron, browser-use y computer-use',
    'Subagentes independientes, protocolo ACP y modelos locales Piccolo para revisión y compactación',
    'Ecosistema AgentScope detrás con más de 38.000 estrellas y amplia oferta de canales y plugins'
  ],
  weaknesses: [
    'La app de escritorio Tauri sigue en fase Beta con optimizaciones pendientes',
    'Ecosistema muy cargado de canales asiáticos; la configuración inicial y el alcance de plugins son densos',
    'Gobernanza multi-agente y estabilidad de despliegues complejos aún requieren validación práctica'
  ],
  evidence: mergeEvidence(agentsOv['agentscope-ai-qwenpaw']?.evidence, agentsIdx.get('agentscope-ai-qwenpaw')?.evidence, {
    memoria: [
      {
        text: 'Three-layer memory — live working context, full verbatim history, and a self-evolving personal knowledge base powered by ReMe.',
        source: 'https://github.com/agentscope-ai/QwenPaw#readme'
      }
    ],
    rutinas: [
      {
        text: 'Automation & scheduling: Set up recurring tasks — news digests, report generation, multi-channel broadcasting — all on your schedule.',
        source: 'https://github.com/agentscope-ai/QwenPaw#readme'
      }
    ],
    apps: [
      {
        text: 'v2.1.0 | QwenPaw OS Shell, unified Files workspace, QwenPaw Creator, Codex/Qoder Agent integration, Browser-use, Computer-use',
        source: 'https://github.com/agentscope-ai/QwenPaw#readme'
      }
    ],
    coordinacion: [
      {
        text: 'Multi-agent & parallel: Spawn independent agents with their own memory and skills. Sub-agents at runtime. Agent Communication Protocol (ACP) for cross-system orchestration.',
        source: 'https://github.com/agentscope-ai/QwenPaw#readme'
      }
    ],
    aprobaciones: [
      {
        text: 'fix(security): require approval for shell-based email sends, HTTP writes, and uploads (#8810)',
        source: 'https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.1-beta.1'
      }
    ],
    desatendido: [
      {
        text: 'Let desktop windows share one background service, keep tasks running after closing the last window',
        source: 'https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0'
      }
    ]
  }),
  note: 'Revisión v2.3.0–v2.3.1-beta.1 y README actual: memoria de 3 capas (ReMe), cron/scheduling, browser-use y computer-use, multi-agente/ACP, servicio en segundo plano y aprobaciones de seguridad en shell más modelos Piccolo de revisión. Pasa a 8/8 pilares.',
  release_highlight: 'v2.3.1-beta.1 (y v2.3.0/post1): aprobación obligatoria para envíos de correo/HTTP/uploads en shell, seguimiento de cron, plugins de terceros y modelos locales Piccolo.',
  release_impact: 'Sube a Tier A (+12.35, ADN 28→100): Memoria, Rutinas, Apps, Coordinación, Aprobaciones y Desatendido pasan a ON con evidencia verificada.'
})

// 16. androoagi-starnet (71.00 A -> 77.45 A, ADN 60 -> 86)
updateAgent('androoagi-starnet', {
  channels: ['Chat', 'Telegram', 'Discord', 'Slack', 'Signal', 'Matrix'],
  pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: false, coordinacion: true, aprobaciones: true, desatendido: true },
  dimensions: { capacidad: 74, autonomia: 70, computadora: 79, memoria: 90, rutinas: 82, equipo: 90, confianza: 82, producto: 64 },
  weaknesses: (agentsIdx.get('androoagi-starnet')?.weaknesses || []).map(w =>
    w.includes('no demuestran aprobaciones')
      ? 'Aún carece de máquina persistente en la nube: las rutinas dependen del equipo encendido o en segundo plano'
      : w
  ),
  evidence: mergeEvidence(agentsOv['androoagi-starnet']?.evidence, agentsIdx.get('androoagi-starnet')?.evidence, {
    rutinas: [
      {
        text: 'Recipes, skills, schedules: Launch proven multi-step recipes, grant reusable skills, and put work on cron schedules with visible output.',
        source: 'https://github.com/androoAGI/starnet#readme'
      }
    ],
    aprobaciones: [
      {
        text: "the chosen agent's conversation beside it, and every approval as a card you answer with y or n ... starnet approve / starnet deny",
        source: 'https://github.com/androoAGI/starnet#readme'
      }
    ]
  }),
  note: 'Revisión v0.15.3–v0.15.4 y README actual: documenta cron schedules/rutinas, tarjetas de aprobación (GUI y CLI starnet approve/deny), canales Telegram/Discord/Slack/Signal/Matrix y endurecimiento de permisos Full Access.',
  release_highlight: 'v0.15.4 (y v0.15.3): nuevo dashboard, endurecimiento de permisos con confirmación para accesos permanentes y rutinas más limpias en el listado de sesiones.',
  release_impact: 'Sube a 77.45 A (+6.45, ADN 60→86): Rutinas 55→82 y Confianza 55→82; ambos pilares pasan a ON.'
})

// 17. makecindy-cindy (63.75 B -> 75.90 A, ADN 32 -> 90)
updateAgent('makecindy-cindy', {
  category: 'teams',
  platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'],
  channels: ['Chat', 'Móvil', 'Slack', 'Telegram', 'Discord', 'WeChat', 'iMessage'],
  pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: false, desatendido: true },
  dimensions: { capacidad: 78, autonomia: 74, computadora: 82, memoria: 82, rutinas: 82, equipo: 82, confianza: 60, producto: 68 },
  summary: 'Agente y equipo de compañeros open source multiplataforma (macOS, Windows, Linux, iOS y Android) con escritorio remoto desde móvil, hosts en la nube, Lead/Workers colaborativos en grupo, memoria sincronizada, automatizaciones por evento/horario y motor de plugins.',
  weaknesses: (agentsIdx.get('makecindy-cindy')?.weaknesses || []).map(w =>
    w.includes('Sin evidencia de rutinas')
      ? 'Aprobaciones granulares antes de acciones irreversibles siguen poco documentadas'
      : w
  ),
  evidence: mergeEvidence(agentsOv['makecindy-cindy']?.evidence, agentsIdx.get('makecindy-cindy')?.evidence, {
    identidad: [
      {
        text: 'Cloud companions sync their conversations, memory, skills and shared attachments.',
        source: 'https://github.com/makecindy/cindy#readme'
      }
    ],
    memoria: [
      {
        text: 'Make experience reusable. Keep useful preferences and knowledge in memory; Cloud companions sync their conversations, memory, skills and shared attachments.',
        source: 'https://github.com/makecindy/cindy#readme'
      }
    ],
    rutinas: [
      {
        text: 'Build a recurring routine with automations, or hand over work through connected chat channels such as Slack and Telegram.',
        source: 'https://github.com/makecindy/cindy#readme'
      }
    ],
    coordinacion: [
      {
        text: 'One agent not enough? Let her lead a team.',
        source: 'https://github.com/makecindy/cindy#readme'
      },
      {
        text: '群里直接 @ 两位伙伴就能协作同一条请求，也可以只找一位伙伴安排分工',
        source: 'https://github.com/makecindy/cindy/releases/tag/v0.1.143'
      }
    ],
    desatendido: [
      {
        text: '普通自动化支持按单个 PR 触发，定时检查持续跟进... 异常结束的 Worker 会自动续接',
        source: 'https://github.com/makecindy/cindy/releases/tag/v0.1.141'
      }
    ]
  }),
  note: 'Revisión v0.1.141–v0.1.144 y README actual: compañeros con rol y grupos @mención, Lead/Workers con auto-recuperación, memoria, automatizaciones por PR/horario, hosts cloud/Linux y escritorio remoto móvil. Aprobaciones granulares de acciones irreversibles sigue en falso.',
  release_highlight: 'v0.1.144 (y v0.1.141–v0.1.143): colaboración multi-agente Lead/Workers, bandeja de tareas, hosts cloud/Linux, motor de plugins compartido y reconexión móvil en <2s.',
  release_impact: 'Sube a Tier A (+12.15, ADN 32→90): Identidad, Memoria, Rutinas, Coordinación y Desatendido pasan a ON; Producto 52→68.'
})

// 18. rokaswk-threebot (70.05 A -> 73.35 A)
updateAgent('rokaswk-threebot', {
  dimensions: { capacidad: 64, autonomia: 66, computadora: 65, memoria: 90, rutinas: 90, equipo: 90, confianza: 90, producto: 54 },
  release_highlight: 'v0.1.15 (y v0.1.11–v0.1.14): instalador Windows en un clic + servicio en segundo plano, acceso móvil por QR, rutinas con modelo propio, salas que siguen subagentes y notificaciones push por bot.',
  release_impact: 'Sube a 73.35 A (+3.30): Producto 40→54, Capacidad 60→64 y Autonomía 62→66 por madurez en Windows, móvil y salas.'
})

// 19. gcwing-openbitfun (65.25 B -> 73.15 A, ADN 32 -> 78)
updateAgent('gcwing-openbitfun', {
  platforms: ['macOS', 'Windows', 'Linux', 'Web'],
  channels: ['Chat', 'Telegram', 'WeChat', 'Feishu'],
  pillars: { identidad: false, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: false, aprobaciones: true, desatendido: true },
  dimensions: { capacidad: 78, autonomia: 72, computadora: 81, memoria: 80, rutinas: 76, equipo: 55, confianza: 78, producto: 64 },
  evidence: mergeEvidence(agentsOv['gcwing-openbitfun']?.evidence, agentsIdx.get('gcwing-openbitfun')?.evidence, {
    memoria: [
      {
        text: 'The Rust Agent Runtime manages session state, context, and tool execution. Persistent sessions, interruption recovery, long-term memory, and support for extended tasks help keep work moving.',
        source: 'https://github.com/openBitFun/OpenBitFun#readme'
      }
    ],
    rutinas: [
      {
        text: 'fix(cron): stop retrying failed scheduled occurrences',
        source: 'https://github.com/openBitFun/OpenBitFun/releases/tag/v1.0.12'
      }
    ],
    aprobaciones: [
      {
        text: 'Send instructions, check progress, and respond to approval requests from your phone or browser.',
        source: 'https://github.com/openBitFun/OpenBitFun#readme'
      }
    ],
    desatendido: [
      {
        text: 'Tasks run on the selected host and keep going when you switch views or disconnect the phone.',
        source: 'https://github.com/openBitFun/OpenBitFun#readme'
      }
    ]
  }),
  note: 'Revisión v1.0.11–v1.0.12 y README actual (openBitFun/OpenBitFun): añade aprobación de herramientas basada en modelo y desde móvil, memoria a largo plazo, cron/hooks y ejecución persistente en hosts remotos vía SSH. Sin equipo multi-bot ni identidad por bot.',
  release_highlight: 'v1.0.12 (y v1.0.11): aprobación de herramientas basada en modelo, recuperación remota con Telegram/Feishu/WeChat, workbench LaTeX/PDF, cron y transporte WebSocket.',
  release_impact: 'Sube a Tier A (+7.90, ADN 32→78): Memoria, Rutinas, Aprobaciones y Desatendido pasan a ON.'
})

// 20. ai-timon-timon (59.05 C -> 72.70 A, ADN 42 -> 100)
updateAgent('ai-timon-timon', {
  platforms: ['macOS', 'Windows', 'Linux', 'Web'],
  channels: ['Chat', 'Telegram', 'CLI'],
  pillars: { identidad: true, computadora: true, memoria: true, rutinas: true, apps: true, coordinacion: true, aprobaciones: true, desatendido: true },
  dimensions: { capacidad: 68, autonomia: 68, computadora: 72, memoria: 82, rutinas: 84, equipo: 90, confianza: 90, producto: 46 },
  weaknesses: [
    'Proyecto joven (725 estrellas) con historial corto frente a alternativas consolidadas',
    'Depende de suscripciones/CLIs de terceros (Claude, Antigravity, etc.) y sus cuotas',
    'Ecosistema de plugins todavía pequeño'
  ],
  evidence: mergeEvidence(agentsOv['ai-timon-timon']?.evidence, agentsIdx.get('ai-timon-timon')?.evidence, {
    computadora: [
      {
        text: 'A built-in browser: isolated per mission, with annotations and recordings.',
        source: 'https://github.com/ai-timon/timon#readme'
      }
    ],
    memoria: [
      {
        text: 'Memory that reaches the agent: a rule learned once is injected into the next mission.',
        source: 'https://github.com/ai-timon/timon#readme'
      }
    ],
    rutinas: [
      {
        text: 'Routines, cron and webhook triggers, overnight series paced to your quotas.',
        source: 'https://github.com/ai-timon/timon#readme'
      }
    ],
    apps: [
      {
        text: 'A browser recording now shows a manual step when you act inside an embedded frame (a payment form, a captcha, a sign-in widget), and the learned skill pauses there and asks you to do that part yourself.',
        source: 'https://github.com/ai-timon/timon/releases/tag/v0.1.9'
      }
    ]
  }),
  note: 'Revisión v0.1.8–v0.1.9 y README actual: navegador aislado por misión con grabaciones/skills y pausa humana en pagos/captchas, memoria entre misiones, cron/webhooks/series nocturnas, soporte Google Antigravity (agy) con tarjetas Allow/Deny y servicio en Windows/macOS/Linux. Proyecto pequeño todavía.',
  release_highlight: 'v0.1.9 (y v0.1.8): soporte Google Antigravity (agy) con tarjetas Allow/Deny, grabaciones de navegador con pausa humana, actualizaciones in-app, modo Free sin licencia y mejoras en Windows.',
  release_impact: 'Sube a Tier A (+13.65, ADN 42→100): Computadora, Memoria, Rutinas y Apps pasan a ON; Producto 29→46 (sigue siendo proyecto joven).'
})

// 21. fei2411-ds-bot (60.95 B -> 72.40 A, ADN 40 -> 74)
updateAgent('fei2411-ds-bot', {
  category: 'teams',
  platforms: ['macOS', 'Windows', 'Linux', 'Web', 'Android'],
  channels: ['Chat', 'Telegram', 'Discord', 'Slack', 'WeChat', 'Feishu', 'DingTalk'],
  pillars: { identidad: true, computadora: true, memoria: true, rutinas: false, apps: true, coordinacion: true, aprobaciones: true, desatendido: false },
  dimensions: { capacidad: 72, autonomia: 66, computadora: 76, memoria: 84, rutinas: 55, equipo: 90, confianza: 78, producto: 64 },
  summary: 'App de escritorio y Android open source sobre DeepSeek Harness (Fei-Craft/DS-Bot) para crear bots y chats grupales con memoria, navegador aislado por bot, computer use, tareas asíncronas en segundo plano, 25+ CLIs locales (incluido Antigravity), aprobaciones e integración IM.',
  weaknesses: [
    'Sin rutinas cron programadas ni ejecución desatendida 24/7 sin el PC encendido',
    'Depende de DeepSeek Harness y de los límites de las cuentas/CLIs locales',
    'Proyecto aún joven (v0.3.10) en evolución rápida e instaladores sin firma comercial'
  ],
  evidence: mergeEvidence(agentsOv['fei2411-ds-bot']?.evidence, agentsIdx.get('fei2411-ds-bot')?.evidence, {
    memoria: [
      {
        text: 'Bots also have memory. A bot remembers what you like and uses it in later work... A group chat has its own memory and working folder.',
        source: 'https://github.com/Fei-Craft/DS-Bot#readme'
      }
    ],
    apps: [
      {
        text: 'Each bot has its own isolated browser with separate sign-ins... Turn on Settings → Computer use to let bots operate apps on your computer as far as you allow.',
        source: 'https://github.com/Fei-Craft/DS-Bot#readme'
      }
    ],
    aprobaciones: [
      {
        text: 'Once paired, you can talk to your bots, @ them in groups, and answer question and approval cards directly... local commands added by a bot need your approval before they run.',
        source: 'https://github.com/Fei-Craft/DS-Bot#readme'
      }
    ]
  }),
  note: 'Revisión v0.3.8–v0.3.10 y README actual (Fei-Craft/DS-Bot): memoria por bot/grupo, navegador aislado, computer use, tarjetas de aprobación en IM, tareas asíncronas y 25+ CLIs locales + APK Android. Rutinas y Desatendido siguen en falso (requiere el PC despierto y sin cron documentado).',
  release_highlight: 'v0.3.10 (y v0.3.8–v0.3.9): tareas asíncronas en segundo plano (task_start/stop), Antigravity + 24 CLIs con MCP stdio, consola Settings con búsqueda ⌘K y app Android.',
  release_impact: 'Sube a Tier A (+11.45, ADN 40→74): Memoria, Apps reales y Aprobaciones pasan a ON; Capacidad 62→72, Autonomía 54→66 y Producto 50→64.'
})

// 22. agentvivekkumar-dontbemichael (67.15 B -> 67.60 B)
updateAgent('agentvivekkumar-dontbemichael', {
  dimensions: { capacidad: 62, autonomia: 55, computadora: 67, memoria: 90, rutinas: 55, equipo: 90, confianza: 90, producto: 50 },
  release_highlight: 'v0.4.3 (y v0.4.2): soporte para gestionar varios negocios separados en el mismo equipo y adjuntos de archivos visibles en tarjetas de aprobación.',
  release_impact: 'Sube a 67.60 B (+0.45): Producto 47→50 por soporte multi-negocio y mejoras en tarjetas de aprobación.'
})

// 23. rome-os-rome (64.80 B -> 66.15 B)
updateAgent('rome-os-rome', {
  platforms: ['Web', 'Linux', 'iOS'],
  channels: ['Chat', 'Voz', 'Slack', 'Discord'],
  dimensions: { capacidad: 73, autonomia: 67, computadora: 75, memoria: 90, rutinas: 55, equipo: 55, confianza: 55, producto: 56 },
  release_highlight: 'v1.1.222 (y v1.1.218–v1.1.220 + iOS 1.0.0 TestFlight): conversaciones de voz por WebSocket, cliente iOS, selector AI Tools con cambio de proveedor e integraciones Slack/Discord.',
  release_impact: 'Sube a 66.15 B (+1.35): Capacidad 70→73 y Producto 50→56 por voz en tiempo real y cliente iOS.'
})

// 24. netease-youdao-lobsterai (62.10 B -> 62.70 B)
updateAgent('netease-youdao-lobsterai', {
  dimensions: { capacidad: 78, autonomia: 74, computadora: 55, memoria: 60, rutinas: 55, equipo: 55, confianza: 55, producto: 61 },
  release_highlight: '2026.11.20 (y 2026.11.16): contexto seleccionable hasta 1M tokens, edición de mensajes con historial de versiones, lectura en voz alta, búsqueda full-text y asistente PPT.',
  release_impact: 'Sube a 62.70 B (+0.60): Capacidad 76→78 y Producto 59→61.'
})

// ============================================================================
// B. ADEs (research/ades/overrides.json)
// ============================================================================

// 1. orca (90.21 SS -> 91.74 SS)
updateAde('orca', {
  scores: { harnesses: 98, paralelo: 94, orquestacion: 91, revision: 90, remoto: 91, movil: 92, extensiones: 88, control: 80, abierto: 95, producto: 95 },
  harnesses: ['claude code', 'codex', 'gemini', 'opencode', 'cursor', 'amp', 'devin', 'copilot', 'grok', 'qwen', 'hermes', 'antigravity', 'kiro', 'kimi', 'goose'],
  evidence: mergeEvidence(adesOv.orca?.evidence, adesIdx.get('orca')?.evidence, {
    harnesses: [
      {
        text: 'Bots can now run on Cursor, GitHub Copilot and Hermes... Kiro, Kimi Code, Auggie, Gemini CLI, Kilo Code, MiMo Code, Droid, Goose and Qwen Code.',
        source: 'https://github.com/stablyai/orca/releases/tag/v1.4.269'
      }
    ],
    movil: [
      {
        text: "Edit an agent's automations, connect Slack, Linear, GitHub, Google and Composio, share an agent by link, import one from OpenClaw or Hermes, read its soul and manage its memory and skills... review tool approvals and access requests in Needs you.",
        source: 'https://github.com/stablyai/orca/releases/tag/v1.4.271'
      }
    ]
  }),
  release_highlight: 'v1.4.272 (y v1.4.267–v1.4.271): bots en 12+ harnesses nuevos (Cursor, Copilot, Hermes, Qwen Code, Gemini CLI, Antigravity…), grupos entre computadoras emparejadas, gestión completa desde móvil y recuperación automática tras límites o caídas.',
  release_impact: 'Consolida Tier SS (+1.53): Harnesses 95→98, Orquestación 88→91, Remoto 88→91, Móvil 86→92 y Producto 94→95.'
})

// 2. t3-code (88.17 S -> 89.19 S)
updateAde('t3-code', {
  scores: { harnesses: 95, paralelo: 92, orquestacion: 90, revision: 89, remoto: 88, movil: 84, extensiones: 85, control: 77, abierto: 95, producto: 91 },
  evidence: mergeEvidence(adesOv['t3-code']?.evidence, adesIdx.get('t3-code')?.evidence, {
    orquestacion: [
      {
        text: 'Workflows (Labs). Run workflows that coordinate agents, code, events, and approvals, and inspect and control them in the app.',
        source: 'https://github.com/pingdotgg/t3code/releases/tag/v0.1.12-nightly.20261123.5124'
      }
    ]
  }),
  release_highlight: 'v0.1.12-nightly.20261123: Workflows (Labs) para coordinar agentes, eventos y aprobaciones; MCP Events webhooks; steering de turnos entre agentes y vistas previas de navegador en segundo plano.',
  release_impact: 'Tier S (+1.02): Orquestación 86→90, Extensiones 82→85 y Control 74→77.'
})

// 3. synara (83.64 S -> 85.12 S)
updateAde('synara', {
  platforms: ['macOS', 'Windows', 'Linux', 'Web', 'iOS'],
  harnesses: ['claude code', 'codex', 'opencode', 'cursor', 'devin', 'grok', 'antigravity'],
  scores: { harnesses: 90, paralelo: 90, orquestacion: 90, revision: 86, remoto: 82, movil: 80, extensiones: 76, control: 70, abierto: 95, producto: 85 },
  weaknesses: (adesOv.synara?.weaknesses || []).map(w => w === 'Sin app móvil nativa' ? 'App iPhone/iPad todavía en beta' : w),
  evidence: mergeEvidence(adesOv.synara?.evidence, adesIdx.get('synara')?.evidence, {
    movil: [
      {
        text: 'Discover the Synara for iPhone beta from an eligible desktop launch announcement... sparse catch-up response fell from about 676 KB to 2 KB.',
        source: 'https://github.com/Emanuele-web04/synara/releases/tag/v1.6.4'
      }
    ]
  }),
  release_highlight: 'v1.6.5 (y v1.6.0–v1.6.4): beta nativa de Synara para iPhone/iPad, conectores ACP para Antigravity (Notion/Linear), clonado APFS de node_modules en worktrees y 27 % menos memoria.',
  release_impact: 'Tier S (+1.48): Móvil 70→80, Extensiones 72→76, Paralelismo 88→90 y Producto 82→85.'
})

// 4. kandev (83.82 S -> 84.90 S)
updateAde('kandev', {
  scores: { harnesses: 90, paralelo: 88, orquestacion: 92, revision: 88, remoto: 85, movil: 70, extensiones: 78, control: 70, abierto: 95, producto: 80 },
  evidence: mergeEvidence(adesOv.kandev?.evidence, adesIdx.get('kandev')?.evidence, {
    extensiones: [
      {
        text: 'complete plugin grouping for saved sidebar views (#5427)... make Kandev MCP calls wait while detached, with offline budget (#4809).',
        source: 'https://github.com/kdlbs/kandev/releases/tag/v0.103.0'
      }
    ]
  }),
  release_highlight: 'v0.103.1 (y v0.102–v0.103 + pluginsdk v0.4): despacho condicionado a blockers de Linear, paneles de plugins en perfiles/sidebar, anotación en web preview y evidencia con capturas en PRs.',
  release_impact: 'Tier S (+1.08): Extensiones 72→78, Orquestación 90→92 y Revisión 86→88.'
})

// 5. paseo (80.90 A -> 82.48 S)
updateAde('paseo', {
  harnesses: ['claude code', 'codex', 'opencode', 'cursor', 'amp', 'copilot', 'antigravity', 'goose'],
  scores: { harnesses: 88, paralelo: 86, orquestacion: 87, revision: 82, remoto: 84, movil: 88, extensiones: 84, control: 74, abierto: 50, producto: 85 },
  weaknesses: (adesOv.paseo?.weaknesses || []).map(w =>
    w === 'Revisión y PRs no son el foco'
      ? 'Revisión de código más enfocada a seguimiento de PRs que a diff review profundo'
      : w
  ),
  evidence: mergeEvidence(adesOv.paseo?.evidence, adesIdx.get('paseo')?.evidence, {
    revision: [
      {
        text: 'Watch PRs and MRs: Ask an agent to watch a pull or merge request for new checks, reviews, and comments. Use existing worktrees: Start a workspace in a worktree you already have, or create one from a branch or pull request.',
        source: 'https://github.com/getpaseo/paseo/releases/tag/v0.17.1'
      }
    ]
  }),
  release_highlight: 'v0.17.3 estable (y v0.17.0–v0.17.2): seguimiento de PRs/MRs, steering de turnos entre agentes, heartbeats en segundo plano, aprobaciones/historial de Antigravity y métricas de coste/tokens por turno.',
  release_impact: 'Sube a Tier S (+1.58): Revisión 76→82, Control 70→74, Orquestación 84→87 y Producto 82→85.'
})

// 6. ghostex (80.16 A -> 82.40 S)
updateAde('ghostex', {
  scores: { harnesses: 86, paralelo: 84, orquestacion: 86, revision: 78, remoto: 83, movil: 82, extensiones: 75, control: 78, abierto: 90, producto: 81 },
  strengths: appendUnique(adesOv.ghostex?.strengths, 'Cuatro niveles de aprobación en vivo protegidos contra escalado por agentes'),
  weaknesses: (adesOv.ghostex?.weaknesses || []).map(w =>
    w === 'Aprobaciones/control poco documentados'
      ? 'Ritmo de cambios muy rápido (versionado mayor agresivo)'
      : w
  ),
  evidence: mergeEvidence(adesOv.ghostex?.evidence, adesIdx.get('ghostex')?.evidence, {
    control: [
      {
        text: "Approval levels for Non-CLI sessions: pick Ask, Auto-edits, Auto or Full access directly from the chat box's Mode button... Only your own devices can raise approval levels.",
        source: 'https://github.com/maddada/Ghostex/releases/tag/v11.15.0'
      }
    ]
  }),
  release_highlight: 'v11.15.0 (y v11.11–v11.14): 4 niveles de aprobación protegidos por dispositivo, Work items, Ask Ghostex AI, integración Grok Bot sin terminal, enlace servidor-a-servidor y Automations en móvil.',
  release_impact: 'Sube a Tier S (+2.24): Control 62→78, Orquestación 82→86, Remoto 80→83 y Producto 78→81.'
})

// 7. openchamber (80.20 A -> 82.06 S)
updateAde('openchamber', {
  scores: { harnesses: 84, paralelo: 82, orquestacion: 85, revision: 82, remoto: 84, movil: 82, extensiones: 81, control: 68, abierto: 90, producto: 81 },
  strengths: appendUnique(adesOv.openchamber?.strengths, 'Sesiones Lead que delegan y sintetizan trabajo + panel de monitoreo de subagentes'),
  weaknesses: (adesOv.openchamber?.weaknesses || []).map(w =>
    w === 'Orquestación menos profunda'
      ? 'Aprobaciones y políticas de seguridad aún por debajo de los líderes'
      : w
  ),
  evidence: mergeEvidence(adesOv.openchamber?.evidence, adesIdx.get('openchamber')?.evidence, {
    orquestacion: [
      {
        text: 'New Leads: a session that runs a whole direction of work... A lead hands tasks to its own sessions, checks what comes back and keeps a brief and a digest you answer in one reply.',
        source: 'https://github.com/openchamber/openchamber/releases/tag/v2.8.0'
      }
    ]
  }),
  release_highlight: 'v2.8.0 (y v2.7.3 + canary): sesiones Lead que delegan y resumen sub-sesiones, panel en vivo de subagentes, OpenCode Server compartido y edición de documentos Office.',
  release_impact: 'Sube a Tier S (+1.86): Orquestación 75→85, Extensiones 78→81, Revisión 80→82 y Producto 79→81.'
})

// 8. conductor (80.36 A -> 80.72 A)
updateAde('conductor', {
  scores: { harnesses: 90, paralelo: 86, orquestacion: 78, revision: 86, remoto: 92, movil: 88, extensiones: 60, control: 78, abierto: 40, producto: 92 },
  release_highlight: '0.98.0 (y 0.97.0): página Usage con coste y tokens (7/30/90d), barra de tareas en segundo plano con Stop, artefactos HTML inline y autorrecuperación del servicio.',
  release_impact: 'Tier A (+0.36): Control 75→78 y Producto 90→92.'
})

// 9. cloudroom (77.56 A -> 79.55 A)
updateAde('cloudroom', {
  harnesses: ['claude code', 'codex', 'gemini', 'opencode', 'cursor', 'amp', 'devin', 'copilot', 'grok', 'antigravity'],
  scores: { harnesses: 88, paralelo: 83, orquestacion: 75, revision: 78, remoto: 90, movil: 60, extensiones: 70, control: 74, abierto: 90, producto: 77 },
  evidence: mergeEvidence(adesOv.cloudroom?.evidence, adesIdx.get('cloudroom')?.evidence, {
    remoto: [
      {
        text: 'Cloud threads now work with GitLab.com projects, not just GitHub... Connect GitHub can now share only the repos you pick with cloud agents.',
        source: 'https://github.com/davidondrej/cloudroom/releases/tag/gui-v164'
      }
    ]
  }),
  release_highlight: 'gui-v164 (y gui-v161–v163): soporte completo para Antigravity, proyectos GitLab.com en la nube, compartición selectiva de repos, barra de subagentes y burbujas en vivo para comandos en segundo plano.',
  release_impact: 'Tier A (+1.99): Orquestación 70→75, Paralelismo 80→83, Control 70→74, Harnesses 86→88, Remoto 88→90 y Producto 75→77.'
})

// 10. maestri (73.30 A -> 73.68 A)
updateAde('maestri', {
  scores: { harnesses: 84, paralelo: 80, orquestacion: 84, revision: 75, remoto: 72, movil: 78, extensiones: 55, control: 70, abierto: 40, producto: 77 },
  release_highlight: '0.61.0 (y 0.60.0): Spaces en el sidebar y preguntas interactivas con opciones en chat (también en terminales remotas y Maestri Remote).',
  release_impact: 'Tier A (+0.38): Remoto 70→72 y Producto 74→77.'
})

// 11. Otros ADEs con release nueva (sin cambio de score)
const minorAdeUpdates = {
  paradev: ['desktop-v2.0.11 / canary: conector admin, autenticación Bearer unificada para API/MCP/Workers y mejoras de sandbox Codex.', 'Sin cambio de score (85.56 S).'],
  'agent-orchestrator': ['v0.15.5 estable: soporte hosts Linux arm64, revisión PR sobre current-head y login de Cline en Orchestrator Browser.', 'Sin cambio de score (84.18 S).'],
  bb: ['desktop-v0.50.1 / nightly: build estable 0.50.1 y nightly actualizados.', 'Sin cambio de score (83.10 S).'],
  emdash: ['v1.2.13 (y v1.2.12): importación transaccional desde v0 y registro waitlist Emdash 2.0.', 'Sin cambio de score (82.42 S).'],
  cmux: ['nightly-next / cmux-rd-v0.2.9: demonio de escritorio remoto Linux v0.2.9 y compilaciones nightly continuas.', 'Sin cambio de score (78.27 A).'],
  tortie: ['v0.115.0: correcciones de renderizado/scrollback de terminal y estabilidad al arrancar sesiones.', 'Sin cambio de score (73.68 A).'],
  herdr: ['v0.1.17: lanzamientos de mantenimiento v0.1.16–v0.1.17.', 'Sin cambio de score (72.22 A).'],
  solo: ['v0.12.5: corrección de teclas muertas/acentos en macOS y actualización de seguridad OpenSSL.', 'Sin cambio de score (72.20 A).']
}
for (const [slug, [release_highlight, release_impact]] of Object.entries(minorAdeUpdates)) {
  updateAde(slug, { release_highlight, release_impact })
}

// traycer tiene repo público MIT para host/docs, pero la ficha editorial evalúa el producto como cerrado (abierto: 40)
updateAde('traycer', { license: null, licenseType: 'Comercial' })

writeFileSync(agentsOvPath, JSON.stringify(agentsOv, null, 2) + '\n', 'utf8')
writeFileSync(adesOvPath, JSON.stringify(adesOv, null, 2) + '\n', 'utf8')
console.log('OK overrides actualizados (2026-11-23): 24 agentes + 18 ADEs')

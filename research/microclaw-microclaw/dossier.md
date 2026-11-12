# microclaw — dossier de investigación

- **Repo**: https://github.com/microclaw/microclaw
- **Web oficial**: https://microclaw.org
- **Licencia**: MIT
- **Lenguaje**: Rust
- **Estrellas**: 757 · **Forks**: 143
- **Último push**: 2026-11-12T07:00:58Z · **Última release**: 2026-11-12
- **Revisado**: 2026-11-12 · **Confianza**: 63/100
- **Tipo**: bot · **Categoría**: personal

## Qué es

MicroClaw es un asistente agéntico self-hosted escrito en Rust que vive en tus canales de chat (Discord, Telegram, web, APIs) y corre de forma continua con sesiones reanudables, memoria, skills y tareas programadas; el mismo repositorio incluye MicroClaw Code (agente de código de terminal) y un SDK embebible. Está pensado para usuarios técnicos que quieren su propio bot persistente en servidores controlados por ellos.

> Asistente self-hosted en tus canales.

## Nota de verificación

README: asistente self-hosted que vive en canales de chat, con memoria, rutinas y trabajo en segundo plano. No opera apps GUI.

## Evidencia de la investigación

### ✅ Identidad
  - “Read implementation details Personal Infrastructure Agent Run one Server across chats with memory, scheduling, and shell or file tools.” — https://microclaw.org
  - “In MicroClaw Code, Ctrl+B moves a running command to the background and `/jobs` manages background work; `/rewind` takes the conversation back along with the files; sub-agents get their own model (`model.roles.subagent`) and can run as project agents with a `tools` list; and `permissions.reviewer: approve` lets the approval reviewer approve calls it rates SAFE.” — https://github.com/microclaw/microclaw#readme
  - “**MicroClaw Code** (`mccode`) is a coding agent for [Zed](https://zed.dev) and the terminal that works directly in your repository and verifies its edits with your project's own checks.” — https://github.com/microclaw/microclaw#readme

### ✅ Computadora propia
  - “Agents, Skills, events, and controls Local and authenticated remote Workers No Server, channel, or desktop UI dependency Add to your Rust project cargo add microclaw-sdk --features full Copy Start integrating → 0 2 For developers MicroClaw Code For coding in your own repositories A coding agent for Zed's Agent Panel and your terminal.” — https://microclaw.org
  - “**MicroClaw Code** (`mccode`) is a coding agent for [Zed](https://zed.dev) and the terminal that works directly in your repository and verifies its edits with your project's own checks.” — https://github.com/microclaw/microclaw#readme
  - “```json "agent_servers": { "MicroClaw Code": { "type": "custom", "command": "/path/to/mccode", "args": ["acp"] } } ``` Or run it in the terminal: `cd path/to/your/repo && mccode`.” — https://microclaw.org

### ✅ Memoria
  - “It is designed for work that lasts longer than one request: multi-step tool use, resumable sessions, durable delivery, persistent memory, scheduled tasks, and governed extensions all run in the same runtime.” — https://github.com/microclaw/microclaw#readme
  - “Resume session state and load relevant memory, skills, and runtime context.” — https://github.com/microclaw/microclaw#readme
  - “**`microclaw-sdk`** lets other Rust applications run the same channel-independent Agent Engine, tools, policy, memory, skills, and runtime events.” — https://github.com/microclaw/microclaw#readme

### ✅ Rutinas
  - “Scheduler + Background Tasks Recurring and one-shot tasks run through the same runtime.” — https://microclaw.org
  - “Download it free ↗ Get started in Zed → 0 3 Always on MicroClaw Server For services, channels, and automation Run a durable agent service for chat channels, Web and agent APIs, schedules, and background work.” — https://microclaw.org
  - “**MicroClaw Server** (`microclaw`) runs continuously for chat channels, Web, APIs, scheduling, and automation.” — https://github.com/microclaw/microclaw#readme

### ❌ Apps reales
  - “## Community and contributing Questions and ideas are welcome on [Discord](https://discord.gg/eGzEaP6TzR) and [Reddit](https://www.reddit.com/r/microclaw/).” — https://microclaw.org
  - “One embeddable Rust agent core for Server, MicroClaw Code, and your own apps.” — https://microclaw.org
  - “Embeddable Rust SDK Server, Code, and third-party apps use the same Agent Engine through stable run contracts.” — https://microclaw.org

### ❌ Coordinación
  - “Bounded Subagents A Main Agent can delegate observable, cancellable work to bounded native or ACP workers.” — https://microclaw.org
  - “Server + Code Embeddable SDK SQLite Persistence 0 1 Build with it Rust SDK For Rust product and platform teams Embed the complete Agent Engine—or only its stable lifecycle contracts—inside your own application.” — https://microclaw.org
  - “Use MicroClaw for real workloads From individual operators to platform teams, one runtime covers multiple paths.” — https://microclaw.org

### ❌ Aprobaciones
  - “In MicroClaw Code, Ctrl+B moves a running command to the background and `/jobs` manages background work; `/rewind` takes the conversation back along with the files; sub-agents get their own model (`model.roles.subagent`) and can run as project agents with a `tools` list; and `permissions.reviewer: approve` lets the approval reviewer approve calls it rates SAFE.” — https://github.com/microclaw/microclaw#readme
  - “Recommended in Zed: diffs, approval cards, modes, and models Full-screen terminal UI and scriptable -p mode Automatic build, lint, and test verification Install, then add it to Zed curl -fsSL https://microclaw.org/install-mccode.sh | bash && mccode setup Copy No Zed yet?” — https://microclaw.org
  - “- **A coding agent that checks its work.** MicroClaw Code edits your repository with reviewable diffs and approvals, then runs your project's build and lint checks and hands failures back to the agent.” — https://github.com/microclaw/microclaw#readme

### ✅ Desatendido
  - “Use MicroClaw as an always-on Server, as a coding agent in Zed or your terminal, or as an SDK inside your own Rust product.” — https://microclaw.org
  - “Download it free ↗ Get started in Zed → 0 3 Always on MicroClaw Server For services, channels, and automation Run a durable agent service for chat channels, Web and agent APIs, schedules, and background work.” — https://microclaw.org
  - “Scheduler + Background Tasks Recurring and one-shot tasks run through the same runtime.” — https://microclaw.org

## Puntuación

Grok Score: **70.85** · Tier **A** · ADN **64**

- **capacidad**: 70/100
- **autonomia**: 68/100
- **computadora**: 75/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 55/100
- **confianza**: 55/100
- **producto**: 66/100

## Fortalezas

- Producto completo y autocontenido: servidor persistente para chats/web/APIs, agente de código de terminal (mccode) que valida sus propios cambios y SDK sobre un mismo motor de agente.
- Persistencia real de trabajo: sesiones reanudables, entrega durable, memoria y skills, además de scheduling y automatización que se disparan sin prompt del usuario.
- Ritmo de desarrollo altísimo (32 releases en 90 días, versiones casi diarias), documentación traducida a diez idiomas, rama stable y base en Rust, lo que le da ventaja en despliegue ligero y coste por tarea.

## Lo que le falta / riesgos

- No demuestra en el expediente operar aplicaciones reales sin API (navegador/GUI) ni coordinación de subagentes con handoff, ni un sistema de aprobaciones previas a acciones irreversibles.
- Pre-1.0 con cadencia de releases vertiginosa y avisos explícitos de breaking changes en main: estabilidad y gobernanza aún por consolidar.
- Identidad difusa: es más un asistente genérico que se conecta a tus chats que un roster de bots con nombre, rol propio y entorno dedicado; parte del valor (SDK) es infraestructura para que otros construyan.

## Comparación con el listón

Frente a un Grok Bot le falta el bot con nombre e identidad propia, la computadora persistente con navegador para entrar en apps reales y las aprobaciones; frente a CLIs de código como Claude Code o Codex gana persistencia, canales y rutinas, pero queda por detrás en madurez y en operación de aplicaciones.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/microclaw/microclaw) · consultado 2026-11-12
- [Web oficial](https://microclaw.org) · consultado 2026-11-12
- [README](https://github.com/microclaw/microclaw#readme) · consultado 2026-11-12
- [Releases](https://github.com/microclaw/microclaw/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

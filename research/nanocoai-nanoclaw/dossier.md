# nanoclaw — dossier de investigación

- **Repo**: https://github.com/nanocoai/nanoclaw
- **Web oficial**: https://nanoclaw.dev
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 31149 · **Forks**: 12632
- **Último push**: 2026-11-23T20:44:47Z · **Última release**: 2026-11-21
- **Revisado**: 2026-11-23 · **Confianza**: 64/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Asistente ligero que ejecuta cada agente en su propio contenedor, con memoria, tareas programadas y canales como WhatsApp, Telegram, Slack y Gmail. Está pensado para quien quiere agentes personales seguros y persistentes.

> Agentes aislados con canales reales.

## Nota de verificación

Revisión v2026.11.0 estable (2026-11-21): añade tarjetas de aprobación en gateway, aislamiento de llaves por agente con OneCLI 1.45, Cursor Agent SDK, plantillas de agentes y tarjetas con KPIs/gráficos en Slack. Aprobaciones pasa a ON.

## Release revisada

- **Tag**: [v2026.11.0](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0)
- **Fecha**: 2026-11-21 (hace 2 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v2026.11.0 estable: llaves aisladas por agente (OneCLI 1.45), tarjetas de aprobación en gateway, creación de agentes desde plantillas, Cursor SDK y tarjetas KPI en Slack.

**Impacto en la ficha**: Sube a Tier S (+2.85, ADN 76→86): Confianza 55→76, Capacidad 80→82 y Producto 70→73; Aprobaciones pasa a ON.

> NanoClaw 2026.11.0 is the new stable release, so /update-nanoclaw on the default stable channel now offers it. 🦐 It covers everything since 2026.10.0 and was tested on the beta channel through nine pre-releases. Five changes you'll notice first: Each agent gets only the keys you give it. OneCLI moves to 1.45, where new agent groups get only their model key and other keys go to the groups you choose. OneCLI's database also gets its own password, which closes a critical security hole (see Security below). On OneCLI installs, both need a step from you. ( #4094 , #4439 ) Agents can create other agents from templates. Ask for one in chat, or pick one from ncl templates list or the public library

## Evidencia de la investigación

### ✅ Identidad
  - “Spawn teammates from chat: every one gets its own bot identity, container, and memory, with shared rooms and canvases.” — https://github.com/nanocoai/nanoclaw#readme

### ✅ Computadora propia
  - “Container isolation - agents are sandboxed in Docker containers (macOS/Linux/WSL2).” — https://github.com/nanocoai/nanoclaw#readme

### ✅ Memoria
  - “Per-agent workspace - each agent group has its own CLAUDE.md, its own memory, its own container, and only the mounts you allow.” — https://github.com/nanocoai/nanoclaw#readme

### ✅ Rutinas
  - “Scheduled tasks: recurring jobs executed by the agent, with optional script gates that avoid waking it when there is no work.” — https://github.com/nanocoai/nanoclaw#readme

### ❌ Apps reales
  - “It installs Node, pnpm, and Docker if missing, installs a credential gateway and registers your Anthropic credential with it, builds the agent container, and pairs your first channel (Slack, Telegram, Discord, WhatsApp, iMessage, or a local CLI).” — https://github.com/nanocoai/nanoclaw#readme
  - “Channels (Discord, Slack, Telegram, WhatsApp, …) live on a long-lived `channels` branch; alternative providers (OpenCode, Codex, Cursor) ship inside their own skill's `payload/` folder.” — https://github.com/nanocoai/nanoclaw#readme
  - “## What It Supports - **Multi-channel messaging** — WhatsApp, Telegram, Discord, Slack, Microsoft Teams, iMessage, Matrix, Google Chat, Webex, Linear, GitHub, WeChat, and email via Resend.” — https://nanoclaw.dev

### ✅ Coordinación
  - “Spawn teammates from chat... with shared rooms and canvases.” — https://github.com/nanocoai/nanoclaw#readme

### ✅ Aprobaciones
  - “Agents run in their own Linux containers with filesystem isolation, not merely behind permission checks.” — https://github.com/nanocoai/nanoclaw#readme
  - “You sign in in the browser, approve the terminal you are running setup from, and enable the perk; the wizard notices and continues on its own.” — https://nanoclaw.dev
  - “**Is this secure?** Agents run in containers, not behind application-level permission checks.” — https://nanoclaw.dev
  - “Each agent gets only the keys you give it. OneCLI moves to 1.45, where new agent groups get only their model key and other keys go to the groups you choose.” — https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0
  - “gateway approval cards mark anything they shorten, an approval card changes only after NanoClaw accepts the click” — https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0-beta.4

### ✅ Desatendido
  - “Scheduled tasks: recurring jobs executed by the agent... The host keeps one outbound connection to the portal.” — https://github.com/nanocoai/nanoclaw#readme

## Puntuación

Grok Score: **81.4** · Tier **S** · ADN **86**

- **capacidad**: 82/100
- **autonomia**: 72/100
- **computadora**: 85/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 76/100
- **producto**: 73/100

## Fortalezas

- Contenedor aislado por agente, con identidad, memoria y app de Slack propias
- Conexión a apps de mensajería reales y trabajos programados
- Base ligera y fácil de personalizar sobre Anthropic Agents SDK

## Lo que le falta / riesgos

- Madurez corta (~9 meses) y dependencia del stack de Anthropic
- El self-hosting exige más configuración que un producto SaaS
- Operación empresarial y documentación aún verdes

## Comparación con el listón

Es el competidor open source más cercano a la visión de bots persistentes de Grok Bot, con menos pulido de producto.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/nanocoai/nanoclaw) · consultado 2026-11-23
- [Web oficial](https://nanoclaw.dev) · consultado 2026-11-23
- [README](https://github.com/nanocoai/nanoclaw#readme) · consultado 2026-11-23
- [Releases](https://github.com/nanocoai/nanoclaw/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

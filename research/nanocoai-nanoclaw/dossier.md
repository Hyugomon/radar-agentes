# nanoclaw — dossier de investigación

- **Repo**: https://github.com/nanocoai/nanoclaw
- **Web oficial**: https://nanoclaw.dev
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 31111 · **Forks**: 12647
- **Último push**: 2026-11-12T06:31:11Z · **Última release**: 2026-11-09
- **Revisado**: 2026-11-12 · **Confianza**: 64/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Asistente ligero que ejecuta cada agente en su propio contenedor, con memoria, tareas programadas y canales como WhatsApp, Telegram, Slack y Gmail. Está pensado para quien quiere agentes personales seguros y persistentes.

> Agentes aislados con canales reales.

## Nota de verificación

README: un contenedor por agente, memoria y workspace propios, tareas programadas y equipos. Los canales son conectores; no opera una GUI completa ni tiene capa de aprobaciones.

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

### ❌ Aprobaciones
  - “Agents run in their own Linux containers with filesystem isolation, not merely behind permission checks.” — https://github.com/nanocoai/nanoclaw#readme
  - “You sign in in the browser, approve the terminal you are running setup from, and enable the perk; the wizard notices and continues on its own.” — https://nanoclaw.dev
  - “**Is this secure?** Agents run in containers, not behind application-level permission checks.” — https://nanoclaw.dev

### ✅ Desatendido
  - “Scheduled tasks: recurring jobs executed by the agent... The host keeps one outbound connection to the portal.” — https://github.com/nanocoai/nanoclaw#readme

## Puntuación

Grok Score: **78.55** · Tier **A** · ADN **76**

- **capacidad**: 80/100
- **autonomia**: 72/100
- **computadora**: 85/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 55/100
- **producto**: 70/100

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

- [Repositorio GitHub](https://github.com/nanocoai/nanoclaw) · consultado 2026-11-12
- [Web oficial](https://nanoclaw.dev) · consultado 2026-11-12
- [README](https://github.com/nanocoai/nanoclaw#readme) · consultado 2026-11-12
- [Releases](https://github.com/nanocoai/nanoclaw/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

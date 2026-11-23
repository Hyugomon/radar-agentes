# OpenBitFun — dossier de investigación

- **Repo**: https://github.com/openBitFun/OpenBitFun
- **Web oficial**: openbitfun.com
- **Licencia**: MIT
- **Tipo de licencia**: Open source · **Uso / Precio**: Gratis
- **Lenguaje**: Rust
- **Estrellas**: 4111 · **Forks**: 315
- **Último push**: 2026-11-23T17:09:53Z · **Última release**: 2026-11-20
- **Revisado**: 2026-11-23 · **Confianza**: 55/100
- **Tipo**: agent · **Categoría**: general

## Qué es

Workspace de agentes de escritorio con runtime Rust, capacidades de computer-use y equipos de agentes. Apunta a usuarios que quieren un agente generalista más allá del código.

> Workspace de agentes con computer-use.

## Nota de verificación

Revisión v1.0.11–v1.0.12 y README actual (openBitFun/OpenBitFun): añade aprobación de herramientas basada en modelo y desde móvil, memoria a largo plazo, cron/hooks y ejecución persistente en hosts remotos vía SSH. Sin equipo multi-bot ni identidad por bot.

## Release revisada

- **Tag**: [v1.0.12](https://github.com/openBitFun/OpenBitFun/releases/tag/v1.0.12)
- **Fecha**: 2026-11-20 (hace 3 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v1.0.12 (y v1.0.11): aprobación de herramientas basada en modelo, recuperación remota con Telegram/Feishu/WeChat, workbench LaTeX/PDF, cron y transporte WebSocket.

**Impacto en la ficha**: Sube a Tier A (+7.90, ADN 32→78): Memoria, Rutinas, Aprobaciones y Desatendido pasan a ON.

> What's Changed fix(web-ui): promote re-added workspaces within their device by @bobleer in #3938 fix(web-ui): show re-added workspace promotion immediately and keep it scoped by @bobleer in #3939 fix(web-ui): polish promoted workspace reveal, persistence, and CLI peer reorder by @bobleer in #3943 fix(installer): preserve legacy updates and allow parallel installations by @kev1n77 in #3944 fix(visual-skin): allow disabling the active skin by @kev1n77 in #3946 refactor(workspace): unify project open ordering in backend and drop display-order heuristics by @bobleer in #3955 fix(exec): Increase default yield time to 180s by @wsp1911 in #3945 fix(context): Estimate composition on demand by @wsp19

## Evidencia de la investigación

### ❌ Identidad
  - “- **App Evolution**: Enable more people to shape software, from personal tools to versions tailored to a profession or industry.” — https://github.com/openBitFun/OpenBitFun#readme
  - “## Extend OpenBitFun with OpenBitFun **Customize the roles, tools, interface, and source code.** Start with an agent that fits your work, then extend the workspace around it: - **Build a specialist agent.** Choose a model, define its role, and equip it with the tools and workflows it needs for motion comic production, visual design, code review, or your own field.” — openbitfun.com
  - “OpenBitFun is a highly customizable, open-source agent workspace that keeps work moving your way.” — https://github.com/openBitFun/OpenBitFun#readme

### ✅ Computadora propia
  - “**Switch the device, switch the entire workspace.** Choose another connected computer in the desktop app, and the interface switches to that device's sessions, workspaces, files, and task status.” — https://github.com/openBitFun/OpenBitFun#readme
  - “File access, terminals, and workspace commands target that environment; the Agent Runtime stays on the OpenBitFun host.” — https://github.com/openBitFun/OpenBitFun#readme
  - “Move between your home computer, office computer, and server from the same app.” — https://github.com/openBitFun/OpenBitFun#readme

### ✅ Memoria
  - “Persistent sessions, interruption recovery, long-term memory, and support for extended tasks help keep work moving.” — https://github.com/openBitFun/OpenBitFun#readme
  - “**You can ask OpenBitFun's Code Agent to modify and extend OpenBitFun itself.** Learn more about [agent management](./docs/interactive-capabilities/capabilities/feature.agents.md), [Hooks and compatibility](./docs/features/agent-hooks.md), and the [product architecture](./docs/architecture/product-architecture.md).” — openbitfun.com
  - “## Built for sustained work The Rust Agent Runtime manages session state, context, and tool execution.” — openbitfun.com
  - “The Rust Agent Runtime manages session state, context, and tool execution. Persistent sessions, interruption recovery, long-term memory, and support for extended tasks help keep work moving.” — https://github.com/openBitFun/OpenBitFun#readme

### ✅ Rutinas
  - “</details> ## Turn everyday needs into useful apps Build a Git insights panel for a repository, a workspace for presentations, or a form that brings routine actions together.” — openbitfun.com
  - “fix(cron): stop retrying failed scheduled occurrences” — https://github.com/openBitFun/OpenBitFun/releases/tag/v1.0.12

### ✅ Apps reales
  - “| | **Creative** | **Creation and customization.** Build Mini Apps or extend OpenBitFun's interface and capabilities to make the workspace your own.” — openbitfun.com
  - “See the [connection FAQ](./src/apps/relay-server/FAQ.md) for login, internet access, and self-hosting requirements.” — https://github.com/openBitFun/OpenBitFun#readme
  - “A private Relay requires a matching client build: see the [deployment guide](./src/apps/relay-server/README.md#for-community-developers-and-forks).” — https://github.com/openBitFun/OpenBitFun#readme

### ❌ Coordinación
  - Sin evidencia directa en el README/web revisada.

### ✅ Aprobaciones
  - “**Your phone is a remote controller.** Send instructions, check progress, and respond to approval requests from your phone or browser.” — https://github.com/openBitFun/OpenBitFun#readme
  - “Here are three directions we want to explore: - **Lights-Out Factory**: Plan and design during the day, let tasks continue on a server, and come back the next morning to review the results.” — openbitfun.com
  - “Send instructions, check progress, and respond to approval requests from your phone or browser.” — https://github.com/openBitFun/OpenBitFun#readme

### ✅ Desatendido
  - “Both paths use the online OpenBitFun identity service for sign-in; LAN mode is not an offline-login option.” — https://github.com/openBitFun/OpenBitFun#readme
  - “Tasks run on the selected host and keep going when you switch views or disconnect the phone.” — https://github.com/openBitFun/OpenBitFun#readme

## Puntuación

Grok Score: **73.15** · Tier **A** · ADN **78**

- **capacidad**: 78/100
- **autonomia**: 72/100
- **computadora**: 81/100
- **memoria**: 80/100
- **rutinas**: 76/100
- **equipo**: 55/100
- **confianza**: 78/100
- **producto**: 64/100

## Fortalezas

- Runtime Rust con app de escritorio pulida y multiplataforma
- Computer-use, agent teams y control remoto entre dispositivos
- Cuatro modos de harness y personalización hasta el código fuente

## Lo que le falta / riesgos

- Comunidad pequeña (~4,111 estrellas) frente a otros productos del lote
- Proyecto joven con poca validación externa
- Mini apps y marketplace aún en fase temprana

## Comparación con el listón

Apunta al espacio de agentes de escritorio con computer-use, pero con mucha menos tracción que OpenDesign o NanoClaw.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/openBitFun/OpenBitFun) · consultado 2026-11-23
- [Web oficial](openbitfun.com) · consultado 2026-11-23
- [README](https://github.com/openBitFun/OpenBitFun#readme) · consultado 2026-11-23
- [Releases](https://github.com/openBitFun/OpenBitFun/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

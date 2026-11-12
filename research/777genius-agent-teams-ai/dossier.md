# agent-teams-ai — dossier de investigación

- **Repo**: https://github.com/777genius/agent-teams-ai
- **Web oficial**: https://agentteams.live
- **Licencia**: AGPL-3.0
- **Lenguaje**: TypeScript
- **Estrellas**: 2465 · **Forks**: 404
- **Último push**: 2026-11-12T07:43:04Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-12 · **Confianza**: 72/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

App de escritorio gratuita (Electron/TypeScript) para montar equipos de agentes con roles y un tablero kanban: los agentes toman tareas, se mensajean entre ellos y se revisan el trabajo mientras tú das órdenes de alto nivel. Envuelve Claude Code, Codex, OpenCode, Cursor, Grok, Copilot y más de 300 modelos, y se dirige a quien quiere una 'empresa de IA' sin programar.

> Equipos de agentes con roles.

## Nota de verificación

Revisión previa + README: app de escritorio para montar equipos de agentes con roles y un líder. Sin evidencia de rutinas o computadora completa.

## Evidencia de la investigación

### ✅ Identidad
  - “- **Built-in code editor** — edit project files with Git support without leaving the app - **Branch strategy** - choose per teammate at launch: use the main checkout or run selected agents in their own git worktree.” — https://agentteams.live
  - “</details> <details> <summary><strong>What happens if an agent gets stuck?</strong></summary> <br /> Send a direct message to course-correct, or open the teammate status to inspect diagnostics and restart the agent.” — https://agentteams.live
  - “Agent Teams also has a nudge system: the app can send a short control message when there is a clear reason to wake an agent up, such as after a known rate-limit cooldown, when a teammate has not synced with its current task or review, or when progress appears stalled.” — https://github.com/777genius/agent-teams-ai#readme

### ❌ Computadora propia
  - “Terminal Run commands in a visual terminal workspace with team and local shells, persistent history, autocomplete, and terminal settings.” — https://agentteams.live
  - “Desktop alerts, sounds, click-to-focus, and webhooks.” — https://github.com/777genius/agent-teams-ai#readme
  - “Desktop platform coverage is about native app/CLI support only; web and mobile are excluded.” — https://github.com/777genius/agent-teams-ai#readme

### ❌ Memoria
  - “The lead will automatically create a fully described task and attach your files directly to the task for complete context.” — https://github.com/777genius/agent-teams-ai#readme
  - “View token usage, context-window share, and estimated cost by category.” — https://github.com/777genius/agent-teams-ai#readme
  - “- **Team member stats** — global performance statistics per member - **Attach code context** — reference files or snippets in messages, like in Cursor.” — https://agentteams.live

### ❌ Rutinas
  - Sin evidencia directa en el README/web revisada.

### ❌ Apps reales
  - “It exposes the current Electron renderer through the local Chrome DevTools Protocol endpoint on `127.0.0.1:9222`, avoiding window-selection ambiguity when packaged or other Electron apps are also open.” — https://agentteams.live
  - “Do not start a browser/web dev server for normal development; that path is limited and is not the supported way to run agent teams locally.” — https://github.com/777genius/agent-teams-ai#readme

### ✅ Coordinación
  - “For coding and broader project work.</sub> <sub>Check also: - [universal-agent-plugins](https://universal-agent-plugins.com) - Multi-agent CLI to install, update, repair, and remove Agent Plugins 1.0 and Agent Skills across Codex/ChatGPT, Claude, Cursor, Gemini, Copilot, Qoder, Pi, OpenCode, and more.” — https://agentteams.live
  - “And when you have a lot of teammates, you need a good way to organize and manage them.” — https://github.com/777genius/agent-teams-ai#readme
  - “Sure, you can set up something similar with regular Claude, but keeping track of everything without a proper frontend is difficult, and we are targeting precisely this multi-agent use case.” — https://github.com/777genius/agent-teams-ai#readme

### ❌ Aprobaciones
  - “04 Stay in the Loop Jump in with comments, approvals, direct messages, or quick actions.” — https://agentteams.live
  - “SDK for universal plugins (hooks, detect, install/manage) - [review-router-ai](https://github.com/777genius/review-router-ai) - Free, open source CodeRabbit.” — https://agentteams.live
  - “Powerfull AI code review that runs inside your CI/CD (privacy) using your Claude/Codex/other subscription accounts (pool)/API.” — https://github.com/777genius/agent-teams-ai#readme

### ❌ Desatendido
  - “Give agents distinct roles, let them work autonomously in parallel, and coordinate across team boundaries.” — https://agentteams.live

## Puntuación

Grok Score: **63.05** · Tier **B** · ADN **22**

- **capacidad**: 73/100
- **autonomia**: 60/100
- **computadora**: 55/100
- **memoria**: 60/100
- **rutinas**: 55/100
- **equipo**: 90/100
- **confianza**: 55/100
- **producto**: 59/100

## Fortalezas

- Orquestación multi-agente real: equipos con roles, mensajería agente-a-agente, revisión por pares y tablero kanban como plano de control.
- Cobertura de proveedores excepcional (300+ modelos, 200+ proveedores, modelos gratuitos sin auth) y reutilización de los mejores coding agents en vez de reimplementarlos.
- Proyecto muy vivo: 12 releases en 90 días (v2.18.6), CI, 2,465 estrellas, 396 forks y Discord activo; app de escritorio instalable sin escribir código.
- Se dirige en lenguaje natural de alto nivel (eres 'el jefe'), lo que lo mantiene del lado del producto y no del framework.

## Lo que le falta / riesgos

- No hay computadora persistente propia por agente: todo corre en tu escritorio local y depende de los CLIs/credenciales que tú conectas.
- Sin rutinas por horario o evento, sin aprobaciones antes de acciones irreversibles y sin operación de apps reales: no sigue trabajando con el portátil cerrado.
- No demuestra memoria acumulada por agente ni sandbox aislado; el estado es el tablero y el historial de tareas.
- Capa Electron pesada sobre agentes de terceros: el rendimiento y el coste real dependen del proveedor elegido, y AGPL-3.0 limita su adopción comercial.

## Comparación con el listón

Es un orquestador de equipos de agentes competente y muy activo, por encima de la media de los wrappers de CLIs, pero queda un escalón por debajo de la clase Grok Bot al carecer de runtime persistente en la nube, rutinas, aprobaciones y entrada en apps reales.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/777genius/agent-teams-ai) · consultado 2026-11-12
- [Web oficial](https://agentteams.live) · consultado 2026-11-12
- [README](https://github.com/777genius/agent-teams-ai#readme) · consultado 2026-11-12
- [Releases](https://github.com/777genius/agent-teams-ai/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

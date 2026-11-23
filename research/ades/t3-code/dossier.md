# T3 Code — dossier ADE

- **Web oficial**: https://t3.codes/
- **Repo**: https://github.com/pingdotgg/t3code
- **Licencia**: MIT
- **Categoría**: ide
- **Revisado**: 2026-11-23
- **ADE Score**: 89.19 · Tier S

## Qué es

Workspace open source para manejar varios agentes de código, sesiones remotas y worktrees desde escritorio y móvil.

## Release revisada

- **Tag**: [v0.1.12-nightly.20261123.5151](https://github.com/pingdotgg/t3code/releases/tag/v0.1.12-nightly.20261123.5151)
- **Fecha**: 2026-11-23 (hace 0 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.1.12-nightly.20261123: Workflows (Labs) para coordinar agentes, eventos y aprobaciones; MCP Events webhooks; steering de turnos entre agentes y vistas previas de navegador en segundo plano.

**Impacto en la ficha**: Tier S (+1.02): Orquestación 86→90, Extensiones 82→85 y Control 74→77.

> v0.1.12-nightly.20261123.5151 · 67 changes from 25 contributors Background browser previews. Agents can take screenshots and interact with previews while T3 Code is hidden, minimized, or covered. Agent message delivery. Messages from other agents can steer a running turn without waiting behind a queued message. Web startup. T3 Code starts in browsers where WebAssembly is disabled. Open links on macOS. Links open a T3 Code window when the app is running without one. Plus 51 more bug fixes and performance improvements. Full changelog What's Changed fix(web): retry a failed port-forward locality probe by @juliusmarminge in #41353 fix(web): start without WebAssembly by initialising Words in a gu

## Evidencia

### harnesses
- “Orchestrate Claude Code, Codex, Antigravity, OpenCode, Cursor, and Grok from one surface.” — https://github.com/pingdotgg/t3code#readme
- “Plug in Claude Code, Codex, Antigravity, OpenCode, Cursor, or Grok with the credentials you already have.” — https://github.com/pingdotgg/t3code#readme
- “Claude Code claude auth login Codex CLI codex login OpenCode opencode auth Cursor @cursor/sdk Grok CLI grok login Antigravity Google sign-in No keys resold.” — https://github.com/pingdotgg/t3code#readme

### paralelo
- “- **Git built in.** Each thread can work in its own worktree.” — https://github.com/pingdotgg/t3code#readme

### orquestacion
- “Orchestrate Claude Code, Codex, Antigravity, OpenCode, Cursor, and Grok from one surface.” — https://github.com/pingdotgg/t3code#readme
- “Workflows (Labs). Run workflows that coordinate agents, code, events, and approvals, and inspect and control them in the app.” — https://github.com/pingdotgg/t3code/releases/tag/v0.1.12-nightly.20261123.5124

### revision
- “Resume a stopped Cursor turn from its latest checkpoint without sending a new message. Load a pull request file diff on demand when it is too large to show automatically.” — https://github.com/pingdotgg/t3code/releases/tag/v0.1.10-nightly.20261115.4723

### remoto
- “@DavidKPiano It's like Claude Code if they didn't vibe-code the entire thing @RhysSullivan It takes what I liked so much about codex’s remote setup and improves upon it @AtharvaIngle7 T3 Code is miles ahead of anything else i've tried @linuz90 ...gym app misses some exercises.” — https://github.com/pingdotgg/t3code#readme
- “@DavidKPiano It's like Claude Code if they didn't vibe-code the entire thing @RhysSullivan It takes what I liked so much about codex’s remote setup and improves upon it @AtharvaIngle7 T3 Code is miles ahead of anything else i've tried @linuz90 ...gym app misses some exercises.” — https://github.com/pingdotgg/t3code#readme
- “- **Remote ready.** Run agents on any machine.” — https://github.com/pingdotgg/t3code#readme

### movil
- “Download for macOS Steal our code (legally) Also on your phone: iOS · Android Tolerated by over 500,000 devs Some of them even tweeted about it.” — https://github.com/pingdotgg/t3code#readme
- “@JoshuaRileyDev I was 2,000 miles away on holiday and able to do iOS development from just my phone @serhiyhvala If you tried it once and bounced, give it a second chance.” — https://github.com/pingdotgg/t3code#readme
- “@JoshuaRileyDev I was 2,000 miles away on holiday and able to do iOS development from just my phone @serhiyhvala If you tried it once and bounced, give it a second chance.” — https://github.com/pingdotgg/t3code#readme

### extensiones
- “## Documentation - [Install and first run](./docs/user/install.md) - [Remote access from a phone or another machine](./docs/user/remote-access.md) - [Permission modes](./docs/user/permission-modes.md) - [Source control](./docs/user/source-control.md) - [Connect outside agents over MCP](./docs/user/outside-agents.md) - [FAQ](./docs/user/faq.md) [All docs](./docs/README.md) has the full list.” — https://github.com/pingdotgg/t3code#readme

### control
- “## Documentation - [Install and first run](./docs/user/install.md) - [Remote access from a phone or another machine](./docs/user/remote-access.md) - [Permission modes](./docs/user/permission-modes.md) - [Source control](./docs/user/source-control.md) - [Connect outside agents over MCP](./docs/user/outside-agents.md) - [FAQ](./docs/user/faq.md) [All docs](./docs/README.md) has the full list.” — https://github.com/pingdotgg/t3code#readme

## Dimensiones

- **Harnesses**: 95/100
- **Paralelismo**: 92/100
- **Orquestación**: 90/100
- **Revisión**: 89/100
- **Remoto / cloud**: 88/100
- **Móvil**: 84/100
- **Extensiones**: 85/100
- **Control**: 77/100
- **Apertura**: 95/100
- **Producto**: 91/100

## Fortalezas

- Open source con mucha adopción
- Acceso remoto y móvil
- Multi-harness y worktrees
- Revisión de PRs grandes y reanudación de Cursor

## Carencias

- Cambios frecuentes entre Nightly y Stable
- No trae modelo propio
- La revisión es más de workspace que de code review profundo

## Fuentes

- [Web oficial](https://t3.codes/) · consultado 2026-11-23
- [Repositorio GitHub](https://github.com/pingdotgg/t3code) · consultado 2026-11-23
- [README](https://github.com/pingdotgg/t3code#readme) · consultado 2026-11-23

---

_Investigación documental de la web oficial y el repositorio. No se instaló ni se probó el ADE en una tarea real. El score es editorial y está ajustado contra las dimensiones documentadas._

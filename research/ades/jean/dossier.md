# Jean — dossier ADE

- **Web oficial**: https://jean.build/
- **Repo**: https://github.com/coollabsio/jean
- **Licencia**: Apache-2.0
- **Categoría**: workspace
- **Revisado**: 2026-11-23
- **ADE Score**: 80.36 · Tier A

## Qué es

Workspace open source para agentes de código, worktrees, MCP y entrega con GitHub, con acceso local, SSH o servidor propio y más proveedores como QwenCloud y CLIProxyAPI.

## Release revisada

- **Tag**: [v1.0.16](https://github.com/coollabsio/jean/releases/tag/v1.0.16)
- **Fecha**: 2026-11-15 (hace 8 días)
- **Estado**: reciente · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: 1.0.15: QwenCloud, Claude Fable 5.2 y CLIProxyAPI como proveedor para todos los backends.

**Impacto en la ficha**: Tier A (+0.92): Harnesses 86→88, Extensiones 65→70 y Producto 78→80.

> Features Added an auto-compact window option to Claude backend settings. Added auto-compact options for Codex, OpenCode, and PI. Fixes Fixed chat not scrolling to the bottom after you answered a question. Fixed PR conflict status not refreshing after sync and push. Fixed SSH host key reading on Windows when ssh-keyscan failed; Jean now falls back to ssh . Fixed long tool names hiding the row chevron in chat; names are now truncated. Fixed worktree sort options on mobile; they now open in a bottom sheet. Breaking Changes Removed the CLIProxyAPI provider integration.

## Evidencia

### harnesses
- “Added QwenCloud provider presets with region and billing mode selection and automatic model fetching. Added CLIProxyAPI as a provider for every backend, with an option to pick it as the default provider.” — https://github.com/coollabsio/jean/releases/tag/v1.0.15

### paralelo
- “Run Claude, Codex, Cursor, OpenCode, Pi, Command Code, Grok, Kimi Code, Antigravity, and Muse in parallel - each in its own git worktree - on your laptop or your own server.” — https://github.com/coollabsio/jean#readme
- “It has strong opinions about how AI-assisted development should work: every task gets its own git worktree, agents run in parallel, and git work, reviews, terminals, and GitHub, Linear, and Sentry integrations live in one cohesive workflow.” — https://github.com/coollabsio/jean#readme
- “Git worktrees, chat sessions, terminals, and GitHub & Linear integrations in one cohesive workflow.” — https://github.com/coollabsio/jean#readme

### orquestacion
- Sin cita directa en la web/README revisada.

### revision
- “One project, many isolated worktrees: issues, pull requests and manual tasks, with diff size, PR status and your own labels.” — https://github.com/coollabsio/jean#readme
- “Tauri v2 · React 19 · Rust · TypeScript · Tailwind CSS v4 · shadcn/ui v4 · Zustand v5 · TanStack Query · Pierre Diffs · xterm.js </div> ## About the Project Jean is an opinionated AI agent workspace.” — https://github.com/coollabsio/jean#readme

### remoto
- “Many servers - add as many remotes as you want, or install one over SSH from the app.” — https://github.com/coollabsio/jean#readme
- “Add it in the desktop app under Connections → Add remote (or let Jean install it over SSH): its projects appear in the same sidebar as your local ones, grouped by server.” — https://github.com/coollabsio/jean#readme
- “Click **Add remote** and either: - **Install via SSH** - enter SSH user, host/IP, and ports; Jean installs `jean-server` on that machine for you, or - **Existing URL** - paste the Web Access URL and access token 3.” — https://github.com/coollabsio/jean#readme

### movil
- Sin cita directa en la web/README revisada.

### extensiones
- Sin cita directa en la web/README revisada.

### control
- Sin cita directa en la web/README revisada.

## Dimensiones

- **Harnesses**: 88/100
- **Paralelismo**: 84/100
- **Orquestación**: 78/100
- **Revisión**: 80/100
- **Remoto / cloud**: 84/100
- **Móvil**: 80/100
- **Extensiones**: 70/100
- **Control**: 65/100
- **Apertura**: 90/100
- **Producto**: 80/100

## Fortalezas

- Local, SSH o self-hosted
- Worktrees y PRs
- QwenCloud, Claude Fable 5.2 y CLIProxyAPI
- Open source

## Carencias

- Sin foco en orquestación multi-agente
- Extensiones limitadas
- Menos adopción

## Fuentes

- [Web oficial](https://jean.build/) · consultado 2026-11-23
- [Repositorio GitHub](https://github.com/coollabsio/jean) · consultado 2026-11-23
- [README](https://github.com/coollabsio/jean#readme) · consultado 2026-11-23

---

_Investigación documental de la web oficial y el repositorio. No se instaló ni se probó el ADE en una tarea real. El score es editorial y está ajustado contra las dimensiones documentadas._

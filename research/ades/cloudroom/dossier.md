# Cloudroom — dossier ADE

- **Web oficial**: https://www.cloudroom.dev/
- **Repo**: https://github.com/davidondrej/cloudroom
- **Licencia**: Apache-2.0
- **Categoría**: workspace
- **Revisado**: 2026-11-23
- **ADE Score**: 79.55 · Tier A

## Qué es

Workspace open source para correr agentes de código en la nube, con revisión de cambios y ejecución remota.

## Release revisada

- **Tag**: [gui-v164](https://github.com/davidondrej/cloudroom/releases/tag/gui-v164)
- **Fecha**: 2026-11-23 (hace 0 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: gui-v164 (y gui-v161–v163): soporte completo para Antigravity, proyectos GitLab.com en la nube, compartición selectiva de repos, barra de subagentes y burbujas en vivo para comandos en segundo plano.

**Impacto en la ficha**: Tier A (+1.99): Orquestación 70→75, Paralelismo 80→83, Control 70→74, Harnesses 86→88, Remoto 88→90 y Producto 75→77.

> Cloudroom v164 Share only the repos you pick. For Apple Silicon Macs on macOS 13 or later, Linux x64, and Windows x64. Changes Connect GitHub can now share only the repos you pick with cloud agents. Hitting a Claude plan limit in a Cloud thread shows the plan-limit card, not a raw error. Cloud previews of dev servers load right away instead of stalling. Image attachments show small thumbnails in the message box, and privacy mode hides your email. Security fixes. Install or update macOS: Quit Cloudroom, download the DMG, open it, and drag Cloudroom into Applications. Your data is kept. Signed and notarized by Apple. Linux x64: For Ubuntu 24.04+ and current Arch Linux. chmod +x Cloudroom-v164-

## Evidencia

### harnesses
- “Local threads run Claude Code, Codex, Pi Agent, and any ACP agent, such as Cursor, OpenCode, Grok, Hermes, Devin, and Droid.” — https://github.com/davidondrej/cloudroom#readme
- “Cloud threads run 10: Claude Code, Codex, Pi Agent, Cursor, OpenCode, fx, Hermes, Devin, Droid, and OpenClaw.” — https://github.com/davidondrej/cloudroom#readme
- “Runs Claude Code, Codex, Cursor and OpenCode, in the cloud on Pro ($50/mo).” — https://github.com/davidondrej/cloudroom#readme

### paralelo
- Sin cita directa en la web/README revisada.

### orquestacion
- Sin cita directa en la web/README revisada.

### revision
- “## Contributing Issues and pull requests are welcome.” — https://github.com/davidondrej/cloudroom#readme

### remoto
- “Remote work uses your own server over SSH.” — https://github.com/davidondrej/cloudroom#readme
- “Remote work needs your own server over SSH.” — https://github.com/davidondrej/cloudroom#readme
- “Remote work needs your own server over SSH.” — https://github.com/davidondrej/cloudroom#readme
- “Cloud threads now work with GitLab.com projects, not just GitHub... Connect GitHub can now share only the repos you pick with cloud agents.” — https://github.com/davidondrej/cloudroom/releases/tag/gui-v164

### movil
- Sin cita directa en la web/README revisada.

### extensiones
- “- [`skills/`](skills/): the skills every Cloudroom agent ships with.” — https://github.com/davidondrej/cloudroom#readme

### control
- “Every agent runs in its own isolated sandbox.” — https://github.com/davidondrej/cloudroom#readme
- “Cloudroom is a platform for running AI coding agents in the cloud, each in its own sandbox.” — https://github.com/davidondrej/cloudroom#readme
- “Each agent runs in its own isolated sandbox.” — https://github.com/davidondrej/cloudroom#readme

## Dimensiones

- **Harnesses**: 88/100
- **Paralelismo**: 83/100
- **Orquestación**: 75/100
- **Revisión**: 78/100
- **Remoto / cloud**: 90/100
- **Móvil**: 60/100
- **Extensiones**: 70/100
- **Control**: 74/100
- **Apertura**: 90/100
- **Producto**: 77/100

## Fortalezas

- Cloud open source
- Revisión de cambios
- Multi-harness

## Carencias

- Sin móvil
- Orquestación limitada
- Menos maduro

## Fuentes

- [Web oficial](https://www.cloudroom.dev/) · consultado 2026-11-23
- [Repositorio GitHub](https://github.com/davidondrej/cloudroom) · consultado 2026-11-23
- [README](https://github.com/davidondrej/cloudroom#readme) · consultado 2026-11-23

---

_Investigación documental de la web oficial y el repositorio. No se instaló ni se probó el ADE en una tarea real. El score es editorial y está ajustado contra las dimensiones documentadas._

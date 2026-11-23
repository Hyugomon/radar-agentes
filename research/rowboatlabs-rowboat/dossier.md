# rowboat — dossier de investigación

- **Repo**: https://github.com/rowboatlabs/rowboat
- **Web oficial**: https://www.rowboatlabs.com
- **Licencia**: Apache-2.0
- **Tipo de licencia**: Open source · **Uso / Precio**: Gratis
- **Lenguaje**: TypeScript
- **Estrellas**: 18316 · **Forks**: 1834
- **Último push**: 2026-11-19T08:23:45Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-23 · **Confianza**: 75/100
- **Tipo**: assistant · **Categoría**: teams

## Qué es

Asistente open source que organiza equipos de AI coworkers en Spaces: agentes hosted o locales con rol y personalidad, tableros compartidos, aprobaciones y acceso web/móvil, sobre una memoria en grafo y correo integrado.

> Tu equipo de AI coworkers con memoria.

## Nota de verificación

Revisión de release v1.0.9 (2026-11-11): Spaces con AI teammates, roles y personalidades, agentes hosted Hermes/Claude Code/Codex, Composio, superagentes que delegan, aprobaciones y acceso web/móvil. Se marcan Identidad, Coordinación y Aprobaciones. Computadora sigue en falso: no se documenta un entorno persistente propio.

## Release revisada

- **Tag**: [v1.0.9](https://github.com/rowboatlabs/rowboat/releases/tag/v1.0.9)
- **Fecha**: 2026-11-11 (hace 12 días)
- **Estado**: reciente · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v1.0.9: Spaces con AI teammates, roles, agentes hosted y aprobaciones; superagentes y Composio.

**Impacto en la ficha**: Sube a Tier A (+8.05): Equipo 55→82 y Confianza 55→78; Identidad, Coordinación y Aprobaciones pasan a ON. Computadora sigue en falso.

> What's new This release brings together the major changes since v1.0.3 , with a focus on building and working with your own team of AI coworkers. 🤖 Bring your AI teammates into Spaces. Create hosted Hermes, Claude Code, and Codex agents, or connect agents you already run—including Claude Code and Codex on your own computer. Give them roles and personalities, add them to a shared space, and let them work alongside you and each other. Choose who can ask each agent for help, follow its progress, and handle approvals in the conversation. Managed agents gain Composio integrations for connected services, and super agents can create other agents to delegate work to, with permission prompts on by d

## Evidencia de la investigación

### ✅ Identidad
  - “Give them roles and personalities, add them to a shared space, and let them work alongside you and each other.” — https://github.com/rowboatlabs/rowboat/releases/tag/v1.0.9

### ❌ Computadora propia
  - “It indexes your work into a living knowledge graph and uses that to get work done: email client, notes, browser, code mode, meeting note taker, and workspaces for different projects.” — https://github.com/rowboatlabs/rowboat#readme
  - “--- ## The Rowboat desktop app The desktop app is a personal AI assistant that runs on your machine and joins your spaces as you.” — https://www.rowboatlabs.com
  - “They can connect to tools, search the web, use the browser and write code using Claude Code or Codex.” — https://github.com/rowboatlabs/rowboat#readme

### ✅ Memoria
  - “Rowboat maintains **long-lived knowledge** instead: - context accumulates over time - relationships are explicit and inspectable - notes are editable by you, not hidden inside a model - everything lives on your machine as plain Markdown The result is memory that compounds, rather than retrieval that starts cold every time.” — https://www.rowboatlabs.com
  - “It indexes your work into a living knowledge graph and uses that to get work done: email client, notes, browser, code mode, meeting note taker, and workspaces for different projects.” — https://github.com/rowboatlabs/rowboat#readme
  - “Type `@rowboat` in a space and your Rowboat works with your context on your machine, then brings the result back to the room as you.” — https://github.com/rowboatlabs/rowboat#readme

### ❌ Rutinas
  - “</td> <td width="60%"> <img width="1512" height="948" alt="Email screenshot" src="assets/readme-dark/email.png" /> </td> </tr> <tr> <td width="40%" valign="middle"> <h3>Background agents</h3> You can set up background agents that run on events like new email or on schedule like every day at 8am.” — https://www.rowboatlabs.com
  - “That means you can plug in (for example) search, databases, CRMs, support tools, and automations - or your own internal tools.” — https://github.com/rowboatlabs/rowboat#readme
  - “</td> <td width="60%"> <img width="1512" height="951" alt="Background agents screenshot" src="assets/readme-dark/background-agents.png" /> </td> </tr> <tr> <td width="40%" valign="middle"> <h3>Built-in Browser</h3> Rowboat includes a browser that lets you and assistant collaborate on web tasks.” — https://www.rowboatlabs.com

### ❌ Apps reales
  - “</td> <td width="60%"> <img width="1512" height="949" alt="Apps screenshot" src="assets/readme-dark/apps.png" /> </td> </tr> <tr> <td width="40%" valign="middle"> <h3>Integrations</h3> Includes one-click integrations to most popular products.” — https://www.rowboatlabs.com
  - “</td> <td width="60%"> <img width="1512" height="949" alt="Code mode screenshot" src="assets/readme-dark/code-mode.png" /> </td> </tr> <tr> <td width="40%" valign="middle"> <h3>Apps</h3> You can build your own work surfaces inside Rowboat — they get access to all the tools and integrations, and you can share them with other people.” — https://www.rowboatlabs.com
  - “It is open source, in this repo at [`apps/harbor`](apps/harbor), and it is what Rowboat's hosted servers run.” — https://github.com/rowboatlabs/rowboat#readme

### ✅ Coordinación
  - “Managed agents gain Composio integrations for connected services, and super agents can create other agents to delegate work to, with permission prompts on by default.” — https://github.com/rowboatlabs/rowboat/releases/tag/v1.0.9

### ✅ Aprobaciones
  - “Choose who can ask each agent for help, follow its progress, and handle approvals in the conversation.” — https://github.com/rowboatlabs/rowboat/releases/tag/v1.0.9

### ❌ Desatendido
  - “</td> <td width="60%"> <img width="1512" height="948" alt="Email screenshot" src="assets/readme-dark/email.png" /> </td> </tr> <tr> <td width="40%" valign="middle"> <h3>Background agents</h3> You can set up background agents that run on events like new email or on schedule like every day at 8am.” — https://www.rowboatlabs.com
  - “</td> <td width="60%"> <img width="1512" height="951" alt="Background agents screenshot" src="assets/readme-dark/background-agents.png" /> </td> </tr> <tr> <td width="40%" valign="middle"> <h3>Built-in Browser</h3> Rowboat includes a browser that lets you and assistant collaborate on web tasks.” — https://www.rowboatlabs.com

## Puntuación

Grok Score: **73.6** · Tier **A** · ADN **42**

- **capacidad**: 80/100
- **autonomia**: 68/100
- **computadora**: 60/100
- **memoria**: 90/100
- **rutinas**: 60/100
- **equipo**: 82/100
- **confianza**: 78/100
- **producto**: 76/100

## Fortalezas

- Equipos de AI coworkers en Spaces: agentes hosted o locales con rol, personalidad y espacio compartido
- Aprobaciones dentro de la conversación y superagentes que crean y delegan en otros agentes
- Memoria en grafo, correo, reuniones y archivos compartidos, con acceso web y móvil

## Lo que le falta / riesgos

- No documenta una computadora propia persistente: orquesta agentes hosted o locales, no un escritorio completo
- Las rutinas programadas y el trabajo desatendido siguen sin evidencia clara
- El stack TypeScript y la coordinación de varios agentes pueden encarecer cada tarea

## Comparación con el listón

Ya compite como equipo de AI coworkers con roles, aprobaciones y Spaces, pero sigue por debajo de Grok Bot en computadora propia persistente y trabajo desatendido.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/rowboatlabs/rowboat) · consultado 2026-11-23
- [Web oficial](https://www.rowboatlabs.com) · consultado 2026-11-23
- [README](https://github.com/rowboatlabs/rowboat#readme) · consultado 2026-11-23
- [Releases](https://github.com/rowboatlabs/rowboat/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

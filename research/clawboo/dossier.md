# clawboo — dossier de investigación

- **Repo**: https://github.com/clawboo/clawboo
- **Web oficial**: https://www.claw.boo
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 171 · **Forks**: 45
- **Último push**: 2026-11-15T05:59:27Z · **Última release**: 2026-11-14
- **Revisado**: 2026-11-15 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Estudio open source para desplegar equipos de agentes con un jefe que reparte tareas, memoria compartida, rutinas, conectores y aprobaciones; los agentes corren sobre Claude Code, Codex, Hermes, OpenClaw o el runtime propio.

> Un jefe AI para tu equipo de agentes.

## Nota de verificación

README: estudio de equipos de agentes con Boo Zero como jefe, varios runtimes, memoria compartida, rutinas, conectores y aprobaciones. La computadora es el entorno local; no hay VM aislada por agente.

## Release revisada

- **Tag**: [clawboo@0.7.0](https://github.com/clawboo/clawboo/releases/tag/clawboo%400.7.0)
- **Fecha**: 2026-11-14 (hace 1 días)
- **Estado**: activo · **Releases en 90 días**: 4
- **Revisado**: 2026-11-15 · **Fuente**: releases.atom

**Qué trae**: 0.7.0: Cua Driver para que los agentes usen apps de su propia pantalla en Linux.

**Impacto en la ficha**: Nuevo en el ranking: 79.50 A. Equipo y memoria fuertes; computadora local y ecosistema pequeño.

> Minor Changes 3cf2d73 : New connector: Cua Driver (category Desktop , Linux only) uses the apps on an agent's own screen through Clawboo's tool server: it lists windows, clicks, types and reads each app's accessibility tree. It runs only when agents run as their own OS user ( CLAWBOO_AGENT_USER ), like control links: it types into the agent's browser, which otherwise runs as you. Without it, agents still get their screen, the live view and their browser tools. Install it from an agent's Screen view, connect it, and give it to the agents that need it; it is not given to every agent. Each agent gets its own Cua Driver process on that agent's own screen, as the agent user when agents run as the

## Evidencia de la investigación

### ✅ Identidad
  - “Ask once. Boo Zero, your team lead, splits the work into jobs on one board and hands each job to a teammate.” — https://github.com/clawboo/clawboo#readme

### ✅ Computadora propia
  - “Share the Playwright or Chrome DevTools connector with an agent, and its Browser tab shows the latest screenshot from its browser. Each of those agents gets its own browser profile, so its logins stay its own.” — https://github.com/clawboo/clawboo#readme

### ✅ Memoria
  - “Memory lives in Clawboo itself, so a fact one teammate saves can be recalled by any teammate, whatever tool it runs on.” — https://github.com/clawboo/clawboo#readme

### ✅ Rutinas
  - “Put work on a clock. A team routine posts into the group chat for Boo Zero to pick up, and an agent routine hands one agent a task.” — https://github.com/clawboo/clawboo#readme

### ✅ Apps reales
  - “A Connectors page starts or signs in to popular MCP servers for you (GitHub, Linear, Notion, Figma, Stripe, Playwright, a local folder and more; some ask for a key or token once). Gmail, Slack, Jira and 38 more apps connect through your Composio account: paste a Composio project key once, and Composio keeps those apps' sign-ins.” — https://github.com/clawboo/clawboo#readme

### ✅ Coordinación
  - “Boo Zero splits your request into jobs, hands them out, and pulls the results together in the chat.” — https://github.com/clawboo/clawboo#readme

### ✅ Aprobaciones
  - “Risky tool calls that go through Clawboo ask you first, on any runtime.” — https://github.com/clawboo/clawboo#readme

### ✅ Desatendido
  - “Every handoff is a real task on a durable board that survives restarts, and the team talks it through in one room.” — https://github.com/clawboo/clawboo#readme

## Puntuación

Grok Score: **79.5** · Tier **A** · ADN **100**

- **capacidad**: 78/100
- **autonomia**: 74/100
- **computadora**: 70/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 68/100

## Fortalezas

- Boo Zero reparte tareas y coordina varios runtimes
- Memoria compartida y tablero durable
- Rutinas, conectores MCP/Composio y aprobaciones
- Corre local con una sola orden

## Lo que le falta / riesgos

- Proyecto pequeño (171 estrellas) y ecosistema joven
- La computadora es el entorno local, no una VM aislada por agente
- Depende de runtimes externos y de sus propios límites de permisos

## Comparación con el listón

Coordina agentes como un equipo real, pero su computadora es local y su ecosistema aún es pequeño frente a Grok Bot.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/clawboo/clawboo) · consultado 2026-11-15
- [Web oficial](https://www.claw.boo) · consultado 2026-11-15
- [README](https://github.com/clawboo/clawboo#readme) · consultado 2026-11-15
- [Releases](https://github.com/clawboo/clawboo/releases) · consultado 2026-11-15

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

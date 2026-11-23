# clawboo — dossier de investigación

- **Repo**: https://github.com/clawboo/clawboo
- **Web oficial**: https://www.claw.boo
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 173 · **Forks**: 44
- **Último push**: 2026-11-19T16:18:37Z · **Última release**: 2026-11-19
- **Revisado**: 2026-11-23 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Estudio open source para desplegar equipos de agentes con un jefe que reparte tareas, memoria compartida, rutinas, conectores y aprobaciones; los agentes corren sobre Claude Code, Codex, Hermes, OpenClaw o el runtime propio.

> Un jefe AI para tu equipo de agentes.

## Nota de verificación

README: estudio de equipos de agentes con Boo Zero como jefe, varios runtimes, memoria compartida, rutinas, conectores y aprobaciones. La computadora es el entorno local; no hay VM aislada por agente.

## Release revisada

- **Tag**: [clawboo@0.9.1](https://github.com/clawboo/clawboo/releases/tag/clawboo%400.9.1)
- **Fecha**: 2026-11-19 (hace 4 días)
- **Estado**: activo · **Releases en 90 días**: 7
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: 0.9.1 (y 0.8.0–0.9.0): aislamiento por usuario de sistema operativo en Linux (perfil de navegador, display y procesos propios por agente) y dashboard rediseñado.

**Impacto en la ficha**: Sube a Tier S (+1.50): Computadora 70→78 y Producto 68→70 por aislamiento real por usuario OS en Linux.

> Patch Changes 919e2fe : When you take control of an agent's screen, a key you press right as control arrives is now let go if you switch to another window straight away. Before, that key could stay held down on the agent's display. 5563a96 : A dashboard opened around your sign-in proxy, on a server that counts only a person the proxy signed for, no longer says that moving cards is refused there. A card moved there does move; it just does not stop the run on it, which is what the notice now says.

## Evidencia de la investigación

### ✅ Identidad
  - “Ask once. Boo Zero, your team lead, splits the work into jobs on one board and hands each job to a teammate.” — https://github.com/clawboo/clawboo#readme

### ✅ Computadora propia
  - “Share the Playwright or Chrome DevTools connector with an agent, and its Browser tab shows the latest screenshot from its browser. Each of those agents gets its own browser profile, so its logins stay its own.” — https://github.com/clawboo/clawboo#readme
  - “On Linux, each agent can now run as an operating system user of its own, so agents are walled off from each other as well as from Clawboo.” — https://github.com/clawboo/clawboo/releases/tag/clawboo%400.8.0

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

Grok Score: **81** · Tier **S** · ADN **100**

- **capacidad**: 78/100
- **autonomia**: 74/100
- **computadora**: 78/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 70/100

## Fortalezas

- Boo Zero reparte tareas y coordina varios runtimes
- Memoria compartida y tablero durable
- Rutinas, conectores MCP/Composio y aprobaciones
- Corre local con una sola orden

## Lo que le falta / riesgos

- Proyecto pequeño (173 estrellas) y ecosistema joven
- Aislamiento por usuario OS disponible solo en Linux (en macOS/Windows comparte entorno local)
- Depende de runtimes externos y de sus propios límites de permisos

## Comparación con el listón

Coordina agentes como un equipo real, pero su computadora es local y su ecosistema aún es pequeño frente a Grok Bot.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/clawboo/clawboo) · consultado 2026-11-23
- [Web oficial](https://www.claw.boo) · consultado 2026-11-23
- [README](https://github.com/clawboo/clawboo#readme) · consultado 2026-11-23
- [Releases](https://github.com/clawboo/clawboo/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

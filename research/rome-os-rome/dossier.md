# rome — dossier de investigación

- **Repo**: https://github.com/rome-os/rome
- **Web oficial**: https://romeos.cc
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 897 · **Forks**: 68
- **Último push**: 2026-11-12T07:44:42Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-12 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: general

## Qué es

Rome es un agente personal de código abierto (agent OS) que vive en un entorno persistente, ejecuta tareas programadas, orquesta agentes recursivos y puede lanzar programas en tu Mac, presentándose como alternativa open source a Grok Bot y Meta's Muse. Está pensado para usuarios que quieren un agente propio en la nube de Rome o autoalojado, no para desarrolladores que construyen agentes desde cero.

> Un agent OS persistente.

## Nota de verificación

Revisión previa + README: agente personal que vive en un entorno persistente, con memoria y ejecución. Sin evidencia de trabajo desatendido.

## Evidencia de la investigación

### ✅ Identidad
  - “## How Rome compares Rome sits where two product waves meet: persistent agents and personal software.” — https://romeos.cc
  - “Grok Bot compounds hosted bot state and skills, and Muse compounds personal context and artifacts.” — https://romeos.cc
  - “The personal software platforms share Rome's thesis that software should be built per person.” — https://romeos.cc

### ✅ Computadora propia
  - “And Hermes offers one general interface to the agent (chat clients, a desktop app, the terminal), while Rome grows a purpose-built app for each repeated workload.” — https://romeos.cc
  - “**[Grok Bot](https://docs.x.ai/grok-bot/overview)** gives persistent bots a shared cloud computer.” — https://romeos.cc
  - “**Manus** delegates a goal to an agent on a persistent cloud computer: files stay, installed tools stay, and scheduled jobs, long-running bots, and databases can live on the machine.” — https://romeos.cc

### ✅ Memoria
  - “Repeated work deserves a place of its own: an inbox that remembers what was triaged, a code review loop you can inspect, a price tracker that keeps watching, or a morning brief that arrives on schedule.” — https://romeos.cc
  - “” Ray @zoolsher What makes Rome special Private & trusted You decide what Rome can access, connect, and remember.” — https://romeos.cc
  - “Rome scales the other axis, the environment: the tools, workflows, memory, and interfaces an agent works within ([why this matters](VISION.md)).” — https://github.com/rome-os/rome#readme

### ❌ Rutinas
  - “Its [skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations) support repeated work.” — https://romeos.cc
  - “Rome also works as an open source alternative to [Grok Bot and Meta's Muse](#how-rome-compares) for persistent agents, scheduled tasks, and custom apps.” — https://romeos.cc
  - “Ask follow-up questions and summarize what we should improve.”</td> </tr> </table> Rome can handle one-off tasks, scheduled work, long-running follow-through, and purpose-built app experiences without forcing everything into one chat window.” — https://romeos.cc

### ❌ Apps reales
  - “Rome also works as an open source alternative to [Grok Bot and Meta's Muse](#how-rome-compares) for persistent agents, scheduled tasks, and custom apps.” — https://romeos.cc
  - “## Rome Apps **Rome App is the new way to interact with your agent.** Chat is a good place to ask for something once.” — https://romeos.cc
  - “The app is that capability's human interface: apps organize human interaction; capabilities organize agent action.” — https://romeos.cc

### ❌ Coordinación
  - “**Manus** delegates a goal to an agent on a persistent cloud computer: files stay, installed tools stay, and scheduled jobs, long-running bots, and databases can live on the machine.” — https://romeos.cc
  - “Rome is a guardrailed environment where human and agent collaborate, and the collaboration compounds.” — https://github.com/rome-os/rome#readme

### ❌ Aprobaciones
  - “A Rome action is a building block: agents, apps, and interfaces all call it, and it can pause for approval.” — https://romeos.cc
  - “An action is a building block rather than a loose script: agents, routines, and app interfaces all call the same one, it can pause for approval, and every run is recorded.” — https://romeos.cc
  - “[Join the preview →](https://romeos.cc/login) The Mac app signs in to Rome Cloud, opens your Rome in its window, and connects the Mac as a device your Rome can run programs on.” — https://romeos.cc

### ❌ Desatendido
  - Sin evidencia directa en el README/web revisada.

## Puntuación

Grok Score: **64.8** · Tier **B** · ADN **38**

- **capacidad**: 70/100
- **autonomia**: 67/100
- **computadora**: 75/100
- **memoria**: 90/100
- **rutinas**: 55/100
- **equipo**: 55/100
- **confianza**: 55/100
- **producto**: 50/100

## Fortalezas

- Tesis diferencial clara: escalar el entorno (herramientas, memoria, SOPs) en vez del modelo, con capacidades compuestas que persisten entre interacciones.
- Agente persistente con tareas programadas, apps propias y ejecución de programas en el dispositivo del usuario, no un chat con herramientas.
- Ritmo de ingeniería alto: CI, documentación, Discord, app de Mac y unos 50 releases en 90 días bajo licencia MIT.
- Se posiciona explícitamente como alternativa open source a Grok Bot y Muse, con cloud privado por usuario.

## Lo que le falta / riesgos

- Pre-1.0 y sin historial: nació en agosto de 2026, versiones 0.1.x/0.11.x y Rome Cloud todavía en preview.
- 291 issues abiertos para 897 estrellas: backlog desproporcionado y señal de producto aún inestable.
- El expediente no aporta evidencia de aprobaciones, benchmarks, tests de extremo a extremo ni casos reales de producción.
- La frontera con un harness es difusa ('guardrailed environment', 'agents build their own harnesses'): el README no deja claro qué queda listo sin programar ni integrar.

## Comparación con el listón

Juega en la categoría de agentes personales persistentes que lideran Grok Bot y Muse, pero con 2,5 meses de vida y versión 0.1.x está muy por detrás en madurez y adopción (897 estrellas frente a cientos de miles de los referentes).

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/rome-os/rome) · consultado 2026-11-12
- [Web oficial](https://romeos.cc) · consultado 2026-11-12
- [README](https://github.com/rome-os/rome#readme) · consultado 2026-11-12
- [Releases](https://github.com/rome-os/rome/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

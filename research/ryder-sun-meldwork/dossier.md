# Meldwork — dossier de investigación

- **Repo**: https://github.com/Ryder-Sun/Meldwork
- **Web oficial**: https://ryder-sun.github.io/Meldwork/
- **Licencia**: Apache-2.0
- **Lenguaje**: JavaScript
- **Estrellas**: 1564 · **Forks**: 108
- **Último push**: 2026-11-09T07:10:09Z · **Última release**: 2026-11-02
- **Revisado**: 2026-11-12 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Meldwork es una app de escritorio local-first para macOS donde varios agentes que ya usas trabajan como un equipo sobre un mismo objetivo, con alcance y permisos acotados, decisiones humanas en el bucle y entregables que quedan en tu máquina. Está pensada para quien ya tiene agentes instalados y quiere coordinarlos sin reenviar contexto ni empalmar salidas a mano.

> Varios agentes trabajando en tu Mac.

## Nota de verificación

Revisión previa + README: app de escritorio local-first donde varios agentes trabajan juntos. Sin evidencia de rutinas o apps GUI.

## Evidencia de la investigación

### ❌ Identidad
  - “Zcode remains before Pi Agent with its official logo and native default configuration; WorkBuddy can reuse a configured desktop model selected in Meldwork.” — https://github.com/Ryder-Sun/Meldwork#readme
  - “<p align="center"> <img src="frontend/public/logos/meldwork-readme-banner-en.png" alt="Meldwork README banner" width="100%"> </p> <p align="center"> <strong>English</strong> · <a href="README.zh-CN.md">简体中文</a> </p> # Meldwork — Let Agents collaborate to move tasks forward **Set the goal.” — https://ryder-sun.github.io/Meldwork/
  - “Once you choose the participants, goal, context, and permissions, Agents in Auto Discussion can build on each other's work, request contributions or reviews, and advance the task within the authorized scope.” — https://github.com/Ryder-Sun/Meldwork#readme

### ✅ Computadora propia
  - “Is A local-first desktop workspace for multi-Agent collaboration.” — https://ryder-sun.github.io/Meldwork/
  - “The [desktop guide](desktop/README.md) contains the current adapter, installation, provider, and capability matrix.” — https://github.com/Ryder-Sun/Meldwork#readme
  - “Desktop and frontend regression checks passed 1,700 and 379 tests respectively.” — https://github.com/Ryder-Sun/Meldwork#readme

### ❌ Memoria
  - “**Scope** the goal, working directory, context, attachments, Skills, knowledge sources, and permissions.” — https://github.com/Ryder-Sun/Meldwork#readme
  - “Once you choose the participants, goal, context, and permissions, Agents in Auto Discussion can build on each other's work, request contributions or reviews, and advance the task within the authorized scope.” — https://github.com/Ryder-Sun/Meldwork#readme
  - “## Revisit the process and continue the work Meldwork keeps task context, Agent replies, run state, and deliverables locally so you can see how work progressed, where it stalled, and what needs attention next.” — https://ryder-sun.github.io/Meldwork/

### ❌ Rutinas
  - Sin evidencia directa en el README/web revisada.

### ❌ Apps reales
  - “Approved Agent Connectors can be added through the Agent Connector SDK.” — https://ryder-sun.github.io/Meldwork/
  - “Approved Agent Connectors can be added through the Agent Connector SDK; custom executables use the desktop custom-Agent path.” — https://ryder-sun.github.io/Meldwork/

### ✅ Coordinación
  - “Workflow Modes In a run How it differs FAQ Download V1.0.9 中 / EN Workflow Modes In a run How it differs FAQ Download V1.0.9 LOCAL-FIRST · MULTI-AGENT COLLABORATION Set the Goal.” — https://ryder-sun.github.io/Meldwork/
  - “Meldwork is a local-first multi-Agent collaboration workspace .” — https://ryder-sun.github.io/Meldwork/
  - “Meldwork is a local-first multi-Agent collaboration workspace for research, analysis, writing, planning, review, and implementation.” — https://ryder-sun.github.io/Meldwork/

### ✅ Aprobaciones
  - “Once you choose the participants, goal, context, and permissions, Agents in Auto Discussion can build on each other's work, request contributions or reviews, and advance the task within the authorized scope.” — https://github.com/Ryder-Sun/Meldwork#readme
  - “You do not need to direct every round, but you still set the goal, grant permissions, and make key decisions.” — https://github.com/Ryder-Sun/Meldwork#readme
  - “Missing information, permission requests, or tradeoffs may require your input.” — https://github.com/Ryder-Sun/Meldwork#readme

### ❌ Desatendido
  - “Local-first describes where Meldwork stores and coordinates work; it does not promise that an Agent's model provider is offline.” — https://github.com/Ryder-Sun/Meldwork#readme
  - “Not fully offline — a selected Agent may send prompts to its own CLI provider.” — https://ryder-sun.github.io/Meldwork/
  - “Local-first describes where Meldwork stores and coordinates the work; it does not mean the model runs offline.” — https://ryder-sun.github.io/Meldwork/

## Puntuación

Grok Score: **68.8** · Tier **B** · ADN **40**

- **capacidad**: 68/100
- **autonomia**: 62/100
- **computadora**: 73/100
- **memoria**: 60/100
- **rutinas**: 55/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 59/100

## Fortalezas

- Colaboración multi-agente real: la Auto Discussion permite que los agentes construyan sobre el trabajo ajeno, pidan contribuciones o revisiones y avancen la tarea dentro del alcance autorizado.
- Modelo de permisos y human-in-the-loop: alcance por tarea, escrituras en el workspace opt-in, solicitudes de permiso y decisiones clave reservadas al usuario.
- Local-first y trazabilidad: historial de colaboración, estado de ejecución y entregables se guardan localmente, de modo que el trabajo se puede revisar y retomar.
- Entrada multimodal local (documentos, imágenes, audio, video, PDF y archivos de código) y soporte de Skills y fuentes de conocimiento en la misma ejecución.

## Lo que le falta / riesgos

- No aporta el motor de agente: depende de las herramientas de agente ya instaladas en el Mac, así que sin ellas no hay capacidad propia.
- Solo Apple silicon macOS y sin runtime en la nube: no sigue trabajando con el portátil cerrado, no tiene rutinas programadas ni opera apps reales con sesión iniciada.
- Proyecto de unos tres meses con todas las versiones en pre-release 1.0.x y sin evidencia de tests ni de despliegues empresariales; la memoria es de estado de ejecución, no memoria acumulada por agente.
- Ecosistema pequeño y cerrado: no se documentan plugins, MCP ni integraciones más allá de los agentes locales que el usuario tenga instalados.

## Comparación con el listón

Frente a Grok Bot y los equipos de agentes persistentes de 2026, Meldwork iguala la coordinación entre agentes y las aprobaciones, pero al quedarse en un workspace local sobre agentes externos, sin computadora persistente en la nube, rutinas ni trabajo desatendido, está un escalón por debajo del estado del arte.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/Ryder-Sun/Meldwork) · consultado 2026-11-12
- [Web oficial](https://ryder-sun.github.io/Meldwork/) · consultado 2026-11-12
- [README](https://github.com/Ryder-Sun/Meldwork#readme) · consultado 2026-11-12
- [Releases](https://github.com/Ryder-Sun/Meldwork/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

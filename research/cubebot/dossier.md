# cubebot — dossier de investigación

- **Repo**: https://github.com/vicotrbb/cubebot
- **Web oficial**: https://cubebot.io
- **Licencia**: Apache-2.0
- **Lenguaje**: Rust
- **Estrellas**: 119 · **Forks**: 7
- **Último push**: 2026-11-14T18:43:32Z · **Última release**: 2026-11-14
- **Revisado**: 2026-11-15 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Plataforma self-hosted para un equipo de agentes persistentes: cada uno con memoria, workspace y computadora aislada (KVM o contenedor), salas, equipos, tareas, rutinas, conectores y aprobaciones.

> Agentes persistentes en tu propia infraestructura.

## Nota de verificación

README: plataforma self-hosted con agentes persistentes, sandbox KVM/contenedor, salas, equipos, orquestador, rutinas, conectores, voz, grants y auditoría. Instalación técnica con Docker o Kubernetes.

## Release revisada

- **Tag**: [v0.2.15](https://github.com/vicotrbb/cubebot/releases/tag/v0.2.15)
- **Fecha**: 2026-11-14 (hace 1 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-15 · **Fuente**: releases.atom

**Qué trae**: 0.2.15: actualización de dependencias; sin cambios funcionales mayores.

**Impacto en la ficha**: Nuevo en el ranking: 83.10 S. 8/8 pilares; producto técnico y de nicho.

> What's Changed Consolidate safe dependency updates by @vicotrbb in #120 Release v0.2.15 by @vicotrbb in #121 Full Changelog : v0.2.14...v0.2.15

## Evidencia de la investigación

### ✅ Identidad
  - “Each agent has its own name, memory, workspace and computer.” — https://github.com/vicotrbb/cubebot#readme

### ✅ Computadora propia
  - “Each agent runs in its own sandbox, a KVM virtual machine or a container, with a terminal, a browser and a desktop you can watch live.” — https://github.com/vicotrbb/cubebot#readme

### ✅ Memoria
  - “One permanent conversation, one memory and one workspace per agent, kept across restarts, upgrades and moves.” — https://github.com/vicotrbb/cubebot#readme

### ✅ Rutinas
  - “Schedule recurring work, see every agent's runs on one calendar, and layer in your own calendars.” — https://github.com/vicotrbb/cubebot#readme

### ✅ Apps reales
  - “34 of them, including GitHub, Google, Microsoft 365, Slack, Notion, Linear, Jira and Home Assistant, plus any MCP server.” — https://github.com/vicotrbb/cubebot#readme

### ✅ Coordinación
  - “Talk to one agent, mention several in a room, or group them into teams with an org chart. Describe an outcome in Tasks and the orchestrator splits the work across the right agents.” — https://github.com/vicotrbb/cubebot#readme

### ✅ Aprobaciones
  - “Grants per agent and connection, approvals for sensitive actions, an encrypted vault, an audit log, single sign-on with OpenID Connect, and backups to S3.” — https://github.com/vicotrbb/cubebot#readme

### ✅ Desatendido
  - “Idle agents sleep, then "dream" to tidy their memory, and you can see what changed.” — https://github.com/vicotrbb/cubebot#readme
  - “Schedule recurring work, see every agent's runs on one calendar, and layer in your own calendars.” — https://github.com/vicotrbb/cubebot#readme

## Puntuación

Grok Score: **83.1** · Tier **S** · ADN **100**

- **capacidad**: 82/100
- **autonomia**: 78/100
- **computadora**: 92/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 62/100

## Fortalezas

- Aislamiento fuerte: KVM o contenedor por agente
- Salas, equipos, org chart y orquestador de tareas
- Memoria, rutinas, 34 conectores y voz
- Grants, aprobaciones, auditoría y SSO

## Lo que le falta / riesgos

- Instalación y operación técnica (Docker/Kubernetes)
- Proyecto joven y de nicho (119 estrellas)
- El orquestador necesita el socket de Docker, con riesgo de privilegios

## Comparación con el listón

Tiene la infraestructura y el aislamiento que Grok Bot promete, pero su operación es técnica y su producto aún es joven.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/vicotrbb/cubebot) · consultado 2026-11-15
- [Web oficial](https://cubebot.io) · consultado 2026-11-15
- [README](https://github.com/vicotrbb/cubebot#readme) · consultado 2026-11-15
- [Releases](https://github.com/vicotrbb/cubebot/releases) · consultado 2026-11-15

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

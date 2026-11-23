# cubebot — dossier de investigación

- **Repo**: https://github.com/vicotrbb/cubebot
- **Web oficial**: https://cubebot.io
- **Licencia**: Apache-2.0
- **Lenguaje**: Rust
- **Estrellas**: 121 · **Forks**: 8
- **Último push**: 2026-11-23T16:27:34Z · **Última release**: 2026-11-20
- **Revisado**: 2026-11-23 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Plataforma self-hosted para un equipo de agentes persistentes: cada uno con memoria, workspace y computadora aislada (KVM o contenedor), salas, equipos, tareas, rutinas, conectores y aprobaciones.

> Agentes persistentes en tu propia infraestructura.

## Nota de verificación

README: plataforma self-hosted con agentes persistentes, sandbox KVM/contenedor, salas, equipos, orquestador, rutinas, conectores, voz, grants y auditoría. Instalación técnica con Docker o Kubernetes.

## Release revisada

- **Tag**: [v0.5.3](https://github.com/vicotrbb/cubebot/releases/tag/v0.5.3)
- **Fecha**: 2026-11-20 (hace 3 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.5.3 (y v0.4–v0.5): solicitudes de sala ejecutadas como equipo con agente líder, tarjetas de pago en Vault, coding harness, conector Devin y trazabilidad por respuesta.

**Impacto en la ficha**: Sube a 83.85 S (+0.75): Capacidad 82→84 y Producto 62→65 por el salto v0.2→v0.5 en equipo, trazas y conectores.

> What's Changed Meeting reconnects, a Devin connector, and smaller dev builds by @vicotrbb in #164 Release v0.5.3 by @vicotrbb in #165 Full Changelog : v0.5.2...v0.5.3

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

Grok Score: **83.85** · Tier **S** · ADN **100**

- **capacidad**: 84/100
- **autonomia**: 78/100
- **computadora**: 92/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 65/100

## Fortalezas

- Aislamiento fuerte: KVM o contenedor por agente
- Salas, equipos, org chart y orquestador de tareas
- Memoria, rutinas, 34 conectores y voz
- Grants, aprobaciones, auditoría y SSO

## Lo que le falta / riesgos

- Instalación y operación técnica (Docker/Kubernetes)
- Proyecto joven y de nicho (121 estrellas)
- El orquestador necesita el socket de Docker, con riesgo de privilegios

## Comparación con el listón

Tiene la infraestructura y el aislamiento que Grok Bot promete, pero su operación es técnica y su producto aún es joven.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/vicotrbb/cubebot) · consultado 2026-11-23
- [Web oficial](https://cubebot.io) · consultado 2026-11-23
- [README](https://github.com/vicotrbb/cubebot#readme) · consultado 2026-11-23
- [Releases](https://github.com/vicotrbb/cubebot/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

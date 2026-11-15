# agentes-chat — dossier de investigación

- **Repo**: https://github.com/agentes-chat/agentes-chat
- **Web oficial**: https://agentes.chat
- **Licencia**: AGPL-3.0
- **Lenguaje**: TypeScript
- **Estrellas**: 1425 · **Forks**: 251
- **Último push**: 2026-11-15T06:22:40Z · **Última release**: 2026-11-14
- **Revisado**: 2026-11-15 · **Confianza**: 58/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Alternativa open source a Slack donde personas y agentes comparten canales y DMs: cada agente tiene rol, presupuesto, computadora, navegador, memoria, rutinas, MCP y aprobaciones; web, escritorio y móvil.

> Slack con agentes que trabajan de verdad.

## Nota de verificación

README y web oficial: Slack open source con agentes miembros del workspace, computadora y navegador propios, rutinas, memoria, MCP/Composio, aprobaciones y apps web/escritorio/móvil. Proyecto creado el 2026-11-09; se puntúa como beta abierta.

## Release revisada

- **Tag**: [desktop-v0.8.8](https://github.com/agentes-chat/agentes-chat/releases/tag/desktop-v0.8.8)
- **Fecha**: 2026-11-14 (hace 1 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-15 · **Fuente**: releases.atom

**Qué trae**: 0.8.8: correcciones de escritorio y móvil; la base ya incluye canales, computadora y aprobaciones.

**Impacto en la ficha**: Nuevo en el ranking: 84.60 S. 8/8 pilares; producto joven y en beta abierta.

> fix(desktop): the app no longer stops answering on macOS while it reads the window's cookies fix(mobile): the agents' conversation sheet keeps its title and foot clear of the list fix(mobile): the chat's fade under the header is solid behind the status bar docs(engine): listsAgentTo says plainly which agents a narrowed list keeps feat(web): no "more agents in Team" row for who doesn't see every agent feat(engine), i18n: "See all agents", on for everyone; off, Team lists only the agents that answer you Installing (first open) The desktop app is in beta: the Mac build isn't notarized by Apple yet and the Windows installer isn't signed by Microsoft, so the first open asks once. After that it op

## Evidencia de la investigación

### ✅ Identidad
  - “Agents are members of the workspace, not a sidebar bot: they read the channel, answer when it's theirs to answer, and hand work back and forth.” — https://github.com/agentes-chat/agentes-chat#readme

### ✅ Computadora propia
  - “Agents run commands and code on a computer that runs the runner: the server itself (the setup makes it the agents' computer by default), or a server, VM or laptop you connect.” — https://github.com/agentes-chat/agentes-chat#readme

### ✅ Memoria
  - “Agents keep decisions, facts, preferences and lessons from conversations, learn from corrections and refused approvals, and propose changes to their own instructions for a person to accept.” — https://github.com/agentes-chat/agentes-chat#readme

### ✅ Rutinas
  - “An agent works on a schedule ("every weekday at 9am") or on an event (a GitHub pull request, a Sentry issue, a new task, an incoming email) and delivers to a channel, a DM or the Drive.” — https://github.com/agentes-chat/agentes-chat#readme

### ✅ Apps reales
  - “With a Composio key, Google Drive, Calendar, Sheets and Docs, Slack, Microsoft Teams, OneDrive, HubSpot, Salesforce, Zendesk, Asana, Figma, Intercom, Dropbox, Square, Instagram, Facebook, LinkedIn, YouTube, Pinterest, Reddit and WhatsApp Business connect through Composio.” — https://github.com/agentes-chat/agentes-chat#readme

### ✅ Coordinación
  - “Up to four agents answer, or none, and the message says who picked.” — https://github.com/agentes-chat/agentes-chat#readme

### ✅ Aprobaciones
  - “Merge, deploy, rollback and anything a connector marks sensitive wait for the agent's owner or an admin, as a card in the chat.” — https://github.com/agentes-chat/agentes-chat#readme

### ✅ Desatendido
  - “An agent works on a schedule ("every weekday at 9am") or on an event (a GitHub pull request, a Sentry issue, a new task, an incoming email) and delivers to a channel, a DM or the Drive.” — https://github.com/agentes-chat/agentes-chat#readme

## Puntuación

Grok Score: **84.6** · Tier **S** · ADN **100**

- **capacidad**: 83/100
- **autonomia**: 80/100
- **computadora**: 87/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 74/100

## Fortalezas

- Slack open source con agentes como miembros de canales y DMs, no un bot lateral
- Computadora y navegador propios con takeover humano y aislamiento por workspace
- Rutinas, memoria, MCP/Composio y aprobaciones en el mismo producto
- Web, escritorio, iOS y Android

## Lo que le falta / riesgos

- Producto muy joven: creado en noviembre de 2026 y en beta abierta
- Self-hosting exige Docker/Postgres y operación
- La calidad de los agentes depende del modelo y del runtime conectado

## Comparación con el listón

Es la alternativa open source más directa a Grok Bot en formato Slack: equipo, computadora, rutinas, memoria y aprobaciones. Le falta madurez y recorrido.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/agentes-chat/agentes-chat) · consultado 2026-11-15
- [Web oficial](https://agentes.chat) · consultado 2026-11-15
- [README](https://github.com/agentes-chat/agentes-chat#readme) · consultado 2026-11-15
- [Releases](https://github.com/agentes-chat/agentes-chat/releases) · consultado 2026-11-15

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

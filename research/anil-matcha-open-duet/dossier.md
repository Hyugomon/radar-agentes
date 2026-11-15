# suparagent — dossier de investigación

- **Repo**: https://github.com/Anil-matcha/suparagent
- **Web oficial**: https://suparagent.ai
- **Licencia**: Apache-2.0
- **Lenguaje**: Python
- **Estrellas**: 7075 · **Forks**: 921
- **Último push**: 2026-11-13T10:36:29Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-12 · **Confianza**: 60/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Alternativa open source y autoalojable a Grok Bot y Claude Duet: agentes con nombre, memoria, rutinas, computadora aislada propia y aprobación antes de actuar; ahora con espacios compartidos, roles y permisos.

> Equipo de agentes con computadoras aisladas.

## Nota de verificación

Revisión de release v0.8.6 (2026-11-11): espacios compartidos con miembros, roles y permisos, móvil chat-first y cambio de modelo. Se mantiene el slug histórico anil-matcha-open-duet.

## Release revisada

- **Tag**: [v0.8.6](https://github.com/Anil-matcha/suparagent/releases/tag/v0.8.6)
- **Fecha**: 2026-11-11 (hace 4 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-15 · **Fuente**: releases.atom

**Qué trae**: 0.8.6: espacios compartidos con miembros, roles y permisos; móvil chat-first y cambio de modelo.

**Impacto en la ficha**: Sube de 80.55 a 82.20 S por espacios compartidos, roles/permisos y móvil.

> What's Changed test: fix four stale tests that fail on main by @inderpreet001 in #237 Share a server install with other people: members, roles and permissions by @inderpreet001 in #236 docs: describe members, roles and shared workspaces by @inderpreet001 in #238 feat(mobile): chat-first default screen, sliding sidebar, dynamic model &amp; effort switcher, and server profile integration by @jaiprasad04 in #239 feat(docs): add in-app documentation center, visual workflows guide, and fix Windows Google auth command formatting by @jaiprasad04 in #235 feat: hosted workspace grants, workspace switcher and hosted People screen by @inderpreet001 in #240 Full Changelog : v0.8.5...v0.8.6

## Evidencia de la investigación

### ✅ Identidad
  - “Give agents a name, role, engine, workspace, memory, and approval settings.” — https://github.com/Anil-matcha/suparagent#readme

### ✅ Computadora propia
  - “Docker is only needed for the optional isolated agent computers.” — https://github.com/Anil-matcha/suparagent#readme

### ✅ Memoria
  - “Suparagent keeps conversations, memory, routines, and approvals in one place.” — https://github.com/Anil-matcha/suparagent#readme

### ✅ Rutinas
  - “Add teammates or create a routine when you want to split up or repeat work.” — https://github.com/Anil-matcha/suparagent#readme

### ✅ Apps reales
  - “- **Connect tools and apps.** Connect services such as GitHub, Gmail, and Google Calendar through your own Composio key, then grant access to selected Claude or Codex agents.” — https://suparagent.ai
  - “- Connected apps are reached through Composio and tested against a fake Composio service, not yet the real service.” — https://suparagent.ai
  - “See [connected apps](docs/CONNECTED_APPS.md).” — https://github.com/Anil-matcha/suparagent#readme

### ✅ Coordinación
  - “A lead can delegate work to specialists or coordinate agents in shared rooms.” — https://github.com/Anil-matcha/suparagent#readme
  - “Share a server install with other people: members, roles and permissions” — https://github.com/Anil-matcha/suparagent/releases/tag/v0.8.6

### ✅ Aprobaciones
  - “a routine never approves an action by itself.” — https://github.com/Anil-matcha/suparagent#readme
  - “Share a server install with other people: members, roles and permissions” — https://github.com/Anil-matcha/suparagent/releases/tag/v0.8.6

### ✅ Desatendido
  - “Create routines for scheduled, webhook, or manual runs.” — https://github.com/Anil-matcha/suparagent#readme

## Puntuación

Grok Score: **82.2** · Tier **S** · ADN **100**

- **capacidad**: 82/100
- **autonomia**: 78/100
- **computadora**: 85/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 63/100

## Fortalezas

- Replica casi todo el listón: computadora aislada, rutinas, memoria y aprobaciones
- Espacios compartidos con miembros, roles y permisos
- Autoalojable, con app de escritorio y servicio alojado opcional

## Lo que le falta / riesgos

- En desarrollo activo, con limitaciones reconocidas para trabajo importante
- El autoalojamiento añade fricción operativa
- Poca evidencia pública de tests, escala y casos de uso reales

## Comparación con el listón

Es de lo más cercano en concepto a Grok Bot dentro del open source; los espacios compartidos mejoran el equipo, pero su madurez sigue por demostrar.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/Anil-matcha/suparagent) · consultado 2026-11-15
- [Web oficial](https://suparagent.ai) · consultado 2026-11-15
- [README](https://github.com/Anil-matcha/suparagent#readme) · consultado 2026-11-15
- [Releases](https://github.com/Anil-matcha/suparagent/releases) · consultado 2026-11-15

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

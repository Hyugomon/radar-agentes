# suparagent — dossier de investigación

- **Repo**: https://github.com/Anil-matcha/suparagent
- **Web oficial**: https://suparagent.ai
- **Licencia**: Apache-2.0
- **Tipo de licencia**: Open source · **Uso / Precio**: Gratis
- **Lenguaje**: Python
- **Estrellas**: 7158 · **Forks**: 931
- **Último push**: 2026-11-23T18:03:42Z · **Última release**: 2026-11-16
- **Revisado**: 2026-11-23 · **Confianza**: 60/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Alternativa open source y autoalojable a Grok Bot y Claude Duet: agentes con nombre, memoria, rutinas, computadora aislada propia y aprobación antes de actuar; ahora con espacios compartidos, roles y permisos.

> Equipo de agentes con computadoras aisladas.

## Nota de verificación

Revisión de release v0.8.6 (2026-11-11): espacios compartidos con miembros, roles y permisos, móvil chat-first y cambio de modelo. Se mantiene el slug histórico anil-matcha-open-duet.

## Release revisada

- **Tag**: [v0.8.7](https://github.com/Anil-matcha/suparagent/releases/tag/v0.8.7)
- **Fecha**: 2026-11-16 (hace 7 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.8.7: servidores MCP personalizados con login en navegador, búsqueda de herramientas y compartición en equipo.

**Impacto en la ficha**: Sube a 82.65 S (+0.45): Capacidad 82→83 y Producto 63→65 por MCP compartido en equipo.

> What's Changed feat: custom MCP servers with browser sign-in, tool search and team sharing by @inderpreet001 in #241 Full Changelog : v0.8.6...v0.8.7

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

Grok Score: **82.65** · Tier **S** · ADN **100**

- **capacidad**: 83/100
- **autonomia**: 78/100
- **computadora**: 85/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 65/100

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

- [Repositorio GitHub](https://github.com/Anil-matcha/suparagent) · consultado 2026-11-23
- [Web oficial](https://suparagent.ai) · consultado 2026-11-23
- [README](https://github.com/Anil-matcha/suparagent#readme) · consultado 2026-11-23
- [Releases](https://github.com/Anil-matcha/suparagent/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

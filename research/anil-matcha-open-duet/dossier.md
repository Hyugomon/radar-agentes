# open-duet — dossier de investigación

- **Repo**: https://github.com/Anil-matcha/suparagent
- **Web oficial**: https://suparagent.ai
- **Licencia**: Apache-2.0
- **Lenguaje**: Python
- **Estrellas**: 7031 · **Forks**: 913
- **Último push**: 2026-11-11T15:55:47Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-12 · **Confianza**: 58/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Alternativa open-source y autoalojable a Grok Bot y Claude Duet: agentes con nombre, memoria, rutinas, computadora aislada propia y aprobación antes de actuar.

> Equipo de agentes con computadoras aisladas.

## Nota de verificación

README: agentes con nombre, memoria, rutinas, computadora aislada y aprobaciones; un líder delega en especialistas. El servidor puede quedar corriendo.

## Evidencia de la investigación

### ✅ Identidad
  - “Give agents a name, role, engine, workspace, memory, and approval settings.” — https://github.com/Anil-matcha/open-duet#readme

### ✅ Computadora propia
  - “Docker is only needed for the optional isolated agent computers.” — https://github.com/Anil-matcha/open-duet#readme

### ✅ Memoria
  - “Suparagent keeps conversations, memory, routines, and approvals in one place.” — https://github.com/Anil-matcha/open-duet#readme

### ✅ Rutinas
  - “Add teammates or create a routine when you want to split up or repeat work.” — https://github.com/Anil-matcha/open-duet#readme

### ✅ Apps reales
  - “- **Connect tools and apps.** Connect services such as GitHub, Gmail, and Google Calendar through your own Composio key, then grant access to selected Claude or Codex agents.” — https://suparagent.ai
  - “- Connected apps are reached through Composio and tested against a fake Composio service, not yet the real service.” — https://suparagent.ai
  - “See [connected apps](docs/CONNECTED_APPS.md).” — https://github.com/Anil-matcha/suparagent#readme

### ✅ Coordinación
  - “A request goes to a Claude or Codex team lead, who delegates work to specialists. Teammates can share a project folder, and you review actions when approval is required.” — https://github.com/Anil-matcha/open-duet#readme

### ✅ Aprobaciones
  - “Choose Ask first to pause for approval before actions that change files or systems.” — https://github.com/Anil-matcha/open-duet#readme

### ✅ Desatendido
  - “Use the desktop app or host the server yourself; the desktop app and server are experimental.” — https://github.com/Anil-matcha/open-duet#readme

## Puntuación

Grok Score: **80.55** · Tier **S** · ADN **100**

- **capacidad**: 80/100
- **autonomia**: 76/100
- **computadora**: 85/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 56/100

## Fortalezas

- Replica casi todo el listón: computadora aislada, rutinas, memoria y aprobaciones
- Autoalojable, con app de escritorio y servicio alojado opcional
- No exige un modelo ni una suscripción propia del proyecto

## Lo que le falta / riesgos

- En desarrollo activo, con limitaciones reconocidas para trabajo importante
- No incluye modelo y el autoalojamiento añade fricción operativa
- Poca evidencia pública de tests, escala y casos de uso reales

## Comparación con el listón

Es de lo más cercano en concepto a Grok Bot dentro del open source, pero su madurez y su ejecución están todavía por demostrar frente al producto de xAI.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/Anil-matcha/suparagent) · consultado 2026-11-12
- [Web oficial](https://suparagent.ai) · consultado 2026-11-12
- [README](https://github.com/Anil-matcha/suparagent#readme) · consultado 2026-11-12
- [Releases](https://github.com/Anil-matcha/suparagent/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

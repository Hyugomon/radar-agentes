# threebot — dossier de investigación

- **Repo**: https://github.com/RokaSwK/threebot
- **Web oficial**: https://bot.swk.tools/
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 46 · **Forks**: 10
- **Último push**: 2026-11-21T17:11:15Z · **Última release**: 2026-11-21
- **Revisado**: 2026-11-23 · **Confianza**: 72/100
- **Tipo**: assistant · **Categoría**: personal

## Qué es

Agentes personales que convierten un hilo de T3 Code en un bot con nombre, memoria y presencia en el móvil, reutilizando las suscripciones de IA que el usuario ya paga. Va dirigido a usuarios técnicos de T3 Code que quieren delegar tareas y rutinas desde el teléfono.

> Un hilo de T3 convertido en bot.

## Nota de verificación

README: bot con memoria Markdown, rutinas, subagentes, navegador de T3 con control y aprobaciones. Depende de T3 Code y corre en tu máquina.

## Release revisada

- **Tag**: [v0.1.15](https://github.com/RokaSwK/threebot/releases/tag/v0.1.15)
- **Fecha**: 2026-11-21 (hace 2 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.1.15 (y v0.1.11–v0.1.14): instalador Windows en un clic + servicio en segundo plano, acceso móvil por QR, rutinas con modelo propio, salas que siguen subagentes y notificaciones push por bot.

**Impacto en la ficha**: Sube a 73.35 A (+3.30): Producto 40→54, Capacidad 60→64 y Autonomía 62→66 por madurez en Windows, móvil y salas.

> v0.1.15 · 10 changes from 3 contributors Notifications show the Bot. Push notifications now carry the Bot's own avatar and name, requests stay visible until you answer them, and you control push notifications. Your other chats can give permission. A request relayed from another of your chats or Bots now counts as yours, so Bots act on it without asking you again; switch it off in Settings → Permissions. Routines on their own model. A routine can run on a model of its choice, in its own conversation. Opens fast, even offline. Threebot installs its core right away and fetches the rest as you use it, and a Bot you've opened before opens from the device's copy when you're offline. Collapsible si

## Evidencia de la investigación

### ✅ Identidad
  - “The rest of a personal agent Say it once Tell a Bot to do something every weekday at 8 and it becomes a routine.” — https://bot.swk.tools/
  - “It does what a personal assistant does, faster, and runs your other threads for you.” — https://github.com/RokaSwK/threebot#readme
  - “Threebot turns one long-lived T3 thread into someone you can message: a Bot with a face, a memory and a place on your phone.” — https://github.com/RokaSwK/threebot#readme

### ✅ Computadora propia
  - “## What's in it **On top of T3 Code** | In Threebot | In T3 Code | |---|---| | A Bot | A long-lived thread in its own project | | Subagents | T3 subagents and delegated threads | | Routines | Scheduled tasks | | A Bot's computer | The T3 browser, with Take control | | The model in Bot details | Your T3 providers | Everything stays a normal T3 thread, so you can open any of it in T3 Code at any time.” — https://bot.swk.tools/
  - “## How it works The browser app talks only to a small Node gateway, and the gateway talks to T3 Code.” — https://bot.swk.tools/
  - “The threads, subagents, scheduled tasks, browser, secure requests and MCP tools are all theirs.” — https://github.com/RokaSwK/threebot#readme

### ✅ Memoria
  - “- **Memory.** Each Bot keeps a Markdown memory file it updates as it learns, plus one shared by all your Bots.” — https://github.com/RokaSwK/threebot#readme
  - “You can read and edit both in the Memory tab.” — https://github.com/RokaSwK/threebot#readme
  - “Threebot turns one long-lived T3 thread into someone you can message: a Bot with a face, a memory and a place on your phone.” — https://github.com/RokaSwK/threebot#readme

### ✅ Rutinas
  - “## What's in it **On top of T3 Code** | In Threebot | In T3 Code | |---|---| | A Bot | A long-lived thread in its own project | | Subagents | T3 subagents and delegated threads | | Routines | Scheduled tasks | | A Bot's computer | The T3 browser, with Take control | | The model in Bot details | Your T3 providers | Everything stays a normal T3 thread, so you can open any of it in T3 Code at any time.” — https://bot.swk.tools/
  - “The threads, subagents, scheduled tasks, browser, secure requests and MCP tools are all theirs.” — https://github.com/RokaSwK/threebot#readme
  - “Y You Ship Ask Ship Ship Idle Details Library Computer Model Opus 5.5 Medium Lineage Ship Routines Say "every weekday at 8" to make one.” — https://bot.swk.tools/

### ✅ Apps reales
  - “- **Connected apps.** Gmail, GitHub, Slack and the rest, powered by [Executor](https://executor.sh), if you run it.” — https://github.com/RokaSwK/threebot#readme
  - “Gmail, Calendar, Linear, GitHub, Slack, Notion, Stripe: connect the ones a Bot should work with.” — https://bot.swk.tools/
  - “Connected apps run through [Executor](https://executor.sh).” — https://github.com/RokaSwK/threebot#readme

### ✅ Coordinación
  - “## What's in it **On top of T3 Code** | In Threebot | In T3 Code | |---|---| | A Bot | A long-lived thread in its own project | | Subagents | T3 subagents and delegated threads | | Routines | Scheduled tasks | | A Bot's computer | The T3 browser, with Take control | | The model in Bot details | Your T3 providers | Everything stays a normal T3 thread, so you can open any of it in T3 Code at any time.” — https://bot.swk.tools/
  - “Inbox Paying: Ana, Ravi (Team), Mina, Jonas (Pro).” — https://bot.swk.tools/
  - “It isn't affiliated with or endorsed by its team.” — https://bot.swk.tools/

### ✅ Aprobaciones
  - Sin evidencia directa en el README/web revisada.

### ❌ Desatendido
  - “`threebot up` asks T3 Code for a token, starts Threebot as a background service (launchd on macOS, systemd on Linux) and prints its address, <http://127.0.0.1:3780>.” — https://github.com/RokaSwK/threebot#readme
  - “It connects to T3 Code and starts in the background.” — https://bot.swk.tools/

## Puntuación

Grok Score: **73.35** · Tier **A** · ADN **90**

- **capacidad**: 64/100
- **autonomia**: 66/100
- **computadora**: 65/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 54/100

## Fortalezas

- Convierte un hilo persistente en un bot con memoria, cara propia y acceso desde la PWA
- Rutinas programadas, subagentes, conexión de apps y bóveda de credenciales en un producto pequeño
- Reutiliza suscripciones existentes en vez de revender tokens, con coste marginal casi nulo

## Lo que le falta / riesgos

- Cuatro días de vida y 46 estrellas: sin usuarios, tests ni historial de estabilidad
- Dependencia total de T3 Code y de sus planes, con riesgo de rotura por cambios ajenos
- Ecosistema inexistente y documentación limitada al README

## Comparación con el listón

Aporta una idea original de 'bot como hilo' frente a asistentes personales como Mercury, pero a día de hoy no es comparable con ningún producto establecido.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/RokaSwK/threebot) · consultado 2026-11-23
- [Web oficial](https://bot.swk.tools/) · consultado 2026-11-23
- [README](https://github.com/RokaSwK/threebot#readme) · consultado 2026-11-23
- [Releases](https://github.com/RokaSwK/threebot/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

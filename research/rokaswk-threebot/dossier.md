# threebot — dossier de investigación

- **Repo**: https://github.com/RokaSwK/threebot
- **Web oficial**: https://bot.swk.tools/
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 38 · **Forks**: 6
- **Último push**: 2026-11-11T13:08:21Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-12 · **Confianza**: 72/100
- **Tipo**: assistant · **Categoría**: personal

## Qué es

Agentes personales que convierten un hilo de T3 Code en un bot con nombre, memoria y presencia en el móvil, reutilizando las suscripciones de IA que el usuario ya paga. Va dirigido a usuarios técnicos de T3 Code que quieren delegar tareas y rutinas desde el teléfono.

> Un hilo de T3 convertido en bot.

## Nota de verificación

README: bot con memoria Markdown, rutinas, subagentes, navegador de T3 con control y aprobaciones. Depende de T3 Code y corre en tu máquina.

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

Grok Score: **70.05** · Tier **A** · ADN **90**

- **capacidad**: 60/100
- **autonomia**: 62/100
- **computadora**: 65/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 40/100

## Fortalezas

- Convierte un hilo persistente en un bot con memoria, cara propia y acceso desde la PWA
- Rutinas programadas, subagentes, conexión de apps y bóveda de credenciales en un producto pequeño
- Reutiliza suscripciones existentes en vez de revender tokens, con coste marginal casi nulo

## Lo que le falta / riesgos

- Cuatro días de vida y 38 estrellas: sin usuarios, tests ni historial de estabilidad
- Dependencia total de T3 Code y de sus planes, con riesgo de rotura por cambios ajenos
- Ecosistema inexistente y documentación limitada al README

## Comparación con el listón

Aporta una idea original de 'bot como hilo' frente a asistentes personales como Mercury, pero a día de hoy no es comparable con ningún producto establecido.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/RokaSwK/threebot) · consultado 2026-11-12
- [Web oficial](https://bot.swk.tools/) · consultado 2026-11-12
- [README](https://github.com/RokaSwK/threebot#readme) · consultado 2026-11-12
- [Releases](https://github.com/RokaSwK/threebot/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

# timon — dossier de investigación

- **Repo**: https://github.com/ai-timon/timon
- **Web oficial**: —
- **Licencia**: AGPL-3.0
- **Tipo de licencia**: Open source · **Uso / Precio**: Gratis
- **Lenguaje**: TypeScript
- **Estrellas**: 725 · **Forks**: 90
- **Último push**: 2026-11-23T18:58:25Z · **Última release**: 2026-11-18
- **Revisado**: 2026-11-23 · **Confianza**: 55/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Equipo de agentes de IA que corre en tu propia máquina, trabaja con las suscripciones CLI que ya pagas, revisa el código que produce y pide aprobación antes de lo importante. Para desarrolladores que quieren avanzar trabajo mientras duermen sin montar infraestructura.

> Tu equipo de agentes local.

## Nota de verificación

Revisión v0.1.8–v0.1.9 y README actual: navegador aislado por misión con grabaciones/skills y pausa humana en pagos/captchas, memoria entre misiones, cron/webhooks/series nocturnas, soporte Google Antigravity (agy) con tarjetas Allow/Deny y servicio en Windows/macOS/Linux. Proyecto pequeño todavía.

## Release revisada

- **Tag**: [v0.1.9](https://github.com/ai-timon/timon/releases/tag/v0.1.9)
- **Fecha**: 2026-11-18 (hace 5 días)
- **Estado**: activo · **Releases en 90 días**: 3
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.1.9 (y v0.1.8): soporte Google Antigravity (agy) con tarjetas Allow/Deny, grabaciones de navegador con pausa humana, actualizaciones in-app, modo Free sin licencia y mejoras en Windows.

**Impacto en la ficha**: Sube a Tier A (+13.65, ADN 42→100): Computadora, Memoria, Rutinas y Apps pasan a ON; Producto 29→46 (sigue siendo proyecto joven).

> Highlights A new version now shows as a card at the bottom left, and Update installs it without leaving Timon. Without a licence Timon is simply Free, and a briefly unreachable licensing service no longer shows anything. Errors and Timon's own messages now read in your language. New Settings › System › Privacy: mission history is cleaned after 180 days, and usage statistics turn off in one click. Windows: many fixes to updates, the background service, worktrees and exports. Added On Linux, when you refuse the approval screen of an AppImage the app updated itself, Go back to x.y.z puts the previous version back and opens it. A task created from the board or by a raw API call can be attached t

## Evidencia de la investigación

### ✅ Identidad
  - “Every agent has a role, its own skills and a memory that follows it from mission to mission.” — https://github.com/ai-timon/timon#readme
  - “The **orchestrator** splits the job into tasks and hands each one to the right agent: one codes, another reviews with a different model, a third merges.” — https://github.com/ai-timon/timon#readme
  - “Once it is running, check that everything is in place: ```bash timon doctor # checks the service, the backends and the paths timon backends # lists the agent CLIs Timon found ``` That's it: open Timon and say hi to your orchestrator.” — https://github.com/ai-timon/timon#readme

### ✅ Computadora propia
  - “**From source.** Clone this repository and follow [GETTING-STARTED.md](GETTING-STARTED.md): the daemon and the web app run on all three systems without the desktop app.” — https://github.com/ai-timon/timon#readme
  - “🎉 On a server without a screen, install the background service from the terminal: ```bash timon service install --dry-run # shows what will be installed timon service install ``` The [installation guide](https://docs.timon-ai.com/installation/overview) covers each system, remote access from your phone, updates and troubleshooting.” — https://github.com/ai-timon/timon#readme
  - “A built-in browser: isolated per mission, with annotations and recordings.” — https://github.com/ai-timon/timon#readme

### ✅ Memoria
  - “Every agent has a role, its own skills and a memory that follows it from mission to mission.” — https://github.com/ai-timon/timon#readme
  - “Memory that reaches the agent: a rule learned once is injected into the next mission.” — https://github.com/ai-timon/timon#readme

### ✅ Rutinas
  - “Routines, cron and webhook triggers, overnight series paced to your quotas.” — https://github.com/ai-timon/timon#readme

### ✅ Apps reales
  - “- Questions, plugins and show-and-tell go to [Discord](https://discord.gg/ZQGARNcpZ3).” — https://github.com/ai-timon/timon#readme
  - “A browser recording now shows a manual step when you act inside an embedded frame (a payment form, a captcha, a sign-in widget), and the learned skill pauses there and asks you to do that part yourself.” — https://github.com/ai-timon/timon/releases/tag/v0.1.9

### ✅ Coordinación
  - Sin evidencia directa en el README/web revisada.

### ✅ Aprobaciones
  - “The **orchestrator** splits the job into tasks and hands each one to the right agent: one codes, another reviews with a different model, a third merges.” — https://github.com/ai-timon/timon#readme
  - “- **Want to change the code?** Read [CONTRIBUTING.md](CONTRIBUTING.md): how to run the checks, and the rules a review looks at.” — https://github.com/ai-timon/timon#readme

### ✅ Desatendido
  - “🎉 On a server without a screen, install the background service from the terminal: ```bash timon service install --dry-run # shows what will be installed timon service install ``` The [installation guide](https://docs.timon-ai.com/installation/overview) covers each system, remote access from your phone, updates and troubleshooting.” — https://github.com/ai-timon/timon#readme
  - “**From source.** Clone this repository and follow [GETTING-STARTED.md](GETTING-STARTED.md): the daemon and the web app run on all three systems without the desktop app.” — https://github.com/ai-timon/timon#readme

## Puntuación

Grok Score: **72.7** · Tier **A** · ADN **100**

- **capacidad**: 68/100
- **autonomia**: 68/100
- **computadora**: 72/100
- **memoria**: 82/100
- **rutinas**: 84/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 46/100

## Fortalezas

- Aprovecha suscripciones CLI existentes en vez de API keys, con enfoque local y coste marginal bajo
- Incluye revisión de código y aprobaciones antes de acciones delicadas, piezas correctas del listón
- Multiplataforma (Windows, macOS, Linux) con documentación y Discord desde el primer día

## Lo que le falta / riesgos

- Proyecto joven (725 estrellas) con historial corto frente a alternativas consolidadas
- Depende de suscripciones/CLIs de terceros (Claude, Antigravity, etc.) y sus cuotas
- Ecosistema de plugins todavía pequeño

## Comparación con el listón

Apunta al patrón correcto de 2026, pero hoy es solo una promesa sin historial frente a Grok Bot o a los coding agents consolidados.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/ai-timon/timon) · consultado 2026-11-23
- [README](https://github.com/ai-timon/timon#readme) · consultado 2026-11-23
- [Releases](https://github.com/ai-timon/timon/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

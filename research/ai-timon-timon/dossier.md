# timon — dossier de investigación

- **Repo**: https://github.com/ai-timon/timon
- **Web oficial**: —
- **Licencia**: AGPL-3.0
- **Lenguaje**: TypeScript
- **Estrellas**: 292 · **Forks**: 25
- **Último push**: 2026-11-11T08:58:11Z · **Última release**: 2026-11-06
- **Revisado**: 2026-11-12 · **Confianza**: 55/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Equipo de agentes de IA que corre en tu propia máquina, trabaja con las suscripciones CLI que ya pagas, revisa el código que produce y pide aprobación antes de lo importante. Para desarrolladores que quieren avanzar trabajo mientras duermen sin montar infraestructura.

> Tu equipo de agentes local.

## Nota de verificación

Revisión previa + README: equipo de agentes que corre en tu máquina y trabaja con tus suscripciones CLI; aprobaciones y trabajo desatendido.

## Evidencia de la investigación

### ✅ Identidad
  - “Every agent has a role, its own skills and a memory that follows it from mission to mission.” — https://github.com/ai-timon/timon#readme
  - “The **orchestrator** splits the job into tasks and hands each one to the right agent: one codes, another reviews with a different model, a third merges.” — https://github.com/ai-timon/timon#readme
  - “Once it is running, check that everything is in place: ```bash timon doctor # checks the service, the backends and the paths timon backends # lists the agent CLIs Timon found ``` That's it: open Timon and say hi to your orchestrator.” — https://github.com/ai-timon/timon#readme

### ❌ Computadora propia
  - “**From source.** Clone this repository and follow [GETTING-STARTED.md](GETTING-STARTED.md): the daemon and the web app run on all three systems without the desktop app.” — https://github.com/ai-timon/timon#readme
  - “🎉 On a server without a screen, install the background service from the terminal: ```bash timon service install --dry-run # shows what will be installed timon service install ``` The [installation guide](https://docs.timon-ai.com/installation/overview) covers each system, remote access from your phone, updates and troubleshooting.” — https://github.com/ai-timon/timon#readme

### ❌ Memoria
  - “Every agent has a role, its own skills and a memory that follows it from mission to mission.” — https://github.com/ai-timon/timon#readme

### ❌ Rutinas
  - Sin evidencia directa en el README/web revisada.

### ❌ Apps reales
  - “- Questions, plugins and show-and-tell go to [Discord](https://discord.gg/ZQGARNcpZ3).” — https://github.com/ai-timon/timon#readme

### ✅ Coordinación
  - Sin evidencia directa en el README/web revisada.

### ✅ Aprobaciones
  - “The **orchestrator** splits the job into tasks and hands each one to the right agent: one codes, another reviews with a different model, a third merges.” — https://github.com/ai-timon/timon#readme
  - “- **Want to change the code?** Read [CONTRIBUTING.md](CONTRIBUTING.md): how to run the checks, and the rules a review looks at.” — https://github.com/ai-timon/timon#readme

### ✅ Desatendido
  - “🎉 On a server without a screen, install the background service from the terminal: ```bash timon service install --dry-run # shows what will be installed timon service install ``` The [installation guide](https://docs.timon-ai.com/installation/overview) covers each system, remote access from your phone, updates and troubleshooting.” — https://github.com/ai-timon/timon#readme
  - “**From source.** Clone this repository and follow [GETTING-STARTED.md](GETTING-STARTED.md): the daemon and the web app run on all three systems without the desktop app.” — https://github.com/ai-timon/timon#readme

## Puntuación

Grok Score: **59.05** · Tier **C** · ADN **42**

- **capacidad**: 55/100
- **autonomia**: 58/100
- **computadora**: 55/100
- **memoria**: 60/100
- **rutinas**: 55/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 29/100

## Fortalezas

- Aprovecha suscripciones CLI existentes en vez de API keys, con enfoque local y coste marginal bajo
- Incluye revisión de código y aprobaciones antes de acciones delicadas, piezas correctas del listón
- Multiplataforma (Windows, macOS, Linux) con documentación y Discord desde el primer día

## Lo que le falta / riesgos

- Creado el mismo día del análisis: cero historial, cero releases verificables y 292 estrellas
- Sin evidencia de tests, casos reales ni estabilidad; todo son promesas del README
- Depende de los CLI de terceros y de sus cuotas, en un espacio de 'agent team local' ya saturado

## Comparación con el listón

Apunta al patrón correcto de 2026, pero hoy es solo una promesa sin historial frente a Grok Bot o a los coding agents consolidados.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/ai-timon/timon) · consultado 2026-11-12
- [README](https://github.com/ai-timon/timon#readme) · consultado 2026-11-12
- [Releases](https://github.com/ai-timon/timon/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

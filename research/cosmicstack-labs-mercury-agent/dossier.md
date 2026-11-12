# mercury-agent — dossier de investigación

- **Repo**: https://github.com/cosmicstack-labs/mercury-agent
- **Web oficial**: https://mercuryagent.sh/
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 3898 · **Forks**: 397
- **Último push**: 2026-11-12T07:21:12Z · **Última release**: 2026-11-03
- **Revisado**: 2026-11-12 · **Confianza**: 74/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Agente personal local con herramientas endurecidas por permisos, presupuestos de tokens y acceso multicanal (CLI, Telegram), diseñado para correr 24/7 pidiendo aprobación antes de actuar. Su público es el usuario técnico que quiere un asistente persistente en su propia máquina.

> Asistente y equipo de bots autoalojado.

## Nota de verificación

README: memoria en SQLite, scheduler, bots persistentes con especialistas, aprobaciones, daemon always-on. Opera archivos, shell, git y web; no es una GUI completa.

## Evidencia de la investigación

### ✅ Identidad
  - “Mercury is an open-source agent with a personality you write yourself, a memory that stays on your disk, and a permission system that sits between the model and your machine.” — https://github.com/cosmicstack-labs/mercury-agent#readme

### ✅ Computadora propia
  - “It reads and writes your files, runs commands, ships code through git and GitHub, researches the web and keeps a schedule.” — https://github.com/cosmicstack-labs/mercury-agent#readme

### ✅ Memoria
  - “Second Brain: typed, deduplicated facts in SQLite with full-text search, all on your disk.” — https://github.com/cosmicstack-labs/mercury-agent#readme

### ✅ Rutinas
  - “Scheduled automations - Mercury Bots run on schedules, hand work to each other, and deliver finished files.” — https://github.com/cosmicstack-labs/mercury-agent#readme

### ❌ Apps reales
  - “It runs on your machine, asks before it acts, and works with any model, from Mercury Desktop, your terminal, browser, Telegram, Discord, Slack, or Signal.” — https://mercuryagent.sh/
  - “It answers from what it remembers about you, works with ~50 built-in tools, and follows you from the terminal to Telegram, Discord, Slack, Signal, or the web.” — https://mercuryagent.sh/
  - “You choose per session whether Mercury asks every time or runs freely, and members of a shared Telegram or Discord channel cannot widen their own access.” — https://github.com/cosmicstack-labs/mercury-agent#readme

### ✅ Coordinación
  - “Mercury Bots gives it a team. Persistent specialists research, write and ship on their own schedule.” — https://github.com/cosmicstack-labs/mercury-agent#readme

### ✅ Aprobaciones
  - “It asks before it acts. File access is scoped per folder, shell commands pass through a blocklist and an approval step.” — https://github.com/cosmicstack-labs/mercury-agent#readme

### ✅ Desatendido
  - “The runtime runs as a login service (LaunchAgent on macOS, systemd on Linux, Task Scheduler on Windows) and restarts itself after a crash.” — https://github.com/cosmicstack-labs/mercury-agent#readme

## Puntuación

Grok Score: **80.7** · Tier **S** · ADN **86**

- **capacidad**: 74/100
- **autonomia**: 78/100
- **computadora**: 79/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 67/100

## Fortalezas

- Pide aprobación antes de acciones irreversibles y aplica presupuestos de tokens, algo poco común en agentes locales
- Operación continua 24/7 con memoria de lo relevante y varios canales de acceso
- Arquitectura de permisos y límites de coste pensada para uso prolongado sin supervisión

## Lo que le falta / riesgos

- No ofrece computadora persistente con navegador y archivos al nivel del listón de 2026
- Laboratorio pequeño con ecosistema e integraciones limitadas
- La capa 'soul-driven' aporta más narrativa que capacidad técnica verificable

## Comparación con el listón

Se acerca a Open Interpreter y agentes personales locales, pero está lejos de Grok Bot en operación de apps reales y coordinación de subagentes.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/cosmicstack-labs/mercury-agent) · consultado 2026-11-12
- [Web oficial](https://mercuryagent.sh/) · consultado 2026-11-12
- [README](https://github.com/cosmicstack-labs/mercury-agent#readme) · consultado 2026-11-12
- [Releases](https://github.com/cosmicstack-labs/mercury-agent/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

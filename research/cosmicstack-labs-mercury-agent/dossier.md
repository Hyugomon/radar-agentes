# mercury-agent — dossier de investigación

- **Repo**: https://github.com/cosmicstack-labs/mercury-agent
- **Web oficial**: https://mercuryagent.sh/
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 4066 · **Forks**: 416
- **Último push**: 2026-11-23T09:01:12Z · **Última release**: 2026-11-22
- **Revisado**: 2026-11-23 · **Confianza**: 74/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Agente personal local con herramientas endurecidas por permisos, presupuestos de tokens y acceso multicanal (CLI, Telegram), diseñado para correr 24/7 pidiendo aprobación antes de actuar. Su público es el usuario técnico que quiere un asistente persistente en su propia máquina.

> Asistente y equipo de bots autoalojado.

## Nota de verificación

README: memoria en SQLite, scheduler, bots persistentes con especialistas, aprobaciones, daemon always-on. Opera archivos, shell, git y web; no es una GUI completa.

## Release revisada

- **Tag**: [v1.5.5](https://github.com/cosmicstack-labs/mercury-agent/releases/tag/v1.5.5)
- **Fecha**: 2026-11-22 (hace 1 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v1.5.5 (y v1.5.3–v1.5.4): apps móviles iOS/Android con llamadas de voz en ~2s, Google Workspace en un comando, defensa anti-prompt-injection, tokens de dispositivo y escalado humano multicanal.

**Impacto en la ficha**: Sube a 82.40 S (+1.70): Capacidad 74→78, Confianza 90→92 y Producto 67→73 por móvil/voz, Google Workspace y seguridad.

> ☿ Mercury Agent v1.5.5 Devices sign in with a device token, Mercury asks you for what only you can do, and bots use fewer tokens. Devices sign in with a device token Password sign-in from other devices is now off by default. To connect a phone, Mercury Desktop or a browser on another computer, make a token on the computer Mercury runs on: /server token (or mercury devices add ), and paste it in. Devices already signed in keep working. Turn password sign-in back on with /server password on . /server is easier: add allowed addresses by typing them, copying a token closes the token screen, and in Mercury Desktop /server opens its own Remote access window. Mercury asks you for what only you can 

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
  - “Sends, shares, uploads and deletes always ask you , even under Allow All. They're refused in scheduled tasks and for bots.” — https://github.com/cosmicstack-labs/mercury-agent/releases/tag/v1.5.3

### ✅ Desatendido
  - “The runtime runs as a login service (LaunchAgent on macOS, systemd on Linux, Task Scheduler on Windows) and restarts itself after a crash.” — https://github.com/cosmicstack-labs/mercury-agent#readme

## Puntuación

Grok Score: **82.4** · Tier **S** · ADN **86**

- **capacidad**: 78/100
- **autonomia**: 78/100
- **computadora**: 79/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 90/100
- **confianza**: 92/100
- **producto**: 73/100

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

- [Repositorio GitHub](https://github.com/cosmicstack-labs/mercury-agent) · consultado 2026-11-23
- [Web oficial](https://mercuryagent.sh/) · consultado 2026-11-23
- [README](https://github.com/cosmicstack-labs/mercury-agent#readme) · consultado 2026-11-23
- [Releases](https://github.com/cosmicstack-labs/mercury-agent/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

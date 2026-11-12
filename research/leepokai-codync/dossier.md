# Codync — dossier de investigación

- **Repo**: https://github.com/leepokai/Codync
- **Web oficial**: https://www.codync.dev
- **Licencia**: Apache-2.0
- **Lenguaje**: Rust
- **Estrellas**: 2052 · **Forks**: 208
- **Último push**: 2026-11-12T07:07:19Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-12 · **Confianza**: 62/100
- **Tipo**: bot · **Categoría**: teams

## Qué es

Codync es una app de escritorio y iOS, escrita en Rust y autoalojada, que convierte tus suscripciones a Claude Code, Codex, Cursor y otros 40+ agentes en bots con identidad propia a los que escribes desde el móvil. Está pensada para desarrolladores que quieren un sustituto casero de Grok Bot sobre su propia máquina, sin nube ni capa de pago.

> Tus agentes CLI, convertidos en bots.

## Nota de verificación

README: bots persistentes con nombre, memoria por bot, group chats, aprobaciones y herramienta de computadora. No encontré scheduler/rutinas en el README, así que rutinas queda en falso. Los agentes corren en tu computadora.

## Evidencia de la investigación

### ✅ Identidad
  - “Persistent named bots, group chats, quote replies, bots asking each other for help, approval cards, per-bot memory, remote screen, voice calls and 'needs you / done' notifications.” — https://github.com/leepokai/Codync#readme

### ✅ Computadora propia
  - “Remote screen. See and control your computer from the iPhone over WebRTC, and let bots use the screen themselves through the built-in computer tool.” — https://github.com/leepokai/Codync#readme

### ✅ Memoria
  - “Persistent named bots, group chats, quote replies, bots asking each other for help, approval cards, per-bot memory, remote screen, voice calls.” — https://github.com/leepokai/Codync#readme

### ❌ Rutinas
  - “Wants to change files Edit src/pace.js Runs on MacBook-Pro-3 · trailmix Details Allow once Always allow Deny Needs approval: Edit src/pace.js 1 : 36 9:41 On a schedule Routines run a bot every morning, every hour or when a webhook arrives, and the result comes as a message.” — https://www.codync.dev
  - “Morning brief Every day, 08:00 Check the build Every hour Deploy finished Webhook Bots on your other computers (beta) Put your computers in a private network and a bot on one can ask a bot on another.” — https://www.codync.dev

### ✅ Apps reales
  - “Remote screen. See and control your computer from the iPhone over WebRTC, and let bots use the screen themselves through the built-in computer tool.” — https://github.com/leepokai/Codync#readme

### ✅ Coordinación
  - “Many bots, one team. Run as many bots as you like side by side, each with its own agent, project folder and approvals... Put several in a group chat and they answer in turn.” — https://github.com/leepokai/Codync#readme

### ✅ Aprobaciones
  - “The chat only shows what matters: your messages, each turn's final reply, approval cards and notices.” — https://github.com/leepokai/Codync#readme

### ❌ Desatendido
  - “Bots run on the Claude, ChatGPT or other plan your agents are already signed in with, on your own computer.” — https://github.com/leepokai/Codync#readme

## Puntuación

Grok Score: **76.15** · Tier **A** · ADN **74**

- **capacidad**: 78/100
- **autonomia**: 60/100
- **computadora**: 83/100
- **memoria**: 90/100
- **rutinas**: 55/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 70/100

## Fortalezas

- Agnóstico de agente: conecta 40+ agentes vía ACP (Claude Code, Codex, Gemini CLI, Cursor, Copilot) y aprovecha las suscripciones que el usuario ya paga.
- Canal real desde el iPhone (App Store) y escritorio multiplataforma más terminal, con el entorno, los archivos y las credenciales viviendo en tu propia máquina.
- Rust, Apache-2.0, gratuito y autoalojado, con distribución amplia (DMG, EXE, AppImage, Homebrew) y cadencia altísima de releases: 54 en 90 días.

## Lo que le falta / riesgos

- Sin runtime persistente en la nube: si el ordenador está apagado o el portátil cerrado, los bots no trabajan, así que no hay trabajo desatendido de verdad.
- No se evidencian rutinas programadas ni por evento, política de aprobaciones propia ni memoria acumulada por bot: le faltan pilares del listón Grok Bot.
- Proyecto joven (unos 8 meses) con adopción modesta (2,052 estrellas) y 83 issues abiertos; la frecuencia extrema de releases sugiere churn y la cobertura de tests no es visible en el expediente.

## Comparación con el listón

Se acerca al concepto de Grok Bot desde el código abierto y el self-hosting, pero al depender de tu ordenador y carecer de rutinas, aprobaciones y computadora en la nube queda por debajo de agentes de referencia como hermes-agent y muy lejos de la adopción de rea, AutoGPT o n8n.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/leepokai/Codync) · consultado 2026-11-12
- [Web oficial](https://www.codync.dev) · consultado 2026-11-12
- [README](https://github.com/leepokai/Codync#readme) · consultado 2026-11-12
- [Releases](https://github.com/leepokai/Codync/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

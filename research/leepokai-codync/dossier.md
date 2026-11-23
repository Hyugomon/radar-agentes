# Codync — dossier de investigación

- **Repo**: https://github.com/leepokai/Codync
- **Web oficial**: https://www.codync.dev
- **Licencia**: Apache-2.0
- **Lenguaje**: Rust
- **Estrellas**: 2427 · **Forks**: 253
- **Último push**: 2026-11-23T20:39:01Z · **Última release**: 2026-11-22
- **Revisado**: 2026-11-23 · **Confianza**: 62/100
- **Tipo**: bot · **Categoría**: teams

## Qué es

Convierte más de 40 agentes CLI (Claude Code, Codex, Gemini, Hermes, OpenCode…) en bots persistentes con memoria, rutinas, trabajo en segundo plano, aprobaciones, pantalla remota, Codync Cloud y apps nativas para macOS, Windows, Linux, iOS y Android.

> Tus agentes CLI, convertidos en bots.

## Nota de verificación

Revisión v2.49.1–v2.53.0 (2026-11-22): añade trabajo en segundo plano con event box, rutinas y webhooks, Codync Cloud desde iOS/Android/escritorio, modo Advisor, ACP elicitation y app en Google Play. Rutinas y Desatendido pasan a ON (ADN 100).

## Release revisada

- **Tag**: [v2.53.0](https://github.com/leepokai/Codync/releases/tag/v2.53.0)
- **Fecha**: 2026-11-22 (hace 1 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v2.53.0 (y v2.49–v2.52): Codync Cloud, rutinas con event box y watchdog, modo Advisor, subagentes en transcript y app Android en Google Play.

**Impacto en la ficha**: Sube a Tier S (+7.45, ADN 74→100): Rutinas 55→86, Autonomía 60→78, Computadora 83→86 y Producto 70→76; Rutinas y Desatendido pasan a ON.

> Release 2.53.0 (main is at 2.52.0). Also carries 2.52.1, which never reached main . Subagents in the transcript : when a Claude Code bot uses subagents, each subagent's steps now sit indented under the step that started it, in the unfolded working steps, Full conversation and a task's thread, on desktop, iPhone, Android and the terminal UI. That step shows the subagent's type, the tokens it used and how long it took, or that it runs in the background. Android : opening a long chat for the first time lands on its newest message instead of earlier ones. Bots messaging bots : a queued message_bot request now always reaches its recipient or tells its sender why it ended, including after a host r

## Evidencia de la investigación

### ✅ Identidad
  - “Persistent named bots, group chats, quote replies, bots asking each other for help, approval cards, per-bot memory, remote screen, voice calls and 'needs you / done' notifications.” — https://github.com/leepokai/Codync#readme

### ✅ Computadora propia
  - “Remote screen. See and control your computer from the iPhone over WebRTC, and let bots use the screen themselves through the built-in computer tool.” — https://github.com/leepokai/Codync#readme

### ✅ Memoria
  - “Persistent named bots, group chats, quote replies, bots asking each other for help, approval cards, per-bot memory, remote screen, voice calls.” — https://github.com/leepokai/Codync#readme

### ✅ Rutinas
  - “Background work and the event box : a bot hands long work to background agents and keeps answering... Routines and other bots' requests run there too, background work can ask for approval or a choice and send files in the chat, and an hourly look picks up work no event reported.” — https://github.com/leepokai/Codync/releases/tag/v2.49.1

### ✅ Apps reales
  - “Remote screen. See and control your computer from the iPhone over WebRTC, and let bots use the screen themselves through the built-in computer tool.” — https://github.com/leepokai/Codync#readme

### ✅ Coordinación
  - “Many bots, one team. Run as many bots as you like side by side, each with its own agent, project folder and approvals... Put several in a group chat and they answer in turn.” — https://github.com/leepokai/Codync#readme

### ✅ Aprobaciones
  - “The chat only shows what matters: your messages, each turn's final reply, approval cards and notices.” — https://github.com/leepokai/Codync#readme

### ✅ Desatendido
  - “Codync Cloud : first-time setup on the iPhone and Android apps can start a cloud computer instead of installing Codync on one of yours, then waits until it's ready and opens your bots.” — https://github.com/leepokai/Codync/releases/tag/v2.51.0

## Puntuación

Grok Score: **83.6** · Tier **S** · ADN **100**

- **capacidad**: 80/100
- **autonomia**: 78/100
- **computadora**: 86/100
- **memoria**: 90/100
- **rutinas**: 86/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 76/100

## Fortalezas

- Bots persistentes con memoria, chats grupales, delegación, modo Advisor y subagentes visibles
- Trabajo en segundo plano con event box, rutinas, webhooks y watchdog de tareas atascadas
- Codync Cloud para levantar computadoras en la nube desde iPhone, Android o escritorio, además de pantalla remota WebRTC
- App nativa en App Store y Google Play con relay E2E gratuito

## Lo que le falta / riesgos

- Sigue dependiendo de suscripciones/CLIs externos para los motores de los agentes
- Pantalla remota aún no disponible en hosts Windows
- Ecosistema todavía mediano frente a plataformas más antiguas

## Comparación con el listón

Con rutinas, trabajo en segundo plano, Codync Cloud y Android ya cubre los 8/8 pilares de Grok Bot usando tus propios agentes CLI; su madurez de producto aún es menor.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/leepokai/Codync) · consultado 2026-11-23
- [Web oficial](https://www.codync.dev) · consultado 2026-11-23
- [README](https://github.com/leepokai/Codync#readme) · consultado 2026-11-23
- [Releases](https://github.com/leepokai/Codync/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

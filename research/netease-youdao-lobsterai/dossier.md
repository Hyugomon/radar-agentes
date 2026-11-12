# LobsterAI — dossier de investigación

- **Repo**: https://github.com/netease-youdao/LobsterAI
- **Web oficial**: https://lobsterai.youdao.com
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 6179 · **Forks**: 978
- **Último push**: 2026-11-12T07:32:52Z · **Última release**: 2026-11-06
- **Revisado**: 2026-11-12 · **Confianza**: 68/100
- **Tipo**: agent · **Categoría**: general

## Qué es

Agente de escritorio open source construido sobre OpenClaw que ejecuta tareas reales en tu ordenador (archivos, navegador, documentos de Office, análisis de datos y presentaciones) y acepta órdenes desde el móvil vía WeChat, Feishu, DingTalk y Telegram. Orientado a profesionales de oficina que quieren delegar trabajo sin programar.

> Agente de escritorio sobre OpenClaw.

## Nota de verificación

Revisión previa + README: agente de escritorio construido sobre OpenClaw que ejecuta tareas reales en tu computadora. Sin evidencia de equipo o rutinas.

## Evidencia de la investigación

### ❌ Identidad
  - “Multi-instance platforms can route each bot to a different agent.” — https://github.com/netease-youdao/LobsterAI#readme
  - “| | **Library** | Every file your agents create, collected in one place across sessions, both local and shared.” — https://lobsterai.youdao.com
  - “<div align="center"> <img src="public/logo.png" alt="LobsterAI logo" width="88" /> # LobsterAI **The open-source desktop AI agent that does real work on your computer.** Describe a task in plain language.” — https://lobsterai.youdao.com

### ❌ Computadora propia
  - “<div align="center"> <img src="public/logo.png" alt="LobsterAI logo" width="88" /> # LobsterAI **The open-source desktop AI agent that does real work on your computer.** Describe a task in plain language.” — https://lobsterai.youdao.com
  - “| | **Computer use** | Let the agent operate desktop apps on Windows x64 and macOS 13 or later.” — https://lobsterai.youdao.com
  - “LobsterAI reads your files, runs tools, drives a browser,<br/> edits Office documents, and hands back finished work — at your desk or from your phone.” — https://lobsterai.youdao.com

### ❌ Memoria
  - “| | **Memory and Dreaming** | Durable memory files, plus optional scheduled "Dreaming" runs that consolidate what the agent learned, so preferences carry across sessions.” — https://lobsterai.youdao.com
  - “- The renderer is sandboxed with context isolation and talks to the main process only through the preload IPC bridge.” — https://github.com/netease-youdao/LobsterAI#readme
  - “Agent memory and runtime state live alongside it under `openclaw/`.” — https://github.com/netease-youdao/LobsterAI#readme

### ❌ Rutinas
  - “**Go further.** Install kits from **Kits · Skills · Connectors**, set up recurring work in **Scheduled Tasks**, or connect a chat app under **Settings → IM Bot**.” — https://github.com/netease-youdao/LobsterAI#readme
  - “- **It keeps working when you step away.** Schedule recurring jobs, or message your desktop agent from WeChat, Feishu, DingTalk, Telegram, and more.” — https://github.com/netease-youdao/LobsterAI#readme
  - “| | **Skills** | Built-in skills for documents, spreadsheets, slides, PDFs, web search, browser automation, image and video generation, stock research, writing, email, and more.” — https://lobsterai.youdao.com

### ✅ Apps reales
  - “| | **IM channels** | WeChat, WeCom, DingTalk, Feishu/Lark, QQ, NetEase IM, NetEase Bee, POPO, Telegram, Discord, and email.” — https://lobsterai.youdao.com
  - “- **It keeps working when you step away.** Schedule recurring jobs, or message your desktop agent from WeChat, Feishu, DingTalk, Telegram, and more.” — https://github.com/netease-youdao/LobsterAI#readme
  - “| | **Computer use** | Let the agent operate desktop apps on Windows x64 and macOS 13 or later.” — https://lobsterai.youdao.com

### ❌ Coordinación
  - Sin evidencia directa en el README/web revisada.

### ❌ Aprobaciones
  - “**Give it a task.** Pick a working folder, describe what you want, and approve actions as it works.” — https://github.com/netease-youdao/LobsterAI#readme
  - “It owns sessions, messages, permissions, artifacts, agents, and IM bindings, and stores them locally in SQLite.” — https://github.com/netease-youdao/LobsterAI#readme
  - “- File operations, shell commands, and network access are permission-gated, and the agent asks before it acts.” — https://github.com/netease-youdao/LobsterAI#readme

### ❌ Desatendido
  - Sin evidencia directa en el README/web revisada.

## Puntuación

Grok Score: **62.1** · Tier **B** · ADN **14**

- **capacidad**: 76/100
- **autonomia**: 74/100
- **computadora**: 55/100
- **memoria**: 60/100
- **rutinas**: 55/100
- **equipo**: 55/100
- **confianza**: 55/100
- **producto**: 59/100

## Fortalezas

- Opera el escritorio real (archivos, navegador, Office) y devuelve entregables, no solo chat
- Control remoto desde apps de mensajería, lo que permite delegar desde el móvil
- Respaldo corporativo de NetEase Youdao, licencia MIT y releases activos

## Lo que le falta / riesgos

- Depende de OpenClaw y de una app Electron pesada; no tiene computadora en la nube ni sesiones propias
- No se evidencian rutinas aprendidas, subagentes ni aprobaciones antes de acciones irreversibles
- Nueve meses de vida y poca documentación pública sobre tests y casos empresariales

## Comparación con el listón

Está un escalón por debajo de Grok Bot: hace trabajo real en el escritorio y se controla desde el móvil, pero carece de computadora persistente en la nube, rutinas y aprobaciones explícitas.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/netease-youdao/LobsterAI) · consultado 2026-11-12
- [Web oficial](https://lobsterai.youdao.com) · consultado 2026-11-12
- [README](https://github.com/netease-youdao/LobsterAI#readme) · consultado 2026-11-12
- [Releases](https://github.com/netease-youdao/LobsterAI/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

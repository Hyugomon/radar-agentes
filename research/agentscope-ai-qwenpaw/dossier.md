# QwenPaw — dossier de investigación

- **Repo**: https://github.com/agentscope-ai/QwenPaw
- **Web oficial**: http://qwenpaw.agentscope.io/
- **Licencia**: Apache-2.0
- **Lenguaje**: Python
- **Estrellas**: 38131 · **Forks**: 3306
- **Último push**: 2026-11-23T05:02:56Z · **Última release**: 2026-11-23
- **Revisado**: 2026-11-23 · **Confianza**: 70/100
- **Tipo**: assistant · **Categoría**: teams

## Qué es

Asistente open source de AgentScope (local o en la nube) con memoria en tres capas (ReMe), browser-use y computer-use, tareas programadas (cron), subagentes y protocolo ACP, modelos locales Piccolo para revisión de herramientas y conexión a Telegram, Discord, DingTalk, Lark, WeChat y QQ.

> Asistente personal open source.

## Nota de verificación

Revisión v2.3.0–v2.3.1-beta.1 y README actual: memoria de 3 capas (ReMe), cron/scheduling, browser-use y computer-use, multi-agente/ACP, servicio en segundo plano y aprobaciones de seguridad en shell más modelos Piccolo de revisión. Pasa a 8/8 pilares.

## Release revisada

- **Tag**: [v2.3.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.1-beta.1)
- **Fecha**: 2026-11-23 (hace 0 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v2.3.1-beta.1 (y v2.3.0/post1): aprobación obligatoria para envíos de correo/HTTP/uploads en shell, seguimiento de cron, plugins de terceros y modelos locales Piccolo.

**Impacto en la ficha**: Sube a Tier A (+12.35, ADN 28→100): Memoria, Rutinas, Apps, Coordinación, Aprobaciones y Desatendido pasan a ON con evidencia verificada.

> What's Changed fix(pawapp): disable proxy buffering on chat and tool-call SSE streams by @pcbeingused333 in #8730 chore: bump the version to 2.3.1b1 by @cuiyuebing in #8809 fix(loop): record tool calls appended to one reply message by @weweeeeee in #8701 fix(security): require approval for shell-based email sends, HTTP writes, and uploads by @cuiyuebing in #8810 fix(qq): support full group messages and honor mention-only filtering by @hongxicheng in #8658 fix(dingtalk): separate Markdown tables from preceding paragraphs in AI cards by @vincy-ch in #8601 feat(xiaoyi): add optional streaming and harden channel transport by @hongxicheng in #8694 feat(channels): add QQ C2C streaming message supp

## Evidencia de la investigación

### ✅ Identidad
  - “QwenPaw stands for Qwen Personal Agent Workstation, and also embodies the wisdom of Qwen and the warmth of a Paw.” — https://github.com/agentscope-ai/QwenPaw#readme
  - “- **Information gathering**: Search the web, follow subscriptions, summarize videos, and find what you need in your personal knowledge base.” — https://github.com/agentscope-ai/QwenPaw#readme
  - “**What we collect:** - QwenPaw version (e.g., 1.1.12) - Install method (pip, Docker, or desktop app) - OS and version (e.g., macOS 14.0, Ubuntu 22.04) - Python version (e.g., 3.13) - CPU architecture (e.g., x86_64, arm64) - GPU availability (yes/no) **What we do NOT collect:** No personal data, no files, no credentials, no IP addresses, no identifiable information.” — http://qwenpaw.agentscope.io/

### ✅ Computadora propia
  - “[v2.2.0 Release Notes →](https://qwenpaw.agentscope.io/release-notes#v2.2.0) - [2026-08-13] **v2.1.0** | QwenPaw OS Shell, unified Files workspace, QwenPaw Creator, Codex/Qoder Agent integration, Browser-use, Computer-use, workspace checkpoints, and long-running conversation continuity.” — http://qwenpaw.agentscope.io/
  - “- **Remove quarantine attribute (not recommended for most users)** In Terminal run: `xattr -cr "/Applications/QwenPaw Desktop.app"` (or use the path to the `.app` after unzipping).” — http://qwenpaw.agentscope.io/
  - “| | **Security built in** | Kernel-level Sandbox, Tool Guard, File Guard, Skill Scanner, and Access Policy.” — http://qwenpaw.agentscope.io/

### ✅ Memoria
  - “Conversations and resources continuously become readable, editable, searchable, and linked Markdown memory.” — https://github.com/agentscope-ai/QwenPaw#readme
  - “| | **Multi-agent & parallel** | Spawn independent agents with their own memory and skills.” — http://qwenpaw.agentscope.io/
  - “- **Information gathering**: Search the web, follow subscriptions, summarize videos, and find what you need in your personal knowledge base.” — https://github.com/agentscope-ai/QwenPaw#readme
  - “Three-layer memory — live working context, full verbatim history, and a self-evolving personal knowledge base powered by ReMe.” — https://github.com/agentscope-ai/QwenPaw#readme

### ✅ Rutinas
  - “| <details> <summary><b>What you can do with QwenPaw</b></summary> <br> - **Automation & scheduling**: Set up recurring tasks — news digests, report generation, multi-channel broadcasting — all on your schedule.” — http://qwenpaw.agentscope.io/
  - “- **Custom workflows**: Combine built-in capabilities, plugins, and scheduled tasks into workflows tailored to your needs.” — https://github.com/agentscope-ai/QwenPaw#readme
  - “Automation & scheduling: Set up recurring tasks — news digests, report generation, multi-channel broadcasting — all on your schedule.” — https://github.com/agentscope-ai/QwenPaw#readme

### ✅ Apps reales
  - “| | **Reachable anywhere** | DingTalk, Lark, WeChat, Discord, Telegram, iMessage, QQ — one instance, all channels.” — http://qwenpaw.agentscope.io/
  - “- **Multi-channel ops**: Push alerts, summaries, or AI-generated content to DingTalk, Lark, Discord, Telegram, and more — simultaneously or per channel.” — https://github.com/agentscope-ai/QwenPaw#readme
  - “| | **Extensible** | Skills for scheduling, documents, browser, news, and more.” — http://qwenpaw.agentscope.io/
  - “v2.1.0 | QwenPaw OS Shell, unified Files workspace, QwenPaw Creator, Codex/Qoder Agent integration, Browser-use, Computer-use” — https://github.com/agentscope-ai/QwenPaw#readme

### ✅ Coordinación
  - “| | **Multi-agent & parallel** | Spawn independent agents with their own memory and skills.” — http://qwenpaw.agentscope.io/
  - “Multi-agent & parallel: Spawn independent agents with their own memory and skills. Sub-agents at runtime. Agent Communication Protocol (ACP) for cross-system orchestration.” — https://github.com/agentscope-ai/QwenPaw#readme

### ✅ Aprobaciones
  - “# start in the current repo (Coding Mode) ``` It supports streaming replies, slash commands (`/help`, `/resume`, `/theme`, plus the agent's own `/model`, `/clear`, …), pasting files/long text as attachments, and inline tool-permission prompts.” — http://qwenpaw.agentscope.io/
  - “Configurable approval levels: STRICT / SMART / AUTO / OFF.” — https://github.com/agentscope-ai/QwenPaw#readme
  - “- **Access Policy** — Declarative access rules that allow, deny, or request human approval for each capability call, with tool-level granularity and source-aware matching.” — https://github.com/agentscope-ai/QwenPaw#readme
  - “fix(security): require approval for shell-based email sends, HTTP writes, and uploads (#8810)” — https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.1-beta.1

### ✅ Desatendido
  - “Let desktop windows share one background service, keep tasks running after closing the last window” — https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0

## Puntuación

Grok Score: **78.05** · Tier **A** · ADN **100**

- **capacidad**: 78/100
- **autonomia**: 74/100
- **computadora**: 81/100
- **memoria**: 86/100
- **rutinas**: 84/100
- **equipo**: 78/100
- **confianza**: 78/100
- **producto**: 70/100

## Fortalezas

- Despliegue local, Docker o cloud con memoria de 3 capas (ReMe), cron, browser-use y computer-use
- Subagentes independientes, protocolo ACP y modelos locales Piccolo para revisión y compactación
- Ecosistema AgentScope detrás con más de 38,131 estrellas y amplia oferta de canales y plugins

## Lo que le falta / riesgos

- La app de escritorio Tauri sigue en fase Beta con optimizaciones pendientes
- Ecosistema muy cargado de canales asiáticos; la configuración inicial y el alcance de plugins son densos
- Gobernanza multi-agente y estabilidad de despliegues complejos aún requieren validación práctica

## Comparación con el listón

Asistente personal con gran tracción y ecosistema, pero en la liga de los copilotos con herramientas, no de los agentes que trabajan solos en tu computadora.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/agentscope-ai/QwenPaw) · consultado 2026-11-23
- [Web oficial](http://qwenpaw.agentscope.io/) · consultado 2026-11-23
- [README](https://github.com/agentscope-ai/QwenPaw#readme) · consultado 2026-11-23
- [Releases](https://github.com/agentscope-ai/QwenPaw/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

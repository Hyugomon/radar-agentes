# opencrabs — dossier de investigación

- **Repo**: https://github.com/opencrabs/opencrabs
- **Web oficial**: https://opencrabs.com
- **Licencia**: MIT
- **Lenguaje**: Rust
- **Estrellas**: 1029 · **Forks**: 108
- **Último push**: 2026-11-12T03:59:17Z · **Última release**: 2026-10-27
- **Revisado**: 2026-11-12 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: general

## Qué es

Agente autónomo de autoalojamiento escrito en Rust que, en un único binario con TUI, CLI y daemon, construye apps y backends, gestiona archivos, investiga y programa tareas, y se conecta a canales de chat como Discord o Telegram. Está pensado para usuarios técnicos que quieren un agente personal persistente sin telemetría ni dependencia de un proveedor.

> Un agente autónomo en un solo binario.

## Nota de verificación

Revisión previa + README: identidad, runtime persistente, rutinas y trabajo desatendido en Rust. Sin evidencia de apps GUI, memoria acumulada ni coordinación de equipo.

## Evidencia de la investigación

### ✅ Identidad
  - “Instead of a hardcoded system prompt, the agent assembles its personality, knowledge, and behavior from workspace files that can be edited between turns.” — https://github.com/opencrabs/opencrabs#readme
  - “After migrating, customize the new profile's `SOUL.md`, `USER.md`, and `config.toml` to give it a different personality and provider setup.” — https://github.com/opencrabs/opencrabs#readme
  - “If it has config files and brain/personality files, OpenCrabs can figure out the mapping.” — https://github.com/opencrabs/opencrabs#readme

### ✅ Computadora propia
  - “- **TUI** — to have the terminal UI open automatically on login, that's a terminal / desktop autostart, *not* the service installer: - **Linux desktop:** drop a `.desktop` file in `~/.config/autostart/` with `Exec=x-terminal-emulator -e opencrabs`.” — https://opencrabs.com
  - “The Linux archive carries `opencrabs.desktop` and `opencrabs.png` for the same reason, so your application menu has an entry with the real icon instead of a nameless terminal.” — https://github.com/opencrabs/opencrabs#readme
  - “Your terminal app needs filesystem access or the OS will block operations.” — https://github.com/opencrabs/opencrabs#readme

### ❌ Memoria
  - “Each session remembers its provider + model and restores it on switch | | **Fallback Providers** | Configure a chain of fallback providers — if the primary fails, each fallback is tried in sequence automatically.” — https://opencrabs.com
  - “**Per-session provider:** Each session remembers which provider and model it was using.” — https://github.com/opencrabs/opencrabs#readme
  - “This way OpenCrabs starts on boot, shuts down cleanly with the system, channels stay connected, and cron jobs keep ticking without you having to remember to start or stop it.” — https://github.com/opencrabs/opencrabs#readme

### ✅ Rutinas
  - “Use only when you genuinely cannot proceed without picking from a short list | | `cron_manage` | Schedule recurring jobs — create, list, enable/disable, delete.” — https://opencrabs.com
  - “### Cron Jobs — Scheduled Isolated Sessions Cron jobs run as isolated sessions in the background.” — https://opencrabs.com
  - “RSI scheduled as a cron job runs on the provider/model stored in the cron row itself (the `cron_manage` provider/model overrides), and `self_improvement_provider`/`self_improvement_model` are dormant there: changing them has no effect on cron-driven cycles.” — https://github.com/opencrabs/opencrabs#readme

### ❌ Apps reales
  - “#### Bot owner and owner-only commands Every channel has a `bot_owner` field (`[channels.telegram]`, `[channels.discord]`, `[channels.slack]`, `[channels.whatsapp]`, `[channels.trello]`).” — https://opencrabs.com
  - “**Deny-by-default access model (all channels):** if neither `allowed_users` (nor `allowed_phones`/`allowed_roles`) nor `bot_owner` is configured, the bot refuses all interactions — unconfigured installs are locked down by default on Telegram, Discord, Slack, and WhatsApp alike.” — https://github.com/opencrabs/opencrabs#readme
  - “Works in the TUI **and** every connected channel (Telegram, Discord, Slack, WhatsApp).” — https://github.com/opencrabs/opencrabs#readme

### ❌ Coordinación
  - “Includes multi-agent debate (Bee Colony) with confidence-weighted consensus.” — https://github.com/opencrabs/opencrabs#readme
  - “#### Multi-Agent Orchestration OpenCrabs supports spawning specialized sub-agents that run autonomously in isolated sessions.” — https://opencrabs.com
  - “Auto-detects VPS environments and disables local embeddings | | **Dynamic Brain System** | System brain assembled from workspace MD files (SOUL, USER, AGENTS, TOOLS, MEMORY) — all editable live between turns | | **Multi-Agent Orchestration** | Spawn typed child agents (General, Explore, Plan, Code, Research) for parallel task execution.” — https://opencrabs.com

### ❌ Aprobaciones
  - “Already unattended under the default `approval_policy`; `--auto-approve` / `--yolo` only when the policy is `ask`.” — https://github.com/opencrabs/opencrabs#readme
  - “| | **Owner-gated approvals** | Tool-approval and YOLO buttons re-check that the tapper is the owner on every channel, so a group member cannot approve a pending tool or flip the instance to unattended mode.” — https://opencrabs.com
  - “max_concurrent = 4 # tools per turn that may run in parallel (auto-approved batches only; 1 = fully sequential) plan_require_approval = true # true (default): a plan stays Editing until a human approves it (plan-card # button, /execute, reaction consent) or the agent approves under a # user-granted in-session autonomy.” — https://opencrabs.com

### ✅ Desatendido
  - “A background instance holding the profile is shut down on start, exactly as the terminal already preempts the daemon, and the transcript names the process it took over.” — https://github.com/opencrabs/opencrabs#readme
  - “Two tiers: - **65% — soft trigger:** spawns a background LLM compaction that summarizes history back down to ~65% of the budget.” — https://opencrabs.com
  - “Every widget resolves its colours through the theme engine, with no raw ANSI remaining (a suite-level guard fails on any new raw site), and themes can declare an optional canvas background (#1634).” — https://github.com/opencrabs/opencrabs#readme

## Puntuación

Grok Score: **68.3** · Tier **B** · ADN **54**

- **capacidad**: 72/100
- **autonomia**: 74/100
- **computadora**: 77/100
- **memoria**: 60/100
- **rutinas**: 90/100
- **equipo**: 55/100
- **confianza**: 55/100
- **producto**: 59/100

## Fortalezas

- Binario único en Rust con TUI, CLI y daemon: despliegue ligero, sin Electron ni capas pesadas, y telemetría cero
- Cobertura funcional amplia para autoalojamiento: shell, edición de archivos, desarrollo de apps, research profundo, planificador y canales de mensajería en un solo producto
- Daemon persistente con tareas programadas y lazo de 'self-healing' declarado, lo que da continuidad entre sesiones en tu propia máquina
- Ritmo de desarrollo muy alto y sano para su edad: 17 releases en 90 días, CI, Docker y licencia MIT con comunidad pequeña pero activa
- Posición honesta y diferenciada en 2026: agente open source, community-funded, para quien no quiere entregar su entorno a un SaaS

## Lo que le falta / riesgos

- Las promesas de 'self-improving', 'recursive self-improvement' y 'self-healing' no se sostienen con evidencia en el expediente y suenan a marketing
- No tiene la pieza clave del listón: computadora persistente en la nube ni computer-use que inicie sesión en tus apps reales; opera sobre el entorno local donde lo despliegues
- Proyecto joven y de un solo autor: v0.5.x pre-1.0, 90 issues abiertos para 1,029 estrellas y sin ecosistema de plugins ni integraciones verificadas
- No consta un sistema de aprobaciones antes de acciones irreversibles ni sandbox fuerte, justo lo que exige un agente 'fully autonomous' en producción
- Etiquetado ambiguo (harness, orchestration-framework, agentic-framework) que confunde su propuesta frente a frameworks reales y complica la comparación

## Comparación con el listón

Está por debajo de los referentes tipo Grok Bot (sin computadora persistente en la nube ni operación de apps reales) y de harnesses maduros como deepseek-harness, pero supera a los frameworks ligeros en producto terminado: es un agente autónomo self-hosted prometedor y aún pre-1.0.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/opencrabs/opencrabs) · consultado 2026-11-12
- [Web oficial](https://opencrabs.com) · consultado 2026-11-12
- [README](https://github.com/opencrabs/opencrabs#readme) · consultado 2026-11-12
- [Releases](https://github.com/opencrabs/opencrabs/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

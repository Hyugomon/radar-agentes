# starnet — dossier de investigación

- **Repo**: https://github.com/androoAGI/starnet
- **Web oficial**: https://github.com/androoAGI/starnet-releases/releases/latest
- **Licencia**: MIT
- **Lenguaje**: JavaScript
- **Estrellas**: 1921 · **Forks**: 393
- **Último push**: 2026-11-19T22:09:17Z · **Última release**: 2026-11-20
- **Revisado**: 2026-11-23 · **Confianza**: 72/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

StarNet es una app de escritorio local-first donde creas una tripulación de agentes de IA con clases, roles, memoria y permisos propios, y la ves trabajar de verdad con modelos y herramientas reales dentro de una estación pixel-art. Está pensada para usuarios técnicos que quieren un equipo multiagente en su propia máquina con su clave (BYOK).

> Una tripulación de agentes en tu escritorio.

## Nota de verificación

Revisión v0.15.3–v0.15.4 y README actual: documenta cron schedules/rutinas, tarjetas de aprobación (GUI y CLI starnet approve/deny), canales Telegram/Discord/Slack/Signal/Matrix y endurecimiento de permisos Full Access.

## Release revisada

- **Tag**: [v0.15.4](https://github.com/androoAGI/starnet/releases/tag/v0.15.4)
- **Fecha**: 2026-11-20 (hace 3 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.15.4 (y v0.15.3): nuevo dashboard, endurecimiento de permisos con confirmación para accesos permanentes y rutinas más limpias en el listado de sesiones.

**Impacto en la ficha**: Sube a 77.45 A (+6.45, ADN 60→86): Rutinas 55→82 y Confianza 55→82; ambos pilares pasan a ON.

> Download Platform Installer Windows (x64) StarNet_0.15.4_x64-setup.exe macOS (Apple Silicon) StarNet_0.15.4_aarch64.dmg macOS (Intel) StarNet_0.15.4_x64.dmg These downloads are mirrored byte-for-byte from the validated StarNet distribution release. Already running StarNet? Update from inside the app; your crew, sessions, keys, and station remain in place. StarNet v0.15.4 Full Power no longer asks. In 0.15.3 an agent on Full Access asked before every command once its chat had read a web page, an email or a connector result, and the update itself switched Full Access off for every agent. This release takes both back. It also fixes a context meter that could lock a model out of new chats. Befor

## Evidencia de la investigación

### ✅ Identidad
  - “## Features | | | | --- | --- | | **A crew, not a chatbot** | Create agents with distinct classes, personas, and loadouts.” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “StarNet can import an existing agent: point it at your on-disk OpenClaw or Hermes home and it mints a StarNet agent from the persona, instructions, memory, and model it finds.” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “The layout you draw *is* the workflow the agents run.” — https://github.com/androoAGI/starnet#readme

### ✅ Computadora propia
  - “For desktop development: ```bash npm ci npm run desktop:dev # dev shell npm run desktop:build # build installers locally ``` ## Terminal mode The desktop app ships a `starnet` command beside it.” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “Its core product law is that **the interface must never assert state the harness cannot prove.** ## Download Desktop builds are published on the [StarNet releases page](https://github.com/androoAGI/starnet-releases/releases/latest).” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “> **Early release:** Windows is the most-tested desktop target.” — https://github.com/androoAGI/starnet#readme

### ✅ Memoria
  - “Honest caveat: local models are smaller than the cloud ones, so expect slower and rougher work on long tasks, and a task needs a large context window — an 8B model takes about 10 GB of graphics memory while it works.” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “Run several at once — each gets its own workspace, transcript, memory, and bounded permissions.” — https://github.com/androoAGI/starnet#readme
  - “| | **MCP connectors** | Attach Model Context Protocol servers and paste-a-key/OAuth connectors to extend what agents can touch.” — https://github.com/androoAGI/starnet-releases/releases/latest

### ✅ Rutinas
  - “| | **Recipes, skills, schedules** | Launch proven multi-step recipes, grant reusable skills, and put work on cron schedules with visible output.” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “When the last `starnet` session ends it closes again, unless routines are armed or StarNet is set to stay in the tray (the same as closing its window).” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “- Agent memory, transcripts, spend records, tasks, and schedules persist on disk.” — https://github.com/androoAGI/starnet#readme
  - “Recipes, skills, schedules: Launch proven multi-step recipes, grant reusable skills, and put work on cron schedules with visible output.” — https://github.com/androoAGI/starnet#readme

### ❌ Apps reales
  - “| | **Message it from anywhere** | Wire agents to Telegram, Discord, Slack, Signal, or Matrix and talk to your station away from the desk.” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “| | **MCP connectors** | Attach Model Context Protocol servers and paste-a-key/OAuth connectors to extend what agents can touch.” — https://github.com/androoAGI/starnet-releases/releases/latest

### ✅ Coordinación
  - “The station is not decoration — it is a projection of live runtime state, and the product contract is literal: **A room is a capability-scoped team**, **a hallway is** an authorized handoff lane, and **a placed object is a real capability grant**.” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “## Features | | | | --- | --- | | **A crew, not a chatbot** | Create agents with distinct classes, personas, and loadouts.” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “Run it with no arguments and it opens a live dashboard on the station the app is running: the crew down the left (a spinner on whoever is working), the chosen agent's conversation beside it, and every approval as a card you answer with `y` or `n` (`v` shows the full request first).” — https://github.com/androoAGI/starnet-releases/releases/latest

### ✅ Aprobaciones
  - “Start with one agent, then place bays or summon specialists to run **more, concurrently** — each a **genuinely distinct, bounded agent run** with its own workspace and permissions.” — https://github.com/androoAGI/starnet-releases/releases/latest
  - “Run several at once — each gets its own workspace, transcript, memory, and bounded permissions.” — https://github.com/androoAGI/starnet#readme
  - “- Multiple agents run concurrently with separate workspaces and bounded permissions.” — https://github.com/androoAGI/starnet#readme
  - “the chosen agent's conversation beside it, and every approval as a card you answer with y or n ... starnet approve / starnet deny” — https://github.com/androoAGI/starnet#readme

### ✅ Desatendido
  - “With it closed, `starnet` starts it in the background: the same station with your keys (they stay in the app's keychain), and no window opens; the tray icon shows it's running.” — https://github.com/androoAGI/starnet-releases/releases/latest

## Puntuación

Grok Score: **77.45** · Tier **A** · ADN **86**

- **capacidad**: 74/100
- **autonomia**: 70/100
- **computadora**: 79/100
- **memoria**: 90/100
- **rutinas**: 82/100
- **equipo**: 90/100
- **confianza**: 82/100
- **producto**: 64/100

## Fortalezas

- Equipo multiagente real, no un chatbot disfrazado: cada agente tiene workspace, transcript, memoria y permisos acotados, y pueden correr varios en paralelo con handoffs autorizados.
- Night Shift y canales remotos (Telegram, Discord, Slack, Signal, Matrix) permiten dejar a la tripulación trabajando y dirigirla fuera del escritorio.
- Idea de producto genuina: el layout espacial es el contrato de ejecución (sala = equipo con capacidades, pasillo = carril de handoff, objeto = concesión de capacidad), con la UI proyectando estado vivo del runtime.
- Local-first y BYOK con claves en el keychain del SO, plus cadencia de releases muy alta (26 en 90 días) y push diario.

## Lo que le falta / riesgos

- Es local-first de escritorio: no hay computadora persistente en la nube ni trabajo con la máquina apagada, así que no cumple el pilar de runtime persistente tipo Grok Bot.
- No hay evidencia de que opere apps reales por navegador o GUI sin API; sus herramientas parecen acotadas al workspace y a integraciones.
- Aún carece de máquina persistente en la nube: las rutinas dependen del equipo encendido o en segundo plano
- Proyecto joven (v0.x, ~5 meses, 67 issues abiertos) sin evidencia de tests, benchmarks ni casos de producción; ecosistema de plugins todavía incipiente.

## Comparación con el listón

Es un pariente indie y local-first del equipo de bots de Grok Bot: comparte la ambición de tripulación persistente y desatendida, pero sin computadora en la nube ni operación de apps reales, y va por detrás de harnesses multiagente ya consolidados como DeepSeek Harness o hermes-agent en ecosistema y madurez.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/androoAGI/starnet) · consultado 2026-11-23
- [Web oficial](https://github.com/androoAGI/starnet-releases/releases/latest) · consultado 2026-11-23
- [README](https://github.com/androoAGI/starnet#readme) · consultado 2026-11-23
- [Releases](https://github.com/androoAGI/starnet/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

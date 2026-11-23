# OpenExecutive — dossier de investigación

- **Repo**: https://github.com/ForeactLabs/OpenExecutive
- **Web oficial**: https://openexecutive.ai
- **Licencia**: Apache-2.0
- **Tipo de licencia**: Open source · **Uso / Precio**: Gratis
- **Lenguaje**: Python
- **Estrellas**: 5834 · **Forks**: 634
- **Último push**: 2026-11-22T21:54:20Z · **Última release**: 2026-11-18
- **Revisado**: 2026-11-23 · **Confianza**: 76/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Equipo ejecutivo open source (ahora bajo ForeactLabs) con una voz unificada, memoria episódica en SQLite, scheduler integrado, aprobaciones por montos/reglas, extensión de Chrome para operar webs e integraciones con Slack, Google Chat, Email, Google Workspace, Microsoft 365 y MCP.

> Un equipo ejecutivo de agentes.

## Nota de verificación

Revisión v0.7.4–v0.7.7 y README actual (ForeactLabs/OpenExecutive): documenta memoria episódica en SQLite, scheduler propio con página Schedule, control de navegador Chrome por extensión, canales corporativos y workflows en segundo plano. Computadora propia sigue en falso (usa el Chrome del usuario, no una VM/terminal propia).

## Release revisada

- **Tag**: [v0.7.7](https://github.com/ForeactLabs/OpenExecutive/releases/tag/v0.7.7)
- **Fecha**: 2026-11-18 (hace 5 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.7.7 (y v0.7.4–v0.7.6): navegador del usuario desde extensión Chrome, aprobación directa en chat/Slack/Google Chat con "Or tell me", página Schedule y workflows en segundo plano.

**Impacto en la ficha**: Sube a 78.40 A (+7.35, ADN 32→82): Memoria, Rutinas, Apps reales y Desatendido pasan a ON con evidencia del README y releases v0.7.5–v0.7.7.

> 0.7.7 (2026-11-18) Added alerts: give every card options and one "Or tell me" box ( #921 ) ( 0d42d34 ) alerts: give held step and email reply cards options and Or tell me ( #924 ) ( 2706d2f ) alerts: make held cards say who they wait on and why, and let Google Doc appends run ( #930 ) ( ad93df0 ) chat: approve a held step right in the chat and carry on ( #932 ) ( 253e63e ) delegation: join a follow-up email to its card and show its work as it runs ( #908 ) ( 2015b5c ) delegation: keep one version of a reply card's words and put the talk under Send ( #935 ) ( b89463b ) delegation: let a reply card send from the Executive, with you on cc ( #918 ) ( 9386eb9 ) integrations: give chat app cards t

## Evidencia de la investigación

### ✅ Identidad
  - “**Prompt caching** — The system prompt is structured so the Executive persona, company profile, and knowledge index are cached separately (up to 85% cache hit rate after the first few turns).” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Invite the bot with `bot` + `applications.commands` scopes 4.” — https://openexecutive.ai
  - “Five scoring dimensions (persona coherence, domain accuracy, company context utilization, routing quality, actionability) are each rated 1–5.” — https://github.com/SenteLabsAI/OpenExecutive#readme

### ❌ Computadora propia
  - “# Start everything make dev ``` **Trying it on your own computer needs no sign-in setup.** While `AUTH_GOOGLE_ID` and `AUTH_OIDC_ISSUER` are blank, `make dev` uses local login: the web app only accepts connections from this computer, you click **Open**, and you are the owner.” — https://openexecutive.ai
  - “Note that > `make stop` uses `lsof` and has no Windows equivalent; stop the two dev > servers from their own terminals instead.” — https://openexecutive.ai
  - “**For contributors not using `make`:** ```bash cd packages/core uv sync uv run uvicorn openexecutive.api.main:app --reload --port 8000 # In a second terminal cd packages/ui npm install npm run dev ``` `uv run` executes inside the project's virtualenv without activating it, so these commands are the same on macOS, Linux and Windows.” — https://openexecutive.ai

### ✅ Memoria
  - “The next session opens with a `<past_decisions>` block so the Executive remembers what it recommended last month.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Then it makes the person's own changes inside Open Executive (alerts, open loops, follow-ups, the watch list, goals, decision outcomes, remembered facts and the company profile), each under the same permissions as in the web app.” — https://openexecutive.ai
  - “Out of the box it supports spend approval thresholds, integration with corporate knowledge systems, and defined governance for how it interacts with human colleagues and other AI systems.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Episodic memory — After every response, a background claude-haiku-5-5 pass extracts key decisions, initiatives, and advice into SQLite.” — https://github.com/ForeactLabs/OpenExecutive#readme

### ✅ Rutinas
  - “Beyond Q&A, the system maintains episodic memory of past decisions and initiatives across sessions, and a built-in scheduler can proactively surface follow-ups and time-sensitive actions.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “**Scheduler** — A built-in job runner claims due actions via `UPDATE … RETURNING` to prevent double-firing.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “The API must run as a single instance; do not horizontally scale it without gating the scheduler first.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Scheduler — A built-in job runner claims due actions via UPDATE … RETURNING to prevent double-firing.” — https://github.com/ForeactLabs/OpenExecutive#readme

### ✅ Apps reales
  - “It meets people where they already work, with integrations for Slack, Discord, Telegram, Google Chat, email, Google Workspace, Microsoft 365 (Outlook mail and calendar, OneDrive), Notion, Confluence and any MCP-compatible AI tool, with more on the roadmap.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Google Workspace Microsoft 365 Slack Microsoft Teams Google Chat Discord Telegram Confluence Use it from your AI apps Ask your Executive from Claude, ChatGPT and other apps that support MCP.” — https://openexecutive.ai
  - “The Executive then keeps private, dated notes of what they said, in chat where it can confirm it's them (the web app signed in, their own Slack or Discord, Telegram with a webhook secret) and in Act as me replies they send.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “With the Open Executive extension in Chrome, it looks at the page you're on, clicks, types, fills in forms and opens pages until the job is done.” — https://github.com/ForeactLabs/OpenExecutive#readme

### ✅ Coordinación
  - “Multi-agent routing leans heavily on tool use, so pick a model that's strong at it (e.g.” — https://openexecutive.ai
  - “To invite your team, or to run it on a server or with `make docker`, set up Google or SSO sign-in by filling in the `AUTH_*` block (see [docs/auth.md](docs/auth.md) for the Google Cloud Console and SSO steps).” — https://openexecutive.ai
  - “Needs you: approve the $4,200 vendor invoice from Northwind Over the $2,000 limit you set for Operations Approve Ask why Works where your team already works Autonomy You choose how much it does on its own Two ways it works.” — https://openexecutive.ai

### ✅ Aprobaciones
  - “While a domain is being reviewed its content is withheld from the Executive, so the UI confirms the count before it starts.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Out of the box it supports spend approval thresholds, integration with corporate knowledge systems, and defined governance for how it interacts with human colleagues and other AI systems.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “The Executive then keeps private, dated notes of what they said, in chat where it can confirm it's them (the web app signed in, their own Slack or Discord, Telegram with a webhook secret) and in Act as me replies they send.” — https://github.com/SenteLabsAI/OpenExecutive#readme

### ✅ Desatendido
  - “**Episodic memory** — After every response, a background `claude-haiku-5-5` pass extracts key decisions, initiatives, and advice into SQLite.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “workflows: run background passes in one loop with no step count (#923)” — https://github.com/ForeactLabs/OpenExecutive/releases/tag/v0.7.7

## Puntuación

Grok Score: **78.4** · Tier **A** · ADN **82**

- **capacidad**: 82/100
- **autonomia**: 78/100
- **computadora**: 62/100
- **memoria**: 84/100
- **rutinas**: 82/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 70/100

## Fortalezas

- Ocho agentes especialistas coordinados bajo una única persona ejecutiva, con roles y gobernanza definidos
- Integraciones amplias con suites corporativas y herramientas MCP, poco habituales en proyectos abiertos
- Modo 'Act as me' con revisión humana y umbrales de gasto antes de acciones sensibles

## Lo que le falta / riesgos

- Arquitectura FastAPI + Next.js pesada para el trabajo que realiza, con sobrecoste de orquestación
- Depende de la extensión Chrome abierta en el navegador de la persona; no tiene máquina/VM propia
- Proyecto de pocos meses, sin despliegues empresariales públicos que validen la gobernanza

## Comparación con el listón

Se posiciona frente a asistentes ejecutivos como Lindy o agentes multi-rol tipo CrewAI montados a mano, pero le falta la computadora persistente y la autonomía de Grok Bot.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/ForeactLabs/OpenExecutive) · consultado 2026-11-23
- [Web oficial](https://openexecutive.ai) · consultado 2026-11-23
- [README](https://github.com/ForeactLabs/OpenExecutive#readme) · consultado 2026-11-23
- [Releases](https://github.com/ForeactLabs/OpenExecutive/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

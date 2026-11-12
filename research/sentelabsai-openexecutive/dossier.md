# OpenExecutive — dossier de investigación

- **Repo**: https://github.com/SenteLabsAI/OpenExecutive
- **Web oficial**: https://openexecutive.ai
- **Licencia**: Apache-2.0
- **Lenguaje**: Python
- **Estrellas**: 5796 · **Forks**: 629
- **Último push**: 2026-11-12T03:57:33Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-12 · **Confianza**: 76/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Equipo ejecutivo virtual de código abierto: una persona coherente respaldada por ocho agentes especialistas, con umbrales de aprobación de gasto, RAG corporativo y conectores con Slack, Telegram, Google, Microsoft 365, Notion y MCP. Apunta a mandos y organizaciones que quieren delegar tareas de gestión.

> Un equipo ejecutivo de agentes.

## Nota de verificación

Revisión previa + README: una persona coherente respaldada por ocho agentes ejecutivos; coordinación y aprobaciones. Sin evidencia de computadora propia.

## Evidencia de la investigación

### ✅ Identidad
  - “**Prompt caching** — The system prompt is structured so the Executive persona, company profile, and knowledge index are cached separately (up to 85% cache hit rate after the first few turns).” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Invite the bot with `bot` + `applications.commands` scopes 4.” — https://openexecutive.ai
  - “Five scoring dimensions (persona coherence, domain accuracy, company context utilization, routing quality, actionability) are each rated 1–5.” — https://github.com/SenteLabsAI/OpenExecutive#readme

### ❌ Computadora propia
  - “# Start everything make dev ``` **Trying it on your own computer needs no sign-in setup.** While `AUTH_GOOGLE_ID` and `AUTH_OIDC_ISSUER` are blank, `make dev` uses local login: the web app only accepts connections from this computer, you click **Open**, and you are the owner.” — https://openexecutive.ai
  - “Note that > `make stop` uses `lsof` and has no Windows equivalent; stop the two dev > servers from their own terminals instead.” — https://openexecutive.ai
  - “**For contributors not using `make`:** ```bash cd packages/core uv sync uv run uvicorn openexecutive.api.main:app --reload --port 8000 # In a second terminal cd packages/ui npm install npm run dev ``` `uv run` executes inside the project's virtualenv without activating it, so these commands are the same on macOS, Linux and Windows.” — https://openexecutive.ai

### ❌ Memoria
  - “The next session opens with a `<past_decisions>` block so the Executive remembers what it recommended last month.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Then it makes the person's own changes inside Open Executive (alerts, open loops, follow-ups, the watch list, goals, decision outcomes, remembered facts and the company profile), each under the same permissions as in the web app.” — https://openexecutive.ai
  - “Out of the box it supports spend approval thresholds, integration with corporate knowledge systems, and defined governance for how it interacts with human colleagues and other AI systems.” — https://github.com/SenteLabsAI/OpenExecutive#readme

### ❌ Rutinas
  - “Beyond Q&A, the system maintains episodic memory of past decisions and initiatives across sessions, and a built-in scheduler can proactively surface follow-ups and time-sensitive actions.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “**Scheduler** — A built-in job runner claims due actions via `UPDATE … RETURNING` to prevent double-firing.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “The API must run as a single instance; do not horizontally scale it without gating the scheduler first.” — https://github.com/SenteLabsAI/OpenExecutive#readme

### ❌ Apps reales
  - “It meets people where they already work, with integrations for Slack, Discord, Telegram, Google Chat, email, Google Workspace, Microsoft 365 (Outlook mail and calendar, OneDrive), Notion, Confluence and any MCP-compatible AI tool, with more on the roadmap.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Google Workspace Microsoft 365 Slack Microsoft Teams Google Chat Discord Telegram Confluence Use it from your AI apps Ask your Executive from Claude, ChatGPT and other apps that support MCP.” — https://openexecutive.ai
  - “The Executive then keeps private, dated notes of what they said, in chat where it can confirm it's them (the web app signed in, their own Slack or Discord, Telegram with a webhook secret) and in Act as me replies they send.” — https://github.com/SenteLabsAI/OpenExecutive#readme

### ✅ Coordinación
  - “Multi-agent routing leans heavily on tool use, so pick a model that's strong at it (e.g.” — https://openexecutive.ai
  - “To invite your team, or to run it on a server or with `make docker`, set up Google or SSO sign-in by filling in the `AUTH_*` block (see [docs/auth.md](docs/auth.md) for the Google Cloud Console and SSO steps).” — https://openexecutive.ai
  - “Needs you: approve the $4,200 vendor invoice from Northwind Over the $2,000 limit you set for Operations Approve Ask why Works where your team already works Autonomy You choose how much it does on its own Two ways it works.” — https://openexecutive.ai

### ✅ Aprobaciones
  - “While a domain is being reviewed its content is withheld from the Executive, so the UI confirms the count before it starts.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “Out of the box it supports spend approval thresholds, integration with corporate knowledge systems, and defined governance for how it interacts with human colleagues and other AI systems.” — https://github.com/SenteLabsAI/OpenExecutive#readme
  - “The Executive then keeps private, dated notes of what they said, in chat where it can confirm it's them (the web app signed in, their own Slack or Discord, Telegram with a webhook secret) and in Act as me replies they send.” — https://github.com/SenteLabsAI/OpenExecutive#readme

### ❌ Desatendido
  - “**Episodic memory** — After every response, a background `claude-haiku-5-5` pass extracts key decisions, initiatives, and advice into SQLite.” — https://github.com/SenteLabsAI/OpenExecutive#readme

## Puntuación

Grok Score: **71.05** · Tier **A** · ADN **32**

- **capacidad**: 82/100
- **autonomia**: 74/100
- **computadora**: 55/100
- **memoria**: 60/100
- **rutinas**: 55/100
- **equipo**: 90/100
- **confianza**: 90/100
- **producto**: 66/100

## Fortalezas

- Ocho agentes especialistas coordinados bajo una única persona ejecutiva, con roles y gobernanza definidos
- Integraciones amplias con suites corporativas y herramientas MCP, poco habituales en proyectos abiertos
- Modo 'Act as me' con revisión humana y umbrales de gasto antes de acciones sensibles

## Lo que le falta / riesgos

- Arquitectura FastAPI + Next.js pesada para el trabajo que realiza, con sobrecoste de orquestación
- No opera apps ni navegador de forma autónoma: se apoya en integraciones y APIs
- Proyecto de pocos meses, sin despliegues empresariales públicos que validen la gobernanza

## Comparación con el listón

Se posiciona frente a asistentes ejecutivos como Lindy o agentes multi-rol tipo CrewAI montados a mano, pero le falta la computadora persistente y la autonomía de Grok Bot.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/SenteLabsAI/OpenExecutive) · consultado 2026-11-12
- [Web oficial](https://openexecutive.ai) · consultado 2026-11-12
- [README](https://github.com/SenteLabsAI/OpenExecutive#readme) · consultado 2026-11-12
- [Releases](https://github.com/SenteLabsAI/OpenExecutive/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

# DS-Bot — dossier de investigación

- **Repo**: https://github.com/Fei2411/DS-Bot
- **Web oficial**: —
- **Licencia**: Apache-2.0
- **Lenguaje**: JavaScript
- **Estrellas**: 7073 · **Forks**: 663
- **Último push**: 2026-11-12T07:41:49Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-12 · **Confianza**: 58/100
- **Tipo**: bot · **Categoría**: personal

## Qué es

Instalador y cliente de bots de larga vida sobre DeepSeek Harness: bots principales, mensajes entre bots y chats de grupo, con instalador para Windows. Orientado a usuarios de DSH que quieren un equipo de bots conversacionales persistentes sin configurar nada.

> Bots de larga vida sobre DeepSeek Harness.

## Nota de verificación

Revisión previa + README: instalador y cliente de bots de larga vida sobre DeepSeek Harness. Sin evidencia de apps GUI o rutinas.

## Evidencia de la investigación

### ✅ Identidad
  - “Each bot can have its own working folder and permission preset — just tell the bot when you want to switch folders.” — https://github.com/Fei2411/DS-Bot#readme
  - “### Browser Each bot has its own isolated browser with separate sign-ins, and can import cookies from a file or from your local browsers.” — https://github.com/Fei2411/DS-Bot#readme
  - “You can set a level (view only, background, or foreground) and allowed apps for each bot, with a top bar showing when a bot is working so you can pause or take over at any time; apps like system settings and password managers are never given to a bot.” — https://github.com/Fei2411/DS-Bot#readme

### ✅ Computadora propia
  - “The browser feature is available in the desktop app and DSH Desktop only (not in DSH Web), and only the desktop app keeps browser sign-ins after you quit and supports cookie import.” — https://github.com/Fei2411/DS-Bot#readme
  - “![Usage page](docs/images/usage.png) ## Data All data stays on your own computer: in the folder you chose on first start in the desktop app (`~/.ds-bot` by default), or in `bot/` and `sessions/` in the DSH home folder (`~/.dsh` by default) for the plugin.” — https://github.com/Fei2411/DS-Bot#readme
  - “- **DSH Desktop**: In the sidebar, select **Plugins** → **Add plugin**, enter `ds-bot` (in mainland China, set **Registry** to **Mainland China mirror**), then select **Install** and **Enable now**.” — https://github.com/Fei2411/DS-Bot#readme

### ❌ Memoria
  - “A bot remembers what you like and uses it in later work.” — https://github.com/Fei2411/DS-Bot#readme
  - “DS Bot learned from their designs and does not contain their code: - [AgentMemoryRepo](https://github.com/AgentMemoryRepo/agentmemoryrepo): the Markdown format of Bot memory.” — https://github.com/Fei2411/DS-Bot#readme
  - “You don't need to worry about the context behind it.” — https://github.com/Fei2411/DS-Bot#readme

### ❌ Rutinas
  - “While a bot is working, you can send a message to steer it right away, or type `/side` to ask a side question without interrupting its task; it can also draw charts, tables and forms in its replies, or run scheduled tasks.” — https://github.com/Fei2411/DS-Bot#readme
  - “You can set a level (view only, background, or foreground) and allowed apps for each bot, with a top bar showing when a bot is working so you can pause or take over at any time; apps like system settings and password managers are never given to a bot.” — https://github.com/Fei2411/DS-Bot#readme
  - “On Windows, Chrome and Electron apps often ignore background input and need "foreground", and apps running as administrator cannot be controlled; macOS requires 14 or later with Accessibility and Screen Recording permissions; Linux supports X11, with limited Wayland support.” — https://github.com/Fei2411/DS-Bot#readme

### ❌ Apps reales
  - “### IM In Settings → IM, you can link a bot or group chat to WeChat, Feishu, DingTalk, WeCom, QQ, Telegram, Discord or Slack.” — https://github.com/Fei2411/DS-Bot#readme
  - “### Connectors and capabilities In Settings → Connectors, you can sign in to GitHub, Gmail, QQ Mail, 163 and other mailboxes, and remote MCP servers, or import existing configs from Claude Desktop, Cursor and VS Code.” — https://github.com/Fei2411/DS-Bot#readme
  - “### Computer use Turn on Settings → Computer use to let bots operate apps on your computer as far as you allow.” — https://github.com/Fei2411/DS-Bot#readme

### ✅ Coordinación
  - “Pick Local agent when creating a bot (or switch in the bot's settings), and it will use the CLI's own sign-in, plan and models while working like any other bot in private chats, group chats, handoffs and memory.” — https://github.com/Fei2411/DS-Bot#readme
  - “- [Hermes Agent](https://github.com/NousResearch/hermes-agent) and [Hermes Bot Mode](https://github.com/NousResearch/Hermes-Bot-Mode): one session per member per group chat, and handoffs that carry the earlier user messages.” — https://github.com/Fei2411/DS-Bot#readme
  - “- [OpenCode](https://github.com/sst/opencode), [goose](https://github.com/block/goose), [pi](https://github.com/badlogic/pi-mono) and [Gemini CLI](https://github.com/google-gemini/gemini-cli): when to condense a long chat, and what a handoff note holds.” — https://github.com/Fei2411/DS-Bot#readme

### ❌ Aprobaciones
  - “Once paired, you can talk to your bots, @ them in groups, and answer question and approval cards directly from your chat app without a public IP or open port on your computer.” — https://github.com/Fei2411/DS-Bot#readme
  - “Each bot can have its own working folder and permission preset — just tell the bot when you want to switch folders.” — https://github.com/Fei2411/DS-Bot#readme
  - “Other bots cannot read its folder, memory or chat history, and sending messages to other bots or writing files outside its folder requires your approval.” — https://github.com/Fei2411/DS-Bot#readme

### ❌ Desatendido
  - “You can set a level (view only, background, or foreground) and allowed apps for each bot, with a top bar showing when a bot is working so you can pause or take over at any time; apps like system settings and password managers are never given to a bot.” — https://github.com/Fei2411/DS-Bot#readme
  - “On Windows, Chrome and Electron apps often ignore background input and need "foreground", and apps running as administrator cannot be controlled; macOS requires 14 or later with Accessibility and Screen Recording permissions; Linux supports X11, with limited Wayland support.” — https://github.com/Fei2411/DS-Bot#readme

## Puntuación

Grok Score: **60.95** · Tier **B** · ADN **40**

- **capacidad**: 62/100
- **autonomia**: 54/100
- **computadora**: 67/100
- **memoria**: 60/100
- **rutinas**: 55/100
- **equipo**: 90/100
- **confianza**: 55/100
- **producto**: 50/100

## Fortalezas

- Patrón diferencial: bots persistentes que se hablan entre sí y forman grupos, no un único chat
- Instalación sencilla en Windows sin Node ni DSH previo, con comunidad china muy activa
- Tracción rápida: más de 7,073 estrellas en menos de un mes

## Lo que le falta / riesgos

- Madurez muy corta: versión 0.2 preview, un mes de vida e instalador sin firmar
- Depende por completo de DeepSeek Harness y de la cuenta o API de DeepSeek
- Sin evidencia de tests ni de operación de apps reales; su valor está en la capa de bots, no en el trabajo autónomo

## Comparación con el listón

Es más un front-end de bots sobre DSH que un agente tipo Grok Bot; su orquestación multi-bot es la única ventaja frente a los clientes DSH al uso.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/Fei2411/DS-Bot) · consultado 2026-11-12
- [README](https://github.com/Fei2411/DS-Bot#readme) · consultado 2026-11-12
- [Releases](https://github.com/Fei2411/DS-Bot/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

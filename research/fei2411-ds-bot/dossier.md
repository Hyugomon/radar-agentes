# DS-Bot — dossier de investigación

- **Repo**: https://github.com/Fei-Craft/DS-Bot
- **Web oficial**: —
- **Licencia**: Apache-2.0
- **Tipo de licencia**: Open source · **Uso / Precio**: Gratis
- **Lenguaje**: JavaScript
- **Estrellas**: 8782 · **Forks**: 891
- **Último push**: 2026-11-23T18:56:03Z · **Última release**: 2026-11-22
- **Revisado**: 2026-11-23 · **Confianza**: 58/100
- **Tipo**: bot · **Categoría**: teams

## Qué es

App de escritorio y Android open source sobre DeepSeek Harness (Fei-Craft/DS-Bot) para crear bots y chats grupales con memoria, navegador aislado por bot, computer use, tareas asíncronas en segundo plano, 25+ CLIs locales (incluido Antigravity), aprobaciones e integración IM.

> Bots de larga vida sobre DeepSeek Harness.

## Nota de verificación

Revisión v0.3.8–v0.3.10 y README actual (Fei-Craft/DS-Bot): memoria por bot/grupo, navegador aislado, computer use, tarjetas de aprobación en IM, tareas asíncronas y 25+ CLIs locales + APK Android. Rutinas y Desatendido siguen en falso (requiere el PC despierto y sin cron documentado).

## Release revisada

- **Tag**: [v0.3.10](https://github.com/Fei-Craft/DS-Bot/releases/tag/v0.3.10)
- **Fecha**: 2026-11-22 (hace 1 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.3.10 (y v0.3.8–v0.3.9): tareas asíncronas en segundo plano (task_start/stop), Antigravity + 24 CLIs con MCP stdio, consola Settings con búsqueda ⌘K y app Android.

**Impacto en la ficha**: Sube a Tier A (+11.45, ADN 40→74): Memoria, Apps reales y Aprobaciones pasan a ON; Capacidad 62→72, Autonomía 54→66 y Producto 50→64.

> Download / 下载 System / 系统 Download / 下载 Size / 大小 Windows 10/11 (64-bit / 64 位) Double-click to install / 双击安装 DS-Bot-0.3.10-win-x64.exe 291 MB macOS, Apple chip / Apple 芯片 DS-Bot-0.3.10-mac-arm64.zip 373 MB macOS, Intel DS-Bot-0.3.10-mac-x64.zip 389 MB Linux, AppImage DS-Bot-0.3.10-linux-x86_64.AppImage 372 MB Linux, deb (Debian, Ubuntu) DS-Bot-0.3.10-linux-amd64.deb 294 MB Android (phone app / 手机 App) DS-Bot-0.3.10-android.apk 58 MB The .blockmap , latest*.yml and ds-bot-*.tgz files and the source code archives are for updates and the plugin: you do not need to download them. .blockmap 、 latest*.yml 、 ds-bot-*.tgz 和源代码是给自动更新和插件用的，不用下载。 To check a download, compare its SHA-256 with SHA256SU

## Evidencia de la investigación

### ✅ Identidad
  - “Each bot can have its own working folder and permission preset — just tell the bot when you want to switch folders.” — https://github.com/Fei2411/DS-Bot#readme
  - “### Browser Each bot has its own isolated browser with separate sign-ins, and can import cookies from a file or from your local browsers.” — https://github.com/Fei2411/DS-Bot#readme
  - “You can set a level (view only, background, or foreground) and allowed apps for each bot, with a top bar showing when a bot is working so you can pause or take over at any time; apps like system settings and password managers are never given to a bot.” — https://github.com/Fei2411/DS-Bot#readme

### ✅ Computadora propia
  - “The browser feature is available in the desktop app and DSH Desktop only (not in DSH Web), and only the desktop app keeps browser sign-ins after you quit and supports cookie import.” — https://github.com/Fei2411/DS-Bot#readme
  - “![Usage page](docs/images/usage.png) ## Data All data stays on your own computer: in the folder you chose on first start in the desktop app (`~/.ds-bot` by default), or in `bot/` and `sessions/` in the DSH home folder (`~/.dsh` by default) for the plugin.” — https://github.com/Fei2411/DS-Bot#readme
  - “- **DSH Desktop**: In the sidebar, select **Plugins** → **Add plugin**, enter `ds-bot` (in mainland China, set **Registry** to **Mainland China mirror**), then select **Install** and **Enable now**.” — https://github.com/Fei2411/DS-Bot#readme

### ✅ Memoria
  - “A bot remembers what you like and uses it in later work.” — https://github.com/Fei2411/DS-Bot#readme
  - “DS Bot learned from their designs and does not contain their code: - [AgentMemoryRepo](https://github.com/AgentMemoryRepo/agentmemoryrepo): the Markdown format of Bot memory.” — https://github.com/Fei2411/DS-Bot#readme
  - “You don't need to worry about the context behind it.” — https://github.com/Fei2411/DS-Bot#readme
  - “Bots also have memory. A bot remembers what you like and uses it in later work... A group chat has its own memory and working folder.” — https://github.com/Fei-Craft/DS-Bot#readme

### ❌ Rutinas
  - “While a bot is working, you can send a message to steer it right away, or type `/side` to ask a side question without interrupting its task; it can also draw charts, tables and forms in its replies, or run scheduled tasks.” — https://github.com/Fei2411/DS-Bot#readme
  - “You can set a level (view only, background, or foreground) and allowed apps for each bot, with a top bar showing when a bot is working so you can pause or take over at any time; apps like system settings and password managers are never given to a bot.” — https://github.com/Fei2411/DS-Bot#readme
  - “On Windows, Chrome and Electron apps often ignore background input and need "foreground", and apps running as administrator cannot be controlled; macOS requires 14 or later with Accessibility and Screen Recording permissions; Linux supports X11, with limited Wayland support.” — https://github.com/Fei2411/DS-Bot#readme

### ✅ Apps reales
  - “### IM In Settings → IM, you can link a bot or group chat to WeChat, Feishu, DingTalk, WeCom, QQ, Telegram, Discord or Slack.” — https://github.com/Fei2411/DS-Bot#readme
  - “### Connectors and capabilities In Settings → Connectors, you can sign in to GitHub, Gmail, QQ Mail, 163 and other mailboxes, and remote MCP servers, or import existing configs from Claude Desktop, Cursor and VS Code.” — https://github.com/Fei2411/DS-Bot#readme
  - “### Computer use Turn on Settings → Computer use to let bots operate apps on your computer as far as you allow.” — https://github.com/Fei2411/DS-Bot#readme
  - “Each bot has its own isolated browser with separate sign-ins... Turn on Settings → Computer use to let bots operate apps on your computer as far as you allow.” — https://github.com/Fei-Craft/DS-Bot#readme

### ✅ Coordinación
  - “Pick Local agent when creating a bot (or switch in the bot's settings), and it will use the CLI's own sign-in, plan and models while working like any other bot in private chats, group chats, handoffs and memory.” — https://github.com/Fei2411/DS-Bot#readme
  - “- [Hermes Agent](https://github.com/NousResearch/hermes-agent) and [Hermes Bot Mode](https://github.com/NousResearch/Hermes-Bot-Mode): one session per member per group chat, and handoffs that carry the earlier user messages.” — https://github.com/Fei2411/DS-Bot#readme
  - “- [OpenCode](https://github.com/sst/opencode), [goose](https://github.com/block/goose), [pi](https://github.com/badlogic/pi-mono) and [Gemini CLI](https://github.com/google-gemini/gemini-cli): when to condense a long chat, and what a handoff note holds.” — https://github.com/Fei2411/DS-Bot#readme

### ✅ Aprobaciones
  - “Once paired, you can talk to your bots, @ them in groups, and answer question and approval cards directly from your chat app without a public IP or open port on your computer.” — https://github.com/Fei2411/DS-Bot#readme
  - “Each bot can have its own working folder and permission preset — just tell the bot when you want to switch folders.” — https://github.com/Fei2411/DS-Bot#readme
  - “Other bots cannot read its folder, memory or chat history, and sending messages to other bots or writing files outside its folder requires your approval.” — https://github.com/Fei2411/DS-Bot#readme
  - “Once paired, you can talk to your bots, @ them in groups, and answer question and approval cards directly... local commands added by a bot need your approval before they run.” — https://github.com/Fei-Craft/DS-Bot#readme

### ❌ Desatendido
  - “You can set a level (view only, background, or foreground) and allowed apps for each bot, with a top bar showing when a bot is working so you can pause or take over at any time; apps like system settings and password managers are never given to a bot.” — https://github.com/Fei2411/DS-Bot#readme
  - “On Windows, Chrome and Electron apps often ignore background input and need "foreground", and apps running as administrator cannot be controlled; macOS requires 14 or later with Accessibility and Screen Recording permissions; Linux supports X11, with limited Wayland support.” — https://github.com/Fei2411/DS-Bot#readme

## Puntuación

Grok Score: **72.4** · Tier **A** · ADN **74**

- **capacidad**: 72/100
- **autonomia**: 66/100
- **computadora**: 76/100
- **memoria**: 84/100
- **rutinas**: 55/100
- **equipo**: 90/100
- **confianza**: 78/100
- **producto**: 64/100

## Fortalezas

- Patrón diferencial: bots persistentes que se hablan entre sí y forman grupos, no un único chat
- Instalación sencilla en Windows sin Node ni DSH previo, con comunidad china muy activa
- Tracción rápida: más de 8,782 estrellas en menos de un mes

## Lo que le falta / riesgos

- Sin rutinas cron programadas ni ejecución desatendida 24/7 sin el PC encendido
- Depende de DeepSeek Harness y de los límites de las cuentas/CLIs locales
- Proyecto aún joven (v0.3.10) en evolución rápida e instaladores sin firma comercial

## Comparación con el listón

Es más un front-end de bots sobre DSH que un agente tipo Grok Bot; su orquestación multi-bot es la única ventaja frente a los clientes DSH al uso.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/Fei-Craft/DS-Bot) · consultado 2026-11-23
- [README](https://github.com/Fei-Craft/DS-Bot#readme) · consultado 2026-11-23
- [Releases](https://github.com/Fei-Craft/DS-Bot/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

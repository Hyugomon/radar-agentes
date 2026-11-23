# OpenChamber — dossier ADE

- **Web oficial**: https://openchamber.dev/
- **Repo**: https://github.com/openchamber/openchamber
- **Licencia**: MIT
- **Categoría**: workspace
- **Revisado**: 2026-11-23
- **ADE Score**: 82.06 · Tier S

## Qué es

Entorno de desarrollo agéntico open source con sesiones, extensiones, revisión, share pages para pedir ayuda a personas y un navegador que actúa como humano.

## Release revisada

- **Tag**: [canary](https://github.com/openchamber/openchamber/releases/tag/canary)
- **Fecha**: 2026-11-23 (hace 0 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v2.8.0 (y v2.7.3 + canary): sesiones Lead que delegan y resumen sub-sesiones, panel en vivo de subagentes, OpenCode Server compartido y edición de documentos Office.

**Impacto en la ficha**: Sube a Tier S (+1.86): Orquestación 75→85, Extensiones 78→81, Revisión 80→82 y Producto 79→81.

> OpenChamber Canary 2.8.1-canary.20261123.29, built from 3a0dbea . The nightly build of main. In the desktop app, or in the browser page of a server installed from npm (@openchamber/web@canary), Settings → About → Updates: pick Canary to update into it, Stable to go back. Expect rough edges. Downloads System File macOS, Apple Silicon .dmg macOS, Intel .dmg Windows, x64 .exe Windows, ARM .exe Linux, x64 .AppImage , .deb , .rpm Linux, ARM .AppImage , .deb , .rpm Android .apk

## Evidencia

### harnesses
- “Local Current Local • Default Local Local Current Connected · 7ms ping http://127.0.0.1:63418/ exe.dev Current Connected · 809ms ping · Relay via OpenChamber Relay DevChamber Current Auth required https://devchamber.example.com/ Add instance Sidebar sections New section Pages Chats Pinned Also in projects In work Also in projects Projects Drag to reorder.” — https://github.com/openchamber/openchamber#readme
- “Gemini 4 Argon · Build · 2m 31s Add the new install command to the docs.” — https://github.com/openchamber/openchamber#readme
- “Gemini 4 Argon · Build · 58s What are we working on in uploader ?” — https://github.com/openchamber/openchamber#readme

### paralelo
- “push (...chunks); 13 void drain (); 14 } 15 16 async function drain () { 17 while (running < MAX_PARALLEL && queue.length > 0 ) { 18 const chunk = queue.” — https://github.com/openchamber/openchamber#readme
- “### Compare and combine runs Use **Multi-run** to give the same task to up to five models, each in its own session and optionally its own worktree.” — https://github.com/openchamber/openchamber#readme

### orquestacion
- “New Leads: a session that runs a whole direction of work... A lead hands tasks to its own sessions, checks what comes back and keeps a brief and a digest you answer in one reply.” — https://github.com/openchamber/openchamber/releases/tag/v2.8.0

### revision
- “New Share pages: an agent can ask your teammates. When an answer has to come from someone else, the agent sends them a page, and the chat shows a link and PIN for each person.” — https://github.com/openchamber/openchamber/releases/tag/v2.7.2

### remoto
- “Share pages: a shared link pasted into the composer opens the page in your own OpenChamber, so your agent sees it too.” — https://github.com/openchamber/openchamber/releases/tag/v2.7.2

### movil
- “### Continue on another device Open the same projects and sessions from Desktop, Web/PWA, VS Code, iOS, or Android.” — https://github.com/openchamber/openchamber#readme
- “### iOS and Android Join the iOS beta on [TestFlight](https://testflight.apple.com/join/5ek6GU1E).” — https://github.com/openchamber/openchamber#readme
- “For Android, download the `.apk` from the [Canary release](https://github.com/openchamber/openchamber/releases/tag/canary).” — https://github.com/openchamber/openchamber#readme

### extensiones
- Sin cita directa en la web/README revisada.

### control
- “Permission required bash Run a command bun run migrate:settings Deny Always allow Allow once uploader main No projects found.” — https://github.com/openchamber/openchamber#readme
- “### Track work across projects See which sessions are working, waiting, finished, or failed, along with approvals, scheduled tasks, provider limits, token use, and costs.” — https://github.com/openchamber/openchamber#readme

## Dimensiones

- **Harnesses**: 84/100
- **Paralelismo**: 82/100
- **Orquestación**: 85/100
- **Revisión**: 82/100
- **Remoto / cloud**: 84/100
- **Móvil**: 82/100
- **Extensiones**: 81/100
- **Control**: 68/100
- **Apertura**: 90/100
- **Producto**: 81/100

## Fortalezas

- Open source y multiplataforma
- Share pages para colaborar con personas
- Navegador controlado y PDF anotado
- Buena adopción
- Sesiones Lead que delegan y sintetizan trabajo + panel de monitoreo de subagentes

## Carencias

- Aprobaciones y políticas de seguridad aún por debajo de los líderes
- Aprobaciones todavía básicas
- Ecosistema joven

## Fuentes

- [Web oficial](https://openchamber.dev/) · consultado 2026-11-23
- [Repositorio GitHub](https://github.com/openchamber/openchamber) · consultado 2026-11-23
- [README](https://github.com/openchamber/openchamber#readme) · consultado 2026-11-23

---

_Investigación documental de la web oficial y el repositorio. No se instaló ni se probó el ADE en una tarea real. El score es editorial y está ajustado contra las dimensiones documentadas._

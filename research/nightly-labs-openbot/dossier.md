# openbot — dossier de investigación

- **Repo**: https://github.com/nightly-labs/openbot
- **Web oficial**: https://openbot.run/
- **Licencia**: PolyForm-Noncommercial-1.0.0
- **Tipo de licencia**: Source-available · **Uso / Precio**: Gratis personal · Pago business
- **Lenguaje**: TypeScript
- **Estrellas**: 10102 · **Forks**: 982
- **Último push**: 2026-11-23T22:23:32Z · **Última release**: 2026-11-23
- **Revisado**: 2026-11-23 · **Confianza**: 80/100
- **Tipo**: agent · **Categoría**: teams

## Qué es

Espacio de trabajo multiagente (macOS, Windows, Linux, web, iOS y Android) con servidor always-on en VPS/Docker, workspaces persistentes, navegador embebido, Computer Use (cua-driver), rutinas, memoria, canales compartidos e importador directo desde Grok Bot sobre Codex, Claude Code, Grok CLI, Gemini, OpenCode, Cursor, Hermes y más. Ojo: su código es source-available (PolyForm Noncommercial 1.0.0) — gratis solo para uso personal/no comercial y de pago para uso laboral o empresarial.

> Equipo de agentes persistentes local o 24/7; gratis personal, de pago para empresas.

## Aviso de licencia y uso comercial

Punto negativo — Licencia source-available (PolyForm Noncommercial 1.0.0, no es open source OSI): gratuito (€0) solo para uso personal, estudio o proyectos sin ánimo de lucro. Usarlo en el trabajo o en empresa requiere licencia comercial paga (Starter €10/mes 1 usuario, Team €25/mes 2 usuarios, o Enterprise; gratis solo en promoción hasta 2026-12-01). Solo versiones ≤ 0.1.11 siguen bajo Apache-2.0.

## Nota de verificación

README, LICENSE y openbot.run/pricing: 7/8 pilares (ADN 90) con servidor always-on, navegador embebido, cua-driver, canales, rutinas, memoria e importador de Grok Bot. Dos penalizaciones explícitas: (1) Confianza 48 por danger-full-access / approvalPolicy: never; (2) Producto 70 por licencia source-available PolyForm Noncommercial 1.0.0 (gratis personal €0; uso laboral/business requiere licencia paga Starter €10/mes o Team €25/mes).

## Release revisada

- **Tag**: [v0.77.0](https://github.com/nightly-labs/openbot/releases/tag/v0.77.0)
- **Fecha**: 2026-11-23 (hace 0 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.77.0 (y apps móviles iOS/Android 1.4.13): steering en mitad de ejecución de herramientas para Claude, voz cloud multiidioma, recuperación de pestañas colgadas en el navegador embebido, fixes MCP y workflows/rutinas + memoria de subagentes (v0.74.0–v0.76.1).

**Impacto en la ficha**: Alta en el ranking con 78.85 A (ADN 90, 7/8 pilares). Penalizado en Confianza (48) por correr sin aprobaciones y en Producto (70) por licencia source-available PolyForm Noncommercial 1.0.0 (gratis personal, pago para uso business).

> What's Changed Let a steer reach a Claude agent while a tool runs by @NorbertBodziony in #14259 Add the ghost, jellyfish and octopus avatar shapes by @NorbertBodziony in #14274 Show a refused key and stop retrying it every 10 minutes by @Sniezka1927 in #14271 Free a browser tab whose page stops answering by @Sniezka1927 in #14273 Tell agents why a sidebar folder tool failed by @Sniezka1927 in #14290 Let a Muse agent run when one of its apps does not start by @Sniezka1927 in #14286 build(nix): install OpenBot 0.76.1 by @github-actions[bot] in #14291 Keep agent IDs in Local scripts responses by @Sniezka1927 in #14308 Read replies aloud in any language with a cloud voice by @Sniezka1927 in #143

## Evidencia de la investigación

### ✅ Identidad
  - “Prompt-driven agent creation and editing on desktop and mobile, with editable instructions, avatar, and section review before saving.” — https://github.com/nightly-labs/openbot#readme

### ✅ Computadora propia
  - “Persistent agents backed by independent Codex, Claude, Grok, OpenCode, Gemini, Cursor, Cline, Kimi, Devin, GitHub Copilot, Mistral, or Hermes sessions and local workspaces.” — https://github.com/nightly-labs/openbot#readme
  - “To run OpenBot as an always-on server of your account on a VPS or home server (Ubuntu 24.04 or 26.04 with systemd), install it from a terminal and sign in with an email code” — https://github.com/nightly-labs/openbot#readme

### ✅ Memoria
  - “The import adds each agent's name, instructions, avatar, skills, routines, and memories.” — https://github.com/nightly-labs/openbot#readme
  - “Save memory changes that a background subagent makes after the turn ends by @Sniezka1927 in #12911” — https://github.com/nightly-labs/openbot/releases/tag/v0.75.0

### ✅ Rutinas
  - “Refuse an unknown trigger event in edit_workflow by @Sniezka1927 in #12892” — https://github.com/nightly-labs/openbot/releases/tag/v0.75.0
  - “The import adds each agent's name, instructions, avatar, skills, routines, and memories.” — https://github.com/nightly-labs/openbot#readme

### ✅ Apps reales
  - “A persistent embedded browser that agents can open, inspect, and control.” — https://github.com/nightly-labs/openbot#readme
  - “Optional Computer Use on macOS, Windows and Linux through the cua-driver binary in the release, which OpenBot starts as its own child process and gives to every provider.” — https://github.com/nightly-labs/openbot#readme

### ✅ Coordinación
  - “Shared desktop channel chats with one task owner, explicit delegation, shared history, and Stop, Resume, Reassign, Archive, and Restore controls.” — https://github.com/nightly-labs/openbot#readme

### ❌ Aprobaciones
  - “Agents run with danger-full-access and approvalPolicy: never. They can read and modify files, run commands, use the network, and control the embedded browser without per-action confirmations after the explicit first-launch consent.” — https://github.com/nightly-labs/openbot#readme
  - “Full local access is an explicit current product decision, not a security boundary.” — https://github.com/nightly-labs/openbot#readme

### ✅ Desatendido
  - “To run OpenBot as an always-on server of your account on a VPS or home server (Ubuntu 24.04 or 26.04 with systemd), install it from a terminal and sign in with an email code” — https://github.com/nightly-labs/openbot#readme
  - “FIFO message queues with pause, resume, cancellation, and crash-safe persistence.” — https://github.com/nightly-labs/openbot#readme

## Puntuación

Grok Score: **78.85** · Tier **A** · ADN **90**

- **capacidad**: 83/100
- **autonomia**: 80/100
- **computadora**: 86/100
- **memoria**: 86/100
- **rutinas**: 86/100
- **equipo**: 90/100
- **confianza**: 48/100
- **producto**: 70/100

## Fortalezas

- Orquesta 12+ backends (Codex, Claude Code, Grok CLI, Gemini, OpenCode, Cursor, Cline, Hermes, Ollama/LM Studio y ACP) con workspaces persistentes, colas FIFO crash-safe e importador directo de agentes desde Grok Bot.
- Modo always-on real en servidor Ubuntu (systemd), Docker (ghcr.io/nightly-labs/openbot), AWS ECS, Umbrel y macOS multi-tenant, controlable desde escritorio, web (openbot.run/app) y apps nativas iOS/Android vía WebRTC v3.
- Navegador embebido persistente (WebContentsView), Computer Use opcional (cua-driver en macOS/Windows/Linux), rutinas/workflows con triggers (edit_workflow) y memoria persistente incluso desde subagentes en segundo plano.
- Canales compartidos con delegación explícita, transferencia de archivos, modo multiplayer personas + agentes y ritmo de lanzamientos casi diario (v0.77.0, 10,102 estrellas).

## Lo que le falta / riesgos

- Licencia restrictiva (PolyForm Noncommercial 1.0.0, source-available — no open source OSI): es gratis (€0) únicamente para uso personal o sin ánimo de lucro; para uso en el trabajo o empresas exige licencia comercial de pago (Starter €10/mes 1 usuario, Team €25/mes 2 usuarios + €10.80/extra, o Enterprise; gratis solo en promo hasta 2026-12-01) y exige CLA para contribuir.
- Sin aprobaciones previas por decisión explícita de diseño: los agentes ejecutan con danger-full-access y approvalPolicy: never sin pedir confirmación por acción irreversible ('Full local access is an explicit current product decision, not a security boundary').
- Volumen muy alto de issues abiertos (4369) y cadencia de cambios casi diaria (v0.77.0 en 3 meses), lo que incrementa la fricción operativa.
- Los planes/APIs de modelos corren aparte y el servidor gestionado cuesta €30–€100/mes si no lo autoalojas.

## Comparación con el listón

Es uno de los clones más cercanos en experiencia a Grok Bot (hasta incluye importador directo de agentes desde Grok Bot, canales, rutinas, memoria, navegador y servidor 24/7), pero queda por debajo del listón y de líderes 100% open source por dos puntos negativos claros: renuncia a aprobaciones previas (approvalPolicy: never) y su licencia PolyForm Noncommercial cobra por uso business/comercial.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/nightly-labs/openbot) · consultado 2026-11-23
- [Web oficial](https://openbot.run/) · consultado 2026-11-23
- [Precios y licencia comercial](https://openbot.run/pricing) · consultado 2026-11-23
- [Licencia PolyForm Noncommercial 1.0.0](https://github.com/nightly-labs/openbot/blob/main/LICENSE) · consultado 2026-11-23
- [README](https://github.com/nightly-labs/openbot#readme) · consultado 2026-11-23
- [Releases](https://github.com/nightly-labs/openbot/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

# CludeGods — dossier de investigación

- **Repo**: https://github.com/AKamaly/CludeGods
- **Web oficial**: —
- **Licencia**: MIT
- **Lenguaje**: TypeScript
- **Estrellas**: 53 · **Forks**: 6
- **Último push**: 2026-11-02T15:10:51Z · **Última release**: 2026-11-02
- **Revisado**: 2026-11-23 · **Confianza**: 58/100
- **Tipo**: agent · **Categoría**: personal

## Qué es

Toolkit para macOS que convierte Claude Code en un equipo de workers always-on con voz en tiempo real, computer use, memoria, horarios, espacios, Slack y aprobaciones por clic.

> Claude Code con voz y workers always-on.

## Nota de verificación

README: toolkit macOS sobre Claude Code y VoiceMode con workers always-on, voz, computer use, memoria, horarios, Spaces, Slack y aprobaciones por clic. No hay evidencia de coordinación entre workers.

## Release revisada

- **Tag**: [v0.5.0](https://github.com/AKamaly/CludeGods/releases/tag/v0.5.0)
- **Fecha**: 2026-11-02 (hace 21 días)
- **Estado**: reciente · **Releases en 90 días**: 5
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: 0.5.0: instalación en una línea, voz guiada y plantillas de workers.

**Impacto en la ficha**: Nuevo en el ranking: 73.20 A. 7/8 pilares; sin coordinación entre workers y solo macOS.

> Added One-line install: curl -fsSL https://raw.githubusercontent.com/AKamaly/CludeGods/main/bootstrap.sh | bash clones CludeGods to ~/.cludegods/src , installs it and the three panes, and checks the result. Add | bash -s -- --voice for voice too. Safe to run again. cludegods ( ~/.claude/skills/gods/bin/cludegods ): setup voice (guided, picks up where it stopped, ends with a spoken self-test and a mic check), doctor (health checks with one-click repairs, also in the Workers pane), update , uninstall and version . uninstall.sh : removes CludeGods, backing everything up first; --keep-data keeps your workers, spaces and settings. Prebuilt CallPill: each published release carries CallPill-macos.z

## Evidencia de la investigación

### ✅ Identidad
  - “Each worker is its own Claude Code chat with a name, a role, a god, a voice and its own hours.” — https://github.com/AKamaly/CludeGods#readme

### ✅ Computadora propia
  - “Computer use: browser, terminal & files” — https://github.com/AKamaly/CludeGods#readme

### ✅ Memoria
  - “A built-in Memory space holds the rules every worker reads before it starts; it changes only through a draft you approve, whatever the setting.” — https://github.com/AKamaly/CludeGods#readme

### ✅ Rutinas
  - “Give a worker a schedule, and the pane wakes it at that time: to run its charter if it has one, or to check in on its role if not.” — https://github.com/AKamaly/CludeGods#readme

### ✅ Apps reales
  - “mention a worker in your own Slack workspace and it answers in the thread” — https://github.com/AKamaly/CludeGods#readme

### ❌ Coordinación
  - Sin evidencia directa en el README/web revisada.

### ✅ Aprobaciones
  - “Permissions by click, never by voice” — https://github.com/AKamaly/CludeGods#readme

### ✅ Desatendido
  - “Give a worker a schedule, and the pane wakes it at that time: to run its charter if it has one, or to check in on its role if not.” — https://github.com/AKamaly/CludeGods#readme

## Puntuación

Grok Score: **73.2** · Tier **A** · ADN **88**

- **capacidad**: 76/100
- **autonomia**: 74/100
- **computadora**: 78/100
- **memoria**: 84/100
- **rutinas**: 86/100
- **equipo**: 55/100
- **confianza**: 84/100
- **producto**: 54/100

## Fortalezas

- Voz en tiempo real y workers always-on sobre Claude Code
- Computer use con navegador, terminal y archivos
- Aprobaciones por clic y permisos por worker
- Spaces, Slack y memoria compartida

## Lo que le falta / riesgos

- Solo macOS Apple Silicon; es un toolkit, no un producto hosted
- No coordina workers entre sí ni reparte trabajo automáticamente
- Proyecto pequeño (53 estrellas) y dependiente de Claude Code/VoiceMode

## Comparación con el listón

Excelente para voz y workers always-on en Mac, pero no es un equipo coordinado ni un producto multiplataforma como Grok Bot.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/AKamaly/CludeGods) · consultado 2026-11-23
- [README](https://github.com/AKamaly/CludeGods#readme) · consultado 2026-11-23
- [Releases](https://github.com/AKamaly/CludeGods/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

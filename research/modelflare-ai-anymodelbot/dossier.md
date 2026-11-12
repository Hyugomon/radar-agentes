# AnyModelBot — dossier de investigación

- **Repo**: https://github.com/modelflare-ai/AnyModelBot
- **Web oficial**: https://anymodel.bot/
- **Licencia**: MIT
- **Lenguaje**: Python
- **Estrellas**: 3304 · **Forks**: 46
- **Último push**: 2026-11-11T12:44:17Z · **Última release**: 2026-11-11
- **Revisado**: 2026-11-12 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: personal

## Qué es

AnyModelBot es una app de escritorio open source (MIT) y local-first que te da tus propios bots personales con nombre, modelo, workspace y memoria propios, capaces de leer y escribir archivos, ejecutar comandos y operar tu escritorio. Se usa desde la app o desde WeChat, Feishu, Telegram, Slack y Discord, con aprobaciones antes de salir del workspace y tareas en segundo plano con reglas programadas.

> Bots locales con memoria y workspace.

## Nota de verificación

README + revisión previa: workspace, memoria y control del escritorio por bot; multi-modelo, rutinas, canales y aprobaciones. No coordina varios bots entre sí.

## Evidencia de la investigación

### ✅ Identidad
  - “先看看已有的 [issue](https://github.com/modelflare-ai/AnyModelBot/issues) 和[讨论](https://github.com/modelflare-ai/AnyModelBot/discussions)。带 [`good first issue`](https://github.com/modelflare-ai/AnyModelBot/labels/good%20first%20issue) 标签的 issue 适合入门。 2.” — https://anymodel.bot/

### ✅ Computadora propia
  - Sin evidencia directa en el README/web revisada.

### ✅ Memoria
  - Sin evidencia directa en el README/web revisada.

### ✅ Rutinas
  - Sin evidencia directa en el README/web revisada.

### ✅ Apps reales
  - Sin evidencia directa en el README/web revisada.

### ❌ Coordinación
  - Sin evidencia directa en el README/web revisada.

### ✅ Aprobaciones
  - Sin evidencia directa en el README/web revisada.

### ✅ Desatendido
  - Sin evidencia directa en el README/web revisada.

## Puntuación

Grok Score: **78.25** · Tier **A** · ADN **88**

- **capacidad**: 84/100
- **autonomia**: 78/100
- **computadora**: 89/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 55/100
- **confianza**: 90/100
- **producto**: 54/100

## Fortalezas

- Cubre casi todo el listón: identidad por bot, workspace y memoria persistentes, operación de apps y aprobaciones antes de lo irreversible
- Multi-modelo real (GPT, Claude, Gemini, Grok, DeepSeek y 70+ vía una sola clave de Modelflare, o API keys propias) y pago por uso sin suscripción
- Canales de mensajería múltiples (WeChat, Feishu, Telegram, Slack, Discord) que permiten hablarle al bot desde el móvil, más tareas de fondo y reglas programadas
- Local-first: conversaciones, memoria, archivos y claves se quedan en tu equipo; licencia MIT y documentación en cinco idiomas con CI y desarrollo documentado

## Lo que le falta / riesgos

- Proyecto de apenas diez días (creado 2026-10-27) con 22 releases en ese lapso: churn altísimo y cero historial de producción o casos reales verificables
- El runtime es tu propia máquina, no una computadora persistente en la nube: si cierras el portátil, el trabajo se detiene; no hay coordinación de varios bots entre sí
- Sin evidencia de tests ni gobernanza; 0 issues abiertos con 42 forks sugiere un tracker aún sin uso, no una calidad probada
- Dependencia comercial fuerte de Modelflare para el arranque y un stack Electron/Python más pesado que un agente nativo

## Comparación con el listón

Es el clon local-first más completo del referente Grok Bot y de dots/Claude Duet en cuanto a pilares, pero le falta computadora persistente en la nube y le sobra inmadurez frente a los líderes con ejército de usuarios y años de rodaje.

## Fuentes consultadas

- [Repositorio GitHub](https://github.com/modelflare-ai/AnyModelBot) · consultado 2026-11-12
- [Web oficial](https://anymodel.bot/) · consultado 2026-11-12
- [README](https://github.com/modelflare-ai/AnyModelBot#readme) · consultado 2026-11-12
- [Releases](https://github.com/modelflare-ai/AnyModelBot/releases) · consultado 2026-11-12

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

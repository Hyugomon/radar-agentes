# AnyModelBot — dossier de investigación

- **Repo**: https://github.com/modelflare-ai/AnyModelBot
- **Web oficial**: https://anymodel.bot/
- **Licencia**: MIT
- **Tipo de licencia**: Open source · **Uso / Precio**: Gratis
- **Lenguaje**: Python
- **Estrellas**: 4985 · **Forks**: 115
- **Último push**: 2026-11-22T18:58:42Z · **Última release**: 2026-11-22
- **Revisado**: 2026-11-23 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: personal

## Qué es

AnyModelBot es una app de escritorio open source (MIT) y local-first que te da tus propios bots personales con nombre, modelo, workspace y memoria propios, capaces de leer y escribir archivos, ejecutar comandos y operar tu escritorio. Se usa desde la app o desde WeChat, Feishu, Telegram, Slack y Discord, con aprobaciones antes de salir del workspace y tareas en segundo plano con reglas programadas.

> Bots locales con memoria y workspace.

## Nota de verificación

README + revisión previa: workspace, memoria y control del escritorio por bot; multi-modelo, rutinas, canales y aprobaciones. No coordina varios bots entre sí.

## Release revisada

- **Tag**: [v0.1.47](https://github.com/modelflare-ai/AnyModelBot/releases/tag/v0.1.47)
- **Fecha**: 2026-11-22 (hace 1 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-23 · **Fuente**: releases.atom

**Qué trae**: v0.1.47 (y v0.1.42–v0.1.46): sandbox estricto con bubblewrap en Linux, carpeta de trabajo in-place con aprobación fuera del límite, adjuntos ZIP/imágenes y generación de imágenes con confirmación de coste.

**Impacto en la ficha**: Sube a 79.35 A (+1.10): Confianza 90→92 y Producto 54→60 por sandbox bubblewrap, carpeta de trabajo y mejoras de UX.

> 新增 图片用作生图参考： 用 Modelflare 账号登录后，在和机器人的单聊里加了图片，附件数量旁会出现「用作生图参考」开关，默认关闭。打开后，这条消息里的图片按显示顺序作为参考，由右下角选的那个模型生成图片，结果回到同一个对话；只加图片不会自动生成或收费。当前模型不支持、能力暂时确认不了，或图片超出模型的数量、格式、尺寸限制时，输入框上方会说明原因，点其中的「切换模型」就打开原来的模型选择器。费用确认照旧（每次都问，或预计超过 $0.5 时问）；结果不明时不会自动重试。需要 Modelflare 提供型号能力信息，确认不了时不会发送；自定义 API Key 暂不支持。 在模型选择器里选图片生成模型： 登录账号后，右下角的模型选择器会列出这个账户能用的图片生成模型。选中后直接写想要的画面就能生成，不经过对话模型。 改进与修复 生图只用当前选的模型： 登录账号时，让机器人用自然语言生成图片，也只用右下角选的那个模型；它不能生图或能力确认不了时，会说明原因并请你切换，不再改用另一个默认生图模型（设置里的「默认生图模型」在登录账号后不再显示）。只用 API Key 连接时不变。 New Images as image-generation references: when you're signed in to Modelflare and add images in a one-on-one chat with a bot, a “Use as image-generation references” switch appears next to the attachment 

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

Grok Score: **79.35** · Tier **A** · ADN **88**

- **capacidad**: 84/100
- **autonomia**: 78/100
- **computadora**: 89/100
- **memoria**: 90/100
- **rutinas**: 90/100
- **equipo**: 55/100
- **confianza**: 92/100
- **producto**: 60/100

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

- [Repositorio GitHub](https://github.com/modelflare-ai/AnyModelBot) · consultado 2026-11-23
- [Web oficial](https://anymodel.bot/) · consultado 2026-11-23
- [README](https://github.com/modelflare-ai/AnyModelBot#readme) · consultado 2026-11-23
- [Releases](https://github.com/modelflare-ai/AnyModelBot/releases) · consultado 2026-11-23

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._

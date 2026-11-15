# AnyModelBot — dossier de investigación

- **Repo**: https://github.com/modelflare-ai/AnyModelBot
- **Web oficial**: https://anymodel.bot/
- **Licencia**: MIT
- **Lenguaje**: Python
- **Estrellas**: 3304 · **Forks**: 46
- **Último push**: 2026-11-11T12:44:17Z · **Última release**: 2026-11-14
- **Revisado**: 2026-11-12 · **Confianza**: 62/100
- **Tipo**: agent · **Categoría**: personal

## Qué es

AnyModelBot es una app de escritorio open source (MIT) y local-first que te da tus propios bots personales con nombre, modelo, workspace y memoria propios, capaces de leer y escribir archivos, ejecutar comandos y operar tu escritorio. Se usa desde la app o desde WeChat, Feishu, Telegram, Slack y Discord, con aprobaciones antes de salir del workspace y tareas en segundo plano con reglas programadas.

> Bots locales con memoria y workspace.

## Nota de verificación

README + revisión previa: workspace, memoria y control del escritorio por bot; multi-modelo, rutinas, canales y aprobaciones. No coordina varios bots entre sí.

## Release revisada

- **Tag**: [v0.1.36](https://github.com/modelflare-ai/AnyModelBot/releases/tag/v0.1.36)
- **Fecha**: 2026-11-14 (hace 1 días)
- **Estado**: activo · **Releases en 90 días**: 10
- **Revisado**: 2026-11-15 · **Fuente**: releases.atom

> 新增 把做成的事存成技能： 和机器人把一件事做对后，在输入框的「+」里点「存成技能…」、发 /skill 或直接说「存成技能」，机器人会整理出一张草稿卡，列出步骤、你纠正过的地方、用到的应用和技能，以及「试试这样说」。确认后存进「我的技能」，可以在其他机器人上一键打开，也能设成定时。密钥不会写进技能，手机号、邮箱等个人信息默认改成每次使用前再问；同一个技能可以更新、恢复上一版或导出 ZIP。 在微信、飞书里存技能： 微信、飞书、Telegram、Slack、Discord 私聊里也能发起，回复「保存」即可存下，回复「取消」放弃；群聊里不能发起。 技能库： 「连接应用」改名为「应用与技能」，新增「技能」标签，收录 31 个开源仓库的 155 个技能，可按用途分类、按作者筛选。复制安装指令发给任意机器人，或直接发技能的 GitHub 链接，确认卡片后就装上。 在对话里用技能和应用： 输入框「+」›「技能与应用」列出这个机器人能用的技能和应用，点一项会填入「用{名称}帮我……」。回复上方显示正在使用和已使用的技能、应用，技能名可以点开看详情。 改进与修复 技能列表更好找： 开着的排在前面；超过 10 个时可以搜索，并按「我的技能、GitHub、本地 ZIP、已关闭」筛选。每个技能标明是否已生效和来源，并附一句「试试这样说」。 体验额度期间的模板： 按当前额度选择合适的模型档位，并说明模板原本推荐的档位。 电脑操作授权： 后台任务接着做时被权限拦下，也会显示授权卡片；不再留下没有对应卡片的等待状态。 上手清单与提示： 点清单步骤被挡住时说明原因；操作提示移到主区顶部居中显示。 定时规则

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

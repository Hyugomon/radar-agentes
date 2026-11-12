[![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org)
[![Rust Edition](https://img.shields.io/badge/rust-2024_edition-orange.svg)](https://www.rust-lang.org/)
[![Ratatui](https://img.shields.io/badge/ratatui-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)](https://ratatui.rs)
[![Docker](https://img.shields.io/badge/docker-%23000000.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![CI](https://github.com/opencrabs/opencrabs/actions/workflows/ci.yml/badge.svg)](https://github.com/opencrabs/opencrabs/actions/workflows/ci.yml)
[![GitHub Stars](https://img.shields.io/github/stars/opencrabs/opencrabs?style=social)](https://github.com/opencrabs/opencrabs)

<a href="https://trendshift.io/repositories/22468?utm_source=trendshift-badge&amp;utm_medium=badge&amp;utm_campaign=badge-trendshift-22468" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/trendshift/repositories/22468/daily?language=Rust" alt="opencrabs/opencrabs — Trendshift #3 Repository Of The Day, Rust" width="250" height="55"/></a>
<a href="https://trendshift.io/repositories/22468?utm_source=trendshift-badge&amp;utm_medium=badge&amp;utm_campaign=badge-trendshift-22468" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/trendshift/repositories/22468/weekly?language=Rust" alt="opencrabs/opencrabs — Trendshift #20 Repository Of The Week, Rust" width="250" height="55"/></a>

# 🦀 OpenCrabs

**The autonomous, self-improving AI agent. Single Rust binary. Every channel.**

> Autonomous, self-improving multi-channel AI agent built in Rust.

```
    ___                    ___           _
   / _ \ _ __  ___ _ _    / __|_ _ __ _| |__  ___
  | (_) | '_ \/ -_) ' \  | (__| '_/ _` | '_ \(_-<
   \___/| .__/\___|_||_|  \___|_| \__,_|_.__//__/
        |_|

 🦀 The autonomous, self-improving AI agent. Single Rust binary. Every channel.

```

**Author:** [Adolfo Usier](https://github.com/adolfousier)

⭐ Star us on [GitHub](https://github.com/opencrabs/opencrabs) if you like what you see!

**Community funded.** No venture capital, no investors, no company behind it. The people who use OpenCrabs pay for the subscriptions, the inference and the credits that keep it running: see [🫶 Sponsors](#-sponsors).

---

## Table of Contents

- [📚 Documentation](#-documentation)
- [Why OpenCrabs?](#why-opencrabs)
- [📊 Benchmarks](#-benchmarks)
- [🎬 Onboarding Videos](#-onboarding-videos)
- [🎬 Demo](#-demo)
- [🖥️ Split Panes](#-split-panes)
- [🎯 Core Features](#-core-features)
- [🔄 Migrating from Other Tools](#-migrating-from-other-tools)
- [🌐 Supported AI Providers](#-supported-ai-providers)
- [🖼️ Image Generation & Vision](#-image-generation--vision)
- [📄 Document Generation](#-document-generation)
- [🤝 Agent-to-Agent (A2A) Protocol](#-agent-to-agent-a2a-protocol)
- [🔭 Remote Access (connect · pairing · routes)](#-remote-access-connect--pairing--routes)
- [🚀 Quick Start](#-quick-start)
- [🧙 Onboarding Wizard](#-onboarding-wizard)
- [🔑 API Keys (keys.toml)](#-api-keys-keystoml)
- [🔐 Secret Sanitization & Redaction](#-secret-sanitization--redaction)
- [🛡️ Security Controls](#️-security-controls)
- [🏠 Using Local LLMs](#-using-local-llms)
- [📝 Configuration](#-configuration)
- [🛠️ Configuration (config.toml)](#-configuration-configtoml)
- [🧠 Epistemic Engine](#-epistemic-engine)
- [♻️ Decision Cache (`[decisions]`)](#-decision-cache-decisions)
- [🧾 Audit Recording (`[features]`)](#-audit-recording-features)
- [🛡️ Safety Gates (~/.opencrabs/safety/)](#-safety-gates-opencrabssafety)
- [📋 Commands (commands.toml)](#-commands-commandstoml)
- [🔌 Dynamic Tools (tools.toml)](#-dynamic-tools-toolstoml)
- [💰 Pricing Customization (usage_pricing.toml)](#-pricing-customization-usage_pricingtoml)
- [🔧 Tool System](#-tool-system)
- [⌨️ Keyboard Shortcuts](#-keyboard-shortcuts)
- [🔍 Debug and Logging](#-debug-and-logging)
- [🧠 Brain System & 3-Tier Memory](#-brain-system--3-tier-memory)
- [🎯 /goal — Autonomous Goal Loop](#-goal--autonomous-goal-loop)
- [⏰ Cron Jobs](#-cron-jobs)
- [🏗️ Architecture](#-architecture)
- [📁 Project Structure](#-project-structure)
- [🛠️ Development](#-development)
- [🐛 Platform Notes](#-platform-notes)
- [🔧 Troubleshooting](#-troubleshooting)
- [🧩 Companion Tools](#-companion-tools)
- [⚠️ Disclaimers](#-disclaimers)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🫶 Sponsors](#-sponsors)
- [🙏 Acknowledgments](#-acknowledgments)
- [📞 Support](#-support)
- [✨ Stay Tuned](#-stay-tuned)

---

## 📚 Documentation

**Official docs:** [docs.opencrabs.com](https://docs.opencrabs.com) — comprehensive guides, architecture deep-dives, and reference material.

The docs and the landing at [opencrabs.com](https://opencrabs.com) are available in six languages: English, Português (PT-PT), Español, Français, Русский and Bahasa Indonesia. Pick one from the language switcher in the menu bar; untranslated paragraphs fall back to English rather than going missing.

### Getting Started
- [Installation & Quick Start](https://docs.opencrabs.com/getting-started/installation.html)
- [Onboarding Wizard](https://docs.opencrabs.com/getting-started/onboarding.html)
- [OpenCrabs Overview](src/docs/start/OPENCRABS.md)

### Reference
- [Architecture](src/docs/reference/ARCHITECTURE_2026_04_14.md)
- [Brain Constitution](src/docs/reference/BRAIN_CONSTITUTION.md)
- [Adding New Providers](src/docs/reference/ADDING_NEW_PROVIDERS.md)
- [Plan JSON Specification](src/docs/reference/plans/plan-json-spec.md)
- [Dynamic Workflows Guide](src/docs/reference/DYNAMIC_WORKFLOWS.md) — orchestrate agents with scripts: fan-out, pipelines, structured outputs, checkpointing
- [Decision Cache](src/docs/reference/DECISIONS.md): L1 exact-decision reuse ring, `[decisions]` tiers, shadow/live/off modes, accounting, release-day evaluation (#1648)

### Brain File Templates
- [SOUL.md](src/docs/reference/templates/SOUL.md) — personality and voice
- [AGENTS.md](src/docs/reference/templates/AGENTS.md) — workspace governance and hard rules
- [TOOLS.md](src/docs/reference/templates/TOOLS.md) — tool usage and skills
- [MEMORY.md](src/docs/reference/templates/MEMORY.md) — long-term memory
- [CODE.md](src/docs/reference/templates/CODE.md) — coding standards
- [SECURITY.md](src/docs/reference/templates/SECURITY.md) — security policies the agent follows (not the repo's vulnerability-disclosure policy, which is [/SECURITY.md](SECURITY.md))
- [BOOT.md](src/docs/reference/templates/BOOT.md) — startup and service config
- [USER.md](src/docs/reference/templates/USER.md) — user profile template
- [HEARTBEAT.md](src/docs/reference/templates/HEARTBEAT.md) — periodic checklist, read on demand or by a cron job

### Skills

All of these ship inside the binary, available as `/<name>` in every install, nothing to copy:

- [Security Audit](src/docs/reference/templates/skills/security-audit/SKILL.md)
- [Cost Estimate](src/docs/reference/templates/skills/cost-estimate/SKILL.md)
- [Repo Audit](src/docs/reference/templates/skills/repo-audit/SKILL.md)
- [Multi-Agent](src/docs/reference/templates/skills/multi-agent/SKILL.md)
- [Browser CDP](src/docs/reference/templates/skills/browser-cdp/SKILL.md)
- [A2A Gateway](src/docs/reference/templates/skills/a2a-gateway/SKILL.md)
- [Dynamic Tools](src/docs/reference/templates/skills/dynamic-tools/SKILL.md)

### Opt-in Skills

Not built in, so they do not reach every user. Copy a folder into `~/.opencrabs/skills/<name>/` and it shows up as `/<name>` for you only:

- [Motion Graphics](src/docs/reference/templates/optional-skills/motion-graphics/SKILL.md): tutorial videos with Remotion (storyboard, drawn UI, voice-over, subtitles). Install with `cp -r src/docs/reference/templates/optional-skills/motion-graphics ~/.opencrabs/skills/motion-graphics`.

### Cron Templates
- [Cron Jobs Guide](src/docs/reference/templates/cron/README.md)

### Command Templates (opt-in, LLM-flavored)
- [Commands Guide](src/docs/reference/templates/commands/README.md): copy-paste `commands.toml` fragments that call the LLM. The mechanical, zero-cost commands (`/architecture`, `/attach`) are built in and need no install.

---

## Why OpenCrabs?

OpenCrabs runs as a **single binary on your terminal** — no server, no gateway, no infrastructure. It makes direct HTTPS calls to LLM providers from your machine. Nothing else leaves your computer.

### OpenCrabs vs Node.js Agent Frameworks

| | **OpenCrabs** (Rust) | **Node.js Frameworks** (e.g. Open Claw) |
|---|---|---|
| **Binary size** | **34–36 MB** single binary, zero dependencies | **1 GB+** `node_modules` with hundreds of transitive packages |
| **Runtime** | None — runs natively | Requires Node.js runtime + npm install |
| **Attack surface** | Zero network listeners. Outbound HTTPS only | Server infrastructure: open ports, auth layers, middleware |
| **API key security** | Keys on your machine only. `zeroize` clears them from RAM on drop, `[REDACTED]` in all debug output | Keys in env vars or config. GC doesn't guarantee memory clearing. Heap dumps can leak secrets |
| **Data residency** | 100% local — SQLite DB, embeddings, brain files, all in `~/.opencrabs/` | Server-side storage, potential multi-tenant data, network transit |
| **Supply chain** | Single compiled binary. Rust's type system prevents buffer overflows, use-after-free, data races at compile time | npm ecosystem: typosquatting, dependency confusion, prototype pollution |
| **Memory safety** | Compile-time guarantees — no GC, no null pointers, no data races | GC-managed, prototype pollution, type coercion bugs |
| **Concurrency** | tokio async + Rust ownership = zero data races guaranteed | Single-threaded event loop, worker threads share memory unsafely |
| **Native TTS/STT** | Built-in local speech-to-text (whisper.cpp) and text-to-speech — ~130 MB total stack, fully offline | No native voice. Requires external APIs (Google, AWS, Azure) or heavy Python dependencies (PyTorch, ~5 GB+) |
| **Telemetry** | Zero. No analytics, no tracking, no remote logging | Server infra typically includes monitoring, logging pipelines, APM |

### What stays local (never leaves your machine)

- All chat sessions and messages (SQLite)
- Tool executions (bash, file reads/writes, git)
- Memory and embeddings (local vector search)
- Voice transcription in local STT mode (whisper.cpp, on-device)
- Brain files, config, API keys

### What goes out (only when you use it)

- Your messages to the LLM provider API (Anthropic, OpenAI, GitHub Copilot, etc.)
- Web search queries (optional tool)
- GitHub API via `gh` CLI (optional tool)
- Browser automation (optional, `browser` feature — auto-detects Chromium-based browsers via CDP, not Firefox)
- Dynamic tool HTTP requests (only when you define HTTP tools in `tools.toml`)

### 🔒 Zero Telemetry — Not Even Opt-In

**OpenCrabs does not phone home. Ever.**

No analytics. No tracking. No usage statistics. No remote logging. No crash reports. No "anonymous telemetry." Nothing.

Your data stays on your machine. Your conversations, your tools, your memory, your configuration, your API keys — all of it. The only outbound traffic is what you explicitly initiate: LLM API calls, web searches, GitHub commands, browser automation.

Other AI harnesses silently collect usage data, performance metrics, and behavioral analytics. OpenCrabs makes a different bet: **what happens on your machine stays on your machine.**

This isn't a privacy policy checkbox. It's an architectural decision. There is no telemetry code to disable, no opt-out flag to set, no analytics service to block. There's simply nothing to send.

---

## 📊 Benchmarks

Measured on live workspaces, not fixtures. Full reports, including what each one explicitly did **not** measure, live in [`src/eval/results/`](src/eval/results/).

### Memory retrieval ([full report](src/eval/results/memory-retrieval-2026-08-12.md))

Every figure was measured on a live workspace: 9 brain files, 158 daily notes, 93 session documents, 258 MB.

| Metric | Before | After |
|---|---|---|
| Rule-lookup hit rate (`scope="brain"`) | 2/5 | **5/5** |
| Cost of one rule lookup | 33,443 chars (whole `AGENTS.md`) | **~1,000 chars (−97%)** |
| precision@2, per-turn recall ranking | 0.625 | **0.917** |
| Multilingual precision/recall@2 (6 languages) | not measured | **1.000 / 1.000** |
| Worst index staleness | 15 hours | **current (refresh on write and on search)** |
| Empty placeholder vectors | 495 | **0** |
| Indexed vector rows | 1,944 | **5,744** |

End-to-end check: a fact from **54 days back** (why a monthly invoice cron job had missed its schedule) was recovered in 9 steps, 1m 40s, starting from `memory_search` and reading the primary sources it located. Full chain in the [report](src/eval/results/memory-retrieval-2026-08-12.md).

### Recall quality ([full report](src/eval/results/memory-recall-v1.md))

Fixture-scored (13-section corpus, 12 positive + 12 negative queries), then sanity-checked against a real 156-section memory file and 437 real user messages:

| Metric | Before (hit count ≥ 2) | After (normalized BM25 ≥ 0.35) |
|---|---|---|
| precision@2 | 0.625 | **0.917** |
| recall@2 | **1.000** | 0.917 |
| False-positive rate | 0.417 | **0.250** |
| Memory injected into messages (real corpus) | 89.5% | **17.4%** |

Recall falling is the point: the old rule answered almost everything, which is exactly why its precision was poor. The six-language eval (en, ru, es, pt, fr, id) scores 1.000 / 1.000 with per-language recall 3/3, and building it caught two real tokenizer bugs: accent-sensitive matching and Cyrillic combining marks.

### Chunked embeddings ([full report](src/eval/results/memory-chunking.md))

25.5% of vector rows were empty placeholders, making those documents invisible to the semantic half of hybrid search, and nothing over the size guard had ever been chunked. Both fixed; ranking is now per chunk instead of per averaged document vector.

### Structural code search ([full report](src/eval/results/code-graph-structural-v1.md))

Measured on this repository (1,902 `.rs` files), ground truth locked by grep before any blind search. The symbol graph (`code-graph`, on by default) adds a structural lane beside FTS5+vector:

| Query class | Before (FTS5+vector) | After (+ symbol graph) |
|---|---|---|
| Callers of a function | text chunks, no caller info | **exact callers, file + line** |
| Callers, generic-heavy path | text chunks | **5/5** callers, file + line ([#1328](https://github.com/opencrabs/opencrabs/pull/1328)) |
| Duplicate implementations | 2 of 3 found | **3 of 3**, exact locations |
| Module structure | file content only | + full function inventory |
| Concept lookup | strong | unchanged — text lane untouched |

Graph: 15,769 symbols / 95,601 call edges / 5,649 imports, full-repo index in 12.1 s. Four extractor defects found during and after the run (receiver-qualified callees, enum-variant noise, test-name ranking, nested-call/impl recursion) are fixed — regression-tested in the report.

### Latency (criterion, release build)

`cargo bench --bench memory`, in-memory SQLite: FTS search 2.57 ms at 50 docs, vector search 1.02 ms, hybrid RRF fusion 3.49 ms, indexing 214 µs per file. Full tables in the [Development section](#-development).

---

## 🎬 Onboarding Videos

| OS | Quick start | Advanced setup (Telegram, voice, images) |
|----|-------------|------------------------------------------|
| macOS | [Install in under 2 minutes (Homebrew)](https://youtu.be/1_Ta9BFxlSk) | [Advanced setup on macOS](https://youtu.be/Lq891K2GFzU) |
| Ubuntu/Linux | [Install in 3 minutes (one paste)](https://youtu.be/sXfaKfQiAxo) | [Advanced setup on Linux](https://youtu.be/uZLwzerkQt0) |
| Windows | [Install in 2 minutes (PowerShell)](https://youtu.be/kY8SW83obOc) | [Advanced setup on Windows](https://youtu.be/TZn1aYgpRuI) |

All videos: [youtube.com/@OpenCrabs](https://www.youtube.com/@OpenCrabs)

## 🎬 Demo

https://github.com/user-attachments/assets/7f45c5f8-acdf-48d5-b6a4-0e4811a9ee23

## 🖥️ Split Panes

![Split Panes](src/assets/split-panes.png)

---

## 🎯 Core Features

### AI & Providers
| Feature | Description |
|---------|-------------|
| **Multi-Provider** | **OpenCrabs** (built in: no account or key to set up), **Xiaomi MiMo**, Anthropic Claude, OpenAI, GitHub Copilot (uses your Copilot subscription), OpenRouter (400+ models), MiniMax, Google Gemini, z.ai GLM (General API + Coding API), Moonshot Kimi (API plan + Coding plan), Claude CLI, OpenCode CLI, Codex CLI (uses your ChatGPT/Codex subscription), Qwen Native (free OAuth with multi-account rotation), Qwen Code CLI (1k free req/day), and any OpenAI-compatible API (Ollama, LM Studio, LocalAI). Model lists fetched live from provider APIs. New models available instantly. Custom provider dialog: paste-by-default for API keys, Enter-to-load live models, typed-not-in-list models accepted and merged. Each session remembers its provider + model and restores it on switch |
| **Fallback Providers** | Configure a chain of fallback providers — if the primary fails, each fallback is tried in sequence automatically. Any configured provider can be a fallback. Config: `[providers.fallback] providers = ["openrouter", "anthropic"]` |
| **Per-Provider Timeouts** | `timeout_secs` caps a non-streaming request (one that buffers a whole body); it never caps a stream. `stream_idle_timeout_secs` is the only stream timer; it caps inter-chunk silence before the stream is treated as dropped and retried, so a long turn that keeps delivering is never cut. Defaults when unset: 3600s for CLI and local providers, 120s for every OpenAI-compatible remote provider (z.ai included), 20s for the native Anthropic and Gemini families. A separate handshake budget bounds connect + TLS + response headers on each send, and `timeout_secs` cannot move it: 600s for CLI providers, 90s for local servers, 120s for the built-in OpenCrabs endpoint (a proxy in front of upstream models, so a slow upstream is not a dead one), 60s for every other cloud provider. The built-in endpoint rides the same retry ladder as every other provider, so every handshake timeout is retried until the attempts are spent |
| **Per-Provider Vision** | Set `vision_model` per provider — the LLM calls `analyze_image` as a tool, which uses the vision model on the same provider API to describe images. The chat model stays the same and gets vision capability via tool call. Gemini vision takes priority when configured. Auto-configured for known providers (e.g. MiniMax) on first run |
| **Prompt Caching** | Caches the stable context prefix (system prompt, brain files, earlier turns) on every caching-capable provider — Anthropic native (default), OpenAI/OpenRouter (`cache_enabled`), Qwen/Alibaba (zero-config auto), Xiaomi (server-side). Averaging ~87% cache efficiency in real use; watch it live in the Cache Efficiency card of `/usage`. Big reason a larger context window stays affordable |
| **Context Window & Auto-Compaction** | Per-provider `context_window` override (default 200k, works on every provider except the built-in one, whose window is fixed at 200k); transparent auto-compaction at 65% (soft, background) / 90% (hard) of the window gives effectively unlimited session memory with no manual clearing |
| **Real-time Streaming** | Character-by-character response streaming with animated spinner showing model name and live text |
| **Local LLM Support** | Run with LM Studio, Ollama, or any OpenAI-compatible endpoint — 100% private, zero-cost |
| **Usage Dashboard** | Per-message token count and cost displayed in header; `/usage` opens an interactive dashboard with daily activity charts, cost breakdowns by project/provider/model/activity, core tool usage stats, a `N% cache` column on the per-model rows showing the share of that model's recorded tokens that came from cache, and period filtering (Today/Week/Month/All-Time). Sessions are auto-categorized on startup (Development, Bug Fixes, Features, Refactoring, Testing, Documentation, CI/Deploy, etc.). Estimated costs for historical sessions shown as `~$X.XX` |
| **Context Awareness** | Live context usage indicator showing actual token counts (e.g. `ctx: 45K/200K (23%)`); auto-compaction at 70% with tool overhead budgeting; accurate tiktoken-based counting calibrated against API actuals |
| **3-Tier Memory** | (1) **Brain MEMORY.md** — user-curated durable memory, loaded on demand in the main session (see [Brain Files](#brain-files--one-file-one-job)), (2) **Daily Logs** — auto-compaction summaries at `~/.opencrabs/memory/YYYY-MM-DD.md`, (3) **Hybrid Memory Search** — FTS5 keyword search + vector embeddings combined via Reciprocal Rank Fusion. Three modes: **Local** (embeddinggemma-300M, 768-dim, no API key, works offline), **API** (any OpenAI-compatible `/v1/embeddings` endpoint: OpenAI, Ollama, Jina, etc.), or **FTS5-only** (no embeddings, VPS-friendly, ~0 RAM overhead). Auto-detects VPS environments and disables local embeddings |
| **Dynamic Brain System** | System brain assembled from workspace MD files (SOUL, USER, AGENTS, TOOLS, MEMORY) — all editable live between turns |
| **Multi-Agent Orchestration** | Spawn typed child agents (General, Explore, Plan, Code, Research) for parallel task execution. Five tools: `spawn_agent`, `wait_agent`, `send_input`, `close_agent`, `resume_agent`. Each type gets a role-specific system prompt and filtered tool registry. Configurable subagent provider/model. Children run in isolated sessions with auto-approve — no recursive spawning |
| **Recursive Self-Improvement** | ⚠️ Experimental. Automatic feedback ledger tracks every tool execution, user correction, and provider error. Three tools: `feedback_record` (log observations), `feedback_analyze` (query patterns), `self_improve` (autonomously apply brain file changes — no human approval). Changes logged to `~/.opencrabs/rsi/improvements.md` with daily archives. Startup digest injects performance summary into system prompt. **Upstream template sync** — automatically detects new releases, fetches updated brain file templates from the repo, diffs against local files, and appends only new sections (never overwrites user customizations). Backups created before every merge. Zero tokens spent when version unchanged. Zero setup — works out of the box via auto-migration |

### Multimodal Input
| Feature | Description |
|---------|-------------|
| **Image Attachments** | Paste image paths or URLs into the input — auto-detected and attached as vision content blocks for multimodal models. Also supports pasting raw image data from the clipboard (copied from a browser, screenshot tool, or any app) — on macOS via the clipboard as PNG, on Linux via wl-paste/xclip. The bytes are written to a temp file and routed through the existing image pipeline |
| **Video Attachments** | Send a video on any channel (mp4, m4v, mov, webm, mkv, avi, 3gp, flv) or paste a video path in the TUI — the agent calls the `analyze_video` tool, which routes through Google Gemini's multimodal video API (inline ≤18 MB, resumable Files API for larger). Requires `image.vision.enabled = true` with a Gemini API key in `config.toml`. Phase 1 is Gemini-native; a frame-extraction fallback for non-Gemini providers (ffmpeg → analyze_image per frame) is on the roadmap |
| **Universal Paste & Drop** | Paste or drop a file of any type into the input (v0.5.4): one shared attachment router accepts every file type (#1740) and classifies common types (code, docs, archives, data) so each lands in the right pipeline (#1743) |
| **PDF Support** | Attach PDF files by path — native Anthropic PDF support; for other providers, text is extracted locally via `pdf-extract`. **Scanned / image-only PDFs** (no embedded text) are rendered to page images so vision models can read them — this needs **poppler** (`pdftoppm`) on the system: macOS `brew install poppler`, Debian/Ubuntu `apt install poppler-utils`, Fedora `dnf install poppler-utils`. The one-line installer sets this up automatically; without it, the PDF is still saved and its path handed to the agent (text extraction and the `pdf_to_images` tool can be retried once poppler is present) |
| **Document Parsing** | Built-in `parse_document` tool extracts text from PDF, DOC, DOCX, XLSX, XLSM, XLSB, XLS, ODS, CSV, HTML, TXT, MD, JSON, XML. All native Rust, zero external services: PDF text via `pdf-extract`, legacy Word 97-2003 `.doc` via `rwml`, DOCX/XML via a `quick-xml` streaming walk, spreadsheets (all five Excel/ODS variants) via `calamine`, CSV via `csv`. Scanned/image-only PDFs fall back to page-image rendering for vision models (see **PDF Support** above). Spreadsheet files are parsed into readable table format with sheet headers. Reading legacy binary `.ppt` is out of scope by design |
| **Document Generation** | Built-in `generate_document` tool creates XLSX (live Excel formulas), DOCX, and PDF natively in Rust with zero host dependencies, plus PPTX via python-pptx when present. Full styling per format: brand colors, page headers/footers with logos and page numbers, zebra tables, frozen headers, autofilters, number formats, PowerPoint brand templates. Image blocks embed PNG/JPEG inline with optional captions in PDF and DOCX. Generated files are delivered as downloadable attachments on Telegram/WhatsApp/Discord. See [Document Generation](#-document-generation) |
| **Voice (STT)** | Voice notes transcribed via **Groq Whisper API** (`whisper-large-v3-turbo`), any **OpenAI-compatible STT endpoint** (set `base_url` + `model` under `[providers.stt.openai_compatible]` — works with self-hosted Whisper, Deepgram-compatible proxies, etc.), **Voicebox STT** (self-hosted open-source voice stack — point the `base_url` of `[providers.stt.voicebox]` at your instance; 2s liveness probe runs before each request so a dead voicebox fails fast), or **Local** whisper.cpp via `whisper-rs` (runs on-device, Tiny 75 MB / Base 142 MB / Small 466 MB / Medium 1.5 GB, zero API cost). All dispatched through a single entry point so every channel gets the same provider priority chain — and an optional `[providers.stt].fallback_chain` lets the user codify "if my local voicebox is down, try Groq, then OpenAI" so transient outages auto-route to the next provider with zero user action. Voice notes keep working: transcription runs through whichever STT engine above is configured, and the built-in OpenCrabs provider transcribes out of the box. It answers no `/v1/audio/transcriptions` route, so the audio travels as an `input_audio` part on `/v1/chat/completions` alongside the transcription instruction, and the shipped config sets `stt_model = "qwen3.8-omni-flash"` there. Setting `stt_model` on any other active provider sends transcription through that provider's own endpoint, ahead of `[providers.stt.openai_compatible]`. Choose mode in `/voice`. Included by default |
| **Voice (TTS)** | Agent replies to voice notes with audio via **OpenAI TTS API** (`gpt-4o-mini-tts`), any **OpenAI-compatible TTS endpoint** (set `base_url` + `model` + `voice` under `[providers.tts.openai_compatible]` — works with self-hosted Coqui/Bark, ElevenLabs-compatible proxies, etc.), **Voicebox TTS** (async `/generate` → poll `/generate/{id}/status` → fetch audio; set the `base_url` + `profile_id` of `[providers.tts.voicebox]`), or **Local** Piper TTS (runs on-device via Python venv, Ryan / Amy / Lessac / Kristin / Joe / Cori, zero API cost). All outputs normalised to OGG/Opus via `ensure_opus` before delivery — consistent format across every channel regardless of backend. `[providers.tts].fallback_chain` provides the same auto-failover behaviour as the STT side. The built-in OpenCrabs provider does not serve synthesis yet: it answers no `/v1/audio/speech` route, so the shipped config leaves `tts_model` unset there. Setting `tts_model` on any active provider that exposes the route sends speech through that provider's own endpoint, ahead of `[providers.tts.openai_compatible]`. A voice note is still transcribed and still answered when no synthesis engine is available: the reply arrives as text. |
| **Attachment Indicator** | Attached images show as `[IMG1:filename.png]` in the input title bar |
| **Image Generation** | Agent generates images with the `generate_image` tool. The default route is Google Gemini (`gemini-3.1-flash-image-preview` "Nano Banana"), enabled via `/image`. The built-in OpenCrabs provider serves it out of the box on fresh installs (`gemini-2.5-flash-image`). Returned as native images/attachments in all channels |

#### Vision setup — two paths, pick one

> **Using Xiaomi?** Share images and OpenCrabs automatically routes to MiMo's multimodal model — no separate vision key needed.
>
> **Using OpenCrabs?** The built-in provider sets `vision_model = "deepseek-v4.1-flash"` on fresh installs, so attached images work on day 0 with no setup. Upgraded installs keep their existing `config.toml`; add `vision_model = "deepseek-v4.1-flash"` under `[providers.opencrabs]` to turn it on.

**Path A (preferred, simpler).** Set `vision_model = "<model>"` on your active `[providers.<name>]` block in `config.toml`. Works for every built-in and custom provider — the agent calls the vision model on the **same provider endpoint** via the `analyze_image` tool, so no second API key is needed. Pick a vision-capable model on that provider (DeepSeek chat models like `deepseek-v4-flash` reject `image_url` content, so point `vision_model` at a vision-capable variant of the same family — every provider has at least one).

```toml
[providers.opencode]
enabled = true
vision_model = "mimo-v2-omni"  # any vision-capable model on this provider
```

**Path B (fallback).** Enable Gemini globally. Use this only when your active provider has no vision-capable model. Easiest way: run `/image` and the wizard walks you through. Manual setup:

```toml
# config.toml
[image.vision]
enabled = true
model = "gemini-3.1-flash-image-preview"
provider = "openrouter"  # Optional: force vision to use a specific provider (bypasses enabled gate)
```

```toml
# keys.toml  ← the Gemini key MUST live here, NOT in config.toml
[image]
api_key = "YOUR_GEMINI_KEY"
```

> **Gotcha:** `[image.vision] api_key = "..."` in `config.toml` is silently ignored — the field carries `#[serde(skip)]` for security. Use `keys.toml` `[image]` section, or `[providers.image.gemini]` in config.toml + the key in keys.toml.

> **Pinning vision to a provider:** set `[providers.fallback] vision = ["name"]` to try that provider first for `analyze_image` and `analyze_video`, regardless of its `enabled` flag (vision needs only `vision_model` plus a key). Names follow the same rule as every other provider key: the bare section name, so `[providers.custom.myprovider]` is `"myprovider"`. An entry that does not resolve is skipped with a warning and resolution falls through to the normal provider scan. There is no `[image.vision] provider` key; that section configures the Gemini backend only.

> **Pinning generation to a provider:** `[providers.fallback] generation = ["name"]` is the same mechanism for `generate_image`, resolved over each provider's `generation_model` instead of `vision_model`. Order per request: the session's current provider, then this chain, then the global Gemini `[image.generation]` section strictly last — and only that Gemini leg is gated by `image.generation.enabled`; a provider route registers the tool even with the flag off. Custom providers need an explicit `base_url` (never guessed); any OpenAI-compatible `/images/generations` endpoint works (OpenRouter, Together, DashScope/Qwen-Image, vLLM, …). Quick setup for the active provider: `/image generation <model>`.

**Diagnostic:** when vision is unavailable for any reason, `is_vision_available` logs the exact cause at INFO level in `~/.opencrabs/logs/opencrabs.YYYY-MM-DD` — search for `target=vision`.

#### Context window & auto-compaction (effectively unlimited memory)

OpenCrabs never makes you start a fresh session to "clear context." Instead it auto-compacts: as a session's history approaches the model's context window, it summarizes the older turns in place and keeps going. Two tiers:

- **65% — soft trigger:** spawns a background LLM compaction that summarizes history back down to ~65% of the budget. Non-blocking — the conversation keeps streaming.
- **90% — hard trigger:** synchronous compaction before the next request, so a single turn can never overflow the window.

The triggers are **percentages of the effective window**, so they scale to whatever you set: at the 200k default compaction kicks in around 130k; at a 1M window, around 650k.

It's **transparent** — most of the time you won't notice it happen at all. Occasionally you'll catch a brief inline notice while it summarizes (the agent tends to mention it dynamically, in its own voice), then the conversation carries on with the older turns condensed. You never have to start over or manually clear anything.

**The budget defaults to 200,000 tokens** — the battle-tested sweet spot: large enough for long sessions, small enough to keep each request fast and cheap. Override it **per provider** in `config.toml`:

```toml
[providers.xiaomi]
context_window = 1000000   # raise the budget; compaction still triggers at 65% / 90% of it

[providers.anthropic]
context_window = 1000000   # native providers too — Anthropic, Gemini, and the CLI providers
```

This override works for **every provider** — OpenAI-compatible (custom, xiaomi, qwen, openrouter, minimax, …) and the native Anthropic, Gemini, and CLI providers. A provider with no override inherits the 200k default. The one exception is the **built-in OpenCrabs provider**, whose window is fixed at 200k: it is free and serves one model, so `context_window` is ignored there, both under `[providers.opencrabs]` and in any `[providers.custom.*]` section pointed at `inference.opencrabs.com`.

> **Sizing guidance.** 200k is the battle-tested sweet spot for essentially **every cloud model**. Going bigger has two real downsides — **cost** and **context loss**:
>
> - **Cost** is the lesser one, and it's softened by caching: OpenCrabs uses prompt caching across every caching-capable provider (currently averaging ~87% efficiency), and a long context is mostly an unchanged prefix served from cache — so a bigger window costs far less than the raw token count suggests.
> - **Context loss** is the one to watch: most models degrade as the window fills — they lose track of the middle and recall less reliably. Only the latest SOTA models hold large context robustly: closed (Opus 4.7 / 4.8, Fable 5, GPT-5.5, Gemini 3.1, …) or open (Qwen 3.7, Kimi K2.7, MiMo V2.5, GLM 5.2, DeepSeek V4, and the newer releases that keep coming from these and other labs). So raise `context_window` mainly on those frontier models; on anything older or smaller, staying near 200k keeps answers sharper.
>
> **Local models want less:** 128k is a good sweet spot — go **lower** if your machine is tight on resources or you start noticing hallucinations/fabrications, and **higher** only if you have more than 32GB of RAM and have tested your model at a larger window. Not sure what fits your setup? Reach out to Adolfo for suggestions/support, or open a [GitHub discussion](https://github.com/opencrabs/opencrabs/discussions).
>
> **Leave auto-compaction on** — it's been battle-tested over months and needs no babysitting. Only run a *manual* compaction (the `/compact` command) if you have a specific, strong reason to summarize early; otherwise let it manage itself.

#### Prompt caching (every caching-capable provider)

A long context is mostly a **stable prefix** — system prompt, brain files, earlier turns rarely change between requests. OpenCrabs caches that prefix wherever the provider supports it, so you pay full price for it once and a fraction on every reuse. Across real usage it's currently averaging **~87% cache efficiency**, which you can watch live in the **Cache Efficiency** card of `/usage`. This is the main reason a larger `context_window` costs far less than its raw token count suggests.

How it turns on depends on the provider:

- **Anthropic** — native prompt caching, on by default: the `cache_control: ephemeral` markers and the caching beta header are added automatically to the system prompt and tools.
- **OpenAI / OpenAI-compatible** — OpenAI caches automatically server-side. **OpenRouter caches by default too** — OpenCrabs enables it automatically, so there's no flag to discover; set `cache_enabled = false` only if you specifically want to opt out.
- **Qwen / Alibaba** — auto-enabled, zero-config (detected by endpoint or a `qwen-` model name; unlocks Alibaba's explicit context cache, ~90% off on hits). See the Qwen note further below.
- **Xiaomi (MiMo)** — caches automatically server-side; nothing to configure.

```toml
[providers.openrouter]
enabled = true
# Caching is ON by default — uncomment only to opt out:
# cache_enabled = false
```

**About the TTL — it's system-controlled.** The prompt-prefix caching that drives that ~87% (Anthropic native, Qwen/Alibaba, Xiaomi) uses a **provider-fixed 5-minute TTL that OpenCrabs does not expose** — you can't change it, and you don't need to. It **renews on every cache hit**, so in an active session each message keeps the prefix warm and it survives the *whole* session, however long, as long as you're not idle for more than 5 minutes; only an idle gap longer than that expires it, and the next message simply re-creates it once. The short TTL is the safeguard: a long TTL would keep the cache **alive on the provider's servers during idle time**, which you pay to keep stored — exactly how caching bills run away (an idle cache left alive for days can rack up serious charges). Keeping it fixed protects everyone, especially non-technical users, by default.

The one user-settable TTL is `cache_ttl` (default 300s, range 1-86400), which sets OpenRouter's cache TTL via the `X-OpenRouter-Cache-TTL` header. OpenRouter caching is on by default with this conservative 300s; it does **not** touch the prompt-prefix caches above. Leave it at the default unless you specifically understand the cost tradeoff of a longer TTL (a longer one keeps the cache alive longer at standing cost).

#### Changing provider settings: edit the file, or just ask

`vision_model`, `context_window`, provider keys, allowlists — any setting — can be changed two ways, and **neither needs a restart**:

- **Edit `config.toml` / `keys.toml` directly.** A file watcher hot-reloads on save, so the running TUI *and* the headless daemon both pick the change up on the next message — provider swap, tool re-registration, context budget, commands, and skills all update live.
- **Ask OpenCrabs in natural language** — e.g. *"set my context window to 1M"*, *"use mimo-v2-omni for vision on xiaomi"*, *"add my OpenRouter key"*. It writes the change through the `config_manager` tool (`write_config`), and if the automatic hot-reload doesn't pick the save up for any reason, it can run `config_manager reload` to force a fresh load from disk on the spot.

### Messaging Integrations
| Feature | Description |
|---------|-------------|
| **Telegram Bot** | Full-featured Telegram bot — owner DMs share TUI session, groups get isolated per-group sessions (keyed by chat ID). Photo/voice support (STT transcribes incoming voice notes; TTS replies as OGG/Opus voice notes via `send_voice` when input was audio). Allowed user IDs, allowed chat/group IDs, per-group allow lists (`[channels.telegram.groups.<id>]`), `respond_to` filter (`all`/`dm_only`/`mention`/`auto`, global or per-group). Passive group message capture — all messages stored for context even when bot isn't mentioned |
| **Telegram Userbot (experimental)** | Feature-gated, opt-in, receive-only MTProto companion. Experimental: merged from #1209 wi
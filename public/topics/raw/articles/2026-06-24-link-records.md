---
title: Sovereign AI Club - June 24, 2026 - Source Link Records
created: 2026-06-16
updated: 2026-06-24
type: summary
tags: [source-record, meetup]
sources: []
---

# Sovereign AI Club - June 24, 2026 - Source Link Records

## Local Builds & Projects

### Ben turns Bwen into Qwenstradamus
- Post: https://x.com/benthecarman/status/2069442971070566874
  - Title: "Ben Carman launches qwenstradamus"
  - Type: X post
  - Access: 2026-06-23
  - Notes: Ben's June 23 announcement that qwenstradamus.com turns his Bwen process into a paid service for training a downloadable personal model from a user's own tweets. FXTwitter metadata showed 3,656 views, 27 likes, 2 reposts, 8 replies, and 9 bookmarks.
- Post: https://x.com/benthecarman/status/2068796180339851429
  - Title: "Training a model on my tweets"
  - Type: X article
  - Access: 2026-06-23
  - Notes: Ben's June 21 build writeup describing the original bwen:14b process: Qwen3-14B fine-tune, historical tweets plus handwritten prompts, tweet embedding and theme clustering, 554 themes collapsed to 51, roughly 300 hand prompts, LoRA training, and retrieval over the original tweet database.
- Source: https://qwenstradamus.com/
  - Title: "qwenstradamus - a model that tweets like you"
  - Type: Product page
  - Access: 2026-06-23
  - Notes: Service page metadata says it trains an AI model on a user's own tweets that writes in their voice, then lets the user download it.
- Source: https://huggingface.co/benthecarman/bwen-14b
  - Title: "benthecarman/bwen-14b"
  - Type: Model card
  - Access: 2026-06-23
  - Notes: Hugging Face model card for Ben's Qwen3-derived personal voice model. API metadata on June 23 showed creation on June 21, 16 downloads, GGUF and LoRA tags, `base_model:unsloth/Qwen3-14B`, and dataset link to `benthecarman/bwen-dataset`.
- Source: https://huggingface.co/datasets/benthecarman/bwen-dataset
  - Title: "benthecarman/bwen-dataset"
  - Type: Dataset card
  - Access: 2026-06-23
  - Notes: Hugging Face dataset card for the tweet/prompt training dataset behind bwen. API metadata on June 23 showed creation on June 21, 27 downloads, and tags for text generation, Twitter, voice cloning, and personal data.
- Repo: https://github.com/benthecarman/bwen
  - Title: "benthecarman/bwen"
  - Type: Repository
  - Access: 2026-06-23
  - Notes: Public source repo for the bwen training pipeline; `git ls-remote` resolved HEAD to `cd58bb5c355516913d1b1cec83f79b92e7b70c2c`.

### OpenAgents pays the training run in sats
- Post: https://x.com/OpenAgents/status/2067700091750879691
  - Title: "Episode 238: The Training Run Begins"
  - Type: Official X post
  - Access: 2026-06-24
  - Notes: OpenAgents launch post for the Tassadar model training run. X oEmbed text says the run pays compute providers in Bitcoin and is the first public training run for Percepta's "LLM-computer" architecture.
- Source: https://openagents.com/forum/t/e56dffa7-5166-496f-9458-11fcfe150e36
  - Title: "Pylon v1.0.0 is live - install it, join the Tassadar run, help us shake out the basics"
  - Type: Forum thread
  - Access: 2026-06-24
  - Notes: Public thread Christopher David pointed the meetup chat toward. The thread records Pylon v1.0.0 launch, the initial "no claimable window" catch, self-serve claiming opening on `run.tassadar.executor.20260615`, first verified self-serve worker/validator pair, and patches through v1.0.5.
- Source: https://openagents.com/api/public/tassadar-run-summary
  - Title: "OpenAgents public Tassadar run summary"
  - Type: Live JSON status
  - Access: 2026-06-24
  - Notes: Public run projection showed `runState: active`, objective "Grow the Tassadar verified-trace corpus via paid executor-trace work, verified by exact replay", `paymentMode: operator_approved_small_sats`, 21 active windows, 9 assigned contributors, 12 verified work challenges, and 5 settled receipts totaling 1,020 sats.
- Source: https://openagents.com/api/public/pylon-stats
  - Title: "OpenAgents public Pylon stats"
  - Type: Live JSON status
  - Access: 2026-06-24
  - Notes: Public Pylon stats showed status live, 86 total registered Pylons, 7 seen in the last 24 hours, 2 online/wallet-ready/assignment-ready/sellable now, 9 training assigned contributors, and receipt-backed public real sats settled totals. Counts are live-at-read and should be rechecked before quoting later.
- Source: https://openagents.com/
  - Title: "OpenAgents"
  - Type: Product page
  - Access: 2026-06-24
  - Notes: Homepage currently points to "Join the Tassadar training run" and exposes public JSON discovery endpoints for homepage data, Pylon stats, product promises, forum launch status, and the capability manifest.
- Source: https://oslofreedomforum.com/speaker/christopher-david/
  - Title: "Christopher David - Oslo Freedom Forum"
  - Type: Profile
  - Access: 2026-06-24
  - Notes: Public profile identifying Christopher David as founder and CEO of OpenAgents; used only to support the local person/entity context.

### HRF turns AI hackathons into an activist training pipeline
- Post: https://x.com/gladstein/status/2066869619902578776
  - Title: "Alex Gladstein announces HRF AI mini-doc"
  - Type: X post
  - Access: 2026-06-24
  - Notes: June 16 mini-doc launch post from Alex Gladstein. Search/oEmbed text says HRF began filming a mini-doc about its AI program 18 months ago and frames the program as moving from the idea that AI should help freedom to helping dissidents scale their work.
- Video: https://www.youtube.com/watch?v=JkmXxLmC1Uo
  - Title: "HRF's AI Agent Camps: Supercharging Activism with AI"
  - Type: YouTube video
  - Access: 2026-06-24
  - Notes: HRF mini-doc highlighting the first 18 months of the AI for Individual Rights program and the movement to use AI in service of human rights defenders.
- Source: https://hrf.org/latest/hrfs-ai-for-individual-rights-newsletter-10/
  - Title: "HRF's AI for Individual Rights Newsletter #10"
  - Type: Newsletter
  - Access: 2026-06-24
  - Notes: June 15 HRF newsletter says Agent Camp is a hands-on program for human rights defenders to deploy open-source AI agents; it also reports that the Oslo Freedom Forum AI Lounge helped participants build more than 100 websites in two days.
- Source: https://hrf.org/program/ai-for-individual-rights/
  - Title: "AI for Individual Rights"
  - Type: Program page
  - Access: 2026-06-24
  - Notes: HRF program page frames AI for Individual Rights around open-source, privacy-protecting AI tools for dissidents, and lists Agent Camp plus AI Hack for Freedom as program initiatives.
- Source: https://hrf.org/latest/hrf-sponsors-second-edition-of-ai-hack-for-freedom-in-nashville-tn-may-9-10/
  - Title: "HRF Sponsors Second Edition of AI Hack for Freedom in Nashville, TN, May 9-10"
  - Type: Press release
  - Access: 2026-06-24
  - Notes: May 8 HRF release says AI Hack for Freedom II paired eight human rights and democracy advocates with open-source developers. It also says activists prepared through a San Diego Agent Camp run by HRF and Finite using Hermes, OpenClaw, OpenCode, and Finite.Computer.
- Source: https://hrf.org/latest/announcing-the-winners-of-ai-hack-for-freedom-ii/
  - Title: "Announcing the Winners of AI Hack for Freedom II"
  - Type: Press release
  - Access: 2026-06-24
  - Notes: May 13 HRF results post says developers used AI agents to prototype tools that otherwise would have taken months, prizes were paid in Bitcoin, and Agent Camp equipped activists to keep building after the hackathon.

## Agent Infrastructure

### Hermes Agent gets a Stripe wallet
- Post: https://x.com/NousResearch/status/2066647737613832624
  - Title: "Nous Research announces Stripe skills for Hermes Agent"
  - Type: Official X post
  - Access: 2026-06-16
  - Notes: Nous Research's June 15 announcement that Hermes Agent can buy things, pay per-call APIs, and provision SaaS with configurable safety limits on every action. 338.5K views, 4.1K likes, 325 reposts, 134 quotes, 1.3K bookmarks.
- Source: https://stripe.com/blog/stripe-projects-adds-new-agents-providers-developer-controls
  - Title: "Stripe Projects adds new agent integrations, more providers, and custom developer controls"
  - Type: Official product blog
  - Access: 2026-06-23
  - Notes: Stripe's June 11 Projects update says Hermes, Factory Droids, and Warp agents can provision infrastructure directly, adds 16 new providers for 49 total, and adds per-provider spend limits plus isolated credentials for development/staging/production.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/skills/optional/payments/payments-stripe-link-cli
  - Title: "Stripe Link Cli - Agent payments via Stripe Link - cards, SPT, approvals"
  - Type: Hermes documentation
  - Access: 2026-06-23
  - Notes: Hermes docs for the optional Stripe Link CLI skill. The page says the skill wraps `@stripe/link-cli`, supports one-time virtual cards or Shared Payment Tokens, and gates every spend through in-app Link approval that Hermes cannot self-approve.

### Apple makes Mac agent sandboxes native
- Post: https://x.com/twtayaan/status/2069307717177737658
  - Title: "Apple just made Docker Desktop optional on Mac"
  - Type: X post
  - Access: 2026-06-24
  - Notes: Ayaan's June 23 post amplified Apple Container as a free native way to run Linux containers on Mac without Docker Desktop. X oEmbed text calls out Docker Desktop optionality and the GitHub traction around `apple/container`.
- Repo: https://github.com/apple/container
  - Title: "apple/container"
  - Type: Repository
  - Access: 2026-06-24
  - Notes: Apple Container is a Swift CLI for creating and running Linux containers as lightweight VMs on Apple Silicon. The repo readme says it consumes and produces OCI-compatible images, uses Containerization for low-level management, and requires macOS 26 for the current supported path.
- Release: https://github.com/apple/container/releases/tag/1.0.0
  - Title: "apple/container 1.0.0"
  - Type: Release notes
  - Access: 2026-06-24
  - Notes: June 9 1.0.0 release. The release notes frame Container as one year old and highlight `container machine` for long-lived Linux environments with tight host integration.
- Source: https://github.com/apple/containerization
  - Title: "apple/containerization"
  - Type: Framework repository
  - Access: 2026-06-24
  - Notes: Containerization is Apple's Swift package for running Linux containers on macOS with Virtualization.framework. The readme says each Linux container executes inside its own lightweight VM, with sub-second starts using an optimized Linux kernel configuration and minimal root filesystem.
- Repo: https://github.com/apple/containerization/tree/main/examples/sandboxy
  - Title: "sandboxy"
  - Type: Example tool
  - Access: 2026-06-24
  - Notes: `sandboxy` is an experimental Containerization example that runs AI coding agents in sandboxed Linux environments on Apple Silicon. It mounts the current workspace, caches the environment for fast reruns, supports Claude Code by default, uses per-agent-session microVMs, and enforces HTTP/HTTPS allowlists via a host proxy. The README caveats that services listening on `0.0.0.0` on the host are currently reachable and should be tightened later.

### vLLM turns weird open models into runnable systems
- Source: https://vllm-project.github.io/2026/06/12/minimax-m3-vllm.html
  - Title: "MiniMax M3 in vLLM: Day-0 Serving for 1M-Token Multimodal Reasoning"
  - Type: Runtime integration
  - Access: 2026-06-23
  - Notes: vLLM's June 12 post announcing day-zero support for MiniMax M3 BF16 and MXFP8 checkpoints, including MiniMax Sparse Attention, multimodal preprocessing, tool/reasoning parsers, EAGLE3 speculative decoding, prefix caching, chunked prefill, and long-context deployment recipes.
- Source: https://vllm-project.github.io/2026/06/10/diffusion-gemma.html
  - Title: "DiffusionGemma: The First Diffusion LLM (dLLM) Natively Supported in vLLM"
  - Type: Runtime integration
  - Access: 2026-06-23
  - Notes: vLLM and Google DeepMind's June 10 post explaining native DiffusionGemma support, including bidirectional attention, iterative block refinement, custom sampling, prefix caching, and batched serving for 256-token diffusion canvases.
- Source: https://vllm-project.github.io/2026/06/16/vllm-sr-fusion-api.html
  - Title: "Beyond One Model: Fusion in vLLM Semantic Router"
  - Type: Runtime integration
  - Access: 2026-06-23
  - Notes: vLLM Semantic Router post introducing Fusion as a routing primitive for panel, judge, synthesis, traces, policy, and model diversity across local vLLM backends and provider APIs.
- Source: https://blogs.nvidia.com/blog/rtx-ai-garage-local-gemma-diffusion/
  - Title: "NVIDIA Accelerates Google DeepMind's DiffusionGemma for Local AI"
  - Type: Official technical blog
  - Access: 2026-06-23
  - Notes: NVIDIA's June 10 local-AI post frames DiffusionGemma as a compute-bound block-generation workload, reports 1,000 tokens/sec on H100, 150 tokens/sec on DGX Spark, and up to 2,000 tokens/sec on DGX Station, with day-zero support in Hugging Face Transformers, vLLM, and Unsloth.

### One API, many models becomes the frontier wrapper
- Source: https://openrouter.ai/blog/announcements/fusion-beats-frontier/
  - Title: "Surpassing Frontier Performance with Fusion"
  - Type: Official announcement
  - Access: 2026-06-24
  - Notes: OpenRouter's June 12 Fusion launch post. It frames Fusion as one API call that sends a prompt to a panel of models, gives them web search/fetch, uses a judge model to synthesize consensus/contradictions/blind spots, and reports DRACO results where model panels beat solo frontier models on deep research tasks.
- Source: https://openrouter.ai/openrouter/fusion
  - Title: "OpenRouter: Fusion"
  - Type: Product/API page
  - Access: 2026-06-24
  - Notes: Product page for `openrouter/fusion`. The page describes Quality and Budget presets, custom `analysis_models` and judge configuration, OpenAI-compatible usage, and pricing as the sum of underlying panel and judge completions.
- Post: https://x.com/OpenRouter/status/2065856853989270011
  - Title: "OpenRouter introduces Fusion API"
  - Type: Official X post
  - Access: 2026-06-24
  - Notes: Official OpenRouter announcement post for Fusion, useful as the social launch source; the official blog and product page carry the durable technical details.
- Source: https://sakana.ai/fugu-release/
  - Title: "Sakana Fugu: One Model to Command Them All"
  - Type: Official announcement
  - Access: 2026-06-24
  - Notes: Sakana AI's June 22 launch post for Fugu and Fugu Ultra. It describes a full multi-agent orchestration system exposed as a single foundation-model API, with Fugu itself trained to call and coordinate an agent pool of LLMs.
- Source: https://sakana.ai/fugu/
  - Title: "Sakana Fugu - Multi-Agent System as a Model"
  - Type: Product/API page
  - Access: 2026-06-24
  - Notes: Product page describing Fugu and Fugu Ultra behind one OpenAI-compatible API, opt-outs for specific agents/providers, and research grounding in TRINITY and Conductor learned-orchestration papers.
- Post: https://x.com/SakanaAILabs/status/2068861630327443966
  - Title: "Sakana AI announces Fugu"
  - Type: Official X post
  - Access: 2026-06-24
  - Notes: Official Sakana AI launch-thread source for Fugu; the official release and product pages are the durable source of technical detail.
- Post: https://x.com/SakanaAILabs/status/2069811015152493052
  - Title: "Sakana AI launches Fugu-Ultra on OpenRouter"
  - Type: Official X post
  - Access: 2026-06-24
  - Notes: Same-day follow-up to the Fugu launch: Sakana shipped Fugu-Ultra live on OpenRouter, the joint framing is "the future of AI isn't a single monolithic model, but the collective intelligence of the world's best models working together." 63.9K views, 31 replies, 55 reposts, 529 likes, 115 bookmarks. Adds a concrete production deployment to the same panel-orchestration story.
- Source: https://openrouter.ai/sakana/fugu-ultra
  - Title: "Fugu-Ultra on OpenRouter"
  - Type: Product/API page
  - Access: 2026-06-24
  - Notes: OpenRouter routing entry for Sakana Fugu-Ultra, the model Sakana put live on OpenRouter the same day as the meetup. Useful as the durable product page behind the launch X post.

## Models & Research
### Closed model releases
- Source: https://openai.com/index/daybreak-securing-the-world/
  - Title: "Daybreak: Tools for securing every organization in the world"
  - Type: Official announcement
  - Access: 2026-06-23
  - Notes: OpenAI's June 22 Daybreak expansion with the full GPT-5.5-Cyber model, Codex Security plugin, Cyber Partner Program, and Patch the Planet. Included as a fresh access/productization update; GPT-5.5-Cyber itself was already covered on May 13.
- Source: https://digg.com/ai/a95mmx07
  - Title: "OpenAI partners with Trail of Bits to automatically patch open-source vulnerabilities, merging 37 fixes in its first week"
  - Type: Digg cluster
  - Access: 2026-06-23
  - Notes: Digg cluster around OpenAI Daybreak and GPT-5.5-Cyber. Shows 2.9M cluster engagement and captures X reaction around machine-speed patching, partner-gated access, and maintainer review.
- Post: https://x.com/OpenAI/status/2069104283824640023
  - Title: "OpenAI announces Daybreak expansion"
  - Type: Official X post
  - Access: 2026-06-23
  - Notes: Official OpenAI launch post for Daybreak expansion, Codex Security, GPT-5.5-Cyber, Cyber Partner Program, and Patch the Planet; treated here as a Daybreak/access update rather than a net-new model release.
- Post: https://x.com/OpenAI/status/2069104286479618296
  - Title: "OpenAI describes GPT-5.5-Cyber"
  - Type: Official X post
  - Access: 2026-06-23
  - Notes: Official OpenAI thread post describing GPT-5.5-Cyber as its most capable cyber model for authorized defensive work; retained to support the June 22 access/productization update.

### Open model releases
- Source: https://z.ai/blog/glm-5.2
  - Title: "GLM-5.2: Frontier Intelligence, Open Weights"
  - Type: Official announcement
  - Access: 2026-06-23
  - Notes: Z.ai's June 16 launch post for GLM-5.2 highlighting 1M-token context, coding and agentic task improvements, MIT open weights, and two reasoning effort levels.
- Source: https://huggingface.co/zai-org/GLM-5.2
  - Title: "zai-org/GLM-5.2"
  - Type: Model card
  - Access: 2026-06-23
  - Notes: Hugging Face model card for the 753B-parameter GLM-5.2 open weights under MIT license. API metadata on June 23 showed 2,157 likes and 40,127 downloads.
- Source: https://github.com/zai-org/GLM-5
  - Title: "zai-org/GLM-5"
  - Type: Repository
  - Access: 2026-06-23
  - Notes: Official GitHub repository for GLM-5 model resources.
- Source: https://docs.z.ai/guides/llm/glm-5.2
  - Title: "GLM-5.2 - Z.ai Docs"
  - Type: Documentation
  - Access: 2026-06-23
  - Notes: API guide for using GLM-5.2 on the Z.ai platform, including model endpoints and parameters.
- Source: https://digg.com/ai/wmry8acg
  - Title: "Zai_org's open-weights GLM-5.2 ranks third overall on the GDPval-AA"
  - Type: Digg cluster
  - Access: 2026-06-23
  - Notes: Digg cluster around Artificial Analysis' GDPval-AA result: GLM-5.2 leads open weights, ranks #3 overall, and scores 1524 Elo behind Claude Fable 5 and Claude Opus 4.8.
- Post: https://x.com/Zai_org/status/2066938937344495629
  - Title: "Z.ai announces GLM-5.2"
  - Type: Official X post
  - Access: 2026-06-23
  - Notes: Z.ai's official announcement thread introducing GLM-5.2 with open weights, 1M context, and coding/agentic improvements.
- Source: https://huggingface.co/moonshotai/Kimi-K2.7-Code
  - Title: "moonshotai/Kimi-K2.7-Code"
  - Type: Model card
  - Access: 2026-06-23
  - Notes: Hugging Face model card for Moonshot AI's coding-focused agentic model built on Kimi K2.6. API metadata on June 23 showed 974 likes and 447,920 downloads; the card reports 1T total parameters, 32B active parameters, 256K context, and roughly 30% lower thinking-token usage than K2.6.
- Source: https://digg.com/tech/lvlg9m33
  - Title: "Moonshot AI open-sources Kimi-K2.7-Code, ranking third on the MCPAtlas leaderboard ahead of GPT-5.5"
  - Type: Digg cluster
  - Access: 2026-06-23
  - Notes: Digg cluster around the Kimi K2.7 Code launch and reaction, including the official Kimi.ai announcement post, Hugging Face link, and coding-agent benchmark discussion.
- Source: https://digg.com/tech/27r7m6uc
  - Title: "Moonshot AI's Kimi k2.7 code model matches the k2.6 WeirdML score while cutting output tokens nearly in half"
  - Type: Digg cluster
  - Access: 2026-06-23
  - Notes: Digg cluster focused on Kimi K2.7 Code's token-efficiency angle: similar WeirdML performance while cutting average output length from roughly 17,000 tokens to 9,000.
- Post: https://x.com/Kimi_Moonshot/status/2065377579130142937
  - Title: "Kimi.ai announces Kimi K2.7 Code"
  - Type: Official X post
  - Access: 2026-06-23
  - Notes: Official Kimi.ai launch post for Kimi K2.7 Code, describing better coding and agent performance over K2.6, 30% lower reasoning-token usage, and availability through Kimi API and Kimi Code.
- Source: https://huggingface.co/MiniMaxAI/MiniMax-M3
  - Title: "MiniMaxAI/MiniMax-M3"
  - Type: Model card
  - Access: 2026-06-23
  - Notes: Hugging Face model card for MiniMax M3, a native multimodal MoE with 1M context, roughly 428B total parameters, and roughly 23B active parameters. API metadata on June 23 showed 1,219 likes and 131,057 downloads; the model card tags it for coding, agents, video, multimodal work, and arXiv 2606.13392.
- Post: https://x.com/MiniMax_AI/status/2065436935188058208
  - Title: "MiniMax announces M3 open weights on Hugging Face"
  - Type: Official X post
  - Access: 2026-06-23
  - Notes: MiniMax's June 12 official weights-release post for MiniMax M3. The June 10 board already captured the launch post; this source is included because the actual Hugging Face weights landed after that meetup.
- Post: https://x.com/huggingface/status/2065464345413239151
  - Title: "Hugging Face highlights MiniMax M3 weights"
  - Type: X post
  - Access: 2026-06-23
  - Notes: Hugging Face amplification post for MiniMax M3 weights, useful as a platform corroboration source for the post-meetup weights availability.
- Source: https://huggingface.co/collections/allenai/tmax
  - Title: "Tmax - a allenai Collection"
  - Type: Hugging Face collection
  - Access: 2026-06-23
  - Notes: AllenAI collection of TMax models, datasets, and rollout artifacts for terminal agents.
- Source: https://huggingface.co/allenai/tmax-27b
  - Title: "allenai/tmax-27b"
  - Type: Model card
  - Access: 2026-06-23
  - Notes: TMax 27B model card. HF card reports roughly 43% on Terminal Bench 2.0 after 160 RL steps.
- Source: https://wai-org.com/blog/tmax/
  - Title: "TMax: A Simple Recipe for Terminal Agents"
  - Type: Blog
  - Access: 2026-06-23
  - Notes: WAI blog describing TMax as an open RL recipe plus TMax-15k, a 14,600-environment dataset.
- Source: https://digg.com/ai/opo8qjez
  - Title: "Ai2 launches TMax, an open-source terminal agent whose 27B model matches systems 40 times its size on Terminal Bench 2.0"
  - Type: Digg cluster
  - Access: 2026-06-23
  - Notes: Digg cluster for TMax with 226.4K cluster engagement and the X/HF/GitHub source chain for open data, weights, and rollouts.
- Repo: https://github.com/hamishivi/tmax
  - Title: "hamishivi/tmax"
  - Type: Repository
  - Access: 2026-06-23
  - Notes: GitHub repo for TMax data generation, training, evaluation, and paper assets.

### AI Twitter's model-release calendar slips
- Post: https://x.com/synthwavedd/status/2069432791184650426
  - Title: "leo scoop on GPT-5.6, Gemini 3.5 Pro, Bidi, and Sonnet 5 timing"
  - Type: X post
  - Access: 2026-06-24
  - Notes: Main leak source claiming GPT-5.6 slipped from the current week to roughly mid-July, Gemini 3.5 Pro will not launch in June, Bidi preparations are underway, and Claude Sonnet 5 may exist in enterprise early access. Treated as an unconfirmed rumor source, not official release information.
- Source: https://digg.com/ai/6hp5va4b
  - Title: "OpenAI postpones GPT-5.6 release to mid-July as Google DeepMind pauses Gemini 3.5 Pro"
  - Type: Digg cluster
  - Access: 2026-06-24
  - Notes: Digg aggregation of the delay rumor. Useful as amplification/context, while Digg itself notes no official word confirms mid-July timing or the specific pause reasons.
- Source: https://digg.com/ai/djnhbslr
  - Title: "Rumors claim OpenAI is preparing to release GPT-5.6, GPT-5.6 Pro, and bidirectional voice model GPT-Bidi-1"
  - Type: Digg cluster
  - Access: 2026-06-24
  - Notes: Earlier pre-delay rumor cluster establishing the June GPT-5.6 hype cycle and Bidi chatter. Included to show the expectation the newer delay rumor is reacting against.
- Source: https://digg.com/ai/kia1m38d
  - Title: "A 'claude-sonnet-5' model slug appears on an Anthropic partner platform"
  - Type: Digg cluster
  - Access: 2026-06-24
  - Notes: Digg aggregation of Sonnet 5 slug/partner-platform chatter. Supports the careful framing that Sonnet 5 is an unannounced slug or enterprise-access rumor, not a public launch delay.
- Source: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/
  - Title: "Gemini 3.5: frontier intelligence with action"
  - Type: Official announcement
  - Access: 2026-06-24
  - Notes: Official Google Gemini 3.5 post: Gemini 3.5 Flash was available immediately, while Google said 3.5 Pro was already in internal use and expected to roll out "next month." This supports the June expectation, not the unconfirmed delay claim.
- Source: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
  - Title: "ChatGPT - Release Notes"
  - Type: Official release notes
  - Access: 2026-06-24
  - Notes: OpenAI's public ChatGPT release notes showed no GPT-5.6 launch or delay notice when checked; recent official model context still centered on GPT-5.5 and GPT-5.2 retirement.
- Source: https://support.claude.com/en/articles/12138966-release-notes
  - Title: "Claude Release Notes"
  - Type: Official release notes
  - Access: 2026-06-24
  - Notes: Anthropic's public release notes list June 9 Fable 5 launch and June 12 Fable/Mythos suspension, with no public Sonnet 5 launch note.
- Source: https://docs.anthropic.com/en/docs/about-claude/models/overview
  - Title: "Claude models overview"
  - Type: Official model documentation
  - Access: 2026-06-24
  - Notes: Anthropic's public model overview lists Fable 5/Mythos 5 plus Opus 4.8, Sonnet 4.6, and Haiku 4.5; no public Sonnet 5 model is listed.

### Research behind the open model wave
- Source: https://arxiv.org/abs/2602.15763
  - Title: "GLM-5: from Vibe Coding to Agentic Engineering"
  - Type: Research paper
  - Access: 2026-06-23
  - Notes: Technical report for the GLM-5 model family.
- Source: https://arxiv.org/abs/2603.12201
  - Title: "IndexCache: Accelerating Sparse Attention via Cross-Layer Index Reuse"
  - Type: Research paper
  - Access: 2026-06-23
  - Notes: Paper describing the IndexShare/IndexCache sparse-attention architecture used in GLM-5.2 to reduce per-token FLOPs at long context.
- Source: https://huggingface.co/papers/2606.23321
  - Title: "Tmax: A simple recipe for terminal agents"
  - Type: Paper page
  - Access: 2026-06-23
  - Notes: Hugging Face paper page for the TMax terminal-agent RL recipe.
- Post: https://x.com/ArtificialAnlys/status/2069121548670406947
  - Title: "Artificial Analysis GDPval-AA result for GLM-5.2"
  - Type: X post
  - Access: 2026-06-23
  - Notes: Artificial Analysis post stating GLM-5.2 leads open weights and sits #3 overall on GDPval-AA.
- Post: https://x.com/natolambert/status/2069055568124281315
  - Title: "Nathan Lambert shares TMax references"
  - Type: X post
  - Access: 2026-06-23
  - Notes: High-signal X source linking the TMax paper, blog, GitHub repo, Hugging Face artifacts, and video.


## Security

### Who reported the Fable jailbreak?
- Source: https://www.politico.com/news/2026/06/13/inside-the-whirlwind-24-hours-that-led-the-white-house-to-slap-export-controls-on-anthropic-00961519
  - Title: "Inside the whirlwind 24 hours that led the White House to slap export controls on Anthropic"
  - Type: News reporting
  - Access: 2026-06-16
  - Notes: Politico's June 13 report naming Amazon CEO Andy Jassy as raising concerns to the White House about the Fable model's guardrails; at least five other companies also reportedly contacted senior officials. Cites administration and White House officials.
- Source: https://www.anthropic.com/news/fable-mythos-access
  - Title: "Update on Fable and Mythos access"
  - Type: Official response
  - Access: 2026-06-16
  - Notes: Anthropic's post-export-control statement defending its safeguards, stating no universal jailbreak had been found, and explaining the decision to disable Fable 5 and Mythos 5 access to ensure compliance.
- Post: https://x.com/DavidSacks/status/2065853007619588171
  - Title: "David Sacks on Fable export controls and Anthropic remediation"
  - Type: Official X post
  - Access: 2026-06-16
  - Notes: David Sacks calls the source a "highly credible trusted partner of both Anthropic and the USG," supports the administration's export-control action, and frames the goal as Anthropic remediating the safety issue so Fable can return to general release.
- Post: https://x.com/v_shakthi/status/2065985743340839080
  - Title: "Shakthi Vadakkepat summary of Politico's Fable 5 story"
  - Type: X post
  - Access: 2026-06-16
  - Notes: Low-engagement pointer (265 views, 3 likes) summarizing the Politico report that Andy Jassy and Amazon raised Fable concerns to the White House, leading to export controls.

## Big Tech Moves

### OpenAI gets its own inference chip
- Source: https://openai.com/index/openai-broadcom-jalapeno-inference-chip/
  - Title: "OpenAI and Broadcom unveil LLM-optimized inference chip"
  - Type: Official announcement
  - Access: 2026-06-24
  - Notes: OpenAI's June 24 announcement for Jalapeno, its first Intelligence Processor and a custom LLM inference accelerator co-developed with Broadcom and Celestica. The post says lab samples are running GPT-5.3-Codex-Spark, early tests show substantially better performance per watt than current state of the art, and OpenAI plans multi-generation gigawatt-scale deployment with data center partners.
- Post: https://x.com/OpenAI/status/2069770172802773292
  - Title: "OpenAI announces Jalapeno with Broadcom"
  - Type: Official X post
  - Access: 2026-06-24
  - Notes: Official OpenAI social launch post supplied by the user; the durable technical details are in the OpenAI announcement.

### Midjourney turns image-gen into body hardware
- Source: https://www.midjourney.com/medical
  - Title: "Midjourney Medical - the full-body ultrasound (Ultrasonic CT)"
  - Type: Official product page
  - Access: 2026-06-24
  - Notes: Official product page for Midjourney Medical and its Ultrasonic CT scanner. The page frames the device as sound-and-water full-body ultrasound with a 60-second scan target, a San Francisco spa planned for late 2027, and a goal of 50,000 scanners over six years.
- Source: https://www.midjourney.com/medical/blogpost
  - Title: "A New Era of Midjourney"
  - Type: Official announcement
  - Access: 2026-06-24
  - Notes: Official launch post explaining the scanner mechanics: a shallow water pool, descending platform, ring of roughly half a million ultrasound elements, very high data volume, and image reconstruction from wave changes. Also states the near-term plan starts with body-composition maps while pursuing FDA-expanded capabilities.
- Source: https://ir.butterflynetwork.com/News/press-releases/news-details/2026/Butterfly-Network-Provides-Commentary-on-Midjourney-Medicals-Full-Body-Ultrasound-Scanner-Announcement/default.aspx
  - Title: "Butterfly Network Provides Commentary on Midjourney Medical's Full Body Ultrasound Scanner Announcement"
  - Type: Partner statement
  - Access: 2026-06-24
  - Notes: Butterfly Network confirms the current prototype incorporates 40 Butterfly Ultrasound-on-Chip imaging modules per system under a co-development and licensing agreement, with future generations expected to use more modules.
- Source: https://www.theverge.com/report/954826/midjourney-medical-ai-ultrasound-body-scanner-lacks-evidence
  - Title: "Something's off with Midjourney's pivot to body scanners"
  - Type: Skeptical reporting
  - Access: 2026-06-24
  - Notes: Medical-imaging experts tell The Verge the idea is plausible but the MRI-equivalence and clinical-impact claims need evidence. Useful caveat source for framing the story as a major physical-infrastructure pivot, not validated diagnostics.
- Post: https://x.com/midjourney/status/2067421950314688759
  - Title: "Midjourney announces Midjourney Medical"
  - Type: Official X post
  - Access: 2026-06-24
  - Notes: Official Midjourney social launch post for the new medical division.
- Post: https://x.com/midjourney/status/2067422898407837797
  - Title: "Midjourney technical dive into the Midjourney Scanner"
  - Type: Official X post
  - Access: 2026-06-24
  - Notes: Official technical video post used as the main slide-friendly social embed for the scanner mechanics.

### Cursor previews Origin, a GitHub competitor
- Post: https://x.com/morganlinton/status/2066927927997190564?s=46
  - Title: "Morgan Linton: Breaking: Origin - Cursor's competitor to GitHub"
  - Type: X post
  - Access: 2026-06-16
  - Notes: Leaked/pre-announced screenshot positioning Cursor's "Origin" as a GitHub competitor. 116.6K views, 1.2K likes, 186 reposts, 36 quotes. Primary source is a single X post; details on feature set and timing remain unconfirmed.

## Showcase

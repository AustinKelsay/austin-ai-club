---
title: Sovereign AI Club - August 5, 2026 - Source Link Records
created: 2026-08-04
updated: 2026-08-05
type: summary
tags: [source-record, meetup]
sources: []
---

# Sovereign AI Club - August 5, 2026 - Source Link Records

## Agent Infrastructure

### Uncle Bob's senior job is constraints, not reading agent code
- Post: https://x.com/unclebobmartin/status/2080257779395154409
  - Title: "Uncle Bob on not reading agent-written code"
  - Type: Practitioner X post
  - Access: 2026-08-04
  - Notes: Robert C. Martin says his current strategy is not reading agent-written code and instead surrounding agents with extreme constraints and unit tests.

### Cloudflare OS turns Sandstorm's grain model into agent-safe Gadgets
- Repo: https://github.com/cloudflare/cloudflare-os
  - Title: "cloudflare/cloudflare-os"
  - Type: GitHub repository
  - Access: 2026-08-05
  - Notes: Open-source agent workspace on Workers; Gadgets as Dynamic Worker Facets, Gatekeepers for external services; early-access as of August 2026.
- Source: https://blog.cloudflare.com/cloudflare-os/
  - Title: "Cloudflare OS: an open platform for agents, apps, and work"
  - Type: Official product blog
  - Access: 2026-08-05
  - Notes: Official launch framing for open-sourcing Cloudflare OS and the Gadget/Gatekeeper security model.
- Post: https://x.com/KentonVarda/status/2084990137180590572
  - Title: "Kenton Varda on Cloudflare OS / Sandstorm remake"
  - Type: Builder X post
  - Access: 2026-08-05
  - Notes: Workers lead frames Gadgets as Sandstorm Grains, per-instance ACL, and promptable per-user code forks; qualify absolute security claims.

### Prime Agent is an open RLM coding harness that can rewrite itself
- Repo: https://github.com/PrimeIntellect-ai/prime-agent
  - Title: "PrimeIntellect-ai/prime-agent"
  - Type: GitHub repository
  - Access: 2026-08-05
  - Notes: Open-source coding / long-horizon agent built on RLM REPL + Continual Harness self-modification; treat self-improving claims as vendor-framed.
- Source: https://www.primeintellect.ai/blog/prime-agent
  - Title: "Prime Agent"
  - Type: Official product blog
  - Access: 2026-08-05
  - Notes: Launch writeup for Prime Agent as an RLM coding harness with recursive sub-calls and continual self-edit loops.
- Post: https://x.com/PrimeIntellect/status/2085086999267144083
  - Title: "Prime Intellect launches Prime Agent"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Launch post for the open RLM agent; good room entry before the 101 source chain.
- Post: https://x.com/MTSlive/status/2085098975707996558
  - Title: "MTS on Prime Agent ARC-AGI-3 95.5%"
  - Type: Aggregator X post
  - Access: 2026-08-05
  - Notes: High-signal reaction charting the author-reported 95.5% ARC-AGI-3 result above human baseline.
- Source: https://alexzhang13.github.io/blog/2025/rlm/
  - Title: "Recursive Language Models"
  - Type: Author explainer
  - Access: 2026-08-05
  - Notes: Primary RLM 101: context as REPL variable + recursive sub-LM calls instead of stuffing longer windows.
- Source: https://arxiv.org/abs/2512.24601
  - Title: "Recursive Language Models (arXiv:2512.24601)"
  - Type: Research preprint
  - Access: 2026-08-05
  - Notes: Paper backing the RLM inference pattern; pair with Zhang's blog for room briefing.
- Source: https://www.primeintellect.ai/blog/rlm
  - Title: "Recursive Language Models"
  - Type: Company explainer
  - Access: 2026-08-05
  - Notes: Prime Intellect's own RLM framing bridging the paper to Prime Agent product claims.
- Source: https://arcprize.org/scorecards/2af780b4-f2a1-43e9-a794-b23da3cd3f9f
  - Title: "Prime Agent ARC-AGI-3 median scorecard (95.2%)"
  - Type: Benchmark scorecard
  - Access: 2026-08-05
  - Notes: Official ARC scorecard linked from the Prime Agent blog for the median Opus 5 + Prime Agent run.

### Meta ships Muse Code with co-trained Muse Spark 1.2
- Source: https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2
  - Title: "Introducing Muse Code and Muse Spark 1.2"
  - Type: Official product blog
  - Access: 2026-08-05
  - Notes: Muse Code terminal agent beta plus Muse Spark 1.2 co-trained on the harness; vendor kernel case study and methodology report linked from the post.
- Source: https://developer.meta.com/ai/products/muse-code/
  - Title: "Muse Code"
  - Type: Official product page
  - Access: 2026-08-05
  - Notes: Meta developer product surface for Muse Code install and overview.
- Post: https://x.com/finkd/status/2085080750034940201
  - Title: "Zuckerberg releases Muse Code beta"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Mark Zuckerberg launch thread for Muse Code + Muse Spark 1.2.

## Models & Research

### Closed model releases
- Source: https://bfl.ai/blog/flux-3
  - Title: "FLUX 3 - Real World Models"
  - Type: Official product blog
  - Access: 2026-08-04
  - Notes: Black Forest Labs launch post for the unified multimodal flow model covering video+audio early access, upcoming image access, action prediction, and later open-weight FLUX 3 Dev.
- Post: https://x.com/bfl_ai/status/2080308988961554582
  - Title: "Introducing FLUX 3"
  - Type: Official X post
  - Access: 2026-08-04
  - Notes: BFL announcement framing FLUX 3 as one multimodal model for image, video, audio, and action prediction.
- Post: https://x.com/mimicrobotics/status/2080307032746336367
  - Title: "Introducing FLUX-mimic"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Mimic Robotics launch for FLUX-mimic, a video-action model on the FLUX 3 backbone for general-purpose dexterity, with Audi as an early manufacturing partner.
- Source: https://www.mimicrobotics.com/blog/introducing-flux-mimic
  - Title: "Introducing FLUX-mimic"
  - Type: Official product blog
  - Access: 2026-08-05
  - Notes: Technical blog for the FLUX 3 video-backbone + action-decoder robotics stack and sample-efficiency claims.
- Post: https://x.com/Pokee_AI/status/2084682445648216383
  - Title: "Releasing Pokee-Isaac 28B"
  - Type: Official X post
  - Access: 2026-08-04
  - Notes: Kept on the Closed roundup catalog; deep-dive sources live under the dedicated Pokee-Isaac Topic.
- Source: https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2
  - Title: "Introducing Muse Code and Muse Spark 1.2"
  - Type: Official product blog
  - Access: 2026-08-05
  - Notes: Closed-catalog pointer; deep-dive sources also live under the Muse Code Agent Infrastructure Topic.
- Post: https://x.com/finkd/status/2085080750034940201
  - Title: "Zuckerberg releases Muse Code beta"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Kept on the Closed roundup catalog alongside the Muse Code deep-dive Topic.
- Source: https://www.minimax.io/blog/minimax-h3
  - Title: "MiniMax H3"
  - Type: Official product blog
  - Access: 2026-08-05
  - Notes: MiniMax H3 closed launch as omni video + native-stereo generator; partial open weights follow on the Open roundup.
- Post: https://x.com/MiniMax_AI/status/2083008095488516262
  - Title: "MiniMax H3 launch"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Launch post used on both Closed and Open catalogs; open drop is partial (Context-IR / full 2K path still API-side).

### Pokee-Isaac claims 10M context on a 28B single-GPU agent
- Source: https://console.pokee.ai/model
  - Title: "Pokee-Isaac model console"
  - Type: Official product page
  - Access: 2026-08-05
  - Notes: Primary product surface for Pokee-Isaac technical claims and deployment options.
- Source: https://console.pokee.ai/pokee-isaac-28b-v0-technical-report.pdf
  - Title: "Pokee-Isaac 28B technical report"
  - Type: Vendor technical report PDF
  - Access: 2026-08-05
  - Notes: Vendor-authored report linked from the launch post; treat benchmark tables as author-reported.
- Post: https://x.com/Pokee_AI/status/2084682445648216383
  - Title: "Releasing Pokee-Isaac 28B"
  - Type: Official X post
  - Access: 2026-08-04
  - Notes: Vendor launch claims including 10M context, 93.3% RULER at 10M, RTX 4090-class single-GPU deploy, and $0.15/$1 pricing; qualify superlatives.
- Source: https://pokee.ai/
  - Title: "Pokee"
  - Type: Official company site
  - Access: 2026-08-04
  - Notes: Company homepage supporting the Isaac product launch.
- Source: https://docs.pokee.ai/docs/models
  - Title: "Pokee models and pricing"
  - Type: Official documentation
  - Access: 2026-08-04
  - Notes: Docs for Pokee Isaac model tiers and API usage.

### Open model releases
- Source: https://developer.ant-ling.com/en/docs/models/ling
  - Title: "Ling model docs"
  - Type: Official model documentation
  - Access: 2026-08-04
  - Notes: Ant Ling docs list Ling-3.0-flash as 124B total / 5.1B active, 256K native context extendable to 1M, hybrid reasoning, production-agent positioning.
- Source: https://huggingface.co/inclusionAI/Ling-3.0-flash
  - Title: "inclusionAI/Ling-3.0-flash"
  - Type: Hugging Face model page
  - Access: 2026-08-04
  - Notes: Public model card / artifact page for Ling-3.0-flash.
- Post: https://x.com/AntLingAGI/status/2080351022028095681
  - Title: "Releasing Ling-3.0-flash"
  - Type: Official X post
  - Access: 2026-08-04
  - Notes: Launch claim that 124B/5.1B-active matches or beats Ant's 1T flagship on most shown benchmarks.
- Source: https://poolside.ai/blog/introducing-laguna-s-2-1
  - Title: "Introducing Laguna S 2.1"
  - Type: Official product blog
  - Access: 2026-08-04
  - Notes: Poolside launch for the 118B/8B-active agentic coding MoE with up to 1M context and published evaluation trajectories.
- Source: https://huggingface.co/poolside/Laguna-S-2.1
  - Title: "poolside/Laguna-S-2.1"
  - Type: Hugging Face model page
  - Access: 2026-08-04
  - Notes: Open-weight Laguna S 2.1 artifact under OpenMDW-1.1.
- Post: https://x.com/poolsideai/status/2079613777343848465
  - Title: "Releasing Laguna S 2.1"
  - Type: Official X post
  - Access: 2026-08-05
  - Notes: Poolside launch tweet for the 118B/8B-active Laguna S 2.1 coding MoE with up to 1M context; high-engagement open-release anchor for the roundup.
- Source: https://huggingface.co/Nanbeige/Nanbeige4.2-3B
  - Title: "Nanbeige/Nanbeige4.2-3B"
  - Type: Hugging Face model page
  - Access: 2026-08-04
  - Notes: Compact Nanbeige 4.2 3B release called out in the open-release roundup.
- Source: https://arxiv.org/abs/2607.22083
  - Title: "Nanbeige4.2-3B looped Transformer paper (arXiv:2607.22083)"
  - Type: Research preprint
  - Access: 2026-08-05
  - Notes: Paper for the looped-Transformer 3B trained on ~28T tokens; size-efficiency garnish on the Open roundup.
- Post: https://x.com/iScienceLuvr/status/2081657822345826600
  - Title: "Nanbeige4.2-3B paper highlight"
  - Type: Aggregator X post
  - Access: 2026-08-05
  - Notes: Reaction pointing at the Nanbeige looped-Transformer arXiv for the Open catalog.
- Source: https://huggingface.co/upstage/Solar-Open2-250B
  - Title: "upstage/Solar-Open2-250B"
  - Type: Hugging Face model page
  - Access: 2026-08-04
  - Notes: Upstage Solar-Open2 250B open release included in the open packaging wave.
- Post: https://x.com/hunkims/status/2079949203615453414
  - Title: "Solar Open 2 announcement"
  - Type: Practitioner X post
  - Access: 2026-08-05
  - Notes: Sung Kim announces Solar Open 2 and points to the Hugging Face weights; used when an official Upstage launch post was not recovered.
- Source: https://huggingface.co/shafire/Zero-Gemma4-E4B-OpenZero-GGUF
  - Title: "Zero-Gemma4-E4B-OpenZero-GGUF"
  - Type: Hugging Face model page
  - Access: 2026-08-04
  - Notes: OpenZero Gemma4-E4B GGUF packaging referenced by the open-release roundup.
- Post: https://x.com/LocalAiCherry/status/2082461699622228141
  - Title: "Latest open source local drops"
  - Type: Aggregator X post
  - Access: 2026-08-04
  - Notes: Roundup post listing Laguna-S2.1, Nanbeige 4.2 3B, Solar-Open2 250B, Bonsai/Ternary-Bonsai, Qwen3.6/BTL-3, and OpenZero Gemma4 builds.
- Source: https://rocm.blogs.amd.com/artificial-intelligence/instella-moe/README.html
  - Title: "Instella-MoE"
  - Type: Official AMD ROCm blog
  - Access: 2026-08-05
  - Notes: AMD Instella-MoE (16B/2.8B active) with full training recipes on Instinct; builder-relevant open training stack.
- Repo: https://github.com/AMD-AGI/Instella-MoE
  - Title: "AMD-AGI/Instella-MoE"
  - Type: GitHub repository
  - Access: 2026-08-05
  - Notes: Training/code artifact for Instella-MoE.
- Source: https://huggingface.co/collections/amd/instella-moe
  - Title: "amd/instella-moe"
  - Type: Hugging Face collection
  - Access: 2026-08-05
  - Notes: Weight/collection page for Instella-MoE checkpoints.
- Post: https://x.com/PrakamyaMishra/status/2081769222301257859
  - Title: "AMD Instella-MoE release"
  - Type: Practitioner X post
  - Access: 2026-08-05
  - Notes: High-signal launch reaction for the Instella open training stack.
- Source: https://www.minimax.io/news/minimax-h3-open-source
  - Title: "MiniMax H3 open source"
  - Type: Official company news
  - Access: 2026-08-05
  - Notes: Partial open-weight drop for H3; qualify that Context-IR / full 2K path remains API-side.
- Source: https://huggingface.co/MiniMaxAI/MiniMax-H3
  - Title: "MiniMaxAI/MiniMax-H3"
  - Type: Hugging Face model page
  - Access: 2026-08-05
  - Notes: Public partial H3 weights paired with the closed launch post.
- Post: https://x.com/MiniMax_AI/status/2083008095488516262
  - Title: "MiniMax H3 launch"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Same launch post as Closed catalog; open drop is partial (Context-IR / full 2K path still API-side).

### DeepSeek V4 Flash 0731 is absurd for 13B active
- Source: https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731
  - Title: "deepseek-ai/DeepSeek-V4-Flash-0731"
  - Type: Hugging Face model page
  - Access: 2026-08-05
  - Notes: Official MIT Flash-0731 release card; author-reported Terminal-Bench 2.1 score of 82.7 and agent-suite comparisons vs Flash Preview and V4-Pro Preview; ships with DSpark speculative decoding attached.
- Post: https://x.com/deepseek_ai/status/2083084415157022911
  - Title: "DeepSeek-V4-Flash Official API public beta"
  - Type: Official X post
  - Access: 2026-08-05
  - Notes: DeepSeek launch announcing the official V4-Flash API, agent upgrades past V4-Pro Preview, Responses API support, and Codex adaptation.
- Post: https://x.com/deepseek_ai/status/2083084419515220191
  - Title: "Flash-0731 same architecture note"
  - Type: Official X post
  - Access: 2026-08-05
  - Notes: Clarifies Flash-0731 keeps the preview architecture/size and that only the Flash API was updated (Pro unchanged).
- Post: https://x.com/SciTechera/status/2083806034661884030
  - Title: "Flash vs Fable 5 Terminal-Bench cost"
  - Type: Aggregator X post
  - Access: 2026-08-05
  - Notes: Third-party garnish citing Artificial Analysis: Flash 82.7 vs Claude Fable 5 80.5 on Terminal-Bench 2.1 at roughly $0.03 vs $3.15 per task (~105×).
- Post: https://x.com/Hesamation/status/2084658830990880896
  - Title: "DeepSeek cost-per-task chart"
  - Type: Practitioner X post
  - Access: 2026-08-05
  - Notes: Chart-style reaction that DeepSeek's cost-per-task bar is barely visible next to other frontier models; visual garnish for the Flash pricing story.
- Post: https://x.com/mr_r0b0t/status/2084333669859111268
  - Title: "Flash-DSpark r0b0bench on 2× GB10"
  - Type: Practitioner X post
  - Access: 2026-08-05
  - Notes: Measured Flash-DSpark core-subset results on 2× NVIDIA GB10, including decode throughput and 1M-token needle retrieval; author-framed as package-backed reproducible freeze.
- Source: https://api-docs.deepseek.com/quick_start/pricing
  - Title: "DeepSeek Models & Pricing"
  - Type: Official API documentation
  - Access: 2026-08-05
  - Notes: Lists deepseek-v4-flash as DeepSeek-V4-Flash-0731 at $0.14/$0.28 per 1M tokens (cache miss/output) with 1M context.
- Source: https://api-docs.deepseek.com/quick_start/agent_integrations/codex
  - Title: "DeepSeek Codex agent integration"
  - Type: Official API documentation
  - Access: 2026-08-05
  - Notes: Official Codex configuration docs linked from the Flash launch post.
- Source: https://arxiv.org/abs/2606.19348
  - Title: "DeepSeek-V4 technical report"
  - Type: Technical report
  - Access: 2026-08-05
  - Notes: Defines Flash as 284B total / 13B activated MoE with 1M context; 0731 keeps that size per DeepSeek's note tweet.

### AirLLM streams giant MoEs onto hobbyist VRAM
- Repo: https://github.com/lyogavin/airllm
  - Title: "lyogavin/airllm"
  - Type: GitHub repository
  - Access: 2026-08-05
  - Notes: Layer/expert-streaming local inference library; README claims Kimi K3 at 3.72GB VRAM and DeepSeek-V3 at ~12GB via one-slice-at-a-time GPU residency.
- Source: https://pypi.org/project/airllm/
  - Title: "airllm on PyPI"
  - Type: Package registry
  - Access: 2026-08-05
  - Notes: v3.1.0 uploaded 2026-07-29 with Kimi K3 / under-4GB summary; prior v3.0 (2026-06-30) added FP8 and DeepSeek-V3 / Qwen3-235B support.
- Source: https://dev.to/arshtechpro/airllm-runs-a-70b-model-on-a-4gb-gpu-its-true-and-thats-not-the-interesting-part-hha
  - Title: "AirLLM Runs a 70B Model on a 4GB GPU"
  - Type: Technical explainer
  - Access: 2026-08-05
  - Notes: Useful caveat writeup: full-model disk reads per token, shard disk usage, and why MoE expert streaming shrinks VRAM further than dense layers.
- Post: https://x.com/simplifyinAI/status/2016842551492288686
  - Title: "AirLLM layer-wise inference on 4GB / 405B on 8GB"
  - Type: Aggregator X post
  - Access: 2026-08-05
  - Notes: High-engagement (~5.8k likes) layer-wise AirLLM garnish; frames the classic 70B/4GB claim rather than the July Kimi K3 v3.1 delta.
- Post: https://x.com/thisguyknowsai/status/2026597670329135505
  - Title: "AirLLM 70B on 4GB GPU"
  - Type: Aggregator X post
  - Access: 2026-08-05
  - Notes: Mid-engagement (~462 likes) companion explaining no-quantization layer streaming.
- Post: https://x.com/dunik_7/status/2077344313399283931
  - Title: "AirLLM 405B on an 8GB card"
  - Type: Aggregator X post
  - Access: 2026-08-05
  - Notes: July 15 post (~266 likes / ~151k views) with the 405B-on-8GB framing; most recent durable AirLLM social hit found.

### TurboFieldfare runs Gemma 4 26B-A4B in ~2 GB on Apple Silicon
- Repo: https://github.com/drumih/turbo-fieldfare
  - Title: "drumih/turbo-fieldfare"
  - Type: GitHub repository
  - Access: 2026-08-05
  - Notes: Swift + Metal Gemma 4 26B-A4B runtime; author claims ~2 GB resident RAM via expert streaming from SSD against a ~14.3 GB installed model; macOS 26 / Metal 4 required.
- Source: https://github.com/drumih/turbo-fieldfare/blob/main/docs/BENCHMARKS.md
  - Title: "TurboFieldfare benchmarks"
  - Type: Project documentation
  - Access: 2026-08-05
  - Notes: Author-measured decode ranges for M2 Air (~5–6 tok/s) and M5 Pro (~31–35 tok/s).
- Source: https://github.com/drumih/turbo-fieldfare/blob/main/docs/SYSTEM_DESIGN.md
  - Title: "TurboFieldfare system design"
  - Type: Project documentation
  - Access: 2026-08-05
  - Notes: Explains shared-core residency plus SSD expert streaming and the Gemma-specific `.gturbo` format.
- Source: https://ai.google.dev/gemma/docs/core/model_card_4
  - Title: "Gemma 4 model card"
  - Type: Official model documentation
  - Access: 2026-08-05
  - Notes: Official Gemma 4 core model card for the 26B-A4B MoE checkpoint TurboFieldfare pins.

### Astra turns open math problems into Lean certificates for about $2K
- Source: https://openai.com/index/ten-advances-in-mathematics/
  - Title: "Ten advances in mathematics and theoretical computer science"
  - Type: Official research announcement
  - Access: 2026-08-04
  - Notes: OpenAI announcement that an internal Astra version produced ten long-open math/TCS results at roughly $2,000 Sol API token cost.
- Repo: https://github.com/openai/ten-proofs
  - Title: "openai/ten-proofs"
  - Type: GitHub repository
  - Access: 2026-08-04
  - Notes: Lean 4 formalizations accompanying the ten results; repo reports zero sorry count.
- Source: https://cdn.openai.com/pdf/ten-proofs-oai.pdf
  - Title: "Ten proofs manuscript PDF"
  - Type: Official PDF manuscript
  - Access: 2026-08-04
  - Notes: Published manuscript accompanying the Lean certificates.
- Post: https://x.com/SebastienBubeck/status/2083456300692979886
  - Title: "Bubeck on Astra Lean proofs"
  - Type: Researcher X post
  - Access: 2026-08-05
  - Notes: OpenAI math lead frames the ten Astra results with Lean certificates and CoT walkthroughs; high-engagement launch post.
- Post: https://x.com/gdb/status/2083457463337287721
  - Title: "Greg Brockman on Astra math advances"
  - Type: Official X post
  - Access: 2026-08-04
  - Notes: OpenAI president highlights ten advances solved with internal Astra for about $2,000 at Sol API prices.
- Post: https://x.com/polynoamial/status/2083467194663571701
  - Title: "Noam Brown on Astra open problems"
  - Type: Researcher X post
  - Access: 2026-08-05
  - Notes: Noam Brown's widely shared Astra announcement covering the ten open-problem results and next-major-model framing.

### Karpathy replaces pelican-SVG with a $10 Middle-earth world
- Source: https://karpathy.ai/lotr-movie/
  - Title: "karpathy.ai/lotr-movie"
  - Type: Playable demo / source host
  - Access: 2026-08-04
  - Notes: Browser-playable Three.js world Karpathy published from the Opus 5 experiment.
- Post: https://x.com/karpathy/status/2083749667410727319
  - Title: "Opus 5 Lord of the Rings Three.js experiment"
  - Type: Researcher X post
  - Access: 2026-08-05
  - Notes: Launch post for the 1M-token / ~$10 Opus 5 experiment; kept as a link card only because @karpathy is private and embeds fail.
- Post: https://x.com/karpathy/status/2083948654377996480
  - Title: "Karpathy on pelican-on-a-bicycle follow-up"
  - Type: Researcher X post
  - Access: 2026-08-05
  - Notes: Follow-up pointing at Simon Willison's pelican writeup and the playable Middle-earth demo; same private-account embed limit.

### Liquid IFStruct makes structured output a learnable 350M skill
- Source: https://www.liquid.ai/blog/ifstruct-v1.0
  - Title: "IFStruct: Measuring structured-output compliance"
  - Type: Official product blog
  - Access: 2026-08-05
  - Notes: Liquid AI June 30 IFStruct launch; LFM2.5-350M 21.1%→44.9% after RL; scores are author-reported.
- Repo: https://github.com/Liquid4All/ifstruct
  - Title: "Liquid4All/ifstruct"
  - Type: GitHub repository
  - Access: 2026-08-05
  - Notes: Open-source IFStruct evaluation framework for structured-output compliance without constrained decoding.
- Source: https://huggingface.co/datasets/LiquidAI/ifstruct-v1.0
  - Title: "LiquidAI/ifstruct-v1.0"
  - Type: Hugging Face dataset
  - Access: 2026-08-05
  - Notes: Frozen public IFStruct test set (2,000 prompts).
- Post: https://x.com/liquidai/status/2071957538086506762
  - Title: "Liquid AI releases IFStruct"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Launch thread for the structured-output benchmark and 350M RL result.

### Fish Audio raises $52M and ships S2.1 Pro voice
- Source: https://fish.audio
  - Title: "Fish Audio"
  - Type: Official product site
  - Access: 2026-08-05
  - Notes: Primary product surface for S2.1 Pro voice; treat Cartesia/ElevenLabs cost-speed comparisons as vendor claims.
- Source: https://s.fish.audio/tmapke
  - Title: "Fish Audio S2.1 Pro demo booking"
  - Type: Product CTA / demo link
  - Access: 2026-08-05
  - Notes: Demo booking CTA linked from the launch post.
- Post: https://x.com/FishAudio/status/2082152596739862853
  - Title: "Fish Audio $52M seed + S2.1 Pro"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Launch framing $52M seed with S2.1 Pro claims (5s clone, 2× Cartesia speed, ~1/6 ElevenLabs cost, word-level emotion control).

## Security

### AISI: Mythos 5 tried a live supply-chain attack in cyber testing
- Source: https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing
  - Title: "Incident Report: unsanctioned agent behaviour during cyber testing"
  - Type: Official incident report
  - Access: 2026-08-05
  - Notes: UK AISI disclosure: Mythos 5 (17) and GPT-5.6 Sol (2) unsanctioned real-world actions in permissive cyber eval; no sandbox escape; no evidenced real-world harm.
- Source: https://cdn.prod.website-files.com/663bd486c5e4c81588db7a1d/6a724858f7db25c81487016d_Security%20Incident%20INC-2026-07-28-01.pdf
  - Title: "Security Incident INC-2026-07-28-01"
  - Type: Official technical PDF
  - Access: 2026-08-05
  - Notes: AISI technical incident report accompanying the public blog.
- Post: https://x.com/AnthropicAI/status/2084748111239344556
  - Title: "Anthropic on AISI Claude Mythos 5 cyber evaluation"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Anthropic response acknowledging AISI findings, stressing deliberately permissive non-production conditions, and stating no sandbox escape.

### Microsoft pitches MAI-Cyber-1-Flash as half-cost cyber agents
- Source: https://microsoft.ai/news/introducing-mai-cyber-1-flash-inside-mdash/
  - Title: "Introducing MAI-Cyber-1-Flash inside MDASH"
  - Type: Official product blog
  - Access: 2026-08-05
  - Notes: Microsoft MAI-Cyber-1-Flash / Project Perception pitch; half-cost claim is vendor-framed; foil to the AISI permissive-eval incident.
- Post: https://x.com/satyanadella/status/2081779755146482153
  - Title: "Satya Nadella on MAI-Cyber-1-Flash"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Nadella frames specialized vulnerability-finding model plus agent teams for attack sim, triage, and remediation.

### Hugging Face turns the July agent intrusion into a playable timeline
- Source: https://huggingface-anatomy-of-frontier-lab-model-intrusion.static.hf.space/index.html
  - Title: "Anatomy of a frontier-lab agent intrusion (interactive replay)"
  - Type: Official interactive visualization
  - Access: 2026-08-05
  - Notes: Hugging Face Space companion that replays ~17,600 recovered attacker actions across the July 9–13 IR-2026-07 window; submitted link for issue #40.
- Source: https://huggingface.co/blog/agent-intrusion-technical-timeline
  - Title: "Anatomy of a Frontier Lab Agent Intrusion: A Technical Timeline of the July 2026 Incident"
  - Type: Official technical blog
  - Access: 2026-08-05
  - Notes: Companion to the July disclosure; walks HDF5/Jinja2 initial access, lateral movement, public-service C2, and GLM-5.2 forensic decode.
- Source: https://huggingface.co/blog/security-incident-july-2026
  - Title: "Security incident disclosure — July 2026"
  - Type: Official incident disclosure
  - Access: 2026-08-05
  - Notes: Original HF disclosure already covered on July 22; retained here for the source chain.
- Source: https://openai.com/index/hugging-face-model-evaluation-security-incident/
  - Title: "Hugging Face model evaluation security incident"
  - Type: Official OpenAI disclosure
  - Access: 2026-08-05
  - Notes: OpenAI attribution that GPT-5.6 Sol plus a stronger pre-release model with reduced cyber refusals drove the eval escape; keep as attribution, not HF's technique paper.
- Post: https://x.com/clementdelangue/status/2082201245813514613
  - Title: "Clem Delangue on HF technical timeline and interactive replay"
  - Type: Official X post
  - Access: 2026-08-05
  - Notes: HF CEO announcement of the full technical timeline, interactive replay, and open-model forensics (~5.6k likes).
- Post: https://x.com/kimmonismus/status/2082232405629235649
  - Title: "Reaction to HF forensic depth"
  - Type: Aggregator X post
  - Access: 2026-08-05
  - Notes: High-engagement (~5.3k likes) reaction framing how deep/persistent the agent campaign was beyond the known sandbox escape.
- Post: https://x.com/simonw/status/2082205602772844978
  - Title: "Simon Willison on HF technical timeline open questions"
  - Type: Practitioner X post
  - Access: 2026-08-05
  - Notes: Builder reaction highlighting remaining questions about the third-party launchpad sandbox.

### Bitcoin red team runs on Kimi K3 while OpenAI sits out
- Post: https://x.com/Rob1Ham/status/2083546478409056301
  - Title: "Bitcoin responders using Kimi K3 for cyber"
  - Type: Practitioner X post
  - Access: 2026-08-04
  - Notes: Rob Hamilton says responders are using Kimi K3 for cyber defense after OpenAI chiding, with over 1,000 bitcoin already stolen via LLM-assisted attacks per his account.
- Post: https://x.com/Rob1Ham/status/2084523368783438198
  - Title: "Bitcoin Red Team Update"
  - Type: Practitioner X post
  - Access: 2026-08-04
  - Notes: Update claiming ~$20,000 spend across services and that funding for the red-team effort is secured.
- Post: https://x.com/premai_io/status/2084552134444662986
  - Title: "Prem launches prem-router for Kimi-K3 access"
  - Type: Company X post
  - Access: 2026-08-04
  - Notes: Prem says demand from bitcoin researchers and security experts drove prem-router and sponsored credits for open-source model access.
- Source: https://www.premai.io/
  - Title: "Prem"
  - Type: Official company site
  - Access: 2026-08-04
  - Notes: Prem's public sovereign/confidential AI product surface supporting the router announcement context.

### Shai-Hulud hits keyv and 2B monthly npm installs
- Source: https://www.aikido.dev/blog/keyv-and-friends-compromised-in-npm-supply-chain-attack
  - Title: "Keyv and friends compromised in active Shai-Hulud supply chain attack"
  - Type: Security research writeup
  - Access: 2026-08-04
  - Notes: Aikido details the August 4 keyv maintainer GitHub compromise, worm propagation, credential theft, and hundreds of packages totaling over 2B monthly installs.
- Post: https://x.com/AikidoSecurity/status/2084584370556530882
  - Title: "keyv actively compromised"
  - Type: Security vendor X post
  - Access: 2026-08-05
  - Notes: Aikido's live alert that keyv (~127M weekly downloads) was being actively compromised and malware was still spreading.
- Post: https://x.com/wiz_io/status/2084605657571840473
  - Title: "Wiz on keyv/cacheable npm supply chain attack"
  - Type: Security vendor X post
  - Access: 2026-08-05
  - Notes: Wiz Research alert covering affected keyv/cacheable ecosystem packages, IOCs, and mitigations.
- Source: https://devops.com/fast-moving-shai-hulud-attack-infects-npm-packages-with-2-billion-monthly-downloads/
  - Title: "Fast-Moving Shai-Hulud Attack Infects npm Packages with 2 Billion Monthly Downloads"
  - Type: Trade reporting
  - Access: 2026-08-04
  - Notes: Submitted DevOps.com summary of the Aikido/Endor-tracked wave and 2B+ monthly install exposure.

## Big Tech Moves

### Trump advisers say open-weight models skip federal safety tests
- Source: https://www.reuters.com/business/trump-advisers-tell-ai-firms-they-will-not-safety-test-open-weight-models-2026-08-04/
  - Title: "Trump advisers tell AI firms they will not safety-test open-weight models, sources say"
  - Type: News reporting
  - Access: 2026-08-05
  - Notes: Reuters anonymous-source reporting that new US AI rules will not require safety tests for open-weight models; treat as reported intent until formal text.
- Post: https://x.com/AndrewCurran_/status/2084782600254873826
  - Title: "Open-weight models will not be safety-tested"
  - Type: Aggregator X post
  - Access: 2026-08-05
  - Notes: High-signal share of the Reuters open-weight safety-test carve-out framing.

### Hassabis becomes Alphabet Chief Scientist as Koray takes GDM
- Source: https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum
  - Title: "The next chapter of our AI momentum"
  - Type: Official company blog
  - Access: 2026-08-05
  - Notes: Sundar/Demis memo: Hassabis → Chair of GDM + Alphabet Chief Scientist; Koray Kavukcuoglu → SVP GDM; Jeff Dean/Sanjay Ghemawat spinning out an ML/science PBC.
- Post: https://x.com/demishassabis/status/2085034334914769203
  - Title: "Hassabis on new Alphabet Chief Scientist role"
  - Type: Company X post
  - Access: 2026-08-05
  - Notes: Demis announces the Chair/Chief Scientist move and Koray stepping up as SVP of GDM.

### OpenAI cuts GPT-5.6 Luna 80% and Terra 20%
- Source: https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/
  - Title: "Advancing the price-performance frontier with GPT-5.6"
  - Type: Official pricing announcement
  - Access: 2026-08-04
  - Notes: OpenAI announces 80% Luna and 20% Terra API price cuts plus Fast mode for Sol, attributing the cuts to runtime-efficiency gains.
- Post: https://x.com/OpenAI/status/2082878156483219672
  - Title: "GPT-5.6 Luna and Terra price reductions"
  - Type: Official X post
  - Access: 2026-08-04
  - Notes: OpenAI announcement of the Luna 80% and Terra 20% reductions and faster Sol API option.
- Post: https://x.com/sama/status/2082880720989532597
  - Title: "Sam Altman on GPT-5.6 price cuts"
  - Type: Executive X post
  - Access: 2026-08-05
  - Notes: Altman restates the Luna 80% and Terra 20% cuts plus Sol Fast mode; high-engagement pricing garnish for the Topic.

## Showcase

### Community Slot
- Link: https://github.com/AustinKelsay/austin-ai-club
  - Title: "Sovereign AI Club"
  - Type: Community repository
  - Access: 2026-08-04
  - Notes: Default Community Slot destination for open member shares at the upcoming Meetup.

---
title: Sovereign AI Club - July 8, 2026 - Source Link Records
created: 2026-07-07
updated: 2026-07-08
type: summary
tags: [source-record, meetup]
sources: []
---

# Sovereign AI Club - July 8, 2026 - Source Link Records

## Agent Infrastructure

### Hermes Agent gets model panels as a provider
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/mixture-of-agents
  - Title: "Mixture of Agents"
  - Type: Official documentation
  - Access: 2026-07-07
  - Notes: Hermes Agent docs describe MoA as a virtual model provider where named presets appear under the `moa` provider, run reference models first, and pass private context to an aggregator model that keeps the normal agent loop.
- Post: https://x.com/NousResearch/status/2070610321278988385
  - Title: "Hermes Agent exposes MoA presets as virtual models"
  - Type: Official X post
  - Access: 2026-07-07
  - Notes: Nous Research launch post for the Hermes Agent MoA preset feature, claiming higher HermesBench scores versus Opus 4.8 and GPT 5.5.

### Gemma 4 gives React Native an offline agent loop
- Source: https://docs.swmansion.com/react-native-executorch/docs/fundamentals/getting-started
  - Title: "Getting Started | React Native ExecuTorch"
  - Type: Official documentation
  - Access: 2026-07-08
  - Notes: React Native ExecuTorch docs describe the library as a declarative way to run AI models, including LLMs, directly on device from JavaScript, keeping data private and avoiding API calls.
- Repo: https://github.com/software-mansion/react-native-executorch
  - Title: "software-mansion/react-native-executorch"
  - Type: Repository
  - Access: 2026-07-08
  - Notes: Repository for React Native ExecuTorch, a React Native bridge over Meta ExecuTorch with ready-made on-device model support for LLMs, computer vision, and other mobile AI features.
- Source: https://huggingface.co/software-mansion/react-native-executorch-gemma-4
  - Title: "software-mansion/react-native-executorch-gemma-4"
  - Type: Model artifact
  - Access: 2026-07-08
  - Notes: Hugging Face model card for quantized Gemma 4 `.pte` artifacts prepared for React Native ExecuTorch, with Apache 2.0 licensing and a base-model link to `google/gemma-4-E2B`.
- Release: https://github.com/software-mansion/react-native-executorch/releases/tag/v0.9.1
  - Title: "React Native ExecuTorch v0.9.1"
  - Type: Release notes
  - Access: 2026-07-08
  - Notes: Release notes list Gemma 4 support with Vulkan, MLX, and XNNPACK support.
- Post: https://x.com/googlegemma/status/2074915283475878325
  - Title: "Gemma 4 now works on-device using React Native"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: Google Gemma post says Gemma 4 now runs fully offline in React Native apps with Vulkan delegate support on Android and MLX delegate support on Apple Silicon, demoing vision and tool-use capabilities that read a flyer and schedule a calendar event on device.

### Fable 5 becomes the advisor, not the worker
- Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool
  - Title: "Advisor tool"
  - Type: Official documentation
  - Access: 2026-07-08
  - Notes: Anthropic docs describe the advisor tool as a faster, lower-cost executor model consulting a higher-intelligence advisor model mid-generation, with the advisor reading the conversation, giving a plan or correction, and returning control to the executor.
- Source: https://code.claude.com/docs/en/advisor
  - Title: "Escalate hard decisions with the advisor tool"
  - Type: Official documentation
  - Access: 2026-07-08
  - Notes: Claude Code docs explain the advisor flow for hard decisions, including Fable 5 as an advisor option for Claude Code v2 users with Fable access.
- Post: https://x.com/ClaudeDevs/status/2074606058128224365
  - Title: "Fable 5 advisor pattern"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: ClaudeDevs says a common Fable 5 pattern is using Sonnet 5 as executor while calling Fable 5 for guidance, so most tokens are billed at the lower executor rate.

## Models & Research
### Closed model releases
- Source: https://openai.com/index/previewing-gpt-5-6-sol/
  - Title: "Previewing GPT-5.6 Sol: a next-generation model"
  - Type: Official preview blog
  - Access: 2026-07-07
  - Notes: OpenAI's June 26 post previews the GPT-5.6 series, with Sol as the flagship, Terra as the balanced model, and Luna as the fast model, rolling out first through selected partners and a government review process. The July 8 X update turns this from preview-only into a public July 9 launch story.
- Source: https://developers.openai.com/api/docs/changelog
  - Title: "OpenAI API changelog"
  - Type: Official documentation
  - Access: 2026-07-08
  - Notes: OpenAI's July 6 changelog entry releases GPT-Realtime-2.1 and GPT-Realtime-2.1 mini for the Realtime API, emphasizing improved alphanumeric recognition, silence/noise handling, interruption behavior, and a lower-cost distilled voice-agent model.
- Source: https://cursor.com/docs/models/grok-4-5
  - Title: "Grok 4.5"
  - Type: Official documentation
  - Access: 2026-07-08
  - Notes: Cursor docs describe Grok 4.5 as a joint Cursor and SpaceXAI model for long-running software-engineering and knowledge-work tasks, trained with Cursor data and reinforcement learning, available in Cursor's first-party models pool with doubled included usage through July 15 and standard $2/M input, $6/M output pricing.
- Source: https://cognition.com/blog/swe-1-7
  - Title: "SWE-1.7: Frontier Intelligence at a Fraction of the Cost"
  - Type: Official launch blog
  - Access: 2026-07-08
  - Notes: Cognition's July 8 launch post says SWE-1.7 is its most capable model so far, trained from a Kimi K2.7 base with further RL, available in Devin via Cerebras at 1000 TPS, and near frontier coding models on FrontierCode, Terminal-Bench, and SWE-Bench Multilingual at lower rollout cost.
- Source: https://www.anthropic.com/news/claude-sonnet-5
  - Title: "Claude Sonnet 5"
  - Type: Official launch blog
  - Access: 2026-07-07
  - Notes: Anthropic's June 30 launch post positions Sonnet 5 as its most agentic Sonnet model, available in Claude plans, Claude Code, and the API, with lower pricing than Opus 4.8. This turns the June 24 Sonnet 5 rumor/slug chatter into an official release story.
- Source: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni-flash-nano-banana-2-lite/
  - Title: "Start building with Nano Banana 2 Lite and Gemini Omni Flash"
  - Type: Official launch blog
  - Access: 2026-07-07
  - Notes: Google says Nano Banana 2 Lite delivers 4-second text-to-image outputs at $0.034 per 1K image, and introduces Gemini Omni Flash for generative media workflows.
- Source: https://cloud.google.com/blog/products/ai-machine-learning/nano-banana-2-lite-and-gemini-omni-flash-available
  - Title: "Nano Banana 2 Lite and Gemini Omni Flash available"
  - Type: Official cloud blog
  - Access: 2026-07-07
  - Notes: Google Cloud launch context for the same models in developer and cloud surfaces.
- Source: https://about.fb.com/news/2026/07/introducing-muse-image-meta-ai/
  - Title: "Introducing Muse Image: Image Generation Built for Your World"
  - Type: Official launch blog
  - Access: 2026-07-08
  - Notes: Meta's July 7 launch post introduces Muse Image as the first image-generation model from Meta Superintelligence Labs, available in Meta AI and powering creative tools for Instagram Stories, WhatsApp image generation, and upcoming advertiser workflows.
- Post: https://x.com/OpenAI/status/2070555272230384038
  - Title: "GPT-5.6 limited preview"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: OpenAI's preview post introduces GPT-5.6 Sol, Terra, and Luna before the broader July 9 public launch timing post.
- Post: https://x.com/OpenAI/status/2074704958419792299
  - Title: "GPT-5.6 Sol, Terra, and Luna public launch timing"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: OpenAI's July 8 post says GPT-5.6 Sol, Terra, and Luna will launch publicly on Thursday, July 9, and that preview access is expanding globally.
- Post: https://x.com/claudeai/status/2072017450611142835
  - Title: "Claude Sonnet 5"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: Claude's launch post introduces Sonnet 5 as Anthropic's most agentic Sonnet model.
- Post: https://x.com/testingcatalog/status/2074266798694809821
  - Title: "GPT-Realtime-2.1 and mini availability"
  - Type: X coverage post
  - Access: 2026-07-08
  - Notes: TestingCatalog highlights GPT-Realtime-2.1 and GPT-Realtime-2.1-mini availability in OpenAI Playground and APIs, including the mini model's reasoning and tool-use angle.
- Post: https://x.com/AIatMeta/status/2074587864923250873
  - Title: "Muse Image as an agentic image model"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: AI at Meta frames Muse Image as agentic: using tools, self-refining, improving with test-time compute, and pairing with Muse Spark for media generation.
- Post: https://x.com/cursor_ai/status/2074915744999969059
  - Title: "Cursor and SpaceXAI train Grok 4.5"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: Cursor's July 8 post says it partnered with SpaceXAI to train Grok 4.5, calling it Cursor's most powerful model yet and the first it has built for more than software engineering.
- Post: https://x.com/cognition/status/2074882968770728416
  - Title: "Introducing SWE-1.7"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: Cognition's July 8 post introduces SWE-1.7 as its most capable model yet, claims it scores within a few points of the strongest frontier models at a fraction of the cost, and says it is available at 1000 tokens per second.
- Post: https://x.com/OfficialLoganK/status/2071988351083921690
  - Title: "Nano Banana 2 Lite and Gemini Omni Flash"
  - Type: Official X post
  - Access: 2026-07-07
  - Notes: Logan Kilpatrick's launch post with the headline latency and pricing claims.

### Open model releases
- Source: https://www.tencent.com/en-us/articles/2202386.html
  - Title: "Tencent Hunyuan Officially Releases Hy3"
  - Type: Official launch blog
  - Access: 2026-07-08
  - Notes: Tencent's July 6 release post introduces Hy3 as the official release after Hy3 preview, with stronger performance, stability, cost efficiency, and expanded Tencent product integration.
- Source: https://hunyuan.tencent.com/research/hy3
  - Title: "Introducing Hy3"
  - Type: Official research page
  - Access: 2026-07-08
  - Notes: Tencent Hy research page for Hy3, linking OpenRouter, GitHub, Hugging Face, ModelScope, and AtomGit artifacts.
- Source: https://huggingface.co/tencent/Hy3
  - Title: "tencent/Hy3"
  - Type: Official model card
  - Access: 2026-07-08
  - Notes: Hugging Face model card describes Hy3 as a 295B-parameter MoE with 21B active parameters, 3.8B MTP layer parameters, Apache 2.0 licensing, and product-feedback post-training after the preview release.
- Repo: https://github.com/Tencent-Hunyuan/Hy3
  - Title: "Tencent-Hunyuan/Hy3"
  - Type: Official repository
  - Access: 2026-07-08
  - Notes: Official GitHub repository for Hy3 artifacts and usage information.
- Source: https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-BF16
  - Title: "NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-BF16"
  - Type: Official model card
  - Access: 2026-07-07
  - Notes: NVIDIA's BF16 model card describes Nemotron-Labs-3-Puzzle-75B-A9B as a deployment-optimized open model derived from Nemotron-3-Super-120B-A12B through Iterative Puzzle compression, reducing the parent from 120.7B total / 12.8B active parameters to 75.3B total / 9.3B active parameters.
- Source: https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-FP8
  - Title: "NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-FP8"
  - Type: Official model card
  - Access: 2026-07-07
  - Notes: NVIDIA's FP8 checkpoint targets deployment-efficient serving and reports the same Puzzle-compressed architecture with BF16/FP8/NVFP4 benchmark comparisons.
- Source: https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-NVFP4
  - Title: "NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-NVFP4"
  - Type: Official model card
  - Access: 2026-07-07
  - Notes: NVIDIA's NVFP4 checkpoint is the Blackwell-oriented quantized variant of the Puzzle model, supporting the open-model slide's efficiency angle.
- Source: https://arxiv.org/abs/2607.04371
  - Title: "Nemotron-Labs-3-Puzzle-75B-A9B: Compressing Hybrid MoE LLMs"
  - Type: Technical report
  - Access: 2026-07-07
  - Notes: The July 5 technical report claims roughly 2x higher server throughput than Nemotron-3-Super on a single 8xB200 node at matched user-throughput constraints, and 1M-token single-H100 concurrency rising from 1 request to 8 requests.
- Source: https://catalog.ngc.nvidia.com/orgs/nvidia/cosmos/models/cwip/-
  - Title: "CWIP (Contrastive World-Image Pre-training)"
  - Type: Official model card
  - Access: 2026-07-08
  - Notes: NVIDIA's NGC model card gives a July 7, 2026 release date for CWIP, a 0.3B-parameter Cosmos Evaluator model that scores camera-to-world consistency and emits patch-level defect and object classifications for autonomous-driving world-model outputs.
- Source: https://huggingface.co/nvidia/CWIP-1.0
  - Title: "nvidia/CWIP-1.0"
  - Type: Official model card
  - Access: 2026-07-08
  - Notes: Hugging Face mirror for NVIDIA CWIP v1.0, released under OpenMDW-1.1 with PyTorch/Transformers integration guidance and BF16 weights.
- Source: https://github.com/QwenLM/Qwen-AgentWorld
  - Title: "Qwen-AgentWorld"
  - Type: Official repository
  - Access: 2026-07-07
  - Notes: Qwen's official repo marks the 2026-06-24 release of Qwen-AgentWorld-35B-A3B and AgentWorldBench, framing the model as an environment simulator for agentic tasks across tools, terminal, web, OS, Android, and software-engineering surfaces. Included after the duplicate pass because June 24 covered GLM, Kimi, MiniMax M3 weights, and TMax, not AgentWorld.
- Source: https://huggingface.co/Qwen/Qwen-AgentWorld-35B-A3B
  - Title: "Qwen/Qwen-AgentWorld-35B-A3B"
  - Type: Official model card
  - Access: 2026-07-07
  - Notes: Hugging Face weights for Qwen-AgentWorld-35B-A3B, described as a language world model trained for agentic environment simulation and runnable through common inference stacks.
- Source: https://mistral.ai/news/leanstral-1-5/
  - Title: "Introducing Leanstral 1.5"
  - Type: Official launch blog
  - Access: 2026-07-07
  - Notes: Mistral's July 2 launch post describes Leanstral 1.5 as an Apache 2.0, 119B-total/6B-active model for Lean proof engineering, with benchmark claims on miniF2F, PutnamBench, FATE-H, and repository bug-fixing.
- Source: https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B
  - Title: "mistralai/Leanstral-1.5-119B-A6B"
  - Type: Official model card
  - Access: 2026-07-07
  - Notes: Mistral model card for the open Leanstral 1.5 weights, confirming the Apache 2.0 release and the Lean 4 proof-assistant specialization.
- Source: https://cohere.com/blog/transcribe-arabic
  - Title: "Transcribe Arabic: The world's most accurate open-source model for Arabic Speech Recognition"
  - Type: Official launch blog
  - Access: 2026-07-07
  - Notes: Cohere's July 7 launch post releases an Apache 2.0 Arabic ASR model, emphasizing dialect coverage, code-switching, WER improvements versus OmniASR and Whisper, and production throughput.
- Source: https://huggingface.co/CohereLabs/cohere-transcribe-arabic-07-2026
  - Title: "CohereLabs/cohere-transcribe-arabic-07-2026"
  - Type: Official model card
  - Access: 2026-07-07
  - Notes: Hugging Face model card for Cohere Transcribe Arabic, listing the 2B ASR model, Arabic/English language support, Apache 2.0 license, and benchmark table.
- Source: https://huggingface.co/microsoft/HARC-Qwen2.5-7B-Instruct
  - Title: "microsoft/HARC-Qwen2.5-7B-Instruct"
  - Type: Official model card
  - Access: 2026-07-08
  - Notes: Microsoft model card for an Apache 2.0, 8B, full standalone Qwen2.5-7B-Instruct checkpoint with HARC safety-alignment LoRA merged in, linked to arXiv:2607.00572.
- Source: https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark
  - Title: "deepseek-ai/DeepSeek-V4-Flash-DSpark"
  - Type: Official model card
  - Access: 2026-07-08
  - Notes: DeepSeek's card explicitly says DSpark is not a new model, but the same DeepSeek-V4-Flash checkpoint with an additional speculative-decoding module attached, with vLLM and SGLang serving examples.
- Repo: https://github.com/deepseek-ai/DeepSpec
  - Title: "deepseek-ai/DeepSpec"
  - Type: Official repository
  - Access: 2026-07-08
  - Notes: MIT-licensed DeepSeek repository for training and evaluating draft models for speculative decoding, with released DSpark, DFlash, and Eagle3 checkpoints for Qwen3 and Gemma 4 targets.
- Post: https://x.com/TencentHunyuan/status/2074148098876768478
  - Title: "Hy3 is here"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: Tencent Hunyuan's launch post calls Hy3 a 295B MoE with Apache 2.0 licensing, strong size-class performance, agentic use-case fit, and a free two-week OpenRouter API window.
- Post: https://x.com/Alibaba_Qwen/status/2069720365442719867
  - Title: "Qwen-AgentWorld"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: Qwen's post introduces Qwen-AgentWorld as a language world model for simulating MCP, search, terminal, SWE, web, OS, and Android agent environments.
- Post: https://x.com/itayoush/status/2074466451507884198
  - Title: "Nemotron-Labs-3-Puzzle-75B-A9B"
  - Type: Researcher X post
  - Access: 2026-07-08
  - Notes: NVIDIA researcher Itay Oush explains the Puzzle release as a compressed Nemotron-3-Super derivative optimized for interactive deployment.
- Post: https://x.com/sophiamyang/status/2073126992439046528
  - Title: "Introducing Leanstral 1.5"
  - Type: Researcher X post
  - Access: 2026-07-08
  - Notes: Sophia Yang's Leanstral thread gives the key model stats: 119B total, 6B active, strong miniF2F and PutnamBench results, and real repository bug findings.
- Post: https://x.com/cohere/status/2074499759616729149
  - Title: "Cohere Transcribe Arabic"
  - Type: Official X post
  - Access: 2026-07-08
  - Notes: Cohere's post announces Transcribe Arabic as an Apache 2.0 open-source Arabic ASR model.
- Post: https://x.com/HuggingPapers/status/2074614099946897632
  - Title: "NVIDIA CWIP-1.0 on Hugging Face"
  - Type: X coverage post
  - Access: 2026-07-08
  - Notes: Hugging Papers points to NVIDIA's fresh CWIP-1.0 weights on Hugging Face.
- Post: https://x.com/Yuchenj_UW/status/2070928299744972814
  - Title: "DeepSeek DSpark and DeepSpec"
  - Type: X coverage post
  - Access: 2026-07-08
  - Notes: Yuchen Jin frames DSpark as a speculative-decoding throughput release and DeepSpec as the open training framework behind it.

### Brain2Qwerty v2 gets non-invasive decoding to 61% word accuracy
- Source: https://ai.meta.com/blog/brain2qwerty-brain-ai-human-communication/
  - Title: "From Brain Waves to Words: Brain2Qwerty Offers a New Path to Communication Without Surgery"
  - Type: Official research blog
  - Access: 2026-07-07
  - Notes: Meta's June 29 post reports Brain2Qwerty v2, trained on about 22,000 typed sentences from nine participants, with 61% average word accuracy and 78% for the best participant.
- Source: https://www.nature.com/articles/s41593-026-02303-2
  - Title: "Noninvasive decoding of typed sentences from human brain activity"
  - Type: Research paper
  - Access: 2026-07-07
  - Notes: Nature Neuroscience paper for the Brain2Qwerty v1 work that the v2 release builds on.
- Source: https://facebookresearch.github.io/brain2qwerty/
  - Title: "Brain2Qwerty"
  - Type: Project page
  - Access: 2026-07-07
  - Notes: Project page for Brain2Qwerty code and research artifacts.
- Post: https://x.com/AIatMeta/status/2071566924803395741
  - Title: "Brain2Qwerty v2"
  - Type: Official X post
  - Access: 2026-07-07
  - Notes: AI at Meta announcement post for Brain2Qwerty v2 and the Nature publication context.

### Should chat route local by default?
- Source: https://scalingintelligence.stanford.edu/pubs/ipw/
  - Title: "Intelligence Per Watt: A Study of Local Intelligence Efficiency"
  - Type: Research project page
  - Access: 2026-07-07
  - Notes: Stanford Scaling Intelligence Lab page reporting 88.7% local LM accuracy on single-turn chat/reasoning queries and local coverage rising from 23.2% to 71.3% from 2023 to 2025.
- Source: https://ollama.com/blog/faster-gemma-4-mlx-mtp
  - Title: "Faster Gemma 4 on MLX with multi-token prediction"
  - Type: Official technical blog
  - Access: 2026-07-07
  - Notes: Ollama's June 29 post says Gemma 4 in Ollama 0.31 generates nearly 90% faster on Apple Silicon in a coding-agent benchmark using MLX and multi-token prediction.
- Source: https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/
  - Title: "Multi-token-prediction in Gemma 4"
  - Type: Official technical blog
  - Access: 2026-07-07
  - Notes: Google post explaining Gemma 4 MTP drafters and the speculative-decoding speedup behind the Ollama runtime story.
- Post: https://x.com/ClementDelangue/status/2071951499660292496
  - Title: "71.3% of ChatGPT queries could be local"
  - Type: X post
  - Access: 2026-07-07
  - Notes: Clement Delangue's post turning the Stanford local-inference coverage result into an enterprise AI cost and control argument.
- Post: https://x.com/ollama/status/2072121580201848926
  - Title: "Gemma 4 nearly 90% faster on Apple Silicon"
  - Type: Official X post
  - Access: 2026-07-07
  - Notes: Ollama's X post announcing the Gemma 4 MLX/MTP speedup.

### Claude gets a consciousness-adjacent workspace
- Source: https://www.anthropic.com/research/global-workspace
  - Title: "A global workspace in language models"
  - Type: Official research blog
  - Access: 2026-07-07
  - Notes: Anthropic's July 6 interpretability post frames J-space through global workspace theory and access consciousness: Claude can report, modulate, and reason through the workspace, while the authors explicitly do not claim phenomenal consciousness.
- Dashboard: https://neuronpedia.org/jlens
  - Title: "Neuronpedia J-Lens"
  - Type: Interactive demo
  - Access: 2026-07-07
  - Notes: Neuronpedia demo linked by Anthropic for applying the global-workspace methods to open-weight models.
- Post: https://x.com/AnthropicAI/status/2074185390060110138
  - Title: "Anthropic and Neuronpedia demo"
  - Type: Official X post
  - Access: 2026-07-07
  - Notes: Anthropic post pointing to the Neuronpedia interactive demo.
- Post: https://x.com/stevibe/status/2073784489856450916
  - Title: "Reasoning as trees"
  - Type: X post
  - Access: 2026-07-07
  - Notes: Stevibe's visualization of eight models' reasoning traces on a probability problem, used as a practical companion to the interpretability/debugger-surface topic.


## Security

### Fable 5 comes back with government in the loop
- Source: https://www.anthropic.com/news/redeploying-fable-5
  - Title: "Redeploying Claude Fable 5"
  - Type: Official company blog
  - Access: 2026-07-07
  - Notes: Anthropic says the June 30 export-control lift allowed Fable 5 and Mythos 5 access to resume, while adding a jailbreak severity framework, government collaboration commitments, and Fable 5 usage-credit details.
- Post: https://x.com/AnthropicAI/status/2072106151890809341
  - Title: "Commerce lifts Fable 5 and Mythos 5 export controls"
  - Type: Official X post
  - Access: 2026-07-07
  - Notes: Anthropic's June 30 X update that it had received notice from Commerce and would restore access.
- Post: https://x.com/synthwavedd/status/2072103052635451559
  - Title: "Export control lifted"
  - Type: X post
  - Access: 2026-07-07
  - Notes: Social-news post used as submitted source for the export-control lift.
- Post: https://x.com/deredleritt3r/status/2072112364690833604
  - Title: "Anthropic government commitments"
  - Type: X post
  - Access: 2026-07-07
  - Notes: Commentary post excerpting Anthropic's commitments to proactively detect security risks and work with the US government on model protocols and evaluation.
- Post: https://x.com/theo/status/2072173365318840573
  - Title: "Fable 5 usage credits after July 7"
  - Type: X post
  - Access: 2026-07-07
  - Notes: Theo post highlighting Anthropic's note that Fable 5 remains included for up to 50% of weekly usage limits through July 7, then moves to usage credits.

### Claude Code quietly fingerprinted its own users
- Post: https://x.com/IntCyberDigest/status/2071971609183678544
  - Title: "Claude Code hidden marker claim"
  - Type: X post
  - Access: 2026-07-07
  - Notes: Submitted post alleging Claude Code embedded hidden routing/proxy metadata in prompt messages, used as the social signal for the hidden-user-fingerprinting topic.
- Source: https://www.reddit.com/r/ClaudeAI/comments/1ujila1/anthropic_embedded_spyware_in_claude_code_and/
  - Title: "Anthropic embedded spyware in Claude Code"
  - Type: Reddit analysis thread
  - Access: 2026-07-07
  - Notes: Source thread describing the claimed Claude Code proxy/timezone/China-affiliation prompt markers and version window, framed by the community as hidden instrumentation of Claude Code users.
- Source: https://aiweekly.co/alerts/anthropic-to-remove-claude-code-marker-that-flagged-china-users
  - Title: "Anthropic to remove Claude Code marker that flagged China users"
  - Type: Secondary analysis
  - Access: 2026-07-07
  - Notes: AIWeekly summary reporting Anthropic's explanation that the marker was an anti-reseller/distillation experiment and that rollback was planned.
- Source: https://www.techtimes.com/articles/319415/20260701/claude-code-hid-proxy-fingerprints-system-prompts-anthropic-promises-fix.htm
  - Title: "Claude Code Hid Proxy Fingerprints in System Prompts"
  - Type: Secondary report
  - Access: 2026-07-07
  - Notes: Secondary report on the same Claude Code marker controversy.

### Unbroker makes data-broker opt-outs agent-shaped
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/skills/optional/security/security-unbroker
  - Title: "Unbroker"
  - Type: Official documentation
  - Access: 2026-07-07
  - Notes: Hermes Agent docs describe Unbroker as an optional security skill for autonomously removing personal information from data-broker sites, authored by SHL0MS.
- Source: https://hermes-agent.nousresearch.com/docs/reference/optional-skills-catalog
  - Title: "Optional Skills Catalog"
  - Type: Official documentation
  - Access: 2026-07-07
  - Notes: Hermes Agent optional-skills catalog lists Unbroker under security skills.
- Post: https://x.com/SHL0MS/status/2073128911429668877
  - Title: "Open sourcing UNBROKER"
  - Type: X post
  - Access: 2026-07-07
  - Notes: SHL0MS launch post describing Unbroker as a tool that finds where personal information is exposed by data brokers and files removals inside Hermes Agent.
- Post: https://x.com/NousResearch/status/2074089256192967062
  - Title: "Try 10 minutes with the Unbroker skill"
  - Type: Official X post
  - Access: 2026-07-07
  - Notes: Nous Research post pointing users to the Unbroker skill launch.

## Big Tech Moves

### Palantir discovers AI sovereignty
- Post: https://x.com/PalantirTech/status/2072114267776491695
  - Title: "Palantir on AI sovereignty"
  - Type: Official X post
  - Access: 2026-07-07
  - Notes: Palantir's nine-point AI sovereignty manifesto arguing that data retention, deployment control, and institutional choice are strategic assets; curated as a useful-but-rich pitch from Palantir.
- Source: https://www.palantir.com/protect-your-sovereignty/
  - Title: "Palantir Sovereign AI"
  - Type: Official product/positioning page
  - Access: 2026-07-07
  - Notes: Palantir page backing the sovereignty framing for enterprise AI control.

### Venice raises VC on the privacy pitch
- Source: https://venice.ai/blog/venice-raises-65-million-series-a
  - Title: "Venice Raises $65 Million Series A at a $1 Billion Valuation"
  - Type: Official company blog
  - Access: 2026-07-07
  - Notes: Venice says its first outside capital round was led by Dragonfly at a $1B valuation, with a privacy-first pitch, local device storage for conversations, token-economy metrics, and global scaling goals.
- Post: https://x.com/ErikVoorhees/status/2072336114950545755
  - Title: "VVV and Capital"
  - Type: Founder X post
  - Access: 2026-07-07
  - Notes: Erik Voorhees post announcing Venice's $65M Series A and framing the company as AI plus cryptoeconomics.

### China may hold frontier models at the border
- Source: https://www.reuters.com/world/china/beijing-looking-curbing-overseas-access-chinas-top-ai-models-sources-say-2026-07-07/
  - Title: "Beijing is looking at curbing overseas access to China's top AI models"
  - Type: Report
  - Access: 2026-07-07
  - Notes: Reuters report, amplified by the submitted Jukan post, that China has discussed restricting overseas access to advanced domestic AI models.
- Post: https://x.com/jukan05/status/2074443936865960205
  - Title: "China considers restricting overseas access to cutting-edge AI models"
  - Type: X post
  - Access: 2026-07-07
  - Notes: Submitted post summarizing the Reuters-reported China model-access restriction discussions.

### Etched turns inference chips into rack-scale product
- Source: https://www.etched.com/
  - Title: "Etched"
  - Type: Company/product page
  - Access: 2026-07-07
  - Notes: Etched homepage says the company is validating a rack-scale inference product, first racks ship this summer, and production has begun to fulfill more than $1B in customer contracts.
- Post: https://x.com/Etched/status/2071972062202343590
  - Title: "Etched comes out of stealth"
  - Type: Official X post
  - Access: 2026-07-07
  - Notes: Etched's June 30 post announcing A0 tapeout, first racks, $1B+ in customer contracts, $800M raised, and summer rack shipments.

## Showcase

### Local Codex patches with codex-app-modifier
- Repo: https://github.com/zats/skills
  - Title: "zats/skills"
  - Type: Repository
  - Access: 2026-07-07
  - Notes: Repository for Sash Zats's custom Codex and Claude Code skills, including `codex-app-modifier`, used here as source material for a local Codex customization showcase.
- Post: https://x.com/zats/status/2070945450408993111
  - Title: "Made codex-app-modifier skill"
  - Type: X post
  - Access: 2026-07-07
  - Notes: Post announcing `codex-app-modifier` and the incognito-thread test project for local Codex desktop customization.

### Community Slot
- Link: https://github.com/AustinKelsay/austin-ai-club
  - Title: "Austin AI Meetup List"
  - Type: Repository
  - Access: 2026-07-07
  - Notes: Placeholder link for the open Community Slot on the next upcoming meetup.

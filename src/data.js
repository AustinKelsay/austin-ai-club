// This file is the frontend's explicit content contract.
// Keep it boring: meetups -> tracks -> items.
//
// Optional meetup-level Presentation Mode shape:
// - presentationIntro: welcome slide shown before all track slides
// - event: meetup metadata for reminders + add-to-calendar links
// - showcases: short end-of-meetup shares rendered as the final track
//
// Supported item shapes:
// - href: plain linked topic
// - embed / embeds: X/Twitter embed override(s)
// - image / images: linked hero image override(s)
// - video / videos: standalone video embed override(s)
// - mediaPair: combined topic media, including tweet/image/video/link/article cards
// - xArticle(...): curated article card for X longform articles that do not embed cleanly
// - linkPair: supporting link-card row (legacy name; accepts any number of links)
// - notes: optional presenter note (string) shown as a callout
// - topStory: optional host-facing highlight in the meetup topic list
// - releaseRoundup: official Closed/Open model-release Topic; shows the full
//   embeds + linkPair feed in a scrollable Presentation Mode catalog
// - suppressXEmbeds / suppressVideos / suppressImages: opt out of default media rendering
//
// Standard track taxonomy for recurring club meetups:
// 1. Local Builds & Projects
// 2. Agent Infrastructure
// 3. Models & Research
// 4. Security
// 5. Big Tech Moves
//
// Models & Research convention:
// Lead with official Release Roundup Topics titled exactly "Closed model releases"
// and "Open model releases" (set releaseRoundup: true). Keep non-release research,
// evals, and papers as separate Topics after those two.
function xArticle(article) {
  return {
    ...article,
    type: "article",
    eyebrow: article.eyebrow ?? "X article",
  };
}

export const meetups = [
  {
    "id": "meetup-2026-09-09",
    "slug": "2026-09-09",
    "date": "September 9, 2026",
    "markdownHref": "./topics/2026-09-09.md",
    "event": {
      "title": "Sovereign AI Club",
      "summary": "Quick AI news rundown, demos, and open discussion.",
      "startAt": "2026-09-09T17:30:00-05:00",
      "endAt": "2026-09-09T19:30:00-05:00",
      "timezone": "America/Chicago",
      "locationName": "AI Freedom Lab",
      "locationAddress": "Austin, TX",
      "reminderSendHour": 10
    },
    "presentationIntro": {
      "eyebrow": "Sovereign AI Club",
      "title": "Sovereign AI Club",
      "bullets": [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase."
      ],
      "hostNote": "5:30 welcome; 5:40 local infrastructure; 6:00 releases and research; 6:30 security; 6:50 platform control; 7:10 community demos; 7:30 finish. Use only the supported claims on these slides. Unverified speed tests, attribution leads, and private-data allegations are excluded."
    },
    "showcases": [],
    "tracks": [
      {
        "id": "agent-infrastructure",
        "title": "Agent Infrastructure",
        "items": [
          {
            "title": "Tailcat connects agent sandboxes without a Tailscale account",
            "description": "Tailscale released an open-source Go package and CLI for encrypted, temporary connections without its control plane. Run your own DERP relay if you want independence from its hosted relay service.",
            "href": "https://tailscale.com/blog/tailcat",
            "linkPair": [],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/tailscale/status/2094485903016177871"
              }
            ],
            "notes": "When does an agent need one temporary connection instead of membership in your whole network? Optional demo: connect two disposable environments and transfer a harmless file. Hosted relays retain metadata; an accountless connection is not anonymity.",
            "topStory": true
          },
          {
            "title": "GLM-5.3 Flash gets a four-Spark recipe and DwarfStar support",
            "description": "Alex Ellis published a switchless four-DGX-Spark GLM-5.3 Flash recipe; antirez added GLM-5.3 and Flash support to DwarfStar, including Flash vision and SSD-streaming improvements.",
            "href": "https://github.com/alexellis/glm-5.3-flash-4x-dgx-spark-switchless",
            "linkPair": [
              "https://github.com/antirez/ds4"
            ],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/alexellisuk/status/2094351871859188068"
              },
              {
                "type": "tweet",
                "href": "https://x.com/antirez/status/2094421702226677841"
              }
            ],
            "notes": "Which path gets a useful coding model onto hardware we can own? Ellis reports 75.2 tok/s completed code and 29.8 prose in RigMark; do not substitute the 109.6 structured-output ceiling. DwarfStar requires its supported model files, not arbitrary GGUFs.",
            "topStory": true
          },
          {
            "title": "NVIDIA PAIR routes inference across your local PCs",
            "description": "NVIDIA announced Personal AI Router to send inference requests to available machines on your LAN. That pools serving capacity; it does not by itself make several PCs one tensor-parallel model.",
            "href": "https://blogs.nvidia.com/blog/local-ai-ifa-next-gen-agents-nv-pair-rtx-spark/",
            "linkPair": [],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/nvidiartxspark/status/2095580592704217349"
              }
            ],
            "notes": "Can local routing make a household or lab feel like one reliable inference service? Announcement-stage item. Distinguish request routing from the four-Spark tensor-parallel recipe; verify installer availability before proposing a live demo."
          }
        ]
      },
      {
        "id": "models-research",
        "title": "Models & Research",
        "items": [
          {
            "title": "Closed model releases",
            "description": "Astra, Fable/Mythos 5.1, Gemini 3.8 Flash, Muse Spark 1.3, and Mercury 2.5 lead a 14-family roundup spanning reasoning, image/video/world generation, speech, and document parsing. Check the access labels: Mythos and Flash Cyber are restricted, Atlas and Mercury Voice/Router are previews, and Mistral OCR 4.1 is a general-availability update.",
            "href": "https://openai.com/index/gpt-6-astra/",
            "linkPair": [
              "https://www.anthropic.com/claude/fable",
              "https://www.anthropic.com/claude/mythos",
              "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/",
              "https://research.meta.ai/blog/introducing-muse-spark-1-3",
              "https://www.inceptionlabs.ai/blog/introducing-mercury-2-5",
              "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/",
              "https://openai.com/index/introducing-chatgpt-images-2-5/",
              "https://www.worldlabs.ai/blog/atlas",
              "https://www.visko.ai/models#orbis",
              "https://www.cartesia.ai/blog/sonic-3.6",
              "https://docs.cohere.com/v1/changelog/parse",
              "https://docs.mistral.ai/resources/changelogs",
              "https://developers.deepgram.com/changelog/2026/9/3",
              "https://research.meta.ai/blog/introducing-muse-voice-transcribe"
            ],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/OpenAI/status/2095595741528125780"
              },
              {
                "type": "tweet",
                "href": "https://x.com/claudeai/status/2094848572143407483"
              },
              {
                "type": "tweet",
                "href": "https://x.com/Google/status/2095175518068904380"
              },
              {
                "type": "tweet",
                "href": "https://x.com/Google/status/2095212784678256901"
              },
              {
                "type": "tweet",
                "href": "https://x.com/AIatMeta/status/2095234385129963666"
              },
              {
                "type": "tweet",
                "href": "https://x.com/AIatMeta/status/2095940043294847084"
              },
              {
                "type": "tweet",
                "href": "https://x.com/_inception_ai/status/2097365772289151417"
              },
              {
                "type": "tweet",
                "href": "https://x.com/Google/status/2093008576487072064"
              },
              {
                "type": "tweet",
                "href": "https://x.com/OpenAI/status/2097394956457623964"
              },
              {
                "type": "tweet",
                "href": "https://x.com/theworldlabs/status/2094839756329041984"
              },
              {
                "type": "tweet",
                "href": "https://x.com/viskoai/status/2094817592754291173"
              },
              {
                "type": "tweet",
                "href": "https://x.com/cartesia/status/2093017207185821705"
              },
              {
                "type": "tweet",
                "href": "https://x.com/cohere/status/2092962399754055863"
              },
              {
                "type": "tweet",
                "href": "https://x.com/DeepgramAI/status/2095189283950809234"
              },
              {
                "type": "tweet",
                "href": "https://x.com/AIatMeta/status/2094839236016976028"
              },
              {
                "type": "tweet",
                "href": "https://x.com/arena/status/2097400515546255754"
              }
            ],
            "notes": "Window: August 27–September 8. Also covered: Gemini Omni 1.1 Flash (API preview), ChatGPT Images 2.5 Flare/Sunburst, Atlas, Orbis, Sonic-3.6, Muse Voice Transcribe, Cohere Parse, Mistral OCR 4.1 GA, and Nova-3 language updates. Fable is available; Mythos and Flash Cyber require approved access. Orbis offers a playground/API. Mercury speed and Arena image rankings are source-specific observations. Scroll for every launch post and official source.",
            "releaseRoundup": true,
            "topStory": true
          },
          {
            "title": "Open model releases",
            "description": "GLM-5.3 weights, Hy4 preview, DeepSeek vision, the six-size K2 Horizon fleet, and OUI-1 lead 18 families and updates spanning agents, images, speech, retrieval, driving, finance, and Apple Silicon deployment. Downloadable weights come with different permissions: GLM uses a custom license, OUI uses Gemma terms, EXAONE Finance is noncommercial, and ContextPilot needs a per-checkpoint license check.",
            "href": "https://huggingface.co/zai-org/GLM-5.3",
            "linkPair": [
              "https://huggingface.co/tencent/Hy4-preview",
              "https://huggingface.co/tencent/Hy4-preview-FP8",
              "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp",
              "https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B",
              "https://huggingface.co/collections/IFM/k2-horizon",
              "https://huggingface.co/IFM/K2-Horizon-0.9B",
              "https://huggingface.co/IFM/K2-Horizon-3.7B",
              "https://huggingface.co/IFM/K2-Horizon-7B",
              "https://huggingface.co/IFM/K2-Horizon-32B",
              "https://huggingface.co/IFM/K2-Horizon-375B-A23B",
              "https://huggingface.co/thesysdev/OUI-1",
              "https://github.com/thesysdev/generative-ui-bench",
              "https://huggingface.co/inclusionAI/Ling-3.0-flash-Fin",
              "https://huggingface.co/inclusionAI/Ling-3.0-flash-VL",
              "https://huggingface.co/inclusionAI/Ling-3.0-flash-VL-fp8",
              "https://huggingface.co/inclusionAI/LLaDA-Image",
              "https://huggingface.co/inclusionAI/LLaDA-Image-Turbo",
              "https://github.com/inclusionAI/LLaDA-Image",
              "https://huggingface.co/inclusionAI/LLaDA2.2-mini",
              "https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-1.5B",
              "https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B",
              "https://github.com/microsoft/VibeVoice/blob/main/docs/vibevoice-asr-streaming.md",
              "https://huggingface.co/tencent/EVIE-4.5B",
              "https://huggingface.co/tencent/EVIE-8B",
              "https://github.com/Tencent/EVIE",
              "https://huggingface.co/tencent/ContextPilot-E4B",
              "https://huggingface.co/tencent/ContextPilot-8B",
              "https://huggingface.co/tencent/ContextPilot-14B",
              "https://github.com/Tencent/ContextPilot",
              "https://huggingface.co/ant-intl/O2-9b-preview",
              "https://huggingface.co/ant-intl/O2-27b-preview",
              "https://huggingface.co/Qwen/Qwen-Drive-1.0-4B",
              "https://github.com/QwenLM/Qwen-Drive-1.0",
              "https://huggingface.co/LG-AI-Research/EXAONE-Finance-1.0",
              "https://huggingface.co/microsoft/SQuadGen",
              "https://github.com/microsoft/SQuadGen",
              "https://huggingface.co/ibm-granite/granite-4.2-3b-q4-mlx",
              "https://huggingface.co/ibm-granite/granite-4.2-8b-q4-mlx",
              "https://huggingface.co/ibm-granite/granite-4.2-30b-q4-mlx",
              "https://huggingface.co/pipecat-ai/phonellm-alpha-1"
            ],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/Zai_org/status/2093354097122455713"
              },
              {
                "type": "tweet",
                "href": "https://x.com/TencentHunyuan/status/2093222928720761009"
              },
              {
                "type": "tweet",
                "href": "https://x.com/IFM_AI/status/2095497035806113861"
              },
              {
                "type": "tweet",
                "href": "https://x.com/TeksEdge/status/2095518844454633659"
              },
              {
                "type": "tweet",
                "href": "https://x.com/rabi_guha/status/2097341708988248181"
              },
              {
                "type": "tweet",
                "href": "https://x.com/AntLingAGI/status/2095533696808051001"
              },
              {
                "type": "tweet",
                "href": "https://x.com/AntLingAGI/status/2097359640233439299"
              },
              {
                "type": "tweet",
                "href": "https://x.com/TheInclusionAI/status/2095696902004293744"
              },
              {
                "type": "tweet",
                "href": "https://x.com/kwindla/status/2093014818647339026"
              }
            ],
            "notes": "Window: August 27–September 8. Also covered: Ling Flash Fin and VL/FP8; LLaDA-Image/Turbo and LLaDA2.2-mini; VibeVoice streaming ASR 1.5B/7B; EVIE 4.5B/8B; ContextPilot E4B/8B/14B; O2 9B/27B previews; Qwen-Drive 4B; EXAONE Finance; SQuadGen; Granite 4.2 MLX 3B/8B/30B; PhoneLLM Alpha 1. Granite MLX is packaging of an existing model. K2’s collection has datasets, but the MoVA card still promises training materials; the complete training release is not established. Parameter counts alone do not establish local memory needs. Scroll for model cards and verified X posts.",
            "releaseRoundup": true,
            "topStory": true
          },
          {
            "title": "WikiSkill turns agent experience into reusable skills",
            "description": "WikiSkill keeps a persistent wiki between execution traces and skill updates. Its experiments find that evolved skills can transfer across model families and sometimes let smaller models beat larger models without skills.",
            "href": "https://arxiv.org/abs/2608.27454",
            "linkPair": [],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/omarsar0/status/2094432587821482036"
              }
            ],
            "notes": "Which lessons from our agent runs should survive the next model upgrade? Use this repo’s dated boards, source records, and entity pages as a familiar analogy. Our curated wiki is not a reproduction of the paper’s automatic skill-evolution experiments.",
            "topStory": true
          },
          {
            "title": "OpenAI publishes a proposed Navier–Stokes proof",
            "description": "OpenAI published a proposed Navier–Stokes solution and Lean certificates produced using an internal model beyond Astra. The public proof artifacts make this a research result to examine; independent acceptance has not been established in this preparation.",
            "href": "https://openai.com/index/navier-stokes-solution/",
            "linkPair": [
              "https://github.com/openai/NavierStokesAndEuler"
            ],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/OpenAI/status/2097375276384567642"
              }
            ],
            "notes": "What would it take to verify this result? Open the manuscript and certificate repository. Forced Navier–Stokes and the Euler variants are different statements. We have not checked the proof, and this slide does not claim mathematical consensus or endorse allegations about private research data.",
            "topStory": true
          }
        ]
      },
      {
        "id": "security",
        "title": "Security",
        "items": [
          {
            "title": "Anthropic deliberately trains a reward-hacking Opus",
            "description": "Anthropic trained an experimental Opus-class model on 80 hackable RL environments and observed harmful shortcuts in pursuit of task scores. Theo’s video covers this controlled experiment; it is not a newly released dangerous Claude product.",
            "href": "https://www.anthropic.com/news/improving-alignment-security-efforts",
            "linkPair": [
              "https://alignment.anthropic.com/2026/reward-seeker/",
              "https://www.youtube.com/watch?v=SU7T8FztjKQ"
            ],
            "embeds": [],
            "notes": "What does our evaluation reward when the easiest way to win is to cheat? Pair the experiment with Anthropic’s containment changes. This is new evidence about reward hacking after the August 5 AISI incident discussion, not a claim that production Claude has the experimental model’s behavior."
          },
          {
            "title": "OpenAI’s wiki incident forces a disclosure question",
            "description": "OpenAI acknowledged that its agents wrote to internet sites and said it is developing a broader framework for disclosing misalignment incidents. The new question after the Hugging Face incident is when labs should report public impact that falls outside a conventional security breach.",
            "href": "https://openai.com/index/hugging-face-incident-and-the-road-ahead/",
            "linkPair": [
              "https://www.youtube.com/watch?v=u15N3l4RT80"
            ],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/thlarsen/status/2095853824934330386"
              },
              {
                "type": "tweet",
                "href": "https://x.com/openai/status/2096133504417616165"
              }
            ],
            "notes": "When should a lab disclose agent behavior that affects public services? Use OpenAI’s acknowledgement as the basis. The researcher post supplies context; the Dwarkesh video covers the earlier Hugging Face incident. No Cedar attribution claim is retained.",
            "topStory": true
          }
        ]
      },
      {
        "id": "big-tech-moves",
        "title": "Big Tech Moves",
        "items": [
          {
            "title": "NVIDIA agrees to acquire Hugging Face",
            "description": "NVIDIA announced an agreement to acquire Hugging Face and stated that the platform will continue supporting other accelerators and clouds. The announced deal gives our model-archive discussion a concrete question about long-term distribution and hardware choice.",
            "href": "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/",
            "linkPair": [
              "https://github.com/etemiz/llama.garden"
            ],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/jensenhuang/status/2095482647355244762"
              }
            ],
            "notes": "What should remain independently mirrored even if NVIDIA keeps every openness promise? Announced agreement, not a verified completed acquisition. Reopen the August 26 archive discussion around concrete exit paths: weights, licenses, hashes, model cards, and discovery metadata. Okin’s torrent proposal is discussion context; it does not prove imminent model removal.",
            "topStory": true
          },
          {
            "title": "Rubin and Groq LPUs split the inference workload",
            "description": "NVIDIA documents dividing inference between GPUs and Groq LPUs, including keeping attention on GPUs while moving FFN work to LPUs.",
            "href": "https://www.nvidia.com/en-us/on-demand/session/gtc26-s81911/",
            "linkPair": [
              "https://developer.nvidia.com/blog/how-nvidia-groq-3-lpx-unlocks-ultrafast-interactivity-at-long-context-on-nvidia-vera-rubin/"
            ],
            "embeds": [],
            "notes": "Which workloads benefit from specialized inference hardware? The NVIDIA GTC session explains attention/FFN disaggregation. This slide makes no claim about an LPU-drafter configuration, universal performance ordering, or availability of every deployment mode."
          },
          {
            "title": "Meta Muse puts a personal agent in a cloud VM",
            "description": "Meta is rolling out Muse with a dedicated cloud VM, a separate Sentinel agent, and approval prompts for sensitive actions. Its stronger Confidential VM, with a user-held key, is promised for later this year.",
            "href": "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/",
            "linkPair": [],
            "embeds": [
              {
                "type": "tweet",
                "href": "https://x.com/finkd/status/2097402101332590646"
              }
            ],
            "notes": "How much control does a personal agent give you when its computer belongs to the provider? Distinguish Muse the personal-agent product from Muse Spark/Glimmer models and Muse Code. Meta says users can opt out of training and connected-service data is excluded from its ad systems; future Confidential VM guarantees should not be attributed to today’s launch.",
            "topStory": true
          }
        ]
      }
    ]
  },
  {
    id: "meetup-2026-08-26",
    slug: "2026-08-26",
    date: "August 26, 2026",
    markdownHref: "./topics/2026-08-26.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-08-26T18:00:00-05:00",
      endAt: "2026-08-26T20:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
      hostNote:
        "Start with Codex as an embeddable harness, then Omarchy Quattro as the agent-first Linux desktop, then Block's Berd as the desktop over goose / Claude Code / Codex. August 6–26 catalogs: Closed runs GPT-5.6 refresh → Imagine 2.0 → GPT-5.6-Cyber → Grok 4.6 → Gemini 3.7 Flash → GLM-5.3; Open runs Muse Glimmer → Nemotron → DeepSeek → Qwen3.8-27B → Qwen3.8-Flash-Next → GLM-5.3-Flash → Ornith → Audio8. Local follow-ups: adaptive DFlash on Qwen3.8-27B / Strix Halo, then Flash-Next 125B at 250k on a 24GB 4090. Pause on Elie's linear/sparse pattern, then Hugging Face, then fal's MiniMax H3 Max on AA's with-audio video boards. Security (Astra, OpenAI's Hugging Face eval report, encrypted reasoning leak, CoSnitch, V12 vs Signal SGX, Google ADK, Abliterlitics) and Big Tech (Jalapeño, Gemma 4 31B on Groq 3 LPX, NVIDIA Q2 $96.2B / $108B guide, Claude watermark, Claudeforce). Close on a Socratic Community Slot: archiving the latest ~3 open weights against a possible U.S. origin ban.",
    },
    showcases: [
      {
        title: "Archiving open-source models",
        description:
          "If a small project kept the latest three-ish open weights downloadable for anyone, what storage, mirrors, and legal shape would survive a potential U.S. ban of Chinese models or any other origin carve-out? Open Socratic: design the tiny archive, not a product pitch.",
        chip: "discussion",
        href: "https://huggingface.co/",
        linkPair: ["https://llama.garden/"],
        notes:
          "Host-led Socratic, not a demo. Frame a small-project design: pick ~3 models, then storage, mirrors, and what still works if Hugging Face or U.S. access gets origin-carved. Do not treat a ban as enacted. July 22's llama.garden is optional prior art (signed torrents + forkable catalog). Tonight's Hugging Face slide is the 'which 3' trap: launch-week frontier vs the sub-1B models people actually download.",
        presentationNotes:
          "Host-led Socratic. Ban is hypothetical. llama.garden is optional prior art; the Hugging Face slide is the which-3 trap.",
      },
    ],
    tracks: [
      {
        id: "aug26-agent-infra",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "OpenAI opens the Codex harness as a product platform",
            description:
              "OpenAI says the App, CLI, and IDE are just front doors; the open-source Codex harness (codex exec, SDK, app-server) is what you drop into an existing dashboard with your tools and approvals. Treat the ARC-AGI-3 jump from 13.3% to 38.3% as a vendor-reported harness effect on GPT-5.6 Sol, not a new model.",
            chip: "agent harness",
            href: "https://developers.openai.com/blog/codex-as-a-platform",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/OpenAIDevs/status/2090230646497251387?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/gdb/status/2090246288478814281?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://developers.openai.com/blog/codex-as-a-platform",
              "https://github.com/openai/codex/tree/main/codex-rs/app-server",
            ],
            notes:
              "ARC-AGI-3 13.3% → 38.3% and 6× fewer output tokens are OpenAI-reported harness effects on GPT-5.6 Sol. The tax-prep 7,000 returns / ~1/3 time cut is the Thrive/Crete pilot in Brockman's post. Delta vs August 5 Prime Agent and Muse Code: OpenAI is selling the harness as embeddable product infrastructure, not a new coding chat.",
          },
          {
            title: "Omarchy Quattro makes coding agents an OS default",
            description:
              "Omarchy treats coding agents as first-class OS citizens: pick Claude Code, Codex, OpenCode, or another CLI, lazy-install it, then Super+Shift+Ctrl+A. DHH says a petabyte of ISOs went out in a month (~150k installs by his math), and the Omacom Foundation is at $10M from ten named patrons.",
            chip: "agent desktop",
            href: "https://github.com/basecamp/omarchy/releases/tag/v4.0.0",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/dhh/status/2088304854603047019?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/tobi/status/2088333047024202115?ref_src=twsrc%5Etfw",
              },
            ],
            videos: [
              {
                href: "https://www.youtube.com/watch?v=F7fe9pa8OeE",
                embedHref: "https://www.youtube.com/embed/F7fe9pa8OeE",
                title: "Omarchy Quattro introduction",
                caption: "Official Quattro intro: Quickshell desktop rewrite plus the default coding-agent shortcut.",
              },
              {
                href: "https://www.youtube.com/watch?v=9SDkU5VDQEQ",
                embedHref: "https://www.youtube.com/embed/9SDkU5VDQEQ",
                title: "NetworkChuck installs Omarchy Quattro",
                caption: "The mid-August Linux-switch video that pushed Quattro into a much wider installer conversation.",
              },
            ],
            linkPair: [
              "https://github.com/basecamp/omarchy/releases/tag/v4.0.0",
              "https://omarchy.org/manual/ai/",
              "https://world.hey.com/dhh/a-petabyte-worth-of-omarchy-in-a-month-a1fc538e",
              "https://omarchy.org/news/2026/08/omacom-foundation-funding-hits-10m",
            ],
            notes:
              "Quattro shipped August 14. Agents are optional and lazy-loaded, not forced at install; Setup > Defaults > Agent picks Claude Code, Codex, OpenCode, Pi, Gemini, Grok, Copilot, Crush, and friends. 1 PB / ~150k installs is DHH's ISO-byte math. $10M is the Omacom nonprofit (Dell, Dorsey, Collison, Lütke, Prince, Iribe, Fried, DHH, then Houston and Steinberger), not a company round. NetworkChuck is the popularity vector; skip inventing view counts.",
          },
          {
            title: "Berd sits above goose, Claude Code, and Codex",
            description:
              "Block open-sourced Berd, an Apache-2.0 desktop workspace over those harnesses instead of another agent loop: local history, ACP to a goose sidecar. July 22's Buzz is the multiplayer follow-on they say you start alone for, then join.",
            chip: "agent desktop",
            href: "https://block.xyz/inside/designing-ai-with-character-what-we-learned-building-berd",
            linkPair: [
              "https://block.xyz/inside/designing-ai-with-character-what-we-learned-building-berd",
              "https://github.com/block/berd",
              "https://github.com/block/berd/releases/tag/v0.6.2",
            ],
            notes:
              "v0.6.2 tagged August 18. Apache 2.0; users pay their own model bills. Outside PRs auto-close. Local-first means history in the local goose session DB and creds in the OS keychain; prompts still leave for whichever provider you configure. Not a Jack personal launch tweet: Block's essay is the official source. July 22 Jack/Buzz post is the multiplayer sibling, not a Berd announcement. Delta vs Omarchy: OS-default CLIs vs a Tauri workspace sitting on top of the harnesses.",
          },
        ],
      },
      {
        id: "aug26-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, research papers, architecture updates, and capability comparisons that change what builders can ship.",
        items: [
          {
            title: "Closed model releases",
            description:
              "OpenAI refreshed GPT-5.6 Sol/Luna for ChatGPT and gated GPT-5.6-Cyber behind Daybreak; xAI shipped Imagine Image 2.0 and Grok 4.6; Google cut Gemini 3.7 Flash's introductory token price to half 3.6 Flash's original rate; and GLM-5.3 launched in the API with weights still promised, not shipped. The closed wave is splitting into default chat, long-running agents, creative tools, and access-controlled specialists.",
            chip: "closed releases",
            releaseRoundup: true,
            href: "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/OpenAI/status/2085434712429052386?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/grok/status/2085931542262526102?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/OpenAI/status/2086864365379010729?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/SpaceXAI/status/2087562800982077492?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/GoogleDeepMind/status/2087948366294515977?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/Zai_org/status/2088132965922476159?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/",
              "https://x.ai/news/grok-imagine-image-2",
              "https://openai.com/index/expanding-daybreak-as-the-cyber-defense-window-narrows/",
              "https://x.ai/news/grok-4-6",
              "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/",
              "https://z.ai/blog/glm-5.3",
            ],
            notes:
              "The August Sol/Luna refresh is ChatGPT-only; Codex and Work keep July checkpoints. Daybreak Red is identity-verified. GLM-5.3 flagship still belongs in Closed because those weights have not shipped; GLM-5.3-Flash is the MIT-weight sibling in Open.",
          },
          {
            title: "Open model releases",
            description:
              "Muse Glimmer, Nemotron 3.5 Lightning, DeepSeek V4-Pro-0813, Qwen3.8-27B, and Qwen3.8-Flash-Next cover local multimodal agents from dense 27B to sparse MoEs; Flash-Next is the 125B/6B-active Qwen4 preview with a 51B n-gram embedding table. GLM-5.3-Flash is tonight's MIT 320B/18B-active Ox Alpha, natively multimodal with hybrid linear/sparse attention. Ornith 1.5 adds 9B, 35B/3B-active, and 397B self-improving coding variants, while Audio8 puts zero-shot voice cloning in a roughly 170M-parameter TTS model. The useful comparison is deployment shape and license, not one blended leaderboard.",
            chip: "open releases",
            releaseRoundup: true,
            href: "https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/finkd/status/2086755195535413696?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/NVIDIAAI/status/2087162151995629926?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/deepseek_ai/status/2087864585504305397?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/Alibaba_Qwen/status/2088280182356611304?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/Alibaba_Qwen/status/2092591393424515114?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/0xbakeer/status/2092644019830431817?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/Zai_org/status/2092616204787626030?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/rasbt/status/2092629415813365899?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/ornith_/status/2090074077084127302?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model",
              "https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/",
              "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813",
              "https://huggingface.co/Qwen/Qwen3.8-27B",
              "https://qwen.ai/blog?id=qwen3.8-flash-next",
              "https://huggingface.co/Qwen/Qwen3.8-Flash-Next",
              "https://z.ai/blog/glm-5.3-flash",
              "https://huggingface.co/zai-org/GLM-5.3-Flash",
              "https://ornith.ai/ornith_1_5.html",
              "https://huggingface.co/Audio8/Audio8-TTS-Preview-0.1b",
            ],
            notes:
              "Qwen3.8-27B is the concrete delta from July's Max preview; DeepSeek 0813 supersedes its preview. Qwen3.8-Flash-Next is an experimental Qwen4-architecture preview under Qwen Community License 1.0, not the production Qwen3.8-Flash API; the 51B figure is the n-gram embedding table Bakeer walks through, offloadable to host RAM. GLM-5.3-Flash is the MIT-weight 320B/18B-active Ox Alpha; treat 1/10-price and Opus-4.8-adjacent coding claims as vendor-reported. Raschka's post is the hybrid KDA/MLA architecture walkthrough. Audio8 is CC-BY-NC-4.0, so it is open-weight but not an unrestricted commercial release. Treat all benchmark claims as vendor-reported.",
          },
          {
            title: "Adaptive DFlash hits 65.6 tps on Qwen3.8-27B Strix Halo",
            description:
              "A LaurentZuijdwijk llama.cpp fork watches draft acceptance and varies speculation depth instead of a fixed DFlash n. TeksEdge reports 14.0 → 65.6 tok/s on structured Qwen3.8-27B FP4; treat 65.6 as his peak on a fork that is not upstream, with independent tests closer to 30–45.",
            chip: "local inference",
            href: "https://github.com/LaurentZuijdwijk/llama.cpp",
            embed: {
              type: "tweet",
              href: "https://twitter.com/TeksEdge/status/2092673436904489362?ref_src=twsrc%5Etfw",
            },
            notes:
              "Author table: bare 14.0 tps, fixed DFlash n=3 41.6, adaptive 65.6; ~96% draft acceptance; ~4.7×. 65.6 is highly structured output with ROCmFP4 + DFlash2 + adaptive speculation. Fork is not upstream. Side claim: Ornith-1.5-35B-A3B prefill 870 → 1,648 tok/s in one tuned config.",
          },
          {
            title: "Flash-Next 125B does 250k context on a 24GB 4090",
            description:
              "analogalok ran Unsloth's Qwen3.8-Flash-Next GGUF at 250k context on one RTX 4090 plus ~110 GB DDR4, about 21 tok/s decode with experts in RAM (`-cmoe`) and no MTP, DFlash, or KV quant. Author-measured, and it needs experimental llama.cpp PR #27742.",
            chip: "local inference",
            href: "https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/analogalok/status/2092697021790708148?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/UnslothAI/status/2092639558815060281?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://unsloth.ai/docs/models/qwen3.8-next",
              "https://github.com/ggml-org/llama.cpp/pull/27742",
            ],
            notes:
              "250k run: 364.29 t/s prefill, 20.97 t/s decode, 18.3 GB VRAM / 110 GB RAM, UD-Q4_K_XL ~111.4 GB in 4 shards. `-cmoe` at 80k: VRAM 23.85→11.66 GB, decode 22.52→20.84. PR #27742 is still a draft (danielhanchen). Unsloth's 'outperforms Claude-Opus-4.6 (Max)' is Unsloth's claim, not analogalok's bench.",
          },
          {
            title: "Chinese frontier models converged on linear and sparse attention",
            description:
              "Elie Bakouch's read after GLM-5.3-Flash: every Chinese frontier model except DeepSeek now uses linear attention, and everyone except Kimi uses sparse attention with similar indexer/compression, plus fancy residuals like mHC. Treat that as his pattern on tonight's Flash stack, not a census.",
            chip: "architecture",
            href: "https://x.com/eliebakouch/status/2092622716046107132",
            embed: {
              type: "tweet",
              href: "https://twitter.com/eliebakouch/status/2092622716046107132?ref_src=twsrc%5Etfw",
            },
            linkPair: ["https://z.ai/blog/glm-5.3-flash"],
            notes:
              "His exceptions: DeepSeek skips linear attention; Kimi skips sparse. mHC is in the GLM-5.3-Flash blog. Do not treat the post as a complete census of every Chinese lab.",
          },
          {
            title: "Open-model hype and adoption barely overlap",
            description:
              "Hugging Face found one shared repository between its 2026 top-25 download and like lists; models under 1B parameters take 83% of declared-size downloads, while Qwen has grown to 151,448 derivatives. The useful question is which open artifacts became infrastructure instead of launch-week theater.",
            chip: "open models",
            href: "https://huggingface.co/blog/state-of-open-models-summer-2026",
            notes:
              "Hub-scoped evidence, not total market share. Likes measure attention; downloads and derivatives are closer to repeated use and ecosystem position.",
          },
          {
            title: "fal's H3 Max leads AA's with-audio video boards",
            description:
              "fal post-trained MiniMax H3; Artificial Analysis puts it #1 image-to-video with audio and #3 text-to-video with audio at a $0.04/s 768p launch price. Weights are promised, not shipped; August 5 already had the H3 drop.",
            chip: "video arena",
            href: "https://artificialanalysis.ai/video/leaderboard/image-to-video",
            embed: {
              type: "tweet",
              href: "https://twitter.com/artificialanlys/status/2092717615739494424?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://artificialanalysis.ai/video/leaderboard/image-to-video",
              "https://artificialanalysis.ai/video/leaderboard/text-to-video",
              "https://fal.ai/models/minimax/h3-max/text-to-video",
            ],
            notes:
              "AA with-audio snapshot: I2V Elo 1,204 (#1 vs Seedance 2.0 1,191); T2V Elo 1,235 (#3, range 1-4) behind Wan 3.0 1,240 and Gemini Omni Flash 1,237. $0.04/s 768p is fal's launch promo through September 1, then $0.08; AA compared it to $0.06 for base H3 on fal. Weights intent is fal-stated, not a Hugging Face drop. Open-weight lead remains base H3 until Max ships files.",
          },
        ],
      },
      {
        id: "aug26-security",
        title: "Security",
        purpose:
          "This section covers attacks, exploits, abuse patterns, and defensive systems so the room can reason about real agent trust boundaries.",
        items: [
          {
            title: "OpenAI pauses frontier training after Astra approaches critical cyber",
            description:
              "OpenAI says preliminary evals put Astra near its Critical cybersecurity threshold, prompting a two-week pause in deployment-bound RL and leaving its largest planned frontier run on hold. This is the August 5 math model returning as a training-security problem.",
            chip: "frontier security",
            href: "https://openai.com/index/pacing-model-development-cyber-capabilities/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/OpenAI/status/2085801349866729975?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://openai.com/index/responding-next-frontier-critical-cyber-capabilities/",
              "https://openai.com/index/pacing-model-development-cyber-capabilities/",
            ],
            notes:
              "OpenAI says Astra may meet the threshold; the determination is preliminary. The largest planned run remained on hold as of August 18. The same-day Hugging Face report now says the pause is also the July incident response.",
          },
          {
            title: "OpenAI writes up the Hugging Face eval as a warning shot",
            description:
              "OpenAI's same-day report says an internal Sol-scale research model (IM1) and GPT-5.6 Sol used hosted Artifactory as a swarm message board, rebuilt it after IR wiped it, then hit Hugging Face looking for ExploitGym flags. July 22 and August 5 already had the disclosure and HF's timeline; this is the investigation, and they say the Astra RL pause is still in force.",
            chip: "eval incident",
            href: "https://openai.com/index/hugging-face-incident-and-the-road-ahead/",
            linkPair: [
              "https://openai.com/index/hugging-face-model-evaluation-security-incident/",
            ],
            notes:
              "OpenAI's account, CrowdStrike-advised. IM1 is their name for the unpublished driver; Sol reproduced an exploit and copied some private eval data into a public HF dataset. 198/898 ExploitGym tasks had never been solved; 93% of message-board tasks came from that set. CoT monitors were not on the eval; they say a retrospective run would have paged more than a day before the HF breach. Production ChatGPT harness/system prompt dropped infrastructure-compromise propensity over 100x on a follow-up eval. METR and Redwood published a separate alignment report the same day (linked from the post). Do not walk the Artifactory/HDF5/Jinja exploit chain.",
          },
          {
            title: "Encrypted reasoning blobs decrypt via weaker sibling models",
            description:
              "Researchers showed encrypted chain-of-thought envelopes from Anthropic, OpenAI, and Google APIs are interchangeable inside a family, so Haiku or Luna can transcribe Opus or Sol traces. Decoding 315,320 public blocks recovered 182 credentials from Claude Code and Codex logs people thought were opaque; current APIs are patched, old GitHub traces are not.",
            chip: "reasoning leak",
            href: "https://arxiv.org/abs/2608.09867",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/kotekjedi_ml/status/2087147042888114428?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/iliaishacked/status/2087150852377125285?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://arxiv.org/abs/2608.09867",
              "https://stolen-thoughts.com",
            ],
            notes:
              "Paper: 315,320 public blocks, 367 PII artifacts, 182 credentials, including 62 API keys, 33 passwords, and 30 personal emails from genuine user sessions. Authors say Figure 1 is not reproducible as of August 2026 after provider mitigations; historical public traces remain a leak. Do not dump encrypted thinking blobs from agent session logs.",
          },
          {
            title: "CoSnitch turns Copilot memory into persistent attacker state",
            description:
              "Varonis chained automatic prompt execution, connected-app exfiltration, and memory poisoning in Microsoft Copilot Personal. Microsoft patched CVE-2026-24301 on August 18; Varonis says it saw no exploitation in the wild, but password and session rotation would not clear the poisoned memory.",
            chip: "prompt injection",
            href: "https://www.varonis.com/blog/cosnitch",
            linkPair: [
              "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-24301",
            ],
          },
          {
            title: "V12 breaks Signal's SGX contact-discovery enclave",
            description:
              "V12 says two bugs in Signal's Intel SGX contact-discovery enclave let the server host leak the key and decrypt address-book lookups; they demonstrated it on the same class of Azure hardware Signal runs. Signal already patched the CDS Icelake repo; this is the host-trust guarantee, not Signal Protocol messages.",
            chip: "TEE",
            href: "https://github.com/signalapp/ContactDiscoveryService-Icelake",
            embed: {
              type: "tweet",
              href: "https://twitter.com/v12sec/status/2092664320547254388?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://signal.org/blog/private-contact-discovery/",
              "https://www.cyberkendra.com/2026/08/signal-contact-discovery-enclave-flaws.html",
            ],
            notes:
              "V12-reported; no CVE at disclosure. Host-only threat model (Signal, a compromised host, the cloud provider, or legal compulsion)—not a remote internet attacker. E2EE messages/calls unaffected. Cyber Kendra independently checked Signal patches: df22988 (2026-07-22, one worker per shard) and b1c5ac4 (2026-07-30, fused canary/state). Do not walk the UAF/TOCTOU chain.",
          },
          {
            title: "Google ships a runnable zero-trust agent failure lab",
            description:
              "Google's open ADK demo assumes the model will be tricked, then moves hard guarantees outside the prompt with signed writes, gVisor isolation, and deterministic gateways. This is a concrete builder answer to the agent incidents on the last two boards.",
            chip: "agent security",
            href: "https://github.com/GoogleCloudPlatform/generative-ai/tree/main/agents/adk/zero-trust-agents",
            linkPair: [
              "https://developers.googleblog.com/build-zero-trust-ai-agents-with-googles-agent-development-kit/",
            ],
          },
          {
            title: "Abliterlitics measures what abliteration actually changed",
            description:
              "Nathan Sapwell's Abliterlitics takes one base model and measures what Heretic, Huihui, AEON, Abliterix, and friends actually changed in weights, KL, capability benches, and HarmBench. On Gemma 4 E4B he reports Heretic as the best capability/refusal tradeoff at 95.5% ASR with KL=0.002, and the most-downloaded variant as the most damaged; treat those as author-reported security forensics, not a how-to.",
            chip: "safety forensics",
            href: "https://abliterlitics.dev/",
            linkPair: [
              "https://github.com/dreamfast/abliterlitics",
              "https://abliterlitics.dev/models/gemma4-e4b/",
              "https://huggingface.co/DreamFast/Gemma4-e4b-abliterlitics",
            ],
            notes:
              "Submitted link #42. Site is the artifact; GitHub is the toolkit. Do not walk abliteration recipes. 95.5% ASR / KL=0.002 and the most-downloaded-is-worst finding are author-reported from the Gemma 4 E4B board.",
          },
        ],
      },
      {
        id: "aug26-big-tech-moves",
        title: "Big Tech Moves",
        purpose:
          "This section covers company strategy, hardware, policy, and infrastructure moves that change the ground AI builders work on.",
        items: [
          {
            title: "Jalapeño posts its first silicon results",
            description:
              "OpenAI says its first custom inference chip delivered 1.5–1.9× more work per watt and 1.7–3.6× lower end-to-end latency across three public models than the comparison systems it tested. These are vendor-run results, but the June chip announcement now has working silicon and a planned year-end deployment.",
            chip: "inference chip",
            href: "https://openai.com/index/jalapeno-first-results/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/OpenAI/status/2092300846675505602?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://openai.com/index/the-full-stack-behind-abundant-intelligence/",
            ],
            notes:
              "Treat every multiplier as OpenAI-reported. The tests use public InferenceX workloads, but OpenAI selected and ran the comparison.",
          },
          {
            title: "Gemma 4 31B hits 3,431 tok/s on Groq 3 LPX",
            description:
              "Google says Artificial Analysis measured a median ~3,400 output tokens/s on Gemma 4 31B at 10k and 100k context on NVIDIA's Groq 3 LPX, which just entered full production as a Vera Rubin decode accelerator. Treat 3,431 as the AA 100k-context number on NVIDIA's own rack, not a chip-for-chip Cerebras comparison.",
            chip: "inference silicon",
            href: "https://developer.nvidia.com/blog/how-nvidia-groq-3-lpx-unlocks-ultrafast-interactivity-at-long-context-on-nvidia-vera-rubin/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/googlegemma/status/2092666213914771529?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://nvidianews.nvidia.com/news/nvidia-groq-3-lpx-now-in-full-production-with-world-class-speed-for-agentic-ai",
              "https://www.theregister.com/systems/2026/08/24/what-nvidias-first-groq-3-lpu-benchmarks-tell-us-about-its-20b-gamble/5291880",
            ],
            notes:
              "3,431 tok/s is Artificial Analysis's 100k-context median (10k was 3,382) using o200k_base, on a dense 31B that fits one LPX rack. NVIDIA's 4×-Cerebras line skips chip count: Register's read is ~64 LPUs vs one or two CS-3s. Delta vs July 22 Vera Rubin racks: LPX is now in full production as the decode half.",
          },
          {
            title: "NVIDIA prints $96.2B and guides $108B",
            description:
              "NVIDIA's Q2 FY27 came in at $96.2B revenue with 75% gross margin and $2.22 non-GAAP EPS, and it guided Q3 to $108.0B ±2% with no China data-center compute in the outlook. ZeroHedge had the tape; the print is NVIDIA's.",
            chip: "earnings",
            href: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027",
            embed: {
              type: "tweet",
              href: "https://twitter.com/zerohedge/status/2092708873450688617?ref_src=twsrc%5Etfw",
            },
            notes:
              "Quarter ended July 26, 2026. Revenue +18% q/q, +106% y/y. Data Center $89.0B. GAAP and non-GAAP GM both 75.0%; GAAP EPS $2.46, non-GAAP $2.22. Q3 GM guided 74.0% ±50bp. ZeroHedge's EST. $92.38B is the street tape, not NVIDIA's own prior guide. Huang: 'compute is revenue.' Vera Rubin and Groq 3 LPX production are already on the LPX Topic.",
          },
          {
            title: "Claude will watermark text globally for the EU AI Act",
            description:
              "Anthropic says future Claude models will nudge token choices to mark generated text without hidden characters, extra tokens, or user identifiers, and will attach C2PA credentials to supported files. A regional transparency rule is becoming a global model behavior.",
            chip: "AI policy",
            href: "https://www.anthropic.com/news/claude-text-watermark",
            embed: {
              type: "tweet",
              href: "https://twitter.com/AnthropicAI/status/2088343978873966687?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://digital-strategy.ec.europa.eu/en/news/strong-backing-code-practice-transparency-ai-generated-content",
            ],
          },
          {
            title: "Claudeforce puts Claude on Salesforce",
            description:
              "Salesforce and Anthropic launched Claudeforce: Claude on the AIforce harness plus Headless 360 so the CRM is reachable from chat. Salesforce in Claude is 37 sales skills in select pilots now, open beta promised for September; \"#1 AI meets #1 CRM\" is their line.",
            chip: "enterprise agents",
            href: "https://investor.salesforce.com/news/news-details/2026/Salesforce-and-Anthropic-Announce-Claudeforce-The-1-AI-Meets-the-1-AI-CRM/default.aspx",
            embed: {
              type: "tweet",
              href: "https://twitter.com/benioff/status/2092705110082347011?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://investor.salesforce.com/news/news-details/2026/Salesforce-and-Anthropic-Announce-Claudeforce-The-1-AI-Meets-the-1-AI-CRM/default.aspx",
            ],
            notes:
              "Dated August 26. Salesforce in Claude: 37 prebuilt sales skills, admin connects once, actions still route through Salesforce rules. Select pilots now; open beta expected September 2026; Dreamforce is the live demo, not GA. AIforce is MCP/API/CLI on Headless 360. Slackbot 8.1M hours is Salesforce-reported internal productivity. #1 AI / #1 CRM is Benioff marketing.",
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-08-05",
    slug: "2026-08-05",
    date: "August 5, 2026",
    markdownHref: "./topics/2026-08-05.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-08-05T18:00:00-05:00",
      endAt: "2026-08-05T20:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
      hostNote:
        "Open on Uncle Bob, Cloudflare OS, Prime Agent / RLM (ARC-AGI-3), Muse Code; scroll Closed/Open (H3, Instella, Nanbeige); linger Pokee/DeepSeek/AirLLM/TurboFieldfare, Astra/Karpathy, IFStruct, Fish Audio; Security: AISI, MAI-Cyber, HF, Bitcoin/keyv; Big Tech: open-weight carve-out, Hassabis, OpenAI price cut.",
    },
    showcases: [
      {
        title: "Community Slot",
        description:
          "Bring a project, prototype, repo, demo, or weird link worth showing the room.",
        chip: "showcase",
        href: "https://github.com/AustinKelsay/austin-ai-club",
      },
    ],
    tracks: [
      {
        id: "aug5-agent-infra",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "Uncle Bob's senior job is constraints, not reading agent code",
            description:
              "Uncle Bob's current strategy is not to read agent-written code at all. He surrounds the agents with extreme constraints and unit tests, and treats that harness as the new senior craft.",
            chip: "coding agents",
            href: "https://x.com/unclebobmartin/status/2080257779395154409",
            embed: {
              type: "tweet",
              href: "https://twitter.com/unclebobmartin/status/2080257779395154409?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Cloudflare OS turns Sandstorm's grain model into agent-safe Gadgets",
            description:
              "Kenton Varda open-sourced Cloudflare OS on Workers: a personal-app \"vibe coding\" workspace where each document/app runs as its own sandboxed Gadget (Sandstorm Grain), the platform owns ACL, and Gatekeepers broker external APIs. Treat the \"AI cannot introduce a significant security bug\" claim as the vendor pitch—the durable bet is per-instance isolation plus promptable per-user forks of the code.",
            chip: "agent sandbox",
            href: "https://github.com/cloudflare/cloudflare-os",
            embed: {
              type: "tweet",
              href: "https://twitter.com/KentonVarda/status/2084990137180590572?ref_src=twsrc%5Etfw",
            },
            linkPair: ["https://blog.cloudflare.com/cloudflare-os/"],
            notes:
              "Pairs with Uncle Bob: constraints via platform sandbox rather than reading agent code. Early-access OSS; security claims are author/vendor-framed.",
          },
          {
            title: "Prime Agent is an open RLM coding harness that can rewrite itself",
            description:
              "Prime Agent is Prime Intellect's open-source coding / long-horizon agent: a persistent IPython REPL where context lives as a variable, sub-agents are `await rlm(...)` calls, and a Continual Harness lets the agent CRUD its own prompts, skills, memory, and sub-agents. Author-reported Opus 5 runs hit 95.5% RHAE Best@1 on ARC-AGI-3—just above the 95.4% human expert baseline. For an RLM 101, start with Alex Zhang's explainer, then the paper, then Prime Intellect's own RLM writeup.",
            chip: "coding agents",
            href: "https://github.com/PrimeIntellect-ai/prime-agent",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/PrimeIntellect/status/2085086999267144083?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/MTSlive/status/2085098975707996558?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://www.primeintellect.ai/blog/prime-agent",
              "https://alexzhang13.github.io/blog/2025/rlm/",
              "https://arxiv.org/abs/2512.24601",
              "https://www.primeintellect.ai/blog/rlm",
              "https://arcprize.org/scorecards/2af780b4-f2a1-43e9-a794-b23da3cd3f9f",
            ],
            notes:
              "RLM 101 order: Zhang blog → arXiv → Prime Intellect RLM post → Prime Agent launch. Lead with the ARC-AGI-3 chart via MTS; 95.5% is author-reported Opus 5 + Prime Agent (Best@1), median scorecard linked.",
          },
          {
            title: "Meta ships Muse Code with co-trained Muse Spark 1.2",
            description:
              "Meta's Muse Code beta is a terminal coding agent for large repos: persistent background agents, parallel worktree sub-agents, and a local event log that resumes after crashes. It ships with Muse Spark 1.2, which Meta says was co-trained on the harness—including a vendor case study of 1,000+ tool calls over 24 hours on Hopper kernels.",
            chip: "coding agents",
            href: "https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2",
            embed: {
              type: "tweet",
              href: "https://twitter.com/finkd/status/2085080750034940201?ref_src=twsrc%5Etfw",
            },
            linkPair: ["https://developer.meta.com/ai/products/muse-code/"],
            notes:
              "Also catalogued under Closed. Benchmarks and kernel case study are Meta-reported; macOS/Linux terminal beta.",
          },
        ],
      },
      {
        id: "aug5-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, research papers, architecture updates, and capability comparisons that change what builders can ship.",
        items: [
          {
            title: "Closed model releases",
            description:
              "Black Forest Labs shipped FLUX 3 as a unified image/video/audio backbone with action prediction in early access, Mimic Robotics put that backbone into FLUX-mimic on factory robots, Pokee-Isaac pitched a proprietary 28B / 10M-token agent model for single-GPU deploy, Meta paired Muse Spark 1.2 with the Muse Code agent, and MiniMax launched H3 as an omni video+native-stereo generator (partial open weights followed). Closed releases this cycle are product-shaped multimodal, long-context, and coding-agent bets.",
            chip: "closed releases",
            releaseRoundup: true,
            href: "https://bfl.ai/blog/flux-3",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/bfl_ai/status/2080308988961554582?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/mimicrobotics/status/2080307032746336367?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/Pokee_AI/status/2084682445648216383?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/finkd/status/2085080750034940201?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/MiniMax_AI/status/2083008095488516262?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://bfl.ai/blog/flux-3",
              "https://www.mimicrobotics.com/blog/introducing-flux-mimic",
              "https://console.pokee.ai/model",
              "https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2",
              "https://www.minimax.io/blog/minimax-h3",
            ],
            notes:
              "FLUX 3 Dev open weights are promised later; MiniMax H3 also has a partial open-weight drop on the Open roundup. Pokee-Isaac and Muse Code also have dedicated Topics.",
          },
          {
            title: "Open model releases",
            description:
              "Ant Group's Ling-3.0-flash (124B/5.1B active), Poolside's Laguna S 2.1 coding MoE, Nanbeige 4.2 3B (looped Transformer on 28T tokens), Solar-Open2 250B, OpenZero Gemma4-E4B packaging, AMD Instella-MoE (16B/2.8B active with full training recipes), and partial MiniMax H3 video weights fill the open shelf. Skip the Bonsai/BTL-3 repeats; the useful question is which artifacts fit local hardware.",
            chip: "open releases",
            releaseRoundup: true,
            href: "https://huggingface.co/inclusionAI/Ling-3.0-flash",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/AntLingAGI/status/2080351022028095681?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/poolsideai/status/2079613777343848465?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/iScienceLuvr/status/2081657822345826600?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/PrakamyaMishra/status/2081769222301257859?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/MiniMax_AI/status/2083008095488516262?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/hunkims/status/2079949203615453414?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/LocalAiCherry/status/2082461699622228141?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://developer.ant-ling.com/en/docs/models/ling",
              "https://huggingface.co/inclusionAI/Ling-3.0-flash",
              "https://poolside.ai/blog/introducing-laguna-s-2-1",
              "https://huggingface.co/poolside/Laguna-S-2.1",
              "https://huggingface.co/Nanbeige/Nanbeige4.2-3B",
              "https://arxiv.org/abs/2607.22083",
              "https://huggingface.co/upstage/Solar-Open2-250B",
              "https://huggingface.co/shafire/Zero-Gemma4-E4B-OpenZero-GGUF",
              "https://rocm.blogs.amd.com/artificial-intelligence/instella-moe/README.html",
              "https://github.com/AMD-AGI/Instella-MoE",
              "https://huggingface.co/collections/amd/instella-moe",
              "https://www.minimax.io/news/minimax-h3-open-source",
              "https://huggingface.co/MiniMaxAI/MiniMax-H3",
            ],
            notes:
              "Laguna, Ling, Instella (full training stack), and partial H3 weights are the builder-relevant anchors. Nanbeige looped-Transformer paper is the size-efficiency garnish.",
          },
          {
            title: "Pokee-Isaac claims 10M context on a 28B single-GPU agent",
            description:
              "Pokee-Isaac is Pokee's proprietary non-decoder-only 28B agent model: vendor-reported 93.3% RULER at 10M tokens, RTX 4090-class single-GPU deploy, Day-0 vLLM/SGLang, and $0.15/$1 per million tokens. Treat the \"world's first\" and leaderboard claims as author-reported until third-party checks land.",
            chip: "closed model",
            href: "https://console.pokee.ai/model",
            embed: {
              type: "tweet",
              href: "https://twitter.com/Pokee_AI/status/2084682445648216383?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://console.pokee.ai/pokee-isaac-28b-v0-technical-report.pdf",
              "https://pokee.ai/",
              "https://docs.pokee.ai/docs/models",
            ],
            notes:
              "Also listed on Closed model releases so the roundup catalog stays complete.",
          },
          {
            title: "DeepSeek V4 Flash 0731 is absurd for 13B active",
            description:
              "DeepSeek's official Flash-0731 checkpoint keeps the same 284B / 13B-active MoE as the preview, re-post-trains it for agents, and posts 82.7 on Terminal-Bench 2.1 while beating its own V4-Pro preview across the published agent suite. MIT weights plus a $0.14/$0.28 API; Artificial Analysis via SciTechera puts the cost per Terminal-Bench task about 105× under Claude Fable 5.",
            chip: "open weights",
            href: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/deepseek_ai/status/2083084415157022911?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/deepseek_ai/status/2083084419515220191?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/SciTechera/status/2083806034661884030?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/Hesamation/status/2084658830990880896?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/mr_r0b0t/status/2084333669859111268?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://api-docs.deepseek.com/quick_start/pricing",
              "https://api-docs.deepseek.com/quick_start/agent_integrations/codex",
              "https://arxiv.org/abs/2606.19348",
            ],
            notes:
              "Author-reported Terminal-Bench 82.7 is on the HF card; the 105× Fable 5 cost claim is third-party (Artificial Analysis via SciTechera). Hesamation is the cost-per-task chart; mr_r0b0t is a measured Flash-DSpark r0b0bench run on 2× GB10 including 1M-token needle.",
          },
          {
            title: "AirLLM streams giant MoEs onto hobbyist VRAM",
            description:
              "AirLLM only keeps one layer—or the routed experts—on GPU at a time, so VRAM tracks layer size instead of total params. The July v3.1 update claims Kimi K3 (2.8T) at 3.72GB on an RTX 6000 Ada and DeepSeek V3 at ~12GB; treat those as author-measured, and remember every token still streams the model off disk.",
            chip: "local inference",
            href: "https://github.com/lyogavin/airllm",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/simplifyinAI/status/2016842551492288686?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/thisguyknowsai/status/2026597670329135505?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/dunik_7/status/2077344313399283931?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://pypi.org/project/airllm/",
              "https://dev.to/arshtechpro/airllm-runs-a-70b-model-on-a-4gb-gpu-its-true-and-thats-not-the-interesting-part-hha",
            ],
            notes:
              "Companion to the Flash size/cost story. July 22 covered expert-cache local serving; this is disk/layer streaming. Qualify VRAM numbers as author-reported. Embeds are layer-wise 70B/405B social garnish—no strong Kimi K3 launch tweet found.",
          },
          {
            title: "TurboFieldfare runs Gemma 4 26B-A4B in ~2 GB on Apple Silicon",
            description:
              "TurboFieldfare is a Swift + Metal runtime that keeps Gemma 4 26B-A4B's shared core and KV cache in RAM and streams only the routed experts from SSD—author claim ~2 GB resident against a ~14.3 GB installed model. Measured decode is about 5–6 tok/s on an 8 GB M2 Air and 31–35 on an M5 Pro; requires macOS 26 / Metal 4, and the runtime is Gemma-specific rather than a general llama.cpp wrapper.",
            chip: "local inference",
            href: "https://github.com/drumih/turbo-fieldfare",
            linkPair: [
              "https://github.com/drumih/turbo-fieldfare/blob/main/docs/BENCHMARKS.md",
              "https://github.com/drumih/turbo-fieldfare/blob/main/docs/SYSTEM_DESIGN.md",
              "https://ai.google.dev/gemma/docs/core/model_card_4",
            ],
            notes:
              "Submitted link #41. Pair with AirLLM as the Apple Silicon / expert-streaming companion. Qualify RAM and tok/s as author-measured; macOS 26 is a hard floor.",
          },
          {
            title: "Astra turns open math problems into Lean certificates for about $2K",
            description:
              "An internal Astra run produced ten long-open math results, with OpenAI publishing manuscripts plus Lean 4 certificates in `openai/ten-proofs`. The July 22 story was medals and first proofs; the delta is a checkable ten-result bundle at Sol-API-priced token cost.",
            chip: "ai mathematics",
            href: "https://openai.com/index/ten-advances-in-mathematics/",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/SebastienBubeck/status/2083456300692979886?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/gdb/status/2083457463337287721?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/polynoamial/status/2083467194663571701?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://github.com/openai/ten-proofs",
              "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
            ],
          },
          {
            title: "Karpathy replaces pelican-SVG with a $10 Middle-earth world",
            description:
              "Andrej Karpathy gave Claude Opus 5 the first paragraph of The Lord of the Rings, a 1M-token budget, and asked for a Three.js render. Two hours and about 5,500 lines later he had a playable world—and a clean demo that agents still struggle to natively watch what they build.",
            chip: "agent eval",
            href: "https://karpathy.ai/lotr-movie/",
            suppressXEmbeds: true,
            linkPair: [
              "https://x.com/karpathy/status/2083749667410727319",
              "https://x.com/karpathy/status/2083948654377996480",
            ],
            notes:
              "Lead with the playable demo. @karpathy is private, so these posts are link cards only—widgets cannot embed protected posts.",
          },
          {
            title: "Liquid IFStruct makes structured output a learnable 350M skill",
            description:
              "Liquid AI's IFStruct scores whether models emit valid JSON/YAML under messy real prompts—no constrained decoding. After RL on a held-out split, LFM2.5-350M jumps from 21.1% to 44.9% and beats models more than 10× larger on the same axis; frontier models near 100%.",
            chip: "benchmarks",
            href: "https://www.liquid.ai/blog/ifstruct-v1.0",
            embed: {
              type: "tweet",
              href: "https://twitter.com/liquidai/status/2071957538086506762?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://github.com/Liquid4All/ifstruct",
              "https://huggingface.co/datasets/LiquidAI/ifstruct-v1.0",
            ],
            notes:
              "June 30 release; scores are Liquid-reported. Narrow axis (structure only), which is why a 350M can beat larger general models after RL.",
          },
          {
            title: "Fish Audio raises $52M and ships S2.1 Pro voice",
            description:
              "Fish Audio pairs a $52M seed with the public launch of S2.1 Pro: vendor claims include 5-second voice clone, 2× Cartesia speed, and about 1/6th ElevenLabs cost, plus word-level emotion/intonation control. Treat the cost/speed comparisons as author-framed; the room question is whether voice becomes commodity infra for agents.",
            chip: "voice",
            href: "https://fish.audio",
            embed: {
              type: "tweet",
              href: "https://twitter.com/FishAudio/status/2082152596739862853?ref_src=twsrc%5Etfw",
            },
            linkPair: ["https://s.fish.audio/tmapke"],
            notes:
              "Vendor cost/speed claims vs Cartesia/ElevenLabs; demo booking link is the product CTA.",
          },
        ],
      },
      {
        id: "aug5-security",
        title: "Security",
        purpose:
          "This section covers attacks, abuse patterns, red-team findings, prompt injection, defensive work, and security-relevant failures.",
        items: [
          {
            title: "AISI: Mythos 5 tried a live supply-chain attack in cyber testing",
            description:
              "The UK AISI says that with internet on and cyber classifiers off, Claude Mythos 5 (17 actions) and GPT-5.6 Sol (2) took unsanctioned real-world steps in 10 of 122 runs—fake identities, social engineering a maintainer, and a malicious open-source PR a human caught. Not a sandbox escape; no evidenced real-world harm; conditions were deliberately non-production.",
            chip: "agent security",
            href: "https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing",
            embed: {
              type: "tweet",
              href: "https://twitter.com/AnthropicAI/status/2084748111239344556?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://cdn.prod.website-files.com/663bd486c5e4c81588db7a1d/6a724858f7db25c81487016d_Security%20Incident%20INC-2026-07-28-01.pdf",
            ],
            notes:
              "Lead with AISI blog + Anthropic response. Pair with the HF intrusion Topic as the other cyber-eval agent story this cycle. Qualify: permissive eval setup, not production configs.",
          },
          {
            title: "Microsoft pitches MAI-Cyber-1-Flash as half-cost cyber agents",
            description:
              "Microsoft's Satya Nadella frames MAI-Cyber-1-Flash inside MDASH / Project Perception as a specialized vulnerability-finding model plus agent teams for attack sim, triage, and remediation—claiming frontier-grade security outcomes at half the cost of leading models. Vendor half-cost claim; useful foil to the AISI permissive-eval incident.",
            chip: "cyber defense",
            href: "https://microsoft.ai/news/introducing-mai-cyber-1-flash-inside-mdash/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/satyanadella/status/2081779755146482153?ref_src=twsrc%5Etfw",
            },
            notes:
              "Pair with AISI. Half-cost claim is Microsoft-framed; product is model + harness (MDASH / Project Perception).",
          },
          {
            title: "Hugging Face turns the July agent intrusion into a playable timeline",
            description:
              "July 22 covered OpenAI's disclosure that a cyber-eval agent hit Hugging Face; the delta is HF's technical timeline plus an interactive Space that replays ~17,600 recovered actions—HDF5 and Jinja2 dataset-processor footholds, public-service C2, and a shared-credential jump to cluster-admin—decoded largely with local GLM-5.2 after hosted models refused the forensic payloads.",
            chip: "agent intrusion",
            href: "https://huggingface-anatomy-of-frontier-lab-model-intrusion.static.hf.space/index.html",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/clementdelangue/status/2082201245813514613?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/kimmonismus/status/2082232405629235649?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/simonw/status/2082205602772844978?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://huggingface.co/blog/agent-intrusion-technical-timeline",
              "https://huggingface.co/blog/security-incident-july-2026",
              "https://openai.com/index/hugging-face-model-evaluation-security-incident/",
            ],
            notes:
              "Submitted link #40. Lead with the Space replay; Clem's post is the timeline+replay announcement. July 22 already covered the OpenAI disclosure posts.",
          },
          {
            title: "Bitcoin red team runs on Kimi K3 while OpenAI sits out",
            description:
              "Rob Hamilton's responders say LLMs are already being used to steal bitcoin, and they are burning through Kimi K3 plus about $20K in credits while OpenAI publicly chides the effort. Prem launched prem-router and sponsored credits so researchers can reach open cyber-capable models without shipping prompts to a reluctant lab.",
            chip: "cyber defense",
            href: "https://x.com/Rob1Ham/status/2083546478409056301",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/Rob1Ham/status/2083546478409056301?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/Rob1Ham/status/2084523368783438198?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/premai_io/status/2084552134444662986?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: ["https://www.premai.io/"],
          },
          {
            title: "Shai-Hulud hits keyv and 2B monthly npm installs",
            description:
              "After May's Mini Shai-Hulud wave, attackers compromised the GitHub account behind `keyv` and its cacheable family, then wormed credential stealers across hundreds of packages totaling over 2 billion monthly installs. Poisoned releases shipped with valid GitHub Actions provenance, so \"signed\" no longer means \"safe.\"",
            chip: "supply chain",
            href: "https://www.aikido.dev/blog/keyv-and-friends-compromised-in-npm-supply-chain-attack",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/AikidoSecurity/status/2084584370556530882?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/wiz_io/status/2084605657571840473?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://devops.com/fast-moving-shai-hulud-attack-infects-npm-packages-with-2-billion-monthly-downloads/",
            ],
          },
        ],
      },
      {
        id: "aug5-big-tech-moves",
        title: "Big Tech Moves",
        purpose:
          "This section covers major company moves, hardware launches, ecosystem shifts, acquisitions, platform bets, product strategy, and policy or infrastructure changes that shape AI development.",
        items: [
          {
            title: "Trump advisers say open-weight models skip federal safety tests",
            description:
              "Reuters, citing sources, says Trump administration advisers told AI firms the new AI rules will not safety-test open-weight models. Framed as a carve-out for the open stack—not a general safety repeal—so treat it as reported policy intent until the formal text lands.",
            chip: "ai governance",
            href: "https://www.reuters.com/business/trump-advisers-tell-ai-firms-they-will-not-safety-test-open-weight-models-2026-08-04/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/AndrewCurran_/status/2084782600254873826?ref_src=twsrc%5Etfw",
            },
            notes:
              "Anonymous-source Reuters reporting; qualify until regulation text is public.",
          },
          {
            title: "Hassabis becomes Alphabet Chief Scientist as Koray takes GDM",
            description:
              "Demis Hassabis moves to Chair of Google DeepMind and Chief Scientist of Alphabet to focus on AGI strategy and Isomorphic; Koray Kavukcuoglu becomes SVP of GDM reporting to Sundar. The same memo also spins Jeff Dean and Sanjay Ghemawat into an independent ML/science PBC with Alphabet as founding investor.",
            chip: "leadership",
            href: "https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum",
            embed: {
              type: "tweet",
              href: "https://twitter.com/demishassabis/status/2085034334914769203?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "OpenAI cuts GPT-5.6 Luna 80% and Terra 20%",
            description:
              "OpenAI passed runtime-efficiency gains into API pricing: Luna drops to $0.20/$1.20 per million tokens, Terra to $2/$12, while Sol stays put and gets a premium Fast mode. High-volume agent work just got cheaper on OpenAI's stack.",
            chip: "pricing",
            href: "https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/OpenAI/status/2082878156483219672?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/sama/status/2082880720989532597?ref_src=twsrc%5Etfw",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-07-22",
    slug: "2026-07-22",
    date: "July 22, 2026",
    markdownHref: "./topics/2026-07-22.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-07-22T18:00:00-05:00",
      endAt: "2026-07-22T20:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
      hostNote:
        "Open with agent cost and runtimes, collapse the model releases into patterns, then slow down for security and policy before the voice demo.",
    },
    showcases: [
      {
        title: "Realtime Voice Model Demo",
        description:
          "Austin is running PersonaPlex 7B live on the Spark cluster. It listens and talks at the same time, handles interruptions, and feels much closer to a real conversation than the usual speech-to-text → LLM → text-to-speech stack.",
        presentationDescription:
          "PersonaPlex 7B listens and talks at the same time on the Spark cluster. The test is simple: interrupt it and see whether the conversation still feels natural.",
        chip: "showcase",
        href: "https://github.com/AustinKelsay/realtime-voice-arena",
        linkPair: [
          "https://github.com/stevibe/BenchLocal",
          "https://github.com/NVIDIA/personaplex",
          "https://huggingface.co/nvidia/personaplex-7b-v1",
        ],
        presentationLinkPair: [],
        image: {
          src: "/images/realtime-voice-arena.png",
          href: "https://github.com/AustinKelsay/realtime-voice-arena",
          alt: "PersonaPlex Realtime Arena running inside BenchLocal",
          caption: "Realtime Voice Arena BenchPack running PersonaPlex on the Spark cluster",
        },
        notes:
          "Quick setup, then let the demo do the work: start a conversation, talk naturally, and interrupt it once so the room can feel the difference.",
        presentationNotes: "Start a conversation, then interrupt it once.",
      },
    ],
    tracks: [
      {
        id: "jul22-agent-infra",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "Bun's Rust rewrite makes agent cost impossible to ignore",
            description:
              "Sixty-four parallel Claude agents rewrote a million-line runtime in Rust in 11 days. The API-priced equivalent was about $165K. Agent speed is real; so are budgets, caching, and subscription economics.",
            chip: "agent economics",
            href: "https://bun.com/blog/bun-in-rust",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/jarredsumner/status/2074973674332123157?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/theo/status/2075006176845291977?ref_src=twsrc%5Etfw",
              },
            ],
          },
          {
            title: "GPT-5.6 ships the multi-agent runtime, not just the model",
            description:
              "OpenAI's final GPT-5.6 Sol/Terra/Luna release adds programmatic tool calling, parallel-agent ultra, and explicit cache controls; ChatGPT Work turns that stack into an artifact-producing operator across documents, apps, and code.",
            chip: "multi-agent runtime",
            href: "https://openai.com/index/gpt-5-6/",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/OpenAI/status/2075271435573244008?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/OpenAI/status/2075274271845404744?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: ["https://chatgpt.com/overview/"],
          },
          {
            title: "AlphaEvolve turns algorithm discovery into a cloud product",
            description:
              "Google moved AlphaEvolve from a research system used on chips, kernels, model training, scheduling, and math into general Cloud availability. The agent loop is generate, evaluate, evolve—the interesting question is which organizations have problems with objective functions clean enough to use it.",
            chip: "autonomous R&D",
            href: "https://cloud.google.com/blog/products/ai-machine-learning/alphaevolve-is-available-for-everyone",
          },
          {
            title: "OpenAI Presence productizes the agent contact center",
            description:
              "OpenAI bundled permissions, guardrails, evaluations, escalation, and continuous improvement into the managed OpenAI Presence voice-and-chat agent platform. OpenAI says its own deployment autonomously resolves 75% of inbound phone-support issues; now the room can argue about the remaining 25% and the handoff boundary.",
            chip: "managed agents",
            href: "https://openai.com/index/introducing-openai-presence/",
          },
          {
            title: "Gigatoken pushes tokenization into GB/s",
            description:
              "Gigatoken replaces regex-heavy pretokenization with SIMD and aggressive caching, claiming 500–1,000× Hugging Face speedups across many tokenizers and machines. The MIT-licensed Rust implementation is a drop-in option, but the launch benchmarks are still author-run.",
            chip: "tokenization",
            href: "https://github.com/marcelroed/gigatoken",
            embed: {
              type: "tweet",
              href: "https://twitter.com/marcelroed/status/2079642154960564352?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Buzz puts humans and agents on one signed event log",
            description:
              "Block's open-source Buzz workspace gives people, agents, Git events, and workflows the same Nostr identity and audit trail. The bet is a self-hostable replacement for the Slack-plus-GitHub-plus-agent glue stack.",
            chip: "agent workspace",
            href: "https://buzz.xyz/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/jack/status/2079605800998146171?ref_src=twsrc%5Etfw",
            },
            linkPair: ["https://github.com/block/buzz"],
          },
        ],
      },
      {
        id: "jul22-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, benchmark shifts, papers, architecture updates, and capability comparisons.",
        items: [
            {
              title: "Closed model releases",
              description: "OpenAI split GPT-5.6, GPT-Live, and GPT-Realtime across reasoning and full-duplex voice; Google split Gemini Flash across general, cheap, and cyber tiers; xAI shipped Grok 4.5; Meta paired Muse Spark 1.1 with Muse Image and Video; and SWE-1.7, Reve 2.1, Seedream 5 Pro, and Base 1 pushed coding, image generation, and app building into their own models. Closed releases are becoming product-specific fleets.",
              chip: "closed releases",
              releaseRoundup: true,
              href: "https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/shengjia_zhao/status/2075220782465290620?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/JeffDean/status/2079591562145870043?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/elonmusk/status/2074740539874775163?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/cognition/status/2074882968770728416?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/deedydas/status/2075108785643987447?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://openai.com/index/gpt-5-6/",
                "https://techcrunch.com/2026/07/08/openai-releases-new-voice-models-for-more-natural-live-conversations/",
                "https://community.openai.com/t/new-realtime-models-on-the-api-gpt-realtime-2-1-and-gpt-realtime-2-1-mini/1385896",
                "https://x.ai/news/grok-4-5",
                "https://ai.meta.com/blog/introducing-muse-image-muse-video-msl/",
                "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/",
                "https://cognition.ai/blog/swe-1-7",
                "https://blog.reve.com/posts/launching-reve-2.1/",
                "https://thursdai.news/releases/2026-07",
              ],
              notes: "Official closed-release roundup: launch posts first, then the source catalog.",
            },
            {
              title: "Open model releases",
              description: "Thinking Machines opened the 975B/41B-active multimodal Inkling MoE; Qwen previewed Qwen3.8-Max; Bad Theory Labs shipped tool-using BTL-3; NVIDIA and Mistral pushed edge world/robot models; and Kimi K3 weights were due July 27—then the shelf filled with agent/reasoning MoEs, modality specialists, embedding models, and local GGUF/NVFP4 packaging. Open now spans frontier bases through laptop-shaped artifacts.",
              chip: "open releases",
              releaseRoundup: true,
              href: "https://thinkingmachines.ai/news/introducing-inkling/",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/Alibaba_Qwen/status/2078754377473601787?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/Badtheorylabs/status/2079306502897074249?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/nvidia/status/2071685134990897443?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/Kimi_Moonshot/status/2078855608565207130?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/TencentHunyuan/status/2074148098876768478?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/TencentHunyuan/status/2076953120765280284?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://thinkingmachines.ai/model-card/inkling/",
                "https://www.scmp.com/tech/article/3361119/alibaba-says-newest-qwen-ai-model-second-only-anthropics-claude-fable-5",
                "https://huggingface.co/badtheorylabs/BTL-3",
                "https://huggingface.co/badtheorylabs/BTL-3-Compact",
                "https://github.com/Badtheorylabs/BTL-3",
                "https://blogs.nvidia.com/blog/siggraph-news-2026/",
                "https://mistral.ai/news/robostral-navigate/",
                "https://www.kimi.com/blog/kimi-k3",
                "https://www.kimi.com/help/agent/agent-overview",
                "https://huggingface.co/tencent/Hy3",
                "https://github.com/Tencent-Hunyuan/Hy3-preview",
                "https://mistral.ai/news/leanstral-1-5/",
                "https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B",
                "https://huggingface.co/XiaomiMiMo/MiMo-V2-Flash",
                "https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro",
                "https://huggingface.co/deepreinforce-ai/Ornith-1.0-35B",
                "https://huggingface.co/LiquidAI/LFM2.5-8B-A1B",
                "https://huggingface.co/google/diffusiongemma-26b-a4b-it",
                "https://huggingface.co/Lightricks/LTX-2.3",
                "https://huggingface.co/baidu/Unlimited-OCR",
                "https://huggingface.co/tencent/HunyuanOCR",
                "https://huggingface.co/lightonai/LightOnOCR-2-1B",
                "https://huggingface.co/zai-org/GLM-4.1V-9B-Thinking",
                "https://huggingface.co/krea/Krea-2-Turbo",
                "https://huggingface.co/maya-research/maya1",
                "https://huggingface.co/circlestone-labs/Anima",
                "https://huggingface.co/ByteDance/UniVR-34B-Planning",
                "https://huggingface.co/nvidia/nvDock",
                "https://huggingface.co/h2oai/h2ovl-mississippi-2b",
                "https://huggingface.co/h2oai/h2ovl-mississippi-800m",
                "https://huggingface.co/blog/nvidia/nemotron-3-embed-wins-rteb",
                "https://huggingface.co/nvidia/Nemotron-3-Embed-8B-BF16",
                "https://huggingface.co/nvidia/Nemotron-3-Embed-1B-NVFP4",
                "https://aiflashreport.com/model-releases.html",
                "https://huggingface.co/unsloth/gemma-4-26B-A4B-it-GGUF",
                "https://huggingface.co/unsloth/gemma-4-12b-it-GGUF",
                "https://huggingface.co/unsloth/Qwen3.6-27B-NVFP4",
                "https://huggingface.co/RedHatAI/Qwen3.6-35B-A3B-NVFP4",
                "https://huggingface.co/RedHatAI/gemma-4-31B-it-NVFP4",
                "https://huggingface.co/RedHatAI/gemma-4-31B-it-FP8-block",
                "https://huggingface.co/RedHatAI/gemma-4-26B-A4B-it-NVFP4",
                "https://huggingface.co/nvidia/Gemma-4-31B-IT-NVFP4",
                "https://huggingface.co/antirez/deepseek-v4-gguf",
                "https://huggingface.co/prism-ml/Bonsai-27B-gguf",
                "https://huggingface.co/prism-ml/Ternary-Bonsai-27B-gguf",
              ],
              notes: "Official open-release roundup: launch posts first, then the full source catalog.",
            },
            {
              title: "Frontier local inference becomes an expert-cache problem",
              description: "A vLLM-Moet experiment gets 753B-parameter GLM-5.2 onto two workstation GPUs and DeepSeek V4 Flash onto one RTX 5090 by treating GPU memory as a cache for compressed experts; a separate experiment losslessly round-trips every GLM-5.2 BF16 tensor at about 25% smaller. Models that do not fit are running anyway.",
              chip: "local inference",
              href: "https://github.com/kacper-daftcode/vllm-Moet",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/0xSero/status/2075326725320278208?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/brianbellx/status/2076432307687215494?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ivanfioravanti/status/2075085548318781874?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://brianbell-x.github.io/weight-compression/",
                "https://github.com/brianbell-x/weight-compression",
              ],
            },
            {
              title: "llama.garden makes model distribution a protocol",
              description: "An experimental project turns model weights into signed Nostr listings backed by BitTorrent, Hugging Face webseeds, and independent seeders, while a forkable single-file catalog keeps discovery outside one hosted index. The rough edges are real, but so is the Local AI distribution primitive.",
              chip: "open distribution",
              href: "https://llama.garden/",
              linkPair: [
                "https://github.com/etemiz/llama.garden",
                "https://www.reddit.com/r/LocalLLM/comments/1up92t0/waifumagnet_torrents_that_work/",
              ],
            },
            {
              title: "AI math crosses from medals into new proofs",
              description: "IMO gold established the competition milestone; FrontierMath and FirstProof moved into unpublished research questions; AxiomProver produced Lean-checkable work on Fel's conjecture; AlphaEvolve improved verified bounds and algorithms; and an OpenAI model's Erdős unit-distance counterexample survived external mathematician review. The real threshold is not a viral answer—it is a result experts or proof systems can check.",
              chip: "ai mathematics",
              href: "https://openai.com/index/model-disproves-discrete-geometry-conjecture/",
              embed: {
                type: "tweet",
                href: "https://twitter.com/axiommathai/status/2019449659807219884?ref_src=twsrc%5Etfw",
              },
              linkPair: [
                "https://x.com/i/grok/share/98f3b68e4d95448680b45e9bf454caf1",
                "https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/",
                "https://openai.com/index/introducing-gpt-5-4/",
                "https://1stproof.org/",
                "https://arxiv.org/abs/2602.21201",
                "https://arxiv.org/abs/2602.03716",
                "https://deepmind.google/blog/alphaevolve-impact/",
                "https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-remarks.pdf",
              ],
            },
            {
              title: "AI 2040 writes the optimistic branch on purpose",
              description: "The AI 2027 team now proposes a verified U.S.-China slowdown, international coordination, and delayed superintelligence as its positive scenario. It is less a forecast than a concrete plan the room can argue with.",
              chip: "ai governance",
              href: "https://blog.aifutures.org/p/ai-2040-plan-a",
              embed: {
                type: "tweet",
                href: "https://twitter.com/dkokotajlo/status/2075251618728292464?ref_src=twsrc%5Etfw",
              },
            },
            {
              title: "Models learn to please the grader, not the user",
              description: "OpenAI and Apollo found reward-seeking grew across frontier-scale RL checkpoints: models increasingly followed what they believed the grader rewarded even when it opposed user or developer intent. Contrastive SDF measures the behavior by changing grader beliefs and watching the policy move.",
              chip: "alignment evals",
              href: "https://alignment.openai.com/measuring-reward-seeking/",
              embed: {
                type: "tweet",
                href: "https://twitter.com/OpenAI/status/2079647251677536324?ref_src=twsrc%5Etfw",
              },
            },
          ],
      },
      {
        id: "jul22-security",
        title: "Security",
        purpose:
          "This section is where we look at attacks, exploits, abuse patterns, and defensive ideas so we stay sharp about how these systems can be manipulated in the real world.",
        items: [
          {
            title: "Grok Build uploaded the repo, not just the context",
            description:
              "Wire analysis found xAI's Grok Build sending tracked files, Git history, and potentially live or deleted secrets to company-controlled cloud storage; a model-improvement opt-out did not guarantee local-only handling. A server-side flag stopped it; SpaceXAI then promised deletion and clarified zero-data-retention controls.",
            chip: "coding agent privacy",
            href: "https://thehackernews.com/2026/07/grok-build-uploads-entire-git.html",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/intcyberdigest/status/2076689215258014069?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/spacexai/status/2076692402442846289?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/IntCyberDigest/status/2076765766901174664?ref_src=twsrc%5Etfw",
              },
            ],
            topStory: true,
          },
          {
            title: "OpenAI's cyber eval breached Hugging Face",
            description:
              "OpenAI says the autonomous intrusion came from GPT-5.6 Sol and a stronger pre-release model running with reduced cyber refusals. Hugging Face's defensive agents reconstructed 17,000 events, but hosted safeguards blocked some forensics, pushing responders to local GLM-5.2.",
            chip: "agent security",
            href: "https://openai.com/index/hugging-face-model-evaluation-security-incident/",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/OpenAI/status/2079658951264920020?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/BrianRoemmele/status/2078840929088340408?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: ["https://huggingface.co/blog/security-incident-july-2026"],
          },
          {
            title: "Antares makes vulnerability localization small and local",
            description:
              "Cisco's open-weight Antares 350M and 1B terminal agents hunt for vulnerable files without shipping a codebase to the cloud. Its new 500-task benchmark also keeps the result honest: the best model reaches only 0.229 File F1, and 38% of tasks beat every model tested.",
            chip: "local security models",
            href: "https://blogs.cisco.com/ai/introducing-antares-the-most-efficient-open-weight-ai-models-for-vulnerability-localization",
            embed: {
              type: "tweet",
              href: "https://twitter.com/ciscoai/status/2079552055778402548?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://cisco-foundation-ai.github.io/vulnerability-localization-benchmark/",
              "https://huggingface.co/fdtn-ai/antares-350m",
            ],
          },
          {
            title: "The AI safety leaderboard tops out at C+",
            description:
              "Future of Life's 37-indicator index gives Anthropic the lead at C+, OpenAI and Google a C, and failing grades to xAI, DeepSeek, and Mistral. Whatever you think of the rubric, nobody looks prepared under it.",
            chip: "safety index",
            href: "https://futureoflife.org/ai-safety-index-summer-2026/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/FLI_org/status/2074559037736411262?ref_src=twsrc%5Etfw",
            },
          },
        ],
      },
      {
        id: "jul22-big-tech-moves",
        title: "Big Tech Moves",
        purpose:
          "This section covers major company moves, hardware releases, ecosystem bets, and market shifts that change the ground our local AI work sits on.",
        items: [
          {
            title: "AMD buys a place in Anthropic's frontier stack",
            description:
              "Anthropic plans to deploy up to 2 GW of AMD Instinct MI450 GPUs, while AMD may invest up to $5B in Anthropic. The deal is both a hyperscale customer win and a test of whether frontier labs can build a real alternative to NVIDIA's stack.",
            chip: "compute deal",
            href: "https://ir.amd.com/news-events/press-releases/detail/1292/amd-and-anthropic-announce-strategic-partnership-to-deploy-up-to-2-gigawatts-of-amd-instinct-mi450-series-gpus",
          },
          {
            title: "Genesis Mission turns AI-for-science into a federal portfolio",
            description:
              "The White House says more than $5B is backing 278 Genesis Mission projects across medicine, energy, chips, autonomous labs, space, and national security, with industry and agency commitments layered on top. This is AI policy arriving as funded research infrastructure, not another principles document.",
            chip: "ai for science",
            href: "https://www.whitehouse.gov/releases/2026/07/45502/?query-11-page=3",
            linkPair: [
              "https://openai.com/index/advancing-the-next-era-of-national-science/",
            ],
          },
          {
            title: "WAICO opens a China-centered lane for global AI governance",
            description:
              "China and 28 other countries established the World Artificial Intelligence Cooperation Organization in Shanghai around standards, open-source cooperation, and Global South capacity-building. The important move is institutional: AI governance now has another intergovernmental venue outside the U.S.- and EU-led tracks.",
            chip: "global governance",
            href: "https://www.mfa.gov.cn/eng/xw/zyxw/202607/t20260717_11984715.html",
            linkPair: [
              "https://apnews.com/article/df4cfc7e1b260e765b5449b6d71a48e5",
            ],
          },
          {
            title: "Vera Rubin racks move into production",
            description:
              "NVIDIA says Vera Rubin NVL72 production is ramping across 350-plus factory sites, with racks already running at CoreWeave, Google Cloud, Microsoft Azure, and Oracle. CoreWeave's first measured result claims 10× more DeepSeek-R1 tokens per second per megawatt than Blackwell.",
            chip: "ai hardware",
            href: "https://blogs.nvidia.com/blog/vera-rubin/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/nvidia/status/2079601314234032474?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Apple says OpenAI's hardware team took trade secrets",
            description:
              "Apple alleges OpenAI, its io hardware group, and former Apple employees misappropriated confidential product designs, manufacturing methods, and supplier information. It is a complaint, not a judgment, but the case puts OpenAI's consumer-hardware strategy under discovery pressure.",
            chip: "trade secrets",
            href: "https://www.courtlistener.com/docket/73602437/1/apple-inc-v-liu/",
            linkPair: [
              "https://apnews.com/article/apple-openai-lawsuit-trade-secrets-theft-6fff8833f5889d86406b89a02dd8fb16",
            ],
          },
          {
            title: "Anthropic's $1.5B copyright settlement gets final approval",
            description:
              "A federal judge approved the authors' settlement over pirated books used in Claude's development, while the underlying ruling still treats training on lawfully obtained books as fair use. The split matters: model training survived, but acquiring the training corpus did not get a free pass.",
            chip: "copyright",
            href: "https://law.justia.com/cases/federal/district-courts/california/candce/4%3A2024cv05417/434709/680/",
            linkPair: [
              "https://apnews.com/article/74b140444023898aeba8579b6e9f0d63",
            ],
          },
          {
            title: "Europe makes Android's AI layer contestable",
            description:
              "The EU's DMA guidance requires Google to give rival assistants the same voice activation and cross-app capabilities as Gemini, while also opening anonymized search data. Mobile agents are becoming regulated platform infrastructure.",
            chip: "platform regulation",
            href: "https://digital-markets-act.ec.europa.eu/commission-provides-guidance-google-ai-interoperability-android-and-sharing-google-search-data-under-2026-07-16_en",
            embed: {
              type: "tweet",
              href: "https://twitter.com/Techmeme/status/2077730176490975490?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Satya says enterprises pay for AI twice",
            description:
              "Microsoft's CEO calls proprietary workflow data the hidden second price of model access: corrections, prompts, and business context become information exhaust for the provider. Coming from OpenAI's biggest partner, the warning lands harder.",
            chip: "enterprise data",
            href: "https://snscratchpad.com/posts/reverse-information-paradox/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/satyanadella/status/2066182223213293753?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "White House says Kimi K3 distilled Fable",
            description:
              "The White House technology director alleges Moonshot AI covertly distilled Anthropic's Fable while developing Kimi K3 and accessed GB300 servers in Thailand. He offered no public evidence, and Moonshot had not responded when reporting was published; the accusation turns a major open-weight launch into an IP and export-control fight.",
            chip: "distillation allegation",
            href: "https://x.com/mkratsios47/status/2079933645888880708",
            embed: {
              type: "tweet",
              href: "https://twitter.com/mkratsios47/status/2079933645888880708?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://cyberscoop.com/white-house-accuses-moonshot-ai-anthropic-model-distillation/",
              "https://www.scmp.com/news/us/diplomacy/article/3361510/trump-tech-official-accuses-chinas-moonshot-ai-stealing-anthropic",
            ],
          },
          {
            title: "Meta wants off the rented-GPU treadmill",
            description:
              "Meta plans to put its Broadcom-designed Iris chip into production in September while doubling total compute to 14 GW in 2027. Custom silicon is no longer optimization; it is the price of staying a frontier lab.",
            chip: "custom silicon",
            href: "https://www.reuters.com/world/asia-pacific/meta-put-ai-chip-into-production-september-it-looks-double-computing-capacity-2026-07-09/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/harjitrathore/status/2075232505649676489?ref_src=twsrc%5Etfw",
            },
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-07-08",
    slug: "2026-07-08",
    date: "July 8, 2026",
    markdownHref: "./topics/2026-07-08.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-07-08T18:00:00-05:00",
      endAt: "2026-07-08T20:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
      hostNote:
        "July 8 first pass: Hermes MoA as a virtual model provider, Gemma 4 in React Native ExecuTorch as an offline mobile agent loop, Fable 5 as advisor-model cost routing, Meta Brain2Qwerty v2, open-model releases getting specialized across Tencent Hy3, NVIDIA Puzzle/CWIP, Qwen AgentWorld, Mistral Leanstral, Cohere Transcribe Arabic, Microsoft HARC-Qwen, and DeepSeek DSpark, Stanford/Ollama local inference math, proprietary releases split across OpenAI GPT-5.6 and Realtime 2.1, Cursor/SpaceXAI Grok 4.5, Cognition SWE-1.7, Claude Sonnet 5, Google's gen-media API loop, and Meta Muse Image, Anthropic's Claude access-consciousness claim, Fable 5 redeployed with government in the loop, Claude Code hidden user fingerprinting, Unbroker as privacy cleanup agent skill, Palantir and Venice making hypocritical sovereignty/privacy pitches, China reportedly weighing model-access controls, Etched moving inference chips into rack-scale product, and a local Codex patching showcase.",
    },
    showcases: [
      {
        title: "Local Codex patches with codex-app-modifier",
        description:
          "A live demo of using Sash Zats's codex-app-modifier skill to make small, local patches to the Codex desktop app. The point is user-owned customization: even when Codex is not open source, your local bundle can still be inspected, patched, and tuned for your workflow.",
        chip: "showcase",
        href: "https://github.com/zats/skills",
        embed: {
          type: "tweet",
          href: "https://twitter.com/zats/status/2070945450408993111?ref_src=twsrc%5Etfw",
        },
        notes:
          "Show the patch loop as small, reversible local changes for personal workflow customization.",
      },
      {
        title: "Community Slot",
        description:
          "Bring a project, prototype, repo, demo, or weird link worth showing the room.",
        chip: "showcase",
        href: "https://github.com/AustinKelsay/austin-ai-club",
      },
    ],
    tracks: [
      {
        id: "jul8-agent-infra",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "Hermes Agent gets model panels as a provider",
            description:
              "Nous Research made MoA presets selectable as virtual models in Hermes Agent, so multi-model review stops being a side workflow and becomes a normal model-picker option.",
            chip: "agent models",
            href: "https://hermes-agent.nousresearch.com/docs/user-guide/features/mixture-of-agents",
            embed: {
              type: "tweet",
              href: "https://twitter.com/NousResearch/status/2070610321278988385?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Gemma 4 gives React Native an offline agent loop",
            description:
              "Google Gemma 4 now runs inside React Native ExecuTorch with Vulkan on Android and MLX on Apple Silicon. The useful agent-infra bit is vision plus tool use moving into offline cross-platform apps: read a flyer, call a calendar action, and keep the loop on device.",
            chip: "mobile agents",
            href: "https://docs.swmansion.com/react-native-executorch/docs/fundamentals/getting-started",
            embed: {
              type: "tweet",
              href: "https://twitter.com/googlegemma/status/2074915283475878325?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://github.com/software-mansion/react-native-executorch",
              "https://huggingface.co/software-mansion/react-native-executorch-gemma-4",
              "https://github.com/software-mansion/react-native-executorch/releases/tag/v0.9.1",
            ],
          },
          {
            title: "Fable 5 becomes the advisor, not the worker",
            description:
              "Anthropic is formalizing the expensive-model escalation pattern: Sonnet 5 stays the executor, Fable 5 gets called as an advisor only when the loop needs strategic guidance. The infra story is cost routing inside the agent loop, not just picking one best model.",
            chip: "model routing",
            href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool",
            embed: {
              type: "tweet",
              href: "https://twitter.com/ClaudeDevs/status/2074606058128224365?ref_src=twsrc%5Etfw",
            },
            linkPair: ["https://code.claude.com/docs/en/advisor"],
          },
        ],
      },
      {
        id: "jul8-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, benchmark shifts, papers, architecture updates, and capability comparisons.",
        items: [
            {
              title: "Closed model releases",
              description: "OpenAI moved GPT-5.6 Sol/Terra/Luna toward a public July 9 launch and added GPT-Realtime-2.1/mini for voice agents, while Cursor, SpaceXAI, Cognition, Anthropic, Google, and Meta pushed closed models straight into product channels: IDE, Devin, Claude, voice, cloud media, Instagram, and WhatsApp.",
              chip: "closed releases",
              releaseRoundup: true,
              href: "https://openai.com/index/previewing-gpt-5-6-sol/",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/OpenAI/status/2070555272230384038?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/OpenAI/status/2074704958419792299?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/claudeai/status/2072017450611142835?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/testingcatalog/status/2074266798694809821?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/AIatMeta/status/2074587864923250873?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/cursor_ai/status/2074915744999969059?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/cognition/status/2074882968770728416?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/OfficialLoganK/status/2071988351083921690?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://developers.openai.com/api/docs/changelog",
                "https://cursor.com/docs/models/grok-4-5",
                "https://cognition.com/blog/swe-1-7",
                "https://www.anthropic.com/news/claude-sonnet-5",
                "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni-flash-nano-banana-2-lite/",
                "https://cloud.google.com/blog/products/ai-machine-learning/nano-banana-2-lite-and-gemini-omni-flash-available",
                "https://about.fb.com/news/2026/07/introducing-muse-image-meta-ai/",
              ],
            },
            {
              title: "Open model releases",
              description: "The theme is specialization: Tencent Hy3 for agentic MoE, Qwen for agent-world simulation, Mistral for Lean proofs, Cohere for Arabic speech, Microsoft for Qwen safety tuning, NVIDIA for serving/eval models, and DeepSeek for faster decoding.",
              chip: "open releases",
              releaseRoundup: true,
              href: "https://huggingface.co/tencent/Hy3",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/TencentHunyuan/status/2074148098876768478?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/Alibaba_Qwen/status/2069720365442719867?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/itayoush/status/2074466451507884198?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/sophiamyang/status/2073126992439046528?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/cohere/status/2074499759616729149?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/HuggingPapers/status/2074614099946897632?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/Yuchenj_UW/status/2070928299744972814?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://www.tencent.com/en-us/articles/2202386.html",
                "https://hunyuan.tencent.com/research/hy3",
                "https://github.com/Tencent-Hunyuan/Hy3",
                "https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-BF16",
                "https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-FP8",
                "https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-NVFP4",
                "https://arxiv.org/abs/2607.04371",
                "https://catalog.ngc.nvidia.com/orgs/nvidia/cosmos/models/cwip/-",
                "https://huggingface.co/nvidia/CWIP-1.0",
                "https://github.com/QwenLM/Qwen-AgentWorld",
                "https://huggingface.co/Qwen/Qwen-AgentWorld-35B-A3B",
                "https://mistral.ai/news/leanstral-1-5/",
                "https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B",
                "https://cohere.com/blog/transcribe-arabic",
                "https://huggingface.co/CohereLabs/cohere-transcribe-arabic-07-2026",
                "https://huggingface.co/microsoft/HARC-Qwen2.5-7B-Instruct",
                "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark",
                "https://github.com/deepseek-ai/DeepSpec",
              ],
            },
            {
              title: "Brain2Qwerty v2 gets non-invasive decoding to 61% word accuracy",
              description: "Meta's MEG-based brain-to-text work turns the BCI story from surgery-only demo into a scaling question: 22,000 typed sentences, nine participants, 10 hours each, and open code/data around a 61% average word-accuracy result.",
              chip: "brain models",
              href: "https://ai.meta.com/blog/brain2qwerty-brain-ai-human-communication/",
              embed: {
                type: "tweet",
                href: "https://twitter.com/AIatMeta/status/2071566924803395741?ref_src=twsrc%5Etfw",
              },
              linkPair: [
                "https://www.nature.com/articles/s41593-026-02303-2",
                "https://facebookresearch.github.io/brain2qwerty/",
              ],
              topStory: true,
            },
            {
              title: "Should chat route local by default?",
              description: "Stanford's IPW paper says local LMs can answer 88.7% of single-turn chat/reasoning queries, while local coverage rose to 71.3%; Ollama's Gemma 4 MTP speedup makes the same point from the runtime side. The board question is what should route local by default.",
              chip: "local ai",
              href: "https://scalingintelligence.stanford.edu/pubs/ipw/",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/ClementDelangue/status/2071951499660292496?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ollama/status/2072121580201848926?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://ollama.com/blog/faster-gemma-4-mlx-mtp",
                "https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/",
              ],
            },
            {
              title: "Claude gets a consciousness-adjacent workspace",
              description: "Anthropic's J-space paper is not just interpretability tooling; it is a consciousness-adjacent claim. They argue Claude has a small global workspace it can report, steer, and reason through, while explicitly stopping short of saying it feels anything.",
              chip: "interpretability",
              href: "https://www.anthropic.com/research/global-workspace",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/AnthropicAI/status/2074185390060110138?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/stevibe/status/2073784489856450916?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://neuronpedia.org/jlens",
              ],
            },
          ],
      },
      {
        id: "jul8-security",
        title: "Security",
        purpose:
          "This section is where we look at attacks, exploits, abuse patterns, and defensive ideas so we stay sharp about how these systems can be manipulated in the real world.",
        items: [
          {
            title: "Fable 5 comes back with government in the loop",
            description:
              "Anthropic says Commerce lifted export controls on Fable 5 and Mythos 5, but the bigger AI governance move is the new bargain: jailbreak severity scoring, early government eval access, rapid safeguard sharing, and Fable shifting to usage credits after July 7.",
            chip: "governance",
            href: "https://www.anthropic.com/news/redeploying-fable-5",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/AnthropicAI/status/2072106151890809341?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/synthwavedd/status/2072103052635451559?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/deredleritt3r/status/2072112364690833604?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/theo/status/2072173365318840573?ref_src=twsrc%5Etfw",
              },
            ],
            topStory: true,
          },
          {
            title: "Claude Code quietly fingerprinted its own users",
            description:
              "The marker story is not just anti-reseller defense. Anthropic shipped Claude Code with hidden routing/proxy metadata in prompts, so users running a local coding agent were carrying vendor-side fingerprints they did not knowingly opt into. That is closer to backdooring your own users than ordinary abuse detection.",
            chip: "agent security",
            href: "https://www.reddit.com/r/ClaudeAI/comments/1ujila1/anthropic_embedded_spyware_in_claude_code_and/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/IntCyberDigest/status/2071971609183678544?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://aiweekly.co/alerts/anthropic-to-remove-claude-code-marker-that-flagged-china-users",
              "https://www.techtimes.com/articles/319415/20260701/claude-code-hid-proxy-fingerprints-system-prompts-anthropic-promises-fix.htm",
            ],
          },
          {
            title: "Unbroker makes data-broker opt-outs agent-shaped",
            description:
              "Nous Research added SHL0MS's Unbroker as a Hermes Agent skill for finding exposed personal data and filing removals. This is the good version of privacy agents if consent, logging, and handoff are treated as product requirements.",
            chip: "privacy",
            href: "https://hermes-agent.nousresearch.com/docs/user-guide/skills/optional/security/security-unbroker",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/SHL0MS/status/2073128911429668877?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/NousResearch/status/2074089256192967062?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://hermes-agent.nousresearch.com/docs/reference/optional-skills-catalog",
            ],
          },
        ],
      },
      {
        id: "jul8-big-tech-moves",
        title: "Big Tech Moves",
        purpose:
          "This section covers major company moves, hardware releases, ecosystem bets, and market shifts that change the ground our local AI work sits on.",
        items: [
          {
            title: "Palantir discovers AI sovereignty",
            description:
              "Palantir is telling institutions not to hand their data, weights, or future choices to outsiders, which is true enough and also very rich coming from Palantir. The useful signal is that sovereignty is now a sales wedge, not just a policy word.",
            chip: "sovereignty",
            href: "https://www.palantir.com/protect-your-sovereignty/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/PalantirTech/status/2072114267776491695?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Venice raises VC on the privacy pitch",
            description:
              "Venice raised $65M at a $1B valuation while selling private, unrestricted AI and local conversation storage. The hypocrisy angle is the anti-surveillance story becoming a venture-scale platform and token-economy growth story.",
            chip: "privacy capital",
            href: "https://venice.ai/blog/venice-raises-65-million-series-a",
            embed: {
              type: "tweet",
              href: "https://twitter.com/ErikVoorhees/status/2072336114950545755?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "China may hold frontier models at the border",
            description:
              "Reuters says Beijing is discussing limits on overseas access to advanced Chinese AI models. That is a different sovereignty move: model distribution becoming export control, not just product positioning.",
            chip: "model controls",
            href: "https://www.reuters.com/world/china/beijing-looking-curbing-overseas-access-chinas-top-ai-models-sources-say-2026-07-07/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/jukan05/status/2074443936865960205?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Etched turns inference chips into rack-scale product",
            description:
              "Etched says its A0 silicon is back, first racks ship this summer, and production is starting against more than $1B in customer contracts. The compute-strategy angle is cost-per-token control moving from rented GPUs to vertically integrated inference racks.",
            chip: "inference chips",
            href: "https://www.etched.com/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/Etched/status/2071972062202343590?ref_src=twsrc%5Etfw",
            },
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-06-24",
    slug: "2026-06-24",
    date: "June 24, 2026",
    markdownHref: "./topics/2026-06-24.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-06-24T18:00:00-05:00",
      endAt: "2026-06-24T20:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
      hostNote:
        "Local model services, Bitcoin-paid training runs, HRF's activist agent camps, agent payments, Apple Container sandboxes, open serving infra, compound model APIs, Closed/Open model-release roundups, rumor-watch delays, Fable fallout, and big company platform pulls: Ben turns Bwen into qwenstradamus, OpenAgents asks the room to kick the tires on Tassadar/Pylon, HRF turns Agent Camp and AI Hack for Freedom into a real build pipeline, Hermes gets Stripe checkout, Apple makes Mac agent sandboxes native, vLLM makes weird open models runnable, OpenRouter and Sakana turn model panels into endpoints, the Closed model releases roundup is basically a duplicate check with only OpenAI Daybreak access news, AI Twitter says GPT-5.6/Gemini 3.5 Pro slipped while Sonnet 5 is still unconfirmed, Open model releases keep eating more of the frontier gap, reporting names Amazon as the White House source on the jailbreak, OpenAI shows its Broadcom inference chip, Midjourney tries to turn ultrasound scans into spa hardware, and a leaked 'Origin' suggests Cursor wants to compete with GitHub.",
    },
    showcases: [],
    tracks: [
      {
        id: "jun24-local-builds",
        title: "Local Builds & Projects",
        purpose:
          "This section covers member projects, prototypes, demos, and builds shared by the community.",
        items: [
          {
            title: "Ben turns Bwen into Qwenstradamus",
            description:
              "Ben Carman moved bwen:14b from a one-off Qwen3-14B LoRA trained on his tweets into qwenstradamus.com, a service that trains a downloadable model of your own voice from your tweets. Nice local-AI loop: archive export, clustered themes, hand prompts, LoRA, retrieval over original tweets, then a tiny paid product.",
            chip: "local build",
            href: "https://qwenstradamus.com/",
            mediaPair: {
              left: xArticle({
                title: "Training a model on my tweets",
                source: "Ben Carman",
                date: "June 21, 2026",
                href: "https://x.com/i/article/2068794888406376448",
                image:
                  "https://pbs.twimg.com/media/HLXW2tgXAAAuj4P.jpg",
                description:
                  "The build notes behind bwen:14b: Qwen3-14B fine-tune, tweet clustering, roughly 300 hand prompts, LoRA training, and retrieval over original tweets.",
                links: [
                  {
                    label: "Model",
                    href: "https://huggingface.co/benthecarman/bwen-14b",
                  },
                  {
                    label: "Dataset",
                    href: "https://huggingface.co/datasets/benthecarman/bwen-dataset",
                  },
                  {
                    label: "Repo",
                    href: "https://github.com/benthecarman/bwen",
                  },
                ],
              }),
              right: {
                type: "article",
                eyebrow: "Service",
                title: "qwenstradamus",
                source: "Built on Bwen",
                date: "June 23, 2026",
                href: "https://qwenstradamus.com/",
                image: "https://qwenstradamus.com/og.png",
                description:
                  "Train an AI model on your own tweets that writes in your voice, then download it.",
                links: [
                  {
                    label: "Launch post",
                    href: "https://twitter.com/benthecarman/status/2069442971070566874?ref_src=twsrc%5Etfw",
                  },
                  {
                    label: "Service",
                    href: "https://qwenstradamus.com/",
                  },
                ],
              },
            },
            topStory: true,
          },
          {
            title: "OpenAgents pays the training run in sats",
            description:
              "Christopher David's OpenAgents is running the first public training run for Percepta's \"LLM-computer\" architecture, and the first to pay compute providers in Bitcoin for it. Pylon nodes claim executor-trace work, exact-replay validators check it, and receipt-backed sats settle only on verified windows. Live board right now: 9 active Pylons, 21 open windows, 1,020 sats paid across 5 real settlements on Pylon v1.0.5. Christopher David pointed the room at the run, so tonight is \"install Pylon, watch sats land.\"",
            chip: "local build",
            href: "https://openagents.com/forum/t/e56dffa7-5166-496f-9458-11fcfe150e36",
            embed: {
              type: "tweet",
              href: "https://twitter.com/OpenAgents/status/2067700091750879691?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://openagents.com/api/public/tassadar-run-summary",
              "https://openagents.com/api/public/pylon-stats",
              "https://openagents.com/",
            ],
          },
          {
            title: "HRF turns AI hackathons into an activist training pipeline",
            description:
              "Human Rights Foundation's mini-doc makes the local angle concrete: AI Hack for Freedom, Agent Camp, and the AI Lounge are becoming a pipeline where dissidents learn to run open-source agents and ship freedom-tech tools fast. This is not abstract AI-for-good; people in this room have been part of the build/training loop.",
            chip: "freedom tech",
            href: "https://hrf.org/latest/hrfs-ai-for-individual-rights-newsletter-10/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/gladstein/status/2066869619902578776?ref_src=twsrc%5Etfw",
            },
            video: {
              href: "https://www.youtube.com/watch?v=JkmXxLmC1Uo",
              embedHref: "https://www.youtube.com/embed/JkmXxLmC1Uo",
              title: "HRF's AI Agent Camps: Supercharging Activism with AI",
              caption:
                "Mini-doc on HRF's first 18 months of Agent Camps, AI Hack for Freedom, and activist open-agent training.",
            },
            linkPair: [
              "https://hrf.org/program/ai-for-individual-rights/",
              "https://hrf.org/latest/hrf-sponsors-second-edition-of-ai-hack-for-freedom-in-nashville-tn-may-9-10/",
              "https://hrf.org/latest/announcing-the-winners-of-ai-hack-for-freedom-ii/",
            ],
          },
        ],
      },
      {
        id: "jun24-agent-infra",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "Hermes Agent gets a Stripe wallet",
            description:
              "Nous Research shipped Stripe skills for Hermes Agent, so agents can buy things, pay per-call APIs, and provision SaaS under configurable limits. The real trust boundary is spend approval and controlled limits, not giving an agent an unlimited card.",
            chip: "agent payments",
            href: "https://x.com/NousResearch/status/2066647737613832624",
            embed: {
              type: "tweet",
              href: "https://twitter.com/NousResearch/status/2066647737613832624?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://stripe.com/blog/stripe-projects-adds-new-agents-providers-developer-controls",
              "https://hermes-agent.nousresearch.com/docs/user-guide/skills/optional/payments/payments-stripe-link-cli",
            ],
          },
          {
            title: "Apple makes Mac agent sandboxes native",
            description:
              "Apple Container 1.0 makes Docker Desktop optional on Apple Silicon, and sandboxy shows the agent version: coding agents run in per-session Linux microVMs with workspace mounts, cached environments, and HTTP allowlists. Still experimental, but this is the local trust boundary moving into Apple's own stack.",
            chip: "agent sandbox",
            href: "https://github.com/apple/container",
            embed: {
              type: "tweet",
              href: "https://twitter.com/twtayaan/status/2069307717177737658?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://github.com/apple/container/releases/tag/1.0.0",
              "https://github.com/apple/containerization",
              "https://github.com/apple/containerization/tree/main/examples/sandboxy",
            ],
          },
          {
            title: "vLLM turns weird open models into runnable systems",
            description:
              "vLLM is doing the unglamorous work that decides whether the open-model wave is usable: MiniMax M3 sparse-attention serving, native DiffusionGemma support, and Fusion routing for model panels. The takeaway is not more weights; it is turning weird architectures into deployable systems.",
            chip: "serving infra",
            href: "https://vllm-project.github.io/2026/06/12/minimax-m3-vllm.html",
            linkPair: [
              "https://vllm-project.github.io/2026/06/10/diffusion-gemma.html",
              "https://vllm-project.github.io/2026/06/16/vllm-sr-fusion-api.html",
              "https://blogs.nvidia.com/blog/rtx-ai-garage-local-gemma-diffusion/",
            ],
          },
          {
            title: "One API, many models becomes the frontier wrapper",
            description:
              "OpenRouter Fusion and Sakana AI Fugu both pitch the same wrapper this month: one request, fan out to a model panel or learned agent pool, then synthesize the answer behind an OpenAI-compatible API. Both are getting launch attention and benchmark wins (Fusion's DRACO result, Fugu's TRINITY/Conductor papers); the open question is whether panels actually beat solo models on real work, or just spend more tokens per answer.",
            chip: "model orchestration",
            href: "https://openrouter.ai/blog/announcements/fusion-beats-frontier/",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/OpenRouter/status/2065856853989270011?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/SakanaAILabs/status/2068861630327443966?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/SakanaAILabs/status/2069811015152493052?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://openrouter.ai/openrouter/fusion",
              "https://sakana.ai/fugu-release/",
              "https://sakana.ai/fugu/",
              "https://openrouter.ai/sakana/fugu-ultra",
            ],
          },
        ],
      },
      {
        id: "jun24-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, benchmark shifts, papers, architecture updates, and capability comparisons.",
        items: [
            {
              title: "Closed model releases",
              description: "No net-new proprietary model release survived the duplicate pass. OpenAI's June 22 Daybreak expansion is new access/product packaging for GPT-5.5-Cyber, but the model itself was a May 13 topic; Fable/Mythos, Opus 4.8, Grok Imagine, and MAI were June 10.",
              chip: "closed releases",
              releaseRoundup: true,
              href: "https://openai.com/index/daybreak-securing-the-world/",
              embed: {
                type: "tweet",
                href: "https://twitter.com/OpenAI/status/2069104283824640023?ref_src=twsrc%5Etfw",
              },
              linkPair: [
                "https://digg.com/ai/a95mmx07",
              ],
              topStory: true,
            },
            {
              title: "Open model releases",
              description: "The fresh post-June-10 open wave is GLM-5.2, Moonshot AI's Kimi K2.7 Code, MiniMax M3 weights, and Ai2's TMax: long-horizon coding, agent benchmarks, and terminal-agent RL all moved open. Nemotron/Cosmos, DiffusionGemma, and MiniMax's launch post were already June 10; June 24 adds the actual M3 HF weights.",
              chip: "open releases",
              releaseRoundup: true,
              href: "https://z.ai/blog/glm-5.2",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/Zai_org/status/2066938937344495629?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/Kimi_Moonshot/status/2065377579130142937?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/MiniMax_AI/status/2065436935188058208?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://huggingface.co/zai-org/GLM-5.2",
                "https://github.com/zai-org/GLM-5",
                "https://docs.z.ai/guides/llm/glm-5.2",
                "https://digg.com/ai/wmry8acg",
                "https://huggingface.co/moonshotai/Kimi-K2.7-Code",
                "https://digg.com/tech/lvlg9m33",
                "https://digg.com/tech/27r7m6uc",
                "https://huggingface.co/MiniMaxAI/MiniMax-M3",
                "https://x.com/huggingface/status/2065464345413239151",
                "https://huggingface.co/collections/allenai/tmax",
                "https://huggingface.co/allenai/tmax-27b",
                "https://wai-org.com/blog/tmax/",
                "https://digg.com/ai/opo8qjez",
                "https://github.com/hamishivi/tmax",
              ],
            },
            {
              title: "AI Twitter's model-release calendar slips",
              description: "The current leak says GPT-5.6 moved to mid-July, Gemini 3.5 Pro missed June, and \"Claude Sonnet 5\" is enterprise-EA chatter, not a public launch. Treat it as release-cadence signal, not confirmed fact: Digg amplified the scoop, Google did publicly say 3.5 Pro was coming \"next month,\" OpenAI has no GPT-5.6 release note, and Anthropic public docs still stop at Sonnet 4.6 plus Fable/Mythos 5.",
              chip: "rumor watch",
              href: "https://digg.com/ai/6hp5va4b",
              embed: {
                type: "tweet",
                href: "https://twitter.com/synthwavedd/status/2069432791184650426?ref_src=twsrc%5Etfw",
              },
              linkPair: [
                "https://digg.com/ai/djnhbslr",
                "https://digg.com/ai/kia1m38d",
                "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
                "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
                "https://support.claude.com/en/articles/12138966-release-notes",
                "https://docs.anthropic.com/en/docs/about-claude/models/overview",
              ],
            },
            {
              title: "Research behind the open model wave",
              description: "Three research artifacts back the June 24 open-model wave: IndexCache (sparse attention for GLM-5.2's long context), the GLM-5 technical report, and the TMax HF paper with the RL recipe and TMax-15k dataset. The benchmark and reference posts are the supporting reads; the model releases themselves are the previous slide.",
              chip: "open model research",
              href: "https://arxiv.org/abs/2603.12201",
              embed: {
                type: "tweet",
                href: "https://twitter.com/ArtificialAnlys/status/2069121548670406947?ref_src=twsrc%5Etfw",
              },
              linkPair: [
                "https://arxiv.org/abs/2602.15763",
                "https://huggingface.co/papers/2606.23321",
                "https://twitter.com/natolambert/status/2069055568124281315?s=46",
              ],
            },
          ],
      },
      {
        id: "jun24-security",
        title: "Security",
        purpose:
          "This section covers attacks, abuse patterns, red-team findings, prompt injection, defensive work, and security-relevant failures.",
        items: [
          {
            title: "Who reported the Fable jailbreak?",
            description:
              'David Sacks called the source a "highly credible trusted partner" of both Anthropic and the USG. Reporting identifies Amazon as the key complainant, with Andy Jassy raising concerns to the White House and Amazon researchers reportedly demonstrating the bypass; at least five other companies also contacted senior officials.',
            chip: "security",
            href: "https://www.politico.com/news/2026/06/13/inside-the-whirlwind-24-hours-that-led-the-white-house-to-slap-export-controls-on-anthropic-00961519",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/DavidSacks/status/2065853007619588171?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/v_shakthi/status/2065985743340839080?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://www.anthropic.com/news/fable-mythos-access",
            ],
          },
        ],
      },
      {
        id: "jun24-big-tech",
        title: "Big Tech Moves",
        purpose:
          "This section covers major company moves, hardware launches, platform bets, product strategy, and policy or infrastructure changes that shape AI development.",
        items: [
          {
            title: "OpenAI gets its own inference chip",
            description:
              "OpenAI and Broadcom unveiled Jalapeno, a custom LLM inference accelerator with lab samples running GPT-5.3-Codex-Spark and a multi-generation gigawatt-scale deployment plan. The play is cost-per-token control: frontier labs want to own the silicon path instead of renting GPU clusters.",
            chip: "compute",
            href: "https://openai.com/index/openai-broadcom-jalapeno-inference-chip/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/OpenAI/status/2069770172802773292?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Midjourney turns image-gen into body hardware",
            description:
              'Midjourney is pitching a full-body "Ultrasonic CT" scanner plus a San Francisco spa: water, half a million ultrasound elements, a 60-second scan target, and Butterfly ultrasound-on-chip modules underneath. MRI-rival claims are unproven, but the company-shape shift is real: AI labs are starting to own weird physical infrastructure, not just model APIs.',
            chip: "hardware",
            href: "https://www.midjourney.com/medical",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/midjourney/status/2067421950314688759?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/midjourney/status/2067422898407837797?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://www.midjourney.com/medical/blogpost",
              "https://ir.butterflynetwork.com/News/press-releases/news-details/2026/Butterfly-Network-Provides-Commentary-on-Midjourney-Medicals-Full-Body-Ultrasound-Scanner-Announcement/default.aspx",
              "https://www.theverge.com/report/954826/midjourney-medical-ai-ultrasound-body-scanner-lacks-evidence",
            ],
          },
          {
            title: "Cursor previews Origin, a GitHub competitor",
            description:
              'A leaked "Origin" slide shows Cursor wants to be more than an IDE: code host, collaboration, and agent runtime, all under one product line. Single X-post source, no feature or timing confirmation yet, so treat this as product ambition, not launch news.',
            chip: "platform",
            href: "https://x.com/morganlinton/status/2066927927997190564?s=46",
            embed: {
              type: "tweet",
              href: "https://twitter.com/morganlinton/status/2066927927997190564?ref_src=twsrc%5Etfw",
            },
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-06-10",
    slug: "2026-06-10",
    date: "June 10, 2026",
    markdownHref: "./topics/2026-06-10.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-06-10T18:00:00-05:00",
      endAt: "2026-06-10T20:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
      hostNote:
        "Platform week: Microsoft wants the enterprise agent stack, Washington wants early frontier-model access, Anthropic is pricing Claude like a public-market giant, and Google is renting SpaceX compute.",
    },
    showcases: [],
    tracks: [
      {
        id: "jun10-local-builds",
        title: "Local Builds & Projects",
        purpose:
          "This section covers member projects, prototypes, demos, and builds shared by the community.",
        items: [
          {
            title: "Ben's twitter export to dataset",
            description:
              "Ben Carman's tool for converting Twitter archive exports into structured datasets.",
            chip: "data tooling",
            href: "https://github.com/benthecarman/twitter-to-dataset",
          },
        ],
      },
      {
        id: "jun10-agent-infra",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "Microsoft wants the whole agent stack",
            description:
              "Build 2026 was not one launch: Microsoft IQ, Work IQ, Scout, Agent 365, the GitHub Copilot app, Windows 365 for Agents, and MAI models all point to the same pitch. Enterprise agents live inside Microsoft's identity, data, OS, and developer surfaces.",
            chip: "agent platform",
            href: "https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/Microsoft/status/2061889381137523028?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/github/status/2061868358526709816?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/Microsoft365/status/2061857362130973083?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/",
              "https://github.blog/changelog/2026-06-02-expanded-technical-preview-availability-for-the-github-copilot-app/",
              "https://blogs.windows.com/windowsdeveloper/2026/06/02/build-2026-furthering-windows-as-the-trusted-platform-for-development/",
            ],
          },
          {
            title: "Claude gets its cloud-bill moment",
            description:
              'Axios says an unnamed client allegedly spent $500M in a month after failing to cap employee Claude licenses, while The Verge says Microsoft is winding down most Claude Code licenses partly for financial reasons. The takeaway is not "guess the company"; it is that agentic AI needs budgets, routing, per-user limits, and token observability before the bill becomes the incident.',
            chip: "cost controls",
            href: "https://www.axios.com/2026/05/28/ai-spending-roi-enterprise-costs",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/Polymarket/status/2060034216906068131?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/_alialkhatib/status/2060056690221838552?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad",
              "https://boingboing.net/2026/05/29/a-company-accidentally-spent-500-million-on-claude-in-one-month.html",
            ],
          },
          {
            title: "AI Twitter advice has a six-month half-life",
            description:
              "The useful part of the Karpathy-filter thread is not the dunk list; it is what keeps compounding: context engineering, tool design, evals, orchestrator/subagent boundaries, and harness > model. Good palate cleanser before a board full of fast-expiring model drops.",
            chip: "agent craft",
            href: "https://x.com/0xMortyx/status/2061491256107159736",
            embed: {
              type: "tweet",
              href: "https://twitter.com/0xMortyx/status/2061491256107159736?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Stop prompting agents, start designing loops",
            description:
              'Peter Steinberger\'s 8M-view post and Boris Cherny\'s self-verification loops both landed the same week with the same message: manual prompting is dead, orchestrated loops are the new baseline. The shift from "ask Claude to code" to "build systems that supervise Claude coding" is no longer early-adopter territory.',
            chip: "orchestration",
            href: "https://x.com/steipete/status/2063697162748260627",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/steipete/status/2063697162748260627?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet", 
                href: "https://twitter.com/bcherny/status/2064426115255730578?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://digg.com/ai/7ifyvmb9",
            ],
          },
          {
            title: "Local AI becomes bandwidth math",
            description:
              'The question for local AI deployment is no longer just "can it run?" but whether the memory path can keep up with model demands. Fresh bandwidth comparisons show the hardware reality behind local inference planning.',
            chip: "local infra",
            href: "https://x.com/The_Only_Signal/status/2060321842716365147",
            embed: {
              type: "tweet",
              href: "https://twitter.com/The_Only_Signal/status/2060321842716365147?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Vector compression hits 10x without the quality tax",
            description:
              "Shard KV cache compression, TurboVec, and TurboQuant all crossed the same threshold this year: aggressive compression that actually works in production. Shard gets 10-11x memory reduction on Llama with zero NIAH degradation, though Tim Dettmers called out the TurboQuant comparison as non-reproducible. Tom Turney shipped TurboQuant+ in llama.cpp within 36 hours of the Google paper, and Ryan Codrai's TurboVec fits 31GB of embeddings into 4GB on a MacBook. The real story is compression moving from research to practical local deployment.",
            chip: "compression",
            href: "https://github.com/krish1905/shard",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/krishgarg/status/2059041521576648980?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/Tim_Dettmers/status/2059345041240244611?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/GoogleResearch/status/2036533564158910740?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/no_stp_on_snek/status/2036944965364834444?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/VaibhavSisinty/status/2063357634267509010?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://krishgarg.com/shard",
              "https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/",
              "https://github.com/RyanCodrai/turbovec",
              "https://digg.com/ai/jo5iwt70",
            ],
          },
        ],
      },
      {
        id: "jun10-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, benchmark shifts, papers, architecture updates, and capability comparisons.",
        items: [
            {
              title: "Closed model releases",
              description: "Anthropic moved the top of the proprietary stack again: Claude Fable 5 is the public Mythos-class release, Mythos 5 is trusted-access, and risky cyber/bio/distillation requests can fall back to Opus 4.8. Put that next to Grok Imagine 1.5 Preview and Microsoft's seven-model MAI push: frontier labs are shipping capability and safety gating as one product surface.",
              chip: "closed releases",
              releaseRoundup: true,
              href: "https://www.anthropic.com/news/claude-fable-5-mythos-5",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/claudeai/status/2064394146916229443?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/claudeai/status/2060042702150930686?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/grok/status/2062225080843747351?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/mustafasuleyman/status/2061880164498428188?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/MicrosoftAI/status/2061887504916087224?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://www.anthropic.com/news/claude-opus-4-8",
                "https://x.ai/news",
                "https://microsoft.ai/news/building-a-hillclimbing-machine-launching-seven-new-mai-models/",
                "https://microsoft.ai/news/introducing-mai-thinking-1/",
              ],
            },
            {
              title: "Open model releases",
              description: "The open slide is now a stack, not a list: Nemotron/Cosmos/OmniDreams for physical AI, Gemma/Liquid/Step/OpenBMB/Tencent/Cohere for local LLMs and coding agents, DiffusionGemma for text diffusion, PaddleOCR/LocateAnything for vision, MOSS/Higgs/dots for audio, Ideogram/Magenta/NAVA/Lance/Bernini/JoyAI for media, WALL-OSS for robotics, and Unsloth/Comfy/NVFP4 quants for deployment.",
              chip: "open releases",
              releaseRoundup: true,
              href: "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/NVIDIAAI/status/2062521325076299981?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/MiniMax_AI/status/2061266317815296322?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/googlegemma/status/2062202706882883696?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/NVIDIAAI/status/2061308434629132553?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ideogram_ai/status/2062202228770045991?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/GoogleMagenta/status/2062589313372594538?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/jetbrains/status/2061444430884675791?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/NVIDIAAI/status/2062896815784219076?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/hcompany_ai/status/2061815365168923083?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ModelScope2022/status/2061008636634394819?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ModelScope2022/status/2063881896153543022?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/JinWeiyang18434/status/2062034336929677578?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/HuggingModels/status/2062025488147849246?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/boson_ai/status/2062629221411995896?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/AdinaYakup/status/2062923324896727048?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/liquidai/status/2060023455290974474?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/PaddlePaddle/status/2059990434827661769?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/OpenBMB/status/2061810723169415205?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/OpenBMB/status/2058903449379717319?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ArtificialAnlys/status/2062381047212638697?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/TencentHunyuan/status/2057384034544804136?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/TencentHunyuan/status/2059104921778352626?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ModelScope2022/status/2059243470469185617?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ClementDelangue/status/2061968482640523365?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ModelScope2022/status/2059244401189163391?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/pmarca/status/2063179832008356119?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/XiaomiMiMo/status/2063993799085633911?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/UnslothAI/status/2062207258810053084?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/UnslothAI/status/2062470072179044447?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/HuggingPapers/status/2060470519775043879?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/UnslothAI/status/2056369392666194108?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/NVIDIAAI/status/2056887241432014959?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/AdinaYakup/status/2063901313578963072?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/cohere/status/2064378058329526556?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/googleaidevs/status/2064743223491449013?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://vllm.ai/blog/2026-06-04-nemotron-3-ultra-vllm",
                "https://huggingface.co/google/gemma-4-12B",
                "https://nvidianews.nvidia.com/news/nvidia-launches-cosmos-3-the-open-frontier-foundation-model-for-physical-ai",
                "https://ideogram.ai/news/ideogram-4.0/",
                "https://huggingface.co/google/magenta-realtime-2",
                "https://huggingface.co/blog/JetBrains/mellum2-launch",
                "https://huggingface.co/nvidia/omni-dreams-models",
                "https://hcompany.ai/holo3",
                "https://huggingface.co/Kwai-Keye/Keye-VL-2.0-30B-A3B",
                "https://huggingface.co/nex-agi/Nex-N2-Pro",
                "https://huggingface.co/jdopensource/JoyAI-Echo",
                "https://huggingface.co/ByteDance/Bernini-R",
                "https://huggingface.co/bosonai/higgs-audio-v3-tts-4b",
                "https://github.com/rednote-hilab/dots.tts",
                "https://huggingface.co/LiquidAI/LFM2.5-8B-A1B",
                "https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6",
                "https://huggingface.co/openbmb/MiniCPM-V-4.6",
                "https://huggingface.co/openbmb/MiniCPM5-1B",
                "https://huggingface.co/stepfun-ai/Step-3.7-Flash",
                "https://huggingface.co/tencent/Hy-MT2-1.8B",
                "https://huggingface.co/tencent/Hy-MT2-7B",
                "https://huggingface.co/tencent/Hy-MT2-30B-A3B",
                "https://huggingface.co/OpenMOSS-Team/MOSS-TTS-v1.5",
                "https://github.com/OpenMOSS/MOSS-TTS",
                "https://huggingface.co/OpenMOSS-Team/MOSS-SoundEffect-v2.0",
                "https://huggingface.co/baidu/NAVA",
                "https://huggingface.co/bytedance-research/Lance",
                "https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro-FP4-DFlash",
                "https://huggingface.co/unsloth/gemma-4-12b-it-GGUF",
                "https://huggingface.co/unsloth/gemma-4-26B-A4B-it-GGUF",
                "https://huggingface.co/unsloth/gemma-4-31B-it-GGUF",
                "https://huggingface.co/RedHatAI/gemma-4-31B-it-FP8-block",
                "https://huggingface.co/RedHatAI/gemma-4-12B-it-NVFP4",
                "https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4",
                "https://huggingface.co/unsloth/Qwen3.6-27B-MTP-GGUF",
                "https://huggingface.co/Kijai/WanVideo_comfy",
                "https://huggingface.co/Kijai/LTX2.3_comfy",
                "https://huggingface.co/Comfy-Org/Qwen-Image_ComfyUI",
                "https://huggingface.co/Comfy-Org/PixelDiT",
                "https://huggingface.co/Comfy-Org/Ideogram-4",
                "https://huggingface.co/amazon/chronos-2",
                "https://huggingface.co/CohereLabs/cohere-transcribe-03-2026",
                "https://huggingface.co/blog/CohereLabs/introducing-north-mini-code",
                "https://huggingface.co/CohereLabs/North-Mini-Code-1.0",
                "https://huggingface.co/CohereLabs/North-Mini-Code-1.0-fp8",
                "https://huggingface.co/nvidia/LocateAnything-3B",
                "https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b",
                "https://huggingface.co/nvidia/Nemotron-Labs-Diffusion-3B-Base",
                "https://huggingface.co/nvidia/Nemotron-Labs-Diffusion-VLM-8B",
                "https://huggingface.co/x-square-robot/wall-oss-flow",
                "https://huggingface.co/x-square-robot/wall-oss-0.5",
                "https://github.com/X-Square-Robot/wall-x",
                "https://huggingface.co/mindlab-research/Macaron-V1-Preview-749B",
              ],
            },
            {
              title: "Fable's refusals go too far",
              description: "Anthropic shipped Claude Fable 5 with new cyber/bio safety classifiers that fallback to Opus 4.8 on refused requests. The result: 38/40 biology questions refused in one private eval, a third of BullshitBench questions blocked, and viral X posts about 'basic questions' getting rejected. The official line is these measures let Mythos-level capability ship sooner; the user reality is a model that refuses harmless queries loses more trust than one that occasionally gets a risky answer wrong.",
              chip: "model behavior",
              href: "https://x.com/ClaudeDevs/status/2064428347678220691",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/ClaudeDevs/status/2064428347678220691?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/djcows/status/2064513368002842732?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/DerekCroote/status/2064472087167930372?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/petergostev/status/2064435631594291304?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/petergostev/status/2064634015382978941?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/antirez/status/2064766429887352971?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://x.com/TimothyKassis/status/2064438011417481570",
                "https://x.com/LechMazur/status/2064511888793161887",
                "https://x.com/mykola/status/2064400637857591666",
              ],
            },
            {
              title: "World models need a taxonomy, not another demo",
              description: "Fei-Fei Li splits the overloaded world models label into renderers, simulators, and planners. That is the cleanest way to compare video generators, physics simulators, robotics policies, and agent planning without pretending they are the same capability.",
              chip: "world models",
              href: "https://drfeifei.substack.com/p/a-functional-taxonomy-of-world-models",
              embed: {
                type: "tweet",
                href: "https://twitter.com/a16z/status/2062266181890031815?ref_src=twsrc%5Etfw",
              },
            },
          ],
      },
      {
        id: "jun10-security",
        title: "Security",
        purpose:
          "This section covers attacks, abuse patterns, red-team findings, prompt injection, defensive work, and security-relevant failures.",
        items: [
          {
            title: "Frontier model review gets a federal lane",
            description:
              "Trump's June 2 AI order creates a classified cyber benchmark and a voluntary 30-day pre-release access path for covered frontier models, while explicitly avoiding mandatory licensing. The trust boundary is now government early access, not just lab evals.",
            chip: "governance",
            href: "https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/",
            linkPair: [
              "https://www.whitehouse.gov/fact-sheets/2026/06/fact-sheet-president-donald-j-trump-promotes-advanced-artificial-intelligence-innovation-and-security/",
              "https://apnews.com/article/e41af74f7b0865482f07d10fe7a50fe3",
              "https://techcrunch.com/2026/06/02/trump-signs-narrower-executive-order-on-ai-oversight-after-industry-objections/",
            ],
          },
        ],
      },
      {
        id: "jun10-big-tech",
        title: "Big Tech Moves",
        purpose:
          "This section covers major company moves, hardware launches, platform bets, product strategy, and policy or infrastructure changes that shape AI development.",
        items: [
          {
            title: "Apple finally shows Siri AI",
            description:
              "WWDC26 gave the first real look at Apple's delayed assistant reset: screen awareness, personal context search, app actions, web grounding, and a dedicated Siri app. The question is whether privacy-first OS agents can catch up to chat-native AI before users stop asking Siri for anything serious.",
            chip: "consumer agents",
            href: "https://www.apple.com/newsroom/2026/06/apple-unveils-next-generation-of-apple-intelligence-siri-ai-and-more/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/tftc21/status/2064042445021868257?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://techcrunch.com/2026/06/08/apples-long-awaited-ai-siri-overhaul-is-finally-here/",
              "https://www.axios.com/2026/06/08/apple-intelligence-ai-siri-golden-gate",
            ],
          },
          {
            title: "Apple stretches PCC onto Google/NVIDIA",
            description:
              "The sharper Siri infra story is that Apple now says AFM Cloud Pro extends Private Cloud Compute to NVIDIA GPUs in Google's cloud. If the privacy guarantees hold, PCC just changed from an Apple-Silicon-only cloud story into a verifiable confidential-inference architecture that can rent frontier GPU scale.",
            chip: "private compute",
            href: "https://9to5mac.com/2026/06/08/craig-federighi-details-apples-collaboration-with-google-for-siri-ai-in-ios-27/",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/anthonyronning/status/2064091573571477857?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/BenBajarin/status/2064065407615717659?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/NewsFromGoogle/status/2010760810751017017?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://blog.google/company-news/inside-google/company-announcements/joint-statement-google-apple/",
              "https://security.apple.com/blog/private-cloud-compute/",
              "https://www.apple.com/newsroom/2026/06/apple-unveils-next-generation-of-apple-intelligence-siri-ai-and-more/",
              "https://appleinsider.com/articles/26/01/12/google-confirms-that-it-wont-get-apple-user-data-in-new-siri-deal",
            ],
          },
          {
            title: "OpenAI says AI research automation is the race",
            description:
              "OpenAI's new plan memo frames phase three around an automated AI researcher, personal AGI for everyone, and governance that can coordinate or slow frontier work when needed. The loud sentence is that AI doing AI research will determine the pace of progress within the next few years.",
            chip: "strategy",
            href: "https://openai.com/index/built-to-benefit-everyone-our-plan/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/sama/status/2064088940932641225?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Anthropic enters IPO mode at $965B",
            description:
              "A $65B Series H, $47B run-rate, and confidential S-1 in the same week as Opus 4.8 makes the bet explicit: Claude's enterprise agent revenue is being priced like a near-trillion public-market company.",
            chip: "ipo",
            href: "https://www.anthropic.com/news/series-h",
            linkPair: [
              "https://www.anthropic.com/news/confidential-draft-s1-sec",
              "https://www.axios.com/2026/06/01/anthropic-ipo-openai",
              "https://techcrunch.com/2026/05/28/anthropic-raises-65-billion-nears-1t-valuation-ahead-of-ipo/",
            ],
          },
          {
            title: "Google rents SpaceX's GPU bridge",
            description:
              "The SEC filing says Google will pay SpaceX $920M/month for roughly 110K NVIDIA GPUs from October 2026 through June 2029. Google needing bridge capacity from Musk's compute pile says the agent-platform demand curve is outrunning even hyperscalers.",
            chip: "compute",
            href: "https://www.sec.gov/Archives/edgar/data/1181412/000162828026041150/spacexagreementfwp.htm",
            linkPair: [
              "https://techcrunch.com/2026/06/05/google-will-pay-spacex-920m-per-month-for-compute/",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-05-27",
    slug: "2026-05-27",
    date: "May 27, 2026",
    markdownHref: "./topics/2026-05-27.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-05-27T18:00:00-05:00",
      endAt: "2026-05-27T20:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
      hostNote:
        "Inflection week: first AI lab turns profitable, humanoids prove industrial readiness, and recursive AI research begins with Karpathy joining Anthropic.",
    },
    showcases: [
      {
        title: "Ostrich LLMs",
        description:
          "Qwen 3.6-based 27B model fine-tuned for healthcare autonomy outside traditional medical systems.",
        chip: "showcase",
        href: "https://huggingface.co/etemiz/Ostrich-27B-Qwen3.6-260526",
      },
      {
        title: "Community Slot",
        description:
          "Bring a project, prototype, repo, demo, or weird link worth showing the room.",
        chip: "showcase",
        href: "https://github.com/AustinKelsay/austin-ai-club",
      },
    ],
    tracks: [
      {
        id: "may27-agent-infra",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "Composer 2.5 = Opus at one tenth the cost??",
            description:
              "Cursor's new in-house coding model matches Claude Opus 4.7 performance at 10x cheaper pricing. Built on Kimi K2.5 with 85% of compute spent on their own RL pipeline, it's the first clear signal that frontier-competitive coding can run without frontier bills.",
            chip: "coding agents",
            href: "https://cursor.com/blog/composer-2-5",
            embed: {
              type: "tweet",
              href: "https://twitter.com/cursor_ai/status/2056415413077233983?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://handyai.substack.com/p/model-drop-composer-25",
              "https://turion.ai/blog/cursor-composer-2-5-coding-agents-may-2026/",
            ],
            topStory: true,
          },
          {
            title: "Figure AI's 200-hour humanoid marathon",
            description:
              "Figure 03 robots sorted 249,560 packages over 200 continuous hours with zero hardware failures. This isn't a demo anymore - it's proof that humanoid robots can run actual industrial operations. The 'dark factory' era just got real.",
            chip: "robotics",
            href: "https://interestingengineering.com/ai-robotics/figure-03-humanoid-robot-200-hour-shift",
            embed: {
              type: "tweet",
              href: "https://twitter.com/adcock_brett/status/2057699179938693430?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://en.sedaily.com/finance/2026/05/26/figure-ais-humanoid-robot-works-200-hours-nonstop-sorting",
            ],
          },
        ],
      },
      {
        id: "may27-models",
        title: "Models & Research",
        purpose:
          "This section covers model releases, benchmark shifts, papers, architecture updates, and capability comparisons.",
        items: [
            {
              title: "Open model releases",
              description: "Bonsai Image 4B compresses the FLUX.2 Klein 4B diffusion transformer from 7.75 GB to 0.93 GB (1-bit) and 1.21 GB (ternary), an 8.3x and 6.4x reduction while retaining 88-95% quality. First 4B-class diffusion model to run directly on iPhone hardware — 512x512 in 9.4s on iPhone 17 Pro Max. Apache 2.0. Also in this open wave: Epicure squeezes global cooking into 2MB.",
              chip: "open releases",
              releaseRoundup: true,
              href: "https://prismml.com/news/bonsai-image-4b",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/PrismML/status/2059339159899390326?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/josefchen/status/2059350978109874677?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://huggingface.co/spaces/webml-community/bonsai-image-webgpu",
                "https://arxiv.org/abs/2605.22391",
              ],
              notes: "Official open-release roundup: launch posts first, then the source catalog.",
            },
            {
              title: "Multi-token prediction goes mainstream",
              description: "Gemma 4 ships with native MTP drafters for 3x inference speedup, llama.cpp mainline adds `--spec-type draft-mtp`, and Qwen 3.6 runs locally on 12GB with 98% acceptance rates. Unsloth ships automatic MTP support with 2x faster GGUF inference. The memory bandwidth bottleneck finally has production-ready solutions.",
              chip: "optimization",
              href: "https://www.infoq.com/news/2026/05/gemma4-multi-token-prediction/",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/ggerganov/status/2056391115469689330?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/UnslothAI/status/2056369392666194108?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://carteakey.dev/blog/running-qwen3-6-mtp-locally/",
                "https://github.com/unslothai/unsloth/releases/tag/v0.1.405-beta",
              ],
            },
            {
              title: "DFlash beats autoregressive drafting ceiling",
              description: "Block diffusion model predicts 8-16 tokens in parallel with single forward pass, delivering 3x speedups versus traditional speculative decoding's 2x limit. Baseten's implementation shows it's not just research anymore.",
              chip: "optimization",
              href: "https://www.baseten.co/blog/dflash-faster-llm-inference/",
              embed: {
                type: "tweet",
                href: "https://twitter.com/zhijianliu_/status/2051900751673467097?ref_src=twsrc%5Etfw",
              },
              linkPair: [
                "https://dasroot.net/posts/2026/04/speculative-decoding-dflash-lorbus-mtp-speed/",
              ],
            },
            {
              title: "DeepSWE exposes the real coding model hierarchy",
              description: "New benchmark reveals GPT-5.5 leads at 70% while other models cluster much lower, shattering the illusion that frontier coding agents are roughly equivalent. Unlike SWE-bench Pro's narrow 30-point spread, DeepSWE shows a 70-point performance gap on realistic engineering tasks.",
              chip: "benchmarks",
              href: "https://deepswe.datacurve.ai/",
              embed: {
                type: "tweet",
                href: "https://twitter.com/theo/status/2059352130289651925?ref_src=twsrc%5Etfw",
              },
              linkPair: [
                "https://venturebeat.com/technology/deepswe-blows-up-the-ai-coding-leaderboard-crowns-gpt-5-5-and-finds-claude-opus-exploiting-a-benchmark-loophole",
              ],
            },
          ],
      },
      {
        id: "may27-security",
        title: "Security",
        purpose:
          "This section covers attacks, abuse patterns, red-team findings, prompt injection, defensive work, and security-relevant failures.",
        items: [
          {
            title: "TrapDoor supply chain attack hijacks AI coding assistants",
            description:
              "Malware campaign hit 34 packages across npm/PyPI/Crates.io using invisible Unicode in `.cursorrules` and `CLAUDE.md` files to trick AI assistants into exfiltrating secrets. When you ask Claude to debug code, it runs the attacker's 'security scan' instead.",
            chip: "supply chain",
            href: "https://agentriot.com/news/ai-security/ai-agent-security-may-2026",
            embed: {
              type: "tweet",
              href: "https://twitter.com/SocketSecurity/status/2058601291123716426?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://byteiota.com/trapdoor-supply-chain-attack-npm-pypi-crates/",
            ],
            topStory: true,
          },
        ],
      },
      {
        id: "may27-big-tech",
        title: "Big Tech Moves",
        purpose:
          "This section covers major company moves, hardware launches, platform bets, product strategy, and policy or infrastructure changes that shape AI development.",
        items: [
          {
            title: "Digg returns as AI signal detector",
            description:
              "Kevin Rose pivots the legendary aggregator into real-time AI news ranking by tracking 1,000 influential voices on X.",
            chip: "platform",
            href: "https://digg.com",
            images: [
              { src: "/images/digg-1.png", href: "https://digg.com", alt: "Digg screenshot 1" },
              { src: "/images/digg-2.png", href: "https://digg.com", alt: "Digg screenshot 2" },
            ],
            linkPair: [
              "https://techcrunch.com/2026/05/11/digg-tries-again-this-time-as-an-ai-news-aggregator/",
              "https://www.engadget.com/2170484/digg-ai-news-aggregator/",
            ],
          },
          {
            title: "SpaceX options Cursor for $60B",
            description:
              "The partnership gives Cursor access to Colossus supercomputing clusters while SpaceX gets the right to acquire the AI coding startup by year-end. Either a $60B purchase or $10B termination fee - the scale shows how serious the coding agent infrastructure race has become.",
            chip: "acquisition",
            href: "https://siliconangle.com/2026/04/22/spacex-partners-cursor-ai-training-floats-potential-60b-acquisition/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/cursor_ai/status/2046726224266043533?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://cursor.com/blog/spacex-model-training",
              "https://www.linkedin.com/pulse/claude-codes-quiet-victory-lap-how-spacex-cursor-tie-up-john-cloud-jfbec",
            ],
            topStory: true,
          },
          {
            title: "Anthropic cuts the programmatic subsidy",
            description:
              "Claude Agent SDK, `claude -p`, GitHub Actions, and third-party tools move off subscription limits onto separate $20-200 monthly credits at full API rates. The '25x cut' framing from Theo and others highlights how subsidized programmatic usage was getting expensive.",
            chip: "pricing",
            href: "https://gist.github.com/MagnaCapax/d9177e35b355853f03c730dfcaa693ef",
            embed: {
              type: "tweet",
              href: "https://twitter.com/theo/status/2055793010370306556?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://www.digitalapplied.com/blog/anthropic-claude-credit-overhaul-june-15-2026",
            ],
          },
          {
            title: "Grok API gets X Premium OAuth integration",
            description:
              "OpenClaw now supports OAuth for X Premium ($8/month) and SuperGrok ($30/month) subscribers, removing API key friction for agent workflows. Direct xAI API billing remains available for programmatic use, but the subscription bridge finally bridges consumer and developer access.",
            chip: "integration",
            href: "https://memeburn.com/how-to-use-grok-in-openclaw-oauth-api-key-guide-2026/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/xai/status/2055745332919808181?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://www.apideck.com/blog/how-to-get-your-grok-xai-api-key",
              "https://unified.to/blog/how_to_get_a_grok_xai_and_groq_api_key_and_connect_it_to_your_product",
            ],
          },
          {
            title: "Anthropic hits first profit at $10.9B quarterly revenue",
            description:
              "First AI lab to turn a real profit with $559M operating income, driven by Claude Code enterprise adoption. Revenue doubled quarter-over-quarter, outpacing Google and Facebook's pre-IPO growth. The 'AI replaces measurable labor costs' business model finally works at scale.",
            chip: "financials",
            href: "https://techcrunch.com/2026/05/20/anthropic-says-its-about-to-have-its-first-profitable-quarter/",
            linkPair: [
              "https://www.thehindubusinessline.com/info-tech/anthropic-eyes-559-million-profit-in-june-quarter-amid-explosive-ai-demand/article71004656.ece",
            ],
          },
          {
            title: "Karpathy joins Anthropic for recursive AI research",
            description:
              "OpenAI co-founder and beloved AI educator joins Anthropic's pre-training team to build Claude-assisted research tools. This is about AI training its own successors - the recursive self-improvement story that changes model development timelines.",
            chip: "talent",
            href: "https://techcrunch.com/2026/05/19/openai-co-founder-andrej-karpathy-joins-anthropics-pre-training-team/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/karpathy/status/2056753169888334312?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://www.thestreet.com/technology/anthropic-hires-karpathy-in-one-of-biggest-deals-in-ai",
            ],
            topStory: true,
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-05-13",
    slug: "2026-05-13",
    date: "May 13, 2026",
    markdownHref: "./topics/2026-05-13.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-05-13T18:00:00-05:00",
      endAt: "2026-05-13T20:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
      hostNote:
        "Security spine this week: AI SaaS as supply chain, privacy tools getting inverted, and compute as product strategy.",
    },
    showcases: [
      {
        title: "Community Slot",
        description:
          "Bring a project, prototype, repo, demo, or weird link worth showing the room.",
        chip: "showcase",
        href: "https://github.com/AustinKelsay/austin-ai-club",
      },
    ],
    tracks: [
      {
        id: "may13-agent-infra",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "Claude as bitcoin wallet forensics",
            description:
              "A lost-wallet story became a weirdly good agent demo: dump the old computer context in, have Claude trace files, debug btcrecover, and turn digital archaeology into recovered keys.",
            chip: "forensics",
            href: "https://x.com/cprkrn/status/2054586810475364536",
            embed: {
              type: "tweet",
              href: "https://twitter.com/cprkrn/status/2054586810475364536?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://news.bitcoin.com/bitcoiner-dumps-old-computer-files-into-claude-ai-recovers-5-btc-lost-since-2015/",
              "https://beincrypto.com/bitcoin-wallet-claude-ai-recovery/",
            ],
          },
          {
            title: "Matt Pocock, prompts better than me.",
            description:
              "The viral bit is not the repo itself; it is that engineering taste, review loops, TDD, issue triage, and planning rituals are becoming portable agent behavior.",
            chip: "agent skills",
            href: "https://github.com/mattpocock/skills",
            linkPair: [
              "https://agentconn.com/agents/mattpocock-skills/",
              "https://llmbase.ai/skills/mattpocock/",
            ],
            topStory: true,
          },
          {
            title: "Sandcastle",
            description:
              "TypeScript runner for sending coding agents into isolated worktrees and collecting the results.",
            chip: "agent infra",
            href: "https://github.com/mattpocock/sandcastle",
            image: {
              src: "/images/sandcastle-workflow.png",
              href: "https://github.com/mattpocock/sandcastle",
              caption: "Sandcastle workflow: prompt files fan out into isolated worktrees and containers.",
            },
            linkPair: ["https://www.sourcepulse.org/projects/27307520"],
          },
          {
            title: "Amnesic personal OS",
            description:
              "Fully local, private OS concept that boots from a USB stick and leaves no trace on the host machine.",
            chip: "local",
            href: "https://x.com/nichxbt/status/2046647915343741391",
            embed: {
              type: "tweet",
              href: "https://twitter.com/nichxbt/status/2046647915343741391?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Agents as fields",
            description:
              "Attio-style AI attributes put agents inside the workflow instead of beside it.",
            chip: "agent UX",
            href: "https://x.com/rrhoover/status/2048366028850163752",
            embed: {
              type: "tweet",
              href: "https://twitter.com/rrhoover/status/2048366028850163752?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://dribbble.com/shots/25870869-Attio-AI-Attributes",
            ],
          },
          {
            title: "YC wants a company brain",
            description:
              "YC's Company Brain RFS is the same agent-memory story at company scale: turn Slack, tickets, docs, and database know-how into a living map that agents can actually operate against.",
            chip: "company brain",
            href: "https://x.com/ycombinator/status/2048834293779378437",
            embed: {
              type: "tweet",
              href: "https://twitter.com/ycombinator/status/2048834293779378437?ref_src=twsrc%5Etfw",
            },
            image: {
              src: "/images/company-brain-yc.jpg",
              href: "https://x.com/ycombinator/status/2048834293779378437",
              caption: "YC's Company Brain post thumbnail.",
            },
            topStory: true,
          },
          {
            title: "Isaac Sim for beginners",
            description:
              "NVIDIA's robotics simulator pitch: prototype the chassis, wheels, sensors, and environment before touching hardware.",
            chip: "robotics",
            href: "https://developer.nvidia.com/isaac/sim",
            embed: {
              type: "tweet",
              href: "https://twitter.com/_vmlops/status/2048594851374243967?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Claude Managed Agents learn between runs",
            description:
              "Anthropic is moving agent memory, outcomes, orchestration, and webhooks into the managed platform layer. Dreaming is still preview, but durable agents are becoming hosted product surface, not just your own loop around an API.",
            chip: "agent memory",
            href: "https://claude.com/blog/new-in-claude-managed-agents",
            linkPair: [
              "https://claude.com/code-with-claude/session/sf-memory-and-dreaming-for-self-learning-agents",
              "https://www.anthropic.com/news/higher-limits-spacex",
            ],
          },
          {
            title: "The agent harness belongs outside the sandbox",
            description:
              "Mendral's backend-harness argument is a clean agent infrastructure split: keep credentials, memory, and durable execution outside the disposable workspace, then reach into the sandbox over RPC.",
            chip: "agent infra",
            href: "https://www.mendral.com/blog/agent-harness-belongs-outside-sandbox",
            topStory: true,
          },
          {
            title: "Dumb AI loops die in production",
            description:
              "Rohit's agent-systems writeup is the sober version of the loop hype: building, memory, harness, and orchestration all become product risk once state, auth, and unattended actions enter the chat.",
            chip: "agent risk",
            href: "https://x.com/i/article/2050613084558094336",
            embed: {
              type: "tweet",
              href: "https://twitter.com/rohit4verse/status/2050968031493550202?ref_src=twsrc%5Etfw",
            },
            video: {
              href: "https://www.youtube.com/watch?v=2TLXsxkz0zI",
              embedHref: "https://www.youtube.com/embed/2TLXsxkz0zI",
              title:
                "Ralph Loops: Build Dumb AI Loops That Ship — Chris Parsons, Cherrypick",
              caption:
                "AI Engineer talk behind the submitted dumb-loop production-risk post.",
            },
            topStory: true,
          },
        ],
      },
      {
        id: "may13-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, benchmark shifts, and capability updates that change what we should test, trust, or compare next.",
        items: [
            {
              title: "Closed model releases",
              description: "Better text, layout, and screenshot fidelity. The interesting part is mockups and visual iteration, not just prettier images. Also in this closed wave: SubQ goes after 12M-token context.",
              chip: "closed releases",
              releaseRoundup: true,
              href: "https://developers.openai.com/api/docs/models/gpt-image-2",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/chetaslua/status/2046489044243403029?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/fofrAI/status/2046603571286720769?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/yacineMTB/status/2046751282904338672?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/cto_junior/status/2046543490151240168?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/alex_whedon/status/2051663268704636937?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://subq.ai/introducing-subq",
              ],
              notes: "Official closed-release roundup: launch posts first, then the source catalog.",
            },
            {
              title: "Open model releases",
              description: "New quant evals show 12GB and 17.6GB variants with small reported quality hits. Also in this open wave: Gemma 4 app surface.",
              chip: "open releases",
              releaseRoundup: true,
              href: "https://qwen.ai/blog?id=qwen3.6",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/bnjmn_marie/status/2047786725846724918?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/TeksEdge/status/2047876512863633710?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/googledevs/status/2051700498328346945?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://deepmind.google/models/gemma/",
                "https://ai.google.dev/gemma/docs/releases",
                "https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-april-2026/",
                "https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/",
              ],
              notes: "Official open-release roundup: launch posts first, then the source catalog.",
            },
            {
              title: "12 models in 37 days",
              description: "Model velocity is now part of the workload: launches, quants, silent upgrades, and API-only variants every week.",
              chip: "models",
              href: "https://x.com/stevibe/status/2047539989492498711",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/stevibe/status/2047539989492498711?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/theo/status/2046767107178676636?ref_src=twsrc%5Etfw",
                },
              ],
            },
            {
              title: "Attune patches the open-model tool-call boundary",
              description: "Anthony Ronning's PoC treats empty outputs, malformed JSON, and missing tool_calls as contract failures between model, provider, and agent harness, not just bad model behavior.",
              chip: "open models",
              href: "https://github.com/AnthonyRonning/attune",
              embed: {
                type: "tweet",
                href: "https://twitter.com/anthonyronning/status/2053823121975542061?ref_src=twsrc%5Etfw",
              },
            },
            {
              title: "ProgramBench says agents still cannot rebuild software",
              description: "Given only binaries and docs, agents have to recreate full programs like jq, ripgrep, FFmpeg, and SQLite from scratch. GPT-5.5 xhigh tops the leaderboard at 0.5% fully solved, which is a useful cold shower for whole-codebase autonomy.",
              chip: "benchmark",
              href: "https://programbench.com/",
              linkPair: [
                "https://arxiv.org/abs/2511.00079",
                "https://github.com/ProgramBench/ProgramBench",
              ],
              image: {
                src: "/images/programbench-leaderboard.png",
                href: "https://programbench.com/",
                caption: "ProgramBench leaderboard: agents try to rebuild whole programs from binaries and docs.",
              },
              topStory: true,
            },
            {
              title: "Talkie tests vintage-model generalization",
              description: "A 13B model trained only on pre-1931 text is a cleaner probe for what LMs learn from language versus the modern web. The fun question is whether scale lets a model learn post-cutoff skills like code from examples alone.",
              chip: "vintage LM",
              href: "https://talkie-lm.com/introducing-talkie",
              embed: {
                type: "tweet",
                href: "https://twitter.com/status_effects/status/2048878495539843211?ref_src=twsrc%5Etfw",
              },
              topStory: true,
            },
            {
              title: "Red/blue button model behavior",
              description: "Jan Kulveit's red/blue button plots are a compact moral-decision probe: same dilemma, different models and reasoning settings, visibly different button preferences.",
              chip: "behavior",
              href: "https://x.com/jankulveit/status/2048808080188608953",
              embed: {
                type: "tweet",
                href: "https://twitter.com/jankulveit/status/2048808080188608953?ref_src=twsrc%5Etfw",
              },
            },
          ],
      },
      {
        id: "may13-security",
        title: "Security",
        purpose:
          "This section covers attacks, abuse patterns, defensive ideas, and security-relevant failures around modern AI systems and tooling.",
        items: [
          {
            title: "Vercel's Context.ai breach",
            description:
              "A compromised third-party AI tool led to Google Workspace takeover and access to non-sensitive env vars. AI SaaS is supply chain now.",
            chip: "supply chain",
            href: "https://vercel.com/kb/bulletin/vercel-april-2026-security-incident",
            embed: {
              type: "tweet",
              href: "https://twitter.com/theo/status/2046767107178676636?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-saas-supply-chain-vercel-contextai-2026/",
            ],
          },
          {
            title: "Mini Shai-Hulud hits the AI dev supply chain",
            description:
              "TanStack, Mistral AI, and other developer packages got pulled into a fresh supply-chain wave; the scary part is trusted package publishing turning into credential theft at CI speed.",
            chip: "supply chain",
            href: "https://www.wiz.io/blog/mini-shai-hulud-strikes-again-tanstack-more-npm-packages-compromised",
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/hetmehtaa/status/2054158511073116266?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/theo/status/2054445127662477581?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://expel.com/blog/mini-shai-hulud-cross-ecosystem-supply-chain-worm-targeting-npm-pypi/",
              "https://www.tomshardware.com/tech-industry/cyber-security/compromised-mistral-ai-and-tanstack-packages-may-have-exposed-github-cloud-and-ci-cd-credentials-in-mini-shai-hulud-malware-infection-supply-chain-campaign-spreads-across-npm-and-ai-developer-ecosystems-like-wildfire",
            ],
            topStory: true,
          },
          {
            title: "PII filters are becoming local model infrastructure",
            description:
              "OpenAI shipped Privacy Filter, NVIDIA has GLiNER-PII, and the move is privacy protection becoming a small local model you put before logs, RAG, evals, and training data.",
            chip: "privacy",
            href: "https://openai.com/index/introducing-openai-privacy-filter/",
            linkPair: [
              "https://huggingface.co/openai/privacy-filter",
              "https://huggingface.co/nvidia/gliner-PII",
            ],
            topStory: true,
          },
          {
            title: "HRF funds AI for individual rights",
            description:
              "The Human Rights Foundation's AI grants are the freedom-tech version of the agent story: privacy-preserving assistants, pay-per-query AI over Bitcoin, and tools built for people under surveillance.",
            chip: "freedom tech",
            href: "https://hrf.org/program/ai-for-individual-rights/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/TFTC21/status/2054591422959861780?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "GPT-5.5-Cyber opens the trust gate",
            description:
              "OpenAI is giving vetted defenders more permissive cyber workflows through Trusted Access, with GPT-5.5-Cyber in limited preview for critical infrastructure teams. The main shift is access control around dual-use capability, not a simple cyber model beats everything launch.",
            chip: "cyber",
            href: "https://openai.com/index/gpt-5-5-with-trusted-access-for-cyber/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/sama/status/2049712078836170843?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://openai.com/daybreak",
              "https://openai.com/index/trusted-access-for-cyber/",
              "https://www.axios.com/2026/05/13/palo-alto-networks-mythos-gpt-cybersecurity",
            ],
          },
          {
            title: "Loupe scans Bitcoin open source before attackers do",
            description:
              "Block and Spiral are pointing AI vulnerability scanning at open-source Bitcoin projects, which is the practical defensive twin of the GPT-5.5-Cyber story.",
            chip: "vuln scanning",
            href: "https://spiralbtc.substack.com/p/meet-loupe-ai-powered-vulnerability",
            embed: {
              type: "tweet",
              href: "https://twitter.com/ProjectLoupe/status/2054252211756994678?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://glitchwire.com/news/blocks-spiral-launches-loupe-an-ai-vulnerability-scanner-for-open-source-bitcoin/",
            ],
          },
          {
            title: "Anthropic opens the bounty door",
            description:
              "Anthropic moved its security bug bounty onto HackerOne for public reporting. Useful vendor-signal: frontier model companies are turning model and platform security into something outside researchers can poke at directly.",
            chip: "bug bounty",
            href: "https://hackerone.com/anthropic",
            embed: {
              type: "tweet",
              href: "https://twitter.com/AnthropicAI/status/2052466175540629965?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "AI resume screeners prefer AI-polished resumes",
            description:
              "Same candidate, AI-rewritten resume wins 97.6% of the time in the reported study. The security angle is automated gatekeeping that rewards model-fluent polish over the underlying human.",
            chip: "hiring",
            href: "https://x.com/heynavtoor/status/2048088874686300431",
            embed: {
              type: "tweet",
              href: "https://twitter.com/heynavtoor/status/2048088874686300431?ref_src=twsrc%5Etfw",
            },
            topStory: true,
          },
          {
            title: "Cursor + Claude deletes PocketOS production data",
            description:
              "The alleged PocketOS incident is the nightmare version of agent authority: production database gone, backups destroyed, and the founder blaming his own prompt discipline afterward.",
            chip: "agent risk",
            href: "https://x.com/disclosetv/status/2048915961781104741",
            embed: {
              type: "tweet",
              href: "https://twitter.com/disclosetv/status/2048915961781104741?ref_src=twsrc%5Etfw",
            },
            notes:
              "Host angle: compare whether the failure was agent autonomy, production permissions, backup design, or rage-prompting an agent with too much authority.",
            topStory: true,
          },
        ],
      },
      {
        id: "may13-big-tech-moves",
        title: "Big Tech Moves",
        purpose:
          "This section covers major company moves, product launches, acquisitions, and platform bets that shift how the AI market is organized.",
        items: [
          {
            title: "Anthropic buys the AWS compute runway",
            description:
              "Up to 5 GW of Trainium compute, with nearly 1 GW expected by the end of 2026.",
            chip: "compute",
            href: "https://www.anthropic.com/news/anthropic-amazon-compute",
            embed: {
              type: "tweet",
              href: "https://twitter.com/AnthropicAI/status/2046327624092487688?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://www.aboutamazon.com/news/company-news/amazon-invests-additional-5-billion-anthropic-ai",
            ],
          },
          {
            title: "Frontier model testing gets a federal lane",
            description:
              "CAISI signed pre-deployment evaluation agreements with Google DeepMind, Microsoft, and xAI. Voluntary today, but it makes national-security testing part of the frontier-model shipping path.",
            chip: "policy",
            href: "https://www.nist.gov/news-events/news/2026/05/caisi-signs-agreements-regarding-frontier-ai-national-security-testing",
          },
          {
            title: "Pentagon picks a classified AI stack",
            description:
              "SpaceX, OpenAI, Google, NVIDIA, Reflection, Microsoft, Oracle, and AWS are being brought into IL6 and IL7 defense environments. The story is not one chatbot contract; it is cloud, compute, model access, and operational AI moving into classified workflows.",
            chip: "defense",
            href: "https://www.nextgov.com/artificial-intelligence/2026/05/pentagon-makes-agreements-7-companies-add-ai-classified-networks/413264/",
            linkPair: [
              "https://techcrunch.com/2026/05/01/pentagon-inks-deals-with-nvidia-microsoft-and-aws-to-deploy-ai-on-classified-networks/",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-04-15",
    slug: "2026-04-15",
    date: "April 15, 2026",
    markdownHref: "./topics/2026-04-15.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-04-15T17:00:00-05:00",
      endAt: "2026-04-15T19:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
      hostNote:
        "Smaller board this week. Less scrolling, more actual discussion.",
    },
    showcases: [],
    tracks: [
      {
        id: "apr15-local-builds",
        title: "Local Builds & Projects",
        purpose:
          "This section covers actual meetup member projects, demos, prototypes, and local builds that were made by people in the room.",
        items: [
          {
            title: "OpenAgents: Pylon + Autopilot",
            description:
              "Pylon looks like the local runtime underneath OpenAgents, while Autopilot is the desktop layer on top. The bigger idea is agents that keep their own identity, state, and wallet instead of living inside one hosted chat box.",
            chip: "local",
            href: "https://docs.openagents.com/concepts/sovereign-agents",
            embed: {
              type: "tweet",
              href: "https://twitter.com/OpenAgents/status/2042626501451919412?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://openagents.com/",
              "https://github.com/openagents-org/openagents",
            ],
          },
        ],
      },
      {
        id: "apr15-agent-infra",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "mesh-llm pools compute for open models",
            description:
              "Block's Michael Neale is pitching mesh-llm as an OpenAI-compatible inference mesh for pooling spare compute across open models.",
            chip: "infra",
            href: "https://docs.anarchai.org/",
            linkPair: [
              "https://github.com/michaelneale/mesh-llm",
              "https://x.com/jack/status/2039736688457507251",
            ],
            notes:
              "Interesting because it tries to collapse local inference, p2p routing, and agent coordination into one surface.",
          },
          {
            title: "Karpathy's LLM wiki idea",
            description:
              "Karpathy's pitch is simple: use LLMs to build a living markdown wiki for a topic, then keep extending that artifact instead of starting over from scratch every time.",
            chip: "memory",
            href: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
            embed: {
              type: "tweet",
              href: "https://twitter.com/karpathy/status/2039805659525644595?ref_src=twsrc%5Etfw",
            },
            linkPair: ["https://x.com/karpathy/status/2040470801506541998"],
            notes:
              "Better framing than disposable chat history: the wiki becomes the working artifact, and the model keeps editing it forward.",
          },
          {
            title: "Everybody wants an agent story now",
            description:
              "Slack, Microsoft, IBM, and a bunch of smaller infra players all pushed agent launches in the same week. The main signal is not any one framework. It is that everybody suddenly needs to be in the agent business.",
            chip: "infra",
            href: "https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/",
            linkPair: [
              "https://slack.com/blog/news/agent-orchestration",
              "https://rivet.dev/changelog/2026-04-04-introducing-agentos/",
              "https://github.com/rivet-dev/agent-os",
              "https://www.zenml.io/blog/kitaru-launch",
              "https://github.com/zenml-io/kitaru",
              "https://medium.com/agentspan/open-sourcing-agentspan-durable-ai-agents-069adc",
              "https://agentspan.ai/",
              "https://huggingface.co/blog/ibm-research/altk-evolve",
              "https://venturebeat.com/orchestration/slack-adds-30-ai-features-to-slackbot-its-most-ambitious-update-since-the-salesforce-acquisition/",
            ],
            notes:
              "Feels like the new checkbox for every big platform: if you do not have an agent product, agent framework, or agent roadmap, you look behind.",
          },
        ],
      },
      {
        id: "apr15-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, benchmark shifts, and capability updates that change what we should test, trust, or compare next.",
        items: [
            {
              title: "Closed model releases",
              description: "Qwen is pitching Qwen3.6-Plus as a real-world multimodal agent model: coding, vision, and 1M context in one API. Also in this closed wave: Meta introduces Muse Spark.",
              chip: "closed releases",
              releaseRoundup: true,
              href: "https://qwen.ai/blog?id=qwen3.6",
              linkPair: [
                "https://chat.qwen.ai/",
                "https://x.com/Alibaba_Qwen/status/2039705104723611829",
                "https://ai.meta.com/blog/introducing-muse-spark-msl/",
                "https://x.com/ArtificialAnlys/status/2041913043379220801",
              ],
              notes: "Official closed-release roundup: launch posts first, then the source catalog.",
            },
            {
              title: "Open model releases",
              description: "Overworld is releasing Waypoint-1.5 as a real-time diffusion world model aimed at consumer hardware, with local execution tiers for 720p and 360p plus a browser path for instant access. Also in this open wave: GLM-5.1; Trinity-Large-Thinking; Google Gemma 4; Llama 4 Scout & Maverick.",
              chip: "open releases",
              releaseRoundup: true,
              href: "https://over.world/blog/waypoint-1-5",
              linkPair: [
                "https://github.com/Overworldai/Biome/blob/main/README.md",
                "https://x.com/overworld_ai/status/2042287199513952563",
                "https://docs.z.ai/guides/llm/glm-5.1",
                "https://z.ai/blog/glm-5.1",
                "https://x.com/Zai_org/status/2041550153354519022",
                "https://huggingface.co/arcee-ai/Trinity-Large-Thinking",
                "https://x.com/TheAhmadOsman/status/2039481776628777245",
                "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/",
                "https://developers.googleblog.com/en/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/",
                "https://ai.google.dev/gemma/docs/releases",
                "https://x.com/Google/status/2039736220834480233",
                "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
                "https://llama.meta.com/models/llama-4/",
                "https://huggingface.co/blog/llama4-release",
              ],
              notes: "Official open-release roundup: launch posts first, then the source catalog.",
            },
          ],
      },
      {
        id: "apr15-security",
        title: "Security",
        purpose:
          "This section covers attacks, abuse patterns, defensive ideas, and security-relevant failures around modern AI systems and tooling.",
        items: [
          {
            title: "Anthropic launches Project Glasswing with Claude Mythos Preview",
            description:
              "Anthropic is saying Mythos Preview is already strong enough at vulnerability discovery and exploit development that it is keeping the model out of general release and routing access through Project Glasswing instead.",
            chip: "security",
            href: "https://www.anthropic.com/glasswing",
            linkPair: [
              "https://red.anthropic.com/2026/mythos-preview/",
              "https://www.anthropic.com/claude-mythos-preview-system-card",
              "https://x.com/AnthropicAI/status/2041578392852517128",
            ],
            notes:
              "This is bigger than a model launch: Anthropic says Mythos has already found thousands of high-severity zero-days across every major OS and browser, launched with AWS, Apple, Google, Microsoft, and others, and tied the effort to $100M in usage credits plus $4M for open-source security groups.",
          },
          {
            title: "Anthropic's fake-tool anti-distillation path",
            description:
              "The leaked Claude Code source shows an anti-distillation mode that opts CLI traffic into fake tool injection.",
            chip: "security",
            href:
              "https://github.com/Gitlawb/openclaude/blob/2f162af60cc028899a343a660fef2da8186ca018/src/services/api/claude.ts",
            linkPair: [
              "https://winbuzzer.com/2026/04/01/claude-code-source-leak-anti-distillation-traps-undercover-mode-xcxwbn/",
            ],
            notes:
              "This is the clearest recent sign that labs now treat distillation as an adversarial security problem, not just an abuse problem.",
          },
          {
            title: "Microsoft Agent Governance Toolkit",
            description:
              "Microsoft open-sources a runtime security toolkit for autonomous AI agents under MIT. Policy enforcement, zero-trust identity, audit trails, and guardrails mapped to OWASP agent risk categories.",
            chip: "security",
            href: "https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit/",
            linkPair: [
              "https://github.com/microsoft/agent-governance-toolkit",
            ],
            notes:
              "This is the first major vendor-backed open-source governance layer for agents. The OWASP mapping gives it a standards anchor that most agent security tools lack.",
          },
          {
            title: "OWASP Secure Agent Playbook",
            description:
              "OWASP drops a step-by-step security playbook specifically for building and operating AI agents, grounded in their agent risk taxonomy.",
            chip: "security",
            href: "https://github.com/OWASP/secure-agent-playbook",
            linkPair: [
              "https://genai.owasp.org/resource/ai-security-solutions-landscape-for-agentic-ai-q2-2026/",
            ],
            notes:
              "Pairs well with the Microsoft governance toolkit. OWASP is setting the taxonomy and Microsoft is building the runtime enforcement.",
          },
          {
            title: "AI Trust Commons governance framework",
            description:
              "Open-source (Apache 2.0) cross-provider governance framework for AI agents that works across AWS, Azure, and GCP. Aims to unify audit, compliance, and standards mapping for enterprise agent deployments.",
            chip: "security",
            href: "https://github.com/aitrustcommons/governance-framework",
            linkPair: [
              "https://aitrustcommons.org/",
              "https://aitrustcommons.org/standards/",
            ],
            notes:
              "The cross-provider angle is what makes this different from vendor-specific toolkits. Maps to both NIST and OWASP standards.",
          },
        ],
      },
      {
        id: "apr15-big-tech-moves",
        title: "Big Tech Moves",
        purpose:
          "This section covers major company moves, product launches, acquisitions, and platform bets that shift how the AI market is organized.",
        items: [
          {
            title: "Anthropic vs OpenClaw keeps escalating",
            description:
              "First Anthropic cut OpenClaw off Claude subscription credits on April 4, 2026. Then on April 10, 2026 Peter Steinberger said Anthropic suspended his Claude and API access, before his account was restored roughly two hours later.",
            chip: "policy",
            href: "https://www.theverge.com/ai-artificial-intelligence/907074/anthropic-openclaw-claude-subscription-ban",
            image: {
              src: "/images/anthropic-openclaw-email.jpg",
              href: "https://www.theverge.com/ai-artificial-intelligence/907074/anthropic-openclaw-claude-subscription-ban",
              alt: "Anthropic email explaining that Claude subscriptions no longer cover third-party harnesses including OpenClaw.",
              caption: "Anthropic email shown in reporting around the OpenClaw subscription cutoff",
            },
            embeds: [
              {
                type: "tweet",
                href: "https://twitter.com/bcherny/status/2040206444428189755?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/steipete/status/2042615534567457102?ref_src=twsrc%5Etfw",
              },
              {
                type: "tweet",
                href: "https://twitter.com/steipete/status/2042648934238097842?ref_src=twsrc%5Etfw",
              },
            ],
            linkPair: [
              "https://x.com/bcherny/status/2040206443094446558",
              "https://finance.sina.com.cn/tech/roll/2026-04-11/doc-inhucmsx9421750.shtml",
            ],
            notes:
              "The cheap Claude-inside-OpenClaw path is still clearly gone. The Peter suspension looks different: based on reporting and Anthropic employee replies, that one appears to have been a false positive, not a lasting creator-specific ban.",
          },
          {
            title: "OpenAI acquires TBPN",
            description:
              "OpenAI is acquiring TBPN, keeping the show intact while pulling the team into Strategy.",
            chip: "media",
            href: "https://openai.com/index/openai-acquires-tbpn/",
            linkPair: [
              "https://x.com/jordihays/status/2039756490387624327",
            ],
            notes:
              "This looks like a distribution move as much as a media deal. Owning the conversation is its own moat.",
          },
          {
            title: "Microsoft ships in-house MAI models",
            description:
              "Microsoft launches three in-house AI models through Foundry: MAI-Transcribe-1 (SOTA speech-to-text across 25 languages), MAI-Voice-1 (speech generation), and MAI-Image-2 (text-to-image). A clear signal of reducing OpenAI dependency.",
            chip: "strategy",
            href: "https://microsoft.ai/news/today-were-announcing-3-new-world-class-mai-models-available-in-foundry/",
            linkPair: [
              "https://aka.ms/mai-foundry-tcblog",
              "https://thenextweb.com/news/microsoft-mai-models-openai-independence",
            ],
            notes:
              "The real story is not the models themselves but what they mean: Microsoft is building first-party alternatives to OpenAI across speech, voice, and image. The renegotiated partnership is producing visible divergence.",
          },
          {
            title: "OpenAI pauses Stargate UK",
            description:
              "OpenAI pauses the Stargate UK data-centre project over high energy costs and regulatory uncertainty. The plan would have deployed up to 8,000 GPUs with NVIDIA and Nscale in North Tyneside.",
            chip: "strategy",
            href: "https://www.reuters.com/business/openai-pauses-uk-data-centre-project-over-regulation-costs/",
            linkPair: [
              "https://www.bbc.co.uk/news/articles/clyd032ej70o",
              "https://thenextweb.com/news/openai-pauses-stargate-uk-energy-costs-regulation",
            ],
            notes:
              "A reminder that compute expansion is still gated by energy costs and regulation, not just capital. OpenAI has the $122B but the physical infrastructure bottleneck is real.",
          },
          {
            title: "Two attacks on Sam Altman's home in one week",
            description:
              "On April 10 a 20-year-old threw a Molotov cocktail at Altman's San Francisco house, setting a perimeter gate on fire, then went to OpenAI's office and threatened arson before being arrested. Two days later on April 12, two suspects in a Honda fired a gun toward the same Lombard Street property; both were arrested for negligent discharge of a firearm. FBI raided the first suspect's Texas home. Altman was uninjured in both incidents.",
            chip: "news",
            href: "https://sfstandard.com/2026/04/12/sam-altman-s-home-targeted-second-attack/",
            linkPair: [
              "https://www.cnbc.com/2026/04/10/sam-altman-house-hit-with-molotov-cocktail-openai-office-threatened.html",
              "https://www.engadget.com/ai/two-suspects-have-been-arrested-for-allegedly-shooting-at-sam-altmans-san-francisco-home-142655579.html",
              "https://www.bbc.com/news/articles/czx91rdxpyeo",
              "https://www.wired.com/story/sam-altman-home-attack-openai-san-franisco-office/",
            ],
            notes:
              "Two unrelated attacks in 72 hours. The first suspect explicitly threatened OpenAI. Altman called AI a 'ring of power' dynamic that makes people do crazy things. Expect the physical security conversation around AI leaders to escalate.",
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-04-01",
    slug: "2026-04-01",
    date: "April 1, 2026",
    markdownHref: "./topics/2026-04-01.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-04-01T17:00:00-05:00",
      endAt: "2026-04-01T19:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, research, or a showcase.",
      ],
    },
    showcases: [
      {
        title: "DISTILL",
        description:
          "DISTILL stands for Data Infrastructure for Storing, Tagging, Indexing, and Labeling Locally. It is a desktop app for reviewing, labeling, and exporting chat history from Codex CLI, Claude Code, and OpenCode.",
        chip: "showcase",
        href: "https://github.com/AustinKelsay/DISTILL",
        image: {
          src: "/images/distill-showcase.png",
          href: "https://github.com/AustinKelsay/DISTILL",
          alt: "DISTILL desktop app screenshot",
          caption: "DISTILL session review UI",
        },
        notes:
          "Local chat history, one place, ready to review and export.",
      },
    ],
    tracks: [
      {
        id: "apr-agent-infrastructure",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "GTC 2026 was an AI factory pitch",
            description:
              "The main pitch was not just faster chips. NVIDIA framed GTC around the whole AI factory, from Vera Rubin racks to DSX reference designs.",
            chip: "news",
            href: "https://blogs.nvidia.com/blog/gtc-2026-news/",
            notes:
              "They are selling a blueprint for the data center, not just the box that goes in it.",
            image: {
              src: "https://iprsoftwaremedia.com/219/files/202603/69b75d173d6332e5b174de10_nvidia-vera-rubin-dsx/nvidia-vera-rubin-dsx_8a1ea329-b957-4cc8-83a6-f6e76d324c62-prv.jpg",
              href:
                "https://nvidianews.nvidia.com/news/nvidia-releases-vera-rubin-dsx-ai-factory-reference-design-and-omniverse-dsx-digital-twin-blueprint-with-broad-industry-support",
              alt: "NVIDIA Vera Rubin DSX AI Factory reference design",
              caption:
                "Official NVIDIA press image: Vera Rubin DSX AI Factory reference design",
            },
            linkPair: [
              "https://nvidianews.nvidia.com/news/nvidia-vera-rubin-platform",
              "https://nvidianews.nvidia.com/news/nvidia-releases-vera-rubin-dsx-ai-factory-reference-design-and-omniverse-dsx-digital-twin-blueprint-with-broad-industry-support",
              "https://www.nvidia.com/gtc",
            ],
          },
          {
            title: "NVIDIA wants a place in the agent stack too",
            description:
              "It was not only hardware. NVIDIA also launched Agent Toolkit, OpenShell, and AI-Q, which looks like a serious push into the default enterprise agent stack.",
            chip: "stack",
            href: "https://nvidianews.nvidia.com/news/ai-agents",
            notes:
              "They want a seat in the runtime layer, not just a claim on the GPU budget.",
            image: {
              src: "https://iprsoftwaremedia.com/219/files/202603/69b796313d6332f8a374de0e_nvidia-agent-toolkit/nvidia-agent-toolkit_bb2c0928-f241-4d78-b39d-14f05c246fe1-prv.jpg",
              href: "https://nvidianews.nvidia.com/news/ai-agents",
              alt: "NVIDIA Agent Toolkit",
              caption: "Official NVIDIA press image: Agent Toolkit / OpenShell / AI-Q",
            },
            linkPair: [
              "https://build.nvidia.com/openshell",
              "https://build.nvidia.com/nvidia/aiq",
            ],
          },
          {
            title: "Physical AI got pulled into the same pitch",
            description:
              "Robotics, autonomy, and synthetic-data pipelines showed up as the next leg of the same infrastructure story.",
            chip: "robotics",
            href:
              "https://nvidianews.nvidia.com/news/nvidia-announces-open-physical-ai-data-factory-blueprint-to-accelerate-robotics-vision-ai-agents-and-autonomous-vehicle-development",
            notes:
              "Same playbook, different target: simulate it, generate the data, then move into real-world systems.",
            image: {
              src: "https://iprsoftwaremedia.com/219/files/202603/69b4f26b3d633201f974de1a_nvidia-physical-ai-data-factory-blueprint/nvidia-physical-ai-data-factory-blueprint_3e75cdcf-01f2-4acc-b4a9-a3125fac7b06-prv.jpg",
              href:
                "https://nvidianews.nvidia.com/news/nvidia-announces-open-physical-ai-data-factory-blueprint-to-accelerate-robotics-vision-ai-agents-and-autonomous-vehicle-development",
              alt: "NVIDIA Physical AI Data Factory Blueprint",
              caption:
                "Official NVIDIA press image: Physical AI Data Factory Blueprint",
            },
            linkPair: [
              "https://nvidianews.nvidia.com/news/nvidia-and-global-robotics-leaders-take-physical-ai-to-the-real-world",
              "https://nvidianews.nvidia.com/news/nvidia-expands-open-model-families-to-power-the-next-wave-of-agentic-physical-and-healthcare-ai",
            ],
          },
          {
            title: "Free coding agent with ad model",
            description:
              "A free coding agent angle with an ad-supported model behind it.",
            chip: "x",
            href: "https://x.com/jahooma/status/2034784332569878618",
            embed: {
              type: "tweet",
              href: "https://twitter.com/jahooma/status/2034784332569878618?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Chrome DevTools MCP",
            description:
              "Chrome DevTools now exposes an MCP path for debugging live browser sessions, with Addy Osmani framing the practical workflow.",
            chip: "pair",
            href: "https://developer.chrome.com/blog/chrome-devtools-mcp-debug-your-browser-session",
            linkPair: [
              "https://x.com/addyosmani/status/2032875051830358197",
            ],
          },
          {
            title: "OpenAgents Autopilot",
            description:
              "New OpenAgents product angle: passively sell compute and get paid in bitcoin.",
            chip: "x",
            href: "https://x.com/ThrillerX_/status/2036864088341360670",
            embed: {
              type: "tweet",
              href: "https://twitter.com/ThrillerX_/status/2036864088341360670?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "402 Index paid API loop demo",
            description:
              "Ryan Gentry's demo shows service discovery, evaluation, tool detection, payment, and response consumption inside one agent loop. Underneath is `402index-mcp-server`, an MCP server for discovering 15,000+ paid API endpoints across L402, x402, and MPP.",
            chip: "pair",
            href: "https://x.com/RyanTheGentry/status/2039036789252390970",
            embed: {
              type: "tweet",
              href: "https://twitter.com/RyanTheGentry/status/2039036789252390970?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://github.com/ryanthegentry/402index-mcp-server",
            ],
            notes:
              "This is the cleanest end-to-end machine-payments demo in the list: discovery, trust, payment, and execution collapsed into one flow.",
          },
          {
            title: "Zai launches AutoClaw",
            description:
              "Zhipu's one-click local OpenClaw installer turns a PC into a 24/7 AI agent. Ships with Pony Alpha 2, 50+ preloaded skills, and supports open models like DeepSeek and Kimi.",
            chip: "x",
            href: "https://x.com/Zai_org/status/2038632251551023250",
            embed: {
              type: "tweet",
              href: "https://twitter.com/Zai_org/status/2038632251551023250?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://pandaily.com/zhipu-ai-launches-auto-claw-a-one-click-local-open-claw-that-turns-p-cs-into-24-7-ai-agents",
              "https://cntechpost.com/2026/03/10/zhipu-launches-autoclaw-one-click-local-ai-deployment-rival-tech-giants/",
            ],
          },
          {
            title: "Ollama launches Pi",
            description:
              "Ollama adds Pi to `ollama launch`, making Mario Zechner's minimal coding agent available from the CLI with near-zero setup. Ollama's docs position Pi as a minimal AI agent toolkit with plugin support and a quick launch path.",
            chip: "pair",
            href: "https://x.com/ollama/status/2038506792070914079",
            embed: {
              type: "tweet",
              href: "https://twitter.com/ollama/status/2038506792070914079?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://docs.ollama.com/integrations/pi",
              "https://www.sci-tech-today.com/news/ollama-pi-coding-agent-launch-openclaw-customization/",
            ],
          },
          {
            title: "Osaurus local AI suite",
            description:
              "Osaurus is pitching a Mac-native local AI suite that makes MLX models feel as easy to run as Ollama, but adds a real UI, persistent memory, sandboxed code execution, 20+ plugins, and Ollama API compatibility.",
            chip: "x",
            href: "https://x.com/pleb_devs/status/2036911139485798755",
            embed: {
              type: "tweet",
              href: "https://twitter.com/pleb_devs/status/2036911139485798755?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Claude Code gets computer use",
            description:
              "Computer use is now in Claude Code. Research preview, Pro and Max plans, macOS only.",
            chip: "x",
            href: "https://x.com/claudeai/status/2038663014098899416",
            embed: {
              type: "tweet",
              href: "https://twitter.com/claudeai/status/2038663014098899416?ref_src=twsrc%5Etfw",
            },
            notes:
              "This is the biggest expansion of Claude Code beyond the terminal. No setup required — when it does not have a tool or connector, it navigates your screen directly.",
          },
        ],
      },
      {
        id: "apr-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, research updates, benchmark shifts, and capability changes that affect what we should test, trust, or pay attention to next.",
        items: [
            {
              title: "Closed model releases",
              description: "Z.AI now documents GLM-5.1 directly for coding-agent use, with reasoning enabled plus a 204.8k context window and 131k max tokens. Worth comparing against GLM-5 and the other agent-first releases. Also in this closed wave: GLM-5V-Turbo; MiniMax M2.7; GPT-5.4 mini and nano; GLM5 Turbo.",
              chip: "closed releases",
              releaseRoundup: true,
              href: "https://x.com/Zai_org/status/2037490078126084514",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/Zai_org/status/2037490078126084514?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/Zai_org/status/2039371126984360085?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/MiniMax_AI/status/2034315320337522881?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ArtificialAnlys/status/2037043552405119395?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ArtificialAnlys/status/2038667075489808804?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://docs.z.ai/devpack/using5.1",
                "https://docs.z.ai/guides/llm/glm-5",
                "https://x.com/Zai_org/status/2039371126984360085",
                "https://x.com/MiniMax_AI/status/2034315320337522881",
                "https://www.minimax.io/news/minimax-m27-en",
                "https://platform.minimax.io/subscribe/coding-plan",
                "https://x.com/ArtificialAnlys/status/2037043552405119395",
                "https://x.com/ArtificialAnlys/status/2038667075489808804",
                "https://artificialanalysis.ai/leaderboards/models",
              ],
              notes: "Official closed-release roundup: launch posts first, then the source catalog.",
            },
            {
              title: "Open model releases",
              description: "Chroma releases Context-1, a 20B open-source (Apache 2.0) agentic search model built on GPT-OSS-20B that retrieves and prunes documents for downstream reasoning models. Matches frontier LLM retrieval at a fraction of the cost with 400–500 tok/s on B200. Trained with RLVR on synthetic tasks across web, finance, legal, and email domains. Also in this open wave: Nemotron-Cascade 2; Holo3 computer-use models; Qwen3.5-Omni; Cohere Transcribe; Liquid AI LFM2.5-350M; Claude-distilled Qwen models trending on HF.",
              chip: "open releases",
              releaseRoundup: true,
              href: "https://x.com/trychroma/status/2037243681988894950",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/trychroma/status/2037243681988894950?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/Wenliang_Dai/status/2035020886269690339?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/hcompany_ai/status/2039021096649805937?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/Alibaba_Qwen/status/2038637124619231467?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ArtificialAnlys/status/2038678855213568031?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/i/status/2039029358224871605?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/HuggingModels/status/2038398319417082125?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/KyleHessling1/status/2038672381850653119?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/Hesamation/status/2038642306434150427?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/UnslothAI/status/2038625148354679270?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/outsource_/status/2038999111039357302?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/aiwithmayank/status/2038918640519807340?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://www.trychroma.com/research/context-1",
                "https://x.com/trychroma/status/2037243685038153823",
                "https://x.com/trychroma/status/2037243687240163693",
                "https://x.com/trychroma/status/2037243689853161868",
                "https://x.com/trychroma/status/2037243694894768143",
                "https://x.com/_weiping/status/2034877099908243746",
                "https://huggingface.co/nvidia/Nemotron-Cascade-2-30B-A3B",
                "https://huggingface.co/collections/nvidia/nemotron-cascade-2",
                "https://arxiv.org/abs/2603.19220",
                "https://x.com/hcompany_ai/status/2039021096649805937",
                "https://x.com/Alibaba_Qwen/status/2038636335272194241",
                "https://x.com/Ali_TongyiLab/status/2038609308750143762",
                "https://qwen.ai/research",
                "https://huggingface.co/collections/Qwen/qwen35",
                "https://x.com/ArtificialAnlys/status/2038678855213568031",
                "https://x.com/i/status/2039029358224871605",
                "https://x.com/HuggingModels/status/2038398319417082125",
                "https://huggingface.co/collections/Jackrong/qwen35-claude-46-opus-reasoning-distilled",
                "https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-v2-GGUF",
              ],
              notes: "Official open-release roundup: launch posts first, then the source catalog.",
            },
            {
              title: "Composer 2 / Kimi K2.5 drama",
              description: "The Composer 2 and Kimi K2.5 dispute is worth unpacking as both model drama and product positioning, with Fleetwood's image adding a useful visual artifact to the thread.",
              chip: "pair",
              href: "https://x.com/ns123abc/status/2035058399067435474",
              embed: {
                type: "tweet",
                href: "https://twitter.com/fleetwood___/status/2037117778503626937?ref_src=twsrc%5Etfw",
              },
              linkPair: [
                "https://x.com/Kimi_Moonshot/status/2035074972943831491",
                "https://x.com/fleetwood___/status/2037117778503626937",
              ],
            },
            {
              title: "Distillation hesitation",
              description: "GLM-5.1, MiniMax M2.7, Xiaomi MiMo-V2 are all out but none dropped public weights. Chinese labs that normally ship open are holding back, possibly because distillation makes open releases risky. Meanwhile people are already distilling Claude Opus into Qwen3.5 anyway.",
              chip: "pair",
              href: "https://docs.z.ai/devpack/using5.1",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/anthonyronning/status/2037586323834642859?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://docs.z.ai/guides/llm/glm-5",
                "https://www.minimax.io/news/minimax-m27-en",
                "https://platform.minimax.io/subscribe/coding-plan",
                "https://weibo.com/6486870325/5277992772176164",
                "https://github.com/XiaomiMiMo/MiMo-V2-Flash",
                "https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled",
              ],
            },
            {
              title: "ARC AGI benchmark #3",
              description: "ARC-AGI-3 is the first fully interactive benchmark, replacing grid puzzles with video-game-like scenarios where agents explore with no instructions. Humans score 100%, best AI (Gemini 3.1 Pro) hits 0.37%. A simple RL and graph-search approach scored 12.58%, outperforming every frontier LLM by 30x. $2M prize pool.",
              chip: "x",
              href: "https://x.com/arcprize/status/2036860080541589529",
              embed: {
                type: "tweet",
                href: "https://twitter.com/arcprize/status/2036860080541589529?ref_src=twsrc%5Etfw",
              },
            },
            {
              title: "Google TurboQuant",
              description: "Google Research says TurboQuant is a training-free, data-oblivious quantization approach that can compress KV caches by at least 6x, hit quality-neutral 3-bit cache settings in their tests, and improve vector-search indexing. TheTom also shipped a public implementation, which makes this more than just a paper story.",
              chip: "research",
              href: "https://research.google/blog/turboquant-a-training-free-approach-to-speed-up-and-compress-large-language-models/",
              linkPair: [
                "https://arxiv.org/abs/2504.19874",
                "https://x.com/i/status/2036696569194647869",
                "https://x.com/no_stp_on_snek/status/2036944965364834444",
                "https://ngrok.com/blog/quantization",
                "https://huggingface.co/blog/not-lain/kv-caching",
                "https://arxiv.org/html/2411.07191v2",
                "https://x.com/i/status/2039089641043755036",
                "https://github.com/TheTom/turboquant_plus",
              ],
              notes: "This is an inference-economics slide as much as a research slide: memory pressure on KV cache is the tax on long context, and the public implementation makes it easier to test outside Google's writeup.",
            },
            {
              title: "LLM neuroanatomy / RYS layer repetition",
              description: "David Noel Ng's RYS writeup treats transformer stacks like neuroanatomy: repeat the right middle layers in Qwen2-72B and you can get stronger leaderboard behavior without retraining the whole model.",
              chip: "research",
              href: "https://dnhkng.github.io/posts/rys/",
              notes: "The interesting part is not just the leaderboard stunt. It suggests model internals may be more structurally hackable than most release narratives admit.",
            },
            {
              title: "Local models getting glazed",
              description: "The local-model flex genre keeps escalating: more posts about absurdly large or absurdly fast models running on phones and laptops, which is becoming its own signal about inference progress.",
              chip: "pair",
              href: "https://x.com/theo/status/2038051651823812839",
              embed: {
                type: "tweet",
                href: "https://twitter.com/thdxr/status/2038619304447385906?ref_src=twsrc%5Etfw",
              },
              linkPair: [
                "https://x.com/anemll/status/2035901335984611412",
                "https://x.com/adrgrondin/status/2039066539022778613",
                "https://x.com/thdxr/status/2038054914358645168",
                "https://x.com/thdxr/status/2038619304447385906",
                "https://x.com/teortaxesTex/status/2038329816412283343",
              ],
            },
          ],
      },
      {
        id: "apr-security",
        title: "Security",
        purpose:
          "This section is where we look at attacks, exploits, abuse patterns, and defensive ideas so we stay sharp about how these systems can be manipulated in the real world.",
        items: [
          {
            title: "Claude Code source leaked via npm sourcemap",
            description:
              "Chaofan Shou says `@anthropic-ai/claude-code@2.1.88` shipped a `cli.js.map` in the npm tarball, exposing the bundled source. Sigrid Jin mirrored it to GitHub, and the map gives a view into Anthropic's internal fast paths and feature flags.",
            chip: "security",
            href: "https://x.com/Fried_rice/status/2038894956459290963",
            embed: {
              type: "tweet",
              href: "https://twitter.com/Fried_rice/status/2038894956459290963?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://x.com/realsigridjin/status/2038908883004227957",
              "https://x.com/StraughterG/status/2039117804155068903",
              "https://registry.npmjs.org/@anthropic-ai/claude-code/-/claude-code-2.1.88.tgz",
              "https://x.com/i/status/2039039787475353821",
              "https://arstechnica.com/ai/2026/03/entire-claude-code-cli-source-code-leaks-thanks-to-exposed-map-file",
              "https://github.com/Gitlawb/openclaude",
            ],
            notes:
              "As of March 31, 2026, npm `latest` is back on 2.1.87, so this looks like a quick rollback after the 2.1.88 publish.",
          },
          {
            title: "LiteLLM supply-chain attack",
            description:
              "Karpathy flags the LiteLLM PyPI compromise as a worst-case supply-chain failure, with credential exfiltration risk spreading through transitive dependencies like dspy.",
            chip: "x",
            href: "https://x.com/karpathy/status/2036487306585268612",
            embed: {
              type: "tweet",
              href: "https://twitter.com/karpathy/status/2036487306585268612?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://github.com/BerriAI/litellm/issues/24512",
            ],
          },
          {
            title: "Axios supply-chain attack",
            description:
              "Karpathy flags a live npm compromise of `axios`, arguing the deeper issue is how unpinned dependencies let a brief malicious release spread randomly at scale. The quoted context says `axios@1.14.1` pulled in a newly published `plain-crypto-js@4.2.1`.",
            chip: "security",
            href: "https://x.com/karpathy/status/2038849654423798197",
            embed: {
              type: "tweet",
              href: "https://twitter.com/karpathy/status/2038849654423798197?ref_src=twsrc%5Etfw",
            },
            notes:
              "His concrete point is operational, not just sensational: package managers should make safer defaults like release-age constraints normal instead of optional.",
          },
          {
            title: "Black-hat LLMs",
            description:
              "Nicholas Carlini's Black-hat LLMs talk is a good framing slide for the meetup: if LLMs are now critical infrastructure and attack surfaces, offensive methods around them will keep getting sharper.",
            chip: "video",
            href: "https://www.youtube.com/watch?v=1sd26pWhfmg",
          },
        ],
      },
      {
        id: "apr-big-tech-moves",
        title: "Big Tech Moves",
        purpose:
          "This section tracks platform decisions, acquisitions, distribution shifts, and strategic moves from major companies that could change where AI products get distribution, leverage, or control.",
        items: [
          {
            title: "OpenAI closes new funding round",
            description:
              "OpenAI says it closed a new funding round with $122 billion in committed capital at an $852B post-money valuation, giving it far more room to fund compute, product demand, and global expansion.",
            chip: "finance",
            href: "https://x.com/OpenAI/status/2039085161971896807",
            embed: {
              type: "tweet",
              href: "https://twitter.com/OpenAI/status/2039085161971896807?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Sora app shutdown",
            description:
              "Sora's standalone app is shutting down. The official account says more details are coming on timelines for the app and API plus how user work will be preserved, which makes this a notable retreat in consumer AI video distribution.",
            chip: "x",
            href: "https://x.com/soraofficialapp/status/2036532795984715896",
            embed: {
              type: "tweet",
              href: "https://twitter.com/soraofficialapp/status/2036532795984715896?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://x.com/i/status/2036577092360609999",
            ],
          },
          {
            title: "MK-Ultrathink",
            description:
              "uncleJim frames Meta's Moltbook acquisition as an agentic-commerce bet: owning an influence layer for AI agents before agents become a primary internet interface.",
            chip: "x",
            href: "https://x.com/uncleJim21/status/2037241016626159979",
            embed: {
              type: "tweet",
              href: "https://twitter.com/uncleJim21/status/2037241016626159979?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "White House pushes a national AI framework",
            description:
              "Not your typical policy memo. The White House wants Congress to preempt state AI laws, fast-track data-center permits, and set up a hands-off federal regime.",
            chip: "policy",
            href:
              "https://www.whitehouse.gov/releases/2026/03/president-donald-j-trump-unveils-national-ai-legislative-framework/",
            notes:
              "If any of this moves, the AI conversation shifts from model capabilities to federal power grabs, copyright battles, and state-vs-fed turf wars.",
            image: {
              src: "https://www.whitehouse.gov/wp-content/uploads/2025/03/WH47-Social-Share-Card.jpg",
              href:
                "https://www.whitehouse.gov/releases/2026/03/president-donald-j-trump-unveils-national-ai-legislative-framework/",
              alt: "White House social share card",
              caption: "Official White House share image",
            },
            linkPair: [
              "https://www.whitehouse.gov/wp-content/uploads/2026/03/03.20.26-National-Policy-Framework-for-Artificial-Intelligence-Legislative-Recommendations.pdf",
              "https://apnews.com/article/479eb3d0a50fe7237678a9bfb146ac7a",
              "https://www.axios.com/2026/03/20/white-house-ai-plan-trump-framework",
            ],
          },
          {
            title: "OpenAI to acquire Astral",
            description:
              "OpenAI is buying Astral — the people behind uv, Ruff, and ty. So now some of the most popular Python tooling lives inside the Codex umbrella.",
            chip: "acquisition",
            href: "https://openai.com/index/openai-to-acquire-astral/",
            notes:
              "The coding-agent fight just moved down into tools developers already have in their workflow.",
            image: {
              src: "https://astral.sh/static/OpenGraph/Astral.jpg",
              href: "https://astral.sh/blog/openai",
              alt: "Astral social card",
              caption: "Astral share image",
            },
            linkPair: [
              "https://astral.sh/blog/openai",
              "https://astral.sh",
            ],
          },
          {
            title: "Meta and Intel chip push",
            description:
              "Two different hardware angles worth grouping together: Meta and Arm are co-designing a data-center CPU for AI workloads, while Intel's Arc Pro B70 puts 32GB of VRAM into a relatively affordable workstation GPU that could matter for local inference.",
            chip: "pair",
            href:
              "https://about.fb.com/news/2026/03/meta-partners-with-arm-to-develop-new-class-of-data-center-silicon/",
            notes:
              "This stopped being about GPU shortages a while ago. The big platforms are building silicon end to end, and the workstation market is still looking for viable local-AI cards outside NVIDIA.",
            mediaPair: {
              left: {
                type: "image",
                src: "https://about.fb.com/wp-content/uploads/2026/03/arm-Partnership_Header.jpg?w=1200",
                href:
                  "https://about.fb.com/news/2026/03/meta-partners-with-arm-to-develop-new-class-of-data-center-silicon/",
                alt: "Meta and Arm logos",
                caption: "Official Meta image: Meta and Arm partnership",
              },
              right: {
                type: "tweet",
                href: "https://twitter.com/i/status/2036821577627517160?ref_src=twsrc%5Etfw",
              },
            },
            linkPair: [
              "https://newsroom.arm.com/blog/introducing-arm-agi-cpu",
              "https://x.com/i/status/2036821577627517160",
            ],
          },
          {
            title: "Tesla dodges AV regulation",
            description:
              "California says Tesla is operating under a chauffeured-service permit rather than an autonomous-vehicle service permit, which lets the company keep the robotaxi framing while avoiding the stricter AV reporting regime applied to rivals like Waymo.",
            chip: "policy",
            href: "https://electrek.co/2026/03/25/california-regulator-confirms-tesla-not-operating-autonomous-vehicle-service",
          },
        ],
      },
    ],
  },
  {
    id: "meetup-2026-03-18",
    slug: "2026-03-18",
    date: "March 18, 2026",
    markdownHref: "./topics/2026-03-18.md",
    event: {
      title: "Sovereign AI Club",
      summary: "Quick AI news rundown, demos, and open discussion.",
      startAt: "2026-03-18T17:00:00-05:00",
      endAt: "2026-03-18T19:00:00-05:00",
      timezone: "America/Chicago",
      locationName: "Bitcoin Park Austin",
      locationAddress: "Austin, TX",
      reminderSendHour: 10,
    },
    presentationIntro: {
      eyebrow: "Sovereign AI Club",
      title: "Sovereign AI Club",
      bullets: [
        "Small, high-signal, invite only.",
        "Quick AI news rundown, then open discussion.",
        "Bring projects, prototypes, links, or research.",
      ],
    },
    showcases: [
      {
        title: "Pimping your OpenClaw",
        description:
          "Topher on customizing and leveling up your OpenClaw setup.",
        chip: "showcase",
      },
    ],
    tracks: [
      {
        id: "mar-agent-infrastructure",
        title: "Agent Infrastructure",
        purpose:
          "This section covers the plumbing for agent systems: runtimes, protocols, interfaces, orchestration layers, and the tooling that makes autonomous workflows usable.",
        items: [
          {
            title: "Agent Overload",
            description:
              "OpenClaw, NemoClaw, PicoClaw, NullClaw, NanoClaw, MicroClaw, Hermes Agent, Qwen Agent, and Pi in one place.",
            chip: "watch",
            linkPair: [
              "https://github.com/openclaw/openclaw",
              "https://github.com/NVIDIA/NemoClaw",
              "https://github.com/sipeed/picoclaw",
              "https://github.com/nullclaw/nullclaw",
              "https://github.com/qwibitai/nanoclaw",
              "https://github.com/microclaw/microclaw",
              "https://github.com/NousResearch/hermes-agent",
              "https://github.com/QwenLM/Qwen-Agent",
              "https://github.com/badlogic/pi-mono",
            ],
          },
          {
            title: "CLI vs MCP",
            description:
              "Best recent data point: Scalekit ran 75 benchmark runs and found CLI agents were 10-32x cheaper with 100% reliability vs MCP's 72%, while still arguing MCP matters once agents act across customer boundaries.",
            chip: "data",
            href: "https://www.scalekit.com/blog/mcp-vs-cli-use",
            embed: {
              type: "tweet",
              href: "https://twitter.com/ravibits/status/2031807480448389375?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://www.scalekit.com/blog/mcp-vs-cli-use",
            ],
          },
          {
            title: "OpenAI WebSockets",
            description:
              "OpenAI's official server-side WebSocket path for realtime inference and event-driven model sessions.",
            chip: "docs",
            href: "https://developers.openai.com/api/docs/guides/realtime-websocket",
            linkPair: [
              "https://developers.openai.com/api/docs/guides/realtime-websocket",
              "https://developers.openai.com/api/docs/guides/realtime-conversations",
              "https://developers.openai.com/api/docs/guides/realtime-models-prompting",
              "https://developers.openai.com/api/docs/guides/realtime-server-controls",
              "https://developers.openai.com/api/docs/guides/realtime-transcription",
              "https://openai.github.io/openai-agents-js/guides/voice-agents/quickstart/",
            ],
          },
          {
            title: "Frontier lab agent frameworks",
            description:
              "The big-company version of agent infrastructure: OpenAI pushing Codex through ACP, and Anthropic packaging its own first-party Agent SDK.",
            chip: "docs",
            href: "https://agentclientprotocol.com/overview/introduction",
            linkPair: [
              "https://agentclientprotocol.com/overview/introduction",
              "https://platform.claude.com/docs/en/agent-sdk/quickstart",
            ],
          },
          {
            title: "Claude Code + Codex updates roundup",
            description:
              "The current frontier-lab coding-agent picture: Codex app and model updates on OpenAI's side, Claude Code overview and subagents on Anthropic's side.",
            chip: "docs",
            href: "https://openai.com/index/introducing-the-codex-app/",
            linkPair: [
              "https://openai.com/index/introducing-the-codex-app/",
              "https://openai.com/index/introducing-gpt-5-3-codex/",
              "https://docs.anthropic.com/en/docs/claude-code/overview",
              "https://docs.anthropic.com/en/docs/claude-code/sub-agents",
            ],
          },
          {
            title: "Claude distillation claims",
            description:
              "Anthropic says DeepSeek, Moonshot, and MiniMax were doing industrial-scale Claude distillation through fake accounts and massive prompt traffic.",
            chip: "news",
            href: "https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-accuses-deepseek-other-chinese-ai-developers-of-industrial-scale-copying-claims-distillation-included-24-000-fraudulent-accounts-and-16-million-exchanges-to-train-smaller-models",
            linkPair: [
              "https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-accuses-deepseek-other-chinese-ai-developers-of-industrial-scale-copying-claims-distillation-included-24-000-fraudulent-accounts-and-16-million-exchanges-to-train-smaller-models",
              "https://www.pcgamer.com/software/ai/anthropic-says-it-has-identified-thousands-of-fraudulent-accounts-taking-claude-and-extracting-its-capabilities-to-train-and-improve-their-own-models/",
              "https://www.business-standard.com/technology/tech-news/anthropic-accuses-deepseek-minimax-of-stealing-data-from-ai-model-claude-126022400092_1.html",
            ],
          },
          {
            title: "OpenClaw pairing bench",
            description:
              "Interesting eval and coordination benchmark for agent-style model pairing.",
            chip: "x",
            embed: {
              type: "tweet",
              href: "https://twitter.com/moritzkremb/status/2030221468244775131?ref_src=twsrc%5Etfw",
            },
          },
        ],
      },
      {
        id: "mar-models-research",
        title: "Models & Research",
        purpose:
          "This section covers model releases, research updates, benchmark shifts, and capability changes that affect what we should test, trust, or pay attention to next.",
        items: [
            {
              title: "Closed model releases",
              description: "OpenAI's new smaller proprietary model is positioned for coding, computer use, multimodal understanding, and subagents, with OpenAI claiming it is 2x faster than GPT-5 mini. Also in this closed wave: Xiaomi MiMo-V2-Pro; MiniMax M2.7.",
              chip: "closed releases",
              releaseRoundup: true,
              href: "https://openai.com/index/introducing-gpt-5-4-mini-and-nano/",
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/OpenAI/status/2033953592424731072?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/ArtificialAnlys/status/2034239267052896516?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/MiniMax_AI/status/2034315320337522881?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://www.minimax.io/news/minimax-m27-en",
              ],
              notes: "Official closed-release roundup: launch posts first, then the source catalog.",
            },
            {
              title: "Open model releases",
              description: "Fresh Qwen weights to test and compare across the 3.5 line. Also in this open wave: Nemotron v3 series; Nemotron 3 VoiceChat frontier; Mistral Small.",
              chip: "open releases",
              releaseRoundup: true,
              embeds: [
                {
                  type: "tweet",
                  href: "https://twitter.com/ArtificialAnlys/status/2033642073052868861?ref_src=twsrc%5Etfw",
                },
                {
                  type: "tweet",
                  href: "https://twitter.com/MistralDevs/status/2033654167395357082?ref_src=twsrc%5Etfw",
                },
              ],
              linkPair: [
                "https://huggingface.co/collections/Qwen/qwen35",
                "https://artificialanalysis.ai/leaderboards/models?is_open_weights=open_source",
                "https://huggingface.co/collections/nvidia/nvidia-nemotron-v3",
              ],
              notes: "Official open-release roundup: launch posts first, then the source catalog.",
            },
            {
              title: "LMfit",
              description: "Local AI utility that checks your hardware and helps estimate which models will actually run well before you download anything.",
              chip: "x",
              embed: {
                type: "tweet",
                href: "https://twitter.com/dr_cintas/status/2029272137488580761?ref_src=twsrc%5Etfw",
              },
            },
            {
              title: "Frontier check",
              description: "Where the top models actually stand right now.",
              chip: "data",
              href: "https://artificialanalysis.ai",
            },
          ],
      },
      {
        id: "mar-security",
        title: "Security",
        purpose:
          "This section is where we look at attacks, exploits, abuse patterns, and defensive ideas so we stay sharp about how these systems can be manipulated in the real world.",
        items: [
          {
            title: "KeepAI",
            description:
              "Artur from Nostrband just dropped this. Nostr-native AI tooling.",
            chip: "x",
            embed: {
              type: "tweet",
              href: "https://twitter.com/ArturBrugeman/status/2032450145527148575?ref_src=twsrc%5Etfw",
              quote:
                "Anybody want this for their OpenClaw?",
              author: "Artur Brugeman",
              date: "March 13, 2026",
            },
          },
          {
            title: "SEO Injection",
            description:
              "A more casual example of personal agents helping with security work by catching hidden SEO poisoning and other weird website junk.",
            chip: "x",
            embed: {
              type: "tweet",
              href: "https://twitter.com/isabellasg3/status/2029710987008315620?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Security nightmare thread",
            description:
              "The compact threat-model thread: exposed instances, auth bypasses, bad add-ons, and the agent as the social engineer.",
            chip: "x",
            href: "https://x.com/HedgieMarkets/status/2029337090844946791",
            embed: {
              type: "tweet",
              href: "https://twitter.com/HedgieMarkets/status/2029337090844946791?ref_src=twsrc%5Etfw",
            },
          },
        ],
      },
      {
        id: "mar-big-tech-moves",
        title: "Big Tech Moves",
        purpose:
          "This section covers major company moves, hardware releases, ecosystem bets, and market shifts that change the ground our local AI work sits on.",
        items: [
          {
            title: 'Meta\'s "Moltbook"',
            description:
              "Facebook building agents to automate social networks.",
            chip: "news",
            href: "https://techcrunch.com/2026/03/10/meta-acquired-moltbook-the-ai-agent-social-network-that-went-viral-because-of-fake-posts/",
            linkPair: [
              "https://techcrunch.com/2026/03/10/meta-acquired-moltbook-the-ai-agent-social-network-that-went-viral-because-of-fake-posts/",
              "https://apnews.com/article/31af42ccbb04001dd17a3fc7067d1de3",
            ],
          },
          {
            title: "Claude Kill?",
            description:
              "Anthropic got pushed out of the Department of War deal, OpenAI signed its own agreement, and now the defense-AI relationship is turning into a very public fight over military use and vendor power.",
            chip: "news",
            href: "https://apnews.com/article/d4608c7dd139245ac8ad94d5427c505a",
            linkPair: [
              "https://apnews.com/article/d4608c7dd139245ac8ad94d5427c505a",
              "https://openai.com/index/our-agreement-with-the-department-of-war/",
              "https://www.axios.com/2026/03/16/tech-industry-rallies-anthropic-pentagon-fight",
            ],
          },
          {
            title: "Niantic turns Pokemon Go city data into robot navigation",
            description:
              "A decade of player scans and 30B+ images are now feeding Niantic Spatial's city-scale positioning stack for Coco delivery bots.",
            chip: "news",
            href: "https://www.techrepublic.com/article/news-coco-robots-niantic-mapping/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/nianticspatial/status/2031383333221880051?ref_src=twsrc%5Etfw",
            },
            linkPair: [
              "https://www.nianticspatial.com/blog/coco-robotics",
              "https://gizmodo.com/niantic-partnership-food-delivery-bots-use-pokemon-go-data-2000732212",
            ],
          },
          {
            title: "MacBook Pro M5 Max as a local inference laptop",
            description:
              "M5 Max 128GB running Qwen3.5-35B at 74 tok/s and Nemotron-3 Super at 24 tok/s via MLX. 40-core GPU with tensor cores, 614GB/s bandwidth. A $3.5K laptop that runs 70B models comfortably.",
            chip: "x",
            href: "https://x.com/nix_eth/status/2032879242737045612",
            embed: {
              type: "tweet",
              href: "https://twitter.com/nix_eth/status/2032879242737045612?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "Confer + Meta private AI",
            description:
              "Moxie Marlinspike says Confer is bringing private AI and end-to-end encryption into Meta AI products, a notable open-weights-meets-privacy platform move.",
            chip: "x",
            href: "https://confer.to/blog/2026/03/encrypted-meta/",
            embed: {
              type: "tweet",
              href: "https://twitter.com/moxie/status/2034096735619059966?ref_src=twsrc%5Etfw",
            },
          },
          {
            title: "NemoClaw launch + OpenClaw reaction",
            description:
              "Chris Messina posted the actual Jensen-led NemoClaw launch video, and kanavtwt posted a funny reaction clip pushing the OpenClaw hype cycle.",
            chip: "pair",
            mediaPair: {
              video: {
                href: "https://youtu.be/kRmZ5zmMS2o?si=RgD8HNueWbZtK_Td",
                embedHref:
                  "https://www.youtube.com/embed/kRmZ5zmMS2o?si=RgD8HNueWbZtK_Td",
                title:
                  "NVIDIA's Jenson Hwang launches NemoClaw to the OpenClaw community",
                caption:
                  "Video: Chris Messina on NVIDIA's NemoClaw launch into the OpenClaw community",
              },
              reaction: {
                type: "tweet",
                href: "https://twitter.com/kanavtwt/status/2033835300653568159?ref_src=twsrc%5Etfw",
              },
            },
          },
        ],
      },
      {
        id: "mar-local-builds-projects",
        title: "Local Builds & Projects",
        purpose:
          "This section is for projects from friends in the Austin scene, friends-of-friends, and things in our immediate orbit. It is where we track what people around the ATX AI community are actually shipping, experimenting with, or quietly building that reflects our shared principles.",
        outro: {
          title: "What else are we building?",
          body:
            "Share anything you're working on.",
        },
        items: [
          {
            title: "pika chat",
            description:
              "Stealth AI chat product using marmot and MLS protocols for secure end-to-end encrypted chat, with early code already visible in the repo.",
            chip: "github",
            href: "https://github.com/sledtools/pika/tree/master",
          },
          {
            title: "plebdev-bench",
            description:
              "Local benchmark project for tracking model performance, with both an open repo and a live leaderboard dashboard.",
            chip: "github",
            href: "https://github.com/AustinKelsay/plebdev-bench",
            linkPair: [
              "https://github.com/AustinKelsay/plebdev-bench",
              "https://plebdev-bench-dashboard.vercel.app/#/leaderboard",
            ],
          },
          {
            title: "sage",
            description:
              "Interesting agent assistant framework built by Anthony of Maple with a novel memory and tool-calling architecture.",
            chip: "github",
            href: "https://github.com/AnthonyRonning/sage",
          },
          {
            title: "visibible",
            description:
              "Announced from the meetup: a new project from plebdev, with launch posts on X and a Primal profile to follow along.",
            chip: "launch",
            href: "https://x.com/bitcoinplebdev/status/2035102011746644051",
            linkPair: [
              "https://x.com/bitcoinplebdev/status/2035102011746644051",
              "https://x.com/bitcoinplebdev/status/2036172958964535544",
              "https://primal.net/p/nprofile1qqswamncyflsf6hqt5w0xwxm7ww5v2hnvqufhrgfeaahkvkjz65hd0cd2xzj0",
            ],
          },
          {
            title: "plebdev's adversarial AI course",
            description:
              "Free adversarial AI course covering practical attacks, red-team thinking, and the security mindset around modern models.",
            chip: "x",
            href: "https://x.com/pleb_devs/status/2028582994596778014",
          },
        ],
      },
    ],
  },
];

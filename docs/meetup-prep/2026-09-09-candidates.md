# Candidate stories for Sovereign AI Club

## Scope and editorial assessment

The previous authored meetup was August 26, 2026. This brief covers August 27 through September 9, checked on September 9, and compares candidates with the complete current board, including the edits pending at the time of research. Dates below distinguish launches, disclosures, patches and later commentary. A publication within the window does not necessarily mean the underlying event happened then.

The most substantial missing company stories are OpenAI’s proposed Cursor cutoff and Mistral’s financing round. The clearest practical additions are small on-device models, runtime improvements and concrete failures of agent permissions. Apple’s announcement today adds a consumer application to a board otherwise dominated by developer tools and frontier labs.

Before these selections, the board contained 14 Topics, including two extensive model roundups, plus the Community Slot. A manageable expansion would add a few distinct discussions and extend the model roundups. This document is a candidate brief; candidates 1–6 and 9–11 were subsequently approved and added, bringing the board to 21 Topics. Candidates 7, 8 and 12 and the related developments remain unselected.

## Candidate overview

| Candidate | New development | Suggested placement | Editorial treatment |
|---|---|---|---|
| OpenAI plans to end Cursor model supply | August 28 | Big Tech Moves | Strong standalone discussion |
| Mistral raises €3B | September 8 | Big Tech Moves | Strong standalone discussion |
| Apple brings AI insights to Health | September 9 announcement | Big Tech Moves | Consumer privacy story; distinguish announced from available |
| Desert Ant launches specialized on-device models | September 8 | Models & Research | Short discussion or model-roundup addition; reconcile catalog |
| MiniCPM5-2B and training artifacts | September 7 | Open model releases | Add to existing roundup |
| Spark-X2.5 4B and 1.7B | September 1 launch | Open model releases | Add to existing roundup |
| ExLlamaV3 improves CPU offload and cache use | August 31–September 6 | Models & Research | Extend deployment discussion or short runtime roundup |
| Cursor self-hosted execution | September 2 | Agent Infrastructure | Separate execution location from model location |
| Mini Shai-Hulud targets agent configuration | August 28 disclosure and malicious releases | Security | Strong standalone discussion; new campaign delta |
| AWS Postgres MCP read-only bypass | September 4 bulletin, updated September 8 | Security | Practical permissions example |
| DeepSeek Harness control-plane bypass | August 27 patch; September 8 CVE publication | Security | New patch/advisory delta; earlier public date noted |
| Unit 42 documents an AI-assisted intrusion | September 2 report; corrected September 3 | Security | Distinguish real intrusion from lab evaluations |

## Candidate details

### 1. OpenAI plans to end Cursor’s model supply

**Evidence.** OpenAI’s August 28 statement says it intends to wind down its model-supply contract following SpaceX’s acquisition of Cursor, proposes November 12 as the shutoff date, and says it will not provide future models through that contract. This is notice of a planned change, not evidence that existing access has already stopped. The compliance rationale is OpenAI’s stated explanation.[^1]

**Discussion.** How much of an AI development workflow is portable when the editor and model provider have different owners? Would keeping prompts, tools and history portable make a provider exit routine, or do model-specific behaviors create their own dependency?

**Why distinct.** The August 26 board discussed Codex as a platform and earlier agent tools. Tonight’s board does not yet cover this supplier dispute. This pairs naturally with NVIDIA–Hugging Face as a second example of corporate control affecting infrastructure.

**X status.** No reliable original announcement or Cursor response post was recovered in the bounded X pass. Use the official statement; do not invent an embed or repeat third-party traffic-share claims without the original.

### 2. Mistral raises €3B for its sovereign-AI strategy

**Evidence.** Mistral announced a €3B Series D at a post-money valuation above €21B, led by Samsung, with Scaleup Europe Fund and PSG Equity as co-leads. It says the funds will expand research, compute, infrastructure and international operations. Bpifrance’s September 8 release corroborates the round.[^2][^3]

**Discussion.** What constitutes sovereignty in a commercially funded AI stack: jurisdiction, ownership, model licenses, control of infrastructure, or the ability to leave a supplier? Which of those can a customer verify?

**Why distinct.** This is financing and company strategy, separate from the Mistral OCR model update already catalogued. Earlier infrastructure announcements are background, not new September launches.

**X status.** Only recaps were recovered. The company and investor announcements are stronger sources than those recaps.

### 3. Apple brings AI insights to Health

**Evidence.** Apple’s September 9 announcement describes a redesigned Health app with personalized insights and longevity features, coming later this year. Its camera-based movement assessments are described as running entirely on device without recording, storing or sharing video. That specific claim should not be generalized to all Apple Intelligence features.[^4]

**Discussion.** Does keeping inference on a phone give people sufficient control of sensitive data? What else matters: export, inspectability, third-party model choice, and the ability to decline a feature?

**Why distinct.** Adds an everyday consumer use case beyond tonight’s agent and model launches. Use the actual announcement, not pre-event iPhone rumors. This is product coverage, not validation of medical effectiveness or a health recommendation.

### 4. Desert Ant launches specialized on-device models

**Evidence.** The September 8 launch post presents a family of small audio, vision and text models with Swift, Kotlin and JavaScript SDKs. Its GitHub organization describes a free tier up to 100,000 monthly active devices per SDK and identifies some models as closed beta. Public materials differ in how many models are ready to install, so avoid the unqualified claim that all 18 ship today.[^5][^6]

**Discussion.** Which jobs need a general-purpose chat model, and which are better served by a tiny specialist that runs on every keystroke or audio frame? Is local inference with usage-based licensing the same kind of ownership as a permissive model license?

**Placement.** A short Models & Research discussion, or an addition to the open-weight catalog with explicit licensing and availability labels. It is not an Austin member Showcase unless someone is actually demonstrating it.

**X.** [Mervin Praison’s September 9 recap](https://x.com/MervinPraison/status/2097770010911400026) was text-checked. It is commentary, not the lab’s launch announcement. Speed claims need a device, workload and vendor attribution.

### 5. MiniCPM5-2B opens more of the training path

**Evidence.** OpenBMB’s repository dates the release to September 7. The Apache-2.0 model has about 2.52B total parameters despite its 2B name, a 131,072-token context, and published base, mid-training, SFT and final checkpoints. The model card links training datasets and GGUF/MLX variants.[^7][^8]

**Discussion.** For local builders, is access to intermediate checkpoints and training data more valuable than another small leaderboard gain? What would make this a credible replacement for a hosted subagent?

**Placement.** Add to **Open model releases**. Its release is missing from the current 18-family catalog. Keep benchmark leadership attributed and comparison-specific; the card does not establish superiority over every model below 4B.

### 6. Spark-X2.5 puts million-token context into small models

**Evidence.** The project’s news log dates the global launch to September 1. Published 4B and 1.7B model cards specify Apache-2.0 licensing and native context up to one million tokens using hybrid full and sliding-window attention. Repository creation predates the announcement; creation time alone is not a public-launch date.[^9][^10]

**Discussion.** When does long context actually replace retrieval for a personal archive? What are the memory cost, prompt-processing time and retrieval accuracy at the claimed maximum?

**Placement.** Add to **Open model releases**, next to MiniCPM5. Do not equate small weight files with cheap million-token inference. Do not include the announced 293B model as a downloadable release without inspecting its artifacts.

### 7. ExLlamaV3 improves the runtime for models already owned

**Evidence.** Version 1.4.5 added GLM-5.3-Flash and Qwen3.8-Flash-Next support on August 31. Version 1.4.7 improved CPU MoE performance on September 5; 1.4.8 added cache quantization for selected architectures and VRAM-allocation changes on September 6.[^11]

**Discussion.** Does the next useful local-AI upgrade come from new weights or a better runtime? Which gains help a single interactive user, and which require a different memory split or concurrency level?

**Placement.** Extend the GLM deployment discussion or add one compact runtime roundup. These are new implementation changes; a universal speedup has not been independently measured here.

### 8. Cursor lets cloud agents execute tools on internal machines

**Evidence.** Cursor’s September 2 changelog describes personal machines, team worker pools, hibernation and computer use on Linux and Mac. The announcement establishes local tool execution. It does not establish that the model itself runs locally or that no prompt content reaches a provider.[^12][^13]

**Discussion.** Which boundary matters for a team: where files sit, where commands run, where model inference happens, or who controls orchestration? How can an organization check those boundaries rather than relying on the word “self-hosted”?

**Placement.** Agent Infrastructure. Keep separate from the supplier-cutoff story because the room question is execution and data flow rather than commercial continuity.

### 9. Mini Shai-Hulud turns agent configuration into persistence

**Evidence.** Socket’s August 28 investigation documents ten malicious versions of an OpenAPI code-generation package, published with valid npm provenance. The payload targets secrets, CI workflows and developer-tool configuration, including coding-agent settings. Its package-availability observations are from the report’s snapshot, not a fresh claim about npm today.[^14]

**Discussion.** What does a signature prove when an attacker can trigger a trusted publishing workflow? Which files can silently change an agent’s future behavior, and should those files require the same review as executable code?

**Why distinct.** August 5 already covered a Shai-Hulud/keyv campaign. The new delta is this August 28 package compromise and its documented agent-configuration persistence, not the discovery of supply-chain malware in general.

### 10. AWS Postgres MCP could exceed its read-only scope

**Evidence.** AWS’s September 4 bulletin, updated September 8, identifies CVE-2026-85787 in versions before 1.1.7. Crafted SQL in content processed during an authenticated interaction could modify data beyond the intended read-only scope. AWS documents a fixed version and recommends a minimally privileged database role.[^15]

**Discussion.** Where should read-only be enforced: instructions, string validation, the tool API, or database permissions? Which guarantee survives a confused or manipulated model?

**Placement.** Security, potentially grouped with the DeepSeek issue under concrete agent permission failures. Avoid implying this is an unpatched flaw in every AWS MCP service.

### 11. DeepSeek Harness’s control plane could bypass its sandbox

**Evidence.** CVE-2026-82533 describes a local HTTP control-plane authentication bypass before 0.1.2-alpha.1. The fixed release is dated August 27. The CVE was published September 8, but its record gives August 25 as the public date: this is a patch and formal-advisory update within the window, not a wholly new September discovery.[^16][^17]

**Discussion.** Can an agent reach a control API that changes its own permissions? How do we keep the mechanism enforcing a sandbox outside the sandboxed agent’s authority?

**Boundary.** This is a harness vulnerability, not evidence of malicious DeepSeek model behavior. The advisory does not establish active exploitation. The repository’s advisory tab was empty; the CVE record and linked patch/release are the relevant sources.

### 12. Unit 42 documents a human-directed, AI-assisted intrusion

**Evidence.** Unit 42 describes a roughly ten-hour operation involving parallel agents, credential harvesting and abuse of the victim’s AI infrastructure. The actor still set objectives and made consequential decisions. The report was corrected September 3 to call the event an intrusion rather than a ransomware attack; use the corrected account.[^18]

**Discussion.** Which controls stopped progress even when the attacker used agents? What changes when automation compresses the time between finding a credential and using it?

**Why distinct.** Tonight’s OpenAI and Anthropic items concern lab systems and experiments. This is a response firm’s account of an intrusion, with a different evidence base. The report date is new; the exact underlying incident date is not established here. Do not describe it as the first fully autonomous attack.

## Related developments that could extend existing discussions

These are separate factual developments, not endorsements of the organizations’ claims or proposed policies.

- **OpenAI’s automated research-intern claim, September 6.** The company says it met its own milestone for systems performing bounded research tasks under human direction. Its measurements do not establish a general autonomous scientist or recursive self-improvement. This could extend the Coxon discussion or receive a Models & Research slot focused on measurement.[^19]
- **The collective cyber-defense letter, August 27, and Google Fairwind, September 2.** The letter calls for coordinated defense and broader access; Fairwind supplies restricted access to Gemini 3.8 Flash Cyber with CodeMender. The model is already in the closed roundup; the access-program structure is a distinct issue. A balanced discussion can examine eligibility, defensive effectiveness, openness and accountability without treating commercial incentives as proof of deceptive intent.[^20][^21][^22]
- **Stop Rogue AI Act.** Axios reported the proposal September 3; the sponsors’ September 9 release says it was introduced that day. The release describes NIST work on discovery, identity, monitoring and revocation, plus federal procurement implications. It is a proposal, not enacted law. A legal assessment of exact obligations would require the legislative text rather than only a press release.[^23]
- **Paul Christiano joins the OpenAI Foundation Board, September 9.** OpenAI says he will join the Foundation’s Safety and Security Committee and be a non-voting observer on the Group PBC Board. This can update the governance context around Coxon; the appointment itself does not establish that oversight will be effective.[^24]

## Exclusions, overlaps and unresolved leads

- **Already on tonight’s board:** NVIDIA–Hugging Face with Jensen’s tweet; Crescent Island; Meta Muse; NVIDIA PAIR; Tailcat; GLM/DwarfStar; WikiSkill; OpenAI’s wiki incident; the reward-hacking experiment; Navier–Stokes credit dispute; Coxon; and the substantial open/closed release catalogs. These are not missing candidates.
- **llama.app:** useful, but its front door and documentation were discussed before August 27. Google Gemma’s September 9 demo is a fresh social artifact, not proof that the app launched this week. Keep as optional demo context rather than a new-launch headline.[^25][^26]
- **Open Secure AI Alliance:** launch and first SAFE proposals predate the window. A later membership announcement is not enough by itself to retell the launch.
- **LingBot-World:** the recovered recap linked to a Vercel syntax-highlighting post, not the claimed checkpoint announcement. Do not use that chain to establish a new model release. A vLLM-Omni roadmap does document September 7 implementation merges, while explicitly marking other work incomplete; that is a narrower possible follow-up.[^27]
- **Desert Ant catalog:** launch and repository descriptions differ. Check the individual SDK/model intended for discussion before promising a working demo or an exact shipping count.
- **Apple M6/M5 Ultra:** the announcement predates the cutoff. Today’s Health announcement is the in-window delta.
- **Rumored acquisitions, spending figures and IPO dates:** no addition based only on aggregation or social repetition. The confirmed Mistral financing and OpenAI’s published Cursor notice do not require that speculation.

## Sources

All accessed September 9, 2026. Official statements establish what an organization announced; release artifacts establish availability; security disclosures establish the reporting party’s findings. None substitutes for an independent benchmark, security reproduction or legal interpretation.

[^1]: OpenAI. [Our decision on Cursor following its acquisition by SpaceX](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/). August 28, 2026.
[^2]: Mistral. [Making sovereign, open-weight AI the technology frontier](https://mistral.ai/news/mistral-makes-sovereign-open-weight-ai-to-frontier/). September 8, 2026.
[^3]: Bpifrance. [Mistral lève 3 Md€](https://presse.bpifrance.fr/mistral-leve-3-mdeur-pour-placer-lia-souveraine-et-ouverte-a-la-pointe-de-la-technologie/?lang=fra). September 8, 2026.
[^4]: Apple. [Apple advances health and fitness capabilities using Apple Intelligence](https://www.apple.com/newsroom/2026/09/apple-advances-health-and-fitness-capabilities-using-apple-intelligence/). September 9, 2026.
[^5]: Paul Veugen, Desert Ant Labs. [On-device intelligence for every product](https://desertant.com/blog/introducing-desert-ant-labs/). September 8, 2026.
[^6]: Desert Ant Labs. [GitHub organization and SDK catalog](https://github.com/Desert-Ant-Labs). Current catalog.
[^7]: OpenBMB. [MiniCPM repository release chronology](https://github.com/OpenBMB/MiniCPM). September 7 release entry.
[^8]: OpenBMB. [MiniCPM5-2B model card](https://huggingface.co/openbmb/MiniCPM5-2B). Model, checkpoints and datasets.
[^9]: SparkLLM. [Spark-X2.5 project on AtomGit](https://gitcode.com/SparkLLM/Spark-X2.5). September 1 launch chronology.
[^10]: XHToken. [Spark-X2.5-4B model card](https://huggingface.co/XHToken/Spark-X2.5-4B) and [1.7B model card](https://huggingface.co/XHToken/Spark-X2.5-1.7B).
[^11]: turboderp-org. [ExLlamaV3 releases](https://github.com/turboderp-org/exllamav3/releases), especially [v1.4.8](https://github.com/turboderp-org/exllamav3/releases/tag/v1.4.8). August 31–September 6, 2026.
[^12]: Cursor. [Self-hosted machines](https://cursor.com/changelog/self-hosted-machines). September 2, 2026.
[^13]: Cursor. [Data Use & Privacy Overview](https://cursor.com/data-use). Updated August 28, 2026.
[^14]: Socket Research Team. [OpenAPI React Query Codegen Compromised in Mini Shai-Hulud npm Supply Chain Attack](https://socket.dev/blog/openapi-react-query-codegen-npm-compromise). August 28, 2026.
[^15]: AWS. [CVE-2026-85787 / bulletin 2026-101-AWS](https://aws.amazon.com/security/security-bulletins/2026-101-aws/). September 4; updated September 8, 2026.
[^16]: VulnCheck, CVE Program. [CVE-2026-82533 record](https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/82xxx/CVE-2026-82533.json). Published September 8, 2026; public-date field August 25.
[^17]: DeepSeek. [Harness 0.1.2-alpha.1 release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.2-alpha.1). August 27, 2026.
[^18]: Unit 42. [An AI-Assisted Cyber Attack: Inside a Unit 42 Investigation](https://unit42.paloaltonetworks.com/ai-assisted-cyber-attack-inside-a-unit-42-investigation/). September 2 report; corrections September 3–4, 2026.
[^19]: OpenAI. [Research acceleration: The view inside OpenAI](https://openai.com/index/research-acceleration-view-inside-openai/). September 6, 2026.
[^20]: OpenAI and signatories. [A call for collective action on cyber defense](https://openai.com/collective-cyberdefense/). August 27 launch, corroborated by the next source.
[^21]: Octane. [Octane joins OpenAI’s call](https://www.octane.security/post/octane-joins-openais-call-for-collective-action-on-cyber-defense). August 27, 2026.
[^22]: Four Flynn, Google. [Proactive cyber defense for governments and enterprises](https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/). September 2, 2026.
[^23]: Office of Josh Gottheimer. [Gottheimer introduces bipartisan bill to stop rogue AI agents](https://gottheimer.house.gov/posts/release-gottheimer-introduces-bipartisan-bill-to-stop-rogue-ai-agents-and-keep-people-in-control). September 9, 2026. Earlier reporting: [Axios, September 3](https://www.axios.com/2026/09/03/house-bill-ai-agents-security).
[^24]: OpenAI. [Paul Christiano joins OpenAI Foundation Board](https://openai.com/index/paul-christiano-joins-openai-foundation-board/). September 9, 2026.
[^25]: llama.cpp. [Official llama.app homepage](https://llama.app/). Current artifact; no launch date established by the homepage.
[^26]: Google Gemma. [llama.app demo on X](https://x.com/googlegemma/status/2097731661953917185). September 9, 2026. Earlier discussion: [August 24 documentation thread](https://www.reddit.com/r/LocalLLaMA/comments/1vx4969/llamacpp_docs_now_have_a_new_home/).
[^27]: vLLM-Omni maintainers. [World Model Realtime Inference Continuous Development Roadmap, issue 7074](https://github.com/vllm-project/vllm-omni/issues/7074). Opened September 5; implementation status updated September 8, 2026.

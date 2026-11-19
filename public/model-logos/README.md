# Model and provider brand marks

This directory contains local SVG brand marks, replacing the upstream site's
fictional pixel characters and hand-drawn pixel crests.

- Collection: [Lobe Icons](https://github.com/lobehub/lobe-icons).
- Source commit: `9752d967494e48d8f83f2808feb2b0207bf70997`.
- Downloaded: 2026-11-19.
- Upstream path: `packages/static-svg/icons/`.
- Collection license: MIT. The original notice is included in
  `LICENSE-LobeHub.txt`. Exact file URLs and upstream Git blob identifiers are
  recorded in `sources.json`.
- SVG path geometry and colors are retained without redrawing. No AI-generated,
  decorative character or approximate brand icons are included.
- Model-family marks (for example, Claude, Gemini, Gemma, Qwen, Kimi, GLM,
  DeepSeek and Grok) are used where an identified mark is available. Otherwise,
  the actual provider mark is used. These are recognizable brand marks, not an
  archive guaranteeing the exact icon used on every historical release date.
- Missing marks display plain name initials. Initials are explicitly identified
  as a fallback, not presented as an official logo. This also handles newly
  discovered providers without inventing their identity.
- Logos and brand names remain the trademarks of their respective owners;
  inclusion identifies the models/providers and does not imply endorsement.
- Assets are served locally. Rendering needs no remote CDN or third-party API,
  and `asset()` / SSR-provided `basePath` support GitHub Pages and Bilibili Toy.

The source collection describes itself as a community-maintained collection of
AI/LLM brand marks; this site does not represent that it is an official brand
asset distributor.

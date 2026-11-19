/**
 * Local, versioned model/provider brand marks. These are recognizable brand
 * assets from Lobe Icons, not generated characters or inferred model features.
 * Provenance and the unmodified MIT notice live in public/model-logos/.
 * A missing entry intentionally returns null so the view can show initials.
 */
export interface ModelLogoAsset {
  file: string;
  label: string;
  kind: 'model' | 'vendor';
}

export const VENDOR_LOGOS: Readonly<Record<string, Omit<ModelLogoAsset, 'kind'>>> = {
  ai21: { file: 'ai21.svg', label: 'AI21 Labs' },
  'aion-labs': { file: 'aionlabs-color.svg', label: 'Aion Labs' },
  'aleph-alpha': { file: 'alephalpha.svg', label: 'Aleph Alpha' },
  alibaba: { file: 'alibaba-color.svg', label: 'Alibaba' },
  allenai: { file: 'ai2-color.svg', label: 'Allen Institute for AI' },
  amazon: { file: 'aws-color.svg', label: 'Amazon Web Services' },
  anthropic: { file: 'anthropic.svg', label: 'Anthropic' },
  'arcee-ai': { file: 'arcee-color.svg', label: 'Arcee AI' },
  baai: { file: 'baai.svg', label: 'BAAI' },
  baichuan: { file: 'baichuan-color.svg', label: 'Baichuan' },
  baidu: { file: 'baidu-color.svg', label: 'Baidu' },
  'black-forest-labs': { file: 'bfl.svg', label: 'Black Forest Labs' },
  'bytedance-seed': { file: 'bytedance-color.svg', label: 'ByteDance' },
  cohere: { file: 'cohere-color.svg', label: 'Cohere' },
  deepseek: { file: 'deepseek-color.svg', label: 'DeepSeek' },
  essentialai: { file: 'essentialai-color.svg', label: 'Essential AI' },
  fireworks: { file: 'fireworks-color.svg', label: 'Fireworks AI' },
  google: { file: 'google-color.svg', label: 'Google' },
  huawei: { file: 'huawei-color.svg', label: 'Huawei' },
  ibm: { file: 'ibm.svg', label: 'IBM' },
  inception: { file: 'inception.svg', label: 'Inception' },
  inclusionai: { file: 'antgroup-color.svg', label: 'Ant Group' },
  kwaipilot: { file: 'kwaipilot-color.svg', label: 'KwaiPilot' },
  liquid: { file: 'liquid.svg', label: 'Liquid AI' },
  meituan: { file: 'longcat-color.svg', label: 'LongCat' },
  meta: { file: 'meta-color.svg', label: 'Meta' },
  microsoft: { file: 'microsoft-color.svg', label: 'Microsoft' },
  minimax: { file: 'minimax-color.svg', label: 'MiniMax' },
  mistral: { file: 'mistral-color.svg', label: 'Mistral AI' },
  moonshotai: { file: 'moonshot.svg', label: 'Moonshot AI' },
  morph: { file: 'morph-color.svg', label: 'Morph' },
  nousresearch: { file: 'nousresearch.svg', label: 'Nous Research' },
  nvidia: { file: 'nvidia-color.svg', label: 'NVIDIA' },
  openai: { file: 'openai.svg', label: 'OpenAI' },
  perceptron: { file: 'perceptron.svg', label: 'Perceptron' },
  perplexity: { file: 'perplexity-color.svg', label: 'Perplexity' },
  poolside: { file: 'poolside-color.svg', label: 'Poolside' },
  reflection: { file: 'reflection-color.svg', label: 'Reflection' },
  rekaai: { file: 'reka.svg', label: 'Reka' },
  relace: { file: 'relace.svg', label: 'Relace' },
  sakana: { file: 'sakana-color.svg', label: 'Sakana AI' },
  stepfun: { file: 'stepfun-color.svg', label: 'StepFun' },
  tencent: { file: 'tencent-color.svg', label: 'Tencent' },
  typesafe: { file: 'typesafeai.svg', label: 'TypeSafe' },
  upstage: { file: 'upstage-color.svg', label: 'Upstage' },
  xai: { file: 'xai.svg', label: 'xAI' },
  xiaomi: { file: 'xiaomimimo.svg', label: 'Xiaomi MiMo' },
  zhipuai: { file: 'zhipu-color.svg', label: 'Zhipu AI' },
};

interface ModelLogoRule {
  vendorId: string;
  model: RegExp;
  file: string;
  label: string;
}

/** Scope matching to the actual vendor, not arbitrary fine-tune model names. */
const MODEL_LOGO_RULES: readonly ModelLogoRule[] = [
  { vendorId: 'google', model: /\bgemma\b/i, file: 'gemma-color.svg', label: 'Gemma' },
  { vendorId: 'google', model: /\bgemini\b/i, file: 'gemini-color.svg', label: 'Gemini' },
  { vendorId: 'google', model: /\bpalm\b/i, file: 'palm-color.svg', label: 'PaLM' },
  { vendorId: 'anthropic', model: /\bclaude\b/i, file: 'claude-color.svg', label: 'Claude' },
  { vendorId: 'alibaba', model: /qwen|qwq|qvq/i, file: 'qwen-color.svg', label: 'Qwen' },
  { vendorId: 'moonshotai', model: /\bkimi\b/i, file: 'kimi-color.svg', label: 'Kimi' },
  { vendorId: 'bytedance-seed', model: /doubao|豆包/i, file: 'doubao-color.svg', label: 'Doubao' },
  { vendorId: 'inclusionai', model: /^ling\b/i, file: 'ling-color.svg', label: 'Ling' },
  { vendorId: 'kwaipilot', model: /^kat\b/i, file: 'kwaikat.svg', label: 'KwaiKAT' },
  { vendorId: 'zhipuai', model: /cogview/i, file: 'cogview-color.svg', label: 'CogView' },
  { vendorId: 'zhipuai', model: /cogvideo/i, file: 'cogvideo-color.svg', label: 'CogVideo' },
  { vendorId: 'zhipuai', model: /chatglm/i, file: 'chatglm-color.svg', label: 'ChatGLM' },
  { vendorId: 'zhipuai', model: /\bglm\b/i, file: 'zai.svg', label: 'GLM / Z.ai' },
  { vendorId: 'xai', model: /\bgrok\b/i, file: 'grok.svg', label: 'Grok' },
  { vendorId: 'tencent', model: /hunyuan|混元|^hy\d/i, file: 'hunyuan-color.svg', label: 'Hunyuan' },
  { vendorId: 'black-forest-labs', model: /flux/i, file: 'flux.svg', label: 'FLUX' },
  { vendorId: 'baidu', model: /ernie|wenxin|文心/i, file: 'wenxin-color.svg', label: 'ERNIE / Wenxin' },
  { vendorId: 'openai', model: /\bsora\b/i, file: 'sora-color.svg', label: 'Sora' },
  { vendorId: 'openai', model: /dall[· -]?e/i, file: 'dalle-color.svg', label: 'DALL·E' },
  { vendorId: 'openai', model: /\bcodex\b/i, file: 'codex-color.svg', label: 'Codex' },
  { vendorId: 'amazon', model: /\bnova\b/i, file: 'nova-color.svg', label: 'Amazon Nova' },
  { vendorId: 'minimax', model: /hailuo|海螺/i, file: 'hailuo-color.svg', label: 'Hailuo' },
  { vendorId: 'cohere', model: /command[ -]?a\b/i, file: 'commanda-color.svg', label: 'Command A' },
  { vendorId: 'cognitivecomputations', model: /dolphin/i, file: 'dolphin.svg', label: 'Dolphin' },
];

export function resolveModelLogo(vendorId: string, modelName?: string): ModelLogoAsset | null {
  const id = vendorId.toLowerCase();
  if (modelName) {
    const match = MODEL_LOGO_RULES.find((rule) => rule.vendorId === id && rule.model.test(modelName));
    if (match) return { file: match.file, label: match.label, kind: 'model' };
  }
  const vendor = VENDOR_LOGOS[id];
  return vendor ? { ...vendor, kind: 'vendor' } : null;
}

/** Text fallback only: an initial badge is never presented as a brand logo. */
export function logoInitials(name: string): string {
  const words = name.trim().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/u).filter(Boolean);
  const initials = words.length > 1
    ? `${Array.from(words[0])[0]}${Array.from(words[1])[0]}`
    : Array.from(words[0] || 'AI').slice(0, 2).join('');
  return initials.toUpperCase();
}

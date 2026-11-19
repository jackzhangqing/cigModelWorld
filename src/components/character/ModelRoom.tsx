import Link from 'next/link';
import type { CharacterVisual, SweLeague, VisualPruning } from '@/lib/derive';
import type { ModelRecord } from '@/lib/types';
import type { AptitudeRow } from '@/lib/aptitude';
import type { Trait } from '@/lib/traits';
import { profileFor } from '@/data/vendor-registry';
import { readableOnDark } from '@/lib/color';
import { getDict, type Lang } from '@/lib/i18n';
import { ModelLogo } from './ModelLogo';
import { TraitTags } from './TraitTags';
import { AbilityBars } from './AbilityBars';
import { StatRow } from './StatRow';

/** Shared score-attribution labels retained for existing consumers. */
export const SWE_LEAGUE: Record<SweLeague, { name: string; thirdParty: boolean }> = {
  epoch: { name: 'SWE-bench Verified · Epoch AI 统一复跑', thirdParty: true },
  vendor: { name: 'SWE-bench Verified · 厂商自报，未经第三方复核', thirdParty: false },
  'pro-scale': { name: 'SWE-Bench Pro · Scale AI 官方榜', thirdParty: true },
  'pro-vendor': { name: 'SWE-Bench Pro · 厂商系统卡自评，未经第三方复核', thirdParty: false },
};

export interface ModelRoomProps {
  model: ModelRecord;
  visual: CharacterVisual;
  lang: Lang;
  traits: Trait[];
  aptitude: AptitudeRow;
  persona: string;
  highlight?: string | null;
  pruning: VisualPruning;
}

/** A data-first model card. Brand identity replaces the former room and avatar. */
export function ModelRoom({ model, visual, lang, traits, aptitude, persona, highlight = null, pruning }: ModelRoomProps) {
  const dict = getDict(lang);
  const profile = profileFor(model.vendorId);
  const accent = readableOnDark(profile.accentColor, 0.42);
  const birth = model.releaseDate?.slice(0, 7).replace('-', '.') ?? '发布日期未知';
  return (
    <Link href={`/model/${model.slug}/`} title={`${model.name} · ${persona}`} className="model-summary-card group flex min-w-0 flex-col rounded-xl border border-white/10 bg-[#151b27] p-2.5 outline-none transition-colors hover:border-white/30 hover:bg-[#1b2433] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] sm:p-3.5">
      <div className="flex items-center gap-2.5">
        <div className="shrink-0" style={{ opacity: model.retiredAt ? 0.5 : 1 }}><ModelLogo vendorId={model.vendorId} modelName={model.name} size={48} /></div>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-medium leading-snug" style={{ color: accent }}>{profile.nameZh}</p>
          <p className="mt-1 text-[12px] leading-snug text-[var(--color-ghost)]">{birth}</p>
        </div>
      </div>
      <h3 className="mt-3 line-clamp-2 break-words text-[15px] font-semibold leading-[1.4] text-[var(--color-parchment)] group-hover:text-[var(--color-gold)]">{model.name}</h3>
      {traits.length > 0 && <div className="mt-2"><TraitTags traits={traits} /></div>}
      <div className="mt-2 border-t border-white/10 pt-3"><AbilityBars row={aptitude} compact highlight={highlight} /></div>
      <p className="mt-3 line-clamp-2 text-[12px] leading-[1.5] text-[var(--color-parchment-dim)]" title={persona}>{persona}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-1 border-t border-white/10 pt-2.5">
        <StatRow model={model} accent={accent} numbers={false} prune={pruning} />
        {!visual.dataComplete && <span className="text-[12px] leading-snug text-[var(--color-ghost)]">{dict.unknown.incomplete}</span>}
      </div>
    </Link>
  );
}

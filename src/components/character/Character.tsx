import Link from 'next/link';
import type { CharacterVisual } from '@/lib/derive';
import { profileFor } from '@/data/vendor-registry';
import { readableOnDark } from '@/lib/color';
import { getDict, type Lang } from '@/lib/i18n';
import { ModelLogo } from './ModelLogo';

/** Compact model identity used on detail and vendor pages. No avatar is rendered. */
export interface CharacterProps {
  visual: CharacterVisual;
  lang: Lang;
  showLabel?: boolean;
  linked?: boolean;
  badge?: string;
  badgeTitle?: string;
}

export function Character({ visual, lang, showLabel = true, linked = true, badge, badgeTitle }: CharacterProps) {
  const dict = getDict(lang);
  const profile = profileFor(visual.vendorId);
  const title = visual.dataComplete ? visual.name : `${visual.name} · ${dict.unknown.incomplete}`;
  const content = (
    <>
      <div className="flex h-24 w-24 items-center justify-center transition-transform group-hover:-translate-y-0.5" style={{ opacity: visual.stage === 'ghost' ? 0.5 : 1 }}>
        <ModelLogo vendorId={visual.vendorId} modelName={visual.name} size={72} />
      </div>
      {showLabel && (
        <div className="mt-1 flex w-32 max-w-full flex-col items-center gap-1 text-center">
          <span className="line-clamp-2 min-h-9 w-full break-words text-[14px] font-semibold leading-snug text-[var(--color-parchment)] group-hover:text-[var(--color-gold)]">{visual.name}</span>
          <span className="text-[12px] leading-tight" style={{ color: readableOnDark(profile.accentColor) }}>{visual.rank != null ? `#${visual.rank}` : dict.unknown.notRanked}</span>
          {badge && <span title={badgeTitle} className="text-[12px] leading-snug text-[var(--color-parchment-dim)]">{badge}</span>}
          {!visual.dataComplete && <span className="text-[12px] leading-snug text-[var(--color-ghost)]">{dict.unknown.incomplete}</span>}
        </div>
      )}
    </>
  );
  const className = 'group relative flex min-w-0 flex-col items-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]';
  return linked ? <Link href={`/model/${visual.slug}/`} title={title} className={className}>{content}</Link> : <div title={title} className={className}>{content}</div>;
}

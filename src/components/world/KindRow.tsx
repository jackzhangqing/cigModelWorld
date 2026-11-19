import Link from 'next/link';
import type { KindGroup } from '@/lib/kind';
import { getDict, type Lang } from '@/lib/i18n';
import { SectionFrame } from '@/components/world/SectionFrame';
import { ModelLogo } from '@/components/character/ModelLogo';

/**
 * 首页「按类型看」：六张类型卡，一张一类，点开就是总表里这一类的全部模型。
 *
 * 为什么放首页、为什么不做成广场的筛选：广场上住的是各家的当家门面，
 * 门面一定是对话模型（roster.ts 的 couldBeFlagship 把只出图、只出声的排除了），
 * 所以「图像生成」「视频生成」「语音」三类在广场上永远是空的——
 * 给广场加一个点了没东西的筛选按钮，比不加更糟。
 * 这一排卡片是这三类模型在首页唯一的露脸机会，也是按类型钻进总表的入口。
 *
 * 卡片上放什么：类型名、这一类有多少个、三个代表模型的品牌图标。
 * 判定依据只放在悬停提示里，标题下不写任何解释。
 */

const ACCENT = 'var(--color-dawn)';

export function KindRow({
  groups,
  lang,
}: {
  groups: KindGroup[];
  lang: Lang;
}) {
  const dict = getDict(lang);
  if (groups.length === 0) return null;

  return (
    <section aria-labelledby="section-kinds" className="relative">
      <header className="mb-3 px-1">
        <h2
          id="section-kinds"
          className="scroll-mt-4 font-pixel text-[18px] leading-none tracking-wide"
          style={{ color: ACCENT }}
        >
          {dict.kind.sectionTitle}
        </h2>
      </header>

      {/* 外框与「今日格局」「国外」「国内」同构，见 SectionFrame */}
      <SectionFrame
        accent={ACCENT}
        tint="linear-gradient(180deg, rgb(233 166 99 / 0.07), transparent 240px)"
        scanDelay="-3s"
      >
        {/* 窄屏横向滑动；平板一行三张；1280 以上一行六张 */}
        <div className="-mx-2 flex snap-x gap-3 overflow-x-auto px-2 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 xl:grid-cols-6 xl:gap-2">
          {groups.map((g) => {
            const label = dict.kind.label[g.kind];
            const names = g.representatives.map((m) => m.name).join(' · ');
            return (
              <Link
                key={g.kind}
                href={`/leaderboard/all/?kind=${g.kind}`}
                className="group relative w-[200px] shrink-0 snap-start outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] sm:w-auto"
                title={`${dict.kind.hint[g.kind]}。${dict.kind.viewAll(g.count, label)}`}
              >
                <div
                  className="flex h-full flex-col items-center rounded-xl border border-white/10 bg-[#151b27] px-2 pb-3 pt-3 transition-transform duration-150 group-hover:-translate-y-1"
                  style={{ ['--bob-delay' as string]: `${(g.kind.length % 5) * 0.31}s` }}
                >
                  {/* 类型牌：与冠军卡的头衔牌同款，但用本区的识别色而不是金色，免得和「今日格局」抢眼 */}
                  <div
                    className="mb-1 border border-black/50 px-2 py-px text-[13px] font-semibold leading-tight text-[var(--color-ink)]"
                    style={{ background: ACCENT }}
                  >
                    {label}
                  </div>

                  {/* 三个代表模型的品牌图标，悬停看名字 */}
                  <div className="relative flex h-[52px] w-full items-end justify-center gap-1">
                    <div
                      className="absolute bottom-0 h-1.5 w-[80%]"
                      style={{ background: ACCENT, opacity: 0.4 }}
                      aria-hidden
                    />
                    {g.representatives.map((m) => {
                      return (
                        <ModelLogo key={m.id} vendorId={m.vendorId} modelName={m.name} size={40} />
                      );
                    })}
                  </div>

                  {/* 大数字：这一类有多少个在役模型 */}
                  <div className="mt-2 flex items-baseline gap-1 font-pixel leading-none text-[var(--color-parchment)] group-hover:text-[var(--color-gold)]">
                    <span className="text-[22px]">{g.count}</span>
                    <span className="text-[13px] text-[var(--color-ghost)]">{dict.kind.countUnit}</span>
                  </div>

                  {/* 代表模型的名字，最多两行，不截断单个名字之外的东西 */}
                  <div className="mt-1.5 line-clamp-2 w-full text-center text-[12px] leading-[1.4] text-[var(--color-ghost)]">
                    {names}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </SectionFrame>
    </section>
  );
}

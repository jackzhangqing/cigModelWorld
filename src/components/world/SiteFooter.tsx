import Link from 'next/link';
import { DEFAULT_LANG, getDict } from '@/lib/i18n';
import { outbound } from '@/lib/outbound';
import { SITE } from '@/data/site-config';

const DATA_SOURCES = [
  { name: 'Epoch AI', license: 'CC-BY 4.0', href: 'https://epoch.ai/data/ai-benchmarking-dashboard' },
  { name: 'models.dev', license: 'MIT', href: 'https://models.dev' },
  { name: 'LiveBench', license: 'Apache-2.0', href: 'https://livebench.ai' },
  { name: 'LMArena', license: 'CC-BY 4.0', href: 'https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset' },
];
function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (!outbound(href)) return <span>{children}</span>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-[var(--color-gold)]">{children}</a>;
}
export function SiteFooter() {
  const dict = getDict(DEFAULT_LANG);
  return (
    <footer className="relative mt-12 border-t border-white/10 bg-black/30">
      <div className="page-shell py-6 text-sm leading-7 text-[var(--color-parchment-dim)]">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div><span className="font-semibold text-[var(--color-parchment)]">{SITE.name}</span><span className="mx-3 opacity-40">/</span>{dict.footer.author}：<ExtLink href={SITE.ownerUrl}>{SITE.owner}</ExtLink></div>
          <div className="flex gap-4"><ExtLink href={SITE.repository}>GitHub</ExtLink><Link href="/credits/" className="hover:text-[var(--color-gold)]">{dict.footer.credits}</Link></div>
        </div>
        <div className="flex flex-wrap gap-x-2"><span>{dict.footer.dataFrom}：</span>{DATA_SOURCES.map((s) => <span key={s.name}><ExtLink href={s.href}>{s.name}</ExtLink><span className="ml-1 text-xs opacity-70">({s.license})</span></span>)}</div>
        <div>图标：<ExtLink href="https://github.com/lobehub/lobe-icons">Lobe Icons</ExtLink>；品牌标识归各自权利人。字体：<ExtLink href="https://github.com/TakWolf/fusion-pixel-font">Fusion Pixel Font</ExtLink> (OFL-1.1)。</div>
        <div>基于 <ExtLink href={SITE.upstream}>liyupi/ai-model-world</ExtLink> (MIT) 修改，保留原项目和数据来源署名。</div>
      </div>
    </footer>
  );
}

import { logoInitials, resolveModelLogo } from '@/data/model-logos';
import { asset } from '@/lib/asset';

export interface ModelLogoProps {
  vendorId: string;
  modelName?: string;
  /** Overall badge size in CSS pixels, including the white readability tile. */
  size?: number;
  className?: string;
  /** Pass an SSR-computed directory URL for versioned Bilibili Toy paths. */
  basePath?: string;
  title?: string;
}

/** Pure JSX: usable from server views and inside a client-side comparison view. */
export function ModelLogo({
  vendorId,
  modelName,
  size = 64,
  className = '',
  basePath,
  title,
}: ModelLogoProps) {
  const logo = resolveModelLogo(vendorId, modelName);
  const label = logo
    ? title ?? `${modelName ? `${modelName} · ` : ''}${logo.label}${logo.kind === 'model' ? '模型品牌图标' : '厂商图标'}`
    : `${title || modelName || vendorId}（暂无品牌图标，显示名称缩写）`;
  const edge = Math.max(12, size);
  const directory = basePath ?? asset('/model-logos/');
  const prefix = directory.endsWith('/') ? directory : `${directory}/`;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center align-middle ${className}`}
      style={{
        width: edge,
        height: edge,
        boxSizing: 'border-box',
        padding: Math.max(2, Math.round(edge * 0.16)),
        borderRadius: Math.min(18, Math.round(edge * 0.23)),
        border: '1px solid rgb(15 23 42 / 0.08)',
        background: '#fff',
        color: '#15233b',
        overflow: 'hidden',
      }}
      role="img"
      aria-label={label}
      title={label}
      data-logo-kind={logo?.kind ?? 'initials'}
    >
      {logo ? (
        // Local SVGs are already optimized and must work in static/offline Toy packages.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${prefix}${logo.file}`}
          alt=""
          width={edge}
          height={edge}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <span
          aria-hidden="true"
          style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 700, fontSize: Math.max(8, edge * 0.3), lineHeight: 1 }}
        >
          {logoInitials(modelName || vendorId)}
        </span>
      )}
    </span>
  );
}

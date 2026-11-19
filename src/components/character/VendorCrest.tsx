import { VENDOR_REGISTRY } from '@/data/vendor-registry';
import { VENDOR_LOGOS } from '@/data/model-logos';
import { ModelLogo } from './ModelLogo';

interface VendorCrestProps {
  /** Retained for older call sites; no pixel crest is rendered. */
  motif?: string;
  accentColor?: string;
  vendorId?: string;
  modelName?: string;
  size?: number;
  className?: string;
  title?: string;
  basePath?: string;
}

const normalize = (value: string) => value.normalize('NFKC').toLowerCase().replace(/[\s_\-().]/g, '');
const names = new Map<string, string>();
for (const [id, profile] of Object.entries(VENDOR_REGISTRY)) {
  names.set(normalize(id), id);
  names.set(normalize(profile.nameZh), id);
}
for (const [id, logo] of Object.entries(VENDOR_LOGOS)) {
  names.set(normalize(id), id);
  names.set(normalize(logo.label), id);
}

// Only unique old motifs can recover an identity. The shared "wanderer"
// fallback cannot identify a vendor and must never borrow another brand mark.
const motifGroups = new Map<string, string[]>();
for (const [id, profile] of Object.entries(VENDOR_REGISTRY)) {
  motifGroups.set(profile.motif, [...(motifGroups.get(profile.motif) ?? []), id]);
}
const uniqueMotifs = new Map(
  [...motifGroups].filter(([motif, ids]) => motif !== 'wanderer' && ids.length === 1)
    .map(([motif, ids]) => [motif, ids[0]] as const),
);

/** Compatibility wrapper for tables, filters, search and timeline markers. */
export function VendorCrest({
  motif,
  vendorId,
  modelName,
  size = 24,
  className = '',
  title,
  basePath,
}: VendorCrestProps) {
  const id = vendorId
    ?? (title ? names.get(normalize(title)) : undefined)
    ?? (motif ? uniqueMotifs.get(motif) : undefined)
    ?? title
    ?? 'AI';
  return (
    <ModelLogo vendorId={id} modelName={modelName} size={size} className={className} title={title} basePath={basePath} />
  );
}

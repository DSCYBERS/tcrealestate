import { properties as defaultProperties, type Property } from './properties';
import { getLeads as getStoredLeads } from './leads';

const KEY = 'tc_properties_v1';

function readRaw(): Property[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [...defaultProperties];
    return JSON.parse(raw) as Property[];
  } catch {
    return [...defaultProperties];
  }
}

function write(props: Property[]) {
  localStorage.setItem(KEY, JSON.stringify(props));
}

export async function getProperties(): Promise<Property[]> {
  if (typeof window === 'undefined') return Promise.resolve([]);
  return Promise.resolve(readRaw());
}

export async function upsertProperty(p: Partial<Property> & { id?: string }): Promise<Property> {
  if (typeof window === 'undefined') throw new Error('Browser only');
  const list = readRaw();
  if (p.id) {
    const idx = list.findIndex((x) => x.id === p.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...p } as Property;
    } else {
      const next: Property = { ...(p as Property) };
      list.unshift(next);
    }
  } else {
    const id = `prop-${Date.now()}`;
    const next: Property = {
      id,
      name: (p.name as string) || 'Untitled Property',
      type: (p.type as Property['type']) || 'Residential',
      location: (p.location as string) || 'Unknown',
      size: (p.size as string) || '0 Sq. Yd.',
      pricePerSqYd: (p.pricePerSqYd as string) || '-',
      totalPrice: (p.totalPrice as string) || '-',
      image: (p.image as string) || '',
      highlights: p.highlights || [],
      description: (p.description as string) || '',
    };
    list.unshift(next);
  }
  write(list);
  return Promise.resolve(readRaw()[0]);
}

export async function deleteProperty(id: string): Promise<void> {
  if (typeof window === 'undefined') return;
  const list = readRaw().filter((p) => p.id !== id);
  write(list);
  return Promise.resolve();
}

export async function markFeatured(id: string, featured = true): Promise<void> {
  if (typeof window === 'undefined') return;
  const list = readRaw();
  const idx = list.findIndex((p) => p.id === id);
  if (idx !== -1) {
    // store featured flag on property as a custom field
    // @ts-ignore
    list[idx].featured = featured;
    write(list);
  }
}

export async function getLeads(): Promise<Awaited<ReturnType<typeof getStoredLeads>>> {
  if (typeof window === 'undefined') return Promise.resolve([] as any);
  return Promise.resolve(getStoredLeads());
}

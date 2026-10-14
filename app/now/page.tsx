import { getNowPage } from '@/lib/content';
import EmTitle from '@/components/EmTitle';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return { title: 'Now — Dhanya Jayagopal', description: getNowPage().description };
}

function parseNow(body: string): { label: string; items: string[] }[] {
  const blocks: { label: string; items: string[] }[] = [];
  let current: { label: string; items: string[] } | null = null;

  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      if (current) blocks.push(current);
      current = { label: trimmed.slice(3), items: [] };
    } else if (trimmed.startsWith('- ') && current) {
      current.items.push(trimmed.slice(2));
    }
  }
  if (current) blocks.push(current);
  return blocks;
}

export default function NowPage() {
  const data   = getNowPage();
  const blocks = parseNow(data.body);

  return (
    <main className="page">
      <header className="pagehead">
        <span className="eyebrow">Now · last updated {data.updated}</span>
        <h1 className="pagetitle"><EmTitle title={data.title} em={data.titleEm} /></h1>
        <p className="pagelede">{data.lede}</p>
      </header>

      <ul className="now-list">
        {blocks.map((block) => (
          <li key={block.label} className="now-block">
            <span className="now-label">{block.label}</span>
            <span className="now-items">
              {block.items.map((item, i) => (
                <span key={i}>
                  {item}
                  {i < block.items.length - 1 && <span className="now-sep">·</span>}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}

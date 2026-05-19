'use client';

import Link from 'next/link';
import type { WorkItem } from '@/lib/content';

interface Meta { eyebrow: string; title: string; titleEm: string; lede: string; }

export default function WorkClient({ work, meta }: { work: WorkItem[]; meta: Meta }) {
  const byYear = work.reduce<Record<string, WorkItem[]>>((acc, item) => {
    (acc[item.year] = acc[item.year] || []).push(item);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="page">
      <header className="pagehead">
        <span className="eyebrow">{meta.eyebrow}</span>
        <h1 className="pagetitle">
          {meta.titleEm
            ? <>{meta.title.replace(meta.titleEm, '')} <em>{meta.titleEm}</em></>
            : meta.title}
        </h1>
        <p className="pagelede">{meta.lede}</p>
      </header>

      {years.map((year) => (
        <section key={year} className="year-block">
          <div className="year-label">{year}</div>
          <ul className="rows">
            {byYear[year].map((item) => (
              <li key={item.slug}>
                <Link href={`/work/${item.slug}`} className="row">
                  <div className="row-title">
                    {item.titleEm ? <em>{item.title}</em> : item.title}
                    <span style={{ fontSize: 14, opacity: 0.4 }}>↗</span>
                  </div>
                  <div className="row-role">{item.role}</div>
                  <div className="row-desc">{item.desc}</div>
                  <div className="row-tag">
                    {item.tag === 'Current' && (
                      <span className="chip chip-solid chip-live">Current</span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

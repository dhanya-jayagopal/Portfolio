import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllWork, getWork, getNextWork } from '@/lib/content';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllWork().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return {
    title: `${item.title} — Dhanya Jayagopal`,
    description: item.desc,
  };
}

export default async function CaseStudy(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  const next = getNextWork(slug);
  const paragraphs = item.body.trim().split('\n\n');

  return (
    <main className="page page-wide">
      <div className="back">
        <Link href="/work">← All work</Link>
      </div>

      <div className="case-hero">
        <div className="case-meta">
          <span className="eyebrow">{item.company}</span>
          <span className="meta-dot">·</span>
          <span className="meta">{item.meta.find(m => m.label === 'Timeline')?.value}</span>
        </div>
        <h1 className="case-title">
          {item.titleEm ? <em>{item.title}</em> : item.title}
        </h1>
        <p className="case-lede">{item.lede}</p>
      </div>

      {/* Stats bleed */}
      <div className="case-bleed">
        <div className="case-bleed-inner">
          {item.stats.map((stat) => (
            <div key={stat.label}>
              <div className="case-stat-num">{stat.num}</div>
              <div className="case-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="case-body">
        <aside className="case-side">
          <dl>
            {item.meta.map((m) => (
              <React.Fragment key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </React.Fragment>
            ))}
          </dl>
          <Link href="/about" className="side-cta">
            Work with me ↗
          </Link>
        </aside>

        <article className="case-prose">
          {paragraphs.map((para, i) => {
            if (para.startsWith('## ')) {
              return <h2 key={i} className="case-h2">{para.slice(3)}</h2>;
            }
            if (para.startsWith('> ')) {
              return (
                <div key={i} className="case-quote">
                  <p><em>{para.slice(2)}</em></p>
                </div>
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </article>
      </div>

      {/* Up next */}
      {next && (
        <div className="upnext">
          <span className="eyebrow">Next</span>
          <Link href={`/work/${next.slug}`} className="upnext-card">
            <div className="upnext-meta">{next.role} · {next.company}</div>
            <h3>{next.titleEm ? <em>{next.title}</em> : next.title} →</h3>
          </Link>
        </div>
      )}
    </main>
  );
}

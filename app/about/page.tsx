import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Dhanya Jayagopal',
  description: 'Founding PM at Bomisco. Previously Docusign and LeanIX/SAP. MBA from Indiana University. Engineer turned PM.',
};

interface Section {
  label: string;
  rows: { left: string; right: string }[];
}

interface Link_ {
  label: string;
  url: string;
}

function parseAbout(body: string) {
  const bioParagraphs: string[] = [];
  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('## ')) {
      if (currentSection) sections.push(currentSection);
      currentSection = { label: trimmed.slice(3), rows: [] };
    } else if (trimmed.includes(' | ') && currentSection) {
      const [left, right] = trimmed.split(' | ');
      currentSection.rows.push({ left: left.trim(), right: right.trim() });
    } else if (!currentSection) {
      bioParagraphs.push(trimmed);
    }
  }
  if (currentSection) sections.push(currentSection);

  const timelineSection      = sections.find((s) => s.label === 'Timeline');
  const certsSection         = sections.find((s) => s.label === 'Certifications');
  const elsewhereSection     = sections.find((s) => s.label === 'Elsewhere');

  const timeline: { years: string; what: string }[] =
    timelineSection?.rows.map((r) => ({ years: r.left, what: r.right })) ?? [];

  const certifications: { years: string; what: string }[] =
    certsSection?.rows.map((r) => ({ years: r.left, what: r.right })) ?? [];

  const links: Link_[] =
    elsewhereSection?.rows.map((r) => ({ label: r.left, url: r.right })) ?? [];

  return { bioParagraphs, timeline, certifications, links };
}

export default function AboutPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content/about.md'), 'utf8');
  const { data, content } = matter(raw);
  const { bioParagraphs, timeline, certifications, links } = parseAbout(content);

  return (
    <main className="page">
      <header className="pagehead">
        <span className="eyebrow">About</span>
        <h1 className="pagetitle">
          {data.title.replace(/\.$/, '').split(', ').map((part: string, i: number) =>
            i === 1 ? <span key={i}>, <em>{part}.</em></span> : <span key={i}>{part}</span>
          )}
        </h1>
      </header>

      <section className="about-top">
        <div className="about-portrait" style={{ padding: 0, overflow: 'hidden' }}>
          <Image
            src="/dp.jpeg"
            alt="Dhanya Jayagopal"
            width={280}
            height={373}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            priority
          />
        </div>
        <div className="about-bio">
          <p className="lede">{data.lede}</p>
          {bioParagraphs.map((para, i) => <p key={i}>{para}</p>)}
          <div className="about-cta">
            <a href="mailto:djayagop@gmail.com" className="btn btn-primary">Say hello</a>
            <Link href="/writing" className="btn btn-link">Read the writing &nbsp;&rarr;</Link>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="section">
        <span className="eyebrow" style={{ display: 'block', marginBottom: 'var(--s-5)' }}>Timeline</span>
        <ul className="timeline">
          {timeline.map((row, i) => (
            <li key={i}>
              <span className="tl-years">{row.years}</span>
              <span className="tl-what">{row.what}</span>
            </li>
          ))}
        </ul>
      </section>

      {certifications.length > 0 && (
        <>
          <hr className="rule" />
          <section className="section">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 'var(--s-5)' }}>Certifications</span>
            <ul className="timeline">
              {certifications.map((row, i) => (
                <li key={i}>
                  <span className="tl-years">{row.years}</span>
                  <span className="tl-what">{row.what}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {links.length > 0 && (
        <>
          <hr className="rule" />
          <section className="section">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 'var(--s-5)' }}>Elsewhere</span>
            <ul className="elsewhere">
              {links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target={link.url.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}

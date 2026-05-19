import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing — Dhanya Jayagopal',
  description: 'Essays and notes on product management, platform thinking, and building things.',
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <main className="page">
      <header className="pagehead">
        <span className="eyebrow">Writing</span>
        <h1 className="pagetitle">
          Essays on product, platforms, <em>and the work.</em>
        </h1>
        <p className="pagelede">
          I write about what I&apos;m learning — platform product management, AI-first
          product thinking, and the realities of enterprise SaaS.
        </p>
      </header>

      {posts.length === 0 ? (
        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--s-7)' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink-3)', margin: 0 }}>
            Coming soon.
          </p>
        </div>
      ) : (
        <ul className="postindex">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className="postindex-row">
                <div className="postindex-date">{post.date}</div>
                <div className="postindex-main">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="postindex-meta">
                    <span className="chip">{post.tag}</span>
                    <span className="meta">{post.minutes} min read</span>
                  </div>
                </div>
                <div className="postindex-arrow">→</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

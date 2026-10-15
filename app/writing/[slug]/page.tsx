import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPost, getNextPost } from '@/lib/content';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// **bold** runs inside a paragraph or list item.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

// "The problem" → "the-problem", so a heading can be linked from the contents list.
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ![Caption](/path.png) on its own paragraph.
const IMAGE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;
// A paragraph that is only [toc] is replaced by links to every ## heading after the TL;DR.
const TOC_MARKER = '[toc]';
const TLDR_HEADING = '## TL;DR';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Dhanya Jayagopal`,
    description: post.excerpt,
  };
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const next = getNextPost(slug);
  const paragraphs = post.body.trim().split('\n\n');
  const headings = paragraphs
    .filter((p) => p.startsWith('## ') && p !== TLDR_HEADING)
    .map((p) => p.slice(3));
  // The drop cap goes on the first plain paragraph, so a TL;DR or contents list can come before it.
  const firstProse = paragraphs.findIndex(
    (p) => !/^(## |> |- |!\[)/.test(p) && p !== TOC_MARKER
  );

  return (
    <main className="page page-narrow">
      <div className="back">
        <Link href="/writing">← All writing</Link>
      </div>

      <header className="post-head">
        <div className="post-meta">
          <span className="meta">{post.date}</span>
          <span className="meta-dot">•</span>
          <span className="meta">{post.minutes} min read</span>
          <span className="meta-dot">•</span>
          <span className="chip">{post.tag}</span>
        </div>
        <h1 className="post-post-title">{post.title}</h1>
        <p className="lede post-lede">{post.excerpt}</p>
      </header>

      <article className="post-body">
        {paragraphs.map((para, i) => {
          if (para === TLDR_HEADING) {
            return <h2 key={i} className="tldr-head">TL;DR</h2>;
          }
          if (para.startsWith('## ')) {
            const text = para.slice(3);
            return <h2 key={i} id={slugify(text)}>{text}</h2>;
          }
          if (para === TOC_MARKER) {
            return (
              <nav key={i} className="toc" aria-label="Contents">
                <span className="eyebrow">Contents</span>
                <ol>
                  {headings.map((h) => (
                    <li key={h}><a href={`#${slugify(h)}`}>{h}</a></li>
                  ))}
                </ol>
              </nav>
            );
          }
          const image = para.match(IMAGE);
          if (image) {
            const [, caption, src] = image;
            return (
              <figure key={i} className="post-figure">
                <a href={src} target="_blank" rel="noopener">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={caption} loading="lazy" />
                </a>
                {caption && <figcaption>{caption}</figcaption>}
              </figure>
            );
          }
          if (para.startsWith('> ')) {
            return (
              <blockquote key={i}>
                <p>{para.slice(2)}</p>
              </blockquote>
            );
          }
          if (para.startsWith('- ')) {
            return (
              <ul key={i}>
                {para.split('\n').map((line, j) => (
                  <li key={j}>{inline(line.replace(/^- /, ''))}</li>
                ))}
              </ul>
            );
          }
          if (i === firstProse) {
            const firstChar = para[0];
            const rest = para.slice(1);
            return (
              <p key={i}>
                <span className="dropcap">{firstChar}</span>
                {rest}
              </p>
            );
          }
          return <p key={i}>{inline(para)}</p>;
        })}

        <hr className="rule" />

        <p className="post-sig">
          <span className="meta">Dhanya Jayagopal · {post.date}</span>
        </p>
      </article>

      {next && (
        <section className="upnext">
          <span className="eyebrow">Next</span>
          <Link href={`/writing/${next.slug}`} className="upnext-card">
            <div className="upnext-meta">{next.date} · {next.tag}</div>
            <h3>{next.title} →</h3>
          </Link>
        </section>
      )}
    </main>
  );
}

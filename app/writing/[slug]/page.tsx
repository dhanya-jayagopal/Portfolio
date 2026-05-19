import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPost, getNextPost } from '@/lib/content';
import type { Metadata } from 'next';

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
          if (para.startsWith('## ')) {
            return <h2 key={i}>{para.slice(3)}</h2>;
          }
          if (para.startsWith('> ')) {
            return (
              <blockquote key={i}>
                <p>{para.slice(2)}</p>
              </blockquote>
            );
          }
          if (i === 0) {
            const firstChar = para[0];
            const rest = para.slice(1);
            return (
              <p key={i}>
                <span className="dropcap">{firstChar}</span>
                {rest}
              </p>
            );
          }
          return <p key={i}>{para}</p>;
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

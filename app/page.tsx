import Link from 'next/link';
import { getAllWork, getAllPosts } from '@/lib/content';

export default function Home() {
  const FEATURED = getAllWork().filter((w) => w.featured).slice(0, 4);
  const RECENT   = getAllPosts().slice(0, 3);
  return (
    <main className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-meta">
          <span className="eyebrow">Seattle · Founding PM, Bomisco</span>
        </div>
        <h1 className="hero-headline">
          I build platforms for a living,<br />
          and occasionally write <em>about it.</em>
        </h1>
        <p className="hero-sub">
          Currently at <Link href="/work/bomisco">Bomisco</Link>, building a channel data SaaS from scratch.
          Previously <Link href="/work/docusign">Docusign</Link> and <Link href="/work/leanix">LeanIX</Link>.
          This page is the only thing I update.
        </p>
        <div className="hero-cta">
          <Link href="/work" className="btn btn-primary">Selected work</Link>
          <Link href="/writing" className="btn btn-link">Read the writing &nbsp;&rarr;</Link>
        </div>
      </section>

      <hr className="rule" />

      {/* WORK */}
      <section className="section">
        <header className="section-head">
          <span className="eyebrow">Selected work</span>
          <Link href="/work" className="section-more">
            See all ↗
          </Link>
        </header>
        <ul className="tiles">
          {FEATURED.map((item) => (
            <li key={item.slug}>
              <Link href={`/work/${item.slug}`} className="tile">
                <div className="tile-img">
                  <span className="tile-img-label">{item.company}</span>
                </div>
                <div className="tile-body">
                  <div className="tile-meta">{item.role} · {item.tag}</div>
                  <h3 className="tile-title">
                    {item.titleEm ? <em>{item.title}</em> : item.title}
                  </h3>
                  <p className="tile-desc">{item.desc}</p>
                </div>
                <span className="tile-year">{item.year}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <hr className="rule" />

      {/* SPLIT: Now + Recent writing */}
      <section className="split">
        <div className="split-col">
          <span className="eyebrow">Now</span>
          <p className="lede" style={{ marginTop: 'var(--s-5)', marginBottom: 'var(--s-5)' }}>
            Building Bomisco, reading everything I can find on AI in enterprise data, and trying to write more consistently.
          </p>
          <Link href="/now" className="pseudo-link">
            More on the now page →
          </Link>
        </div>
        <div className="split-col">
          <span className="eyebrow">Recent writing</span>
          <ul className="postlist">
            {RECENT.map((post) => (
              <li key={post.slug}>
                <Link href={`/writing/${post.slug}`} className="postlist-link">
                  <span className="post-date">{post.date}</span>
                  <span className="post-title">{post.title}</span>
                  <span className="post-time">{post.minutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

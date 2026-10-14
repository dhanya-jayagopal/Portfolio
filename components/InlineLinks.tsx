import Link from 'next/link';

// Renders [label](/path) runs in a frontmatter string as links.
export default function InlineLinks({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? <Link key={i} href={m[2]}>{m[1]}</Link> : part;
      })}
    </>
  );
}

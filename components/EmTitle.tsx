// Renders a page title with its trailing `titleEm` phrase in italics.
export default function EmTitle({ title, em }: { title: string; em?: string }) {
  if (!em || !title.endsWith(em)) return <>{title}</>;
  return <>{title.slice(0, -em.length)}<em>{em}</em></>;
}

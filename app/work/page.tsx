import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllWork } from '@/lib/content';
import WorkClient from './WorkClient';

export default function WorkPage() {
  const work = getAllWork();
  const raw = fs.readFileSync(path.join(process.cwd(), 'content/work/_index.md'), 'utf8');
  const { data } = matter(raw);
  const meta = data as { eyebrow: string; title: string; titleEm: string; lede: string };
  return <WorkClient work={work} meta={meta} />;
}

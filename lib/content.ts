import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface WorkItem {
  slug: string;
  company: string;
  year: string;
  role: string;
  tag: 'Current' | 'Shipped' | 'Acquired' | 'Consulting';
  title: string;
  titleEm?: boolean;
  desc: string;
  featured: boolean;
  lede: string;
  stats: { num: string; label: string }[];
  meta: { label: string; value: string }[];
  body: string;
  next?: string;
}

export interface Post {
  slug: string;
  date: string;
  minutes: number;
  title: string;
  tag: string;
  excerpt: string;
  body: string;
  next?: string;
}

const WORK_DIR    = path.join(process.cwd(), 'content/work');
const WRITING_DIR = path.join(process.cwd(), 'content/writing');
const HOME_FILE   = path.join(process.cwd(), 'content/home.md');

export interface HomePage {
  eyebrow: string;
  headline: string;
  headline_em: string;
  sub: string;
  now_blurb: string;
}

export function getHomePage(): HomePage {
  const raw = fs.readFileSync(HOME_FILE, 'utf8');
  const { data } = matter(raw);
  return data as HomePage;
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
}

export function getAllWork(): WorkItem[] {
  return readDir(WORK_DIR)
    .map((file) => {
      const raw = fs.readFileSync(path.join(WORK_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return { ...data, body: content.trim() } as WorkItem;
    })
    .sort((a, b) => Number(b.year) - Number(a.year));
}

export function getAllPosts(): Post[] {
  return readDir(WRITING_DIR)
    .map((file) => {
      const raw = fs.readFileSync(path.join(WRITING_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return { ...data, body: content.trim() } as Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getWork(slug: string): WorkItem | undefined {
  return getAllWork().find((w) => w.slug === slug);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getNextWork(slug: string): WorkItem | undefined {
  const item = getWork(slug);
  if (!item?.next) return undefined;
  return getWork(item.next);
}

export function getNextPost(slug: string): Post | undefined {
  const item = getPost(slug);
  if (!item?.next) return undefined;
  return getPost(item.next);
}

// Keep these as named exports for pages that used the old array approach
export const WORK  = getAllWork();
export const POSTS = getAllPosts();

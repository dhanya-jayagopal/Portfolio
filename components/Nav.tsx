'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const active = (path: string) =>
    pathname === path || (path !== '/' && pathname.startsWith(path))
      ? 'navlink is-active'
      : 'navlink';

  return (
    <header>
      <div className="topnav">
        <Link href="/" className="wordmark">
          Dhanya Jayagopal<span className="wordmark-dot" />
        </Link>
        <nav>
          <ul>
            <li><Link href="/work" className={active('/work')}>Work</Link></li>
            <li><Link href="/writing" className={active('/writing')}>Writing</Link></li>
            <li><Link href="/about" className={active('/about')}>About</Link></li>
            <li><Link href="/now" className={active('/now')}>Now</Link></li>
          </ul>
        </nav>
        <a href="mailto:djayagop@gmail.com" className="topnav-email">djayagop@gmail.com</a>
      </div>
    </header>
  );
}

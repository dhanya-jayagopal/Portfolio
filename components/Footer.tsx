import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-wm">
            Dhanya Jayagopal<span className="footer-dot" />
          </div>
          <p>Product management, problem solving, and the occasional opinion. Based in Seattle.</p>
        </div>

        <div className="footer-col">
          <h6>Site</h6>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/writing">Writing</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/now">Now</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h6>Elsewhere</h6>
          <ul>
            <li><a href="mailto:djayagop@gmail.com">Email ↗</a></li>
            <li><a href="https://linkedin.com/in/jayagopaldhanya/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
            <li><a href="https://github.com/dhanya-jayagopal" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

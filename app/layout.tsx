import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Dhanya Jayagopal — Product Manager',
  description: 'Founding PM at Bomisco. Previously Docusign and LeanIX. I build platforms for a living.',
  openGraph: {
    title: 'Dhanya Jayagopal — Product Manager',
    description: 'Founding PM at Bomisco. Previously Docusign and LeanIX. I build platforms for a living.',
    url: 'https://dhanyajayagopal.com',
    siteName: 'Dhanya Jayagopal',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

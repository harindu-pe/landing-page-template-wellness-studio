import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Instrument_Serif, Space_Mono } from 'next/font/google';
import './globals.css';

/* Self-hosted, latin-subset, preloaded by next/font. Zero FOUT flash of
   fallback metrics thanks to the adjusted fallback next/font generates. */
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--ff-display',
  display: 'swap',
  preload: true,
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--ff-serif',
  display: 'swap',
  preload: true,
});

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--ff-mono',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Counterpose — Recovery studio, Colombo 07',
  description:
    'Forty-five programmed minutes of mobility, breath and controlled load, for people who already train hard. Physio-led, six mats to a session, no mirrors.',
};

export const viewport: Viewport = {
  themeColor: '#EAE5DB',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        {/* Gate every pre-paint hidden state behind JS so a no-JS visitor
            gets the full composition instead of an empty page. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

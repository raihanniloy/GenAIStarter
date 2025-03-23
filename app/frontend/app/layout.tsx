import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI-Powered Documentation Search',
  description: 'Search and embed documents using AI technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-6 py-4">
            <h1 className="text-xl font-bold">AI-Powered Documentation Search</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
} 
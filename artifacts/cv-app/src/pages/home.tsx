import React from 'react';
import { CVDisplay } from '../components/cv-display';
import { PDFDownloadButton } from '../components/pdf-download-button';
import { ThemeToggle } from '../components/theme-toggle';
import { Link } from 'wouter';
import { Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/20">
      
      {/* Top Toolbar (no-print) */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border py-3 px-4 md:px-8 no-print flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted" aria-label="Admin login">
            <Lock className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <PDFDownloadButton />
        </div>
      </header>

      {/* Main CV Container */}
      <div className="py-8 px-4 md:py-12 flex justify-center">
        <CVDisplay />
      </div>
      
    </div>
  );
}

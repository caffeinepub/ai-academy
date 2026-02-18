import { Button } from '@/components/ui/button';
import { MessageCircle, Download } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

type Page = 'home' | 'downloads' | 'download-gate';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <img
            src="/assets/generated/ai-academy-logo.dim_512x256.png"
            alt="AI Academy"
            className="h-8 w-auto"
          />
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('downloads')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            My Downloads
          </button>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hidden sm:flex"
          >
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

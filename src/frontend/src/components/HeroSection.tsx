import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, ShoppingBag, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import Section from './Section';

interface HeroSectionProps {
  onViewCourses: () => void;
  onBuyEbooks: () => void;
}

export default function HeroSection({ onViewCourses, onBuyEbooks }: HeroSectionProps) {
  return (
    <Section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/generated/hero-background.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-0" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            Master AI & Digital Skills
          </span>
          <br />
          <span className="text-foreground">and Earn Online</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Learn AI, freelancing, and digital skills with practical courses & ebooks
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={onViewCourses}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 h-auto group"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            View Courses
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            onClick={onBuyEbooks}
            variant="outline"
            className="border-2 border-purple-500/50 hover:bg-purple-500/10 text-lg px-8 py-6 h-auto group"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Buy Ebooks
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            asChild
            variant="outline"
            className="border-2 border-blue-500/50 hover:bg-blue-500/10 text-lg px-8 py-6 h-auto"
          >
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Join WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}

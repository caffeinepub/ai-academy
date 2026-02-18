import Section from './Section';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function WhatsAppBanner() {
  return (
    <Section className="py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 border border-blue-500/30 p-12 text-center backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
        <div className="relative z-10">
          <MessageCircle className="h-16 w-16 mx-auto mb-6 text-blue-400" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Need Help? Chat on WhatsApp
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant support, course recommendations, and answers to all your questions
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg px-8 py-6 h-auto"
          >
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat Now on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}

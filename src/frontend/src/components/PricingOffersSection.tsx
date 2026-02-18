import Section from './Section';
import GlassCard from './GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';

const OFFERS = [
  {
    title: 'Complete AI Bundle',
    originalPrice: 5997,
    discountedPrice: 3999,
    discount: '33% OFF',
    features: [
      'AI Mastery Course',
      'ChatGPT Earning Course',
      'AI Tools Ebook',
      'Lifetime Access',
      'WhatsApp Support',
    ],
    badge: 'BEST VALUE',
    popular: true,
  },
  {
    title: 'Freelancing Pro Pack',
    originalPrice: 3497,
    discountedPrice: 2499,
    discount: '28% OFF',
    features: [
      'Freelancing Course',
      'Freelancing Blueprint',
      'Digital Marketing Ebook',
      'Lifetime Access',
      'WhatsApp Support',
    ],
    badge: 'POPULAR',
    popular: false,
  },
  {
    title: 'All Ebooks Bundle',
    originalPrice: 1397,
    discountedPrice: 999,
    discount: '28% OFF',
    features: [
      'All 4 Premium Ebooks',
      'Instant Download',
      'Regular Updates',
      'WhatsApp Support',
    ],
    badge: 'LIMITED TIME',
    popular: false,
  },
];

export default function PricingOffersSection() {
  return (
    <Section className="py-20">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
          <Zap className="h-3 w-3 mr-1" />
          LIMITED TIME OFFER
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Special Combo Deals
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Save big with our exclusive bundle offers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OFFERS.map((offer, index) => (
          <GlassCard
            key={index}
            className={`p-6 hover:scale-105 transition-all duration-300 ${
              offer.popular ? 'ring-2 ring-blue-500/50' : ''
            }`}
          >
            {offer.badge && (
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                {offer.badge}
              </Badge>
            )}

            <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ₹{offer.discountedPrice}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{offer.originalPrice}
                </span>
              </div>
              <Badge variant="destructive" className="mt-2">
                {offer.discount}
              </Badge>
            </div>

            <ul className="space-y-3 mb-6">
              {offer.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get This Deal
            </Button>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

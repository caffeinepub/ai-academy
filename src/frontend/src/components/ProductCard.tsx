import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Zap } from 'lucide-react';
import GlassCard from './GlassCard';
import CheckoutDialog from './CheckoutDialog';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
  isEbook?: boolean;
}

const PRODUCT_IMAGES: Record<string, string> = {
  'ai-mastery': '/assets/generated/course-ai-mastery.dim_800x450.png',
  'chatgpt-earning': '/assets/generated/course-chatgpt-earning.dim_800x450.png',
  'freelancing-course': '/assets/generated/course-freelancing.dim_800x450.png',
  'instagram-growth': '/assets/generated/course-instagram-growth.dim_800x450.png',
  'ai-tools-ebook': '/assets/generated/ebook-ai-tools.dim_800x1200.png',
  'online-earning-ebook': '/assets/generated/ebook-online-earning.dim_800x1200.png',
  'freelancing-blueprint': '/assets/generated/ebook-freelancing-blueprint.dim_800x1200.png',
  'digital-marketing-ebook': '/assets/generated/ebook-digital-marketing.dim_800x1200.png',
};

export default function ProductCard({ product, isEbook = false }: ProductCardProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  const imageUrl = PRODUCT_IMAGES[product.id] || product.image;

  return (
    <>
      <GlassCard className="group overflow-hidden hover:scale-105 transition-all duration-300">
        <div className={`relative overflow-hidden ${isEbook ? 'aspect-[2/3]' : 'aspect-video'}`}>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ₹{Number(product.price)}
              </span>
            </div>
          </div>

          <Button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group/btn"
          >
            {isEbook ? (
              <>
                <Zap className="mr-2 h-4 w-4 group-hover/btn:animate-pulse" />
                Instant Buy
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Now
              </>
            )}
          </Button>
        </div>
      </GlassCard>

      <CheckoutDialog
        open={showCheckout}
        onOpenChange={setShowCheckout}
        product={product}
      />
    </>
  );
}

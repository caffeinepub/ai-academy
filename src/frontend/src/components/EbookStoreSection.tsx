import { useGetProductsByType } from '../hooks/useQueries';
import Section from './Section';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

const FEATURED_EBOOK_IDS = [
  'ai-tools-ebook',
  'online-earning-ebook',
  'freelancing-blueprint',
  'digital-marketing-ebook',
];

export default function EbookStoreSection() {
  const { data: ebooks, isLoading } = useGetProductsByType('ebook');

  const featuredEbooks = ebooks?.filter((ebook) => FEATURED_EBOOK_IDS.includes(ebook.id)) || [];

  return (
    <Section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Ebook Store
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Instant access to premium digital resources
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEbooks.map((ebook) => (
            <ProductCard key={ebook.id} product={ebook} isEbook />
          ))}
        </div>
      )}
    </Section>
  );
}

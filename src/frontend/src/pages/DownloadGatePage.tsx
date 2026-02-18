import { useEffect, useState } from 'react';
import { useValidateDownloadToken } from '../hooks/useQueries';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

type Page = 'home' | 'downloads' | 'download-gate';

interface DownloadGatePageProps {
  token: string;
  onNavigate: (page: Page) => void;
}

const EBOOK_FILES: Record<string, string> = {
  'ai-tools-ebook': '/assets/generated/ebook-ai-tools.dim_800x1200.png',
  'online-earning-ebook': '/assets/generated/ebook-online-earning.dim_800x1200.png',
  'freelancing-blueprint': '/assets/generated/ebook-freelancing-blueprint.dim_800x1200.png',
  'digital-marketing-ebook': '/assets/generated/ebook-digital-marketing.dim_800x1200.png',
};

export default function DownloadGatePage({ token, onNavigate }: DownloadGatePageProps) {
  const [productId, setProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const validateMutation = useValidateDownloadToken();

  useEffect(() => {
    if (token) {
      validateMutation.mutate(token, {
        onSuccess: (id) => {
          setProductId(id);
        },
        onError: (err: any) => {
          setError(err.message || 'Invalid or expired download token');
        },
      });
    }
  }, [token]);

  const handleDownload = () => {
    if (productId && EBOOK_FILES[productId]) {
      const link = document.createElement('a');
      link.href = EBOOK_FILES[productId];
      link.download = `${productId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={onNavigate} />
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => onNavigate('downloads')}
          className="mb-6 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Downloads
        </Button>

        <GlassCard className="p-8 text-center">
          {validateMutation.isPending ? (
            <>
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
              <h2 className="text-2xl font-bold mb-2">Validating Download Token</h2>
              <p className="text-muted-foreground">Please wait...</p>
            </>
          ) : error ? (
            <>
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Download Failed</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => onNavigate('downloads')} variant="outline">
                Return to Downloads
              </Button>
            </>
          ) : productId ? (
            <>
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Download Ready</h2>
              <p className="text-muted-foreground mb-6">Your ebook is ready to download</p>
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Ebook
              </Button>
            </>
          ) : null}
        </GlassCard>
      </main>
      <Footer />
    </div>
  );
}

import { useGetDownloads, useMarkOrderAsPaid, useGetDownloadToken } from '../hooks/useQueries';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, CheckCircle2 } from 'lucide-react';
import OrderStatusBadge from '../components/OrderStatusBadge';
import { toast } from 'sonner';

type Page = 'home' | 'downloads' | 'download-gate';

interface MyDownloadsPageProps {
  onNavigate: (page: Page, token?: string) => void;
}

export default function MyDownloadsPage({ onNavigate }: MyDownloadsPageProps) {
  const { data: downloads, isLoading } = useGetDownloads();
  const markAsPaidMutation = useMarkOrderAsPaid();
  const getTokenMutation = useGetDownloadToken();

  const handleMarkAsPaid = async (orderId: string) => {
    try {
      await markAsPaidMutation.mutateAsync(orderId);
      toast.success('Order marked as paid! You can now download your ebook.');
    } catch (error) {
      toast.error('Failed to mark order as paid');
    }
  };

  const handleDownload = async (orderId: string, productName: string) => {
    try {
      const token = await getTokenMutation.mutateAsync(orderId);
      onNavigate('download-gate', token);
    } catch (error) {
      toast.error('Failed to generate download link');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={onNavigate} />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-6 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          My Downloads
        </h1>
        <p className="text-muted-foreground mb-8">Access your purchased ebooks</p>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading your downloads...</p>
          </div>
        ) : !downloads || downloads.length === 0 ? (
          <GlassCard className="text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't purchased any ebooks yet.</p>
            <Button onClick={() => onNavigate('home')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Browse Ebooks
            </Button>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {downloads.map((order) => (
              <GlassCard key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{order.productId}</h3>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Payment Method: {order.paymentMethod}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {order.status === 'pending' && (
                      <Button
                        onClick={() => handleMarkAsPaid(order.id)}
                        disabled={markAsPaidMutation.isPending}
                        variant="outline"
                        className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        {markAsPaidMutation.isPending ? 'Processing...' : 'Mark as Paid (Test)'}
                      </Button>
                    )}
                    {order.status === 'paid' && (
                      <Button
                        onClick={() => handleDownload(order.id, order.productId)}
                        disabled={getTokenMutation.isPending}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {getTokenMutation.isPending ? 'Generating...' : 'Download'}
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

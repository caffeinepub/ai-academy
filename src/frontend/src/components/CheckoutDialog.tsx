import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCreateOrder, useGetPaymentLink } from '../hooks/useCheckout';
import { toast } from 'sonner';
import { CreditCard, Smartphone, Wallet, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import type { Product } from '../backend';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

type PaymentMethodType = 'razorpay' | 'upi' | 'paytm' | 'card';

const PAYMENT_METHODS: { value: PaymentMethodType; label: string; icon: any }[] = [
  { value: 'razorpay', label: 'Razorpay', icon: Wallet },
  { value: 'upi', label: 'UPI', icon: Smartphone },
  { value: 'paytm', label: 'Paytm', icon: Wallet },
  { value: 'card', label: 'Debit/Credit Card', icon: CreditCard },
];

export default function CheckoutDialog({ open, onOpenChange, product }: CheckoutDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('razorpay');
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackInstructions, setFallbackInstructions] = useState('');

  const createOrderMutation = useCreateOrder();
  const getPaymentLinkMutation = useGetPaymentLink();

  const handleProceed = async () => {
    try {
      const orderId = await createOrderMutation.mutateAsync({
        productId: product.id,
        paymentMethod: selectedMethod,
      });

      toast.success('Order created successfully!');

      try {
        const paymentConfig = await getPaymentLinkMutation.mutateAsync({
          productId: product.id,
          paymentMethod: selectedMethod,
        });

        if (paymentConfig.url) {
          window.open(paymentConfig.url, '_blank');
          onOpenChange(false);
        } else {
          setFallbackInstructions(paymentConfig.instructions);
          setShowFallback(true);
        }
      } catch (error: any) {
        setFallbackInstructions(
          'Payment link not configured for this method. Please contact us on WhatsApp to complete your purchase.'
        );
        setShowFallback(true);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create order');
    }
  };

  const handleClose = () => {
    setShowFallback(false);
    setFallbackInstructions('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {showFallback ? 'Complete Your Purchase' : 'Choose Payment Method'}
          </DialogTitle>
          <DialogDescription>
            {showFallback ? (
              <span className="text-muted-foreground">{fallbackInstructions}</span>
            ) : (
              <>
                <span className="font-semibold text-foreground">{product.name}</span>
                <span className="text-muted-foreground"> - ₹{Number(product.price)}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {showFallback ? (
          <div className="space-y-4 py-4">
            <div className="bg-accent/20 border border-border/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Contact us on WhatsApp to complete your payment and get instant access.
              </p>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact on WhatsApp
                </a>
              </Button>
            </div>
            <Button variant="outline" onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <>
            <RadioGroup value={selectedMethod} onValueChange={(v) => setSelectedMethod(v as PaymentMethodType)}>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.value}
                      className="flex items-center space-x-3 border border-border/50 rounded-lg p-4 hover:bg-accent/20 transition-colors cursor-pointer"
                      onClick={() => setSelectedMethod(method.value)}
                    >
                      <RadioGroupItem value={method.value} id={method.value} />
                      <Label
                        htmlFor={method.value}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{method.label}</span>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleProceed}
                disabled={createOrderMutation.isPending || getPaymentLinkMutation.isPending}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {createOrderMutation.isPending || getPaymentLinkMutation.isPending
                  ? 'Processing...'
                  : 'Proceed to Pay'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { PaymentMethod, type PaymentLinkConfig } from '../backend';

type PaymentMethodType = 'razorpay' | 'upi' | 'paytm' | 'card';

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      paymentMethod,
    }: {
      productId: string;
      paymentMethod: PaymentMethodType;
    }) => {
      if (!actor) throw new Error('Actor not available');
      const method = PaymentMethod[paymentMethod];
      return actor.createOrder(productId, method);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads'] });
    },
  });
}

export function useGetPaymentLink() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      productId,
      paymentMethod,
    }: {
      productId: string;
      paymentMethod: PaymentMethodType;
    }): Promise<PaymentLinkConfig> => {
      if (!actor) throw new Error('Actor not available');
      const method = PaymentMethod[paymentMethod];
      return actor.getPaymentLink(productId, method);
    },
  });
}

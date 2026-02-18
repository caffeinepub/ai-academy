import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ProductType, type Product, type Order } from '../backend';

export function useGetProductsByType(productType: 'course' | 'ebook') {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', productType],
    queryFn: async () => {
      if (!actor) return [];
      const type = productType === 'course' ? ProductType.course : ProductType.ebook;
      return actor.getProductsByType(type);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProduct(productId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useGetDownloads() {
  const { actor, isFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: ['downloads'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDownloads(null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarkOrderAsPaid() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.markOrderAsPaid(orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads'] });
    },
  });
}

export function useGetDownloadToken() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (orderId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDownloadToken(orderId);
    },
  });
}

export function useValidateDownloadToken() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (token: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.validateDownloadToken(token);
    },
  });
}

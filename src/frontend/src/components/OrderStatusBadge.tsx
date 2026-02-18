import { Badge } from '@/components/ui/badge';
import type { OrderStatus } from '../backend';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const variants: Record<OrderStatus, { label: string; className: string }> = {
    pending: { label: 'Pending', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
    paid: { label: 'Paid', className: 'bg-green-500/20 text-green-400 border-green-500/50' },
    delivered: { label: 'Delivered', className: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
    cancelled: { label: 'Cancelled', className: 'bg-red-500/20 text-red-400 border-red-500/50' },
  };

  const variant = variants[status];

  return (
    <Badge variant="outline" className={variant.className}>
      {variant.label}
    </Badge>
  );
}

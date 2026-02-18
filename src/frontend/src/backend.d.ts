import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export type ProductId = string;
export interface PaymentLinkConfig {
    url?: string;
    instructions: string;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    user: Principal;
    productId: ProductId;
    timestamp: Time;
}
export interface Product {
    id: ProductId;
    name: string;
    productType: ProductType;
    image: string;
    price: bigint;
}
export type OrderId = string;
export enum OrderStatus {
    cancelled = "cancelled",
    pending = "pending",
    paid = "paid",
    delivered = "delivered"
}
export enum PaymentMethod {
    upi = "upi",
    razorpay = "razorpay",
    card = "card",
    paytm = "paytm"
}
export enum ProductType {
    ebook = "ebook",
    course = "course"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(productId: ProductId, paymentMethod: PaymentMethod): Promise<OrderId>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserRole(): Promise<UserRole>;
    getDownloadToken(orderId: OrderId): Promise<string>;
    getDownloads(user: Principal | null): Promise<Array<Order>>;
    getPaymentLink(productId: ProductId, paymentMethod: PaymentMethod): Promise<PaymentLinkConfig>;
    getProduct(productId: ProductId): Promise<Product>;
    getProductsByType(productType: ProductType): Promise<Array<Product>>;
    isCallerAdmin(): Promise<boolean>;
    markOrderAsPaid(orderId: OrderId): Promise<void>;
    setPaymentLink(productId: ProductId, paymentMethod: PaymentMethod, config: PaymentLinkConfig): Promise<void>;
    validateDownloadToken(token: string): Promise<ProductId>;
}

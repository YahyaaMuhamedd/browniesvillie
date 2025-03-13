export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

export interface OrderFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    floor: string;
    apartment: string;
    description: string;
    paymentMethod: string;
    orderItems: Array<{ productId: string; name: string; quantity: number; price: number }>
}

export interface LoginFormData {
    email: string;
    phone: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    phone: string;
}
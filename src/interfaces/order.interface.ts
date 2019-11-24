export interface IOrder {
    payment_method: string;
    payment_method_title: string;
    set_paid: boolean;
    status: string;
    billing: IBilling;
    shipping: IShipping;
    line_items: ILineitem[];
    shipping_lines: IShippingline[];
}

export interface IShippingline {
    method_id: string;
    method_title: string;
    total: string;
}

export interface ILineitem {
    product_id: number;
    quantity: number;
    variation_id?: number;
}

export interface IShipping {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}

export interface IBilling {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
}
import { IOrder, IBilling, IShipping } from "../interfaces/order.interface";

export const createOrder = (billing: IBilling, shipping: IShipping): IOrder => {
    if (typeof billing == `string`) {
        billing = JSON.parse(billing)
    }
    return {
        payment_method: "bacs",
        payment_method_title: "Direct Bank Transfer",
        set_paid: true,
        status: 'processing',
        billing,
        shipping: billing,
        line_items: [
            {
                product_id: 321,
                quantity: 1
            }
        ],
        shipping_lines: [
            {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: `0`
            }
        ]
    }
}

const data: IOrder = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    status: 'processing',
    billing: {
        first_name: "John",
        last_name: "Doe",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
        email: "john.doe@example.com",
        phone: "(555) 555-5555"
    },
    shipping: {
        first_name: "John",
        last_name: "Doe",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US"
    },
    line_items: [
        {
            product_id: 321,
            quantity: 1
        }
    ],
    shipping_lines: [
        {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: `0`
        }
    ]
};
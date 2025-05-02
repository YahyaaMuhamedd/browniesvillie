export const OrderFormFields = (
    isAuthenticated: boolean,
    userAddresses?: { address: string; floor: string; apartment: string; phone?: string }[]
) => {
    if (!isAuthenticated) {
        return [
            { type: "text", name: "name", label: "Name" },
            { type: "email", name: "email", label: "Email" },
            { type: "tel", name: "phone", label: "Phone" },
            { type: "text", name: "address", label: "Address" },
            { type: "number", name: "floor", label: "Floor" },
            { type: "number", name: "apartment", label: "Apartment" },
            { type: "textarea", name: "description", label: "Description" },
            {
                type: "select",
                name: "paymentMethod",
                label: "Payment Method",
                options: [
                    { label: "Cash", value: "cash" },
                    { label: "Instapay", value: "instaPay" },
                    { label: "Vodafone Cash", value: "Vodafone Cash" },
                ],
            },
        ];
    }

    return [
        { type: "textarea", name: "description", label: "Description" },
        {
            type: "select",
            name: "paymentMethod",
            label: "Payment Method",
            options: [
                { label: "Cash", value: "cash" },
                { label: "Instapay", value: "instaPay" },
                { label: "Vodafone Cash", value: "Vodafone Cash" },
            ],
        },
    ];
};



export const instaOrVodafonePaid = [
    { type: "text", name: "phoneThatPaid", label: "Phone That Paid" },
    { type: "text", name: "referenceNumber", label: "Reference Number" },
];

export const loginFields = [
    { type: "email", name: "email", label: "Email" },
    { type: "tel", name: "phone", label: "Phone" },
];

export const registerFields = [
    { type: "text", name: "name", label: "Name" },
    { type: "email", name: "email", label: "Email" },
    { type: "tel", name: "phone", label: "Phone" },
];

export const addressFields = [
    { type: "text", name: "address", label: "Address" },
    { type: "number", name: "floor", label: "Floor" },
    { type: "number", name: "apartment", label: "Apartment" },
    { type: "textarea", name: "desc", label: "Description" },
];

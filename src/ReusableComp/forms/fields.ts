export const orderFormFields = [
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
            { label: "Instapay", value: "instapay" },
            { label: "Vodafone Cash", value: "vodafone cash" },
        ],
    },
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
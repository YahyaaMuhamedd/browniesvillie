import { useEffect } from "react";
import { CreateOrder } from "@/services/orderServices";
import { withModal } from "@/ReusableComp/Modal";
import { ArrayConverter } from "@/helpers/arrayConverter";
import { useAppSelector } from "@/hooks/Redux";
import { RootState } from "@/store/store";
import { OrderFormData } from "@/types/orderTypes";
import { useInputChange } from "@/hooks/useInputsChange";
import { Form } from "@/ReusableComp/forms/Form";

interface OrderFormProps {
    onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose }) => {
    const { formData, handleInputChange, handleSelectChange, updateOrderItems } = useInputChange<OrderFormData>({
        name: "",
        email: "",
        phone: "",
        address: "",
        floor: "",
        apartment: "",
        description: "",
        paymentMethod: "",
        orderItems: [],
    });

    const quantities = useAppSelector((state: RootState) => state.quantity.quantities);

    useEffect(() => {
        const cartLocalStorage = localStorage.getItem('cart');
        const cart = ArrayConverter(cartLocalStorage);

        if (cart.length > 0) {
            const orderItems = cart.map((item: any) => ({
                productId: item._id,
                name: item.title,
                quantity: quantities[item._id] || 1,
                price: item.price,
            }));

            updateOrderItems(orderItems);

        }
        console.log("Updated formData:", formData);

    }, [quantities]);

    const quantityForPrice = quantities[formData?.orderItems?.map((item) => item.productId)[0]] || 1; // Corrected line

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await CreateOrder(formData);
            console.log("Order created successfully:", response);
            alert("Order created successfully!");
            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error("Failed to create order:", error);
            alert("Failed to create order. Please try again.");
        }
    };

    // Define the form fields
    const fields = [
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

    return (
        <Form
            formData={formData}
            fields={fields}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleSubmit={handleSubmit}
            cssClasses="space-y-4"

        >
            <div>
                <h3 className="text-lg font-semibold mb-2">Selected Products</h3>
                {formData.orderItems?.map((item, index) => (
                    <div key={index} className="mb-2">
                        <p>
                            {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                        </p>
                    </div>
                ))}
                <p>SubTotal ${(formData?.orderItems?.reduce((total, item) => total + item.price * item.quantity, 0))}</p>

            </div>
        </Form>
    );
};

export default withModal(OrderForm, "orderForm", "Checkouts", "w-full");
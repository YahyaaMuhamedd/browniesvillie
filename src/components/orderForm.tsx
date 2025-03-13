import { useEffect } from "react";
import { CreateOrder } from "@/services/orderServices";
import { withModal } from "@/ReusableComp/Modal";
import { ArrayConverter } from "@/helpers/arrayConverter";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { RootState } from "@/store/store";
import { OrderFormData } from "@/types/formTypes";
import { useInputChange } from "@/hooks/useInputsChange";
import { Form } from "@/ReusableComp/forms/Form";
import { setToken } from "@/store/Slices/authSlice";
import { orderFormFields } from "@/ReusableComp/forms/fields";
import { fetchUserData } from "@/services/userServices";

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
    const dispatch = useAppDispatch();

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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await CreateOrder(formData);

            if (response) {
                console.log("Order created successfully:", response);

                // ✅ Set token in Redux
                dispatch(setToken(response?.token));

                dispatch(fetchUserData(response.data.loginUser._id));

                alert("Order created successfully!");
                onClose();
            } else {
                console.error("No response received from CreateOrder.");
                alert("Failed to create order. Please try again.");
            }
        } catch (error) {
            console.error("Failed to create order:", error);
            alert("Failed to create order. Please try again.");
        }
    };
    ;

    return (
        <Form
            formData={formData}
            fields={orderFormFields}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleSubmit={handleSubmit}
            cssClasses="space-y-4"
            buttonName="Submit Order"
            BtnCssClasses="w-full text-center"
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
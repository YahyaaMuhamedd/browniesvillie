"use client";
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
import { instaOrVodafonePaid, orderFormFields } from "@/ReusableComp/forms/fields";
import { fetchUserData } from "@/services/userServices";
import useCartLength from "@/hooks/useCartLength";
import Title from "@/ReusableComp/titles";

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
        phoneThatPaid: "",
        referenceNumber: "",
        orderItems: [],
    });

    const allFields = formData.paymentMethod === "instaPay" || formData.paymentMethod === "Vodafone Cash"
        ? [...orderFormFields, ...instaOrVodafonePaid]
        : orderFormFields;

    const quantities = useAppSelector((state: RootState) => state.quantity.quantities);
    const dispatch = useAppDispatch();
    const { length } = useCartLength();

    useEffect(() => {
        const cartLocalStorage = localStorage.getItem("cart");
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
    }, [quantities]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await CreateOrder(formData);
            localStorage.setItem("userId", response.order.userId);
            if (response) {
                dispatch(setToken(response?.token));
                dispatch(fetchUserData(response.order.userId));
                alert("Order created successfully!");
                onClose();
            } else {
                alert("Failed to create order. Please try again.");
            }
        } catch (error) {
            alert("Failed to create order. Please try again.");
        }
    };

    if (length === 0) return <Title title="Your Cart is Empty" cssClasses=" text-mainColor flex justify-center items-center " />;

    return (
        <Form
            formData={formData}
            fields={allFields}
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
                <p>SubTotal: ${formData?.orderItems?.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
            </div>
        </Form>
    );
};



export default withModal(OrderForm, "orderForm", "Checkouts", "w-full");

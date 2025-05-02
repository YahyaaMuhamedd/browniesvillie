"use client";

import { useEffect, useState } from "react";
import { CreateOrder } from "@/services/orderServices";
import { withModal } from "@/ReusableComp/Modal";
import { ArrayConverter } from "@/helpers/arrayConverter";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { RootState } from "@/store/store";
import { OrderFormData } from "@/types/formTypes";
import { useInputChange } from "@/hooks/useInputsChange";
import { Form } from "@/ReusableComp/forms/Form";
import { setToken } from "@/store/Slices/authSlice";
import {
    instaOrVodafonePaid,
    OrderFormFields,
    addressFields,
} from "@/ReusableComp/forms/fields";
import { fetchUserData } from "@/services/userServices";
import useCartLength from "@/hooks/useCartLength";
import Title from "@/ReusableComp/titles";
import Button from "@/ReusableComp/Button";

interface OrderFormProps {
    onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose }) => {
    const { user, isAuthenticated } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const quantities = useAppSelector((state: RootState) => state.quantity.quantities);
    const { length } = useCartLength();

    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const {
        formData,
        handleInputChange,
        handleSelectChange,
        updateOrderItems,
        setFormData,
    } = useInputChange<OrderFormData>({
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

    useEffect(() => {
        if (isAuthenticated && user) {
            setFormData((prev) => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            }));
        }
    }, [user, isAuthenticated]);

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

    const handleAddressSelection = (index: number) => {
        const selected = user?.addresses?.[index];
        if (selected) {
            setFormData((prev) => ({
                ...prev,
                address: selected.address,
                floor: selected.floor,
                apartment: selected.apartment,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage("");
            const response = await CreateOrder(formData);
            localStorage.setItem("userId", response.order.userId);
            if (response) {
                dispatch(setToken(response?.token));
                localStorage.setItem("token", response?.token);
                dispatch(fetchUserData(response.order.userId));
                setMessage("Order created successfully!");
                setLoading(false);
                onClose();
            } else {
                setLoading(false);
                setMessage("Failed to create order. Please try again.");
            }
        } catch (error: any) {
            console.error(error);
            setLoading(false);
            console.log("Error creating order:", error?.response?.data);
            console.log("Error creating order:", error);

            // Extract and format the error messages if available
            if (error?.response?.data?.error) {
                const errorMessages = error.response.data.error.map((err: any) => err.message);
                setMessage(errorMessages.join("\n"));
            } else {
                setMessage("Failed to create order. Please try again.");
            }
        }
    };

    // ========== Determine Fields Based on Auth & Address Form Mode ==========
    let fieldsToRender = [];

    if (!isAuthenticated) {
        // For unauthenticated users → show full form
        fieldsToRender = OrderFormFields(false);
    } else if (showNewAddressForm) {
        // Authenticated and wants to add new address → show only address fields (no desc/payment)
        fieldsToRender = [...addressFields,
        {
            name: "paymentMethod",
            type: "select",
            label: "Payment Method",
            options: [
                { value: "cash", label: "Cash" },
                { value: "instaPay", label: "InstaPay" },
                { value: "Vodafone Cash", label: "Vodafone Cash" },
            ],
        },
        ]; // Remove desc
    } else {
        // Authenticated, using existing address → show only payment method
        fieldsToRender = [
            {
                name: "paymentMethod",
                type: "select",
                label: "Payment Method",
                options: [
                    { value: "cash", label: "Cash" },
                    { value: "instaPay", label: "InstaPay" },
                    { value: "Vodafone Cash", label: "Vodafone Cash" },
                ],
            },
        ];
    }

    // Append extra fields if payment method is Vodafone/instaPay
    if (
        formData.paymentMethod === "instaPay" ||
        formData.paymentMethod === "Vodafone Cash"
    ) {
        fieldsToRender = [...fieldsToRender, ...instaOrVodafonePaid];
    }

    // ========== UI Blocks ==========
    if (length === 0) {
        return (
            <Title
                title="Your Cart is Empty"
                cssClasses="text-mainColor flex justify-center items-center"
            />
        );
    }

    if (isAuthenticated && !user?.name) {
        return <p className="text-center text-gray-500">Loading your info...</p>;
    }

    return (
        <>
            {isAuthenticated && user?.addresses?.length > 0 && !showNewAddressForm && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Address
                    </label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2"
                        onChange={(e) => handleAddressSelection(Number(e.target.value))}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Choose one
                        </option>
                        {user.addresses.map((addr: any, idx: number) => (
                            <option key={idx} value={idx}>
                                {`${addr.address}, Floor: ${addr.floor}, Apt: ${addr.apartment}`}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {isAuthenticated && !showNewAddressForm && (
                <Button
                    buttonName="Add New Address"
                    handleclick={() => setShowNewAddressForm(true)}
                    cssClasses="mb-4 bg-mainColor text-white w-full"
                />
            )}

            <Form
                formData={formData}
                fields={fieldsToRender}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleSubmit}
                cssClasses="space-y-4"
                buttonName={loading ? "Creating..." : "Create Order"}
                BtnCssClasses="w-full text-center"
                disabled={loading}
                errors={message ? { form: message } : undefined}
            >
                <div>
                    <h3 className="text-lg font-semibold mb-2">Selected Products</h3>
                    {formData.orderItems?.map((item, index) => (
                        <div key={index} className="mb-2">
                            <p>
                                {item.name} - Quantity: {item.quantity} - Price: $
                                {item.price.toFixed(2)}
                            </p>
                        </div>
                    ))}
                    <p>
                        SubTotal: $
                        {formData?.orderItems?.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                        )}
                    </p>
                </div>
                {message && (
                    <div className="text-red-500 text-sm mt-2">{message}</div>
                )}
            </Form>
        </>
    );
};

export default withModal(OrderForm, "orderForm", "Checkouts", "w-full");

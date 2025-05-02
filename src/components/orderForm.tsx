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

    const filteredAddressFields = addressFields.slice(0, -1); // ✅ remove "desc"

    const fieldsToRender = [
        ...(showNewAddressForm ? filteredAddressFields : []),
        ...(OrderFormFields(isAuthenticated).filter(
            (field) =>
                !["name", "email", "phone", "address", "floor", "apartment"].includes(field.name)
        )),
        ...(formData.paymentMethod === "instaPay" || formData.paymentMethod === "Vodafone Cash"
            ? instaOrVodafonePaid
            : []),
    ];

    if (length === 0)
        return (
            <Title
                title="Your Cart is Empty"
                cssClasses="text-mainColor flex justify-center items-center"
            />
        );

    if (isAuthenticated && !user?.name) {
        return <p className="text-center text-gray-500">Loading your info...</p>;
    }

    return (
        <>
            {isAuthenticated && user?.addresses?.length > 0 && !showNewAddressForm ? (
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
            ) : null}

            {!showNewAddressForm && (
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
                    <p>
                        SubTotal: $
                        {formData?.orderItems?.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                        )}
                    </p>
                </div>
            </Form>
        </>
    );
};

export default withModal(OrderForm, "orderForm", "Checkouts", "w-full");

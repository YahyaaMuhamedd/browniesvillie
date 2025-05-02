"use client";

import { useAppSelector } from "@/hooks/Redux";
import { useInputChange } from "@/hooks/useInputsChange";
import { addressFields } from "@/ReusableComp/forms/fields";
import { Form } from "@/ReusableComp/forms/Form";
import { withModal } from "@/ReusableComp/Modal";
import { addAddress } from "@/services/userServices";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

const AddressManager = () => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const { formData, handleInputChange, handleSelectChange, resetFormData } = useInputChange({
        phone: user?.phone || "",
        address: "",
        floor: 0,
        apartment: 0,
        desc: "",
    });


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [addresses, setAddresses] = useState<any[]>(user?.addresses || []);

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         setMessage("Please log in to manage your addresses.");
    //     }
    // }, [isAuthenticated]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload = {
                ...formData,
                floor: Number(formData.floor),
                apartment: Number(formData.apartment),
            };

            console.log("Payload sending to API: ", payload);

            // Send correct structure (no { formData: { ... } })
            const response = await addAddress(payload);

            console.log(response);

            if (response?.status === "success") {
                setMessage("Address added successfully!");
                setAddresses(prev => [...prev, payload]);
                resetFormData();
            } else {
                setMessage("Failed to add address. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    return (

        <Form
            formData={formData}
            fields={addressFields}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleSubmit={handleSubmit}
            cssClasses="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
            buttonName={loading ? "Adding..." : "Add Address"}
            BtnCssClasses="w-full text-center"
            disabled={loading}
        >

            {message && (
                <p className={`mt-4 text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                    {message}
                </p>
            )}
        </Form>
    );
};

export default withModal(AddressManager, "addressForm", "Add Address");
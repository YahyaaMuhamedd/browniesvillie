"use client";

import { withModal } from "@/ReusableComp/Modal";
import { register } from "@/services/authServices";
import { useAppDispatch } from "@/hooks/Redux";
import { useInputChange } from "@/hooks/useInputsChange";
import { RegisterFormData } from "@/types/formTypes";
import { Form } from "@/ReusableComp/forms/Form";
import { registerFields } from "@/ReusableComp/forms/fields";
import { setToken } from "@/store/Slices/authSlice";
import { fetchUserData } from "@/services/userServices";
import { useState } from "react";

interface RegisterProps {
    onClose: () => void;
    switchToLogin: () => void; // Function to switch to login modal
}

export const Register: React.FC<RegisterProps> = ({ onClose, switchToLogin }) => {
    const { formData, handleInputChange } = useInputChange<RegisterFormData>({
        name: "",
        email: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage("");

            const response = await dispatch(register(formData)).unwrap();
            console.log("Registration successful:", response);

            dispatch(setToken(response));
            dispatch(fetchUserData(response.data.loginUser._id));

            setLoading(false);
            setMessage("Registration successful!");
            const timer = setTimeout(() => {
                setMessage("");
                onClose();
            }, 1000);

            clearTimeout(timer);
        } catch (error: any) {
            setLoading(false);
            setMessage(error || "Registration failed. Please try again.");
            console.error("Registration failed:", error);
        }
    };

    return (
        <Form
            formData={formData}
            fields={registerFields}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            buttonName={loading ? "Loading..." : "Register"}
            handleSelectChange={() => { }}
            BtnCssClasses="w-full text-center"
            cssClasses="flex flex-col gap-4"
            disabled={loading}
            errors={message ? { email: message } : undefined} // Display error message if any
        >
            <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={switchToLogin}
                    className="text-blue-500 hover:underline"
                >
                    Login
                </button>
            </div>
        </Form>
    );
};


"use client";

import { withModal } from "@/ReusableComp/Modal";
import { login } from "@/services/authServices";
import { useAppDispatch } from "@/hooks/Redux";
import { useInputChange } from "@/hooks/useInputsChange";
import { LoginFormData } from "@/types/formTypes";
import { Form } from "@/ReusableComp/forms/Form";
import { loginFields } from "@/ReusableComp/forms/fields";
import { fetchUserData } from "@/services/userServices";
import { setToken } from "@/store/Slices/authSlice";
import { useState } from "react";

interface LoginProps {
    onClose: () => void;
    switchToRegister: () => void; // Function to switch to register modal
}

export const Login: React.FC<LoginProps> = ({ onClose, switchToRegister }) => {
    const { formData, handleInputChange } = useInputChange<LoginFormData>({
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
            const response = await dispatch(login(formData)).unwrap();
            dispatch(setToken(response));
            dispatch(fetchUserData(response.data.loginUser._id));
            setLoading(false);
            setMessage("Login successful!");
            const timer = setTimeout(() => {
                setMessage("");
                onClose(); // Close the modal after successful login
            }, 1000);
            clearTimeout(timer);
        } catch (error: any) {
            setLoading(false);
            setMessage(error || "Login failed. Please try again.");
            console.error("Login failed:", error);
        }
    };

    return (
        <Form
            formData={formData}
            fields={loginFields}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            buttonName={loading ? "Loading..." : "Login"}
            disabled={loading}
            handleSelectChange={() => { }}
            BtnCssClasses="w-full text-center "
            cssClasses="flex flex-col gap-4"
            errors={message ? { email: message } : undefined} // Display error message if any
        >
            <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={switchToRegister} // Switch to register form
                    className="text-blue-500 hover:underline"
                >
                    Register
                </button>
            </div>
            {message && <p className="text-center text-sm text-red-500">{message}</p>}
        </Form>
    );
};


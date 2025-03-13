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

interface LoginProps {
    onClose: () => void;
    switchToRegister: () => void; // Function to switch to register modal
}

export const Login: React.FC<LoginProps> = ({ onClose, switchToRegister }) => {
    const { formData, handleInputChange } = useInputChange<LoginFormData>({
        email: "",
        phone: "",
    });
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await dispatch(login(formData)).unwrap();
            dispatch(setToken(response));
            dispatch(fetchUserData(response.data.loginUser._id));

            onClose(); // Close the modal on successful login
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Form
            formData={formData}
            fields={loginFields}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            buttonName="Login"
            handleSelectChange={() => { }}
            BtnCssClasses="w-full text-center "
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
        </Form>
    );
};


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
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await dispatch(register(formData)).unwrap();
            console.log("Registration successful:", response);

            dispatch(setToken(response));
            dispatch(fetchUserData(response.data.loginUser._id));

            onClose();
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <Form
            formData={formData}
            fields={registerFields}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            buttonName="Register"
            handleSelectChange={() => { }}
            BtnCssClasses="w-full text-center"
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


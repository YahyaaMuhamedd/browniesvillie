"use client";

import { useState, useEffect } from "react";
import { Login } from "@/components/Auth/Login";
import { Register } from "@/components/Auth/Register";
import { withModal } from "@/ReusableComp/Modal";

interface AuthModalProps {
    onClose: () => void;
    setDynamicTitle: (title: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, setDynamicTitle }) => {
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        setDynamicTitle(isLogin ? "Login" : "Register");
    }, [isLogin, setDynamicTitle]);

    return isLogin ? (
        <Login onClose={onClose} switchToRegister={() => setIsLogin(false)} />
    ) : (
        <Register onClose={onClose} switchToLogin={() => setIsLogin(true)} />
    );
};

export default withModal(AuthModal, "Login", "Login", "w-fit px-4 py-2 z-[500]");

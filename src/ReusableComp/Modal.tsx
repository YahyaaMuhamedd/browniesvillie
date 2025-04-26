"use client";

import { useState, useEffect } from "react";
import Button from "./Button";


// Higher-Order Component (HOC) for Modal
export const withModal = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    modalTitle: string = "Modal",
    btnTitle: string = "Open Modal",
    cssClasses: string = "",
    disabled?: boolean
) => {
    return (props: P) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [dynamicTitle, setDynamicTitle] = useState(modalTitle);

        const openModal = () => {
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
        };

        useEffect(() => {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") closeModal();
            };

            const handleClickOutside = (e: MouseEvent) => {
                if ((e.target as HTMLElement).id === "modal-overlay") {
                    closeModal();
                }
            };

            window.addEventListener("keydown", handleEscape);
            window.addEventListener("mousedown", handleClickOutside);

            return () => {
                window.removeEventListener("keydown", handleEscape);
                window.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        return (
            <>
                <Button
                    handleclick={openModal}
                    cssClasses={`${cssClasses} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    buttonName={btnTitle}
                    disabled={disabled}
                    type="button"
                />

                {isModalOpen && (
                    <div id="modal-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg overflow-y-auto max-h-full">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className={`text-2xl font-bold text-mainColor text-center w-full`}>{dynamicTitle}</h2>
                                <button
                                    onClick={closeModal}
                                    className={`text-gray-500 hover:text-gray-700 `}
                                    aria-label="Close modal"
                                >
                                    &times;
                                </button>
                            </div>
                            <WrappedComponent {...props} onClose={closeModal} setDynamicTitle={setDynamicTitle} />
                        </div>
                    </div>
                )}
            </>
        );
    };
};
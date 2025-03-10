'use client'
import { useEffect, useState } from "react";
import Button from "./Button";

// Higher-Order Component (HOC) لـ Modal
export const withModal = (WrappedComponent: React.ComponentType<any>, modalTitle?: string, btnTitle?: string, cssClasses?: string) => {
    // Return a functional component
    return (props: any) => {
        const [isModalOpen, setIsModalOpen] = useState(false);

        const openModal = () => {
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
        };

        // useEffect(() => {
        //     const handleEscape = (e: KeyboardEvent) => {
        //         if (e.key === "Escape") closeModal();
        //     };

        //     window.addEventListener("keydown", handleEscape);

        //     // Cleanup event listener
        //     return () => {
        //         window.removeEventListener("keydown", handleEscape);
        //     };
        // }, []);

        return (
            <div>
                <Button
                    handleclick={() => openModal()}
                    cssClasses={`${cssClasses} w-full`}
                    buttonName={btnTitle || "Open Modal"}
                />

                {/* الـ Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg overflow-y-auto h-[90vh]">
                            {/* عنوان الـ Modal */}
                            <div className="flex justify-between items-center mb-4">
                                {modalTitle && <h2 className="text-2xl font-bold">{modalTitle}</h2>}
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    &times;
                                </button>
                            </div>

                            {/* المحتوى */}
                            <WrappedComponent {...props} onClose={closeModal} />
                        </div>
                    </div>
                )}
            </div>
        );
    };
};
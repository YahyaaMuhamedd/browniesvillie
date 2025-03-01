import React, { useEffect, useState } from "react";

// Higher-Order Component (HOC) لـ Modal
const withModal = (WrappedComponent: React.ComponentType<any>, modalTitle?: string) => {
    return (props: any) => {
        const [isModalOpen, setIsModalOpen] = useState(false);

        // فتح الـ Modal
        const openModal = () => {
            setIsModalOpen(true);
        };

        // إغلاق الـ Modal
        const closeModal = () => {
            setIsModalOpen(false);
        };
        useEffect(() => {

            window.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && isModalOpen) {
                    closeModal();
                }
            });
        }, [])


        return (
            <div>
                {/* زر لفتح الـ Modal */}
                <button
                    onClick={openModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Open Modal
                </button>

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

export default withModal;
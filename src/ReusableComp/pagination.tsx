"use client";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showPrevNextButtons?: boolean;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, showPrevNextButtons = false }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            {showPrevNextButtons && (
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? "bg-mainColor text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {i + 1}
                </button>
            ))}

            {showPrevNextButtons && (
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            )}
        </div>
    );
};

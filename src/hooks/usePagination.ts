import { useEffect, useState } from "react";

export interface PaginationOptions<T> {
    items: T[];
    backendPagination?: boolean;
    itemsPerPage?: number;
    totalBackendPages?: number;
    currentBackendPage?: number;
}

export const usePagination = <T>({
    items,
    backendPagination = false,
    itemsPerPage = 10,
    totalBackendPages = 1,
    currentBackendPage = 1,
}: PaginationOptions<T>) => {
    const [currentPage, setCurrentPage] = useState<number>(currentBackendPage || 1);
    const [displayedItems, setDisplayedItems] = useState<T[]>([]);
    const [totalPages, setTotalPages] = useState<number>(backendPagination ? totalBackendPages : 1);

    useEffect(() => {
        if (!backendPagination) {
            const total = Math.ceil(items.length / itemsPerPage);
            setTotalPages(total);
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            setDisplayedItems(items.slice(start, end));
        } else {
            setTotalPages(totalBackendPages);
            setDisplayedItems(items);
        }
    }, [items, currentPage, backendPagination, itemsPerPage, totalBackendPages]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        currentPage,
        totalPages,
        displayedItems,
        handlePageChange,
        setCurrentPage, // expose if needed
    };
};

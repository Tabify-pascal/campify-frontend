import { useEffect, useMemo, useState } from "react";

type UsePaginationOptions<T> = {
    items: T[];
    itemsPerPage?: number;
};

export function usePagination<T>({
    items,
    itemsPerPage = 5,
}: UsePaginationOptions<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(
        1, Math.ceil(items.length / itemsPerPage)
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;


        return items.slice(startIndex, endIndex);
    }, [items, currentPage, itemsPerPage]);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = Math.min(
        startIndex + itemsPerPage,
        items.length
    );

    function goToPage(page: number) {
        const safePage = Math.min(
            Math.max(page, 1),
            totalPages
        );

        setCurrentPage(safePage);
    }

    function nextPage() {
        goToPage(currentPage + 1);
    }

    function previousPage() {
        goToPage(currentPage - 1);
    }

    return {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
        nextPage,
        previousPage,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
        startIndex,
        endIndex,
    };
}
/**
 * @file usePagination.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-22
 */

import { useMemo, useState } from "react";

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

    // Keep the current page valid when the number of pages decreases.
    if (currentPage > totalPages) {
        setCurrentPage(totalPages);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = Math.min(
        startIndex + itemsPerPage,
        items.length
    );

    const paginatedItems = useMemo(() => {
        return items.slice(startIndex, endIndex);
    }, [items, startIndex, endIndex]);

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
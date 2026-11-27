/**
 * @file usePagination.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { act, renderHook } from "@testing-library/react";
import { usePagination } from "./usePagination";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

describe("usePagination", () => {
    it("starts on the first page", () => {
        const { result } = renderHook(() =>
            usePagination({ items })
        );

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(3);
        expect(result.current.hasNextPage).toBe(true);
        expect(result.current.hasPreviousPage).toBe(false);
    });

    it("uses five items per page by default", () => {
        const { result } = renderHook(() =>
            usePagination({ items })
        );

        expect(result.current.paginatedItems)
            .toEqual([1, 2, 3, 4, 5]);

        expect(result.current.startIndex).toBe(0);
        expect(result.current.endIndex).toBe(5);
    });

    it("supports a custom page size", () => {
        const { result } = renderHook(() =>
            usePagination({ items, itemsPerPage: 3 })
        );

        expect(result.current.totalPages).toBe(4);
        expect(result.current.paginatedItems)
            .toEqual([1, 2, 3]);
    });

    it("navigates to the next page", () => {
        const { result } = renderHook(() =>
            usePagination({ items })
        );

        act(() => {
            result.current.nextPage();
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.paginatedItems)
            .toEqual([6, 7, 8, 9, 10]);

        expect(result.current.hasPreviousPage).toBe(true);
    });

    it("navigates to the previous page", () => {
        const { result } = renderHook(() =>
            usePagination({ items })
        );

        act(() => {
            result.current.goToPage(2);
        });

        act(() => {
            result.current.previousPage();
        });

        expect(result.current.currentPage).toBe(1);
        expect(result.current.paginatedItems)
            .toEqual([1, 2, 3, 4, 5]);
    });

    it("does not navigate beyond the first page", () => {
        const { result } = renderHook(() =>
            usePagination({ items })
        );

        act(() => {
            result.current.previousPage();
        });

        expect(result.current.currentPage).toBe(1);
    });

    it("does not navigate beyond the last page", () => {
        const { result } = renderHook(() =>
            usePagination({ items })
        );

        act(() => {
            result.current.goToPage(99);
        });

        expect(result.current.currentPage).toBe(3);
        expect(result.current.paginatedItems)
            .toEqual([11, 12]);

        expect(result.current.hasNextPage).toBe(false);
        expect(result.current.startIndex).toBe(10);
        expect(result.current.endIndex).toBe(12);

        act(() => {
            result.current.nextPage();
        });

        expect(result.current.currentPage).toBe(3);
    });

    it("handles an empty item list", () => {
        const { result } = renderHook(() =>
            usePagination({ items: [] })
        );

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(1);
        expect(result.current.paginatedItems).toEqual([]);
        expect(result.current.hasNextPage).toBe(false);
        expect(result.current.hasPreviousPage).toBe(false);
        expect(result.current.startIndex).toBe(0);
        expect(result.current.endIndex).toBe(0);
    });

    it("corrects the current page when the item count decreases", () => {
        const { result, rerender } = renderHook(
            ({ items }) => usePagination({ items }),
            {
                initialProps: { items },
            }
        );

        act(() => {
            result.current.goToPage(3);
        });

        rerender({ items: [1, 2, 3] });

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(1);
        expect(result.current.paginatedItems)
            .toEqual([1, 2, 3]);
    });

    it("preserves the corrected page when the item count increases again", () => {
        const { result, rerender } = renderHook(
            ({ items }) => usePagination({ items }),
            {
                initialProps: { items },
            }
        );

        act(() => {
            result.current.goToPage(3);
        });

        rerender({ items: [1, 2, 3] });
        rerender({ items });

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(3);
        expect(result.current.paginatedItems)
            .toEqual([1, 2, 3, 4, 5]);
    });
});
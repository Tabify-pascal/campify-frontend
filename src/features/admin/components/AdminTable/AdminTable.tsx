import type { ReactNode } from "react"
import Pagination from "../../../../components/ui/Pagination/Pagination";
import styles from "./AdminTable.module.css";

type Column = {
    key: string;
    label: string;
};

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

type Props<T> = {
    columns: Column[];
    items: T[];
    getKey: (item: T) => string;
    renderRow: (item: T) => ReactNode;
    emptyMessage?: string;
    pagination?: PaginationProps;
};

export default function AdminTable<T>({
    columns,
    items,
    getKey,
    renderRow,
    emptyMessage = "Er zijn geen items gevonden.",
    pagination,
}: Props<T>) {
    return (
        <div className={styles.tableCard}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className={styles.emptyState}
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={getKey(item)}>
                                    {renderRow(item)}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {pagination && pagination.totalPages > 1 && (
                <div className={styles.pagination}>
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={pagination.onPageChange}
                    />
                </div>
            )}
        </div>
    )
}
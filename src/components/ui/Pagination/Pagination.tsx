import styles from "./Pagination.module.css";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    totalPages, 
    onPageChange,
}: Props) {
    if (totalPages <= 1){
        return null;
    }

    const pages = Array.from(
        {length: totalPages},
        (_, index) => index + 1
    );

    return (
        <nav
            className={styles.pagination}
            aria-label="Paginering"
        >
            <button
                type="button"
                className={styles.button}
                onClick={()=> onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Vorige
            </button>
            <div className={styles.pages}>
                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={[
                            styles.pageButton,
                            page === currentPage 
                                ? styles.activePage
                                : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        onClick={()=> onPageChange(page)}
                        aria-current={
                            page === currentPage
                                ? "page"
                                : undefined
                        } 
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                type="button"
                className={styles.button}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Volgende
            </button>
        </nav>
    );
}
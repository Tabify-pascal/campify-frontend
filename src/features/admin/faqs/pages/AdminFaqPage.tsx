import { Link } from "react-router-dom";
import { useState } from "react";
import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import Button from "../../../../components/ui/Button";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import { useAdminFaqs } from "../queries/useAdminFaqs";
import { useDeleteFaq } from "../mutations/useDeleteFaqs";
import { Trash2, Pencil } from "lucide-react";
import { type FaqItem } from "../../../faq/types/FaqItem";

import Pagination from "../../../../components/ui/Pagination/Pagination";
import { usePagination } from "../../../../hooks/usePagination";

import styles from "./AdminFaqPage.module.css";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";

export default function AdminFaqPage() {
    const { data: faqs = [], isLoading, error } = useAdminFaqs();
    const { currentPage, totalPages, paginatedItems, goToPage, } = usePagination({ items: faqs, itemsPerPage: 6 });

    const [faqToDelete, setFaqToDelete] = useState<FaqItem | null>(null);
    const deleteFaqMutation = useDeleteFaq();

    function handleConfirmDelete() {
        if (!faqToDelete) {
            return
        }

        deleteFaqMutation.mutate(faqToDelete.id, {
            onSuccess: () => {
                setFaqToDelete(null);
            },
        });
    }

    if (isLoading) return <p>Laden...</p>;

    if (error) {
        return (
            <MessageCard
                title="De veelgestelde vragen konden niet gevonden worden"
                message="Probeer het later opnieuw"
                linkTo="/admin"
                linkText="Terug naar het dashboard"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Veelgestelde vragen beheren"
                description="Beheer de veelgestelde vragen"
            />

            <div className={styles.actions}>
                <Button to="/admin/faqs/new">Nieuwe vraag toevoegen</Button>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Vraag</th>
                            <th>Antwoord</th>
                            <th>Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.length === 0 ? (
                            <tr>
                                <td colSpan={3}>
                                    Er zijn nog geen veelgestelde vragen.
                                </td>
                            </tr>
                        ) : (
                            paginatedItems.map((faq) => (
                                <tr key={faq.id}>
                                    <td>{faq.question}</td>
                                    <td className={styles.answer}>{faq.answer}</td>
                                    <td>
                                        <div className={styles.rowActions}>
                                            <Link to={`/admin/faqs/${faq.id}/edit`} className={styles.editButton} aria-label="Faq bewerken" title="Bewerken">
                                                <Pencil size={18} />
                                            </Link>
                                            <button
                                                type="button"
                                                className={styles.deleteButton}
                                                onClick={() => setFaqToDelete(faq)}
                                                aria-label="Faq verwijderen"
                                                title="Verwijderen"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={goToPage}
                        />
                    </div>
                )}
            </div>
            <DeleteModal
                isOpen={faqToDelete !== null}
                title="Veelgestelde vraag verwijderen"
                message="Weet je zeker dat je deze vraag wilt verwijderen?"
                itemName={faqToDelete?.question}
                isPending={deleteFaqMutation.isPending}
                onClose={() => setFaqToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}

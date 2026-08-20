import { useState } from "react";
import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import Button from "../../../../components/ui/Button";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import { useAdminFaqs } from "../queries/useAdminFaqs";
import { useDeleteFaq } from "../mutations/useDeleteFaqs";
import { type FaqItem } from "../../../faq/types/FaqItem";
import { usePagination } from "../../../../hooks/usePagination";

import styles from "../../../admin/components/AdminIndex/AdminIndex.module.css";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";
import AdminTable from "../../components/AdminTable/AdminTable";
import AdminEditButton from "../../components/AdminActionButton/AdminEditButton";
import AdminDeleteButton from "../../components/AdminActionButton/AdminDeleteButton";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";

const columns = [
    { key: "question", label: "Vraag" },
    { key: "answer", label: "Antwoord" },
    { key: "actions", label: "Acties" },
];

export default function AdminFaqPage() {
    const { data: faqs = [], isLoading, error } = useAdminFaqs();
    const { currentPage, totalPages, paginatedItems, goToPage, } = usePagination({ items: faqs, itemsPerPage: 6 });

    const [faqToDelete, setFaqToDelete] = useState<FaqItem | null>(null);
    const deleteFaqMutation = useDeleteFaq();

    function handleConfirmDelete() {
        if (!faqToDelete) {
            return;
        }

        deleteFaqMutation.mutate(faqToDelete.id, {
            onSuccess: () => {
                setFaqToDelete(null);
            },
        });
    }

    if (isLoading) return <LoadingState/>;

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

            <AdminTable
                columns={columns}
                items={paginatedItems}
                getKey={(faq) => faq.id}
                emptyMessage="Er zijn nog geen veelgestelde vragen."
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: goToPage,
                }}
                renderRow={(faq) => (
                    <>
                        <td>{faq.question}</td>
                        <td>{faq.answer}</td>
                        <td>
                            <div className={styles.rowActions}>
                                <AdminEditButton
                                    to={`/admin/faqs/${faq.id}/edit`}
                                    label="Faq bewerken"
                                />

                                <AdminDeleteButton
                                    onClick={()=> setFaqToDelete(faq)}
                                    label="FAQ verwijderen"
                                />
                            </div>
                        </td>
                    </>
                )}
            />

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

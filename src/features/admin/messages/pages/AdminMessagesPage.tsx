import { useState } from "react";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import { usePagination } from "../../../../hooks/usePagination";
import type { AdminContactMessage } from "../types/message";
import { useContactMessages } from "../queries/useContactMessages";
import { useDeleteMessage } from "../mutations/useDeleteMessage";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";
import { formatDate } from "../../../../utils/formatDate";

import styles from "../../AdminIndexPage.module.css";
import AdminStatusBadge from "../../components/AdminStatusBadge/AdminStatusBadge";
import AdminTable from "../../components/AdminTable/AdminTable";
import AdminDeleteButton from "../../components/AdminActionButton/AdminDeleteButton";
import AdminViewButton from "../../components/AdminActionButton/AdminViewButton";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";

export default function AdminMessagePage() {
    const {
        data: messages = [],
        isLoading,
        error,
    } = useContactMessages();

    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
    } = usePagination({
        items: messages,
        itemsPerPage: 5,
    });

    const columns = [
        { key: "name", label: "Name" },
        { key: "subject", label: "Onderwerp" },
        { key: "status", label: "Status" },
        { key: "createdAt", label: "Aangemaakt" },
        { key: "actions", label: "Acties" }
    ];

    const [messageToDelete, setMessageToDelete] = useState<AdminContactMessage | null>(null);
    const deleteMessage = useDeleteMessage();

    function handleConfirmDelete() {
        if (!messageToDelete) {
            return
        }

        deleteMessage.mutate(messageToDelete.id, {
            onSuccess: () => {
                setMessageToDelete(null);
            }
        });
    }

    if (isLoading) {
        return <LoadingState/>;
    }

    if (error) {
        return (
            <MessageCard
                title="Berichten konden niet worden geladen."
                message="Probeer het later opnieuw"
                linkTo="/admin"
                linkText="Terug naar het dashboard"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Berichten beheren"
                description="Beheer alle berichten"
            />

            <AdminTable
                columns={columns}
                items={paginatedItems}
                getKey={(message) => message.id}
                emptyMessage="Er zijn nog geen berichten."
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: goToPage,
                }}
                renderRow={(message) => (
                    <>
                        <td>{message.name}</td>
                        <td>{message.subject}</td>
                        <td><AdminStatusBadge status={message.status} /></td>
                        <td>{formatDate(message.createdAt)}</td>
                        <td>
                            <div className={styles.rowActions}>
                                <AdminViewButton
                                    to={`/admin/messages/${message.id}`}
                                    label="Status bewerken"
                                />

                                <AdminDeleteButton
                                    onClick={() => setMessageToDelete(message)}
                                    label="Bericht verwijderen"
                                />
                            </div>
                        </td>
                    </>
                )}
            />

            <DeleteModal
                isOpen={messageToDelete !== null}
                title="Bericht verwijderen"
                message="Weet je zeker dat je dit bericht wilt verwijderen?"
                itemName={messageToDelete?.subject}
                isPending={deleteMessage.isPending}
                onClose={() => setMessageToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}


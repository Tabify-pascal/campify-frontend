import { Link } from "react-router-dom";
import { useState } from "react";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import Pagination from "../../../../components/ui/Pagination/Pagination";

import { usePagination } from "../../../../hooks/usePagination";
import type { AdminContactMessage } from "../types/message";
import { useContactMessages } from "../queries/useContactMessages";
import { useDeleteMessage } from "../mutations/useDeleteMessage";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";

import { Trash2, Eye } from "lucide-react";
import { formatDate } from "../../../../utils/formatDate"; 

import styles from "../../AdminIndexPage.module.css";
import statusStyles from "../../AdminStatusDisplay.module.css";

export default function AdminMessagePage(){
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

    const [ messageToDelete, setMessageToDelete] = useState<AdminContactMessage | null>(null);
    const deleteMessage = useDeleteMessage();

    function handleConfirmDelete(){
        if(!messageToDelete){
            return
        }

        deleteMessage.mutate(messageToDelete.id, {
            onSuccess: () => {
                setMessageToDelete(null);
            }
        });
    }

    if (isLoading) {
        return <p>Laden...</p>
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
        <div className={styles.tableCard}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Onderwerp</th>
                        <th>Status</th>
                        <th>Aangemaakt</th>
                        <th>Acties</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedItems.length === 0 ? (
                        <tr>
                            <td colSpan={5}>
                                Er zijn nog geen berichten.
                            </td>
                        </tr>
                    ) : (
                        paginatedItems.map((message) => (
                            <tr key={message.id}>
                                <td>{message.name}</td>
                                <td>{message.subject}</td>
                                <td>
                                    <span
                                        className={`${statusStyles.status} ${
                                            statusStyles[
                                                message.status.toLowerCase() as
                                                    | "new"
                                                    | "read"
                                                    | "closed"
                                            ]
                                        }`}
                                    >
                                        {message.status}
                                    </span>
                                </td>
                                <td>{formatDate(message.createdAt)}</td>
                                <td>
                                    <div className={styles.rowActions}>
                                             <Link to={`/admin/messages/${message.id}`} aria-label="Bericht bekijken" title="Bekijken">
                                                <Eye size={18} />
                                            </Link>

                                            <button
                                               type="button"
                                               aria-label="Bericht verwijderen"
                                               title="Verwijderen"
                                                onClick={() => setMessageToDelete(message)}                                            >
                                                 <Trash2 size={18}/>
                                           </button>
                                        </div>
                                   </td>
                                 </tr>
                            ))
                       )}
                   </tbody>
            </table>
            <div className={styles.pagination}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />
            </div>
        </div>
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
    )
}

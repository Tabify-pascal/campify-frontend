import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";
import { formatDate } from "../../../../utils/formatDate";

import { useContactMessage } from "../queries/useContactMessage";
import { useUpdateMessageStatus } from "../mutations/useUpdateMessageStatus";
import { useDeleteMessage } from "../mutations/useDeleteMessage";

import styles from "./adminMessageDetailPage.module.css";
import MessageStatusForm from "../components/MessageStatusForm";
import type { ContactMessageStatusFormData } from "../schemas/contactMessageStatusSchema";

export default function AdminMessageDetailPage(){
    const {messageId} = useParams();
    const navigate = useNavigate();

    const {
        data: message,
        isLoading, 
        error,
    } = useContactMessage(messageId);

    const updateStatusMutation = useUpdateMessageStatus();
    const deleteMessageMutation = useDeleteMessage();

    const [ isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    if (isLoading) {
        return <p>Laden...</p>;
    }

    if (error || !message || !messageId) {
        return (
            <MessageCard
                title="Bericht niet gevonden"
                message="Dit bericht kon niet worden gevonden."
                linkText="Terug naar overzicht"
                linkTo="/admin/messages"
            />
        );
    }

    const currentMessageId = messageId;

    function handleStatusSubmit(
        data: ContactMessageStatusFormData,
    ) {
        updateStatusMutation.mutate({
            messageId: currentMessageId,
            status: data.status,
        });
    }

    function handleDelete(){
        deleteMessageMutation.mutate(currentMessageId, {
            onSuccess: () => {
                navigate("/admin/messages", {
                    replace: true,
                });
            },
        });
    }

    return (
        <div className={styles.page}>
            <Link
                to="/admin/messages"
                className={styles.backLink}
            >
                ← Terug naar berichten
            </Link>

            <PageHeader
                title={`Bericht van ${message.name}`}
                description={message.subject}
            />

            {updateStatusMutation.isError && (
                <MessageCard
                    title="Status kan niet worden bijgewerkt"
                    message="Probeer het later opnieuw."
                    linkTo="/admin/messages"
                    linkText="Terug naar overzicht"
                />
            )}

            <div className={styles.content}>
                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        Berichtgegevens
                    </h2>
                    <dl className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Naam
                            </dt>
                            <dd className={styles.value}>
                                {message.name}
                            </dd>
                        </div>
                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Email
                            </dt>
                            <dd className={styles.value}>
                                <a href={`mailto:${message.email}`}>
                                    {message.email}
                                </a>
                            </dd>
                        </div>
                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Onderwerp
                            </dt>
                            <dd className={styles.value}>
                                {message.subject}
                            </dd>
                        </div>
                        
                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Datum
                            </dt>
                            <dd className={styles.value}>
                                {formatDate(message.createdAt)}
                            </dd>
                        </div>
                        <div className={`${styles.detailItem} ${styles.fullWidth}`}>
                            <dt className={styles.label}>
                                Bericht
                            </dt>
                            <dd className={`${styles.value} ${styles.message}`}>
                                {message.message}
                            </dd>
                        </div>
                        

                    </dl>
                </section>

                <aside className={styles.sidebar}>
                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>
                            Status beheren
                        </h2>

                        <MessageStatusForm
                            defaultValues={{
                                status: message.status
                            }}
                            isSubmitting={
                                updateStatusMutation.isPending
                            }
                            onSubmit={
                                handleStatusSubmit
                            }
                        />
                    </section>

                    <section
                        className={`${styles.card} ${styles.dangerCard}`}
                    >
                        <h2 className={styles.dangerTitle}>
                            Bericht verwijderen
                        </h2>
                        <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={()=> setIsDeleteModalOpen(true)}
                        >
                            Bericht verwijderen
                        </button>
                    </section>
                </aside>
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                title="Bericht verwijderen"
                message="Weet je zeker dat je dit bericht wilt verwijderen?"
                itemName={message.subject}
                isPending={deleteMessageMutation.isPending}
                onClose={()=> setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
}

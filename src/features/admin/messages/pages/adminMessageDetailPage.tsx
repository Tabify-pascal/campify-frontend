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
import type { ContactMessageStatusFormData } from "../schemas/contactMessageStatusSchema";
import AdminDetailSection from "../../components/AdminDetailSection/AdminDetailSection";
import AdminStatusForm from "../../components/AdminStatusForm/AdminStatusForm";
import AdminDangerSection from "../../components/AdminDangerSection/AdminDangerSection";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";

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
        return <LoadingState/>;
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
                <AdminDetailSection
                    title="Berichtgegevens"
                    items={[
                        {
                            label: "Naam",
                            value: message.name, 
                        },
                        {
                            label: "E-mail",
                            value: (
                                <a href={`mailto:${message.email}`}>
                                    {message.email}
                                </a>
                            ),
                        },
                        {
                            label: "Onderwerp",
                            value: message.subject,
                        },
                        {
                            label: "Datum",
                            value: formatDate(message.createdAt),
                        },
                        {
                            label: "Bericht",
                            value: message.message,
                            fullWidth: true,
                        },                        
                    ]}
                />

                <aside className={styles.sidebar}>
                    <AdminStatusForm
                        defaultValue={message.status}
                        options={[
                            {
                                value: "NEW",
                                label: "Nieuw",
                            },
                            {
                                value: "READ",
                                label: "Gelezen", 
                            },
                            {
                                value: "CLOSED",
                                label: "Afgehandeld",
                            },
                        ]}
                        isSubmitting={updateStatusMutation.isPending}
                        onSubmit={handleStatusSubmit}
                    />

                    <AdminDangerSection
                        title="Bericht verwijderen"
                        buttonLabel="Verwijderen"
                        onClick={() => setIsDeleteModalOpen(true)}
                    />
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

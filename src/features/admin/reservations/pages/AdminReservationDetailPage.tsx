import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";
import { formatDate } from "../../../../utils/formatDate" 

import { useAdminReservation } from "../queries/useAdminReservation";
import { useUpdateReservationStatus } from "../mutations/useUpdateReservationStatus";
import { useDeleteReservation } from "../mutations/useDeleteReservation";

import type { ReservationStatusFormData } from "../schemas/reservationStatusSchema"; 
import styles from "./AdminReservationDetailPage.module.css";
import AdminDangerSection from "../../components/AdminDangerSection/AdminDangerSection";
import AdminDetailSection from "../../components/AdminDetailSection/AdminDetailSection";
import AdminStatusForm from "../../components/AdminStatusForm/AdminStatusForm";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";

export default function AdminReservationDetailPage() {
    const { reservationId } = useParams();
    const navigate = useNavigate();

    const {
        data: reservation,
        isLoading,
        error,
    } = useAdminReservation(reservationId!);

    const updateStatusMutation = useUpdateReservationStatus();
    const deleteReservationMutation = useDeleteReservation();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    if (isLoading) {
        return <LoadingState/>;
    }

    if (error || !reservation || !reservationId) {
        return (
            <MessageCard
                title="Reservering niet gevonden"
                message="Deze reservering bestaat niet of kon niet worden geladen."
                linkTo="/admin/reservations"
                linkText="Terug naar overzicht"
            />
        );
    }

    const currentReservationId = reservationId;

    function handleStatusSubmit(
        data: ReservationStatusFormData,
    ) {
        updateStatusMutation.mutate({
            reservationId: currentReservationId,
            status: data.status,
        });
    }

    function handleDelete() {
        deleteReservationMutation.mutate(currentReservationId , {
            onSuccess: () => {
                navigate("/admin/reservations", {
                    replace: true,
                });
            },
        });
    }

    return (
        <div className={styles.page}>
            <Link
                to="/admin/reservations"
                className={styles.backLink}
            >
                ← Terug naar reserveringen
            </Link>

            <PageHeader
                title={`Reservering van ${reservation.firstName} ${reservation.lastName}`}
                description={`Campingplaats: ${reservation.spot.name}`}
            />

            {updateStatusMutation.isError && (
                <MessageCard
                    title="Status kan niet worden bijgewerkt"
                    message="Probeer het later opnieuw."
                    linkTo="/admin/reservations"
                    linkText="Terug naar overzicht"
                />
            )}

            <div className={styles.content}>
                <AdminDetailSection
                    title="Reserveringsgegevens"
                    items={[
                        {
                            label: "Naam",
                            value: `${reservation.firstName} ${reservation.lastName}`
                        }, 
                        {
                            label: "Kampeerplaats",
                            value: reservation.spot.name
                        },
                        {
                            label: "E-mail",
                            value: (
                                <a href={`mailto:${reservation.email}`}>
                                    {reservation.email}
                                </a>
                            ),
                        },
                        {
                            label: "Telefoonnummer",
                            value: reservation.phone
                        },
                        {
                            label: "Aankomst",
                            value: formatDate(reservation.arrivalDate),
                        },
                        {
                            label: "Vertrek",
                            value: formatDate(reservation.departureDate),
                        },
                        {
                            label: "Aantal gasten",
                            value: reservation.guests,
                        }, 
                        {
                            label: "Status",
                            value: reservation.status,
                        },
                        {
                            label: "Opmerkingen",
                            value: `${reservation.notes || "Geen opmerkingen"}`,
                            preserveWhitespace: true,
                            fullWidth: true,
                        },
                    ]}
                />
                <aside className={styles.sidebar}>
                    <AdminStatusForm
                        defaultValue={reservation.status}
                        options={[
                            {
                                value: "PENDING",
                                label: "In behandeling"
                            },
                            {
                                value: "CONFIRMED",
                                label: "Bevestigd"
                            },
                            {
                                value: "CANCELLED",
                                label: "Geannuleerd"
                            },
                        ]}
                        isSubmitting={updateStatusMutation.isPending}
                        onSubmit={handleStatusSubmit}
                    />

                    <AdminDangerSection
                        title="Reservering verwijderen"
                        buttonLabel="Verwijderen"
                        description="Verwijder alleen testreserveringen, spam of foutieve dubbele reserveringen."
                        onClick={() => setIsDeleteModalOpen(true)}
                    />
                </aside>
            </div>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                title="Reservering verwijderen"
                message="Weet je zeker dat je deze reservering definitief wilt verwijderen?"
                itemName={`${reservation.firstName} ${reservation.lastName}`}
                isPending={
                    deleteReservationMutation.isPending
                }
                onClose={() =>
                    setIsDeleteModalOpen(false)
                }
                onConfirm={handleDelete}
            />
        </div>
    );
}
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
import ReservationStatusForm from "../components/ReservationStatusForm";

export default function AdminReservationDetailPage() {
    const { reservationId } = useParams();
    const navigate = useNavigate();

    const {
        data: reservation,
        isLoading,
        error,
    } = useAdminReservation(reservationId);

    const updateStatusMutation = useUpdateReservationStatus();
    const deleteReservationMutation = useDeleteReservation();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    if (isLoading) {
        return <p>Laden...</p>;
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
                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        Reserveringsgegevens
                    </h2>

                    <dl className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Naam
                            </dt>
                            <dd className={styles.value}>
                                {reservation.firstName}{" "}
                                {reservation.lastName}
                            </dd>
                        </div>

                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Campingplaats
                            </dt>
                            <dd className={styles.value}>
                                {reservation.spot.name}
                            </dd>
                        </div>
                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                E-mailadres
                            </dt>
                            <dd className={styles.value}>
                                <a href={`mailto:${reservation.email}`}>
                                    {reservation.email}
                                </a>
                            </dd>
                        </div>

                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Telefoonnummer
                            </dt>
                            <dd className={styles.value}>
                                <a href={`tel:${reservation.phone}`}>
                                    {reservation.phone}
                                </a>
                            </dd>
                        </div>

                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Aankomst
                            </dt>
                            <dd className={styles.value}>
                                {formatDate(reservation.arrivalDate)}
                            </dd>
                        </div>

                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Vertrek
                            </dt>
                            <dd className={styles.value}>
                                {formatDate(reservation.departureDate)}
                            </dd>
                        </div>

                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Aantal gasten
                            </dt>
                            <dd className={styles.value}>
                                {reservation.guests}
                            </dd>
                        </div>

                        <div className={styles.detailItem}>
                            <dt className={styles.label}>
                                Status
                            </dt>
                            <dd className={styles.value}>
                                {reservation.status}
                            </dd>
                        </div>

                        <div
                            className={`${styles.detailItem} ${styles.fullWidth}`}
                        >
                            <dt className={styles.label}>
                                Opmerkingen
                            </dt>
                            <dd
                                className={`${styles.value} ${styles.notes}`}
                            >
                                {reservation.notes ||
                                    "Geen opmerkingen"}
                            </dd>
                        </div>
                    </dl>
                </section>

                <aside className={styles.sidebar}>
                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>
                            Status beheren
                        </h2>

                        <ReservationStatusForm
                            defaultValues={{
                                status: reservation.status,
                            }}
                            isSubmitting={
                                updateStatusMutation.isPending
                            }
                            onSubmit={handleStatusSubmit}
                        />
                    </section>

                    <section
                        className={`${styles.card} ${styles.dangerCard}`}
                    >
                        <h2 className={styles.dangerTitle}>
                            Reservering verwijderen
                        </h2>

                        <p className={styles.dangerText}>
                            Verwijder alleen testreserveringen,
                            spam of foutieve dubbele reserveringen.
                            Gebruik voor een echte annulering de
                            status ‘Geannuleerd’.
                        </p>

                        <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={() =>
                                setIsDeleteModalOpen(true)
                            }
                        >
                            Reservering verwijderen
                        </button>
                    </section>
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
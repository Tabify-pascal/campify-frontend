import { Link } from "react-router-dom";
import { useState } from "react";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import Pagination from "../../../../components/ui/Pagination/Pagination";

import type { AdminReservation } from "../types/AdminReservation";
import { useAdminReservations } from "../queries/useAdminReservations";
import { usePagination } from "../../../../hooks/usePagination";
import { useDeleteReservation } from "../mutations/useDeleteReservation";
import { formatDate } from "../../../../utils/formatDate";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";

import { Trash2, Pencil } from "lucide-react";

import styles from "../../AdminIndexPage.module.css";
import statusStyles from "./AdminStatusDisplay.module.css";



export default function AdminReservationsPage() {
    const {
        data: reservations = [],
        isLoading,
        error,
    } = useAdminReservations();

    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
    } = usePagination({
        items: reservations,
        itemsPerPage: 5,
    });

    const [reservationToDelete, setReservationToDelete] = useState<AdminReservation | null>(null);
    const deleteReservation = useDeleteReservation();

    function handleConfirmDelete() {
        if (!reservationToDelete) {
            return;
        }

        deleteReservation.mutate(reservationToDelete.id, {
            onSuccess: () => {
                setReservationToDelete(null);
            },
        });
    }

    if (isLoading) {
        return <p>Laden...</p>
    }

    if (error) {
        return (
            <MessageCard
                title="Reserveringen konden niet worden geladen."
                message="Probeer het later opnieuw"
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Reserveringen beheren"
                description="Beheer alle reserveringen."
            />
            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Spot</th>
                            <th>Aankomst</th>
                            <th>Vertrek</th>
                            <th>Gasten</th>
                            <th>Status</th>
                            <th>Acties</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedItems.length === 0 ? (
                            <tr>
                                <td colSpan={6}>
                                    Er zijn nog geen reserveringen.
                                </td>
                            </tr>
                        ) : (

                            paginatedItems.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td>{reservation.spot.name}</td>
                                    <td>
                                        {formatDate(reservation.arrivalDate)}
                                    </td>

                                    <td>
                                        {formatDate(reservation.departureDate)}
                                    </td>
                                    <td>{reservation.guests}</td>
                                    <td>
                                        <span className={`${statusStyles.status} ${statusStyles[
                                            reservation.status.toLowerCase() as
                                            | "pending"
                                            | "confirmed"
                                            | "cancelled"
                                        ]
                                            }`}>{reservation.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.rowActions}>
                                            <Link to={`/admin/reservations/${reservation.id}`} >
                                                <Pencil size={18} />
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => setReservationToDelete(reservation)}
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
                <div className={styles.pagination}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                    />
                </div>
            </div>
            <DeleteModal
                isOpen={reservationToDelete !== null}
                title="Reservering verwijderen"
                message="Weet je zeker dat je deze reservering definitief wilt verwijderen?"
                itemName={
                    reservationToDelete
                        ? `${reservationToDelete.firstName} ${reservationToDelete.lastName}`
                        : undefined
                }
                isPending={deleteReservation.isPending}
                onClose={() => setReservationToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}

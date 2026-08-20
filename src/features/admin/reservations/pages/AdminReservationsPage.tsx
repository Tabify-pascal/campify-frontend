import { useState } from "react";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import { formatDate } from "../../../../utils/formatDate";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";

import AdminTable from "../../components/AdminTable/AdminTable";
import AdminStatusBadge from "../../components/AdminStatusBadge/AdminStatusBadge";
import AdminViewButton from "../../components/AdminActionButton/AdminViewButton";
import AdminDeleteButton from "../../components/AdminActionButton/AdminDeleteButton";
import { usePagination } from "../../../../hooks/usePagination";

import { useAdminReservations } from "../queries/useAdminReservations";
import { useDeleteReservation } from "../mutations/useDeleteReservation";

import type { AdminReservation } from "../types/AdminReservation";

import styles from "../../AdminIndexPage.module.css";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";

const columns = [
    {key: "spot", label: "Spot"},
    {key: "arrivalDate", label: "Aankomst"},
    {key: "guests", label: "Gasten"},
    {key: "status", label: "Status"},
    {key: "actions", label: "Acties"}
];

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
        return <LoadingState/>;
    }

    if (error) {
        return (
            <MessageCard
                title="Reserveringen konden niet worden geladen."
                message="Probeer het later opnieuw"
                linkTo="/admin"
                linkText="Terug naar het dashboard"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Reserveringen beheren"
                description="Beheer alle reserveringen."
            />

            <AdminTable
                columns={columns}
                items={paginatedItems}
                getKey={(reservation) => reservation.id}
                emptyMessage="Er zijn nog geen reserveringen."
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: goToPage
                }}
                renderRow={(reservation) => (
                    <>
                        <td>{reservation.spot.name}</td>
                        <td>{formatDate(reservation.arrivalDate)}</td>
                        <td>{reservation.guests}</td>
                        <td><AdminStatusBadge status={reservation.status}/></td>
                        <td>
                            <div className={styles.rowActions}>
                                <AdminViewButton
                                    to={`/admin/reservations/${reservation.id}`}
                                    label="Reservering bekijken"
                                />
                                <AdminDeleteButton
                                    onClick={() => setReservationToDelete(reservation)}
                                    label="Reservering verwijderen"
                                />
                            </div>
                        </td>
                    </>
                )}
            />
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
    );
}

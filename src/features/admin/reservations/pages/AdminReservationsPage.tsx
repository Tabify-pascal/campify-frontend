import { useState } from "react";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";
import { formatDate } from "../../../../utils/formatDate";
import { usePagination } from "../../../../hooks/usePagination";

import AdminTable from "../../components/AdminTable/AdminTable";
import AdminStatusBadge from "../../components/AdminStatusBadge/AdminStatusBadge";
import AdminViewButton from "../../components/AdminActionButton/AdminViewButton";
import AdminDeleteButton from "../../components/AdminActionButton/AdminDeleteButton";

import { useAdminReservations } from "../queries/useAdminReservations";
import { useDeleteReservation } from "../mutations/useDeleteReservation";

import type { AdminReservation } from "../types/AdminReservation";
import type { ReservationStatus } from "../../../reservations/types/ReservationStatus";

import styles from "../../AdminIndexPage.module.css";

const columns = [
    { key: "name", label: "Naam" },
    { key: "spot", label: "Spot" },
    { key: "arrivalDate", label: "Aankomst" },
    { key: "guests", label: "Gasten" },
    { key: "status", label: "Status" },
    { key: "source", label: "Bron" },
    { key: "actions", label: "Acties" },
];

type StatusFilter = ReservationStatus | "ALL";
type SourceFilter = "CAMPIFY" | "BLOOKERS" | "ALL";

export default function AdminReservationsPage() {
    const {
        data: reservations = [],
        isLoading,
        error,
    } = useAdminReservations();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("ALL");
    const [sourceFilter, setSourceFilter] =
        useState<SourceFilter>("ALL");

    const [reservationToDelete, setReservationToDelete] =
        useState<AdminReservation | null>(null);

    const deleteReservation = useDeleteReservation();

    const searchTerm = search.trim().toLowerCase();

    const filteredReservations = reservations.filter(
        (reservation) => {
            const fullName =
                `${reservation.firstName} ${reservation.lastName}`
                    .toLowerCase();

            const matchesSearch =
                !searchTerm ||
                fullName.includes(searchTerm) ||
                reservation.firstName
                    .toLowerCase()
                    .includes(searchTerm) ||
                reservation.lastName
                    .toLowerCase()
                    .includes(searchTerm) ||
                reservation.id
                    .toLowerCase()
                    .includes(searchTerm) ||
                (reservation.externalReservationId ?? "")
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesStatus =
                statusFilter === "ALL" ||
                reservation.status === statusFilter;

            const matchesSource =
                sourceFilter === "ALL" ||
                reservation.source === sourceFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesSource
            );
        }
    );

    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
    } = usePagination({
        items: filteredReservations,
        itemsPerPage: 5,
    });

    function handleConfirmDelete() {
        if (!reservationToDelete) {
            return;
        }

        deleteReservation.mutate(
            reservationToDelete.id,
            {
                onSuccess: () => {
                    setReservationToDelete(null);
                },
            }
        );
    }

    function handleSearchChange(value: string) {
        setSearch(value);
        goToPage(1);
    }

    function handleStatusChange(value: StatusFilter) {
        setStatusFilter(value);
        goToPage(1);
    }

    function handleSourceChange(value: SourceFilter) {
        setSourceFilter(value);
        goToPage(1);
    }

    if (isLoading) {
        return <LoadingState />;
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
                description="Zoek en beheer alle reserveringen."
            />

            <div className={styles.filters}>
                <input
                    type="search"
                    placeholder="Zoek op naam of reserveringsnummer..."
                    aria-label="Reserveringen zoeken"
                    value={search}
                    onChange={(event) =>
                        handleSearchChange(event.target.value)
                    }
                />

                <select
                    aria-label="Filter op status"
                    value={statusFilter}
                    onChange={(event) =>
                        handleStatusChange(
                            event.target.value as StatusFilter
                        )
                    }
                >
                    <option value="ALL">Alle statussen</option>
                    <option value="PENDING">In behandeling</option>
                    <option value="CONFIRMED">Bevestigd</option>
                    <option value="CANCELLED">Geannuleerd</option>
                    <option value="COMPLETED">Afgerond</option>
                </select>

                <select
                    aria-label="Filter op bron"
                    value={sourceFilter}
                    onChange={(event) =>
                        handleSourceChange(
                            event.target.value as SourceFilter
                        )
                    }
                >
                    <option value="ALL">Alle bronnen</option>
                    <option value="CAMPIFY">Campify</option>
                    <option value="BLOOKERS">Blookers</option>
                </select>
            </div>

            <p className={styles.resultCount}>
                {filteredReservations.length} reserveringen gevonden
            </p>

            <AdminTable
                columns={columns}
                items={paginatedItems}
                getKey={(reservation) => reservation.id}
                emptyMessage="Geen reserveringen gevonden."
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: goToPage,
                }}
                renderRow={(reservation) => (
                    <>
                        <td>
                            {reservation.firstName}{" "}
                            {reservation.lastName}
                        </td>

                        <td>{reservation.spot.name}</td>

                        <td>
                            {formatDate(reservation.arrivalDate)}
                        </td>

                        <td>{reservation.guests}</td>

                        <td>
                            <AdminStatusBadge
                                status={reservation.status}
                            />
                        </td>

                        <td>
                            <span
                                className={
                                    reservation.source === "BLOOKERS"
                                        ? styles.blookersBadge
                                        : styles.campifyBadge
                                }
                            >
                                {reservation.source === "BLOOKERS"
                                    ? "Blookers"
                                    : "Campify"}
                            </span>
                        </td>

                        <td>
                            <div className={styles.rowActions}>
                                <AdminViewButton
                                    to={`/admin/reservations/${reservation.id}`}
                                    label="Reservering bekijken"
                                />

                                <AdminDeleteButton
                                    onClick={() =>
                                        setReservationToDelete(reservation)
                                    }
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
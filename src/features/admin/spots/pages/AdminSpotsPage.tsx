import { useState } from "react";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import Button from "../../../../components/ui/Button";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";
import { usePagination } from "../../../../hooks/usePagination";

import AdminTable from "../../components/AdminTable/AdminTable";
import AdminEditButton from "../../components/AdminActionButton/AdminEditButton";
import AdminDeleteButton from "../../components/AdminActionButton/AdminDeleteButton";

import { useSpots } from "../../../spots/queries/useSpots";
import { useDeleteSpot } from "../mutations/useDeleteSpot";

import type { Spot } from "../../../spots/types/Spot";

import styles from "../../AdminIndexPage.module.css";

const columns = [
    {key: "name", label: "Naam"},
    {key: "capacity", label: "Capaciteit"},
    {key: "price", label: "Prijs"},
    {key: "size", label: "Oppervlakte"},
    {key: "actions", label: "Acties"},
];

export default function AdminSpotsPage() {
    const { data: spots = [], isLoading, error } = useSpots();
    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
    } = usePagination({
        items: spots,
        itemsPerPage: 5,
    });

    const [spotToDelete, setSpotToDelete ] = useState<Spot | null>(null);
    const deleteSpot = useDeleteSpot();

        function handleConfirmDelete() {
        if (!spotToDelete) {
            return;
        }

        deleteSpot.mutate(spotToDelete.id, {
            onSuccess: () => {
                setSpotToDelete(null);
            },
        });
    }

    if (isLoading) return <p>Laden...</p>;

    if (error) {
        return (
            <MessageCard
                title="Campingplaatsen konden niet worden geladen"
                message="Probeer het later opnieuw."
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Campingplaatsen beheren"
                description="Beheer campingplaatsen: toevoegen, aanpassen en verwijderen"
            />

            <div className={styles.actions}>
                <Button to="/admin/spots/new">Nieuwe plek toevoegen</Button>
            </div>

            <AdminTable
                columns={columns}
                items={paginatedItems}
                getKey={(spot) => spot.id}
                emptyMessage="Er zijn nog geen kampeerplaatsen."
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: goToPage,
                }}
                renderRow={(spot) => (
                    <>
                        <td>{spot.name}</td>
                        <td>{spot.capacity}</td>
                        <td>€ {spot.pricePerNight}</td>
                        <td>{spot.size}</td>
                        <td>
                            <div className={styles.rowActions}>
                                <AdminEditButton
                                    to={`/admin/spots/${spot.id}/edit`}
                                    label="Kampeerplaats bewerken"
                                />
                                <AdminDeleteButton
                                    onClick={()=> setSpotToDelete(spot)}
                                    label="Kampeerplaats verwijderen"
                                />
                            </div>
                        </td>
                    </>
                )}
            />
            <DeleteModal
                isOpen={spotToDelete !== null}
                title="Kampeerplaats verwijderen"
                message="Weet je zeker dat je deze kampeerplaats wilt verwijderen?"
                itemName={spotToDelete?.name}
                isPending={deleteSpot.isPending}
                onClose={() => setSpotToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}

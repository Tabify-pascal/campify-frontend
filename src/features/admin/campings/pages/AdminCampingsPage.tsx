import { useState } from "react";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import Button from "../../../../components/ui/Button";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";
import { usePagination } from "../../../../hooks/usePagination";

import AdminTable from "../../components/AdminTable/AdminTable";
import AdminEditButton from "../../components/AdminActionButton/AdminEditButton";
import AdminDeleteButton from "../../components/AdminActionButton/AdminDeleteButton";

import { useAdminCampings } from "../queries/useAdminCampings";
import { useDeleteCamping } from "../mutations/useDeleteCamping";
import { getImageUrl } from "../../../../utils/getImageUrl";

import type { Camping } from "../../../campings/types/Camping";

import styles from "../../components/AdminIndex/AdminIndex.module.css";


const columns = [
    { key: "logo", label: "Logo" },
    { key: "name", label: "Naam" },
    { key: "slug", label: "Slug" },
    { key: "description", label: "Beschrijving" },
    { key: "actions", label: "Acties" },
];

export default function AdminCampingsPage() {
    const {
        data: campings = [],
        isLoading,
        error,
    } = useAdminCampings();

    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
    } = usePagination({
        items: campings,
        itemsPerPage: 6,
    });

    const [
        campingToDelete,
        setCampingToDelete,
    ] = useState<Camping | null>(null);

    const deleteCampingMutation =
        useDeleteCamping();

    function handleConfirmDelete() {
        if (!campingToDelete) {
            return;
        }

        deleteCampingMutation.mutate(
            campingToDelete.id,
            {
                onSuccess: () => {
                    setCampingToDelete(null);
                },
            }
        );
    }

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return (
            <MessageCard
                title="Campings konden niet worden geladen"
                message="Probeer het later opnieuw"
                linkTo="/admin"
                linkText="Terug naar het dashboard"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Campings beheren"
                description="Beheer de campings binnen Campify."
            />

            <div className={styles.actions}>
                <Button to="/admin/campings/new">
                    Nieuwe camping toevoegen
                </Button>
            </div>

            <AdminTable
                columns={columns}
                items={paginatedItems}
                getKey={(camping) => camping.id}
                emptyMessage="Er zijn nog geen campings."
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: goToPage,
                }}
                renderRow={(camping) => (
                    <>
                        <td>
                            {camping.logoUrl ? (
                                <img
                                    src={getImageUrl(camping.logoUrl)}
                                    alt=""
                                    className={styles.logo}
                                />
                            ) : (
                                "—"
                            )}
                        </td>
                        <td>{camping.name}</td>
                        <td>{camping.slug}</td>
                        <td>
                            {camping.description ||
                                "Geen beschrijving"}
                        </td>
                        <td>
                            <div
                                className={
                                    styles.rowActions
                                }
                            >
                                <AdminEditButton
                                    to={`/admin/campings/${camping.id}/edit`}
                                    label="Camping bewerken"
                                />

                                <AdminDeleteButton
                                    onClick={() =>
                                        setCampingToDelete(
                                            camping
                                        )
                                    }
                                    label="Camping verwijderen"
                                />
                            </div>
                        </td>
                    </>
                )}
            />

            <DeleteModal
                isOpen={campingToDelete !== null}
                title="Camping verwijderen"
                message="Weet je zeker dat je deze camping wilt verwijderen?"
                itemName={campingToDelete?.name}
                isPending={
                    deleteCampingMutation.isPending
                }
                onClose={() =>
                    setCampingToDelete(null)
                }
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
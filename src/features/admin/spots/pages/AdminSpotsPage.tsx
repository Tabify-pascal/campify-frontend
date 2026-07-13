import { Link } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import Button from "../../../../components/ui/Button";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import { useSpots } from "../../../spots/queries/useSpots";
import { useDeleteSpot } from "../mutations/useDeleteSpot";

import styles from "./AdminSpotsPage.module.css";

export default function AdminSpotsPage() {
    const { data: spots = [], isLoading, error } = useSpots();
    const deleteSpotMutation = useDeleteSpot();

    if (isLoading) return <p>Laden...</p>;

    if (error) {
        return (
            <MessageCard
                title="Campingplaatsen konden niet worden geladen"
                message="Probeer het later opniew."
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Admin campingplaatsen"
                description="Beheer campingplaatsen: toevoegen, aanpassen en verwijderen"
            />

            <div className={styles.actions}>
                <Button to="/admin/spots/new">Nieuwe plek toevoegen</Button>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Capaciteit</th>
                            <th>Prijs</th>
                            <th>Oppervalkte</th>
                            <th>Acties</th>
                        </tr>
                    </thead>

                    <tbody>
                        {spots.map((spot) => (
                            <tr key={spot.id}>
                                <td>{spot.name}</td>
                                <td>{spot.capacity} personen</td>
                                <td>€ {spot.pricePerNight}</td>
                                <td>{spot.size}m²</td>
                                <td>
                                    <div className={styles.rowActions}>
                                        <Link to={`/admin/spots/${spot.id}/edit`}>
                                            Bewerken 
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => deleteSpotMutation.mutate(spot.id)}
                                            disabled={deleteSpotMutation.isPending}
                                        >
                                            Verwijderen
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
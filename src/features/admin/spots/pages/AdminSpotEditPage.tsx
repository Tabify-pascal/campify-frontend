import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import { useSpot } from "../../../spots/queries/useSpot";
import SpotForm from "../components/SpotForm";
import { useUpdateSpot } from "../mutations/useUpdateSpot";

import type { SpotFormData } from "../schemas/spotSchema";

export default function AdminSpotEditPage() {
    const { spotId } = useParams();
    const navigate = useNavigate();

    const {
        data: spot,
        isLoading,
        error,
    } = useSpot(spotId);

    const updateSpotMutation = useUpdateSpot();

    if (isLoading) {
        return <p>Laden...</p>;
    }

    if (error || !spot || !spotId) {
        return (
            <MessageCard
                title="Campingplaats niet gevonden"
                message="Deze campingplaats bestaat niet of kon niet worden geladen."
                linkTo="/admin/spots"
                linkText="Terug naar overzicht"
            />
        );
    }


    function handleSubmit(data: SpotFormData) {
        updateSpotMutation.mutate(
            {
                id: spotId!,
                data,
            },
            {
                onSuccess: () => {
                    navigate("/admin/spots");
                },
            }
        );
    }

    return (
        <>
            <PageHeader
                title={`Bewerk ${spot.name}`}
                description="Pas de gegevens van deze campingplaats aan/"
            />

            {updateSpotMutation.isError && (
                <MessageCard
                    title="Wijzigingen konden niet worden opgeslagen"
                    message="Controleer de ingevulde gegevens en probeer opnieuw."
                    linkTo="admin/spots"
                    linkText="Terug naar overzicht"
                />
            )}
            <SpotForm
                defaultValues={{
                    name: spot.name,
                    description: spot.description,
                    capacity: spot.capacity,
                    pricePerNight: spot.pricePerNight,
                    size: spot.size,
                    imageUrl: spot.imageUrl,
                    electricity: spot.electricity,
                    waterConnection: spot.waterConnection,
                }}
                onSubmit={handleSubmit}
                isSubmitting={updateSpotMutation.isPending}
                submitLabel="Wijzigingen opslaan"
            />
        </>
    )
}
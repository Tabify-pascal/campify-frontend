import { useNavigate } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import SpotForm from "../components/SpotForm";
import { useCreateSpot } from "../mutations/useCreateSpot";
import type { SpotFormData } from "../schemas/spotSchema";

export default function AdminSpotCreatePage() {
    const navigate = useNavigate();
    const createSpotMutation = useCreateSpot();

    function handleSubmit(data: SpotFormData) {
        createSpotMutation.mutate(data, {
            onSuccess: () => {
                navigate("/admin/spots");
            },
        });
    }

    return (
        <>
            <PageHeader
                title="Nieuwe campingplaats"
                description="Voeg een nieuwe campingplaats toe aan het aanbod."
            />

            {createSpotMutation.isError && (
                <MessageCard
                    title="Campingplaats"
                    message="Controleer de ingevulde gegevens en probeer het opnieuw."
                    linkTo="/admin/spots"
                    linkText="Terug naar overzicht"
                />
            )}

            <SpotForm
                onSubmit={handleSubmit}
                isSubmitting={createSpotMutation.isPending}
                submitLabel="Campingplaats toevoegen"
            />

        </>
    );
}


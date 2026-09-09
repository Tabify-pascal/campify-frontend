import { useNavigate } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import SpotForm from "../components/SpotForm";
import { useCreateSpot } from "../mutations/useCreateSpot";
import type { SpotFormData } from "../schemas/spotSchema";
import { useAdminCampings } from "../../campings/queries/useAdminCampings";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";

export default function AdminSpotCreatePage() {
    const navigate = useNavigate();
    const createSpotMutation = useCreateSpot();
    const {
        data: campings = [],
        isLoading: isCampingsLoading,
    } = useAdminCampings();

    function handleSubmit(data: SpotFormData) {
         if (!data.image?.[0]) {
            return;
        }
        createSpotMutation.mutate(data, {
            onSuccess: () => {
                navigate("/admin/spots");
            },
        });
    }

    if (isCampingsLoading) {
        return <LoadingState />;
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
                campings={campings}
                onSubmit={handleSubmit}
                isSubmitting={createSpotMutation.isPending}
                submitLabel="Campingplaats toevoegen"
                requireImage
            />
        </>
    );
}


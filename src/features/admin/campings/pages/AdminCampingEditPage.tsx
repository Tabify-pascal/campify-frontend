import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";

import CampingForm from "../components/CampingForm";

import { useAdminCamping } from "../queries/useAdminCamping";
import { useUpdateCamping } from "../mutations/useUpdateCamping";
import { getImageUrl } from "../../../../utils/getImageUrl";

import type { CampingFormData } from "../schemas/campingSchema";

export default function AdminCampingEditPage() {
    const { campingId } = useParams();
    const navigate = useNavigate();

    const {
        data: camping,
        isLoading,
        error,
    } = useAdminCamping(campingId);

    const updateCampingMutation = useUpdateCamping();

    if (isLoading) {
        return <LoadingState message="Camping laden..." />;
    }

    if (error || !camping || !campingId) {
        return (
            <MessageCard
                title="Camping niet gevonden"
                message="Deze camping bestaat niet of kon niet worden geladen."
                linkTo="/admin/campings"
                linkText="Terug naar overzicht"
            />
        );
    }

    function handleSubmit(data: CampingFormData) {
        updateCampingMutation.mutate(
            {
                id: campingId!,
                data,
            },
            {
                onSuccess: () => {
                    navigate("/admin/campings");
                },
            }
        );
    }

    return (
        <>
            <PageHeader
                title={`Bewerk ${camping.name}`}
                description="Pas de gegevens van deze camping aan."
            />

            {updateCampingMutation.isError && (
                <MessageCard
                    title="Wijzigingen konden niet worden opgeslagen"
                    message="Controleer de ingevulde gegevens en probeer opnieuw."
                    linkTo="/admin/campings"
                    linkText="Terug naar overzicht"
                />
            )}

            <CampingForm
                defaultValues={{
                    name: camping.name,
                    slug: camping.slug,
                    description: camping.description ?? "",
                }}
                currentLogoUrl={
                    camping.logoUrl
                        ? getImageUrl(camping.logoUrl)
                        : undefined
                }
                onSubmit={handleSubmit}
                isSubmitting={updateCampingMutation.isPending}
                submitLabel="Wijzigingen opslaan"
            />
        </>
    );
}
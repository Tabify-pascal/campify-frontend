import { useNavigate } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import CampingForm from "../components/CampingForm";
import { useCreateCamping } from "../mutations/useCreateCamping";

import type { CampingFormData } from "../schemas/campingSchema";

export default function AdminCampingCreatePage() {
    const navigate = useNavigate();
    const createCampingMutation = useCreateCamping();

    function handleSubmit(data: CampingFormData) {
        createCampingMutation.mutate(data, {
            onSuccess: () => {
                navigate("/admin/campings");
            },
        });
    }

    return (
        <>
            <PageHeader
                title="Nieuwe camping"
                description="Voeg een nieuwe camping toe."
            />

            {createCampingMutation.isError && (
                <MessageCard
                    title="Camping kon niet worden toegevoegd"
                    message="Controleer de ingevulde gegevens en probeer opnieuw."
                    linkTo="/admin/campings"
                    linkText="Terug naar overzicht"
                />
            )}

            <CampingForm
                onSubmit={handleSubmit}
                isSubmitting={createCampingMutation.isPending}
                submitLabel="Camping toevoegen"
            />
        </>
    );
}
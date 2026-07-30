import { useNavigate } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import FaqForm from "../components/FaqForm";
import { useCreateFaq } from "../mutations/useCreateFaq";
import type { FaqFormData } from "../schemas/faqSchema";

export default function AdminFaqCreatePage(){
    const navigate = useNavigate();
    const createFaqMutation = useCreateFaq();

    function handleSubmit(data: FaqFormData){
        createFaqMutation.mutate(data, {
            onSuccess: () => {
                navigate("/admin/faqs");
            },
        });    
    }

    return (
        <>
            <PageHeader
                title="Nieuwe Vraag"
                description="Maak een nieuwe veelgestelde vraag aan"
            />
            {createFaqMutation.isError && (
                <MessageCard
                    title="De vraag kon niet worden toegevoegd"
                    message="Controleer de ingevulde gegevens en probeer opnieuw"
                    linkTo="/admin/faqs"
                    linkText="Terug naar overzicht"
                />
            )}

            <FaqForm
                onSubmit={handleSubmit}
                isSubmitting={createFaqMutation.isPending}
                submitLabel="Nieuwe vraag toevoegen"
            />
        </>
    )
}


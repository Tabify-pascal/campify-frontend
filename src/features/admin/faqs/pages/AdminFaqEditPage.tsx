import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import { useAdminFaq } from "../queries/useAdminFaq";
import FaqForm from "../components/FaqForm";
import { useUpdateFaq } from "../mutations/useUpdateFaq";
import type { FaqFormData } from "../schemas/faqSchema";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";

export default function AdminFaqEditPage(){
    const { faqId } = useParams();
    const navigate = useNavigate();

    const {
        data: faq,
        isLoading,
        error,
    } = useAdminFaq(faqId);

    const updateFaqMutation = useUpdateFaq();

    if(isLoading) {
        return <LoadingState message="FAQ's laden..." />;
    }

    if(error || !faq || !faqId) {
        return (
            <MessageCard
                title="Vraag niet gevonden"
                message="Deze vraag bestaat niet of kon niet worden geladen"
                linkTo="/admin/faqs"
                linkText="Terug naar overzicht"
            />
        );
    }

    function handleSubmit(data: FaqFormData){
        updateFaqMutation.mutate(
            {
                id: faqId!,
                data,
            },
            {
                onSuccess: () => {
                    navigate("/admin/faqs");
                },
            }
        );
    }

    return (
        <>
            <PageHeader
                title={`Bewerk ${faq.question}`}
                description="Pas deze vraag aan."
            />

            {updateFaqMutation.isError && (
                <MessageCard
                    title="Wijzigingen konden niet worden opgeslagen"
                    message="Controleer de ingevulde gegevens en probeer opnieuw."
                    linkTo="/admin/faqs"
                    linkText="Terug naar overzicht"
                />
            )}

            <FaqForm
                defaultValues={{
                    question: faq.question,
                    answer: faq.answer
                }}
                onSubmit={handleSubmit}
                isSubmitting={updateFaqMutation.isPending}
                submitLabel="Wijzigingen opslaan"
            />
        </>
    )
}


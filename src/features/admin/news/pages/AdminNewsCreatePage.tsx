import { useNavigate } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import NewsForm from "../components/NewsForm";
import { useCreateNews } from "../mutations/useCreateNews";
import type { NewsFormData } from "../schemas/newsSchema";

export default function AdminNewsCreatePage() {
    const navigate = useNavigate();
    const createNewsMutation = useCreateNews();

    function handleSubmit(data: NewsFormData) {
        if (!data.image?.[0]) {
            return;
        }
        createNewsMutation.mutate(data, {
            onSuccess: () => {
                navigate("/admin/news");
            },
        });
    }

    return (
        <>
            <PageHeader
                title="Nieuw nieuws item"
                description="Maak een nieuw nieuws item aan."
            />
            {createNewsMutation.isError && (
                <MessageCard
                    title="Nieuws Item"
                    message="Controleer de ingevulde gegevens en probeer opnieuw."
                    linkTo="/admin/news"
                    linkText="Terug naar overzicht"
                />
            )}
            <NewsForm
                onSubmit={handleSubmit}
                isSubmitting={createNewsMutation.isPending}
                submitLabel="Nieuws item toevoegen"
                requireImage
            />
        </>
    )

}


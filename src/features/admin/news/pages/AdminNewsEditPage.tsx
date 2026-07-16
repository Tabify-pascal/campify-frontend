
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import { useNewsItem } from "../../../news/queries/useNewsItem";
import NewsForm from "../components/NewsForm";
import { useUpdateNews } from "../mutations/useUpdateNews";

import type { NewsFormData } from "../schemas/newsSchema";
import { getImageUrl } from "../../../../utils/getImageUrl";

export default function AdminNewsEditPage(){
    const { newsId } = useParams();
    const navigate = useNavigate();

    const {
        data: news,
        isLoading,
        error,
    } = useNewsItem(newsId);

    const updateNewsMutation = useUpdateNews();

    if (isLoading) {
        return <p>Laden...</p>;
    }

    if (error || !news || !newsId) {
        return (
            <MessageCard
                title="Nieuws item niet gevonden"
                message="Dit nieuws item kon niet worden geladen."
                linkTo="/admin/news"
                linkText="Terug naar overzicht"
            />
        );
    }

    function handleSubmit(data: NewsFormData) {
        updateNewsMutation.mutate(
            {
                id: newsId!,
                data,
            },
            {
                onSuccess: () => {
                    navigate("/admin/news");
                },
            }
        );
    }

    return (
        <>
        <PageHeader
            title={`Bewerk ${news.title}`}
            description="Pas de gegevens van dit nieuws item aan."
        />

        {updateNewsMutation.isError && (
            <MessageCard
                title="Wijzigingen konden niet worden opgeslagen."
                message="Controleer de ingevulde gegevens en probeer opnieuw."
                linkTo="/admin/news"
                linkText="Terug naar overzicht"
            />
        )}

        <NewsForm
            defaultValues={{
                title: news.title,
                excerpt: news.excerpt,
                content: news.content,
                date: news.date.slice(0, 10),
            }}
            currentImageUrl={getImageUrl(news.imageUrl)}
            onSubmit={handleSubmit}
            isSubmitting={updateNewsMutation.isPending}
            submitLabel="Wijzigingen opslaan"
            />
        </>
    );
}


import { Link } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import Button from "../../../../components/ui/Button";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";

import { useNewsItems } from "../../../news/queries/useNewsItems";
import { useDeleteNews } from "../mutations/useDeleteNews";

import { formatDate } from "../../../../utils/formatDate";

import styles from "./AdminNewsPage.module.css";

export default function AdminNewsPage() {
    const {
        data: newsItems = [],
        isLoading,
        error,
    } = useNewsItems();

    const deleteNewsMutation = useDeleteNews();

    if (isLoading) {
        return <p>Laden...</p>;
    }

    if (error) {
        return (
            <MessageCard
                title="Nieuws kon niet worden geladen"
                message="Probeer het later opnieuw"
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Admin nieuws"
                description="Beheer alle nieuwsberichten."
            />

            <div className={styles.actions}>
                <Button to="/admin/news/new">
                    Nieuw bericht toevoegen
                </Button>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Titel</th>
                            <th>Datum</th>
                            <th>Acties</th>
                        </tr>
                    </thead>

                    <tbody>
                        {newsItems.map((newsItem) => (
                            <tr key={newsItem.id}>
                                <td>{newsItem.title}</td>

                                <td>{formatDate(newsItem.date)}</td>

                                <td>
                                    <div className={styles.rowActions}>
                                        <Link
                                            to={`/admin/news/${newsItem.id}/edit`}
                                        >
                                            Bewerken
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteNewsMutation.mutate(newsItem.id)
                                            }
                                            disabled={deleteNewsMutation.isPending}
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
    )

}
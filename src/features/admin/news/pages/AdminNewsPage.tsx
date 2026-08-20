import { useState } from "react";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import Button from "../../../../components/ui/Button";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";
import { formatDate } from "../../../../utils/formatDate";
import { usePagination } from "../../../../hooks/usePagination";

import AdminTable from "../../components/AdminTable/AdminTable";
import AdminEditButton from "../../components/AdminActionButton/AdminEditButton";
import AdminDeleteButton from "../../components/AdminActionButton/AdminDeleteButton";

import { useNewsItems } from "../../../news/queries/useNewsItems";
import { useDeleteNews } from "../mutations/useDeleteNews";

import type { NewsItem } from "../../../news/types/NewsItem";

import styles from "../../AdminIndexPage.module.css";
import LoadingState from "../../../../components/ui/LoadingState/LoadingState";

const columns = [
        { key: "title", label: "Titel"},
        { key: "date", label: "Datum"},
        { key: "actions", label: "Acties"},
    ];

export default function AdminNewsPage() {
    
    const {
        data: newsItems = [],
        isLoading,
        error,
    } = useNewsItems();

    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
    } = usePagination({
        items: newsItems,
        itemsPerPage: 5,
    });

    const [newsItemToDelete, setNewsItemToDelete] = useState<NewsItem | null>(null);
    const deleteNews = useDeleteNews();

    function handleConfirmDelete() {
        if (!newsItemToDelete){
            return
        }
        deleteNews.mutate(newsItemToDelete.id, {
            onSuccess: () => {
                setNewsItemToDelete(null);
            }
        });
    }

    if (isLoading) {
        return <LoadingState/>;
    }

    if (error) {
        return (
            <MessageCard
                title="Nieuws kon niet worden geladen"
                message="Probeer het later opnieuw."
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Nieuwsberichten beheren"
                description="Beheer alle nieuwsberichten."
            />

            <div className={styles.actions}>
                <Button to="/admin/news/new">
                    Nieuw bericht toevoegen
                </Button>
            </div>

            <AdminTable
                columns={columns}
                items={paginatedItems}
                getKey={(newsItem) => newsItem.id}
                emptyMessage="Er zijn nog geen nieuws items."
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: goToPage,
                }}
                renderRow={(newsItem) => (
                    <>
                        <td>{newsItem.title}</td>
                        <td>{formatDate(newsItem.date)}</td>
                        <td>
                            <div className={styles.rowActions}>
                                <AdminEditButton
                                    to={`/admin/news/${newsItem.id}/edit`}
                                    label="Nieuwsbericht bewerken"
                                />
                                <AdminDeleteButton 
                                    onClick={() => setNewsItemToDelete(newsItem)}
                                    label="Nieuws bericht verwijderen"
                                />
                            </div>
                        </td>
                    </>
                )}
            />
             <DeleteModal
                isOpen={newsItemToDelete !== null}
                title="Nieuws bericht verwijderen"
                message="Weet je zeker dat je dit bericht wilt verwijderen?"
                itemName={newsItemToDelete?.title}
                isPending={deleteNews.isPending}
                onClose={() => setNewsItemToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}

import { useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { useNewsItem } from "../queries/useNewsItem";
import { formatDate } from "../../../utils/formatDate";

import styles from "./NewsDetailPage.module.css";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

export default function NewsDetailPage(){
    const { newsId } = useParams();
    const { data: newsItem, isLoading, error } = useNewsItem(newsId);

    if (isLoading) {
        return <p>Laden...</p>;
    }

    if ( error || !newsItem) {
        return (
            <MessageCard
                title="Nieuwsbericht niet gevonden"
                message="Dit nieuwsbericht bestaat niet"
                linkTo="/nieuws"
                linkText="Terug naar nieuws"
            />
        );
    }

    return (
        <article className={styles.article}>
            <div className={styles.image}>
                <img 
                    src={newsItem.imageUrl || "/images/news/nieuws.jpg"}
                    alt={newsItem.title}
                />
            </div>

            <div className={styles.content}>
                <span className={styles.date}>{formatDate(newsItem.date)}</span>

                <h1>{newsItem.title}</h1>

                <p className={styles.excerpt}>{newsItem.excerpt}</p>

                <p>{newsItem.content}</p>

                <div className={styles.actions}>
                    <Button to="/nieuws" variant="secondary">
                        Terug naar nieuws
                    </Button>
                </div>
            </div>
        </article>
    );
}
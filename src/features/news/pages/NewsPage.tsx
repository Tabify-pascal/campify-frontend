import { useNewsItems } from "../queries/useNewsItems";
import NewsCard from "../components/NewsCard";
import PageHeader from "../../../components/layout/PageHeader/PageHeader";

import styles from "./NewsPage.module.css";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

export default function NewsPage(){
    const { 
        data: newsItems,
        isLoading,
        error,
     } = useNewsItems();

     if(isLoading){
        return <p>Laden...</p>
     }

     if (error) {
        return <MessageCard
            title="Er ging iets mis"
            message="Het nieuws kon niet worden geladen."
            linkTo="/"
            linkText="Terug naar home"
        />
     }

    return (
        <>
        <PageHeader 
            title="Nieuws"
            description="Blijf op de hoogte van het laatste nieuws rondom onze camping."
        />

        <div className={styles.grid}>
            {newsItems?.map((newsItem) => (
                <NewsCard
                    key={newsItem.id}
                    newsItem={newsItem}
                />
            ))}
        </div>
        </>
    );
}
import { Link } from "react-router-dom";
import type { NewsItem } from "../types/NewsItem";
import { formatDate } from "../../../utils/formatDate" 

import styles from "./NewsCard.module.css";

type Props = {
    newsItem: NewsItem;
};

export default function NewsCard({ newsItem }: Props){
    return (
        <article className={styles.card}>
            <div className={styles.image}>
                <img
                    src={newsItem.imageUrl || "/images/news/nieuws.jpg"}
                    alt={newsItem.title}
                    loading="lazy"
                />
            </div>

            <div className={styles.content}>
                <span className={styles.date}>
                    {formatDate(newsItem.date)}
                </span>
                <h2>{newsItem.title}</h2>

                <p>{newsItem.excerpt}</p>

                <Link
                    to={`/nieuws/${newsItem.id}`}
                    className={styles.link}
                >
                    Lees meer
                </Link>
            </div>
        </article>
    );
}


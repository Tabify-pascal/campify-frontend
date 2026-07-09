import { Link } from "react-router-dom";
import styles from "./MessageCard.module.css";

type MessageCardProps = {
    title: string;
    message: string;
    linkTo: string;
    linkText: string;
};

export default function MessageCard({
    title,
    message,
    linkTo,
    linkText,
}: MessageCardProps) {
    return (
        <section className={styles.card}>
            <h1>{title}</h1>
            <p>{message}</p>

            <Link to={linkTo} className={styles.link}>
                {linkText}
            </Link>
        </section>
    );
}
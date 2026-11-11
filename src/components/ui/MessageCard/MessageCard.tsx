/**
 * @file MessageCard.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

import { Link } from "react-router-dom";
import styles from "./MessageCard.module.css";

type MessageCardProps = {
    title: string;
    message: string;
    linkTo?: string;
    linkText?: string;
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

            {linkTo && linkText && (<Link to={linkTo} className={styles.link}>
                {linkText}
            </Link>
            )}
        </section>
    );
}
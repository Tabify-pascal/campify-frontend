import type { ReactNode } from "react";

import styles from "./AdminDetailSection.module.css";

type DetailItem = {
    label: string;
    value: ReactNode;
    fullWidth?: boolean;
    preserveWhitespace?: boolean;
};

type Props = {
    title: string;
    items: DetailItem[];
};

export default function AdminDetailSection({
    title,
    items,
}: Props) {
    return (
        <section className={styles.card}>
            <h2 className={styles.cardTitle}>
                {title}
            </h2>

            <dl className={styles.detailsGrid}>
                {items.map((item) => (
                    <div
                        key={item.label}
                        className={[
                            styles.detailItem,
                            item.fullWidth ? styles.fullWidth : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        <dt className={styles.label}>
                            {item.label}
                        </dt>
                        <dd
                            className={[
                                styles.value,
                                item.preserveWhitespace
                                    ? styles.preserveWhitespace
                                    : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            {item.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
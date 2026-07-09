import { useState } from "react";
import type { FaqItem } from "../types/FaqItem";

import styles from "./FaqAccordion.module.css";

type Props = {
    items: FaqItem[];
};

export default function FaqAccordion({ items }: Props) {
    const [openItemId, setOpenItemId] = useState<string | null>(items[0]?.id ?? null);

    function toggleItem(itemId: string) {
        setOpenItemId((currentItemId) =>
            currentItemId === itemId ? null : itemId
        );
    }

    return (
        <div className={styles.accordion}>
            {items.map((item) => {
                const isOpen = openItemId === item.id;

                return (
                    <article key={item.id} className={styles.item}>
                        <button
                            type="button"
                            className={styles.question}
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                        >
                            <span>{item.question}</span>
                            <span className={styles.icon}>{isOpen ? "-" : "+"}</span>
                        </button>

                        {isOpen && (
                            <div className={styles.answer}>
                                <p>{item.answer}</p>
                            </div>
                        )}
                    </article>
                );
            })}
        </div>
    );
}
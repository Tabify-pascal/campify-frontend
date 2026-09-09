import { Link } from "react-router-dom";

import type { Camping } from "../types/Camping";
import { getImageUrl } from "../../../utils/getImageUrl";

import styles from "./CampingCard.module.css";

type Props = {
    camping: Camping;
};

export default function CampingCard({
    camping,
}: Props) {
    return (
        <article className={styles.card}>
            <div className={styles.logoArea}>
                {camping.logoUrl ? (
                    <img
                        src={getImageUrl(camping.logoUrl)}
                        alt={`Logo van ${camping.name}`}
                        className={styles.logo}
                    />
                ) : (
                    <span className={styles.logoFallback}>
                        {camping.name.charAt(0)}
                    </span>
                )}
            </div>

            <div className={styles.content}>
                <h2>{camping.name}</h2>

                <p>
                    {camping.description ??
                        "Bekijk de beschikbare kampeerplaatsen."}
                </p>

                <Link
                    to={`/campings/${camping.id}`}
                    className={styles.link}
                >
                    Bekijk camping
                </Link>
            </div>
        </article>
    );
}
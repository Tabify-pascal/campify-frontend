import { Link } from "react-router-dom";
import type { Spot } from "../types/Spot";

import styles from "./SpotCard.module.css";

type Props = {
    spot: Spot;
    searchParams?: URLSearchParams;
};

export default function SpotCard({ spot, searchParams }: Props){
    const detailUrl = searchParams
        ? `/plaatsen/${spot.id}?${searchParams.toString()}`
        : `/plaatsen/${spot.id}`;
    return (
        <article className={styles.card}>
            <div className={styles.image}>
                <img 
                    src={spot.imageUrl || "/images/campify.png"}
                    alt={spot.name}
                />
            </div>

            <div className={styles.content}>
                <h3>{spot.name}</h3>
                <p>{spot.description}</p>

                <div className={styles.meta}>
                    <span>👥 {spot.capacity}</span>
                    <span>€ {spot.pricePerNight}/nacht</span>
                </div>

                <Link 
                    to={detailUrl}
                    className={styles.link}
                >Bekijk plek</Link>
            </div> 
        </article>
    );
}
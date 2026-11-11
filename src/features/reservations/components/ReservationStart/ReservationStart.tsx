/**
 * @file ReservationStart.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

import BookingSearch from "../../../home/components/BookingSearch/BookingSearch";
import styles from "./ReservationStart.module.css";

export default function ReservationStartPage(){
    return (
        <section className={styles.page}>
            <div className={styles.content}>
                <span className={styles.badge}>Start je reservering</span>

                <h1>Kies eerst je periode</h1>

                <p>
                    Selecteer je aankomst, vertrek en aantal personen. Daarna tonen we de campingplaatsen die passen bij jouw verblijf.
                </p>
            </div>
            <BookingSearch />
        </section>
    )
}
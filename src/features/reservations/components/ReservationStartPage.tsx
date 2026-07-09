import BookingSearch from "../../root/components/BookingSearch";
import styles from "./ReservationStartPage.module.css";

export default function ReservationStartPage(){
    return (
        <section className={styles.page}>
            <div className={styles.content}>
                <span className={styles.badge}>Start je reservering</span>

                <h1>Kies eerst je periode</h1>

                <p>
                    Selecteer je aankomst, verttrek en aantal personen. Daarna tonen we de campingplaatsen die passen bij jouw verblijf.
                </p>
            </div>
            <BookingSearch />
        </section>
    )
}
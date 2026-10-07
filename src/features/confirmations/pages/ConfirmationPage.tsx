import { Link } from "react-router-dom";

import Button from "../../../components/ui/Button";

import styles from "./ConfirmationPage.module.css";

export default function ConfirmationPage() {
    return (
        <section className={styles.card}>
            <span className={styles.badge}>
                Reservering bevestigd
            </span>

            <h1>Bedankt voor je reservering</h1>

            <p>
                Je reservering is ontvangen en de betaling is afgerond.
                Je ontvangt de gegevens ook per e-mail.
            </p>

            <div className={styles.actions}>
                <Button to="/account/reservations">
                    Mijn reserveringen
                </Button>

                <Link
                    to="/"
                    className={styles.link}
                >
                    Terug naar home
                </Link>
            </div>
        </section>
    );
}
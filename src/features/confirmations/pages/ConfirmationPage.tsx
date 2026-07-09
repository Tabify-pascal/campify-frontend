import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";

import styles from "./ConfirmationPage.module.css";

export default function ConfirmationPage(){
    return (
        <section className={styles.card}>
            <span className={styles.badge}>Reservering ontvangen</span>

            <h1>Bedankt voor de reservering</h1>

            <p>
                We hebben je aanvraag ontvangen. Je krijgt binnenkort een bevestiging per e-mail.
            </p>

            <div className={styles.actions}>
                <Button to="/plaatsen">Bekijk meer plekken</Button>
                <Link to="/" className={styles.link}>
                    Terug naar home
                </Link>
            </div>
        </section>
    );
}
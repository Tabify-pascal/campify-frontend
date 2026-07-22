import { Link } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import styles from "./Dashboard.module.css";

export default function AdminDashboardPage(){
    return (
        <div className={styles.dashboard}>

            <PageHeader
                title="Campify beheer"
                description="Beheer campingplaatsen, nieuws en reserveringen."
            />
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Snel naar</h2>
                <div className={styles.grid}>
                    <Link to="/admin/spots"  className={styles.cardLink}>
                        <article className={styles.card}>
                            <h3 className={styles.cardTitle}>Campingplaatsen</h3>
                            <p className={styles.cardText}>Bekijk, voeg toe en wijzig campingplaatsen.</p>
                        </article>
                    </Link>
                    <Link to="/admin/news" className={styles.cardLink}>
                        <article className={styles.card}>
                            <h3 className={styles.cardTitle}>Nieuws</h3>
                            <p className={styles.cardText}>Beheer nieuwsberichten voor de website.</p>
                        </article>
                    </Link>
                    <Link to="/admin/reservations" className={styles.cardLink}>
                        <article className={styles.card}>
                            <h3 className={styles.cardTitle}>Reserveringen</h3>
                            <p className={styles.cardText}>Bekijk en beheer binnengekomen reserveringen.</p>
                        </article>
                    </Link>
                </div>
            </section>
        </div>
    )
}
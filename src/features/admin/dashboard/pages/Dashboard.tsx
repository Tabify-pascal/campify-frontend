import { Link } from "react-router-dom";

import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import MessageCard from "../../../../components/ui/MessageCard/MessageCard";
import { useAdminDashboardStats } from "../queries/useAdminDashboardStats";

import styles from "./Dashboard.module.css";

export default function AdminDashboardPage(){
    const { 
        data: stats,
        isLoading,
        error,
    } = useAdminDashboardStats();

    if (isLoading) { 
        return <p>Dashboard laden....</p>;
    }

    if (error || !stats ) {
        return (
            <MessageCard
                title="Dashboard kon niet worden geladen"
                message="Probeer het later opnieuw"
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <div className={styles.page}>
            <PageHeader
                title="Campify beheer"
                description="Een overzicht van de belangrijkste gegevens."
            />

            <section className={styles.statsGrid}>
                <Link 
                    to="/admin/reservations"
                    className={styles.statCard}
                >
                    <span className={styles.statLabel}>
                        Nieuwe reservering
                    </span>
                    <strong className={styles.statValue}>
                        {stats.newReservations}
                    </strong>
                </Link>

                
                <Link
                    to="/admin/messages"
                    className={styles.statCard}
                >
                    <span className={styles.statLabel}>
                        Nieuwe berichten
                    </span>

                    <strong className={styles.statValue}>
                        {stats.newMessages}
                    </strong>
                </Link>

                <Link
                    to="/admin/news"
                    className={styles.statCard}
                >
                    <span className={styles.statLabel}>
                        Nieuwsberichten
                    </span>

                    <strong className={styles.statValue}>
                        {stats.totalNewsItems}
                    </strong>
                </Link>

                <Link
                    to="/admin/spots"
                    className={styles.statCard}
                >
                    <span className={styles.statLabel}>
                        Campingplaatsen
                    </span>

                    <strong className={styles.statValue}>
                        {stats.totalSpots}
                    </strong>
                </Link>
            </section>
        </div>
    );
}
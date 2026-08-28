import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import LoadingState from "../../../components/ui/LoadingState/LoadingState";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

import { useAccountReservations } from "../queries/useAccountReservations";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatDate } from "../../../utils/formatDate";

import styles from "./AccountReservationsPage.module.css";

export default function AccountReservationsPage(){
    const {
        data: reservations = [],
        isLoading,
        error,
    } = useAccountReservations();

    if (isLoading) {
        return (
            <LoadingState message="Reserveringen laden..." />
        );
    }

    if (error) {
        return (
            <MessageCard
                title="Reserveringen konden niet worden geladen"
                message="Probeer het later opnieuw."
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Mijn reserveringen"
                description="Bekijk hier je huidige en eerdere reserveringen."
            />

            {reservations.length === 0 ? (
                <div className={styles.emptyState}>
                    <h2>Nog geen reserveringen</h2>
                    <p>
                        Je hebt nog geen reserveringen gemaakt met dit account.
                    </p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {reservations.map((reservation) => (
                        <article
                            key={reservation.id}
                            className={styles.card}
                        >
                            <img
                                src={getImageUrl(
                                    reservation.spot.imageUrl
                                )}
                                alt={reservation.spot.name}
                                className={styles.image}
                            />
                            <div className={styles.content}>
                                <div
                                    className={styles.header}
                                >
                                    <h2>
                                        {reservation.spot.name}
                                    </h2>

                                    <span
                                        className={`${styles.status} ${ styles[reservation.status.toLowerCase()]}`}
                                        >
                                            {reservation.status}
                                        </span>
                                </div>

                                <dl className={styles.details}>
                                    <div>
                                        <dt>Aankomst</dt>
                                        <dd>
                                            {formatDate(reservation.arrivalDate)}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt>Vertrek</dt>
                                        <dd>
                                            {formatDate(reservation.departureDate)}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt>Gasten</dt>
                                        <dd>
                                            {reservation.guests}
                                        </dd>
                                    </div>

                                    {reservation.notes && (
                                        <div className={styles.notes}>
                                            <dt>Opmerkingen</dt>
                                            <dd>
                                                { reservation.notes }
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </>
    );
}

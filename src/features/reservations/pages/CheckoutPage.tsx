import { useParams } from "react-router-dom";

import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import LoadingState from "../../../components/ui/LoadingState/LoadingState";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

import { useCheckoutSummary } from "../queries/useCheckoutSummary";
import PaymentCard from "../components/PaymentCard/PaymentCard";

import { formatDate } from "../../../utils/formatDate";

import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
    const { reservationId } = useParams();

    const {
        data: checkout,
        isLoading,
        error,
    } = useCheckoutSummary(reservationId);

    if (isLoading) {
        return <LoadingState message="Checkout laden..." />;
    }

    if (error || !checkout) {
        return (
            <MessageCard
                title="Checkout kon niet worden geladen"
                message="Deze reservering bestaat niet of kon niet worden geladen."
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Je reservering"
                description="Controleer je gegevens en rond de betaling af."
            />

            <section className={styles.page}>
                <div className={styles.summaryCard}>
                    <div className={styles.heading}>
                        <span className={styles.eyebrow}>
                            {checkout.spot.camping.name}
                        </span>

                        <h2>{checkout.spot.name}</h2>
                    </div>

                    <div className={styles.details}>
                        <div>
                            <span>Aankomst</span>
                            <strong>
                                {formatDate(checkout.arrivalDate)}
                            </strong>
                        </div>

                        <div>
                            <span>Vertrek</span>
                            <strong>
                                {formatDate(checkout.departureDate)}
                            </strong>
                        </div>

                        <div>
                            <span>Gasten</span>
                            <strong>
                                {checkout.guests}
                            </strong>
                        </div>

                        <div>
                            <span>Status</span>
                            <strong>
                                {checkout.status}
                            </strong>
                        </div>
                    </div>
                </div>

                <aside className={styles.paymentCard}>
                    <div className={styles.priceRow}>
                        <span>Prijs per nacht</span>
                        <strong>
                            {formatCurrency(
                                checkout.pricePerNight
                            )}
                        </strong>
                    </div>

                    <div className={styles.priceRow}>
                        <span>Totaal</span>
                        <strong className={styles.total}>
                            {formatCurrency(
                                checkout.totalPrice
                            )}
                        </strong>
                    </div>

                    <PaymentCard
                        reservationId={checkout.id}
                        paymentStatus={
                            checkout.paymentStatus
                        }
                        totalPrice={checkout.totalPrice}
                    />
                </aside>
            </section>
        </>
    );
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
    }).format(value);
}
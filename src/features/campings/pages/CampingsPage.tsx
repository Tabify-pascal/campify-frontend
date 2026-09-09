import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import LoadingState from "../../../components/ui/LoadingState/LoadingState";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

import CampingCard from "../components/CampingCard";
import { useCampings } from "../queries/useCampings";

import styles from "./CampingsPage.module.css";

export default function CampingsPage() {
    const {
        data: campings = [],
        isLoading,
        error,
    } = useCampings();

    if (isLoading) {
        return <LoadingState message="Campings laden..." />;
    }

    if (error) {
        return (
            <MessageCard
                title="Campings konden niet worden geladen"
                message="Probeer het later opnieuw."
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <>
            <PageHeader
                title="Onze campings"
                description="Bekijk onze campings en ontdek welke plek het beste bij je past."
            />

            {campings.length === 0 ? (
                <p>Er zijn nog geen campings beschikbaar.</p>
            ) : (
                <div className={styles.grid}>
                    {campings.map((camping) => (
                        <CampingCard
                            key={camping.id}
                            camping={camping}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
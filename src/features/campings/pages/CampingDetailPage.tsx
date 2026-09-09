import { useParams } from "react-router-dom";

import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import LoadingState from "../../../components/ui/LoadingState/LoadingState";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

import SpotCard from "../../spots/components/SpotCard";
import { useCamping } from "../queries/useCamping";
import { useSpots } from "../../spots/queries/useSpots";

import styles from "./CampingDetailPage.module.css";

export default function CampingDetailPage() {
    const { campingId } = useParams();

    const {
        data: camping,
        isLoading: isCampingLoading,
        error: campingError,
    } = useCamping(campingId);

    const {
        data: spots = [],
        isLoading: areSpotsLoading,
        error: spotsError,
    } = useSpots({
        campingId,
    });

    if (isCampingLoading || areSpotsLoading) {
        return <LoadingState message="Camping laden..." />;
    }

    if (campingError || spotsError || !camping) {
        return (
            <MessageCard
                title="Camping kon niet worden geladen"
                message="Probeer het later opnieuw."
                linkTo="/"
                linkText="Terug naar home"
            />
        );
    }

    return (
        <>
            <PageHeader
                title={camping.name}
                description={
                    camping.description ??
                    "Bekijk de beschikbare kampeerplaatsen."
                }
            />

            {spots.length === 0 ? (
                <p>Er zijn nog geen kampeerplaatsen voor deze camping.</p>
            ) : (
                <div className={styles.grid}>
                    {spots.map((spot) => (
                        <SpotCard
                            key={spot.id}
                            spot={spot}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
import { useSearchParams } from "react-router-dom";
import SpotCard from "../components/SpotCard";
import { useSpots } from "../queries/useSpots"; 
import PageHeader from "../../../components/layout/PageHeader/PageHeader";

import styles from "./SpotsPage.module.css";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

export default function SpotsPage() {
  const [ searchParams ] = useSearchParams();
  const arrivalDate = searchParams.get("arrivalDate");
  const departureDate = searchParams.get("departureDate");
  const guests = searchParams.get("guests");
  const { data: spots = [], isLoading, error } = useSpots({arrivalDate, departureDate, guests}); 

  if (isLoading) return <p>Laden...</p>;

  if (error){
    return (
      <MessageCard
        title="Campingplaatsen konden niet worden geladen"
        message="Probeer het later opnieuw"
        linkTo="/"
        linkText="Terug naar home"
      />
    );
  }

  return (
    <>
      <PageHeader 
        title="Campingplaatsen"
        description="Kies de perfecte plek voor jouw volgende avontuur."
      />

      {arrivalDate && departureDate && guests && (
        <div className={styles.searchSummary}>
          <strong>Je zoekopdracht</strong>
          <span>
            {arrivalDate} t/m {departureDate} {" "} {guests}{" "}
            {guests === "1" ? "persoon" : "personen"}
          </span>
        </div>
      )}

      <div className={styles.grid}>
        {spots.map((spot) => (
          <SpotCard
            key={spot.id}
            spot={spot}
            searchParams={searchParams}
          />
        ))}
        
      </div>
    </>
  );
}
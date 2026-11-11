import styles from "./AvailabilityList.module.css"

type Props = { 
    unavailableDates: string[];
};


export default function AvailabilityList({ unavailableDates }: Props) {
  if (unavailableDates.length === 0) {
    return (
      <div className={styles.card}>
        <h2>Beschikbaarheid</h2>
        <p>Deze plek is volledig beschikbaar in de gekozen periode.</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2>Niet beschikbaar</h2>

      <div className={styles.dates}>
        {unavailableDates.map((date) => (
          <span key={date}>{date}</span>
        ))}
      </div>
    </div>
  );
}
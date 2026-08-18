import styles from "./AdminStatusBadge.module.css";

type Status = 
    | "NEW"
    | "READ"
    | "CLOSED"
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED";
    
type Props = { status: Status;};

const statusLabels: Record<Status, string> = {
    NEW: "Nieuw",
    READ: "Gelezen",
    CLOSED: "Gesloten",
    PENDING: "In behandeling",
    CONFIRMED: "Bevestigd",
    CANCELLED: "Geannuleerd",
};

export default function AdminStatusBadge({status}: Props) {
    const statusClass = styles[status.toLowerCase() as Lowercase<Status>];

    return (
        <span className={`${styles.status} ${statusClass}`}>
            {statusLabels[status]}
        </span>
    );
}
import styles from "./LoadingState.module.css";

type Props = {
    message?: string;
};

export default function LoadingState({
    message = "Laden...",
}: Props) {
    return (
        <div
            className={styles.loading}
            role="status"
            aria-live="polite"
        >
            <span className={styles.spinner} aria-hidden="true" />
            <span>{message}</span>
        </div>
    );
}


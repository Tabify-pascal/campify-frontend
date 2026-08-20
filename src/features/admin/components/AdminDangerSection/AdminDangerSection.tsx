import styles from "./AdminDangerSection.module.css";

type Props = {
    title: string;
    description?: string;
    buttonLabel: string;
    onClick: () => void;
    disabled?: boolean;
};

export default function AdminDangerSection({
    title,
    description,
    buttonLabel,
    onClick,
    disabled = false,
}: Props) {
    return (
        <section className={styles.card}>
            <h2 className={styles.title}>
                {title}
            </h2>

            {description && (
                <p className={styles.description}>
                    {description}
                </p>
            )}

            <button
                type="button"
                className={styles.button}
                onClick={onClick}
                disabled={disabled}
            >
                {buttonLabel}
            </button>
        </section>
    );
}
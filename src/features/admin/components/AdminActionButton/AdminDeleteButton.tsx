import { Trash2 } from "lucide-react";

import styles from "./AdminActionButton.module.css";

type Props = {
    onClick: () => void;
    disabled?: boolean;
    label?: string;
};

export default function AdminDeleteButton({
    onClick,
    disabled = false,
    label = "Verwijderen",
}: Props){
    return (
        <button
            type="button"
            className={`${styles.button} ${styles.delete}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
        >
            <Trash2 size={18} />
        </button>
    );
}


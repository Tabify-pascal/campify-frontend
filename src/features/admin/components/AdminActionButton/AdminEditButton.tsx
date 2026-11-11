/**
 * @file AdminEditButton.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-08-18
 */

import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

import styles from "./AdminActionButton.module.css";

type Props = {
    to: string;
    label?: string; 
};

export default function AdminEditButton({
    to,
    label = "Bewerken",
}: Props) {
    return (
        <Link
            to={to}
            className={`${styles.button} ${styles.edit}`}
            aria-label={label}
            title={label}
        >
            <Pencil size={18}/>
        </Link>
    );
}


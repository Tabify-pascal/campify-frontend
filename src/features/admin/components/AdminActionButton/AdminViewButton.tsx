import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

import styles from "./AdminActionButton.module.css";

type Props = {
    to: string;
    label?: string;
};

export default function AdminViewButton({
    to, 
    label = "Bekijken",
}: Props) {
    return (
        <Link
            to={to}
            className={`${styles.button} ${styles.view}`}
            aria-label={label}
            title={label}
        >
            <Eye size={18} />
        </Link>
    );
}
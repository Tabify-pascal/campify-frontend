/**
 * @file FormRow.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-08-20
 */

import type { ReactNode } from "react";

import styles from "./FormRow.module.css";

export default function FormRow({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className={styles.row}>
            {children}
        </div>
    );
}
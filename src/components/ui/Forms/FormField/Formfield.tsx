import type { ReactNode } from "react";

import FormError from "../../FormError";

import styles from "./FormField.module.css";

type Props = {
    label: string;
    htmlFor: string;
    error?: string;
    hint?: string;
    children: ReactNode;
};

export default function FormField({
    label, 
    htmlFor,
    error,
    hint,
    children,
}: Props) {
    return (
        <div className={styles.field}>
            <label htmlFor={htmlFor}>
                {label}
            </label>

            {children}

            {hint && (
                <small className={styles.hint}>
                    {hint}
                </small>
            )}

            <FormError message={error} />
        </div>
    );
}
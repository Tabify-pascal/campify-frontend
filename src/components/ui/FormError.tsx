import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import styles from "./FormError.module.css";

type FormErrorProps = {
    error?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>;
};

export default function FormError({ error }: FormErrorProps){
    if(!error?.message){
        return null;
    }

    return (
        <span className={styles.error}>
            {String(error.message)}
        </span>
    );
}
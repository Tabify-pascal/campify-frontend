import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { ImageUp } from "lucide-react";

import styles from "./ImageUploadField.module.css";

type Props = {
    id: string;
    currentImageUrl?: string;
    currentImageAlt: string;
    error?: string;
    hint?: string;
    inputProps: InputHTMLAttributes<HTMLInputElement>;
};

export default function ImageUploadField({
    id,
    currentImageUrl,
    currentImageAlt,
    error,
    hint,
    inputProps,
}: Props) {
    const [fileName, setFileName] = useState<string>();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setFileName(event.target.files?.[0]?.name);

        inputProps.onChange?.(event);
    }

    return (
        <div className={styles.field}>
            {currentImageUrl && (
                <div className={styles.currentImage}>
                    <span>Huidige afbeelding</span>

                    <img
                        src={currentImageUrl}
                        alt={currentImageAlt}
                    />
                </div>
            )}

            <span className={styles.label}>
                {currentImageUrl
                    ? "Nieuwe afbeelding"
                    : "Afbeelding"}
            </span>

            <div className={styles.upload}>
                <input
                    {...inputProps}
                    id={id}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className={styles.input}
                    onChange={handleChange}
                />

                <label
                    htmlFor={id}
                    className={styles.button}
                >
                    <ImageUp size={18} />
                    Afbeelding kiezen
                </label>

                <span className={styles.fileName}>
                    {fileName ?? "Geen bestand gekozen"}
                </span>
            </div>

            {hint && (
                <small className={styles.hint}>
                    {hint}
                </small>
            )}

            {error && (
                <span className={styles.error}>
                    {error}
                </span>
            )}
        </div>
    );
}
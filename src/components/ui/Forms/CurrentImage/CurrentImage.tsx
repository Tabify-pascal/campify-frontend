import styles from "./CurrentImage.module.css";

type Props = {
    src: string;
    alt: string;
    label?: string;
};

export default function CurrentImage({
    src, 
    alt, 
    label = "Huidige afbeelding",
}: Props) {
    return (
        <div className={styles.currentImage}>
            <span>{label}</span>
            <img
                src={src}
                alt={alt}
            />
        </div>
    );
}
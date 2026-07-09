import styles from "./PageHeader.module.css";

type PageHeaderProps = {
    title: string;
    description: string;
};

export default function PageHeader({
    title, 
    description,
}: PageHeaderProps) {
    return (
        <header className={styles.header}>
            <h1>{title}</h1>
            <p>{description}</p>
        </header>
    );
}
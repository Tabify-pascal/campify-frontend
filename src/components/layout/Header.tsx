import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import styles from "./Header.module.css";
import Button from "../ui/Button";
import AccountButton from "../ui/AccountButton/AccountButton";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                Campify
            </Link>
            
            <Navigation />
            
            <div className={styles.actions}>
                <AccountButton />

                <Button
                    to="/reserveren"
                    className={styles.cta}
                >
                    Reserveer
                </Button>
                </div>
        </header>
    );
}
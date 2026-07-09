import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                Campify
            </Link>
            
            <Navigation />
            
            <Link to="/reserveren" className={styles.cta}>
                Reserveer
            </Link>
        </header>
    );
}
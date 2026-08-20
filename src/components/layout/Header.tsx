import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import styles from "./Header.module.css";
import Button from "../ui/Button";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                Campify
            </Link>
            
            <Navigation />
            
            <Button to="/reserveren" className={styles.cta}>
                Reserveer
            </Button>
        </header>
    );
}
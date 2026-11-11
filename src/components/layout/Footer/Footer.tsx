/**
 * @file Footer.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-11-10
 */

import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <p className={styles.copyright}>
                    © {new Date().getFullYear()} Campify
                </p>

                <nav
                    className={styles.links}
                    aria-label="Footernavigatie"
                >
                    <Link to="/nieuws">Nieuws</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/privacy">Privacyverklaring</Link>
                </nav>
            </div>
        </footer>
    );
}
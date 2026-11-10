import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";

export default function Navigation() {
    return (
        <nav className={styles.nav} aria-label="Hoofdnavigatie">
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/plaatsen"
                className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                }
            >
                Plaatsen
            </NavLink>

            <NavLink
                to="/campings"
                className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                }
            >
                Campings
            </NavLink>
        </nav>
    );
}
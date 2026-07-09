import { NavLink } from "react-router-dom"
import styles from "./Navigation.module.css";

export default function Navigation(){
    return (
        <nav className={styles.nav}>
            <NavLink to="/" end className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>Home</NavLink>
            <NavLink to="/plaatsen" className={({isActive}) => `${styles.link} ${isActive ? styles.active : ""}`}>Plaatsen</NavLink>
            <NavLink to="/reserveren" className={({isActive}) => `${styles.link} ${isActive ? styles.active : ""}`}>Reserveren</NavLink>
            <NavLink to="/nieuws" className={({isActive}) => `${styles.link} ${isActive ? styles.active : ""}`}>Nieuws</NavLink>
            <NavLink to="/faq" className={({isActive}) => `${styles.link} ${isActive ? styles.active : ""}`}>FAQ</NavLink>
            <NavLink to="/contact" className={({isActive}) => `${styles.link} ${isActive ? styles.active : ""}`}>Contact</NavLink>
        </nav>
    );
}
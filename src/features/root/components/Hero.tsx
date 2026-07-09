import Button from "../../../components/ui/Button";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <span className={styles.badge}>
                    🌲 Natuur • Rust • Avontuur
                </span>

                <h1>
                    Ontdek jouw
                    <br />
                    perfecte campingplek
                </h1>

                <p>
                    Boek eenvoudig een kampeerplaats en geniet van rust, natuur en onvergetelijke herinneringen.
                </p>

                <div className={styles.actions}>
                    <Button to="/plaatsen">
                        Bekijk plaatsen
                    </Button>

                    <Button to="/contact" variant="secondary">
                        Contact
                    </Button>
                </div>
            </div>

            <div className={styles.image}>
                <img
                    src="/images/campify.png"
                    alt="Camping in de natuur"
                />                 
            </div>
        </section>
    )
}
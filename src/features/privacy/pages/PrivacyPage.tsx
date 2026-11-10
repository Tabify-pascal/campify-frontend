import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import { Link } from "react-router-dom";

import styles from "./PrivacyPage.module.css";

export default function PrivacyPage() {
    return (
        <>
            <PageHeader
                title="Privacyverklaring"
                description="Lees hoe Campify met je persoonsgegevens omgaat."
            />

            <section className={styles.page}>
                <p className={styles.intro}>
                    Bij Campify vinden we de bescherming van
                    persoonsgegevens belangrijk. In deze
                    privacyverklaring leggen we uit welke
                    gegevens we verwerken, waarom we dat doen
                    en hoe we deze beschermen.
                </p>

                <h2>1. Welke gegevens verzamelen we?</h2>

                <p>
                    Wanneer je een account aanmaakt of een
                    reservering plaatst, kunnen we de volgende
                    persoonsgegevens verwerken:
                </p>

                <ul>
                    <li>Voor- en achternaam</li>
                    <li>E-mailadres</li>
                    <li>Telefoonnummer</li>
                    <li>Accountgegevens</li>
                    <li>Reserveringsgegevens, zoals verblijfsdatums en aantal gasten</li>
                    <li>Betalingsstatus van reserveringen</li>
                </ul>

                <h2>2. Waarom verwerken we deze gegevens?</h2>

                <p>
                    We gebruiken persoonsgegevens voor het
                    aanmaken en beheren van accounts, het
                    verwerken van reserveringen en het versturen
                    van berichten over reserveringen.
                </p>

                <p>
                    Daarnaast gebruiken we e-mailadressen om
                    accounts te verifiëren en gebruikers te
                    informeren over hun reserveringen.
                </p>

                <h2>3. Hoe beveiligen we persoonsgegevens?</h2>

                <p>
                    Campify gebruikt verschillende maatregelen
                    om persoonsgegevens te beschermen.
                    Wachtwoorden worden beveiligd opgeslagen,
                    accounts worden via e-mail geverifieerd
                    en toegang tot reserveringsgegevens is
                    beperkt tot bevoegde gebruikers.
                </p>

                <p>
                    Voor het verwerken van betalingen gebruikt
                    Campify een gesimuleerd betaalsysteem.
                    Er worden geen echte betalingen uitgevoerd.
                </p>

                <h2>4. Met wie delen we gegevens?</h2>

                <p>
                    Reserveringsgegevens zijn toegankelijk voor
                    bevoegde medewerkers die deze nodig hebben
                    om reserveringen te beheren.
                </p>

                <p>
                    Voor het hosten van de website en het
                    versturen van e-mails kunnen technische
                    dienstverleners worden ingezet.
                </p>

                <h2>5. Hoelang bewaren we gegevens?</h2>

                <p>
                    We bewaren persoonsgegevens niet langer
                    dan noodzakelijk is voor het doel waarvoor
                    ze zijn verzameld, tenzij een wettelijke
                    bewaarplicht van toepassing is.
                </p>

                <h2>6. Welke rechten heb je?</h2>

                <p>
                    Je hebt onder de toepasselijke
                    privacywetgeving onder andere het recht
                    om je persoonsgegevens in te zien, te
                    laten corrigeren of, wanneer dit wettelijk
                    mogelijk is, te laten verwijderen.
                </p>

                <p>
                    Je kunt ook bezwaar maken tegen bepaalde
                    verwerkingen of verzoeken om beperking
                    van de verwerking.
                </p>

                <h2>7. Contact</h2>

                <p>
                    Heb je vragen over deze privacyverklaring
                    of over de verwerking van je
                    persoonsgegevens? Neem dan contact met
                    ons op via onze{" "}
                    <Link to="/contact">contactpagina</Link>.
                </p>
            </section>
        </>
    );
}
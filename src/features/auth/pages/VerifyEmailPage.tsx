/**
 * @file VerifyEmailPage.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-11-09
 */

import { useSearchParams } from "react-router-dom";

import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import Button from "../../../components/ui/Button/Button";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";
import ResendVerificationForm from "../components/ResendVerificationForm";

import { useVerifyEmail } from "../mutations/useVerifyEmail";

import styles from "./VerifyEmailPage.module.css";

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const verifyMutation = useVerifyEmail();

    function handleVerify() {
        if (!token || verifyMutation.isPending) {
            return;
        }

        verifyMutation.mutate(token);
    }

    return (
        <>
            <PageHeader
                title="E-mailadres verifiëren"
                description="Activeer je Campify-account."
            />

            <section className={styles.page}>
                {!token && (
                    <MessageCard
                        title="Ongeldige verificatielink"
                        message="Deze link bevat geen verificatiecode. Controleer of je de volledige link hebt geopend."
                        linkTo="/login"
                        linkText="Terug naar inloggen"
                    />
                )}

                {token && verifyMutation.isIdle && (
                    <div className={styles.content}>
                        <p>
                            Klik op de onderstaande knop om je
                            e-mailadres te bevestigen en je
                            account te activeren.
                        </p>

                        <Button
                            as="button"
                            type="button"
                            onClick={handleVerify}
                        >
                            E-mailadres bevestigen
                        </Button>
                    </div>
                )}

                {verifyMutation.isPending && (
                    <p>Je e-mailadres wordt gecontroleerd...</p>
                )}

                {verifyMutation.isSuccess && (
                    <MessageCard
                        title="E-mailadres bevestigd"
                        message="Je account is geactiveerd. Je kunt nu inloggen en reserveringen maken."
                        linkTo="/login"
                        linkText="Naar inloggen"
                    />
                )}

                {verifyMutation.isError && (
                    <>
                        <MessageCard
                            title="Verificatie mislukt"
                            message="De verificatielink is ongeldig of verlopen. Je kunt hieronder een nieuwe verificatielink aanvragen."
                        />

                        <ResendVerificationForm />
                    </>
                )}
            </section>
        </>
    );
}
import { useState } from "react";

import Button from "../../../components/ui/Button/Button";
import FormField from "../../../components/ui/Forms/FormField/FormField";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

import { useResendVerification } from "../mutations/useResendVerification";

export default function ResendVerificationForm() {
    const [email, setEmail] = useState("");
    const resendMutation = useResendVerification();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const normalizedEmail = email.trim();

        if (!normalizedEmail || resendMutation.isPending) {
            return;
        }

        resendMutation.mutate(normalizedEmail);
    }

    if (resendMutation.isSuccess) {
        return (
            <MessageCard
                title="Controleer je e-mail"
                message="Als dit e-mailadres bij een account hoort dat nog niet geverifieerd is, ontvang je een nieuwe verificatielink."
            />
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Nieuwe verificatielink aanvragen</h3>

            <p>
                Is je verificatielink verlopen? Vul hieronder
                je e-mailadres in om een nieuwe aan te vragen.
            </p>

            <FormField
                label="E-mailadres"
                htmlFor="resend-email"
            >
                <input
                    id="resend-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </FormField>

            {resendMutation.isError && (
                <p role="alert">
                    Het aanvragen is mislukt. Probeer het later opnieuw.
                </p>
            )}

            <Button
                as="button"
                type="submit"
                disabled={resendMutation.isPending}
            >
                {resendMutation.isPending
                    ? "Versturen..."
                    : "Nieuwe verificatiemail versturen"}
            </Button>
        </form>
    );
}
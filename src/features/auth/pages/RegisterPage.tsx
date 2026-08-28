import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import Button from "../../../components/ui/Button";
import FormField from "../../../components/ui/Forms/FormField/Formfield";
import FormRow from "../../../components/ui/Forms/FormRow/FormRow";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

import { useRegister } from "../mutations/useRegister";
import {
    registerSchema,
    type RegisterFormData,
} from "../schemas/registerSchema";

import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(data: RegisterFormData) {
        registerMutation.mutate(data, {
            onSuccess: () => {
                navigate("/account/reservations", {
                    replace: true,
                });
            },
        });
    }

    return (
        <>
            <PageHeader
                title="Account aanmaken"
                description="Maak een account aan om je reserveringen te beheren."
            />

            <section className={styles.page}>
                {registerMutation.isError && (
                    <MessageCard
                        title="Registreren mislukt"
                        message="Dit e-mailadres is mogelijk al in gebruik."
                        linkTo="/login"
                        linkText="Naar inloggen"
                    />
                )}

                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <FormRow>
                        <FormField
                            label="Voornaam"
                            htmlFor="firstName"
                            error={errors.firstName?.message}
                        >
                            <input
                                id="firstName"
                                autoComplete="given-name"
                                {...register("firstName")}
                            />
                        </FormField>

                        <FormField
                            label="Achternaam"
                            htmlFor="lastName"
                            error={errors.lastName?.message}
                        >
                            <input
                                id="lastName"
                                autoComplete="family-name"
                                {...register("lastName")}
                            />
                        </FormField>
                    </FormRow>

                    <FormField
                        label="E-mailadres"
                        htmlFor="email"
                        error={errors.email?.message}
                    >
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register("email")}
                        />
                    </FormField>

                    <FormField
                        label="Wachtwoord"
                        htmlFor="password"
                        error={errors.password?.message}
                    >
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            {...register("password")}
                        />
                    </FormField>

                    <Button
                        as="button"
                        type="submit"
                        disabled={registerMutation.isPending}
                    >
                        {registerMutation.isPending
                            ? "Account aanmaken..."
                            : "Account aanmaken"}
                    </Button>

                    <p className={styles.switchText}>
                        Heb je al een account?{" "}
                        <Link to="/login">
                            Inloggen
                        </Link>
                    </p>
                </form>
            </section>
        </>
    );
}
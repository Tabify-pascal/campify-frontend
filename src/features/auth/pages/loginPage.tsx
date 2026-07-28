import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";

import Button from "../../../components/ui/Button";
import FormError from "../../../components/ui/FormError";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

import { useLogin } from "../mutations/useLogin";
import {
    loginSchema,
    type LoginFormData,
    type LoginFormInput,
} from "../schemas/loginSchema";

import styles from "./loginPage.module.css";

type LocationState = {
    from?: {
        pathname?: string;
    };
};

export default function AdminLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInput, unknown, LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: LoginFormData) {
        loginMutation.mutate(data, {
            onSuccess: () => {
                const state = location.state as LocationState | null;

                navigate(
                    state?.from?.pathname ?? "/admin",
                    { replace: true },
                );
            },
        });
    }

    return (
        <main className={styles.page}>
            <section className={styles.loginCard}>
                <div className={styles.iconWrapper}>
                    <LockKeyhole
                        size={26}
                        aria-hidden="true"
                    />
                </div>

                <div className={styles.header}>
                    <p className={styles.eyebrow}>
                        Campify beheeromgeving
                    </p>

                    <h1 className={styles.title}>
                        Welkom terug
                    </h1>

                    <p className={styles.description}>
                        Log in om campingplaatsen, nieuws en
                        reserveringen te beheren.
                    </p>
                </div>

                {loginMutation.isError && (
                    <MessageCard
                        title="Inloggen mislukt"
                        message="Controleer je e-mailadres en wachtwoord."
                        linkText="Terug naar de homepage"
                        linkTo="/"
                    />
                )}

                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <div className={styles.formGroup}>
                        <label
                            className={styles.label}
                            htmlFor="email"
                        >
                            E-mailadres
                        </label>

                        <input
                            className={styles.input}
                            id="email"
                            type="email"
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                            {...register("email")}
                        />

                        <FormError
                            message={errors.email?.message}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label
                            className={styles.label}
                            htmlFor="password"
                        >
                            Wachtwoord
                        </label>

                        <input
                            className={styles.input}
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            aria-invalid={Boolean(errors.password)}
                            {...register("password")}
                        />

                        <FormError
                            message={errors.password?.message}
                        />
                    </div>

                    <Button
                        as="button"
                        type="submit"
                        className={styles.submitButton}
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending
                            ? "Inloggen..."
                            : "Inloggen"}
                    </Button>
                </form>

                <Link
                    className={styles.homeLink}
                    to="/"
                >
                    Terug naar Campify
                </Link>
            </section>
        </main>
    );
}
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import Button from "../../../components/ui/Button";
import FormField from "../../../components/ui/Forms/FormField/Formfield";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

import { useLogin } from "../mutations/useLogin";
import {
    loginSchema,
    type LoginFormData,
} from "../schemas/loginSchema";

import styles from "./LoginPage.module.css";

type LocationState = {
    from?: {
        pathname?: string;
    };
};

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: LoginFormData) {
        loginMutation.mutate(data, {
            onSuccess: (response) => {
                const state =
                    location.state as LocationState | null;

                if (state?.from?.pathname) {
                    navigate(state.from.pathname, {
                        replace: true,
                    });
                    return;
                }

                navigate(
                    response.user.role === "ADMIN"
                        ? "/admin"
                        : "/account/reservations",
                    {
                        replace: true,
                    },
                );
            },
        });
    }

    return (
        <>
            <PageHeader
                title="Inloggen"
                description="Log in op je Campify-account."
            />

            <section className={styles.page}>
                {loginMutation.isError && (
                    <MessageCard
                        title="Inloggen mislukt"
                        message="Controleer je e-mailadres en wachtwoord."
                        linkTo="/register"
                        linkText="Nog geen account? Registreren"
                    />
                )}

                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
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
                            autoComplete="current-password"
                            {...register("password")}
                        />
                    </FormField>

                    <Button
                        as="button"
                        type="submit"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending
                            ? "Inloggen..."
                            : "Inloggen"}
                    </Button>

                    <p className={styles.switchText}>
                        Nog geen account?{" "}
                        <Link to="/register">
                            Registreren
                        </Link>
                    </p>
                </form>
            </section>
        </>
    );
}
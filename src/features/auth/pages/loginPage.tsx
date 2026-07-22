import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import Button from "../../../components/ui/Button";
import FormError from "../../../components/ui/FormError";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

import { useLogin } from "../mutations/useLogin";
import { loginSchema, type LoginFormData, type LoginFormInput } from "../schemas/loginSchema";

type LocationState = { from?: { pathname?: string};};

export default function AdminLoginPage(){
    const navigate = useNavigate();
    const location = useLocation();
    const loginMutation = useLogin();

    const {
        register, handleSubmit, formState: { errors },
    } = useForm<LoginFormInput, unknown, LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: LoginFormData){
        loginMutation.mutate(data, {
            onSuccess: () => {
                const state = location.state as LocationState | null;
                navigate(
                    state?.from?.pathname ?? "/admin",
                    { replace : true}
                );
            },
        });
    }

    return(
        <>
            <PageHeader
                title="Admin Login"
                description="Log in om de beheeromgeving te openen."
            />
            {loginMutation.isError && (
                <MessageCard
                    title="Inloggen mislukt"
                    message="Controleer je e-mail"
                    linkText="Terug naar de homepage"
                    linkTo="/"
                />
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">
                        E-mailadres
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email")}
                    />
                    <FormError message={errors.email?.message} />
                </div>

                <div>
                    <label htmlFor="password">
                        Wachtwoord
                    </label>

                    <input
                        id="password"
                        type="password"
                        autoComplete="current=password"
                        {...register("password")}
                    />

                    <Button
                        as="button"
                        type="submit"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending 
                            ?   "Inloggen..."
                            : "Inloggen"}
                    </Button>
                </div>
            </form>
        </>
    );
}
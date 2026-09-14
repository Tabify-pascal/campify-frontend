import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import Button from "../../../components/ui/Button";

import {
    contactSchema,
    type ContactFormData,
} from "../schemas/contactSchema";
import { useCreateContactMessage } from "../mutations/useCreateContactMessage";
import { useCampings } from "../../campings/queries/useCampings";

import styles from "./ContactPage.module.css"
import FormField from "../../../components/ui/Forms/FormField/Formfield";

export default function ContactPage() {
    const createMessageMutation = useCreateContactMessage();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            campingId: "",
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const {
        data: campings = [],
    } = useCampings();

    function onSubmit(data: ContactFormData) {
        createMessageMutation.mutate(data, {
            onSuccess: () => {
                reset();
            },
        })
    }

    return (
        <>
            <PageHeader
                title="Contact"
                description="Heb je een vraag over reserveren, beschikbaarheid of onze camping? Stuur ons gerust een bericht."
            />

            <section className={styles.page}>
                <div className={styles.info}>
                    <h2>Neem contact op</h2>
                    <p>
                        We helpen je graag met vragen over campingplaatsen,
                        reserveringen en voorzieningen.
                    </p>

                    <div className={styles.details}>
                        <span>📍 Bosweg 12, 1234 AB Natuurveen</span>
                        <span>📞 0123 456 789</span>
                        <span>✉️ info@campify.nl</span>
                    </div>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        label="Naam"
                        htmlFor="name"
                        error={errors.name?.message}
                    >
                        <input id="name" {...register("name")} />
                    </FormField>

                    <FormField
                        label="Camping"
                        htmlFor="campingId"
                        error={errors.campingId?.message}
                    >
                        <select
                            id="campingId"
                            {...register("campingId")}
                        >
                            <option value="">
                                Kies een camping
                            </option>

                            {campings.map((camping) => (
                                <option
                                    key={camping.id}
                                    value={camping.id}
                                >
                                    {camping.name}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField
                        label="E-mail"
                        htmlFor="email"
                        error={errors.email?.message}
                    >
                        <input id="email" {...register("email")} />
                    </FormField>

                    <FormField
                        label="Onderwerp"
                        htmlFor="subject"
                        error={errors.subject?.message}
                    >
                        <input id="subject" {...register("subject")} />
                    </FormField>

                    <FormField
                        label="Bericht"
                        htmlFor="message"
                        error={errors.message?.message}
                    >
                        <textarea id="message" rows={6} {...register("message")} />
                    </FormField>

                    <Button as="button" type="submit">
                        Verstuur bericht
                    </Button>
                </form>
            </section>
        </>
    );
}
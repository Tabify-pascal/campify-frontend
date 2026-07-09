import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import Button from "../../../components/ui/Button";
import FormError from "../../../components/ui/FormError";

import {
    contactSchema,
    type ContactFormData,
} from "../schemas/contactSchema";

import styles from "./ContactPage.module.css"

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit(data: ContactFormData) {
        console.log(data);
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
                    <div className={styles.field}>
                        <label htmlFor="name">Naam</label>
                        <input id="name" {...register("name")} />
                        <FormError error={errors.name} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">E-mail</label>
                        <input id="email" { ...register("email")} />
                        <FormError error={errors.subject}/>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="subject">Onderwerp</label>
                        <input id="subject" {...register("subject")} />
                        <FormError error={errors.subject}/>
                    </div>

                    <div className={ styles.field}>
                        <label htmlFor="message">Bericht</label>
                        <textarea id="message" rows={6} {...register("message")} />
                        <FormError error={errors.message} />
                    </div>

                    <Button as="button" type="submit">
                        Verstuur bericht
                    </Button>
                </form>
            </section>
        </>
    );
}
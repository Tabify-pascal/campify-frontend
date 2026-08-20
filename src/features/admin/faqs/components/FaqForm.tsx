import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/ui/Button";
import FormError from "../../../../components/ui/FormError";
import { faqSchema, type FaqFormData, type FaqFormInput } from "../schemas/faqSchema";

import styles from "./FaqForm.module.css";
import FormField from "../../../../components/ui/Forms/FormField/Formfield";

type Props = {
    defaultValues?: Partial<FaqFormInput>;
    onSubmit: (data: FaqFormData) => void;
    isSubmitting?: boolean;
    submitLabel?: string;
};


export default function FaqForm({
    defaultValues,
    onSubmit,
    isSubmitting = false,
    submitLabel = "Opslaan",
}: Props) {
    const { register, handleSubmit, formState: { errors},} = useForm<FaqFormInput, unknown, FaqFormData>({
        resolver: zodResolver(faqSchema),
        defaultValues: {
            question: "",
            answer: "",
            ...defaultValues,
        }
    });

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

            <FormField
                label="Vraag"
                htmlFor="question"
                error={errors.question?.message}
            >
                <input id="question" {...register("question")} />
            </FormField>

            <FormField
                label="Antwoord"
                htmlFor="answer"
                error={errors.answer?.message}
            >
                <textarea
                    id="answer"
                    rows={4}
                    aria-invalid={Boolean(errors.answer)}
                    {...register("answer")}
                />
            </FormField>
            
            <Button
                as="button"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Opslaan..." : submitLabel}
            </Button>
        </form>
    )
}


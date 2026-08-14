import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "../../../../components/ui/Button";
import FormError from "../../../../components/ui/FormError";

import styles from "./MessageStatusForm.module.css";

import { type ContactMessageStatusFormData, type ContactMessageStatusFormInput, contactMessageStatusSchema } from "../schemas/contactMessageStatusSchema";

type Props = {
    defaultValues: ContactMessageStatusFormInput;
    isSubmitting?: boolean;
    onSubmit: (data: ContactMessageStatusFormData) => void;
};

export default function MessageStatusForm({
    defaultValues,
    isSubmitting = false,
    onSubmit,
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactMessageStatusFormInput, unknown, ContactMessageStatusFormData>({
        resolver: zodResolver(contactMessageStatusSchema),
        defaultValues,
    });

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <div className={styles.field}>
                <label htmlFor="status">
                    Status
                </label>

                <select 
                    id="status"
                    disabled={isSubmitting}
                    {...register("status")}
                >
                    <option value="NEW">
                        Nieuw
                    </option>
                    <option value="READ">
                        Gelezen
                    </option>
                    <option value="CLOSED">
                        Afgehandeld
                    </option>
                </select>

                <FormError
                    message={errors.status?.message}
                />
            </div>
            <Button
                as="button"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Opslaan..." : "Status opslaan" }
            </Button>
        </form>
    );
}

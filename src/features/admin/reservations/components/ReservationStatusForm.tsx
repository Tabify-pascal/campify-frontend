import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "../../../../components/ui/Button";
import FormError from "../../../../components/ui/FormError";

import styles from "./ReservationStatusForm.module.css";
import { type ReservationStatusFormInput, type ReservationStatusFormData, reservationStatusSchema } from "../schemas/reservationStatusSchema";

type Props = {
    defaultValues: ReservationStatusFormInput;
    isSubmitting?: boolean;
    onSubmit: (data: ReservationStatusFormData) => void;
};

export default function ReservationStatusForm({
    defaultValues,
    isSubmitting = false,
    onSubmit,
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReservationStatusFormInput, unknown, ReservationStatusFormData>({
        resolver: zodResolver(reservationStatusSchema),
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
                    <option value="PENDING">
                        In behandeling
                    </option>
                    <option value="CONFIRMED">
                        Bevestigd
                    </option>
                    <option value="CANCELLED">
                        Geannuleerd
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
                {isSubmitting
                    ? "Opslaan..."
                    : "Status opslaan"
                }
            </Button>
        </form>
    );
}

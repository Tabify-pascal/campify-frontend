import { useForm, type Path } from "react-hook-form";

import Button from "../../../../components/ui/Button";
import FormError from "../../../../components/ui/FormError";

import styles from "./AdminStatusForm.module.css";

type StatusOption<TStatus extends string> = {
    value: TStatus;
    label: string;
};

type FormValues<TStatus extends string> = {
    status: TStatus;
};

type Props<TStatus extends string> = {
    defaultValue: TStatus;
    options: StatusOption<TStatus>[];
    isSubmitting?: boolean;
    onSubmit: (data: FormValues<TStatus>) => void;
};

export default function AdminStatusForm<TStatus extends string>({
    defaultValue,
    options,
    isSubmitting = false,
    onSubmit,
}: Props<TStatus>) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues<TStatus>>({
        defaultValues: {
            status: defaultValue,
        },
    });

    const statusField = "status" as Path<FormValues<TStatus>>;

    const statusError = 
        typeof errors.status?.message === "string"
            ? errors.status.message
            : undefined;

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={styles.field}>
                <label htmlFor="status">
                    Status beheren
                </label>

                <select
                    id="status"
                    disabled={isSubmitting}
                    {...register(statusField, {
                        required: "Status is verplicht"
                    })}
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <FormError
                    message={statusError}
                />
            </div>

            <Button
                as="button"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Opslaan..."
                    : "Status opslaan"}
            </Button>
        </form>
    );
}
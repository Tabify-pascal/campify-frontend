import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../../components/ui/Button";
import FormField from "../../../../components/ui/Forms/FormField/Formfield";

import {
    campingSchema,
    type CampingFormData,
    type CampingFormInput,
} from "../schemas/campingSchema";

import styles from "./CampingForm.module.css";
import ImageUploadField from "../../../../components/ui/Forms/ImageUploadField/ImageUploadField";

type Props = {
    defaultValues?: Partial<CampingFormInput>;
    currentLogoUrl?: string;
    onSubmit: (data: CampingFormData) => void;
    isSubmitting?: boolean;
    submitLabel?: string;
};

export default function CampingForm({
    defaultValues,
    currentLogoUrl,
    onSubmit,
    isSubmitting = false,
    submitLabel = "Opslaan",
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<
        CampingFormInput,
        unknown,
        CampingFormData
    >({
        resolver: zodResolver(campingSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            ...defaultValues,
        },
    });

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <FormField
                label="Naam"
                htmlFor="name"
                error={errors.name?.message}
            >
                <input
                    id="name"
                    {...register("name")}
                />
            </FormField>

            <FormField
                label="Slug"
                htmlFor="slug"
                error={errors.slug?.message}
                hint="Bijvoorbeeld: camping-de-bosrand"
            >
                <input
                    id="slug"
                    {...register("slug")}
                />
            </FormField>

            <FormField
                label="Beschrijving"
                htmlFor="description"
                error={errors.description?.message}
            >
                <textarea
                    id="description"
                    rows={6}
                    {...register("description")}
                />
            </FormField>

            <ImageUploadField
                id="logo"
                currentImageUrl={currentLogoUrl}
                currentImageAlt="Huidig campinglogo"
                inputProps={register("logo")}
                error={
                    typeof errors.logo?.message === "string"
                        ? errors.logo.message
                        : undefined
                }
            />

            <Button
                as="button"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Opslaan..."
                    : submitLabel}
            </Button>
        </form>
    );
}
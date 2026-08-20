import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../../components/ui/Button";
import FormField from "../../../../components/ui/Forms/FormField/Formfield";
import FormRow from "../../../../components/ui/Forms/FormRow/FormRow";

import FeatureFields from "./FeatureFields";

import {
    spotSchema,
    type SpotFormData,
    type SpotFormInput,
} from "../schemas/spotSchema";

import styles from "./SpotForm.module.css";
import CurrentImage from "../../../../components/ui/Forms/CurrentImage/CurrentImage";

type Props = {
    defaultValues?: Partial<SpotFormInput>;
    currentImageUrl?: string;
    onSubmit: (data: SpotFormData) => void;
    isSubmitting?: boolean;
    submitLabel?: string;
    requireImage?: boolean;
};

export default function SpotForm({
    defaultValues,
    onSubmit,
    isSubmitting = false,
    submitLabel = "Opslaan",
    currentImageUrl,
    requireImage = false,
}: Props) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SpotFormInput, unknown, SpotFormData>({
        resolver: zodResolver(spotSchema),
        defaultValues: {
            name: "",
            description: "",
            capacity: 2,
            pricePerNight: 30,
            size: 100,
            electricity: true,
            waterConnection: false,
            features: [],
            ...defaultValues,
        },
    });

    const imageError =
        typeof errors.image?.message === "string"
            ? errors.image.message
            : undefined;

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
                label="Beschrijving"
                htmlFor="description"
                error={errors.description?.message}
            >
                <textarea
                    id="description"
                    rows={5}
                    {...register("description")}
                />
            </FormField>

            <FormRow>
                <FormField
                    label="Capaciteit"
                    htmlFor="capacity"
                    error={errors.capacity?.message}
                >
                    <input
                        id="capacity"
                        type="number"
                        min="1"
                        {...register("capacity")}
                    />
                </FormField>

                <FormField
                    label="Prijs per nacht"
                    htmlFor="pricePerNight"
                    error={errors.pricePerNight?.message}
                >
                    <input
                        id="pricePerNight"
                        type="number"
                        min="1"
                        step="0.01"
                        {...register("pricePerNight")}
                    />
                </FormField>
            </FormRow>

            <FormField
                label="Oppervlakte in m²"
                htmlFor="size"
                error={errors.size?.message}
            >
                <input
                    id="size"
                    type="number"
                    min="1"
                    {...register("size")}
                />
            </FormField>

            {currentImageUrl && (
                <CurrentImage
                    src={currentImageUrl}
                    alt="Huidige campingplaats"
                />
            )}

            <FormField
                label={
                    requireImage
                        ? "Afbeelding"
                        : "Nieuwe afbeelding"
                }
                htmlFor="image"
                error={imageError}
                hint={
                    !requireImage && currentImageUrl
                        ? "Laat dit veld leeg om de huidige afbeelding te behouden."
                        : undefined
                }
            >
                <input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    {...register("image")}
                />
            </FormField>


            <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        {...register("electricity")}
                    />
                    <span>Elektriciteit aanwezig</span>
                </label>

                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        {...register("waterConnection")}
                    />
                    <span>Wateraansluiting aanwezig</span>
                </label>
            </div>

            <FeatureFields
                control={control}
                register={register}
                errors={errors}
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
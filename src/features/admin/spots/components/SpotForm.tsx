import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/ui/Button";
import FormError from "../../../../components/ui/FormError";
import styles from "./SpotForm.module.css";

import { spotSchema, type SpotFormData, type SpotFormInput } from "../schemas/spotSchema"

type Props = {
    defaultValues?: SpotFormInput;
    onSubmit: (data: SpotFormData) => void;
    isSubmitting?: boolean;
    submitLabel?: string;
};

export default function SpotForm({ defaultValues, onSubmit, isSubmitting, submitLabel }: Props) {
    const { register, handleSubmit, formState: { errors }, } = useForm<SpotFormInput, unknown, SpotFormData>({
        resolver: zodResolver(spotSchema),
        defaultValues: {
            name: "",
            description: "",
            capacity: 2,
            pricePerNight: 30,
            size: 100,
            imageUrl: "/images/campify.png",
            electricity: true,
            waterConnection: false,
            ...defaultValues,
        },
    });

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
                <label htmlFor="name">Naam</label>
                <input id="name" {...register("name")} />
                <FormError error={errors.name} />
            </div>

            <div className={styles.field}>
                <label htmlFor="description">Beschrijving</label>
                <textarea
                    id="description"
                    rows={5}
                    {...register("description")}
                />
                <FormError error={errors.description} />
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="capacity">Capaciteit</label>
                    <input
                        id="capacity"
                        type="number"
                        min="1"
                        {...register("capacity")}
                    />
                    <FormError error={errors.capacity} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="pricePerNight">Prijs per nacht</label>
                    <input
                        id="PricePerNight"
                        type="number"
                        min="1"
                        step="0.01"
                        {...register("pricePerNight")}
                    />
                    <FormError error={errors.pricePerNight} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="size">Oppervlakte in m²</label>
                    <input
                        id="size"
                        type="number"
                        min="1"
                        {...register("size")}
                    />
                    <FormError error={errors.size} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="imageUrl">Afbeelding URL</label>
                    <input
                        id="imageUrl"
                        placeholder="/images/campify.png"
                        {...register("imageUrl")}
                    />
                    <FormError error={errors.imageUrl} />
                </div>

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
            </div>
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
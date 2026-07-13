import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/ui/Button";
import FormError from "../../../../components/ui/FormError";
import styles from "./SpotForm.module.css";

import { spotSchema, type SpotFormData, type SpotFormInput } from "../schemas/spotSchema"

type Props = {
  defaultValues?: Partial<SpotFormInput>;
  currentImageUrl?: string;
  onSubmit: (data: SpotFormData) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  requireImage?: boolean;
};

export default function SpotForm({  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Opslaan",
  currentImageUrl,
  requireImage = false }: Props) {
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm<SpotFormInput, unknown, SpotFormData>({
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



    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
                <label htmlFor="name">Naam</label>
                <input id="name" {...register("name")} />
                <FormError message={errors.name?.message} />
            </div>

            <div className={styles.field}>
                <label htmlFor="description">Beschrijving</label>
                <textarea
                    id="description"
                    rows={5}
                    {...register("description")}
                />
                <FormError message={errors.description?.message} />
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
                    <FormError message={errors.capacity?.message} />
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
                    <FormError message={errors.pricePerNight?.message} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="size">Oppervlakte in m²</label>
                    <input
                        id="size"
                        type="number"
                        min="1"
                        {...register("size")}
                    />
                    <FormError message={errors.size?.message} />
                </div>

                {currentImageUrl && (
                <div className={styles.currentImage}>
                    <span>Huidige afbeelding</span>

                    <img
                    src={currentImageUrl}
                    alt="Huidige campingplaats"
                    />
                </div>
                )}

                <div className={styles.field}>
                    <label htmlFor="image">
                        {requireImage ? "Afbeelding" : "Nieuwe afbeelding"}
                    </label>

                    <input
                        id="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        {...register("image")}
                    />

                    {!requireImage && currentImageUrl && (
                        <small>
                        Laat dit veld leeg om de huidige afbeelding te behouden.
                        </small>
                    )}

                    <FormError message={errors.image?.message} />
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

                <div className={styles.field}>
                    <label htmlFor="features">Kenmerken</label>

                    <input
                        id="features"
                        placeholder="Aan de bosrand, Ruime plek, Geschikt voor gezinnen"
                        onChange={(event) => {
                        const features = event.target.value
                            .split(",")
                            .map((feature) => feature.trim())
                            .filter(Boolean);

                        setValue("features", features);
                        }}
                    />

                    <FormError message={errors.features?.message} />
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
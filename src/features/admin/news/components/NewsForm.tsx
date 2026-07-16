import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../../components/ui/Button";
import FormError from "../../../../components/ui/FormError";

import { newsSchema, type NewsFormData, type NewsFormInput } from "../schemas/newsSchema"

import styles from "./NewsForm.module.css";

type Props = { 
    defaultValues?: Partial<NewsFormInput>;
    currentImageUrl?: string;
    requireImage?: boolean;
    isSubmitting?: boolean;
    submitLabel?: string;
    onSubmit: (data: NewsFormData) => void;
};

export default function NewsForm({
    defaultValues,
    currentImageUrl,
    requireImage = false,
    isSubmitting = false,
    submitLabel = "Opslaan",
    onSubmit,
}: Props) {
    const {
        register,
        handleSubmit, 
        formState: { errors },
    } = useForm<NewsFormInput, unknown, NewsFormData>({
        resolver: zodResolver(newsSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            date: new Date().toISOString().slice(0,10),
            ...defaultValues
        },
    });

    return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.field}>
        <label htmlFor="title">Titel</label>

        <input
          id="title"
          {...register("title")}
        />

        <FormError message={errors.title?.message} />
      </div>

      <div className={styles.field}>
        <label htmlFor="excerpt">Samenvatting</label>

        <textarea
          id="excerpt"
          rows={3}
          {...register("excerpt")}
        />

        <FormError message={errors.excerpt?.message} />
      </div>

      <div className={styles.field}>
        <label htmlFor="content">Inhoud</label>

        <textarea
          id="content"
          rows={10}
          {...register("content")}
        />

        <FormError message={errors.content?.message} />
      </div>

      <div className={styles.field}>
        <label htmlFor="date">Publicatiedatum</label>

        <input
          id="date"
          type="date"
          {...register("date")}
        />

        <FormError message={errors.date?.message} />
      </div>

      {currentImageUrl && (
        <div className={styles.currentImage}>
          <span>Huidige afbeelding</span>

          <img
            src={currentImageUrl}
            alt="Huidige afbeelding van het nieuwsbericht"
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

        <FormError
          message={
            typeof errors.image?.message === "string"
              ? errors.image.message
              : undefined
          }
        />
      </div>

      <Button
        as="button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Opslaan..." : submitLabel}
      </Button>
    </form>
  );
}
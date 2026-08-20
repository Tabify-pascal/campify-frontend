import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../../components/ui/Button";
import FormField from "../../../../components/ui/Forms/FormField/Formfield";

import { newsSchema, type NewsFormData, type NewsFormInput } from "../schemas/newsSchema"

import styles from "./NewsForm.module.css";
import CurrentImage from "../../../../components/ui/Forms/CurrentImage/CurrentImage";


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
      date: new Date().toISOString().slice(0, 10),
      ...defaultValues
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        label="Titel"
        htmlFor="title"
        error={errors.title?.message}
      >
        <input
          id="title"
          {...register("title")}
        />
      </FormField>

      <FormField
        label="Samenvatting"
        htmlFor="expert"
        error={errors.excerpt?.message}
      >
        <textarea
          id="excerpt"
          rows={3}
          {...register("excerpt")}
        />
      </FormField>

      <FormField
        label="content"
        htmlFor="content"
        error={errors.content?.message}
      >
        <textarea
          id="content"
          rows={10}
          {...register("content")}
        />
      </FormField>

      <FormField
        label="Publicatiedatum"
        htmlFor="date"
        error={errors.date?.message}
      >
        <input
          id="date"
          type="date"
          {...register("date")}
        />
      </FormField>

      {currentImageUrl && (
        <CurrentImage
          src={currentImageUrl}
          alt="Huidige afbeelding van het nieuwsbericht"
        />
      )}
      
      <FormField
        label={requireImage ? "Afbeelding" : "Nieuwe afbeelding"}
        htmlFor="image"
        error={errors.image?.message}
      ><input
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
      </FormField>

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
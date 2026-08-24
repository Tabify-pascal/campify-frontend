import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../../components/ui/Button";
import FormField from "../../../../components/ui/Forms/FormField/Formfield";
import ImageUploadField from "../../../../components/ui/Forms/ImageUploadField/ImageUploadField";

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

      <ImageUploadField
        id="image"
        currentImageUrl={currentImageUrl}
        currentImageAlt="Huidige afbeelding van het nieuwsbericht"
        inputProps={register("image")}
        error={
          typeof errors.image?.message === "string"
            ? errors.image.message
            : undefined
        }
      />

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
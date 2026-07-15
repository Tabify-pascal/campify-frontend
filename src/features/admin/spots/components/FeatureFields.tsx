import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

import FormError from "../../../../components/ui/FormError";
import type { SpotFormInput } from "../schemas/spotSchema";

import styles from "./FeatureFields.module.css";

type Props = {
  control: Control<SpotFormInput>;
  register: UseFormRegister<SpotFormInput>;
  errors: FieldErrors<SpotFormInput>;
};

export default function FeatureFields({
  control,
  register,
  errors,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <fieldset className={styles.fieldset}>
      <div className={styles.header}>
        <div>
          <legend>Kenmerken</legend>
          <p>Voeg optioneel eigenschappen van deze campingplaats toe.</p>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={() => append({ name: "" })}
        >
          <span aria-hidden="true">+</span>
          Kenmerk toevoegen
        </button>
      </div>

      {fields.length === 0 ? (
        <p className={styles.empty}>
          Er zijn nog geen kenmerken toegevoegd.
        </p>
      ) : (
        <div className={styles.list}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor={`features.${index}.name`}>
                  Kenmerk {index + 1}
                </label>

                <input
                  id={`features.${index}.name`}
                  placeholder="Bijvoorbeeld: Aan de bosrand"
                  {...register(`features.${index}.name`)}
                />

                <FormError
                  message={errors.features?.[index]?.name?.message}
                />
              </div>

              <button
                type="button"
                className={styles.removeButton}
                onClick={() => remove(index)}
                aria-label={`Verwijder kenmerk ${index + 1}`}
              >
                −
              </button>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
}
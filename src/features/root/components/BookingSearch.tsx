import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/ui/Button";
import {
  bookingSearchSchema,
  type BookingSearchFormData,
  type BookingSearchFormInput,
} from "../schemas/bookingSearchSchema";
import styles from "./BookingSearch.module.css";

export default function BookingSearch() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSearchFormInput, unknown, BookingSearchFormData>({
    resolver: zodResolver(bookingSearchSchema),
    defaultValues: {
      arrivalDate: "",
      departureDate: "",
      guests: 2,
    },
  });

  function onSubmit(data: BookingSearchFormData) {
    const searchParams = new URLSearchParams({
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
      guests: String(data.guests),
    });

    navigate(`/plaatsen?${searchParams.toString()}`);
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="arrivalDate">Aankomst</label>
        <input id="arrivalDate" type="date" {...register("arrivalDate")} />
        {errors.arrivalDate && (
          <span className={styles.error}>{errors.arrivalDate.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="departureDate">Vertrek</label>
        <input id="departureDate" type="date" {...register("departureDate")} />
        {errors.departureDate && (
          <span className={styles.error}>{errors.departureDate.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="guests">Personen</label>
        <select id="guests" {...register("guests")}>
          <option value="1">1 persoon</option>
          <option value="2">2 personen</option>
          <option value="3">3 personen</option>
          <option value="4">4 personen</option>
          <option value="5">5 personen</option>
          <option value="6">6 personen</option>
        </select>
      </div>

      <Button as="button" type="submit">
        Zoek plekken
      </Button>
    </form>
  );
}
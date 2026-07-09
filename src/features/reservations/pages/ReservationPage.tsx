import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import { useSpot } from "../../spots/queries/useSpot";
import { useCreateReservation } from "../mutations/useCreateReservation";
import ReservationStartPage from "../components/ReservationStartPage";

import FormError from "../../../components/ui/FormError";

import {
    reservationSchema,
    type ReservationFormData,
    type ReservationFormInput,
} from "../schemas/reservationSchema";

import styles from "./ReservationPage.module.css";

export default function ReservationPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const spotId = searchParams.get("spotId") ?? undefined;
    const arrivalDate = searchParams.get("arrivalDate") ?? "";
    const departureDate = searchParams.get("departureDate") ?? "";
    const { data: spot } = useSpot(spotId);
    const createReservationMutation = useCreateReservation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReservationFormInput, unknown, ReservationFormData>({
        resolver: zodResolver(reservationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            guests: 2,
            arrivalDate,
            departureDate,
            notes: "",
        },
    });

    function onSubmit(data: ReservationFormData) {
        if (!spotId) return;
        createReservationMutation.mutate(
            {
                spotId,
                ...data
            },
            {
                onSuccess: () => {
                    navigate("/bevestiging");
                }
            },
        );
    }

    if (!spot) {
        return (
            <ReservationStartPage />
        );
    }

    

    return (
        <section className={styles.page}>
            <div className={styles.summary}>
                <span className={styles.badge}>Je gekozen plek</span>
                <h1>{spot.name}</h1>
                <p>{spot.description}</p>

                <div className={styles.meta}>
                    <span>👥 Max. {spot.capacity} personen</span>
                    <span>€ {spot.pricePerNight}/nacht</span>
                    <span>{spot.size}m²</span>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2>Reserveringsgegevens</h2>
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="firstName">Voornaam</label>
                        <input id="firstName" {...register("firstName")} />
                        {errors.firstName && <FormError error={errors.firstName}/>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="lastName">Achternaam</label>
                        <input id="lastName" {...register("lastName")} />
                        {errors.lastName && <FormError error={errors.lastName}/>}
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="email" {...register("email")} />
                    {errors.email && <FormError error={errors.email}/>}
                </div>

                <div className={styles.field}>
                    <label htmlFor="phone">Telefoon</label>
                    <input id="phone" {...register("phone")} />
                    {errors.phone && <FormError error={errors.phone}/>}
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="arrivalDate">Aankomst</label>
                        <input id="arrivalDate" type="date" {...register("arrivalDate")} readOnly={Boolean(arrivalDate)}/>
                        {errors.arrivalDate && <FormError error={errors.arrivalDate}/>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="departureDate">Vertrek</label>
                        <input id="departureDate" type="date" {...register("departureDate")} readOnly={Boolean(departureDate)}/>
                        {errors.departureDate && <FormError error={errors.departureDate}/>}
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="guests">Aantal personen</label>
                    <select id="guests" {...register("guests")}>
                        {Array.from({ length: spot.capacity }, (_, index) => index + 1).map(
                            (guestCount) => (
                                <option key={guestCount} value={guestCount}>
                                    {guestCount} {guestCount === 1 ? "persoon" : "personen"}
                                </option>
                            )
                        )}
                    </select>
                    {errors.guests && <FormError error={errors.guests}/>}
                </div>

                <div className={styles.field}>
                    <label htmlFor="notes">Opmerkingen</label>
                    <textarea id="notes" rows={4} {...register("notes")} />
                </div>

                {
                    createReservationMutation.isError && (
                        <p className={styles.error}>
                            Reservering kon niet worden geplaatst.
                            Controleer je gegevens of kies andere datums. 
                        </p>
                    )
                }

                <Button
                    as="button"
                    type="submit"
                    disabled={createReservationMutation.isPending}
                    >
                    {createReservationMutation.isPending
                        ? "Bezig met plaatsen..."
                        : "Reservering plaatsen"}
                </Button>
            </form>
        </section>
    );
}
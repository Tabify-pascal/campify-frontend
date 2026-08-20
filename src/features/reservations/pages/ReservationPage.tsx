import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import { useSpot } from "../../spots/queries/useSpot";
import { useCreateReservation } from "../mutations/useCreateReservation";
import ReservationStartPage from "../components/ReservationStartPage";

import {
    reservationSchema,
    type ReservationFormData,
    type ReservationFormInput,
} from "../schemas/reservationSchema";

import styles from "./ReservationPage.module.css";
import FormRow from "../../../components/ui/Forms/FormRow/FormRow";
import FormField from "../../../components/ui/Forms/FormField/Formfield";

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

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2>Reserveringsgegevens</h2>
                <FormRow>
                    <FormField
                        label="Voornaam"
                        htmlFor="firstName"
                        error={errors.firstName?.message}
                    >
                        <input
                            id="firstName"
                            {...register("firstName")}
                        />
                    </FormField>
                    <FormField
                        label="Achternaam"
                        htmlFor="lastName"
                        error={errors.lastName?.message}
                    >
                        <input
                            id="lastName"
                            {...register("lastName")}
                        />
                    </FormField>
                </FormRow>
                <FormField
                    label="E-mail"
                    htmlFor="emial"
                    error={errors.email?.message}
                >
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                    />
                </FormField>

                <FormField
                    label="Telefoon"
                    htmlFor="phone"
                    error={errors.phone?.message}
                >
                    <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                    />
                </FormField>

                <FormRow>
                    <FormField
                        label="Aankomst"
                        htmlFor="arrivalDate"
                        error={errors.arrivalDate?.message}
                    >
                        <input
                            id="arrivalDate"
                            type="date"
                            readOnly={Boolean(arrivalDate)}
                            {...register("arrivalDate")}
                        />
                    </FormField>

                    <FormField
                        label="Vertrek"
                        htmlFor="departureDate"
                        error={errors.departureDate?.message}
                    >
                        <input
                            id="departureDate"
                            type="date"
                            readOnly={Boolean(departureDate)}
                            {...register("departureDate")}
                        />
                    </FormField>
                </FormRow>

                <FormField
                    label="Aantal personen"
                    htmlFor="guests"
                    error={errors.guests?.message}
                >
                    <select
                        id="guests"
                        {...register("guests")}
                    >
                        {Array.from(
                            { length: spot.capacity},
                            (_, index) => index + 1
                        ).map((guestCount) => (
                            <option
                                key={guestCount}
                                value={guestCount}
                            >
                                {guestCount}{" "}{guestCount === 1 ? "persoon" : "personen"}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField
                    label="Opmerkingen"
                    htmlFor="notes"
                >
                    <textarea
                        id="notes"
                        rows={4}
                        {...register("notes")}
                    />
                </FormField>

                {createReservationMutation.isError && (
                    <p className={styles.error}>
                        Reservering kon niet worden geplaatst.
                        Controleer je gegevens of kies anderes datums.
                    </p>
                )}

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
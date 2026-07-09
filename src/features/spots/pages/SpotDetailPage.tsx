import { useParams, useSearchParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { useSpot } from "../queries/useSpot";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";
import { useSpotAvailability } from "../queries/useSpotAvailability";

import AvailabilityCalender from "../components/AvailabilityCalender";
import { getMonthRange, rangeContainsUnavailableDate } from "../../../utils/dateUtils";

import styles from "./SpotDetailPage.module.css";
import { useState } from "react";

export default function SpotDetailPage() {
    const [ searchParams ] = useSearchParams();
    const { spotId } = useParams();
    const { data: spot, isLoading, error } = useSpot(spotId);

    const initialArrivalDate = searchParams.get("arrivalDate");
    const initialDepartureDate = searchParams.get("departureDate");

    const [arrivalDate, setArrivalDate] = useState<string | null>(initialArrivalDate);
    const [departureDate, setDepartureDate] = useState<string | null>(initialDepartureDate);
    
    const [ currentMonth, setCurrentMonth] = useState(() => {
        if (initialArrivalDate) {
            const date = new Date(initialArrivalDate);

            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
            };
        }

        const today = new Date();

        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
        };
    });



    function selectDate(date: string) {
        if (!arrivalDate || departureDate || date < arrivalDate) {
            setArrivalDate(date);
            setDepartureDate(null);
            return;
        }

        if (
            availability &&
            rangeContainsUnavailableDate(
                arrivalDate,
                date,
                availability.unavailableDates
            )
        ) {
            setArrivalDate(date);
            setDepartureDate(null);
            return;
        }

        setDepartureDate(date);
    }      

    const { startDate, endDate } = getMonthRange(
        currentMonth.year,
        currentMonth.month
    );

    const { data: availability } = useSpotAvailability(
        spotId,
        startDate,
        endDate
    );


    if (isLoading) return <p>Laden...</p>

    if (error || !spot) {
        return (
            <MessageCard
                title="Plek niet gevonden"
                message="Deze campingplaats bestaat niet."
                linkTo="/plaatsen"
                linkText="Terug naar plaatsen"
            />
        );
    }

    function previousMonth() {
        setCurrentMonth((current) => {
            if (current.month === 1) {
            return {
                year: current.year - 1,
                month: 12,
            };
            }

            return {
            ...current,
            month: current.month - 1,
            };
        });
    }

    function nextMonth() {
        setCurrentMonth((current) => {
            if (current.month === 12) {
            return {
                year: current.year + 1,
                month: 1,
            };
            }

            return {
            ...current,
            month: current.month + 1,
            };
        });
    }

    function isCurrentMonth(year: number, month: number){
        const today = new Date();

        return (
            year === today.getFullYear() &&
            month === today.getMonth() + 1
        );
    }

    return (
        <section className={styles.detail}>
            <div className={styles.image}>
                <img
                    src={spot.imageUrl || "/images/campify.png"}
                    alt={spot.name}
                />
            </div>



            <div className={styles.content}>
                <span className={styles.badge}></span>
                <h1>{spot.name}</h1>
                <p>{spot.description}</p>

                <div className={styles.meta}>
                    <div>
                        <strong>{spot.capacity}</strong>
                        <span>personen</span>
                    </div>

                    <div>
                        <strong>€ {spot.pricePerNight}</strong>
                        <span>per nacht</span>
                    </div>

                    <div>
                        <strong>{spot.size}m²</strong>
                        <span>oppervlakte</span>
                    </div>
                </div>

                <div className={styles.facilities}>
                    <h2>Voorzienigen</h2>
                    <ul>
                        <li>{spot.electricity ? "✓ Elektriciteit aanwezig" : "× Geen elektriciteit"}</li>
                        <li>{spot.waterConnection ? "✓ Wateraansluiting" : "× Geen wateraansluiting"}</li>

                        {spot.features.map((feature) => (
                            <li key={feature.id}>✓ {feature.name}</li>
                        ))}
                    </ul>
                </div>

                
            </div>
            <div className={styles.calender}>
                {availability && (
                    <AvailabilityCalender
                        year={currentMonth.year}
                        month={currentMonth.month}
                        unavailableDates={availability?.unavailableDates ?? []}
                        arrivalDate={arrivalDate}
                        departureDate={departureDate}
                        onSelectDate={selectDate}
                        onPreviousMonth={previousMonth}
                        onNextMonth={nextMonth}
                        isPreviousMonthDisabled={isCurrentMonth(
                            currentMonth.year,
                            currentMonth.month
                        )}
                    />
                )}

                {arrivalDate && departureDate ? (
                    <Button
                        to={`/reserveren?spotId=${spot.id}&arrivalDate=${arrivalDate}&departureDate=${departureDate}`}
                    >
                        Reserveer deze periode
                    </Button>
                ): (
                    <p className={styles.hint}>Kies eerst een aankomst- en vertrekdatum.</p>
                )}

            </div>
            
        </section>
    );
}
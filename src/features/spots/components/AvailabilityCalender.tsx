import styles from "./AvailabilityCalender.module.css";
import { formatDate, getMonthName, getTodayString, isBeforeToday} from "../../../utils/dateUtils";
import { useMemo } from "react";

type Props = { 
    year: number;
    month: number;
    unavailableDates: string[];
    arrivalDate: string | null;
    departureDate: string | null;
    onSelectDate: (date: string) => void;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
    isPreviousMonthDisabled: boolean;
};

const weekdays = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];


export default function AvailabilityCalender({
    year, month, unavailableDates, onPreviousMonth, onNextMonth, isPreviousMonthDisabled, arrivalDate, departureDate, onSelectDate
}: Props) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();

    // Monday first
    const startOffset = (firstDayOfMonth.getDay() +6) % 7;

    const days = Array.from({ length: daysInMonth}, (_, index) => index +1);
    const emptyDays = Array.from({ length: startOffset});

    const unavailableSet = useMemo(
        () => new Set(unavailableDates),
        [unavailableDates]
    );

    const todayString = getTodayString();

    return (
        <section className={styles.card}>

                <div className={styles.header}>
                    <h2>Beschikbaarheid</h2>
                    <div className={styles.navigation}>
                        <button
                            type="button"
                            onClick={onPreviousMonth}
                            disabled={isPreviousMonthDisabled}
                        >
                            ←
                        </button>
                        <span>{getMonthName(year, month)}</span>

                        <button
                            type="button"
                            onClick={onNextMonth}
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className={styles.weekdays}>
                    {weekdays.map((day) => (
                        <span key={day}>{day}</span>
                    ))}
                </div>

                <div className={styles.grid}>
                    {emptyDays.map((_, index) => (
                        <span key={`empty-${index}`} className={styles.empty} />
                    ))}

                    {days.map((day) => {
                        const date = formatDate(year, month, day);
                        const isUnavailable = unavailableSet.has(date);
                        const isToday = date === todayString;
                        const isPast = isBeforeToday(date);
                        const isArrival = date === arrivalDate;
                        const isDeparture = date === departureDate;

                        const isInRange = 
                            arrivalDate !== null &&
                            departureDate !== null &&
                            date > arrivalDate &&
                            date < departureDate


                        return (
                            <button 
                                type="button" 
                                key={date}
                                onClick={() => onSelectDate(date)}
                                disabled={ isPast || isUnavailable}
                                className={`
                                    ${styles.day}
                                    ${isUnavailable ? styles.unavailable : styles.available}
                                    ${isToday ? styles.today : ""}
                                    ${isPast ? styles.past : ""}
                                    ${isArrival ? styles.selected : ""}
                                    ${isDeparture ? styles.selected : ""}
                                    ${isInRange ? styles.inRange : ""}
                                `}
                            >
                                {day}
                            </button>  
                        )
                    })}
                </div>

                <div className={styles.legend}>
                    <span>
                        <i className={styles.availableDot} /> Beschikbaar
                    </span>
                    <span>
                        <i className={styles.unavailableDot} /> Niet beschikbaar
                    </span>
                </div>
        </section>
    );
}
export function formatDateString(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2, "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
}

export function formatDate(year: number, month: number, day: number){
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getTodayString(){
    return formatDateString(new Date());
}

export function isBeforeToday(date: string) {
    return date < getTodayString();
}

export function getMonthName(year: number, month : number){
    return new Intl.DateTimeFormat("nl-NL", {
        month: "long",
        year: "numeric",
    }).format(new Date(year, month - 1));
}

export function getMonthRange(year: number, month: number) {
    const start = new Date(year, month -1 ,1);
    const end = new Date(year, month, 0);
    
    return {
        startDate: formatDateString(start),
        endDate: formatDateString(end),
    };
}

export function getDatesBetween(startDate: string, endDate: string){
    const dates: string[] = [];

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate < lastDate) {
        dates.push(formatDateString(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

export function rangeContainsUnavailableDate(
    startDate: string,
    endDate: string,
    unavailableDates: string[]
) { 
    const unavailableSet = new Set(unavailableDates);

    return getDatesBetween(startDate, endDate).some((date) =>
        unavailableSet.has(date)
    );
}


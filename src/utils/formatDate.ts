/**
 * @file formatDate.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

export function formatDate(date: string){
    return new Intl.DateTimeFormat("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}
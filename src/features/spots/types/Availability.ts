/**
 * @file Availability.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

export type Availability = {
    spotId: string;
    startDate: string;
    endDate: string;
    unavailableDates: string[];
};
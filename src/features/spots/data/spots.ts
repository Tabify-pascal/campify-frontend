import type { Spot } from "../types/Spot";

export const spots: Spot[] = [
    {
        id: "1",
        name: "Bosplaats",
        description: "Rustige plek tussen de bomen.",
        capacity: 4,
        pricePerNight: 35,
        imageUrl: "",

        size: 80,
        electricity: true,
        waterConnection: false,

        features: [
            "Dichtbij sanitair",
            "Schaduwrijke plek",
            "Huisdieren toegestaan",
        ],
    },
    {
        id: "2",
        name: "Meerzicht",
        description: "Direct uitzicht op het meer.",
        capacity: 6,
        pricePerNight: 48,
        imageUrl: "",
        size: 100,
        electricity: true,
        waterConnection: false,

        features: [
            "Dichtbij de winkel",
            "Dichtbij het zwembad",
            "Huisdieren toegestaan",
        ],
    },
    {
        id: "3",
        name: "Familieveld",
        description: "Ruime plek voor gezinnen.",
        capacity: 8,
        pricePerNight: 55,
        imageUrl: "",
        size: 120,
        electricity: true,
        waterConnection: true,

        features: [
            "Voor een groot gezin",
            "Schaduwrijke plek",
            "Rustige plek",
        ],
    },
]
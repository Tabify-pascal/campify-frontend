export const queryKeys = {
    auth: {
        currentUser: ["auth", "currentUser"] as const,
    },

    admin: {
        dashboard: ["admin", "dashboard"] as const,

        messages: {
            all: ["admin", "messages"] as const,
            detail: (messageId: string) =>
                ["admin", "messages", messageId] as const,
        },

        reservations: {
            all: ["admin", "reservations"] as const,
            detail: (reservationId: string) =>
                ["admin", "reservations", reservationId] as const,
        },

        faqs: {
            all: ["admin", "faqs"] as const,
            detail: (faqId: string) =>
                ["admin", "faqs", faqId] as const,
        },

        news: {
            all: ["admin", "news"] as const,
            detail: (newsId: string) =>
                ["admin", "news", newsId] as const,
        },

        spots: {
            all: ["admin", "spots"] as const,
            detail: (spotId: string) =>
                ["admin", "spots", spotId] as const,
        },
        campings: {
            all: ["admin", "campings"] as const,
            detail: (campingId: string) =>
                ["admin", "campings", campingId] as const,
        },
    },

    news: {
        all: ["news"] as const,
        detail: (newsId: string) =>
            ["news", newsId] as const,
    },

    faqs: {
        all: ["faqs"] as const,
    },

    spots: {
        all: ["spots"] as const,

        list: (params?: {
            campingId?: string | null;
            arrivalDate?: string | null;
            departureDate?: string | null;
            guests?: string | null;
        }) => [
            "spots",
            "list",
            params ?? {},
        ] as const,

        detail: (spotId: string) =>
            ["spots", spotId] as const,

        availability: (
            spotId: string | undefined,
            startDate: string,
            endDate: string,
        ) => [
            "spots",
            spotId,
            "availability",
            startDate,
            endDate,
        ] as const,
    },
    campings: {
        all: ["campings"] as const,
        detail: (campingId: string) =>
            ["campings", campingId] as const,
    },

    account: {
        reservations: ["account", "reservations"] as const,
    },
} as const;
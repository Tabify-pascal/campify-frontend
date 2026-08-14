export const queryKeys = {
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
        detail: (spotId: string) =>
            ["spots", spotId] as const,
    },
} as const;
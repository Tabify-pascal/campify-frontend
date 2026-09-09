export type SpotFeature = {
    id: string;
    name: string;
    spotId: string;
};

export type SpotCamping = {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
};

export type Spot = {
    id: string;
    name: string;
    description: string;
    capacity: number;
    pricePerNight: number;
    imageUrl: string;
    size: number;
    electricity: boolean;
    waterConnection: boolean;

    campingId: string;
    camping: SpotCamping;

    features: SpotFeature[];
};
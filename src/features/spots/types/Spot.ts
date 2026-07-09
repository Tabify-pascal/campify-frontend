export type SpotFeature = {
  id: string;
  name: string;
  spotId: string;
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
  features: SpotFeature[];
};
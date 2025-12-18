export interface Monument {
    id: string;
    name: string;
    imageId: string;
    location: string;
    latitude: number;
    longitude: number;
    description: string;
    era: string;
    architecture: string;
    culturalSignificance: string;
    interestingFacts: string[];
    distance?: number;
}

export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
}

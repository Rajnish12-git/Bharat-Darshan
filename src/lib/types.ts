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

export interface Booking {
  id: string;
  userId: string;
  bookingType: 'hotel' | 'guide';
  monumentName: string;
  city: string;
  state: string;
  visitDate: string;
  peopleCount: number;
  hotelCategory?: 'budget' | 'standard' | 'luxury';
  nights?: number;
  guideLanguage?: string;
  tourDuration?: 'half-day' | 'full-day';
  userName: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed';
  createdAt: any;
}

export type NewBookingData = Omit<Booking, 'id' | 'status' | 'createdAt'>;

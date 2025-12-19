export interface DetailItem {
  name: string;
  imageId: string;
  description: string;
  location?: string;
}

export interface StateData {
  slug: string;
  name: string;
  description: string;
  imageId: string;
  monuments: DetailItem[];
  cuisine: DetailItem[];
  festivals: DetailItem[];
  artForms: DetailItem[];
}

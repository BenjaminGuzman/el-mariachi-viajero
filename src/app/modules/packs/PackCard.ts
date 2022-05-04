export interface PackCard {
  id: string;
  name?: string;
  img: {
    url: string;
  };
  shortDescription: string;
  featuresIncluded: string;
  featuresExcluded?: string;
  price: string;
}

export type CategoryType = {
  slug: string;
  name: string;
  url: string;
};

export type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: DimentionsType;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ReviewType[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
  // Custom 
  isOnSale?: boolean;     // true if discount ≥ 7%
  finalPrice?: number;    // pre-calculated discounted price, else original price
  isNew?: boolean;        // arrived in last 7 days
};

type DimentionsType = {
  width: number;
  height: number;
  depth: number;
};
export type ReviewType = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

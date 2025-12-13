/** Raw product from API */
export type RawProduct = {
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
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
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
};

/* Fields from API to be used */
type ProductEssentials = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  reviews: ReviewType[];
  images: string[];
};

/** Final ProductType with added items */
export type ProductType = ProductEssentials & {
  isOnSale: boolean;
  finalPrice: number;
  // isNew: boolean;
};

export type ReviewType = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export const mapProductFromApi = (raw: RawProduct): ProductType => {
  const essentials: ProductEssentials = {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    category: raw.category,
    price: raw.price,
    discountPercentage: raw.discountPercentage,
    rating: raw.rating,
    brand: raw.brand,
    sku: raw.sku,
    weight: raw.weight,
    dimensions: raw.dimensions,
    reviews: raw.reviews,
    images: raw.images,
  };

  const discount = Number(raw.discountPercentage ?? 0);
  const isOnSale = discount >= 15 && discount <= 50; // Sale if discount is 15-50 %
  const finalPrice = isOnSale
    ? Number((raw.price * (1 - discount / 100)).toFixed(2))
    : raw.price;

  return { ...essentials, isOnSale, finalPrice };
};

export const mapProductsFromApi = (rawItems: RawProduct[]): ProductType[] => {
  const mapped = rawItems.map((item) => mapProductFromApi(item));
  return mapped;
};
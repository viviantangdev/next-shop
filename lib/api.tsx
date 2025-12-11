import {
  ALLOWED_CATEGORY_SLUGS,
  CategoryType,
  GROUP_TO_CATEGORIES,
} from './categories';
import { ProductType } from './product';

const API_BASE_URL = 'https://dummyjson.com';

let newestProductIds: Set<number> | null = null;

// Compute the 8 highest IDs
function getNewestProductIds(products: ProductType[]): Set<number> {
  if (newestProductIds) return newestProductIds;

  const sortedById = [...products].sort((a, b) => b.id - a.id);
  const topIds = sortedById.slice(0, 8).map((p) => p.id);

  newestProductIds = new Set(topIds);
  return newestProductIds;
}

function enhanceProduct(raw: ProductType, isAmongNewest: boolean) {
  const discount = Number(raw.discountPercentage ?? 0);
  // Sale if discount is 15-50 %
  const isOnSale = discount >= 15 && discount <= 50;

  const finalPrice = isOnSale
    ? Number((raw.price * (1 - discount / 100)).toFixed(2))
    : raw.price;

  return {
    ...raw,
    isOnSale,
    finalPrice,
    isNew: isAmongNewest, // only true for the 8 newest by ID
  };
}

// Compute newest IDs for an arbitrary product list (used for category-specific results)
function computeNewestIds(products: ProductType[], count: number = 8) {
  const sortedById = [...products].sort((a, b) => b.id - a.id);
  const topIds = sortedById.slice(0, count).map((p) => p.id);
  return new Set(topIds);
}

/**
 * Fetch categories
 */
export async function getCategories(): Promise<CategoryType[]> {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${API_BASE_URL}/products/categories`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

/**
 * Fetch all products
 * - No limits
 */
export async function getAllProducts(
  searchTerm: string = ''
): Promise<ProductType[]> {
  const res = await fetch(`${API_BASE_URL}/products?limit=0`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  // Filter by allowed categories first
  const filtered: ProductType[] = data.products.filter((p: ProductType) =>
    ALLOWED_CATEGORY_SLUGS.has(p.category)
  );

  // Determine the 3 newest by highest ID
  const newestIds = getNewestProductIds(filtered);

  // Enhance all products
  const enhanced: ProductType[] = filtered.map((p) =>
    enhanceProduct(p, newestIds.has(p.id))
  );

  if (!searchTerm) return enhanced;

  const term = searchTerm.toLowerCase();
  return enhanced.filter(
    (p) =>
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.brand?.toLowerCase().includes(term)
  );
}

/**
 * Fetch sale products
 * - Sorted with highest % first
 */
export async function getSaleProducts(): Promise<ProductType[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.isOnSale === true)
    .sort((a, b) => b.discountPercentage - a.discountPercentage); // Highest % first;
}

/**
 * Fetch new arrival products
 * - Limit 8 products or other
 * - Sorted with newest first
 */
export async function getNewArrivals(
  limit: number = 8
): Promise<ProductType[]> {
  // await new Promise((resolve) => setTimeout(resolve, 50000));

  const newArrivals = await getAllProducts();
  return newArrivals
    .filter((p) => p.isNew === true)
    .sort((a, b) => b.id - a.id) // newest first
    .slice(0, limit);
}

/**
 * Fetch single product for a given id
 */
export async function getSingleProduct(id: number): Promise<ProductType> {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  // Ensure the returned single product also has computed fields
  return enhanceProduct(data as ProductType, false);
}

/**
 * Fetch products for a given category slug
 * - If it's a top-level group (fashion, technology, etc.) → fetch all sub-categories
 * - Otherwise → fetch single category
 */
export async function getProductsByCategory(
  slug: string
): Promise<ProductType[]> {
  // 1. Top-level group (fashion, technology, home, etc.)
  const groupCategories = GROUP_TO_CATEGORIES[slug];
  if (groupCategories) {
    const allProducts = await Promise.all(
      groupCategories.map(async (catSlug) => {
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await fetch(
          `${API_BASE_URL}/products/category/${catSlug}?limit=0`
        );

        if (!res.ok) {
          console.warn(`Failed to fetch category: ${catSlug}`);
          return [];
        }

        const data = await res.json();
        return data.products as ProductType[];
      })
    );

    const flattened = allProducts.flat();
    const newestIds = computeNewestIds(flattened);
    return flattened.map((p) => enhanceProduct(p, newestIds.has(p.id)));
  }

  // 2. Single category (e.g. "laptops", "womens-dresses", etc.)
  const res = await fetch(`${API_BASE_URL}/products/category/${slug}?limit=0`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${slug}`);
  }

  const data = await res.json();
  const products = data.products as ProductType[];
  const newestIds = computeNewestIds(products);
  return products.map((p) => enhanceProduct(p, newestIds.has(p.id)));
}

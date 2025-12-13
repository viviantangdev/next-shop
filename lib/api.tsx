import {
  ALLOWED_CATEGORY_SLUGS,
  CategoryType,
  GROUP_TO_CATEGORIES,
} from './categories';
import { mapProductFromApi, mapProductsFromApi, ProductType } from './product';

const API_BASE_URL = 'https://dummyjson.com';

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

  const allProducts = mapProductsFromApi(data.products);

  // Filter by allowed categories first
  const filtered: ProductType[] = allProducts.filter((p: ProductType) =>
    ALLOWED_CATEGORY_SLUGS.has(p.category)
  );

  if (!searchTerm) return filtered;

  const term = searchTerm.toLowerCase();

  return filtered.filter(
    (p) =>
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
  );
}

/**
 * Fetch sale products
 * - Sorted with highest % first
 */
export async function getSaleProducts(
  searchTerm: string = ''
): Promise<ProductType[]> {
  const data = await getAllProducts();

  const filtered = data
    .filter((p) => p.isOnSale === true)
    .sort((a, b) => b.discountPercentage - a.discountPercentage); // Highest % first;

  if (!searchTerm) return filtered;

  const term = searchTerm.toLowerCase();
  return filtered.filter(
    (p) =>
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
  );
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
  const data = await res.json();

  return data;
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

  return mapProductFromApi(data);
}

/**
 * Fetch products for a given category slug
 * - If it's a top-level group (fashion, technology, etc.) → fetch all sub-categories
 * - Otherwise → fetch single category
 */
export async function getProductsByCategory(
  slug: string
): Promise<ProductType[]> {
  // Top-level group (fashion, technology, home, etc.)
  const groupCategories = GROUP_TO_CATEGORIES[slug];
  if (groupCategories) {
    const allProducts = await Promise.all(
      groupCategories.map(async (catSlug) => {
        const res = await fetch(
          `${API_BASE_URL}/products/category/${catSlug}?limit=0`
        );

        if (!res.ok) {
          throw Error(`Failed to fetch category: ${catSlug}`);
        }

        const data = await res.json();

        return mapProductsFromApi(data.products);
      })
    );

    return allProducts.flat();
  }

  // Single category (e.g. "laptops", "womens-dresses", etc.)
  const res = await fetch(`${API_BASE_URL}/products/category/${slug}?limit=0`);

  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${slug}`);
  }

  const data = await res.json();

  return mapProductsFromApi(data.products);
}

/**
 * Fetch new arrival products
 * - Limit 10 products or other
 * - Sorted with newest added
 * - Checking the id number from Api (The highest id is the newest)
 */
export async function getNewArrivals(
  searchTerm: string = '',
  limit: number = 10
): Promise<ProductType[]> {
  // await new Promise((resolve) => setTimeout(resolve, 50000));

  const newArrivals = await getAllProducts();
  const filtered = newArrivals
    .sort((a, b) => b.id - a.id) // newest added first
    .slice(0, limit);

  if (!searchTerm) return filtered;

  const term = searchTerm.toLowerCase();

  return filtered.filter(
    (p) =>
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
  );
}

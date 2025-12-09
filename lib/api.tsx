import { GROUP_TO_CATEGORIES } from './categories';
import { CategoryType, ProductType } from './types';

const API_BASE_URL = 'https://dummyjson.com';

export async function getCategories(): Promise<CategoryType[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${API_BASE_URL}/products/categories`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

export async function getAllProducts(
  searchTerm: string = ''
): Promise<ProductType[]> {
  // await new Promise((resolve) => setTimeout(resolve, 50000));

  const res = await fetch(`${API_BASE_URL}/products?limit=0`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  const filteredProducts =
    searchTerm === ''
      ? data.products
      : data.products.filter((product: ProductType) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return filteredProducts;
}
export async function getPopularProducts(): Promise<ProductType[]> {
  // await new Promise((resolve) => setTimeout(resolve, 50000));

  const res = await fetch(`${API_BASE_URL}/products?limit=0`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  const topRated = data.products
    .sort((a: ProductType, b: ProductType) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  return topRated;
}

export async function getDiscountedProducts(): Promise<ProductType[]> {
  // await new Promise((resolve) => setTimeout(resolve, 50000));

  const res = await fetch(`${API_BASE_URL}/products?limit=0`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  /* Discount up to 50% rounded up */
  const filteredProducts = data.products.filter(
    (product: ProductType) => product.discountPercentage < 50
  );

  return filteredProducts;
}

export async function getSingleProduct(id: number): Promise<ProductType> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  return data;
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

    return allProducts.flat();
  }

  // 2. Single category (e.g. "laptops", "womens-dresses", etc.)
  const res = await fetch(`${API_BASE_URL}/products/category/${slug}?limit=0`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${slug}`);
  }

  const data = await res.json();
  return data.products as ProductType[];
}

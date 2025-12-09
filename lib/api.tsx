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



export async function getProductsByCategory(slug: string): Promise<ProductType[]> {
  // Handle top-level group slugs like "technology", "home", etc.
  if (slug in GROUP_TO_CATEGORIES || slug === 'mens' || slug === 'womens') {
    let targetCategories: string[] = [];

    if (slug === 'mens') {
      const all = await (await fetch(`${API_BASE_URL}/products/category-list`)).json();
      targetCategories = all.filter((c: string) => c.startsWith('mens-'));
    } else if (slug === 'womens') {
      const all = await (await fetch(`${API_BASE_URL}/products/category-list`)).json();
      targetCategories = all.filter((c: string) => c.startsWith('womens-'));
    } else {
      targetCategories = GROUP_TO_CATEGORIES[slug];
    }

    const productsPerCat = await Promise.all(
      targetCategories.map(async (cat) => {
        const res = await fetch(`${API_BASE_URL}/products/category/${cat}?limit=0`, {
          cache: 'force-cache',
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.products as ProductType[];
      })
    );

    return productsPerCat.flat();
  }

  // Normal single category
  const res = await fetch(`${API_BASE_URL}/products/category/${slug}?limit=0`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error(`Failed to fetch category: ${slug}`);
  const data = await res.json();
  return data.products as ProductType[];
}

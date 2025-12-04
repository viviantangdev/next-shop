import { CategoryType, ProductType } from './types';

const API_BASE_URL = 'https://dummyjson.com';

export async function getCategories(): Promise<CategoryType[]> {
  // await new Promise((resolve) => setTimeout(resolve, 50000));
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

export async function getProductsByCategory(slug: string): Promise<ProductType[]> {
  // User clicked the main "Mens" dropdown → show ALL mens categories
  if (slug === 'mens') {
    const res = await fetch(`${API_BASE_URL}/products/category-list`);
    const categories: string[] = await res.json();

    const mensCategories = categories.filter(cat => cat.startsWith('mens-'));

    // Fetch all products from all mens-* categories
    const allMensProducts = await Promise.all(
      mensCategories.map(async (cat) => {
        const res = await fetch(`${API_BASE_URL}/products/category/${cat}?limit=0`, {
          cache: 'force-cache',
        });
        const data = await res.json();
        return data.products as ProductType[];
      })
    );

    // Flatten and return
    return allMensProducts.flat();
  }
  // User clicked the main "Womens" dropdown → show ALL womens categories
  if (slug === 'womens') {
    const res = await fetch(`${API_BASE_URL}/products/category-list`);
    const categories: string[] = await res.json();

    const womensCategories = categories.filter(cat => cat.startsWith('womens-'));

    // Fetch all products from all womens-* categories
    const allWomensProducts: ProductType[] = await Promise.all(
      womensCategories.map(async (cat) => {
        const res = await fetch(`${API_BASE_URL}/products/category/${cat}?limit=0`, {
          cache: 'force-cache',
        });
        const data = await res.json();
        return data.products;
      })
    );

    // Flatten and return
    return allWomensProducts.flat();
  }

  // Normal case: specific category like mens-bags, womens-dresses, laptops, etc.
  const res = await fetch(`${API_BASE_URL}/products/category/${slug}?limit=0`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error(`Failed to fetch category: ${slug}`);

  const data = await res.json();
  return data.products as ProductType[];
}

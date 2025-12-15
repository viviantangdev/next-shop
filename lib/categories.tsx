import { toTitleCase } from './helpers';

export type CategoryType = {
  slug: string;
  name: string;
  url: string;
};

// Define groups with their subcategories
export const CATEGORY_GROUPS = {
  fashion: ['mens-shirts', 'mens-shoes', 'mens-watches', 'womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches', 'sunglasses'],
  technology: ['laptops', 'smartphones', 'tablets', 'mobile-accessories'],
  home: ['furniture', 'home-decoration', 'kitchen-accessories'],
  beauty: ['beauty', 'skin-care', 'fragrances'],
  sports: ['sports-accessories'],
  automotive: ['automotive', 'vehicle', 'motorcycle'],
} as const;

export type GroupKey = keyof typeof CATEGORY_GROUPS;

export const GROUP_ORDER: GroupKey[] = [
  'fashion',
  'technology',
  'home',
  'beauty',
  'sports',
  'automotive',
];

export const GROUP_LABELS: Record<GroupKey, string> = {
  fashion: 'Fashion',
  technology: 'Electronics & Tech',
  home: 'Home & Living',
  beauty: 'Beauty & Health',
  sports: 'Sports & Outdoor',
  automotive: 'Automotive',
};

// All allowed subcategory slugs
export const ALLOWED_CATEGORY_SLUGS = new Set<string>(
  Object.values(CATEGORY_GROUPS).flat()
);


// Helper: Find which group a slug belongs to (or null if top-level or unknown)
export function getGroupKeyForSlug(slug: string): GroupKey | null {
  for (const [group, slugs] of Object.entries(CATEGORY_GROUPS)) {
    if (slugs.some(s => s === slug)) {
      return group as GroupKey;
    }
  }
  return null;
}

// Get display name for breadcrumb/group label
export function getGroupDisplayName(slug: string): string {
  if (slug in GROUP_LABELS) {
    return GROUP_LABELS[slug as GroupKey];
  }

  const groupKey = getGroupKeyForSlug(slug);
  if (groupKey) {
    return GROUP_LABELS[groupKey];
  }

  return toTitleCase(slug);
}

export type GroupedCategories = Record<GroupKey, CategoryType[]>;
export type GroupedWithAll = Record<`${GroupKey}WithAll`, CategoryType[]>;

export function groupCategories(categories: CategoryType[]) {
  // Initialize empty groups
  const grouped: GroupedCategories = {
    fashion: [],
    technology: [],
    home: [],
    beauty: [],
    sports: [],
    automotive: [],
  };

  // Assign categories to their groups
  for (const category of categories) {
    const groupKey = getGroupKeyForSlug(category.slug);
    if (groupKey) {
      grouped[groupKey].push(category);
    }
  }

  // Create versions with "All {Group}" entry prepended
  const withAll = Object.entries(grouped).reduce((acc, [key, items]) => {
    const groupKey = key as GroupKey;
    if (items.length > 0) {
      acc[`${groupKey}WithAll`] = [
        {
          slug: groupKey,
          name: `All ${GROUP_LABELS[groupKey]}`,
          url: `/category/${groupKey}`,
        },
        ...items.sort((a, b) => a.name.localeCompare(b.name)),
      ];
    } else {
      acc[`${groupKey}WithAll`] = [];
    }
    return acc;
  }, {} as GroupedWithAll);

  return { grouped, withAll };
}
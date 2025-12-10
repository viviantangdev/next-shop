import { toTitleCase } from './helpers';

export type CategoryType = {
  slug: string;
  name: string;
  url: string;
};

type GroupKey =
  | 'fashion'
  | 'technology'
  | 'home'
  | 'beauty'
  | 'sports'
  | 'automotive';

type GroupedCategories = Record<GroupKey, CategoryType[]>;

export const GROUP_ORDER: GroupKey[] = [
  'fashion',
  'technology',
  'home',
  'beauty',
  'sports',
  'automotive',
];

export const GROUP_TO_CATEGORIES: Record<string, string[]> = {
  fashion: [
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-bags',
    'womens-dresses',
    'womens-jewellery',
    'womens-shoes',
    'womens-watches',
    'sunglasses',
  ],
  technology: ['laptops', 'smartphones', 'tablets', 'mobile-accessories'],
  home: ['furniture', 'home-decoration', 'kitchen-accessories'],
  beauty: ['beauty', 'skin-care', 'fragrances'],
  sports: ['sports-accessories'],
  automotive: ['automotive', 'vehicle', 'motorcycle'],
};

export const ALLOWED_CATEGORY_SLUGS = new Set(
  Object.values(GROUP_TO_CATEGORIES).flat()
);

const GROUP_RULES: Record<GroupKey, (slug: string) => boolean> = {
  fashion: (slug) => GROUP_TO_CATEGORIES.fashion.includes(slug),
  technology: (slug) => GROUP_TO_CATEGORIES.technology.includes(slug),
  home: (slug) => GROUP_TO_CATEGORIES.home.includes(slug),
  beauty: (slug) => GROUP_TO_CATEGORIES.beauty.includes(slug),
  sports: (slug) => GROUP_TO_CATEGORIES.sports.includes(slug),
  automotive: (slug) => GROUP_TO_CATEGORIES.automotive.includes(slug),
};

export const GROUP_LABELS: Record<GroupKey, string> = {
  fashion: 'Fashion',
  technology: 'Electronics & Tech',
  home: 'Home & Living',
  beauty: 'Beauty & Health',
  sports: 'Sports & Outdoor',
  automotive: 'Automotive',
};

export function groupCategories(categories: CategoryType[]) {
  const grouped = categories.reduce<GroupedCategories>(
    (acc, category) => {
      for (const [key, matcher] of Object.entries(GROUP_RULES) as [
        GroupKey,
        (slug: string, name: string) => boolean
      ][]) {
        if (matcher(category.slug, category.name)) {
          acc[key].push(category);
          break;
        }
      }

      return acc;
    },
    {
      fashion: [],
      technology: [],
      home: [],
      beauty: [],
      sports: [],
      automotive: [],
    }
  );

  // Generate "All {Group}" entries
  const withAll = Object.entries(grouped).reduce((acc, [key, items]) => {
    const groupKey = key as GroupKey;
    if (items.length > 0) {
      acc[`${groupKey}WithAll` as const] = [
        {
          slug: groupKey,
          name: `All ${GROUP_LABELS[groupKey]}`,
          url: `/category/${groupKey}`,
        },
        ...items.sort((a, b) => a.name.localeCompare(b.name)),
      ];
    } else {
      acc[`${groupKey}WithAll` as const] = [];
    }
    return acc;
  }, {} as Record<`${GroupKey}WithAll`, CategoryType[]>);

  return {
    grouped,
    withAll,
  };
}

export function getGroupDisplayName(slug: string): string {
  // First: check if it's one of our top-level group slugs
  if (slug in GROUP_LABELS) {
    return GROUP_LABELS[slug as GroupKey];
  }

  // Second: try to find which group this subcategory belongs to
  for (const [groupKey, categories] of Object.entries(GROUP_TO_CATEGORIES)) {
    if (categories.includes(slug)) {
      return GROUP_LABELS[groupKey as GroupKey];
    }
  }

  // Fallback: capitalize the slug
  return toTitleCase(slug);
}

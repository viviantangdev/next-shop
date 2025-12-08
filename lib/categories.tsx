import { CategoryType } from './types';

type GroupedCategories = {
  mens: CategoryType[];
  womens: CategoryType[];
  others: CategoryType[];
};

export function groupCategories(categories: CategoryType[]): {
  mens: CategoryType[];
  womens: CategoryType[];
  others: CategoryType[];
  mensWithAll: CategoryType[];
  womensWithAll: CategoryType[];
} {
  const grouped = categories.reduce<GroupedCategories>(
    (acc, category) => {
      if (category.slug.startsWith('mens-')) {
        acc.mens.push(category);
      } else if (category.slug.startsWith('womens-')) {
        acc.womens.push(category);
      } else {
        acc.others.push(category);
      }
      return acc;
    },
    { mens: [], womens: [], others: [] }
  );

  const mensWithAll: CategoryType[] =
    grouped.mens.length > 0
      ? [
          {
            slug: 'mens',
            name: 'All Mens',
            url: '/category/mens',
          },
          ...grouped.mens,
        ]
      : [];

  const womensWithAll: CategoryType[] =
    grouped.womens.length > 0
      ? [
          {
            slug: 'womens',
            name: 'All Womens',
            url: '/category/womens',
          },
          ...grouped.womens,
        ]
      : [];

  return {
    ...grouped,
    mensWithAll,
    womensWithAll,
  };
}

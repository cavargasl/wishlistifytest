import { ProductWishlist, SortedProducts } from "../domain/productWishlist";

export function useSortedWishlist({
  wishlist,
  sortField,
  order,
}: {
  wishlist?: ProductWishlist;
  sortField: keyof SortedProducts | "";
  order: "asc" | "desc";
}) {
  if (!wishlist) return undefined;

  return wishlist.products.sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (sortField === "addedAt") {
      const aDate = new Date(aValue).getTime();
      const bDate = new Date(bValue).getTime();
      return order === "asc" ? aDate - bDate : bDate - aDate;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });
}

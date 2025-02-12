import { products } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "INR"
) {
  return Intl.NumberFormat("en", { style: "currency", currency })
    .format(Number(price));
}

export function findVariant(
  product: products.Product,
  selectedOptions: Record<string, string>
) {
  if (!product.manageVariants) return null;

  return product.variants?.find(variant => {
    return Object.entries(selectedOptions).every(
      ([key, value]) => variant.choices?.[key] === value
    );
  }) || null;
}
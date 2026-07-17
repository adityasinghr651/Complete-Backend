import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely.
 *
 * clsx() lets us pass conditional classes (booleans, arrays, objects).
 * twMerge() then resolves conflicts between Tailwind utilities, so a later
 * class always wins over an earlier one instead of both being applied.
 *
 * Example:
 *   cn("px-4 py-2", isActive && "bg-accent", className)
 *
 * Without twMerge, passing className="px-2" from a parent would NOT
 * override the base "px-4" — both classes would land in the DOM and
 * Tailwind's cascade order (not prop order) would decide the winner,
 * which is unpredictable. This is why almost every production
 * Tailwind + React codebase has a `cn` helper like this one.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

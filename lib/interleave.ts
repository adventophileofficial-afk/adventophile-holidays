import type { DestinationScope } from "@/lib/types";

/**
 * Alternates international and domestic items (international first), keeping each group's
 * original order. Leftovers from the longer group are appended at the end.
 */
export function interleaveByScope<T>(
  items: T[],
  getScope: (item: T) => DestinationScope | undefined
): T[] {
  const international = items.filter((item) => getScope(item) === "international");
  const domestic = items.filter((item) => getScope(item) !== "international");
  const mixed: T[] = [];
  for (let i = 0; i < Math.max(international.length, domestic.length); i++) {
    if (i < international.length) mixed.push(international[i]);
    if (i < domestic.length) mixed.push(domestic[i]);
  }
  return mixed;
}

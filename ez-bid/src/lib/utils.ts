export type ClassValue = string | number | null | false | undefined;

/** Join truthy class names into a single className string. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

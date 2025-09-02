import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function browserServerClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;


export const supabaseServer = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);



export const formatToHuman = (isoDate: string | Date): string => {
  const date = new Date(isoDate);
  return format(date, "dd MMMM yyyy, HH:mm", { locale: id });
};

export const formatToRelative = (isoDate: string | Date): string => {
  const date = new Date(isoDate);
  return formatDistanceToNow(date, { addSuffix: true, locale: id });
};

/**
 * Pastikan timestamp tanpa `Z` diperlakukan sebagai UTC
 */
function parseUTC(dateString: string): Date {
  // tambahkan "Z" biar dipaksa dianggap UTC
  return new Date(dateString.endsWith("Z") ? dateString : dateString + "Z");
}

/**
 * Convert ke format human readable di Asia/Jakarta
 */
export function toJakartaTime(
  dateString: string,
  formatStr: string = "dd MMM yyyy HH:mm"
): string {
  const date = parseUTC(dateString);

  return format(date, formatStr, { locale: id });
}

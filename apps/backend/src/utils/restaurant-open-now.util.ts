import type {
  StrapiOpeningHoursDto,
  StrapiRestaurantDto,
} from '@epicure/strapi-dto';

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

function minutesFromTimeString(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const [hours, minutes] = raw.split(':');
  const h = Number(hours);
  const min = Number(minutes);
  if (Number.isNaN(h) || Number.isNaN(min)) return null;
  return h * 60 + min;
}

/**
 * True if `now` falls inside any same-day slot for today's weekday (enum matches CMS: "Monday", …).
 */
export function isRestaurantOpenNow(
  openingHours: StrapiOpeningHoursDto[] | null | undefined,
  now: Date = new Date(),
): boolean {
  if (!openingHours?.length) return false;

  const dayName = WEEKDAYS[now.getDay()];
  const nowMin = now.getHours() * 60 + now.getMinutes();

  return openingHours.some((row) => {
    if (row.day !== dayName) return false;
    const openMin = minutesFromTimeString(row.open_time);
    const closeMin = minutesFromTimeString(row.close_time);
    if (openMin === null || closeMin === null) return false;

    return nowMin >= openMin && nowMin < closeMin;
  });
}

/** Narrow Strapi list entries enough for the open-now check. */
export function strapiRowOpeningHours(row: unknown): StrapiOpeningHoursDto[] | null {
  if (typeof row !== 'object' || row === null) return null;
  const hours = (row as StrapiRestaurantDto).opening_hours;
  return Array.isArray(hours) ? hours : null;
}

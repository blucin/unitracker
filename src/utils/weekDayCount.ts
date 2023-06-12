import { type InferModel } from "drizzle-orm";
import { type timeTable } from "~/drizzle/out/schema";
type sqlDayType = InferModel<typeof timeTable>["dayName"];

/**
 * Finds the count of each of the weekdays between two dates.
 * @param startDate The start date.
 * @param endDate The end date.
 * @returns A map of the weekday and the count of that weekday between the two dates.
 */
export function weekdayCount(startDate: Date, endDate: Date) {
  const numToDay = new Map<number, sqlDayType>([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
  ]);
  const result = new Map<sqlDayType, number>([
    ["Sunday", 0],
    ["Monday", 0],
    ["Tuesday", 0],
    ["Wednesday", 0],
    ["Thursday", 0],
    ["Friday", 0],
    ["Saturday", 0],
  ]);

  const dayDiff = Math.ceil(
    Math.abs(endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24) + 1
  );

  for (let i = 0; i < dayDiff; i++) {
    const day = (startDate.getDay() + i) % 7;
    result.set(numToDay.get(day)!, result.get(numToDay.get(day)!)! + 1);
  }

  return result;
}

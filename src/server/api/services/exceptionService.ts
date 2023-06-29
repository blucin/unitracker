import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { holidays } from "~/drizzle/out/schema";
import { createId } from "@paralleldrive/cuid2";
import { format } from "date-fns";

export function addException(
  db: PlanetScaleDatabase,
  userId: string,
  exceptionName: string,
  startDate: Date,
  endDate: Date,
) {
  return db.insert(holidays).values({
    id: createId(),
    userId: userId,
    holiday: exceptionName,
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd")
  });
}
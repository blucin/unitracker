import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { holidays } from "~/drizzle/out/schema";
import { createId } from "@paralleldrive/cuid2";
import { format } from "date-fns";
import { eq, and, sql } from "drizzle-orm";

export function getExceptionsByDateRange(
  db: PlanetScaleDatabase,
  userId: string,
  startDate: Date,
  endDate: Date
) {
  return db.select({
    id: holidays.id,
    holiday: holidays.holiday,
    startDate: holidays.startDate,
    endDate: holidays.endDate,
  }).from(holidays)
  .where(
    and(
      eq(holidays.userId, userId),
      sql`${holidays.startDate} >= ${format(startDate, "yyyy-MM-dd")}`,
      sql`${holidays.endDate} <= ${format(endDate, "yyyy-MM-dd")}`
    )
  );
}

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

export function deleteException(
  db: PlanetScaleDatabase,
  userId: string,
  exceptionId: string,
) {
  return db.delete(holidays).where(
    and(
      eq(holidays.userId, userId),
      eq(holidays.id, exceptionId)
    )
  );
}
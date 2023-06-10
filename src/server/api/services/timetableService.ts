import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { timeTable, subject } from "~/drizzle/out/schema";
import { and, eq } from "drizzle-orm";

export function getByTimetableId (db:PlanetScaleDatabase, timetableName:string, userId:string) {
  return db
    .select()
    .from(timeTable)
    .where(and(eq(timeTable.userId, userId), eq(timeTable.timetableName, timetableName)))
    .innerJoin(subject, eq(timeTable.subjectId, subject.id))
    .orderBy(timeTable.dayName);
}
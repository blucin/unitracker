import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { timeTable, subject } from "~/drizzle/out/schema";
import { and, eq } from "drizzle-orm";

export function getSubjectWithDay(
  db: PlanetScaleDatabase,
  timetableName: string,
  userId: string
) {
  return db
    .select({
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      isLab: subject.hasLab,
      dayName: timeTable.dayName,
    })
    .from(subject)
    .where(
      and(
        eq(timeTable.userId, userId),
        eq(timeTable.timetableName, timetableName)
      )
    )
    .leftJoin(timeTable, eq(timeTable.subjectId, subject.id))
    .orderBy(timeTable.dayName);
}

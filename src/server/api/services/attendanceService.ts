import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { attendance, timeTable, subject } from "~/drizzle/out/schema";
import { and, eq, sql } from "drizzle-orm";

export function getAttendanceByDateRangeWithDay(
  db: PlanetScaleDatabase,
  timetableName: string,
  userId: string,
  startDate: Date,
  endDate: Date
) {
  const sq = db
    .select({
      dayName: timeTable.dayName,
      subjectName: subject.subjectName,
      isLab: timeTable.isLab,
      count: sql<number>`COUNT(*) AS count`,
    })
    .from(timeTable)
    .innerJoin(subject, eq(timeTable.subjectId, subject.id))
    .innerJoin(attendance, eq(attendance.timetableId, timeTable.id))
    .where(
      and(
        eq(timeTable.userId, userId),
        eq(timeTable.timetableName, timetableName),
        sql`${attendance.date} >= ${startDate.toISOString().slice(0, 10)}`,
        sql`${attendance.date} <= ${endDate.toISOString().slice(0, 10)}`
      )
    )
    .groupBy(subject.subjectName, timeTable.isLab, timeTable.dayName)
    .as("sq");

  return db
    .select({
      subjectName: sq.subjectName,
      isLab: sq.isLab,
      count: sql<number>`SUM(sq.count)`,
    })
    .from(sq)
    .groupBy(sq.subjectName, sq.isLab);
}
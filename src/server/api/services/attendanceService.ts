import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { attendance, timeTable, subject } from "~/drizzle/out/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { format } from "date-fns";

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
        sql`${attendance.date} >= ${format(startDate, "yyyy-MM-dd")}`,
        sql`${attendance.date} <= ${format(endDate, "yyyy-MM-dd")}`
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

export function getAllAttendance(db: PlanetScaleDatabase, userId: string) {
  return db
    .select({
      id: attendance.id,
      date: attendance.date,
      dayName: timeTable.dayName,
      subjectName: subject.subjectName,
      isLab: timeTable.isLab,
      startTime: timeTable.startTime,
      endTime: timeTable.endTime,
    })
    .from(attendance)
    .innerJoin(timeTable, eq(attendance.timetableId, timeTable.id))
    .innerJoin(subject, eq(timeTable.subjectId, subject.id))
    .where(eq(attendance.userId, userId))
    .orderBy(desc(attendance.date));
}

export function addMultipleAttendance(
  db: PlanetScaleDatabase,
  userId: string,
  timetableIds: string[],
  date: Date
) {
  return db.insert(attendance).values(
    timetableIds.map((id) => {
      return {
        id: createId(),
        userId,
        timetableId: id,
        date: format(date, "yyyy-MM-dd"),
      };
    })
  );
}

export function deleteAttendance(
  db: PlanetScaleDatabase,
  attendanceId: string,
  userId: string
) {
  return db
    .delete(attendance)
    .where(and(eq(attendance.id, attendanceId), eq(attendance.userId, userId)));
}

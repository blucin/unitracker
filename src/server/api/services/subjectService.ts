import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { timeTable, subject } from "~/drizzle/out/schema";
import { and, eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export function getAllSubjectsIdAndNameByUserId(
  db: PlanetScaleDatabase,
  userId: string
) {
  return db
    .select({
      subjectId: subject.id,
      subjectName: subject.subjectName,
      hasLab: subject.hasLab,
    })
    .from(subject)
    .where(eq(subject.userId, userId))
    .orderBy(subject.subjectName);
}

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

export function addSubject(
  db: PlanetScaleDatabase,
  userId: string,
  subjectName: string,
  hasLab: boolean,
  subjectCode?: string
) {
  return db.insert(subject).values({
    id: createId(),
    subjectName: subjectName,
    subjectCode: subjectCode,
    hasLab: hasLab === true ? 1 : 0,
    userId: userId,
  });
}

import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { timeTable, subject } from "~/drizzle/out/schema";
import { sql, and, eq } from "drizzle-orm";
import { weekdayCount } from "~/utils/weekDayCount";
import { createId } from "@paralleldrive/cuid2";
import { DayNameType } from "~/types/formSchemas";
import z from "zod";

export function getAllTimetableNames(
  db: PlanetScaleDatabase,
  userId: string
) {
  return db
    .select({
      timeTableName: sql<string>`DISTINCT ${timeTable.timetableName}`,
    })
    .from(timeTable)
    .where(eq(timeTable.userId, userId))
    .orderBy(timeTable.timetableName);
}

export function getByTimetableId(
  db: PlanetScaleDatabase,
  timetableName: string,
  userId: string
) {
  return db
    .select()
    .from(timeTable)
    .where(
      and(
        eq(timeTable.userId, userId),
        eq(timeTable.timetableName, timetableName)
      )
    )
    .innerJoin(subject, eq(timeTable.subjectId, subject.id))
    .orderBy(timeTable.dayName);
}

export function getSubjectCountByDateRange(
  db: PlanetScaleDatabase,
  timetableName: string,
  userId: string,
  startDate: Date,
  endDate: Date
) {
  // get weekday counts between startDate and endDate
  const dayCountByWeekday = weekdayCount(startDate, endDate);

  // multiply by dayCountByWeekday[dayName] to get total count
  const sq = db
    .select({
      dayName: timeTable.dayName,
      subjectName: subject.subjectName,
      isLab: timeTable.isLab,
      count: sql<number>`
        CASE 
          WHEN TimeTable.dayName = 'Sunday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Sunday"
          )}
          WHEN TimeTable.dayName = 'Monday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Monday"
          )}
          WHEN TimeTable.dayName = 'Tuesday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Tuesday"
          )}
          WHEN TimeTable.dayName = 'Wednesday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Wednesday"
          )}
          WHEN TimeTable.dayName = 'Thursday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Thursday"
          )}
          WHEN TimeTable.dayName = 'Friday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Friday"
          )}
          WHEN TimeTable.dayName = 'Saturday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Saturday"
          )}
        END AS count`,
    })
    .from(timeTable)
    .innerJoin(subject, eq(timeTable.subjectId, subject.id))
    .where(
      and(
        eq(timeTable.userId, userId),
        eq(timeTable.timetableName, timetableName)
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

export function addTimetable(
  db: PlanetScaleDatabase,
  userId: string,
  timetableName: string,
  timetableObject: {
    dayName: z.infer<typeof DayNameType>;
    subjectId: string;
    startTime: string;
    endTime: string;
    isLab: "true" | "false";
  }[]
) {
  return db.insert(timeTable)
    .values(timetableObject.map((item) => {
      return {
        id: createId(),
        dayName: item.dayName,
        userId: userId,
        timetableName: timetableName,
        subjectId: item.subjectId,
        startTime: `${item.startTime}:00`,
        endTime: `${item.startTime}:00`,
        isLab: item.isLab === "true" ? 1 : 0,
      };
    }))
}
import { type PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { timeTable, subject } from "~/drizzle/out/schema";
import { sql, and, eq } from "drizzle-orm";
import { weekdayCount } from "~/utils/weekDayCount";
import { createId } from "@paralleldrive/cuid2";
import { DayNameType } from "~/types/formSchemas";
import z from "zod";

// for merging overlapping date ranges
import { getExceptionsByDateRange } from "~/server/api/services/exceptionService";
import { mergeOverlappingDateRanges } from "~/utils/filterArrayofDayRanges";
import { type InferModel } from "drizzle-orm";
type sqlDayType = InferModel<typeof timeTable>["dayName"];

export function getAllTimetableNames(db: PlanetScaleDatabase, userId: string) {
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

export async function getSubjectCountByDateRange(
  db: PlanetScaleDatabase,
  timetableName: string,
  userId: string,
  startDate: Date,
  endDate: Date
) {
  // get weekday counts between startDate and endDate
  const dayCountByWeekday = weekdayCount(startDate, endDate);

  // we need to subtract the holidays from the dayCountByWeekday
  // holidays are stored in the holidays table as date ranges
  // single holidays are stored as a date range with the same start and end date
  // we need to merge the date ranges before subtracting them from dayCountByWeekday
  const overlappingDateRangeArr = await getExceptionsByDateRange(
    db,
    userId,
    startDate,
    endDate
  );

  // merge overlapping date ranges
  const filteredDateRangeArr = mergeOverlappingDateRanges(
    overlappingDateRangeArr.map((dateRange) => {
      return {
        start: new Date(dateRange.startDate),
        end: new Date(dateRange.endDate),
      };
    })
  );

  // get weekday counts between startDate and endDate and
  // reduce it to a map of weekday and count
  const exceptionDayCountByWeekday = filteredDateRangeArr.reduce(
    (acc, dateRange) => {
      const dayCount = weekdayCount(dateRange.start, dateRange.end);
      for (const [key, value] of dayCount.entries()) {
        acc.set(key, acc.get(key)! + value);
      }
      return acc;
    },
    new Map<sqlDayType, number>([
      ["Sunday", 0],
      ["Monday", 0],
      ["Tuesday", 0],
      ["Wednesday", 0],
      ["Thursday", 0],
      ["Friday", 0],
      ["Saturday", 0],
    ])
  );

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
          )} - ${exceptionDayCountByWeekday.get("Sunday")}
          WHEN TimeTable.dayName = 'Monday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Monday"
          )} - ${exceptionDayCountByWeekday.get("Monday")}
          WHEN TimeTable.dayName = 'Tuesday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Tuesday"
          )} - ${exceptionDayCountByWeekday.get("Tuesday")}
          WHEN TimeTable.dayName = 'Wednesday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Wednesday"
          )} - ${exceptionDayCountByWeekday.get("Wednesday")}
          WHEN TimeTable.dayName = 'Thursday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Thursday"
          )} - ${exceptionDayCountByWeekday.get("Thursday")}
          WHEN TimeTable.dayName = 'Friday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Friday"
          )} - ${exceptionDayCountByWeekday.get("Friday")}
          WHEN TimeTable.dayName = 'Saturday' THEN COUNT(*) * ${dayCountByWeekday.get(
            "Saturday"
          )} - ${exceptionDayCountByWeekday.get("Saturday")}
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
  return db.insert(timeTable).values(
    timetableObject.map((item) => {
      return {
        id: createId(),
        dayName: item.dayName,
        userId: userId,
        timetableName: timetableName,
        subjectId: item.subjectId,
        startTime: `${item.startTime}:00`,
        endTime: `${item.endTime}:00`,
        isLab: item.isLab === "true" ? 1 : 0,
      };
    })
  );
}

export function deleteTimetable(
  db: PlanetScaleDatabase,
  userId: string,
  timetableName: string
) {
  return db
    .delete(timeTable)
    .where(
      and(
        eq(timeTable.userId, userId),
        eq(timeTable.timetableName, timetableName)
      )
    );
}

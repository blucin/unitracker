import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { subject, timeTable } from "~/drizzle/out/schema";
import { eq } from "drizzle-orm";
import _ from "lodash";

export const timeTableRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const timeTables = await ctx.db
      .select()
      .from(timeTable)
      .where(eq(timeTable.userId, ctx.session.user.id))
      .innerJoin(subject, eq(timeTable.subjectId, subject.id))
      .orderBy(timeTable.dayName);

    /*
      [{ timetableName1, dayName, ... other props}, ... ] into
      {timetable1: Array(N), timetable2: Array(N), ... , timetableM: Array(N)}
    */
    const res1 = _.groupBy(timeTables, function(item) {
      return item.TimeTable.timetableName
    });

    /*
      {timetable1: Array(N), timetable2: Array(N), ... , timetableM: Array(N)}
      into
      {timetabl1: {Monday: Array(N), Tuesday: Array(N), ... , Sunday: Array(N)}, ... }, ..., {timetableM: {Monday: Array(N), Tuesday: Array(N), ... , Sunday: Array(N)}}
    */
    const res2 = _.mapValues(res1, (value) => _.groupBy(value, function(item) {
      return item.TimeTable.dayName
    }));

    return res2;
  }),
});

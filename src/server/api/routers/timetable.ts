import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { subject, timeTable } from "~/drizzle/out/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import _ from "lodash";
import { getAllTimetableNameAndId } from "~/server/api/services/timetableService"

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

  getByTimetableId: protectedProcedure.input(
    z.object({
      timetableName: z.string(),
    })
  ).query(async ({ ctx, input }) => {
    const _timeTable = await ctx.db
      .select()
      .from(timeTable)
      .where(and(eq(timeTable.userId, ctx.session.user.id), eq(timeTable.id, input.timetableName)))
      .innerJoin(subject, eq(timeTable.subjectId, subject.id))
      .orderBy(timeTable.dayName);

    console.log(_timeTable);

    return _timeTable;
  }),

  getAllTimetableName: protectedProcedure.query(async ({ ctx }) => { 
    const timeTables = await getAllTimetableNameAndId(ctx.db, ctx.session.user.id);
    return timeTables;
  }),
});

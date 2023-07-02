import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { subject, timeTable } from "~/drizzle/out/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import _ from "lodash";
import { getAllTimetableNames, addTimetable } from "~/server/api/services/timetableService";
import { TimetableFormSchema } from "~/types/formSchemas";

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
    const res1 = _.groupBy(timeTables, function (item) {
      return item.TimeTable.timetableName;
    });

    /*
      {timetable1: Array(N), timetable2: Array(N), ... , timetableM: Array(N)}
      into
      {timetabl1: {Monday: Array(N), Tuesday: Array(N), ... , Sunday: Array(N)}, ... }, ..., {timetableM: {Monday: Array(N), Tuesday: Array(N), ... , Sunday: Array(N)}}
    */
    const res2 = _.mapValues(res1, (value) =>
      _.groupBy(value, function (item) {
        return item.TimeTable.dayName;
      })
    );

    return res2;
  }),

  getByTimetableId: protectedProcedure
    .input(
      z.object({
        timeTableName: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          id: timeTable.id,
          dayName: timeTable.dayName,
          subjectName: subject.subjectName,
          isLab: subject.hasLab,
          startTime: timeTable.startTime,
          endTime: timeTable.endTime,
        })
        .from(timeTable)
        .where(
          and(
            eq(timeTable.userId, ctx.session.user.id),
            eq(timeTable.timetableName, input.timeTableName)
          )
        )
        .innerJoin(subject, eq(timeTable.subjectId, subject.id))
        .orderBy(timeTable.dayName);
    }),

  getAllTimetableName: protectedProcedure.query(async ({ ctx }) => {
    const timeTables = await getAllTimetableNames(ctx.db, ctx.session.user.id);
    return timeTables;
  }),

  addTimeTable: protectedProcedure
    .input(TimetableFormSchema)
    .mutation(({ctx, input}) => {
      return addTimetable(
        ctx.db,
        ctx.session.user.id,
        input.timetableName,
        input.timetableObject
      );
    }),
});

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { holidays } from "~/drizzle/out/schema";
import { eq } from "drizzle-orm";
import { ExceptionFormSchema } from "~/types/formSchemas";
import {
  addException,
  deleteException,
  getExceptionsByDateRange,
} from "~/server/api/services/exceptionService";
import { z } from "zod";
import { mergeOverlappingDateRanges } from "~/utils/filterArrayofDayRanges";
import { weekdayCount } from "~/utils/weekDayCount";
import { type timeTable } from "~/drizzle/out/schema";
import { type InferModel } from "drizzle-orm";
type sqlDayType = InferModel<typeof timeTable>["dayName"];

export const exceptionRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(holidays)
      .where(eq(holidays.userId, ctx.session.user.id));
  }),
  getExceptionsByDateRange: protectedProcedure.input(
    z.object({
      startDate: z.date(),
      endDate: z.date(),
    })
  ).query(async ({ ctx, input }) => {
    const overlappingDateRangeArr = await getExceptionsByDateRange(
      ctx.db,
      ctx.session.user.id,
      input.startDate,
      input.endDate
    );

    const filteredDateRangeArr = mergeOverlappingDateRanges(
      overlappingDateRangeArr.map((dateRange) => {
        return {
          start: new Date(dateRange.startDate),
          end: new Date(dateRange.endDate),
        };
    }));

    const dayCountByWeekday = filteredDateRangeArr.reduce((acc, dateRange) => {
      const dayCount = weekdayCount(dateRange.start, dateRange.end);
      for (const [key, value] of dayCount.entries()) {
        acc.set(key, acc.get(key)! + value);
      }
      return acc;
    }, new Map<sqlDayType, number>([
      ["Sunday", 0],
      ["Monday", 0],
      ["Tuesday", 0],
      ["Wednesday", 0],
      ["Thursday", 0],
      ["Friday", 0],
      ["Saturday", 0],
    ]));

    return Array.from(dayCountByWeekday.entries()).map(([dayName, count]) => {
      return {
        dayName,
        count,
      };
    });
  }),
  checkIfExceptionExist: protectedProcedure.input(
    z.object({
      date: z.date(),
    })
  ).query(async ({ ctx, input }) => {
    const result = await getExceptionsByDateRange(
      ctx.db,
      ctx.session.user.id,
      input.date,
      input.date
    );
    return result.length === 0 ? false : true;
  }),
  addException: protectedProcedure
    .input(ExceptionFormSchema)
    .mutation(({ ctx, input }) => {
      return addException(
        ctx.db,
        ctx.session.user.id,
        input.exceptionName,
        input.startDate,
        input.endDate != undefined
          ? input.isRange === "true"
            ? input.endDate
            : input.startDate
          : input.startDate
      );
    }),
  deleteException: protectedProcedure
    .input(
      z.object({
        exceptionId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return deleteException(ctx.db, ctx.session.user.id, input.exceptionId);
    }),
});

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getByTimetableId } from "~/server/api/services/timetableService";

export const attendanceRouter = createTRPCRouter({
  getByRange: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        timetableName: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const timeTable = await getByTimetableId(ctx.db, input.timetableName, ctx.session.user.id);
      console.log("TIMETABLE1:", timeTable);
      return timeTable;
    }),
});

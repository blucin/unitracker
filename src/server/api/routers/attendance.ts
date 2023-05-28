import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const attendanceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.attendance.findMany();
  }),
  getByRange: protectedProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.attendance.findMany({
        where: {
          date: {
            gte: input.start,
            lte: input.end,
          },
        },
      });
    }),
});

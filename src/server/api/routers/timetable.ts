import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const timeTableRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const timeTables = await ctx.prisma.timeTable.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        subject: true,
        Attendance: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });
    return timeTables;
  }),
});

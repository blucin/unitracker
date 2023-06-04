import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { timeTable } from "~/drizzle/out/schema";

export const timeTableRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const timeTables = await ctx.db
      .select()
      .from(timeTable)
      .where(eq(timeTable.userId, ctx.session.user.id));
  }),
});

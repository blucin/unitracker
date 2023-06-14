import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { holidays } from "~/drizzle/out/schema";
import { eq } from "drizzle-orm";

export const exceptionRouter = createTRPCRouter({
  // by userId
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(holidays)
      .where(eq(holidays.userId, ctx.session.user.id));
  }),
});

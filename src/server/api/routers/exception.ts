import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { holidays } from "~/drizzle/out/schema";
import { eq } from "drizzle-orm";
import { ExceptionFormSchema } from "~/types/formSchemas";
import {
  addException,
  deleteException,
} from "~/server/api/services/exceptionService";
import { z } from "zod";

export const exceptionRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(holidays)
      .where(eq(holidays.userId, ctx.session.user.id));
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

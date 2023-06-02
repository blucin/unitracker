import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const subjectRouter = createTRPCRouter({
  // by userId
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.subject.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  deleteById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({input, ctx})=> {
      return ctx.prisma.subject.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

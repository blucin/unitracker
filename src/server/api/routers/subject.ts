import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  getAllSubjectsIdAndNameByUserId,
  addSubject,
  deleteSubject,
} from "~/server/api/services/subjectService";
import { SubjectFormSchema } from "~/types/formSchemas";
import { timeTable } from "~/drizzle/out/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from '@trpc/server';

export const subjectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.subject.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  getSubjectNameSubjectIdAndHasLab: protectedProcedure.query(({ ctx }) => {
    return getAllSubjectsIdAndNameByUserId(ctx.db, ctx.session.user.id);
  }),
  addSubjectByUserId: protectedProcedure
    .input(SubjectFormSchema)
    .mutation(({ input, ctx }) => {
      return addSubject(
        ctx.db,
        ctx.session.user.id,
        input.subjectName,
        input.hasLab === "true" ? true : false,
        input.subjectCode
      );
    }),
  deleteSubject: protectedProcedure
    .input(
      z.object({
        subjectId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // check if subject is referenced in timetable (we don't want to delete that subject)
      const result = await ctx.db
        .select()
        .from(timeTable)
        .where(eq(timeTable.subjectId, input.subjectId));

      if(result.length > 0) {
        throw new TRPCError({
          message: 'Subject is referenced in timetable',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      return deleteSubject(ctx.db, ctx.session.user.id, input.subjectId);
    }),
});

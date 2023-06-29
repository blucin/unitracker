import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  getAllSubjectsIdAndNameByUserId,
  addSubject,
} from "~/server/api/services/subjectService";
import { SubjectFormSchema } from "~/types/formSchemas";

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
  deleteById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.subject.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

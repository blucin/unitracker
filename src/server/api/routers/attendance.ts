import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  getAttendanceByDateRangeWithDay,
  getAllAttendance,
  addMultipleAttendance,
} from "~/server/api/services/attendanceService";
import { getSubjectCountByDateRange } from "~/server/api/services/timetableService";
import { AttendanceFormSchema } from "~/types/formSchemas";
import _ from "lodash";

export const attendanceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await getAllAttendance(ctx.db, ctx.session.user.id);
  }),
  getByRange: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        timetableName: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      type resultSchema = {
        lab: {
          [key: string]: number;
        };
        theory: {
          [key: string]: number;
        };
      };

      // contains subjectName with it's attendance in % for lab and theory
      const result: resultSchema = {
        lab: {},
        theory: {},
      };

      // actual data of subjects which were taken regardless of user attending them or not
      const subjectByTimeTableId = await getSubjectCountByDateRange(
        ctx.db,
        input.timetableName,
        ctx.session.user.id,
        input.startDate,
        input.endDate
      );

      // attendance data of subjects attended by user
      const attendanceByTimeTableId = await getAttendanceByDateRangeWithDay(
        ctx.db,
        input.timetableName,
        ctx.session.user.id,
        input.startDate,
        input.endDate
      );

      // format data
      const subjectResult = _.groupBy(subjectByTimeTableId, function (item) {
        return item.subjectName;
      });

      const attendanceResult = _.groupBy(
        attendanceByTimeTableId,
        function (item) {
          return item.subjectName;
        }
      );

      // form result by comparing both objects and calculate % of attendance
      // TODO: make subject name unique in db
      _.map(subjectResult, (value, key) => {
        _.map(attendanceResult, (value2, key2) => {
          // if subject name matches
          if (key === key2) {
            _.map(value2, (value3, key3) => {
              _.map(value, (value4, key4) => {
                if (value3.isLab === value4.isLab) {
                  const percentage =
                    (Number(value3.count) / Number(value4.count)) * 100;
                  if (value3.isLab) {
                    result.lab[key] = Math.round(percentage * 100) / 100;
                  } else {
                    result.theory[key] = Math.round(percentage * 100) / 100;
                  }
                }
              });
            });
          }
        });
      });

      return result;
    }),
  addAttendanceByTimetableId: protectedProcedure
    .input(AttendanceFormSchema)
    .mutation(({ ctx, input }) => {
      return addMultipleAttendance(
        ctx.db,
        ctx.session.user.id,
        input.timetableObjectIds,
        input.date
      );
    }),
});

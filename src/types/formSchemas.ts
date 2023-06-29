import { P } from "drizzle-orm/select.types.d-e43b2599";
import * as z from "zod";

export const DashboardFormSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  timetableName: z.string(),
});

export const SubjectFormSchema = z.object({
  subjectName: z.string(),
  subjectCode: z.string().optional(),
  hasLab: z.enum(["true", "false"]).default("false"),
});

export const ExceptionFormSchema = z
  .object({
    exceptionName: z.string().min(2),
    startDate: z.date(),
    endDate: z.date().optional(),
    isRange: z.enum(["true", "false"]).default("false"),
  })
  .refine((data) => {
    if (data.endDate === undefined && data.isRange === "true") {
      // react hook form doesn't support throwing errors for optional fields
      // error message is intentionally vague to match the error message for required fields
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.invalid_date,
          message: "Required",
          path: ["endDate"],
        },
      ]);
    }

    // endDate should be greater than startDate
    if (data.endDate !== undefined && data.startDate >= data.endDate) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.invalid_date,
          message: "End date should be greater than Start date",
          path: ["endDate"],
        },
      ]);
    }
    return true;
  });

export const DayNameType = z.union([
  z.literal("Monday"),
  z.literal("Tuesday"),
  z.literal("Wednesday"),
  z.literal("Thursday"),
  z.literal("Friday"),
  z.literal("Saturday"),
]);

// default required and custom required error messages are not working for nested objects
export const TimetableFormSchema = z
  .object({
    timetableName: z
      .string({
        required_error: "Please enter a timetable name",
      })
      .min(2, {
        message: "Timetable name should be at least 2 characters long",
      }),
    timetableObject: z
      .object({
        dayName: DayNameType,
        subjectId: z.string().min(1, {
          message: "Please select a subject",
        }),
        startTime: z.string().min(1, {
          message: "Please select a start time",
        }),
        endTime: z.string().min(1, {
          message: "Please select an end time",
        }),
        isLab: z.enum(["true", "false"]).optional().default("false"),
      })
      .array()
      .min(1),
  })
  .refine((data) => {
    data.timetableObject.forEach((timetableObject, index) => {
      if (timetableObject.endTime <= timetableObject.startTime) {
        throw new z.ZodError([
          {
            code: z.ZodIssueCode.invalid_date,
            message: "End time should be greater than start time",
            path: ["timetableObject", index, "endTime"],
          },
        ]);
      }
    });
    
    return true;
  });

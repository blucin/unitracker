import { createTRPCRouter } from "~/server/api/trpc";
import { attendanceRouter } from "./routers/attendance";
import { subjectRouter } from "./routers/subject";
import { timeTableRouter } from "./routers/timetable";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { exceptionRouter } from "./routers/exception";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  attendance: attendanceRouter,
  subject: subjectRouter,
  timetable: timeTableRouter,
  exception: exceptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
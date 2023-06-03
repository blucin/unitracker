import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import _ from "lodash";


export const timeTableRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const timeTables = await ctx.db.select().from(tim)
    return timeTables;
  }),
});

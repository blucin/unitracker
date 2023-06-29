import { type StateCreator } from "zustand";
import type { RouterOutput } from "~/server/api/root";

export interface DashboardSlice {
  attendanceData: RouterOutput["attendance"]["getByRange"] | undefined;
  isLoading: boolean | undefined;
}

export const dashboardSlice: StateCreator<DashboardSlice> = (set) => ({
  attendanceData: undefined,
  isLoading: undefined,
});

import { addDays } from "date-fns";
import { M } from "drizzle-orm/column.d-66a08b85";
import { type StateCreator } from "zustand";

export interface DashboardSlice {
  dateRange: {
    from: Date;
    to: Date;
  };
  setDateRange: () => void;
}

export const dashboardSlice:StateCreator<
  DashboardSlice
> = (set) => ({
  dateRange: {
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  },
  setDateRange: () => {
    set((state) => ({
      dateRange: {
        from: state.dateRange.from,
        to: state.dateRange.to,
      },
    }));
  },
});
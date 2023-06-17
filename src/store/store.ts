// not using slices anymore
import { create } from "zustand";
import { type DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import type { RouterOutput } from "~/server/api/root";
import { api } from "~/utils/api";

type State = {
  // dashboard
  attendanceData: RouterOutput["attendance"]["getByRange"] | undefined;
  date: DateRange;
  timeTableName: string | undefined;
  isLoading: boolean;
};

type Action = {
  //setDate: (date: DateRange) => void;
  updateDashboard: (
    startDate: Date,
    endDate: Date,
    timeTableName: string
  ) => void;
};

const Store = create<State & Action>()((set) => ({
  // dashboard
  date: {
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  },
  attendanceData: undefined,
  timeTableName: undefined,
  isLoading: false,
  
  updateDashboard: async (startDate, endDate, timeTableName) => {
    set((state) => ({
      ...state,
      startDate,
      endDate,
      timeTableName,
    }));
    const { data, isLoading } = api.attendance.getByRange.useQuery({
      startDate: startDate,
      endDate: endDate,
      timetableName: timeTableName,
    });
    set((state) => ({
      ...state,
      attendanceData: data,
      isLoading: isLoading,
    }));
  },
}));

export default Store;
import { create } from "zustand";
import { type DashboardSlice, dashboardSlice } from "~/store/slices/dashboardSlice";

const Store = create<DashboardSlice>()((...a)=>({
  ...dashboardSlice(...a),
}));

export default Store;
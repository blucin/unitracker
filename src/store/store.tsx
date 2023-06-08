import { create } from 'zustand';
import { type DashboardSlice, dashboardSlice } from './slices/dashboardSlice';

export const useStore = create<DashboardSlice>()((...a) => ({
  ...dashboardSlice(...a),
}));
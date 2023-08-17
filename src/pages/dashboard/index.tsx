import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import {
  DashboardDateTimetableForm,
  Dashboard
} from "@/components/DashboardComponents";
import { Separator } from "@/components/ui/separator";
import * as React from 'react';
import { DashboardFormSchema } from "~/types/formSchemas";
import * as z from "zod";
import { api } from "~/utils/api";

const DashboardPage: NextPageWithLayout = () => {
  const timeTableNames = api.timetable.getAllTimetableName.useQuery().data;
  const [showDashboard, setShowDashboard] = React.useState(false);
  const [formData, setFormData] = React.useState<z.infer<typeof DashboardFormSchema> | undefined>(undefined);

  function onSubmit(formData: z.infer<typeof DashboardFormSchema>) {
    setFormData(formData);
    setShowDashboard(true);
  }

  return (
    <>
      <div className="justify-between items-start lg:flex">
        <h2 className="mb-5 text-2xl font-bold tracking-tight"> Dashboard </h2>
        <DashboardDateTimetableForm timeTableNames={timeTableNames} submitHandler={onSubmit} />
      </div>

      <Separator className="mb-4" />

      {showDashboard ? (
        <Dashboard formData={formData} />
      ) : (
        <p className="text-center">Please select a date range and timetable to view the dashboard.</p>
      )}
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;

import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import {
  CalendarDateRangePicker,
  TimeTableSelector,
  DashboardAttendanceCard,
  DashboardAttendanceMinMaxCard,
} from "@/components/DashboardComponents";
import { Separator } from "@/components/ui/separator";
import { calculateMinMaxAttendance } from "~/utils/minMaxAttendance";

const Dashboard: NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });

  const { data, isLoading } = api.attendance.getByRange.useQuery({
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-05-06"),
    timetableName: "sem1",
  });

  const {
    theoryMaxName,
    labMaxName,
    theoryMinName,
    labMinName,
    theoryMax,
    labMax,
    theoryMin,
    labMin,
  } = calculateMinMaxAttendance(data);

  return (
    <>
      <div className="justify-between lg:flex">
        <h2 className="mb-5 text-2xl font-bold tracking-tight"> Dashboard </h2>
        <div className="gap-4 lg:flex">
          <div className="my-5 lg:my-0">
            <p className="my-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:hidden">
              Select date range:{" "}
            </p>
            <CalendarDateRangePicker />
          </div>
          <div className="my-5 lg:my-0">
            <p className="my-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:hidden">
              Select your timetable:{" "}
            </p>
            <TimeTableSelector />
          </div>
        </div>
      </div>

      <Separator className="mb-4" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardAttendanceMinMaxCard
          cardTitle="Top Theory"
          subjectName={theoryMaxName}
          attendance={theoryMax}
          deltaType="increase"
        />
        <DashboardAttendanceMinMaxCard
          cardTitle="Top Lab"
          subjectName={labMaxName}
          attendance={labMax}
          deltaType="increase"
        />
        <DashboardAttendanceMinMaxCard
          cardTitle="Bottom Theory"
          subjectName={theoryMinName}
          attendance={theoryMin}
          deltaType="decrease"
        />
        <DashboardAttendanceMinMaxCard
          cardTitle="Bottom Lab"
          subjectName={labMinName}
          attendance={labMin}
          deltaType="decrease"
        />
      </div>

      <DashboardAttendanceCard
        className="my-4"
        data={data}
        title={"Subject: Theories"}
        isLab={false}
      />
      <DashboardAttendanceCard
        className="my-4"
        data={data}
        title={"Subject: Labs"}
        isLab={true}
      />
    </>
  );
};

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;

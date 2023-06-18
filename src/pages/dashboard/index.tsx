import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import {
  DashboardDateTimetableForm,
  DashboardAttendanceCard,
  DashboardAttendanceMinMaxCard,
} from "@/components/DashboardComponents";
import { Separator } from "@/components/ui/separator";
import { calculateMinMaxAttendance } from "~/utils/minMaxAttendance";

// use loading table as loading dashboard for now
import { LoadingTable } from "@/components/LoadingTable";
import useStore from "~/store/store";

const Dashboard: NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });

  /*
  const { data, isLoading } = api.attendance.getByRange.useQuery({
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-05-06"),
    timetableName: "sem1",
  });
  */

  const attendanceData = useStore((state) => state.attendanceData);
  const isLoading = useStore((state) => state.isLoading);
  const timeTableNames = api.timetable.getAllTimetableName.useQuery().data;

  const {
    theoryMaxName,
    labMaxName,
    theoryMinName,
    labMinName,
    theoryMax,
    labMax,
    theoryMin,
    labMin,
  } = calculateMinMaxAttendance(attendanceData);

  return (
    <>
      <div className="justify-between items-start lg:flex">
        <h2 className="mb-5 text-2xl font-bold tracking-tight"> Dashboard </h2>
        <DashboardDateTimetableForm timeTableNames={timeTableNames} />
      </div>

      <Separator className="mb-4" />

      {attendanceData === undefined ? (
        <p>select date range and timetable</p>
      ) : (
        <>
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
            data={attendanceData}
            title={"Subject: Theories"}
            isLab={false}
          />
          <DashboardAttendanceCard
            className="my-4"
            data={attendanceData}
            title={"Subject: Labs"}
            isLab={true}
          />
        </>
      )}
    </>
  );
};

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;

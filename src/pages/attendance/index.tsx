import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { api } from "~/utils/api";
import { LoadingTable } from "@/components/LoadingTable";
import { Separator } from "@/components/ui/separator";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";
//import { AttendanceTable } from "@/components/AttendanceTable";

const Attendance: NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight"> Attendances </h2>
        <p className="text-lg text-muted-foreground">
          <Balancer>
            A list of all the stored attendance records. If you want to add an
            attendance record, go to the{" "}
            <Link
              href="/attendance/create"
              className="font-semibold underline underline-offset-4"
            >
              Add Attendance
            </Link>{" "}
            page. If you want to know analytics about the attendance, go to the{" "}
            <Link
              href="/dashboard"
              className="font-semibold underline underline-offset-4"
            >
              Dashboard
            </Link>{" "}
            page.
          </Balancer>
        </p>
      </div>
      <Separator className="my-5" />
      {/*
      {isLoading ? (
        <LoadingTable rows={10} cols={3} />
      ) : (
        <AttendanceTable data={data} />
      )}
      */}
    </>
  );
};

Attendance.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Attendance;

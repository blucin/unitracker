import { useSession } from "next-auth/react";
//import { api } from "~/utils/api";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import {
  CalendarDateRangePicker,
  TimeTableSelector,
} from "@/components/DashboardComponents";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronsDown, ChevronsUp } from "lucide-react";

const Dashboard: NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Theory</CardTitle>
            <ChevronsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Maths</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Lab</CardTitle>
            <ChevronsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Chemistry</div>
            <p className="text-xs text-muted-foreground">
              +45.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Least Theory</CardTitle>
            <ChevronsDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Biology</div>
            <p className="text-xs text-muted-foreground">
              -23.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Least Lab</CardTitle>
            <ChevronsDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Physics</div>
            <p className="text-xs text-muted-foreground">
              -15.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;

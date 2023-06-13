import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import {
  CalendarDateRangePicker,
  TimeTableSelector,
} from "@/components/DashboardComponents";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Card as TremorCard,
  Title,
  BadgeDelta,
  Flex,
  ProgressBar,
} from "@tremor/react";
import _ from "lodash";
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Theory</CardTitle>
            <BadgeDelta deltaType="increase"></BadgeDelta>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{theoryMaxName}</div>
            <p className="text-xs text-muted-foreground">{theoryMax}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Lab</CardTitle>
            <BadgeDelta deltaType="increase"></BadgeDelta>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{labMaxName}</div>
            <p className="text-xs text-muted-foreground">{labMax}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Least Theory</CardTitle>
            <BadgeDelta deltaType="decrease"></BadgeDelta>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{theoryMinName}</div>
            <p className="text-xs text-muted-foreground">{theoryMin}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Least Lab</CardTitle>
            <BadgeDelta deltaType="decrease"></BadgeDelta>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{labMinName}</div>
            <p className="text-xs text-muted-foreground">{labMin}%</p>
          </CardContent>
        </Card>
      </div>

      <TremorCard className="my-4">
        <Title>Subject: Theories</Title>
        {_.map(data?.theory, (value, key) => (
          <div key={key} className="mt-4 space-y-2">
            <Flex>
              <p className="text-sm">{key}</p>
              <p className="text-sm">{`${value}%`}</p>
            </Flex>
            <ProgressBar value={value} />
          </div>
        ))}
      </TremorCard>

      <TremorCard className="my-4">
        <Title>Subject: Lab</Title>
        {_.map(data?.lab, (value, key) => (
          <div key={key} className="mt-4 space-y-2">
            <Flex>
              <p className="text-sm">{key}</p>
              <p className="text-sm">{`${value}%`}</p>
            </Flex>
            <ProgressBar value={value} />
          </div>
        ))}
      </TremorCard>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;

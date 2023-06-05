import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { api } from "~/utils/api";
import { LoadingTable } from "@/components/LoadingTable";
import { TimeTable } from "@/components/TimeTable";
import { Separator } from "@/components/ui/separator";
import { Balancer } from "react-wrap-balancer";

const Timetable: NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });
  const { data, isLoading } = api.timetable.getAll.useQuery();
  console.log("TIMETABLE: ", data);

  return (
    <>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Timetables
        </h1>
        <p className="text-lg text-muted-foreground">
          <Balancer>View your timetable here.</Balancer>
        </p>
      </div>
      <Separator className="my-5" />
      {isLoading ? (
        <LoadingTable rows={10} cols={3} />
      ) : (
        <TimeTable data={data} />
      )}
    </>
  );
};

Timetable.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Timetable;

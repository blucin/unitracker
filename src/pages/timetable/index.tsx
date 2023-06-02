import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from '~/pages/_app';
import { api } from "~/utils/api";  
import { LoadingTable } from "@/components/LoadingTable";
import { TimeTable } from "@/components/TimeTable";
import { Separator } from "@/components/ui/separator";

const Timetable:NextPageWithLayout = () => {
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
        <h2 className="text-2xl font-bold tracking-tight"> Timetables </h2>
        <p className="text-muted-foreground">
          View your timetable here.
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
}

Timetable.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
};

export default Timetable;
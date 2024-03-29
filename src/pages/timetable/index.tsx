import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { api } from "~/utils/api";
import { LoadingTable } from "@/components/LoadingTable";
import { TimeTable } from "@/components/TimeTable";
import { Separator } from "@/components/ui/separator";
import { Balancer } from "react-wrap-balancer";
import { requireAuth } from "~/utils/requireAuth";
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx:GetServerSidePropsContext) {
  return requireAuth(ctx, ({session})=> {
    return {
      props: {session},
    }
  });
}

const Timetable: NextPageWithLayout = () => {
  const { data, isLoading } = api.timetable.getAll.useQuery();
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Timetables
        </h2>
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

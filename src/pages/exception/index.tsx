import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { api } from "~/utils/api";
import { LoadingTable } from "@/components/LoadingTable";
import { Separator } from "@/components/ui/separator";
import { Balancer } from "react-wrap-balancer";
import { ExceptionTable } from "@/components/ExceptionTable";

const Exception: NextPageWithLayout = () => {
  const { data, isLoading } = api.exception.getAll.useQuery();
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight"> Exceptions </h2>
        <p className="text-lg text-muted-foreground">
          <Balancer>
            Exceptions are the dates/holidays excluded when calculating
            attendance. By default sundays are considered as an exception
          </Balancer>
        </p>
      </div>
      <Separator className="my-5" />
      {isLoading ? (
        <LoadingTable rows={10} cols={3} />
      ) : (
        <ExceptionTable data={data} />
      )}
    </>
  );
};

Exception.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Exception;

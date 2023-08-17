import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { Separator } from "@/components/ui/separator";
import { SubjectTable } from "@/components/SubjectTable";
import { api } from "~/utils/api";
import { LoadingTable } from "@/components/LoadingTable";
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

const Subject: NextPageWithLayout = () => {
  const { data, isLoading } = api.subject.getAll.useQuery();

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight"> Subjects </h2>
        <p className="text-lg text-muted-foreground">
          <Balancer>View and manage your subjects here.</Balancer>
        </p>
      </div>
      <Separator className="my-5" />
      {isLoading ? (
        <LoadingTable rows={10} cols={3} />
      ) : (
        <SubjectTable data={data} />
      )}
    </>
  );
};

Subject.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Subject;

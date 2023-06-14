import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { Separator } from "@/components/ui/separator";
import { SubjectTable } from "@/components/SubjectTable";
import { api } from "~/utils/api";
import { LoadingTable } from "@/components/LoadingTable";
import { Balancer } from "react-wrap-balancer";

const Subject: NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });
  const { data, isLoading } = api.subject.getAll.useQuery();
  const { mutate } = api.subject.deleteById.useMutation();

  const handleDelete = (_id: string) => {
    mutate({ id: _id });
  };

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
        <SubjectTable data={data} handleDelete={handleDelete} />
      )}
    </>
  );
};

Subject.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Subject;

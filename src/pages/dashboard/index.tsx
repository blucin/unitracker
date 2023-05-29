import { useSession } from "next-auth/react";
//import { api } from "~/utils/api";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from '~/pages/_app';

const Dashboard:NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });
  return (
    <>
      <p> Dashboard </p>
    </>
  );
}

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
};

export default Dashboard;
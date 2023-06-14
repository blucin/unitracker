import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from '~/pages/_app';

const CreateTimetable:NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });
  return (
    <>
      <p> CreateTimetable </p>
      <p> Labore maxime optio temporibus reiciendis, quas illo? Ipsam error repudiandae ducimus nemo minima eos, id esse molestiae est! Natus pariatur ipsum magnam!</p>
    </>
  );
}

CreateTimetable.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
};

export default CreateTimetable;
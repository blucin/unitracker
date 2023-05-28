import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Dashboard = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });
  
  return (
    <>
      <main>
        <p> Dashboard </p>
      </main>
    </>
  );
};

export default Dashboard;

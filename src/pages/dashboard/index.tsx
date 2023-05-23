import { useSession } from "next-auth/react";

const Dashboard = () => {
    //const hello = api.example.hello.useQuery({ text: "from tRPC" });

    const { data: session, status } = useSession()

    if(status==="loading") {
      return(
        <p> Loading </p>
      )
    }

    if(status==="unauthenticated") {
      return(
        <p> Unauthorized </p>
      )
    }
    
    return (
      <>
        <main>
          <p> Dashboard </p>
        </main>
      </>
    );
  };
  
  export default Dashboard;
import { type NextPage } from "next";
import { signOut } from "next-auth/react"
//import Link from "next/link";
//import { api } from "~/utils/api";


const LandingPage: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main>
        <p> Landing Page </p>
        <button onClick={()=>void signOut()}>Sign Out</button>
      </main>
    </>
  );
};

export default LandingPage;

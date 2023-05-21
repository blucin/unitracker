// import { SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";

//import Link from "next/link";
//import { api } from "~/utils/api";


const LandingPage: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main>
        <p> Landing Page </p>
        <UserButton />
      </main>
    </>
  );
};

export default LandingPage;

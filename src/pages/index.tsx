import { type NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const LandingPage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <main>
        <p> Landing Page </p>
        <button onClick={()=>void signIn()}>Sign In</button>
      </main>
    </>
  );
};

export default LandingPage;

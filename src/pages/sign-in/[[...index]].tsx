import { SignIn } from "@clerk/nextjs";
import  SignInCard from "components/SignInCard";

export default function Page() {
  return (
    <>
      <div> Test SignUp </div>
      <SignIn/>
      <SignInCard/>
    </>
  );
}
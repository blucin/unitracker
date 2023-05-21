//import { SignUpButton } from "@clerk/nextjs";
import  SignUpCard  from "components/SignUpCard";

// TODO fix card css 
export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <SignUpCard/>
      </div>
      
    </>
  );
}
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";

export default function SignUpCard({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <Card className={className}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Choose a provider to login with
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 h-fit">
        <div className="grid grid-cols-1 gap-6">
          <Button disabled onClick={()=>void signIn("github", {
            callbackUrl: `${window.location.origin}/dashboard`
          })}>
            <GithubIcon className="mr-2 h-6 w-6" />
            Github (Coming Soon)
          </Button>
          <Button onClick={()=>void signIn("google", {
            callbackUrl: `${window.location.origin}/dashboard`
          })}>
            <SiGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

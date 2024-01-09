import { type NextPage } from "next";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { siteConfig } from "~/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "~/lib/utils";
import { CalendarCheck } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggler";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LandingPage: NextPage = () => {
  return (
    <>
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-6 md:px-10 lg:px-44">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center">
              <CalendarCheck className="mr-2 h-6 w-6" />
              <span className="inline-block font-bold">{siteConfig.name}</span>
            </Link>
          </div>

          <div className="flex h-7 items-center gap-2">
            <div className="flex items-center gap-2">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }),
                    "w-9 px-0"
                  )}
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <ModeToggle />
            </div>
            <Separator orientation="vertical" className="mx-2" />
            <Button size="sm" onClick={() => signIn()}>
              Sign In
              <ArrowRight className="ml-1 h-6 w-4" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative flex h-[30rem] flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:invert"></div>

          <h1 className="lg:px-50 px-6 py-10 text-center text-3xl font-bold md:px-32 md:text-5xl xl:px-96">
            Effortlessly manage student attendance with our targeted and
            powerful platform.
          </h1>
          <div className="z-10 flex gap-2">
            <Link
              href="https://github.com/blucin/unitracker/stargazers/"
              target="_blank"
            >
              <Button className="w-24 bg-accent align-middle" variant="outline">
                <Star className="mr-2 h-8 w-4" />
                Star
              </Button>
            </Link>
            <Button onClick={() => signIn()} className="w-28">
              Sign In
              <ArrowRight
                className="ml-1 h-6 w-4 align-middle"
                strokeWidth={3}
              />
            </Button>
          </div>
        </section>

        <section className="space-y-3 px-6 py-4 md:px-10 lg:px-44">
          <h2 className="text-xl font-bold">
            Get Started in 4 Steps: (Recommended)
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  1. Go to create subjects and add your subjects of choice
                </CardTitle>
                <CardDescription>
                  After you login, head to create subject from the dashboard
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  2. Go to create timetable and add your timetable
                </CardTitle>
                <CardDescription>
                  A timetable consists of various subjects that you added before
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  3. Go to create attendance and start recording your attendance
                </CardTitle>
                <CardDescription>
                  Each timetable has its own attendance record to allow multiple
                  semester-wise timetables
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  4. View your attendance stats on the dashboard
                </CardTitle>
                <CardDescription>
                  You can select a date range to view your attendance. By
                  default any day with no attendance record is considered as
                  absent so you dont have to manually fill absents.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;

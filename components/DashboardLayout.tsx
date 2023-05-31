import { DashboardNavBar } from "@/components/DashboardNavBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Separator } from "@/components/ui/separator";
//import { cn } from "~/lib/utils";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="flex">
        <DashboardNavBar/>
        <main className="p-5">{children}</main>
      </div>
    </>
  );
}

/*
<div className="hidden lg:flex">
          <DashboardNavBar/>
          <Separator/>
        </div>
        */

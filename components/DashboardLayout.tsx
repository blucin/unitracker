import { DashboardNavBar } from "@/components/DashboardNavBar";
import { SiteHeader } from "@/components/SiteHeader";
//import { cn } from "~/lib/utils";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="flex">
        <DashboardNavBar />
        <main>{children}</main>
      </div>
    </>
  );
}

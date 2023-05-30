import { DashboardNavBar } from "@/components/DashboardNavBar";
//import { cn } from "~/lib/utils";

export function DashboardLayout({children}: {children: React.ReactNode}) {
  return(
    <div className="flex">
      <DashboardNavBar />
      <main>{children}</main>
    </div>
  )
}

import { DashboardNavBar } from "@/components/DashboardNavBar";
import { SiteHeader } from "@/components/SiteHeader";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <SiteHeader />
      <div className="grid lg:grid-cols-6">
        <DashboardNavBar className="border-r h-screen"/>
        <main className="p-10 col-span-5">{children}</main>
      </div>
    </div>
  );
}
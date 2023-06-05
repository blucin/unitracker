import { DashboardNavBar } from "@/components/DashboardNavBar";
import { SiteHeader } from "@/components/SiteHeader";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 lg:grid grid-cols-6">
        <DashboardNavBar className="border-r h-screen"/>
        <main className="p-10 col-span-5">{children}</main>
      </div>
    </div>
  );
}
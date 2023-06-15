import { DashboardNavBar } from "@/components/DashboardNavBar";
import { SiteHeader } from "@/components/SiteHeader";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col">
      <SiteHeader className="sticky top-0 z-40 border-b w-full" />
      <div className="flex-1 lg:grid grid-cols-6">
        <DashboardNavBar className="border-r h-screen fixed top-14"/>
        <main className="p-10 col-span-5 relative">{children}</main>
      </div>
    </div>
  );
}
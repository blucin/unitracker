import { DashboardNavBar } from "@/components/DashboardNavBar";
import { SiteHeader } from "@/components/SiteHeader";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SiteHeader className="sticky top-0 border-b w-full z-40" />
      <div className="grid grid-cols-6 items-start">
        <DashboardNavBar className="sticky top-14 border-r h-[calc(100dvh-3.5rem)]"/>
        <main className="p-10 col-span-5">{children}</main>
      </div>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navConfig } from "~/config/sitelink";

export function DashboardNavBar() {
  const pathname = usePathname();

  return (
    <div className="hidden pb-12 lg:block">
      <div className="space-y-4 py-4">
        {navConfig.sidebarNav.map((object, index) => (
          <div className="px-4 py-2" key={index}>
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              {object.title}
            </h2>

            {object.items.map((item, index) => (
              <Link key={index} href={item.href ? item.href : "/"}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  key={index}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

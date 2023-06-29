"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navConfig } from "~/config/sitelink";
import { cn } from "~/lib/utils";
import {
  FastForward,
  Gauge,
  Home,
  BookOpen,
  Clock3,
  XCircle,
  PlusCircle,
  Pencil,
  HelpCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const getNavIcon = (title: string) => {
  switch (title) {
    case "Dashboard":
      return <Gauge className="mr-2 h-4 w-4" />;
    case "Home":
      return <Home className="mr-2 h-4 w-4" />;
    case "Exceptions":
      return <XCircle className="mr-2 h-4 w-4" />;
    case "Add":
      return <PlusCircle className="mr-2 h-4 w-4" />;
    case "Edit":
      return <Pencil className="mr-2 h-4 w-4" />;
    default:
      return <HelpCircle className="mr-2 h-4 w-4" />;
  }
};

export function DashboardNavBar({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <div className={cn("hidden pb-12 lg:block", className)}>
      <div className="space-y-4 py-4">
        {navConfig.sidebarNav.map((object, index) => (
          <div className="px-4 py-2" key={index}>
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              {object.title}
            </h2>
            <Separator/>
            {object.items.map((item, index) => (
              <Link key={index} href={item.href ? item.href : "/"}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  key={index}
                >
                  {getNavIcon(
                    item.title.slice(0, 3) === "Add"
                      ? "Add"
                      : item.title.slice(0, 4) === "Edit"
                      ? "Edit"
                      : item.title
                  )}
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

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils"
import { CalendarCheck } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr hidden lg:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <CalendarCheck className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>
        <Link
          href={siteConfig.links.github}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          GitHub
        </Link>
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/getting-started" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Getting Started
        </Link>
      </nav>
    </div>
  );
}

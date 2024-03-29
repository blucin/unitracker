 import Link from "next/link";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CommandMenu } from "@/components/CommandMenu";
import { Github } from "lucide-react";
import { MainNav } from "@/components/Main-Nav";
import { MobileNav } from "@/components/Mobile-Nav";
import { ModeToggle } from "@/components/ModeToggler";

export function SiteHeader({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn("supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur", className)}>
      <div className="flex h-14 items-center px-4 lg:px-8">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

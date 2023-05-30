import { cn } from "~/lib/utils";
//import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function DashboardNavBar({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
            >
              Listen Now
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Browse
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Radio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

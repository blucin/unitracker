import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "~/lib/utils";
import type { RouterOutput } from "~/server/api/root";
import { buttonVariants } from "@/components/ui/button";
import { Check, X, Trash2 } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

type AttendanceTableProps = {
  className?: string;
  data: RouterOutput["attendance"]["getAll"] | undefined;
};

export function AttendanceTable({ ...props }: AttendanceTableProps) {
  const [showDetailedView, setShowDetailedView] = React.useState(false);

  const handleSwitchClick = () => {
    setShowDetailedView(!showDetailedView);
  };

  return (
    <main className="space-y-5">
      <div className="flex items-center space-x-2">
        <Label htmlFor="show-details">More Details</Label>
        <Switch id="show-details" onClick={handleSwitchClick} />
      </div>

      <Table className={cn(props.className, "")}>
        <TableCaption>A list of attendance records.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            {showDetailedView && (
              <>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
              </>
            )}
            <TableHead>Subject</TableHead>
            <TableHead>wasLab</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data?.map((attendance) => (
            <TableRow key={attendance.id}>
              <TableCell>
                {format(new Date(attendance.date), "dd MMM yyyy")}
              </TableCell>
              {showDetailedView && (
                <>
                  <TableCell>
                    {attendance.dayName}
                  </TableCell>
                  <TableCell>
                    {attendance.startTime.slice(0, 5)} to{" "}
                    {attendance.endTime.slice(0, 5)}
                  </TableCell>
                </>
              )}
              <TableCell>{attendance.subjectName}</TableCell>
              <TableCell>
                {attendance.isLab ? <Check color="green" /> : <X color="red" />}
              </TableCell>
              <div
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "mt-2 w-9 border-red-600 bg-red-400 bg-opacity-20 px-0 hover:border-2 dark:bg-red-950"
                )}
              >
                <Trash2 className="h-4 w-4" color="red" />
              </div>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

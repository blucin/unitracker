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
import { Ban, Check, X } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { DeleteButton } from "@/components/DeleteButton";
import { api } from "~/utils/api";
import { toast } from "@/components/ui/use-toast";

type AttendanceTableProps = {
  className?: string;
  data: RouterOutput["attendance"]["getAll"] | undefined;
};

export function AttendanceTable({ ...props }: AttendanceTableProps) {
  const ctx = api.useContext();
  const [showDetailedView, setShowDetailedView] = React.useState(false);

  const handleSwitchClick = () => {
    setShowDetailedView(!showDetailedView);
  };

  const deleteAttendanceMutation = api.attendance.deleteAttendance.useMutation({
    onSuccess: (data, variables) => {
      void ctx.attendance.getAll.invalidate();
      toast({
        title: "Sucessfully deleted attendance!",
        description: (
          <>
            <div>
              <Check className="h-6 w-6" color="green" />
              <p>Attendance deleted sucessfully!</p>
            </div>
            <p>Internal Id: {variables.attendanceId}</p>
          </>
        ),
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: (
          <>
            <div>
              <Ban className="h-6 w-6" color="red" />
              <p>{error.message}</p>
            </div>
          </>
        ),
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteAttendanceMutation.mutate({ attendanceId: id });
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
                  <TableCell>{attendance.dayName}</TableCell>
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
              <DeleteButton
                handleClick={() => handleDelete(attendance.id)}
                title="Delete Attendance"
                description="Are you sure you want to delete this attendance record?"
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

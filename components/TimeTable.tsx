import { cn } from "~/lib/utils";
import type { RouterOutput } from "~/server/api/root";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "~/utils/api";
import { DeleteButton } from "@/components/DeleteButton";
import { toast } from "@/components/ui/use-toast";
import { Ban, Check } from "lucide-react";

type TimeTableProps = {
  className?: string;
  data: RouterOutput["timetable"]["getAll"] | undefined;
};

export function TimeTable({ ...props }: TimeTableProps) {
  const ctx = api.useContext();
  const deleteTimeTableMutation = api.timetable.deleteTimeTable.useMutation({
    onSuccess: (data, variables) => {
      void ctx.timetable.getAll.invalidate();
      toast({
        title: `Sucessfully deleted ${variables.timeTableName}!`,
        description: (
          <>
            <div>
              <Check className="h-6 w-6" color="green" />
              <p>Timetable deleted sucessfully!</p>
            </div>
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
  const handleDelete = (timetableName: string) => {
    deleteTimeTableMutation.mutate({ timeTableName: timetableName });
  };
  return (
    <>
      {props.data &&
        Object.entries(props.data).map(([timetableName, timetable]) => (
          <div key={timetableName} className="border-b">
            <div className="flex justify-between items-center">
              <h2 className="my-4 text-lg font-bold tracking-tight">
                {timetableName}
              </h2>
              <DeleteButton
                handleClick={() => handleDelete(timetableName)}
                title="Delete TimeTable"
                description="Are you sure you want to delete this timetable?"
              />
            </div>
            <Tabs defaultValue="Monday">
              <TabsList>
                {Object.entries(timetable).map(([day, dayData]) => (
                  <TabsTrigger key={day} value={day}>
                    {day === "Thursday" ? day.slice(0, 4) : day.slice(0, 3)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(timetable).map(([day, dayData]) => (
                <TabsContent key={day} value={day}>
                  <Table>
                    <TableCaption className="mb-4">
                      Timetable for {day}
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Start time</TableHead>
                        <TableHead>End time</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Subject code</TableHead>
                        <TableHead>IsLab?</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dayData.map((timeSlot) => (
                        <TableRow key={timeSlot.TimeTable.id}>
                          <TableCell>{timeSlot.TimeTable.startTime}</TableCell>
                          <TableCell>{timeSlot.TimeTable.endTime}</TableCell>
                          <TableCell>{timeSlot.Subject.subjectName}</TableCell>
                          <TableCell>{timeSlot.Subject.subjectCode}</TableCell>
                          <TableCell>
                            {timeSlot.Subject.hasLab ? "Yes" : "No"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        ))}
    </>
  );
}

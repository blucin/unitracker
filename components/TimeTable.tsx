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

type TimeTableProps = {
  className?: string;
  data: RouterOutput["timetable"]["getAll"] | undefined;
};

export function TimeTable({ ...props }: TimeTableProps) {
  return (
    <>
      {props.data &&
        Object.entries(props.data).map(([timetableName, timetable]) => (
          <div key={timetableName} className="border-b">
            <h2 className="text-lg font-bold tracking-tight my-4">
              {timetableName}
            </h2>
            <Tabs defaultValue="Monday">
              <TabsList>
                {Object.entries(timetable).map(([day, dayData]) => (
                  <TabsTrigger key={day} value={day}>
                    {day==="Thursday" ? day.slice(0, 4) : day.slice(0, 3)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(timetable).map(([day, dayData]) => (
                <TabsContent key={day} value={day}>
                  <Table>
                    <TableCaption className="mb-4">Timetable for {day}</TableCaption>
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

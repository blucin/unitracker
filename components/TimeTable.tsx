import { cn } from "~/lib/utils";
import type { RouterOutput } from "~/server/api/root";

type TimeTableProps = {
  className?: string;
  data: RouterOutput["timetable"]["getAll"] | undefined;
};

export function TimeTable({ ...props }: TimeTableProps) {
  return (
    <>
      {props.data &&
        Object.entries(props.data).map(([timetableName, timetable]) => (
          <div key={timetableName}>
            <h2 className="font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4">{timetableName}</h2>
            <div className="flex mb-8 border justify-between">
              {Object.entries(timetable).map(([day, dayData]) => (
                <div key={day} className="flex flex-col border flex-grow">
                  <span className="py-3 px-4 align-middle font-medium text-muted-foreground border-b text-center">{day}</span>
                  {dayData.map((timeSlot) => (
                    <span key={timeSlot.TimeTable.id} className="py-2 px-4 align-middle text-center">
                      {timeSlot.Subject.subjectName}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
}

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

type TimeTableProps = {
  className?: string;
  data: RouterOutput["timetable"]["getAll"] | undefined;
};

export function TimeTable({ ...props }: TimeTableProps) {
  return (
    <>
      <p>temp</p>
    </>
  );
}

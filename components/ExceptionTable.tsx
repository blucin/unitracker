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
import { Trash2 } from "lucide-react";

type ExceptionTableProps = {
  className?: string;
  data: RouterOutput["exception"]["getAll"] | undefined;
};

export function ExceptionTable({ ...props }: ExceptionTableProps) {
  return (
    <Table className={cn(props.className, "")}>
      <TableCaption>A list of exceptions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Exception Name</TableHead>
          <TableHead>Start date</TableHead>
          <TableHead>End date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data?.map((exception) => (
          <TableRow key={exception.id}>
            <TableCell>{exception.holiday}</TableCell>
            <TableCell>{exception.startDate}</TableCell>
            <TableCell>{exception.endDate === exception.startDate ? "-" : exception.endDate}</TableCell>
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "ghost",
                }),
                "mt-2 w-9 px-0"
              )}
            >
              <Trash2 className="h-4 w-4" />
            </div>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

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

type SubjectTableProps = {
  className?: string;
  data: RouterOutput["subject"]["getAll"] | undefined;
  handleDelete: (id: string) => void;
};

export function SubjectTable({ ...props }: SubjectTableProps) {
  return (
    <Table className={cn(props.className, "")}>
      <TableCaption>A list of subjects.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Subject Code</TableHead>
          <TableHead>Subject Name</TableHead>
          <TableHead>hasLab?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data?.map((subject) => (
          <TableRow key={subject.id}>
            <TableCell>{subject.subjectCode}</TableCell>
            <TableCell>{subject.subjectName}</TableCell>
            <TableCell>{subject.hasLab ? "Yes" : "No"}</TableCell>
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "ghost",
                }),
                "w-9 px-0 mt-2"
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

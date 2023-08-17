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
import { DeleteButton } from "@/components/DeleteButton";
import { api } from "~/utils/api";
import { toast } from "@/components/ui/use-toast";

type SubjectTableProps = {
  className?: string;
  data: RouterOutput["subject"]["getAll"] | undefined;
};

export function SubjectTable({ ...props }: SubjectTableProps) {
  const ctx = api.useContext();
  const deleteSubjectMutation = api.subject.deleteSubject.useMutation({
    onSuccess: (data, variables) => {
      void ctx.subject.getAll.invalidate();
      toast({
        title: "Sucessfully deleted subject!",
        description: (
          <>
            <div>
              <Check className="h-6 w-6" color="green" />
              <p>Subject deleted sucessfully!</p>
            </div>
            <p>Internal Id: {variables.subjectId}</p>
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
    deleteSubjectMutation.mutate({ subjectId: id });
  };
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
            <TableCell>
              {subject.hasLab ? <Check color="green" /> : <X color="red" />}
            </TableCell>
            <DeleteButton
              handleClick={() => handleDelete(subject.id)}
              title="Delete Subject"
              description="Are you sure you want to delete this subject?"
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

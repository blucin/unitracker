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
import { api } from "~/utils/api";
import { DeleteButton } from "@/components/DeleteButton";
import { toast } from "@/components/ui/use-toast";
import { Ban, Check } from "lucide-react";

type ExceptionTableProps = {
  className?: string;
  data: RouterOutput["exception"]["getAll"] | undefined;
};

export function ExceptionTable({ ...props }: ExceptionTableProps) {
  const ctx = api.useContext();
  const deleteExceptionMutation = api.exception.deleteException.useMutation({
    onSuccess: (data, variables) => {
      void ctx.exception.getAll.invalidate();
      toast({
        title: "Sucessfully deleted exception!",
        description: (
          <>
            <div>
              <Check className="h-6 w-6" color="green" />
              <p>Exception deleted sucessfully!</p>
            </div>
            <p>Internal Id: {variables.exceptionId}</p>
          </>
        ),
      });
    },onError: (error) => {
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
    }});
  const handleDelete = (id: string) => {
    deleteExceptionMutation.mutate({exceptionId:id});
  };
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
            <DeleteButton
              handleClick={()=>handleDelete(exception.id)}
              title="Delete Exception"
              description="Are you sure you want to delete this exception?"
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

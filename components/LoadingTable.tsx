"use server"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";

type LoadingTableProps = {
  className?: string;
  rows: number;
  cols: number;
}

export function LoadingTable({ ...props }: LoadingTableProps) {
  return(
    <Table className={props.className}>
      <TableCaption>Loading ...</TableCaption>
      <TableHeader>
        <TableRow>
            {Array.from({ length: props.cols }, (_, i) => (
              <TableHead key={i}><Skeleton className="h-5 w-[200px]" /></TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: props.rows }, (_, i) => (
          <TableRow key={i}>
            {Array.from({ length: props.cols }, (_, i) => (
              <TableCell key={i}><Skeleton className="h-5 w-[200px]" /></TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

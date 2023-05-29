"use client"

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

// enddate should be after startdate
const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

export function AttendanceBySubjectForm(submitHandler: (data: z.infer<typeof formSchema>) => void) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endDate: new Date(),
    }
  });

  // 2. Handle form state, errors, and submission.
  function onSubmit(data: z.infer<typeof formSchema>) {
    submitHandler(data);
  }
}

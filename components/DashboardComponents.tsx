"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// form
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import useStore from "~/store/store";
import { cn } from "~/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// attendance cards % by each subject
import { Card as TremorCard, Title, Flex, ProgressBar } from "@tremor/react";
import type { RouterOutput } from "~/server/api/root";
import _ from "lodash";

// min max attendance cards
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDelta } from "@tremor/react";

// date range picker and timetable form
type DashboardDateTimetableFormProps = {
  timeTableNames: RouterOutput["timetable"]["getAllTimetableName"] | undefined;
};

const FormSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  timetableName: z.string(),
});

export function DashboardDateTimetableForm({
  ...props
}: DashboardDateTimetableFormProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("FORM DATA", data);
  }

  return (
    <Form {...form}>
      <form className="gap-4 lg:flex items-center" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="lg:hidden">Select date range:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant={"outline"}
                      size="sm"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="lg:hidden">
                The date range to calculate attendance for
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timetableName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="lg:hidden">Timetable:</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-9 w-[240px]">
                    <SelectValue placeholder="Timetable" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {props.timeTableNames === undefined ? (
                    <></>
                  ) : (
                    props.timeTableNames.map((value, index) => {
                      return (
                        <SelectItem key={index} value={value.timeTableName}>
                          {value.timeTableName}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
              <FormDescription className="lg:hidden">
                Calculation will be based of the timetable selected{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="my-5 h-9 lg:my-0" type="submit">
          Retrieve
        </Button>
      </form>
    </Form>
  );
}

// attendance cards containing % attendance
type DashboardAttendanceCardProps = {
  className?: string;
  data: RouterOutput["attendance"]["getByRange"] | undefined;
  title: string;
  isLab: boolean;
};

export function DashboardAttendanceCard({
  ...props
}: DashboardAttendanceCardProps) {
  return (
    <TremorCard className={props.className}>
      <Title>{props.title}</Title>
      {_.map(
        props.isLab ? props.data?.lab : props.data?.theory,
        (value, key) => {
          return (
            <div key={key} className="mt-4 space-y-2">
              <Flex>
                <p className="text-sm">{key}</p>
                <p className="text-sm">{`${value}%`}</p>
              </Flex>
              <ProgressBar value={value} />
            </div>
          );
        }
      )}
    </TremorCard>
  );
}

// attendance min max cards for theory and lab
type DashboardAttendanceMinMaxCardProps = {
  className?: string;
  cardTitle: string;
  subjectName: string;
  attendance: number;
  deltaType: "increase" | "decrease";
};

export function DashboardAttendanceMinMaxCard({
  ...props
}: DashboardAttendanceMinMaxCardProps) {
  return (
    <Card className={props.className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.cardTitle}</CardTitle>
        <BadgeDelta deltaType={props.deltaType}></BadgeDelta>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.subjectName}</div>
        <p className="text-xs text-muted-foreground">{`${props.attendance}%`}</p>
      </CardContent>
    </Card>
  );
}

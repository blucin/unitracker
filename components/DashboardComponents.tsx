"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// form
import { DashboardFormSchema } from "~/types/formSchemas";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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

// for dashboard component
import { api } from "~/utils/api";
import { LoadingTable } from "@/components/LoadingTable";
import { calculateMinMaxAttendance } from "~/utils/minMaxAttendance";

// date range picker and timetable form
type DashboardDateTimetableFormProps = {
  timeTableNames: RouterOutput["timetable"]["getAllTimetableName"] | undefined;
  submitHandler: (data: z.infer<typeof DashboardFormSchema>) => void;
};

export function DashboardDateTimetableForm({
  ...props
}: DashboardDateTimetableFormProps) {
  const form = useForm<z.infer<typeof DashboardFormSchema>>({
    resolver: zodResolver(DashboardFormSchema),
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-start gap-4 lg:flex-row"
        onSubmit={form.handleSubmit(props.submitHandler)}
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col lg:space-y-0">
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
              <div className="flex gap-1">
                <FormMessage />
                <FormDescription className="lg:hidden">
                  The date range to calculate attendance for
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timetableName"
          render={({ field }) => (
            <FormItem className="lg:space-y-0">
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
              <div className="flex gap-1">
                <FormMessage />
                <FormDescription className="lg:hidden">
                  Calculation will be based of the timetable selected{" "}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button className="mb-4 h-[36px] lg:mb-0" type="submit">
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

function DashboardAttendanceCard({ ...props }: DashboardAttendanceCardProps) {
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

function DashboardAttendanceMinMaxCard({
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

type DashboardProps = {
  className?: string;
  formData: z.infer<typeof DashboardFormSchema> | undefined;
};

export function Dashboard({ ...props }: DashboardProps) {
  if (props.formData != undefined) {
    const { data, isLoading } = api.attendance.getByRange.useQuery({
      startDate: props.formData.date.from,
      endDate: props.formData.date.to,
      timetableName: props.formData.timetableName,
    });

    const {
      theoryMaxName,
      labMaxName,
      theoryMinName,
      labMinName,
      theoryMax,
      labMax,
      theoryMin,
      labMin,
    } = calculateMinMaxAttendance(data);

    return isLoading ? (
      <LoadingTable rows={10} cols={5} />
    ) : (
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardAttendanceMinMaxCard
            cardTitle="Top Theory"
            subjectName={theoryMaxName}
            attendance={theoryMax}
            deltaType="increase"
          />
          <DashboardAttendanceMinMaxCard
            cardTitle="Top Lab"
            subjectName={labMaxName}
            attendance={labMax}
            deltaType="increase"
          />
          <DashboardAttendanceMinMaxCard
            cardTitle="Bottom Theory"
            subjectName={theoryMinName}
            attendance={theoryMin}
            deltaType="decrease"
          />
          <DashboardAttendanceMinMaxCard
            cardTitle="Bottom Lab"
            subjectName={labMinName}
            attendance={labMin}
            deltaType="decrease"
          />
        </div>

        <DashboardAttendanceCard
          className="my-4"
          data={data}
          title={"Subject: Theories"}
          isLab={false}
        />
        <DashboardAttendanceCard
          className="my-4"
          data={data}
          title={"Subject: Labs"}
          isLab={true}
        />
      </>
    );
  } else {
    return (
      <>
        <p>Server Error</p>
      </>
    );
  }
}

"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { useStore } from "~/store/store";

import { cn } from "~/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// timetable selector
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

// date range picker
export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  const dateRange = useStore((state) => state.dateRange);
  const setDateRange = useStore((state) => state.setDateRange);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size="sm"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// timetable selector
export function TimeTableSelector({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Select>
      <SelectTrigger className="h-9 w-[240px]">
        <SelectValue placeholder="Timetable" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
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

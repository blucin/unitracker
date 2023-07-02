import { AttendanceFormSchema } from "~/types/formSchemas";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import type * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import type { RouterOutput } from "~/server/api/root";
import { api } from "~/utils/api";
import { format } from "date-fns";
import React from "react";
import { cn } from "~/lib/utils";
import { Separator } from "@/components/ui/separator";

type CheckboxCardProps = {
  item: RouterOutput["timetable"]["getByTimetableId"][0];
  control: ReturnType<
    typeof useForm<z.infer<typeof AttendanceFormSchema>>
  >["control"];
};

function CheckboxCard({ item, control }: CheckboxCardProps) {
  return (
    <FormField
      key={item.id}
      control={control}
      name="timetableIds"
      render={({ field }) => {
        return (
          <FormItem
            key={item.id}
            className={cn(
              "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent sm:items-center",
              field.value?.includes(item.id) &&
                "bg-accent text-accent-foreground"
            )}
          >
            <FormControl>
              <Checkbox
                checked={field.value?.includes(item.id)}
                onCheckedChange={(checked) => {
                  if (Array.isArray(field.value)) {
                    return checked
                      ? field.onChange([...field.value, item.id])
                      : field.onChange(
                          field.value.filter((value) => value !== item.id)
                        );
                  } else {
                    return field.onChange([item.id]);
                  }
                }}
              />
            </FormControl>
            <div className="flex flex-col items-start justify-start sm:flex-row md:items-center">
              <FormLabel className="whitespace-nowrap font-normal md:mb-0 sm:mb-3">
                {item.subjectName} {item.isLab ? "(Lab)" : ""}
              </FormLabel>
              <Separator
                className="mx-3 hidden h-4 sm:block"
                decorative
                orientation="vertical"
              />
              <FormDescription>
                {item.dayName}
              </FormDescription>
              <Separator
                className="mx-3 hidden h-4 sm:block"
                decorative
                orientation="vertical"
              />
              <FormDescription>
                {item.startTime.slice(0, 5)} to {item.endTime.slice(0, 5)}
              </FormDescription>
            </div>
          </FormItem>
        );
      }}
    />
  );
}

type FormUnitProps = {
  timeTableName: string;
  form: ReturnType<typeof useForm<z.infer<typeof AttendanceFormSchema>>>;
};

function FormUnit({ timeTableName, form }: FormUnitProps) {
  const { data, isLoading, isError } = api.timetable.getByTimetableId.useQuery({
    timeTableName: timeTableName,
  });
  const [formattedData, setFormattedData] = React.useState<
    RouterOutput["timetable"]["getByTimetableId"] | undefined
  >(undefined);
  if (isLoading) {
    return (
      <Card className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Card>
    );
  }
  if (isError) {
    return (
      <Card className="flex h-[400px] w-full items-center justify-center">
        <span className="text-red-500">Error loading data</span>
      </Card>
    );
  }
  const selectedDate = form.getValues("date");

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setFormattedData(
      data?.filter(
        (item) =>
          item.dayName === date.toLocaleDateString("en-US", { weekday: "long" })
      )
    );
  };

  return (
    <>
      <Card className="space-y-5 p-5">
        <h2 className="text-center text-base font-medium underline underline-offset-8">
          {timeTableName}
        </h2>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-base">Date of attendance</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(value) => {
                      field.onChange(value);
                      handleDateChange(value);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the date to mark attendance for
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-4">
          <FormLabel className="text-base">Mark your attendance</FormLabel>
          <FormDescription>
            Select the subjects to mark attendance for
          </FormDescription>
        </div>

        <div className="space-y-3">
          {selectedDate &&
            formattedData &&
            /* filter out the data which is not from the selected Date then map */
            formattedData.map((item) => (
              <CheckboxCard key={item.id} item={item} control={form.control} />
            ))}
        </div>
      </Card>
    </>
  );
}

type AttendanceFormProps = {
  handleSubmit: (formData: z.infer<typeof AttendanceFormSchema>) => void;
  disableSubmit: boolean;
  timeTableNames: RouterOutput["timetable"]["getAllTimetableName"] | undefined;
};

export function AttendanceForm({ ...props }: AttendanceFormProps) {
  const form = useForm<z.infer<typeof AttendanceFormSchema>>({
    resolver: zodResolver(AttendanceFormSchema),
  });

  const selectedTimeTable = form.watch("selectedTimeTable");
  const [showForm, setShowForm] = React.useState(false);

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(props.handleSubmit)}
      >
        <FormField
          control={form.control}
          name="selectedTimeTable"
          render={({ field }) => (
            <FormItem className="lg:space-y-0">
              <FormLabel className="lg:hidden">Timetable:</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setShowForm(true);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select a timetable" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {props.timeTableNames === undefined ? (
                      <SelectLabel>No timetables:</SelectLabel>
                    ) : (
                      <SelectLabel>Timetables:</SelectLabel>
                    )}
                    {props.timeTableNames === undefined ? (
                      <></>
                    ) : (
                      props.timeTableNames?.map((timetable, index) => (
                        <SelectItem key={index} value={timetable.timeTableName}>
                          {timetable.timeTableName}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
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

        {/* Using a sub form so the formfield dynamically change based on the selected timetable */}
        {showForm ? (
          <FormUnit timeTableName={selectedTimeTable} form={form} />
        ) : (
          <p>Select a timetable or create one first</p>
        )}
      </form>
    </Form>
  );
}

"useclient";

import { TimetableFormSchema, DayNameType } from "~/types/formSchemas";
import { Input } from "@/components/ui/input";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import React from "react";
import { Check, ChevronsUpDown, Plus, Minus, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { RouterOutput } from "~/server/api/root";

type DaysType = {
  id: z.infer<typeof DayNameType>;
  label: string;
};

const days: DaysType[] = [
  { id: "Monday", label: "Monday" },
  { id: "Tuesday", label: "Tuesday" },
  { id: "Wednesday", label: "Wednesday" },
  { id: "Thursday", label: "Thursday" },
  { id: "Friday", label: "Friday" },
  { id: "Saturday", label: "Saturday" },
];

const defaultFormObject: z.infer<typeof TimetableFormSchema> = {
  timetableName: "",
  timetableObject: [
    {
      dayName: "Monday",
      subjectId: "",
      startTime: "",
      endTime: "",
      isLab: "false",
    },
  ],
};

type TimetableFormProps = {
  submitHandler: (data: z.infer<typeof TimetableFormSchema>) => void;
  userSubjects: RouterOutput["subject"]["getSubjectNameSubjectIdAndHasLab"];
  disableSubmit: boolean;
};

export function TimetableForm({ ...props }: TimetableFormProps) {
  const form = useForm<z.infer<typeof TimetableFormSchema>>({
    resolver: zodResolver(TimetableFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "timetableObject", // unique name for your Field Array
  });

  const timetableObjects = form.watch("timetableObject");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.submitHandler)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="timetableName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Timetable Name:</FormLabel>
              <FormDescription>Name your timetable.</FormDescription>
              <Input {...field} value={field.value} className="lg:w-[50%]" />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel className="text-base">Subject Count:</FormLabel>
          <FormDescription>
            Refers to the total number of subjects for a given timetable
          </FormDescription>
          <Card className="grid max-w-fit grid-cols-3 grid-rows-1 items-center">
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() => remove(fields.length - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <p className="text-center">{fields.length}</p>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() => append(defaultFormObject.timetableObject)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </Card>
        </div>

        {fields.map((field, index) => (
          <Card key={field.id} className="space-y-5 p-5">
            <h2 className="text-center text-base font-medium underline underline-offset-8">
              Form Unit {index + 1}
            </h2>
            <FormField
              control={form.control}
              name={`timetableObject.${index}.dayName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Day:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="md:max-w-[200px]">
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {days.map((day, index) => (
                        <SelectItem key={day.id} value={day.id}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the day for this form unit. A timetable consists of
                    multiple form units which may have multiple form units of
                    same or different days.
                  </FormDescription>
                  <FormMessage />
                  {form.formState.errors.timetableObject?.[index]?.dayName && (
                    <p>{form.formState.errors.timetableObject?.[index]?.dayName?.message}</p>)}
                </FormItem>
              )}
            />

            <div className="md:flex gap-5">
              <FormField
                control={form.control}
                name={`timetableObject.${index}.startTime`}
                render={({ field }) => (
                  <FormItem className="flex-grow-1">
                    <FormLabel>Start Time: </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        type="time"
                        className="min-w-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`timetableObject.${index}.endTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time: </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        type="time"
                        className="min-w-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`timetableObject.${index}.subjectId`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Subject: </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[100%] justify-between lg:w-[500px]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? props.userSubjects.find(
                                (subject) => subject.subjectId === field.value
                              )?.subjectName
                            : "Select subject"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100%] p-0 lg:w-[500px]">
                      <Command>
                        <CommandEmpty>No subject found.</CommandEmpty>
                        <CommandGroup>
                          {props.userSubjects.map((subject) => (
                            <CommandItem
                              value={subject.subjectId}
                              key={subject.subjectId}
                              onSelect={(value) => {
                                form.setValue(
                                  `timetableObject.${index}.subjectId`,
                                  value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  subject.subjectId === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {subject.subjectName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select the subject for the current time slot
                  </FormDescription>
                  <FormMessage />
                  {form.formState.errors.timetableObject?.[index]?.subjectId && (
                    <p>{form.formState.errors.timetableObject?.[index]?.message}</p>)}
                </FormItem>
              )}
            />

            {props.userSubjects.find((o) => {
              if (o.subjectId === timetableObjects[index]?.subjectId)
                return o.hasLab;
              else return false;
            }) && (
              <FormField
                control={form.control}
                name={`timetableObject.${index}.isLab`}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is the current time slot of the subject a practical session?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="false"
                        className="flex items-center gap-5"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </Card>
        ))}

        <Button
          type="submit"
          className="w-[130px]"
          disabled={props.disableSubmit}
        >
          {props.disableSubmit ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
 
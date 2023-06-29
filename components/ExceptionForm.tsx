import { ExceptionFormSchema } from "~/types/formSchemas";
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import React from "react";
import { Loader2 } from "lucide-react";

type ExceptionFormProps = {
  submitHandler: (data: z.infer<typeof ExceptionFormSchema>) => void;
  disableSubmit: boolean;
};

export function ExceptionForm({ ...props }: ExceptionFormProps) {
  const form = useForm<z.infer<typeof ExceptionFormSchema>>({
    resolver: zodResolver(ExceptionFormSchema),
  });
  
  const isRange = form.watch("isRange");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.submitHandler)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="exceptionName"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exception Name:</FormLabel>
              <FormControl>
                <Input placeholder="e.g. New Year" {...field} className="lg:max-w-[50%]" />
              </FormControl>
              <FormDescription>Enter the exception name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isRange"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Is it a Single Exception or a Range of Exceptions?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue="false"
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">Ranged</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">Single</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                e.g. Single: `New Year`, Ranged: `Summer Vacation`
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                {isRange === "true"
                  ? "Exception Start Day:"
                  : "Exception Date:"}
              </FormLabel>
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
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {isRange === "true"
                  ? "Pick the start day of the exception range."
                  : "Pick the day of the exception."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isRange === "true" ? (<FormField
          control={form.control}
          name="endDate"
          rules={{required: true}}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Exception End Day:
              </FormLabel>
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
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Pick the end day of the exception range.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />) : <></>}

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

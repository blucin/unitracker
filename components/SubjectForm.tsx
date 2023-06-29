import { SubjectFormSchema } from "~/types/formSchemas";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

type SubjectFormProps = {
  submitHandler: (data: z.infer<typeof SubjectFormSchema>) => void;
  disableSubmit: boolean;
};

export function SubjectForm({ ...props }: SubjectFormProps) {
  const form = useForm<z.infer<typeof SubjectFormSchema>>({
    resolver: zodResolver(SubjectFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.submitHandler)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="subjectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Name:</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Operating Systems" {...field} className="lg:max-w-[50%]" />
              </FormControl>
              <FormDescription>Enter the name of the subject.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subjectCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Code:</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 23CS102" {...field} className="lg:max-w-[50%]" />
              </FormControl>
              <FormDescription>Enter the subject code.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasLab"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Does this subject have practicals?</FormLabel>
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

import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { Balancer } from "react-wrap-balancer";
import { Separator } from "@/components/ui/separator";
import { AttendanceForm } from "@/components/AttendanceForm";
import { type AttendanceFormSchema } from "~/types/formSchemas";
import * as z from "zod";
import { api } from "~/utils/api";
import { toast } from "@/components/ui/use-toast";
import { Ban, Check } from "lucide-react";
import { format } from "date-fns";

const CreateAttendance: NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });
  const timeTableNames = api.timetable.getAllTimetableName.useQuery().data;
  /*
  const mutation = api.exception.addException.useMutation({
    onSuccess: (data, variables) => {
      toast({
        title: "Sucessfully added exception!",
        description: (
          <>
            <div>
              <Check className="h-6 w-6" color="green" />
              <p>Exception: {variables.exceptionName}</p>
            </div>
              <p>Start Date: {format(variables.startDate, "yyyy-MM-dd")}</p>
            {(variables.endDate && variables.isRange==="true") && (
              <p>End Date: {format(variables.startDate, "yyyy-MM-dd")}</p>
            )}
          </>
        ),
      });
    },
    onError: (error) => {
      // orm does not provide error handling :(
      if (error.message.includes("AlreadyExists")) {
        toast({
          title: "Error",
          description: (
            <>
              <div>
                <Ban className="h-6 w-6" color="red" />
                <p>Exception already exists!</p>
              </div>
            </>
          ),
        });
        return;
      }

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
    },
  });
  */

  const onSubmit = (formData: z.infer<typeof AttendanceFormSchema>) => { 
    console.log(formData);
  };

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight"> Attendances </h2>
        <p className="text-lg text-muted-foreground">
          <Balancer>
            Add your attendance here. Attendance are just a record of presence on a given date for a given timetable.
          </Balancer>
        </p>
      </div>
      <Separator className="my-5" />
      <AttendanceForm
        handleSubmit={onSubmit}
        disableSubmit={false}
        timeTableNames={timeTableNames}
      />
    </>
  );
};

CreateAttendance.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateAttendance;

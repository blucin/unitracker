import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { Balancer } from "react-wrap-balancer";
import { Separator } from "@/components/ui/separator";
import { AttendanceForm } from "@/components/AttendanceForm";
import { type AttendanceFormSchema } from "~/types/formSchemas";
import * as z from "zod";
import { api } from "~/utils/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Ban, Car, Check } from "lucide-react";
import { format } from "date-fns";

const CreateAttendance: NextPageWithLayout = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: "/login" };
    },
  });
  const timeTableNames = api.timetable.getAllTimetableName.useQuery().data;
  
  const mutation = api.attendance.addAttendanceByTimetableId.useMutation({
    onSuccess: (data, variables) => {
      toast({
        title: "Sucessfully added attendance!",
        description: (
          <>
            <div>
              <Check className="h-6 w-6" color="green" />
              <p>Attendance for: {format(variables.date, "yyyy-MM-dd")}</p>
            </div>
              <p>Timetable: {variables.selectedTimeTable}</p>
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
                <p>Attendance already exist (atleast for one of the selected subject)!</p>
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

  const onSubmit = (formData: z.infer<typeof AttendanceFormSchema>) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight"> Attendances </h2>
        <p className="text-lg text-muted-foreground">
          <Balancer>
            Add your attendance here. Attendance are just a record of presence
            on a given date for a given timetable.
          </Balancer>
        </p>
      </div>
      <Separator className="my-5" />
      <Card className="p-5">
        <Tabs defaultValue="by_date" className="space-y-2">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="by_date">By Date</TabsTrigger>
            <TabsTrigger value="by_date_range" disabled>
              By Date Range
            </TabsTrigger>
          </TabsList>
          <TabsContent className="p-2" value="by_date">
            <AttendanceForm
              handleSubmit={onSubmit}
              disableSubmit={false}
              timeTableNames={timeTableNames}
            />
          </TabsContent>
          <TabsContent className="p-2" value="by_date_range"> WIP </TabsContent>
        </Tabs>
      </Card>
    </>
  );
};

CreateAttendance.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateAttendance;

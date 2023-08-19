import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { Balancer } from "react-wrap-balancer";
import { Separator } from "@/components/ui/separator";
import { api } from "~/utils/api";
import { TimetableForm } from "@/components/TimetableForm";
import { TimetableFormSchema } from "~/types/formSchemas";
import * as React from "react";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Ban, Check } from "lucide-react";
import { requireAuth } from "~/utils/requireAuth";
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx:GetServerSidePropsContext) {
  return requireAuth(ctx, ({session})=> {
    return {
      props: {session},
    }
  });
}

const CreateTimetable: NextPageWithLayout = () => {
  const mutation = api.timetable.addTimeTable.useMutation({
    onSuccess: (data, variables) => {
      toast({
        title: "Sucessfully added timetable!",
        description: (
          <>
            <div>
              <Check className="h-6 w-6" color="green" />
              <p>Timetable: {variables.timetableName}</p>
            </div>
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
                <p>Timetable already exists!</p>
                <p>Consider renaming timetable name</p>
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


  const subjectsQuery = api.subject.getSubjectNameSubjectIdAndHasLab.useQuery();

  const onSubmit = (formData: z.infer<typeof TimetableFormSchema>) => {
    mutation.mutate(formData);
  };

  // TODO - add loading and error states
  if(subjectsQuery.isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if(subjectsQuery.data === undefined) {
    return (
      <p>Something went wrong</p>
    )
  }

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight"> Timetables </h2>
        <p className="text-lg text-muted-foreground">
          <Balancer>Add your timetables here.</Balancer>
        </p>
      </div>
      <Separator className="my-5" />
        <TimetableForm
          userSubjects={subjectsQuery.data}
          submitHandler={onSubmit}
          disableSubmit={false}
        />
    </>
  );
};

CreateTimetable.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateTimetable;

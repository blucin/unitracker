import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { Balancer } from "react-wrap-balancer";
import { Separator } from "@/components/ui/separator";
import { SubjectForm } from "@/components/SubjectForm";
import { api } from "~/utils/api";
import { SubjectFormSchema } from "~/types/formSchemas";
import * as React from "react";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Ban, Check } from "lucide-react";

const CreateSubject: NextPageWithLayout = () => {
  const mutation = api.subject.addSubjectByUserId.useMutation({
    onSuccess: (data, variables) => {
      toast({
        title: "Sucessfully added subject!",
        description: (
          <>
            <div>
              <Check className="h-6 w-6" color="green" />
              <p>Subject: {variables.subjectName}</p>
            </div>
            {variables.subjectCode && (
              <p>Subject Code: {variables.subjectCode}</p>
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
                <p>Subject already exists!</p>
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
              <Balancer>{error.message}</Balancer>
            </div>
          </>
        ),
      });
    },
  });

  const onSubmit = (formData: z.infer<typeof SubjectFormSchema>) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight"> Subjects </h2>
        <p className="text-lg text-muted-foreground">
          <Balancer>Add your subjects here.</Balancer>
        </p>
      </div>
      <Separator className="my-5" />
      <SubjectForm
        submitHandler={onSubmit}
        disableSubmit={mutation.isLoading}
      />
    </>
  );
};

CreateSubject.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateSubject;

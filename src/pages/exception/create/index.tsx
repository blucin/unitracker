import { DashboardLayout } from "@/components/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { Balancer } from "react-wrap-balancer";
import { Separator } from "@/components/ui/separator";
import { ExceptionForm } from "@/components/ExceptionForm";
import { type ExceptionFormSchema } from "~/types/formSchemas";
import * as z from "zod";
import { api } from "~/utils/api";
import { toast } from "@/components/ui/use-toast";
import { Ban, Check } from "lucide-react";
import { format } from "date-fns";
import { requireAuth } from "~/utils/requireAuth";
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx:GetServerSidePropsContext) {
  return requireAuth(ctx, ({session})=> {
    return {
      props: {session},
    }
  });
}

const CreateException: NextPageWithLayout = () => {
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
  
  const onSubmit = (formData: z.infer<typeof ExceptionFormSchema>) => { 
    mutation.mutate(formData);
  };

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight"> Exceptions </h2>
        <p className="text-lg text-muted-foreground">
          <Balancer>
            Add your exceptions here. Exceptions are days which are to be
            ignored while calculating attendance
          </Balancer>
        </p>
      </div>
      <Separator className="my-5" />
      <ExceptionForm
        submitHandler={onSubmit}
        disableSubmit={mutation.isLoading}
      />
    </>
  );
};

CreateException.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateException;

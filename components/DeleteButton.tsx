import { buttonVariants } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description: string;
  className?: string;
  handleClick: () => void;
}

export function DeleteButton({ ...props }: DeleteButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={props.onClick}
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "ghost",
            }),
            props.className,
            "mt-2 w-9 border-red-600 bg-red-400 bg-opacity-20 px-0 hover:border-2 dark:bg-red-950"
          )}
        >
          <Trash2 className="h-4 w-4" color="red" />
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" type="submit" onClick={props.handleClick}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createTopic } from "@/actions/create-topic";
import { useActionState } from "react";

function TopicCreateFile() {
  const [formState, action] = useActionState(createTopic, { error: {} });
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>New Topic</Button>
        </DialogTrigger>
        <DialogContent>
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create a Topic </DialogTitle>
              <DialogDescription>
                write a new topic to discuss and share your thoughts with
                others.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              

              <div>
                <Label htmlFor="title" className="text-sm font-medium mb-0.5">
                  Name
                </Label>
                <Input id="title" name="title" />
              </div>
              {formState.error?.title && (
                <p className="text-red-500 text-sm p-1 rounded">
                  {formState.error.title[0]}
                </p>
              )}
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium mb-0.5"
                >
                  Description
                </Label>
                <Textarea id="description" name="description" />
              </div>
              {formState.error?.description && (
                <p className="text-red-500 text-sm p-1 rounded">
                  {formState.error.description[0]}
                </p>
              )}

              {formState.error?.formerror && (
                <div className="bg-red-500 text-white text-sm p-1 rounded">
                  {formState.error.formerror[0]}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-black  text-white">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TopicCreateFile;

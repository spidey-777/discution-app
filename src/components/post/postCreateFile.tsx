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
import { createPost } from "@/actions/create-post";
import { useActionState } from "react";

type CreatePostFormProps = {
  slug: string;
};

function PostCreateFile({ slug }: CreatePostFormProps) {
  const [formState, action] = useActionState(createPost.bind(null, slug), {
    errors: {},
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>New Post</Button>
        </DialogTrigger>
        <DialogContent>
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create a Post</DialogTitle>
              <DialogDescription>
                Write a post and share your thoughts with others.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium mb-0.5">
                  Title
                </Label>
                <Input id="title" name="title" />
              </div>
              {formState.errors?.title && (
                <p className="text-red-500 text-sm p-1 rounded">
                  {formState.errors.title[0]}
                </p>
              )}
              <div>
                <Label
                  htmlFor="content"
                  className="text-sm font-medium mb-0.5"
                >
                  Content
                </Label>
                <Textarea id="content" name="content" />
              </div>
              {formState.errors?.content && (
                <p className="text-red-500 text-sm p-1 rounded">
                  {formState.errors.content[0]}
                </p>
              )}
              {formState.errors?.formerror && (
                <div className="bg-red-500 text-white text-sm p-1 rounded">
                  {formState.errors.formerror[0]}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-black text-white">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostCreateFile;

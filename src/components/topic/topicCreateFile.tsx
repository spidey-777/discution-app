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

function TopicCreateFile() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
             <Button>New Post</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Topic </DialogTitle>
            <DialogDescription>
             write a new topic to discuss and share your thoughts with others. 
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
               <Label htmlFor="title" className="text-sm font-medium mb-0.5">
                Title
               </Label>
               <Input id="title" name="title" /> 
            </div>
            <div>
                <Label htmlFor="description" className="text-sm font-medium mb-0.5">
                    Description
                </Label>
                <Textarea id="description" name="description" />
            </div>
            </div> 
        <DialogFooter>
            <Button type="submit" form="create-topic-form" className="bg-black  text-white">
                Create
            </Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TopicCreateFile;

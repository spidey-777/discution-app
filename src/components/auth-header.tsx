"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogOut } from "lucide-react";
import { Separator } from "./ui/separator";
import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

function AuthHeader() {
  const { data: session,status } = useSession();
    if (status === "loading") {
    return <div className="text-sm text-gray-400">Loading...</div>;
  }
  if (session?.user) {
    return (
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={session.user.image || ""}  className="cursor-pointer"/>
            <AvatarFallback>
              {session.user.name?.charAt(0).toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="bg-gray-300 text-black w-64">
          <div>
            <h1 className="mx-2 font-semibold">{session.user.name}</h1>
            <h2 className="mx-2 text-sm text-gray-700">{session.user.email}</h2>
            <Separator className="my-2" />
            <form action={signOut}>
              <Button
                variant="outline"
                className="bg-red-500 text-white hover:bg-red-600 w-full"
              >
                Sign out
                <LogOut className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <form action={signIn}>
      <Button variant="outline">Sign in</Button>
    </form>
  );
}

export default AuthHeader;

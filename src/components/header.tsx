import React from "react";
import { Input } from "./ui/input";
import AuthHeader from "./auth-header";

async function HeaderPage() {
  return (
    <header>
      <div className="flex justify-between items-center p-4 bg-zinc-500 my-0.2 rounded-b-sm">
        <div className="flex gap-10 items-center text-amber-50">
          <div>
            <h1 className="font-bold text-xl">Home</h1>
          </div>
          <div>
            <h1 className="font-bold text-xl">Discuss</h1>
          </div>
          <div className="bg-white">
            <Input
              type="text"
              placeholder="Search"
              defaultValue="search"
              className="w-80"
            />
          </div>
        </div>
        <div>
         <AuthHeader/>
        </div>
      </div>
    </header>
  );
}

export default HeaderPage;

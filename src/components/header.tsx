import React from "react";
import AuthHeader from "./auth-header";
import Link from "next/link";
import SearchPost from "./search/searchPost";


async function HeaderPage() {
  return (
    <header>
      <div className="flex justify-between items-center p-4 bg-zinc-500 my-0.2 rounded-b-sm">
        <div className="flex gap-10 items-center text-amber-50">
          <div>
            <Link href='/'>
            <h1 className="font-bold text-xl">Home</h1>
            </Link>
          </div>
          <div>
            <SearchPost/>
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

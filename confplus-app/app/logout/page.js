"use client";

import { redirect } from "next/navigation";
import * as actions from "../staff/actions.js";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default async function LogoutPage({ params }) {
  const router = useRouter()
  useEffect(() => {
    actions.logout().then((result) => {
      if(result){
        // redirect("/");
        router.replace('/');
      }
    });
  }, []);

  return (
    <main className="flex flex-col gap-4 pt-60 items-center w-full h-full bg-gradient-120  from-pink-600  to-violet-800 to-90%">
      <h1 className="text-slate-100 font-bold text-3xl">Logging Out...</h1>
    </main>
  );
}

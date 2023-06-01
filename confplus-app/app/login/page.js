import { BiHomeAlt2 } from "react-icons/bi";
// import {IconName} from 'react-icons/vsc'
import Link from "next/link";
import { redirect } from "next/navigation";
import * as actions from "../staff/actions.js";

async function login(formData) {
  "use server";
  console.log(formData.get("email"));
  const res = await fetch(
    `http://localhost:3000/api/login?email=${formData.get("email")}&password=${formData.get(
      "password"
    )}`
  );
  if (res.ok) {
    const user = await res.json();
    console.log(user);
    actions.setUser(user);
    switch (user.role) {
      case "author":
        redirect("staff/author");
        break;
      case "reviewer":
        redirect("staff/reviewer");
        break;
      case "organizer":
        redirect("staff/organizer");
        break;
    }
  } else {
    window.alert("Incorrect Username or Password.");
  }
}

export default function LoginPage() {
  return (
    <main className="flex flex-col gap-4 pt-60 items-center w-full h-full bg-gradient-120  from-pink-600  to-violet-800 to-90%">
      {/* <main className="flex flex-col gap-4 justify-center items-center w-full h-full"> */}
      <div className="flex items-center justify-between w-[360px]">
        <img
          className="bg-white/40 rounded-full px-3 text-center"
          alt="logo-title"
          src="https://static.overlay-tech.com/assets/3f5c369f-42af-49c3-9909-76c00cf7a166.png"
        />

        <Link href="/">
          <BiHomeAlt2 className="text-white text-5xl bg-slate-50/10 rounded-xl p-1 w-full  hover:text-slate-100/60 transition ease-out delay-100 duration-300" />
        </Link>
      </div>
      <div className="gap-3 shadow-md bg-blue-300/10 p-5 border-gray-500/20 rounded-lg flex flex-col items-center">
        <h1 className="font-bold text-white text-2xl">Login</h1>
        <form className="flex flex-col gap-4 items-center" action={login}>
          <input
            className="bg-slate-300/20 w-80 py-2 px-4 rounded-full text-slate-100 placeholder:text-slate-100"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="bg-slate-300/20 w-80 py-2 px-4 text-slate-100 placeholder:text-slate-100 rounded-full"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <button
            className="w-40 py-1  text-slate-800 font-medium text-xl rounded-full bg-slate-100/80 hover:bg-slate-100/60 transition ease-out delay-100 duration-300 hover:cursor-pointer"
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}


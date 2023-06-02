import { redirect } from "next/navigation";
import * as actions from "../staff/actions.js";
import LoginCard from "./LoginCard.js";

export default async function LoginPage({ params }) {
  const user = await actions.getUser();
  if (user) {
    redirect("staff/" + user.role);
  }

  return (
    //{/* <main className="flex flex-col gap-4 justify-center items-center w-full h-full"> */}
    <main className="flex flex-col gap-4 pt-60 items-center w-full h-full bg-gradient-120  from-pink-600  to-violet-800 to-90%">
      <LoginCard />
    </main>
  );
}

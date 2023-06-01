import {getUser} from "./staff/actions.js";
import Link from "next/link";

export default async function Header({ params}) {
  const user = await getUser();
  return (
    <header className="flex flex-col items-center md:flex-row max-w-5xl md:justify-between md:p-6 w-full ">
      {/* <h1 className="text-center">ConfPlus</h1> */}
      <div className="flex gap-1 justify-center">
        <img
          alt="shape-for-logo"
          src="https://static.overlay-tech.com/assets/9a55634b-39b2-4337-8d0b-50a20ee617b1.svg"
        />
        <img
          alt="logo-title"
          src="https://static.overlay-tech.com/assets/3f5c369f-42af-49c3-9909-76c00cf7a166.png"
        />
      </div>
      <nav className="flex flex-col items-center md:justify-center">
        <ul className="flex flex-col md:flex-row md:gap-3 md:items-center   text-center w-fit">
          <li>
            <a className="hover:text-teal-700" href="/">
              Home
            </a>
          </li>
          <li className="transition ease-out delay-100  hover:scale-110 hover:bg-violet-600 duration-300 hover:cursor-pointer text-white rounded-xl py-1 px-2 border bg-violet-800 w-fit">
            <a href="/login">Staff</a>
          </li>
          {user && <Logout />}
        </ul>
      </nav>
    </header>
  );
}


function Logout() {
  return (
    <li className="transition ease-out delay-100  hover:scale-110 hover:bg-violet-600 duration-300 hover:cursor-pointer text-white rounded-xl py-1 px-2 border bg-violet-800 w-fit">
      <Link href="/logout">Logout</Link>
    </li>
  );
}
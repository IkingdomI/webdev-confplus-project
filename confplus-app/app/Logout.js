"use client"
import * as actions from "./staff/actions.js";

export default function Logout() {
    return (
      <li className="transition ease-out delay-100  hover:scale-110 hover:bg-violet-600 duration-300 hover:cursor-pointer text-white rounded-xl py-1 px-2 border bg-violet-800 w-fit">
        {/* <Link href="/logout">Logout</Link> */}
        <button onClick={async ()=>{console.log('hi')}}>Logout</button>
      </li>
    );
  }
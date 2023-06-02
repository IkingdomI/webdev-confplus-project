"use client";

import { useEffect, useState } from "react";
import { getUser } from "../actions.js";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { BiPlus, BiMinus } from "react-icons/bi";





export default function AuthorPage() {
  const [user, setUser] = useState(null);
  const [coauthors, setCoauthors] = useState([]);

  useEffect(() => {
    getUser().then((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  const [showSubmittedPapers, setShowSubmittedPapers] = useState(true);
  const [showNewPaper, setShowNewPaper] = useState(true);

  return (
    <main className="mt-4 h-full w-full flex flex-col items-center gap-4">
      <h1 className="mb-6 mt-4">
        Author: {user?.first_name} {user?.last_name}
      </h1>
      <div className="w-full flex flex-col gap-2 items-center px-6">
        <div className="flex gap-2 justify-between">
          <h3>Submitted Papers</h3>
          <button
            onClick={() => {
              setShowSubmittedPapers(!showSubmittedPapers);
            }}
            className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400"
          >
            {showSubmittedPapers ? <FiChevronsDown /> : <FiChevronsUp />}
          </button>
        </div>
        {showSubmittedPapers ? (
          <div className="border-2 rounded w-full">Content</div>
        ) : (
          <div className="border-t-2 w-full">&nbsp;</div>
        )}
      </div>
      <div className="w-full flex flex-col gap-2 items-center px-6">
        <div className="flex gap-2 justify-between">
          <h3>New Paper</h3>
          <button
            onClick={() => {
              setShowNewPaper(!showNewPaper);
            }}
            className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400"
          >
            {showNewPaper ? <FiChevronsDown /> : <FiChevronsUp />}
          </button>
        </div>
        {showNewPaper ? (
          <div className="border-2 rounded w-full">
            <NewPaperForm author={user} coauthors={coauthors} setCoauthors={setCoauthors}/>
          </div>
        ) : (
          <div className="border-t-2 w-full">&nbsp;</div>
        )}
      </div>
    </main>
  );
}

function NewPaperForm({ author, coauthors, setCoauthors }) {
  return (
    <form className="flex flex-col gap-2  px-6 py-4">
      <input type="text" name="title" placeholder="Title" required />
      <input type="text" name="abstract" placeholder="Abstract" required />
      <label className="mt-3 border-b-2 w-full pb-1" htmlFor="file">
        Upload Paper
      </label>
      <input type="file" name="file" accept=".pdf" required />

      <label htmlFor="author">Author</label>
      <input type="text" name="author" placeholder="First Name" disabled />
      <input type="text" name="author" placeholder="Last Name" disabled />
      <input type="text" name="author" placeholder="Email" disabled />

      <select>
        <option value="none">Affiliation</option>
      </select>

      <div className="flex border-b-2 items-center">
        <label className="mt-3  pb-1 w-full" htmlFor="authors">
          Coauthors
        </label>

        <div className="flex gap-1">
          <button className="border-2 rounded"
          onClick={(e)=>{
            e.preventDefault()
            setCoauthors([...coauthors, {id: coauthors.length+1}])
          }}>
            <BiPlus className="text-xl"/>
          </button>
          <button className="border-2 rounded"
          onClick={(e)=>{
            e.preventDefault()
            setCoauthors([...coauthors.slice(0, coauthors.length-1)])
          }}>
            <BiMinus className="text-xl"/>
          </button>
        </div>
      </div>

      {coauthors.map((coauthor,index) => {
        return (
          <div className="flex gap-2 flex-col" key={coauthor.id}>
            <label htmlFor="coauthor">Coauthor #{index+1}</label>
            <input
              type="text"
              name="coauthor"
              placeholder="First Name"
              disabled
            />
            <input
              type="text"
              name="coauthor"
              placeholder="Last Name"
              disabled
            />
            <input type="text" name="coauthor" placeholder="Email" disabled />
          </div>
        );
      }
      )}

      <button
        type="submit"
        className="self-center hover:bg-violet-800 hover:cursor-pointer text-white rounded-xl py-1 px-2  bg-violet-700 w-fit"
      >
        Submit
      </button>
    </form>
  );
}


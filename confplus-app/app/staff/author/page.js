"use client";

import { useEffect, useState } from "react";
import { getUser } from "../actions.js";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";

export default function AuthorPage() {
  const [user, setUser] = useState(null);

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
          <div className="border-2 rounded w-full">Content</div>
        ) : (
          <div className="border-t-2 w-full">&nbsp;</div>
        )}
      </div>
    </main>
  );
}

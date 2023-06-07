"use client";

import { useEffect, useState } from "react";
import { getUser } from "../actions.js";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { BiPlus, BiMinus } from "react-icons/bi";

export default function ReviewerPage() {
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [selectPaper, setSelectPaper] = useState(0);

  useEffect(() => {
    getUser().then((user) => {
      // console.log(user);
      setUser(user);
    });

    fetch("/api/papers", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
        console.log(data);
      });
  }, []);

  const [showReviewedPapers, setShowReviewedPapers] = useState(true);
  const [showNotReviewedPapers, setShowNotReviewedPapers] = useState(true);

  window.addEventListener("resize", () => {
    // console.log("scream");
    if (document.documentElement.clientWidth > 768) {
      setShowReviewedPapers(true);
      setShowNotReviewedPapers(true);
    }
  });

  return (
    <main className="mt-4 h-full w-full flex flex-col items-center gap-4">
      <h1 className="mb-6 mt-4">
        Reviewer: {user?.first_name} {user?.last_name}
      </h1>
      <div className="px-6 w-full flex flex-col gap-4 max-w-sm md:flex-row md:gap-10 md:max-w-none md:justify-center">
        <div className="w-full flex flex-col gap-2 items-center md:max-w-sm">
          <div className="flex gap-2 justify-between">
            <h3>Reviewed Papers</h3>
            <button
              onClick={() => {
                setShowReviewedPapers(!showReviewedPapers);
              }}
              className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400 md:hidden"
            >
              {showReviewedPapers ? <FiChevronsDown /> : <FiChevronsUp />}
            </button>
          </div>
          {showReviewedPapers ? (
            <div className="border-2 rounded w-full text-center text-gray-400 italic">
              No papers Reviewed
            </div>
          ) : (
            <div className="border-t-2 w-full">&nbsp;</div>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 items-center md:max-w-sm">
          <div className="flex gap-2 justify-between">
            <h3>Waiting For Review</h3>
            <button
              onClick={() => {
                setShowNotReviewedPapers(!showNotReviewedPapers);
              }}
              className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400 md:hidden"
            >
              {showNotReviewedPapers ? <FiChevronsDown /> : <FiChevronsUp />}
            </button>
          </div>
          {showNotReviewedPapers ? (
            <div className="border-2 rounded w-full text-center text-gray-400 italic p-2 gap-2 flex flex-col items-center">
              {papers.length === 0 ? (
                <>No Papers Waiting For Review</>
              ) : (
                papers.map((paper) => {
                  return (
                    <PaperCard
                      key={paper.id}
                      paper={paper}
                      selectPaper={selectPaper}
                      setSelectPaper={setSelectPaper}
                    />
                  );
                })
              )}
            </div>
          ) : (
            <div className="border-t-2 w-full">&nbsp;</div>
          )}
        </div>
      </div>
    </main>
  );
}

function PaperCard({ paper, selectPaper, setSelectPaper }) {
  return (
    <div className="not-italic text-slate-950 border-2 w-full rounded-md p-1">
      <h4>{paper.title}</h4>
      <h5>
        {paper.authors
          .map((author) => author.fname + " " + author.lname)
          .join(", ")}
      </h5>

      {selectPaper === paper.id ? (
        <div className="border-t-2 w-full">Details</div>
      ) : (
        <></>
      )}

      <button
        className="font-bold text-slate-800 bg-slate-300 rounded-md hover:bg-slate-400 hover:text-slate-50 px-1"
        onClick={() => {
          setSelectPaper(paper.id);
        }}
      >
        review
      </button>
    </div>

    // <div className="w-full flex flex-col gap-2 items-center md:max-w-sm">
    //   <div className="flex gap-2 justify-between">
    //     <h3>{paper.title}</h3>
    //     <button
    //       onClick={() => {
    //         setShowDetails(!showDetails);
    //       }}
    //       className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400 md:hidden"
    //     >
    //       {showDetails ? <BiMinus /> : <BiPlus />}
    //     </button>
    //   </div>
    //   {showDetails ? (
    //     <div className="border-2 rounded w-full text-center text-gray-400 italic">
    //       paper
    //     </div>
    //   ) : (
    //     <div className="border-t-2 w-full">&nbsp;</div>
    //   )}
    // </div>
  );
}

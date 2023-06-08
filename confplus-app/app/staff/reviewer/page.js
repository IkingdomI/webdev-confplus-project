"use client";

import { useEffect, useState } from "react";
import { downloadPaper, getUser, submitReview } from "../actions.js";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { BiPlus, BiMinus, BiDownload } from "react-icons/bi";
// import {downloadPaper} from "../actions.js";
import Link from "next/link";

export default function ReviewerPage() {
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [selectPaper, setSelectPaper] = useState(0);

  useEffect(() => {
    getUser().then((user) => {
      // console.log(user);
      setUser(user);
    });

    fetch("/api/papers", { cache: "no-store" })
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
    <div className="flex flex-col items-center not-italic text-slate-950 border-2 w-full rounded-md p-1">
      <h4>{paper.title}</h4>
      <h5>
        {paper.authors
          .map((author) => author.fname + " " + author.lname)
          .join(", ")}
      </h5>

      {/* <button className="flex items-center hover:underline gap-1"
      onClick={downloadPaper}>
        Download <BiDownload />
      </button> */}
      <Link
        className="flex items-center hover:underline gap-1"
        href={`/api/papers/${paper.id}/download`}
        // download={`${paper.title}.pdf`}
        target="_blank"
      >
        Download <BiDownload />
      </Link>

      {selectPaper === paper.id ? (
        <div className="border-t-2 w-full">
          <ReviewForm paper={paper} />
        </div>
      ) : (
        <></>
      )}

      {selectPaper === paper.id ? (
        <></>
      ) : (
        <button
          className="font-bold text-slate-800 bg-slate-300 rounded-md hover:bg-slate-400 hover:text-slate-50 px-1"
          onClick={() => {
            setSelectPaper(paper.id);
          }}
        >
          review
        </button>
      )}
    </div>
  );
}

function ReviewForm({ paper }) {
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <form className="flex flex-col gap-2 w-full mb-2 items-center mt-1" action={submitReview}>
      <div className="flex gap-2">
        <label htmlFor="abstract">Abstract</label>
        <button className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400 w-fit"
        onClick={(e)=>{
          e.preventDefault();
          setShowAbstract(!showAbstract);
        }}>
          {" "}
          {showAbstract ? <FiChevronsUp /> : <FiChevronsDown />}{" "}
        </button>
      </div>
      <div className="border w-full">
        {showAbstract ? (
          <p className="p-2">{paper.abstract}</p>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="evaluation">Overall Evaluation</label>
          <select name="evaluation" className="border-2 rounded-md p-1">
            <option value="2">Strong Accept</option>
            <option value="1">Accept</option>
            <option value="0">Borderline</option>
            <option value="-1">Reject</option>
            <option value="-2">Strong Reject</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contribution">Paper Contribution</label>
          <select name="contribution" className="border-2 rounded-md p-1">
            <option value="5">Major Contribution</option>
            <option value="4">Clear Contribution</option>
            <option value="3">Decent Contribution</option>
            <option value="2">Minor Contribution</option>
            <option value="1">No Contribution</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="strengths">Paper Strengths</label>
          <textarea
            name="strengths"
            className="border-2 rounded-md p-1"
            rows="5"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="weaknesses">Paper weaknesses</label>
          <textarea
            name="weaknesses"
            className="border-2 rounded-md p-1"
            rows="5"
          ></textarea>
        </div>
      </div>

      <input type="hidden" name="paperId" value={paper.id} />

      <button
        type="submit"
        className="bg-slate-300 rounded-md hover:bg-slate-400 hover:text-slate-50 px-1"
      >
        Submit
      </button>
    </form>
  );
}

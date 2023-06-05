"use client";

import { useEffect, useState } from "react";
import { getUser } from "../actions.js";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { BiPlus, BiMinus } from "react-icons/bi";

export default function AuthorPage() {
  const [user, setUser] = useState(null);
  const [coauthors, setCoauthors] = useState([]);
  const [affiliations, setAffiliations] = useState([]);

  useEffect(() => {
    getUser().then((user) => {
      console.log(user);
      setUser(user);
    });
    fetch("/api/institutions").then((res) => {
      res.json().then((data) => {
        setAffiliations(data);
      });
    });
  }, []);

  const [showSubmittedPapers, setShowSubmittedPapers] = useState(true);
  const [showNewPaper, setShowNewPaper] = useState(true);

  // reset the layout if someone messed with expanding/collapsing divs
  window.addEventListener("resize", () => {
    if (document.documentElement.clientWidth > 768) {
      setShowSubmittedPapers(true);
      setShowNewPaper(true);
    }
  });

  return (
    <main className="mt-4 h-full w-full flex flex-col items-center gap-4">
      <h1 className="mb-6 mt-4">
        Author: {user?.first_name} {user?.last_name}
      </h1>
      <div className="px-6 w-full flex flex-col gap-4 max-w-sm md:flex-row md:gap-10 md:max-w-none md:justify-center">
        <div className="w-full flex flex-col gap-2 items-center md:max-w-sm">
          <div className="flex gap-2 justify-between">
            <h3>Submitted Papers</h3>
            <button
              onClick={() => {
                setShowSubmittedPapers(!showSubmittedPapers);
              }}
              className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400 md:hidden"
            >
              {showSubmittedPapers ? <FiChevronsDown /> : <FiChevronsUp />}
            </button>
          </div>
          {showSubmittedPapers ? (
            <div className="border-2 rounded w-full text-center text-gray-400 italic">
              No papers submitted
            </div>
          ) : (
            <div className="border-t-2 w-full">&nbsp;</div>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 items-center md:max-w-sm xl:max-w-[600px]">
          <div className="flex gap-2 justify-between">
            <h3>New Paper</h3>
            <button
              onClick={() => {
                setShowNewPaper(!showNewPaper);
              }}
              className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400 md:hidden"
            >
              {showNewPaper ? <FiChevronsDown /> : <FiChevronsUp />}
            </button>
          </div>
          {showNewPaper ? (
            <div className="border-2 rounded w-full">
              <NewPaperForm
                author={user}
                coauthors={coauthors}
                setCoauthors={setCoauthors}
                affiliations={affiliations}
              />
            </div>
          ) : (
            <div className="border-t-2 w-full">&nbsp;</div>
          )}
        </div>
      </div>
    </main>
  );
}

function NewPaperForm({ author, coauthors, setCoauthors, affiliations }) {
  return (
    <form
      className="flex flex-col gap-2 px-6 py-4 xl:max-h-[450px] xl:flex-wrap"
      onSubmit={async (e) => {
        e.preventDefault();

        for (let i = 0; i < coauthors.length; i++) {
          const coauthor = coauthors[i];
          const fname = document.getElementById(
            `coauthor-fname-${coauthor.id}`
          ).value;
          const lname = document.getElementById(
            `coauthor-lname-${coauthor.id}`
          ).value;
          const email = document.getElementById(
            `coauthor-email-${coauthor.id}`
          ).value;
          const aff = document.getElementById(
            `coauthor-aff-${coauthor.id}`
          ).value;

          coauthor.first_name = fname;
          coauthor.last_name = lname;
          coauthor.email = email;
          coauthor.affiliation = aff;
        }

        // console.log(coauthors);

        const formData = new FormData(e.target);
        formData.append("authorId", author.id);
        formData.append("coauthors", JSON.stringify(coauthors));
        console.log(formData);
        
        const res = await fetch("/api/papers", {
          method: "POST",
          body: formData,
        });



        if (res.ok) {
          alert("Paper submitted successfully!");
          location.reload();
        }else{
          alert("Something went wrong. Please try again.")
        }

      }}
    >
      <div className="flex flex-col gap-2 xl:max-w-[276.7px] xl:order-1">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          id="title"
        />
        <input
          type="text"
          name="abstract"
          placeholder="Abstract"
          required
          id="abstract"
        />
        <label className="mt-3 border-b-2 w-full pb-1" htmlFor="file">
          Upload Paper
        </label>
        <input type="file" name="file" accept=".pdf" required id="file" />

        <label>Author</label>
        <input
          className="text-slate-600"
          type="text"
          placeholder="First Name"
          disabled
          value={author?.first_name}
          id="author-fname"
        />
        <input
          className="text-slate-600"
          type="text"
          placeholder="Last Name"
          disabled
          value={author?.last_name}
          id="author-lname"
        />
        <input
          className="text-slate-600"
          type="text"
          placeholder="Email"
          disabled
          value={author?.email}
          id="author-email"
        />

        <select id="author-aff" name="authorAffId">
          {/* <option value="none">Affiliation</option> */}
          {affiliations.map((aff) => (
            <option key={aff.id} value={aff.id}>
              {aff.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 xl:order-3 xl:max-w-[263.3px]">
        <div className="flex border-b-2 items-center xl:w-[263.3px]">
          <label className="mt-3 xl:mt-0 pb-1 w-full" htmlFor="authors">
            Coauthors
          </label>

          <div className="flex gap-1">
            <button
              className="border-2 rounded hover:bg-slate-200"
              onClick={(e) => {
                e.preventDefault();

                setCoauthors([...coauthors, { id: coauthors.length + 1 }]);
              }}
            >
              <BiPlus className="text-xl" />
            </button>
            <button
              className="border-2 rounded hover:bg-slate-200"
              onClick={(e) => {
                e.preventDefault();
                setCoauthors([...coauthors.slice(0, coauthors.length - 1)]);
              }}
            >
              <BiMinus className="text-xl" />
            </button>
          </div>
        </div>
        <div className="xl:overflow-auto xl:max-h-[265px] xl:pr-2">
          {coauthors.map((coauthor) => {
            return (
              <div className="mb-2 flex gap-2 flex-col" key={coauthor.id}>
                <label htmlFor="coauthor">Coauthor #{coauthor.id}</label>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  id={`coauthor-fname-${coauthor.id}`}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  id={`coauthor-lname-${coauthor.id}`}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  id={`coauthor-email-${coauthor.id}`}
                />
                <select id={`coauthor-aff-${coauthor.id}`}>
                  {/* <option value="none">Affiliation</option> */}
                  {affiliations.map((aff) => (
                    <option key={aff.id} value={aff.id}>
                      {aff.name}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
        <div>
          <label>Presenter</label>
          <select id="presenter" name="presenter">
            <option value={0}>author</option>
            {coauthors.map((coauthor) => (
              <option key={coauthor.id} value={coauthor.id}>
                {`coauthor #${coauthor.id}`}
              </option>
            ))}

          </select>
        </div>
      </div>
      <button
        type="submit"
        className="self-center xl:self-start xl:ml-[104px] xl:order-2 hover:bg-violet-800 hover:cursor-pointer text-white rounded-xl py-1 px-2  bg-violet-700 w-fit"
      >
        Submit
      </button>
    </form>
  );
}

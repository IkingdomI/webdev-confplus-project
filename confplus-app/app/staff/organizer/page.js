"use client";

import { useEffect, useState } from "react";
import { getUser } from "../actions.js";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { BiPlus, BiMinus } from "react-icons/bi";

export default function OrganizerPage() {
  const [user, setUser] = useState(null);
  const [coauthors, setCoauthors] = useState([]);

  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getUser().then((user) => {
      console.log(user);
      setUser(user);
    });
    fetch("/api/conference-dates")
      .then((response) => response.json())
      .then((data) => {
        setDates(data);
      });
    fetch("/api/times")
      .then((response) => response.json())
      .then((data) => {
        setTimes(data);
      });
    fetch("/api/locations")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      });
  }, []);

  const [showPublishedSessions, setShowPublishedSessions] = useState(true);
  const [showAcceptedPapers, setShowAcceptedPapers] = useState(true);
  const [showNewSession, setShowNewSession] = useState(true);

  window.addEventListener("resize", () => {
    if (document.documentElement.clientWidth > 768) {
      setShowPublishedSessions(true);
      setShowAcceptedPapers(true);
      setShowNewSession(true);
    }
  });

  return (
    <main className="mt-4 h-full w-full flex flex-col items-center gap-4">
      <h1 className="mb-6 mt-4">
        Organizer: {user?.first_name} {user?.last_name}
      </h1>
      <div className="px-6 w-full flex flex-col gap-4 max-w-sm md:flex-row md:gap-10 md:max-w-none md:justify-center">
        <div className="w-full flex flex-col gap-2 items-center md:max-w-sm">
          <div className="flex gap-2 justify-between">
            <h3>Published Sessions</h3>
            <button
              onClick={() => {
                setShowPublishedSessions(!showPublishedSessions);
              }}
              className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400 md:hidden"
            >
              {showPublishedSessions ? <FiChevronsDown /> : <FiChevronsUp />}
            </button>
          </div>
          {showPublishedSessions ? (
            <div className="border-2 rounded w-full text-center text-gray-400 italic">
              <PublishedSessions />
            </div>
          ) : (
            <div className="border-t-2 w-full">&nbsp;</div>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 items-center md:max-w-sm">
          <div className="flex gap-2 justify-between">
            <h3 className="">Accepted Papers</h3>
            <button
              onClick={() => {
                setShowAcceptedPapers(!showAcceptedPapers);
              }}
              className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400 md:hidden"
            >
              {showAcceptedPapers ? <FiChevronsDown /> : <FiChevronsUp />}
            </button>
          </div>
          {showAcceptedPapers ? (
            <div className="border-2 rounded w-full text-center text-gray-400 italic">
              <AcceptedPapers />
            </div>
          ) : (
            <div className="border-t-2 w-full">&nbsp;</div>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 items-center md:max-w-sm">
          <div className="flex gap-2 justify-between">
            <h3>New Session</h3>
            <button
              onClick={() => {
                setShowNewSession(!showNewSession);
              }}
              className="text-2xl bg-slate-300 rounded-lg hover:bg-slate-400 md:hidden"
            >
              {showNewSession ? <FiChevronsDown /> : <FiChevronsUp />}
            </button>
          </div>
          {showNewSession ? (
            <div className="border-2 rounded w-full text-center text-gray-400 italic">
              <NewSessionForm
                dates={dates}
                times={times}
                locations={locations}
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

function PublishedSessions({ sessions }) {
  return <>No Session Published</>;
}

function AcceptedPapers() {
  return <>No Accepted Papers Submitted</>;
}

function NewSessionForm({ dates, times, locations }) {
  return (
    <form className="flex flex-col gap-2 px-6 py-4 text-slate-950 not-italic">
      <div className="w-full border rounded">Test</div>

      <div className="flex flex-col gap-2 items-start">
        <input type="text" name="title" placeholder="Title" required />
        <label htmlFor="date">Date</label>
        <select name="date">
          {dates.map((date) => (
            <option value={date.id}>{date.date}</option>
          ))}
        </select>
        <label htmlFor="time">Time</label>
        <select name="time">
          {times.map((time) => (
            <option value={time.id}>{time.time}</option>
          ))}
        </select>
        <label htmlFor="location">Location</label>
        <select name="location">
          {locations.map((location) => (
            <option value={location.id}>{location.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-2 self-center hover:bg-violet-800 hover:cursor-pointer text-white rounded-xl py-1 px-2  bg-violet-700 w-fit"
      >
        Submit
      </button>
    </form>
  );
}

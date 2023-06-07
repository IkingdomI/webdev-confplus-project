'use client'
import Image from "next/image";
import Header from "./Header.js";
import Footer from "./Footer";
import { useState, useEffect } from "react";

export default function Home() {

  const [dates, setDates] = useState([])

  useEffect(() => {
    fetch('/api/conference-dates')
      .then(res => res.json())
      .then(data => {setDates(data)})
      
    // console.log(dates);
  }, [])

  return (
    <>
      <Header />
      <main className="flex flex-col items-center mb-auto">
        <div className="p-10 hidden md:flex items-center bg-gradient-to-r from-pink-500 from-10% to-violet-800 to-90% rounded-[20px] lg:rounded-br-[200px] ">
          <div className="text-white w-96">
            <h1 className="font-semibold text-5xl text-center lg:text-start">
              Welcome to ConfPlus 2023
            </h1>
            <p className="text-center lg:text-start">
              Enlightening ideas for a better tomorrow
            </p>
          </div>
          <Image
            className="hidden lg:block"
            src="/../public/images/banner/banner-logo.png"
            width={300}
            height={200}
            alt=""
          />
        </div>

        <div className="mt-4 w-full">
          <div className="flex gap-2 items-center w-full mb-3">
            <h1>Here is our schedule</h1>
            <select className="w-fit">
              {dates.map((date) => (
                <option key={date.id} value={date.id}>
                  {date.date}
                </option>
              ))}
            </select>
          </div>
          <div className="border w-full text-center">
            No schedule for this date
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

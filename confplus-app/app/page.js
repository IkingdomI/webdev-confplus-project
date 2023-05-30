import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      
      <div className="p-10 hidden md:flex items-center bg-gradient-to-r from-pink-500 from-10% to-violet-800 to-90% rounded-[20px] lg:rounded-br-[200px] ">
        <div className="text-white w-96">
          <h1 className="font-semibold text-5xl text-center lg:text-start">Welcome to ConfPlus 2023</h1>
          <p className="text-center lg:text-start">Enlightening ideas for a better tomorrow</p>
        </div>
          <Image className="hidden lg:block" src="/../public/images/banner/banner-logo.png"
          width={300}
          height={200}
          alt=""/>
      </div>

      <div>
        <div className="flex">
          <h1>Here is our schedule</h1>
          <select></select>
        </div>
      </div>
    </main>
  );
}

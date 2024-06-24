"use client";
import Particles from "@/components/shared/particles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [auth, setauth] = useState(false);
  const router = useRouter();
  // handling button click
  const handleBtnClick = () => {
    if (auth) {
      return router.push(`/dashboard`);
    }
    return router.push("/sign-in");
  };

  return (
    <>
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={50}
      />
      <div className="flex bg-dark-surface flex-col   min-h-[calc(100vh-20px)] my-[10px] rounded-md items-center justify-center">
        {/* logo  */}
        <div className="">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={250}
            width={250}
            className="aspect-auto"
          />
        </div>

        {/* heading  */}

        <span className="lg:text-5xl md:text-4xl text-2xl  mt-4   bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
          Welcome to VideoQuality
        </span>

        {/* subheading  */}
        <span className="text-white/40 max-w-[70%] lg:max-w-full my-1 lg:text-lg text-sm text-center">
          A place where everything is under your control.
        </span>

        {/* CTA  */}

        <div className="flex flex-row my-4  gap-4 items-center ">
          <button
            onClick={handleBtnClick}
            className="bg-white px-5 py-2 rounded-md text-black"
          >
            Dashboard
          </button>
          <button className="text-white hover:border-b-2">See Demo</button>
        </div>
      </div>
    </>
  );
}

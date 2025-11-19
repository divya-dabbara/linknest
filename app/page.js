"use client";
import Image from "next/image";
import { useState } from "react";

import { useRouter } from "next/navigation";


export default function Home() {
  const [text, setText] = useState("");
  const router = useRouter();
  
  const createTree = () => {
    router.push(`/generate?handle=${text}`);
 
  };
  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex flex-col justify-center ml-[10vw] gap-4">
          <p className="text-yellow-300 font-extrabold text-6xl mt-72">Everything you</p>
          <p className="text-yellow-300 font-extrabold text-6xl">are. In one,</p>
          <p className="text-yellow-300 font-extrabold text-6xl">simple link in bio.</p>
          <p className="text-white text-xl my-4">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-5">
            <input value={text} onChange={(e) => setText(e.target.value)} className="bg-white text-gray-950 font-semibold px-2 py-2 focus:outline-green-800 " type="text" placeholder="Enter your Handle"/>
            <button onClick={()=>createTree()} className="bg-lavender">Claim your Bittree</button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-baseline-last mr-[10vw] mt-52">
          <img src="/home.png" alt="homepage image" />
        </div>
      </section>
      <section className="bg-[#cf1010] min-h-[100vh]">

      </section>
    </main>
  );
}

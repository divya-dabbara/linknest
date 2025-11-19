"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const Generate = () => {

  const searchParams = useSearchParams();
  // const [link, setLink] = useState("");
  const [handle, setHandle] = useState(searchParams.get("handle"));
  const [links, setLinks] = useState([{linktext: "", link: ""}]);
  // const [linktext, setLinktext] = useState("");
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item,i) => {
        if(i === index) {
          return {link, linktext}
        }
        else{
          return item;
        }
      });
    });
  }

  const addLink = () => {
    setLinks(links.concat([{linktext: "", link: ""}]));
  }

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links,
      "pic": pic,
      "handle": handle,
      "desc": desc,
    });

    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const r = await fetch("http://localhost:3000/api/add", requestOptions);
    const result = await r.json();
    if(result.success) {
    toast.success(result.message)
      setLinks([]);
      setHandle("");
      setPic("");
    }else {
      toast.error(result.message);
    }

  };

  return (
    <div className="bg-orange-200 min-h-screen grid grid-cols-2">
      {/* <ToastContainer /> */}
      <div className="col1 flex flex-col justify-center items-center text-gray-900">
        <div className="flex flex-col gap-5 mt-20">
          <h1 className="font-bold text-4xl">Create your Bittree</h1>
          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 1: Claim your Handle{" "}
            </h2>
            <div className="mx-4">
              <input
                value={handle  || ""}
                onChange={(e) => {
                  setHandle(e.target.value);
                }}
                className=" bg-gray-100 px-4 py-2 my-2 focus:outline-black rounded-full"
                type="text"
                placeholder="Choose a handle"
              />
            </div>
          </div>

          <div className="item">
            <h2 className="font-semibold text-2xl">Step 2: Add your Links</h2>
            {links && links.map((item, index)=>{
              return <div key={index} className="mx-4">
              <input value={item.linktext || ""} onChange={e=>{handleChange(index, item.link, e.target.value)}} className='px-4 py-2 mx-2 my-2 bg-white rounded-full' type="text" placeholder='Enter link text' />
              <input value={item.link || ""} onChange={e=>{handleChange(index, e.target.value, item.linktext)}} className='px-4 py-2 mx-2 my-2 bg-white rounded-full'
                type="text" placeholder='Enter link' />
            </div>
            }) }
              <button onClick={() => addLink()} className="p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-3xl">
               + Add Link
              </button>
          </div>

          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 3: Add a Picture and Description
            </h2>
            <div className="mx-4 flex flex-col">
              <input
              value={pic || ""}
                onChange={(e) => {
                  setPic(e.target.value);
                }}
                className=" bg-gray-100 px-4 py-2 mx-2 my-2 focus:outline-black rounded-full"
                type="text"
                placeholder="Enter link to your picture"
              />
              <input
              value={desc || ""}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                className=" bg-gray-100 px-4 py-2 mx-2 my-2 focus:outline-black rounded-full"
                type="text"
                placeholder="Enter description"
              />
              <button disabled={pic == ""|| handle == "" || links[0].linktext == ""} onClick={() => {submitLinks()}} className="disabled:bg-slate-400 w-fit p-5 py-2 mx-2 my-3 bg-slate-900 text-white font-bold rounded-3xl">
                Create your BitTree
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col2 w-full h-screen bg-white">
        <img
          className="h-full w-full object-cover"
          src="/generate.webp"
          alt="Generate your links"
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Generate;

import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { handle } = await params;
  const client = await clientPromise
  const db = client.db('bittree')
  const collection = db.collection('links')

   const item = await collection.findOne({handle: handle});
   if(!item) {
     return notFound();
   }
   console.log(item);

 const item2 = {
  "_id": {
    "$oid": "685504524d5c2f0a4073061f"
  },
  "links": [
    {
      "link": "https://www.codewithharry.com/",
      "linktext": "Website"
    },
    {
      "link": "https://www.youtube.com/@CodeWithHarry",
      "linktext": "YouTube"
    },
    {
      "link": "https://github.com/CodeWithHarry",
      "linktext": "GitHub"
    },
    {
      "link": "https://t.me/s/code_with_harry",
      "linktext": "Telegram"
    },
    {
      "link": "https://t.me/s/code_with_harry",
      "linktext": "X"
    }
  ],
  "pic": "https://avatars.githubusercontent.com/u/48705673?v=4",
  "handle": "codewithharry"
}
  return (
    <div className="bg-cyan-900  min-h-screen flex justify-center items-start py-10">   
     {item &&<div className="photo flex flex-col justify-center items-center gap-4">
        <img src={item.pic} alt="Profile Picture" />
        <span className="font-bold text-xl">@{item.handle}</span>
        <span className="desc w-80 text-center">{item.desc}</span>
        <div className="links">
            {item.links.map((item,index) => {
                return <Link href={item.link} key={index}>
                    <div className="bg-cyan-50 text-cyan-700 flex justify-center py-4 px-2 shadow-lg rounded-md my-3 min-w-96">
                      {item.linktext}
                    </div>
                    </Link>  
            })}
        </div>
      </div>}
    </div>
  );
}

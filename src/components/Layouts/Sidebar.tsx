"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

const Sidebar = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const {logout} = useAuthStore();

  const links = [
    { name: "Add Post", url: "/?tab=addpost", tab: "addpost" },
    { name: "All Posts", url: "/?tab=allposts", tab: "allposts" },
  ];

  return (
    <div className="w-[12vw] h-screen border-r border-zinc-600 p-4 bg-zinc-800 flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        {links.map((link, index) => {
          const isActive = activeTab === link.tab;

          return (
            <Link
              key={index}
              href={link.url}
              className={`w-full text-zinc-200 md:px-[1vw] md:py-[.2vw] rounded-md transition-all duration-300 ease-in-out md:text-[1.1vw] text-[1.5vh]
                ${isActive ? "bg-zinc-700" : "hover:bg-zinc-700"}`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="w-full">
        <button onClick={logout} className="md:text-[1.1vw]text-red-400 hover:text-zinc-100 hover:bg-red-400 rounded-md transition-all duration-300 ease-in-out px-[1vw] py-[.2vw] bg-zinc-100 w-full cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

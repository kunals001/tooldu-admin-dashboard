"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Layouts/Sidebar";
import dynamic from "next/dynamic";

const AddPost = dynamic(() => import("@/components/ConvertImagePost/AddPost"), { ssr: false });
const AllPosts = dynamic(() => import("@/components/ConvertImagePost/AllPosts"), { ssr: false });

const Home = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <div className="md:flex hidden">
      <div className="">
        <Sidebar />
      </div>

      <div className="w-full h-screen overflow-y-scroll hide-scrollbar">
        {tab === "addpost" && <AddPost/>}
        {tab === "allposts" && <AllPosts/>}
      </div>
    </div>
  );
};

export default Home;

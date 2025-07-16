"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Layouts/Sidebar";
import AddPost from "@/components/ConvertImagePost/AddPost";
import AllPosts from "@/components/ConvertImagePost/AllPosts";

const Home = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <div className="md:flex hidden">
      <div className="">
        <Sidebar />
      </div>

      <div className="w-full p-6">
        {tab === "addpost" && <AddPost/>}
        {tab === "allposts" && <AllPosts/>}
      </div>
    </div>
  );
};

export default Home;

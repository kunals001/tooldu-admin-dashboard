"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Layouts/Sidebar";

const Home = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <div className="md:flex hidden">
      <div className="">
        <Sidebar />
      </div>

      <div className="w-full p-6">
        {tab === "addpost" && <div>Add Post</div>}
        {tab === "allposts" && <div>All Posts</div>}
      </div>
    </div>
  );
};

export default Home;

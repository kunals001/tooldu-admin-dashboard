"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useConvertImagePost } from "@/stores/useConvertPost";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import('../Layouts/TipTapEditor'), { ssr: false });

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [bottomPart, setBottomPart] = useState("");

  const [mainPartHeadOne, setMainPartHeadOne] = useState({ title: "", description: "" });
  const [mainPartHeadTwo, setMainPartHeadTwo] = useState({ title: "", description: "" });

  const { addpost, loading } = useConvertImagePost();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      keyword,
      bottomPart,
      mainPartHeadOne,
      mainPartHeadTwo,
    };

    await addpost(postData);
    toast.success("Post created successfully");

    // Reset all
    setTitle("");
    setDescription("");
    setKeyword("");
    setBottomPart("");
    setMainPartHeadOne({ title: "", description: "" });
    setMainPartHeadTwo({ title: "", description: "" });
  };

  const className =
    "md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-zinc-800 text-zinc-200";

  return (
    <div className="flex flex-col items-center py-[2vw]">
      <div className="flex flex-col">
        <h1 className="md:text-[2vw] capitalize text-center font-prime font-[600] text-zinc-200 pb-[2vw]">
          Create Converter Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col md:w-[40vw] gap-4">
          <input
            type="text"
            placeholder="Title goes here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={className}
          />

          <textarea
            placeholder="Write a description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-zinc-800 min-h-[10vh] resize-none text-zinc-200"
          />

          <input
            type="text"
            placeholder="Enter Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={className}
          />

          <h2 className="text-zinc-300 md:text-[1vw] font-semibold">Main Part Head One</h2>
          <input
            type="text"
            placeholder="Sub-title"
            value={mainPartHeadOne.title}
            onChange={(e) => setMainPartHeadOne({ ...mainPartHeadOne, title: e.target.value })}
            className={className}
          />
          <textarea
            placeholder="Description"
            value={mainPartHeadOne.description}
            onChange={(e) => setMainPartHeadOne({ ...mainPartHeadOne, description: e.target.value })}
            className="md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-zinc-800 min-h-[10vh] resize-none text-zinc-200"
          />

          <h2 className="text-zinc-300 md:text-[1vw] font-semibold">Main Part Head Two</h2>
          <input
            type="text"
            placeholder="Sub-title"
            value={mainPartHeadTwo.title}
            onChange={(e) => setMainPartHeadTwo({ ...mainPartHeadTwo, title: e.target.value })}
            className={className}
          />
          <textarea
            placeholder="Description"
            value={mainPartHeadTwo.description}
            onChange={(e) => setMainPartHeadTwo({ ...mainPartHeadTwo, description: e.target.value })}
            className="md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-zinc-800 min-h-[10vh] resize-none text-zinc-200"
          />

          <TiptapEditor content={bottomPart} onChange={setBottomPart} />

          <button
            type="submit"
            disabled={loading}
            className="w-full md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-zinc-200 font-[700] text-center cursor-pointer"
          >
            {loading ? <Loader className="text-zinc-200 mx-auto animate-spin" /> : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useConvertImagePost } from "@/stores/useConvertPost";
import dynamic from "next/dynamic";
import Link from "next/link";

const TiptapEditor = dynamic(
  () => import("@/components/Layouts/TipTapEditor"),
  { ssr: false }
);

type HeadingPart = {
  title: string;
  description: string;
};

const UpdateConvertPost = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { fetchSinglePost, singlePost, updatepost, loading } =
    useConvertImagePost();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [bottomPart, setBottomPart] = useState("");
  const [mainPartHeadOne, setMainPartHeadOne] = useState<HeadingPart>({
    title: "",
    description: "",
  });

  const [mainPartHeadTwo, setMainPartHeadTwo] = useState<HeadingPart>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (id) fetchSinglePost(id);
  }, [id, fetchSinglePost]);

  useEffect(() => {
    if (singlePost) {
      setTitle(singlePost.title || "");
      setDescription(singlePost.description || "");
      setKeyword(singlePost.keyword || "");
      setBottomPart(singlePost.bottomPart || "");

      
      const headOne = Array.isArray(singlePost.mainPartHeadOne)
        ? singlePost.mainPartHeadOne[0]
        : singlePost.mainPartHeadOne;

      const headTwo = Array.isArray(singlePost.mainPartHeadTwo)
        ? singlePost.mainPartHeadTwo[0]
        : singlePost.mainPartHeadTwo;

      setMainPartHeadOne({
        title: headOne?.title || "",
        description: headOne?.description || "",
      });

      setMainPartHeadTwo({
        title: headTwo?.title || "",
        description: headTwo?.description || "",
      });
    }
  }, [singlePost]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = {
      title,
      description,
      keyword,
      bottomPart,
      mainPartHeadOne,
      mainPartHeadTwo,
    };

    await updatepost(id, updatedData);
    toast.success("Post updated successfully");
    router.push("/?tab=allconvertposts");
  };

  const className =
    "md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-zinc-800 text-zinc-200 ";

  return (
    <div className="md:flex md:flex-col items-center py-[2vw] hidden">
      <div className="flex flex-col">
        <h1 className="md:text-[2vw] capitalize text-center font-prime font-[600] text-zinc-200 pb-[2vw]">
          Update Converter Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:w-[60vw] gap-4"
        >
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

          <h2 className="text-indigo-400 md:text-[1vw] font-semibold">
            Main Part Head One
          </h2>
          <input
            type="text"
            placeholder="Sub-title"
            value={mainPartHeadOne.title}
            onChange={(e) =>
              setMainPartHeadOne({ ...mainPartHeadOne, title: e.target.value })
            }
            className={className}
          />
          <textarea
            placeholder="Description"
            value={mainPartHeadOne.description}
            onChange={(e) =>
              setMainPartHeadOne({
                ...mainPartHeadOne,
                description: e.target.value,
              })
            }
            className="md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-zinc-800 min-h-[10vh] resize-none text-zinc-200"
          />

          <h2 className="text-indigo-400 md:text-[1vw] font-semibold">
            Main Part Head Two
          </h2>
          <input
            type="text"
            placeholder="Sub-title"
            value={mainPartHeadTwo.title}
            onChange={(e) =>
              setMainPartHeadTwo({ ...mainPartHeadTwo, title: e.target.value })
            }
            className={className}
          />
          <textarea
            placeholder="Description"
            value={mainPartHeadTwo.description}
            onChange={(e) =>
              setMainPartHeadTwo({
                ...mainPartHeadTwo,
                description: e.target.value,
              })
            }
            className="md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-zinc-800 min-h-[10vh] resize-none text-zinc-200"
          />

          <h2 className="text-indigo-400 md:text-[1vw] font-semibold">
            Bottom Part
          </h2>

          <TiptapEditor key={bottomPart} content={bottomPart} onChange={setBottomPart} />

          <button
            type="submit"
            disabled={loading}
            className="w-full md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-zinc-200 font-[700] text-center cursor-pointer"
          >
            {loading ? (
              <Loader className="text-zinc-200 mx-auto animate-spin" />
            ) : (
              "Update Post"
            )}
          </button>
        </form>
      </div>

      <Link href="/?tab=allconvertposts" className="absolute top-2 left-2">
        <button className="md:px-[1vw] md:py-[.4vw] outline-none md:text-[1vw] rounded-lg bg-zinc-800 text-zinc-200">Go to All Convert Posts</button>
      </Link>
    </div>
  );
};

export default UpdateConvertPost;

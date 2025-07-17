"use client";

import React, { useEffect, useState } from "react";
import { useConvertImagePost } from "@/stores/useConvertPost";
import { useRouter } from "next/navigation";

const AllPosts = () => {
  const { fetchAllPosts, posts, deletepost, loading } = useConvertImagePost();
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const handleDeleteConfirm = async () => {
    if (selectedPostId) {
      await deletepost(selectedPostId);
      await fetchAllPosts();
      setShowDeleteModal(false);
      setSelectedPostId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedPostId(id);
    setShowDeleteModal(true);
  };

  const handleUpdate = (id: string) => {
    router.push(`/update-convert-post/${id}`);
  };

  return (
    <div className="p-6 bg-zinc-900 min-h-screen text-white relative">
      <h2 className="text-3xl font-bold mb-6 text-white">
        📝 All Convert Image Posts
      </h2>

      {loading ? (
        <p className="text-gray-300">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">No posts found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-700">
          <table className="min-w-full text-sm bg-zinc-950 text-white">
            <thead className="bg-zinc-800 text-gray-200">
              <tr>
                <th className="px-4 py-3 border border-zinc-700">#</th>
                <th className="px-4 py-3 border border-zinc-700">Title</th>
                <th className="px-4 py-3 border border-zinc-700">Keyword</th>
                <th className="px-4 py-3 border border-zinc-700">
                  Description
                </th>
                <th className="px-4 py-3 border border-zinc-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr
                  key={post._id}
                  className="hover:bg-zinc-800 transition-all duration-200"
                >
                  <td className="px-4 py-2 border border-zinc-700 text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-zinc-700">
                    {post.title}
                  </td>
                  <td className="px-4 py-2 border border-zinc-700">
                    {post.keyword}
                  </td>
                  <td className="px-4 py-2 border border-zinc-700 text-gray-300">
                    {post.description.length > 50
                      ? post.description.slice(0, 50) + "..."
                      : post.description}
                  </td>
                  <td className="px-4 py-2 border border-zinc-700">
                    <div className="flex gap-2 flex-wrap justify-center">
                      <button
                        onClick={() => handleUpdate(post._id!)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded transition-all"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(post._id!)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this post?
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-full text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;

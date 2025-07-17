import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export type ConvertImagePost = {
  _id?: string;
  title: string;
  description: string;
  keyword: string;
  mainPartHeadOne: {
    title: string;
    description: string;
  };
  mainPartHeadTwo: {
    title: string;
    description: string;
  };
  bottomPart: string;
};

interface ConvertPostState {
  loading: boolean;
  posts: ConvertImagePost[];
  singlePost: ConvertImagePost | null;
  fetchAllPosts: () => Promise<void>;
  fetchSinglePost: (id: string) => Promise<void>;
  addpost: (data: ConvertImagePost) => Promise<void>;
  deletepost: (id: string) => Promise<void>;
  updatepost: (id: string, data: ConvertImagePost) => Promise<void>;
}

export const useConvertImagePost = create<ConvertPostState>((set) => ({
  loading: false,
  posts: [],
  singlePost: null,

  // ✅ Fetch all posts
  fetchAllPosts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URI}/get-all-convert-image-posts`);
      set({ posts: res.data.posts });
    } catch (error) {
      console.error("Fetch all posts error:", error);
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Fetch single post
  fetchSinglePost: async (id: string) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URI}/get-convert-image-posts/${id}`);
      set({ singlePost: res.data.post });
    } catch (error) {
      console.error("Fetch single post error:", error);
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Add post
  addpost: async (data) => {
    set({ loading: true });
    try {
      await axios.post(`${API_URI}/create-convert-image-post`, data);
    } catch (error) {
      console.error("Add Post Error:", error);
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Delete post
  deletepost: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${API_URI}/delete-convert-image-post/${id}`);
    } catch (error) {
      console.error("Delete Post Error:", error);
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Update post
  updatepost: async (id, data) => {
    set({ loading: true });
    try {
      await axios.put(`${API_URI}/update-convert-image-post/${id}`, data);
    } catch (error) {
      console.error("Update Post Error:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

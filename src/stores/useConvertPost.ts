import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export type ConvertImagePost = {
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
  addpost: (data: ConvertImagePost) => Promise<void>;
  deletepost: (id: string) => Promise<void>;
  updatepost: (id: string, data: ConvertImagePost) => Promise<void>;
}

export const useConvertImagePost = create<ConvertPostState>((set) => ({
  loading: false,

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

  deletepost: async (id: string) => {
    set({ loading: true });
    try {
      await axios.delete(`${API_URI}/delete-convert-image-post/${id}`);
    } catch (error) {
      console.error("Delete Post Error:", error);
    } finally {
      set({ loading: false });
    }
  },

  updatepost: async (id: string, data) => {
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

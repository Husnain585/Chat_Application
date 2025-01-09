import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  AuthUser: null,
  isSigningup: false,
  isLoggingIn: false, // Fixed spelling mistake from `isLoggingIng`
  isUpdateProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ AuthUser: res.data, isCheckingAuth: false });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ AuthUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningup: true });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        data
      );
      set({ AuthUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.log("Error in Signup", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningup: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/check");
      set({ AuthUser: null });
      toast.success("Account created successfully");
    } catch (error) {
        console.error(error.response.data.message);
    }
  },
}));

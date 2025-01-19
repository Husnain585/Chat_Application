import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import {Loader} from "lucide-react"
import { Toaster } from "react-hot-toast";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import ErrorPage from "./pages/ErrorPage";


export default function App() {
  const {AuthUser, checkAuth, checkingAuth} = useAuthStore();
  useEffect((checkAuth) => {

  },[checkAuth]);
  console.log("is the AuthUser" ,AuthUser);
  if(checkingAuth && !AuthUser) return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  return (
      <>
        <div>
            <Navbar/>
            <Routes>
              <Route path="/" element={AuthUser ?  <HomePage /> : <Navigate to="/login" /> } />
              <Route path="/signup" element={!AuthUser ?  <SignupPage /> : <Navigate to="/" /> } />
              <Route path="/login" element={!AuthUser ?<LoginPage /> : <Navigate to="/" />} />
              <Route path="/settings" element={<SettingsPage /> } />
              <Route path="/Error Page" element={<ErrorPage /> } />
              <Route path="/profile" element={AuthUser ?  <ProfilePage /> : <Navigate to="/login" /> } />
            </Routes>
          <Toaster />
          </div> 
      </>
    );
}

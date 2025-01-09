// import React, { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
// import AuthImagePattern from "../components/AuthImagePattern";
// import toast from "react-hot-toast";

// function SignupPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [type, setType] = useState("password");
//   const [icon, setIcon] = useState(<Eye />);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });
  
//   const { signup, isSigningup } = useAuthStore(); // Fixed destructuring error
  
//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if(!formData.fullName.trim()) return toast.error("Full Name is required");
//     if(!formData.email.trim()) return toast.error("Email is required");
//     if(!emailRegex.test(formData.email)) return toast.error("Invalid Email Format");
//     if(!formData.password) return toast.error("Password is required");
//     if(formData.password.length < 6 ) return toast.error("password must have 6 character");
//     return true
// };

//   const handleToggle = () => {
//     if (type === "password") {
//       setType("text");
//       setIcon(<EyeOff />);
//     } else {
//       setType("password");
//       setIcon(<Eye />);
//     }};

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = validateForm();
//     if(success === true) signup(formData)
//   };

//   return (
//     <div className="grid min-h-screen lg:grid-cols-2">
//       {/* Left side */}
//       <div className="flex justify-center items-center flex-col p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex items-center flex-col gap-2 group">
//               <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                 <MessageSquare className="size-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Create Account</h1>
//               <p className="text-base-content/60">
//                 Get Started with Your Free Account
//               </p>
//             </div>
//           </div>
//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Full Name</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="text"
//                   className="input input-bordered pl-10 w-full"
//                   placeholder="Husnain..."
//                   value={formData.fullName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fullName: e.target.value })
//                   }
//                 />
//               </div>
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="text"
//                   className="input input-bordered pl-10 w-full"
//                   placeholder="Husnain@gmail.com"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                 />
//               </div>
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="size-5 text-base-content/40" />
//                 </div>
//                 <div
//                 className="absolute right-3 flex justify-center items-center translate-y-1/2 bg-transparent cursor-pointer text-black"
//                 onClick={handleToggle}
//               >
//                 {icon} 
//               </div>
//                 <input
//                   type={type}
//                   className="input input-bordered pl-10 w-full"
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//             <button type="submit" 
//               className="btn btn-primary w-full mt-2" disabled={isSigningup}>
//                   {isSigningup ? (
//                     <>
//                       <Loader2 className="size-5 animate-spin" />
//                       Loading...
//                     </>
//                   ) : (
//                     "Create Account"
//                   )}
//               </button>
//           </form>
//           <div className="text-center">
//             <p className="text-base-content/60 cursor-pointer">
//             Already have an Account? {" "}
//                   {/* <Link to="/login">sign </Link> */}
//             </p>
//           </div>
//         </div>
//       </div>
//       {/* Right side */}
//       <AuthImagePattern 
//           title="Join Our Community"
//           subtitle="Connect with friends, Share movement, And stay touch with yours loves one"

//       />
//     </div>
//   );
// }

// export default SignupPage;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  
  const { signup, isSigningup } = useAuthStore();
  
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!emailRegex.test(formData.email)) return toast.error("Invalid Email Format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must have at least 6 characters");
    return true;
  };

  const handleToggle = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left side */}
      <div className="flex justify-center items-center flex-col p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center flex-col gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get Started with Your Free Account</p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute inset-y-0 left-3 size-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered pl-10 w-full"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-3 size-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered pl-10 w-full"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-3 size-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered pl-10 w-full"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={handleToggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-2" disabled={isSigningup}>
              {isSigningup ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <AuthImagePattern 
        title="Join Our Community"
        subtitle="Connect with friends, share moments, and stay in touch with loved ones."
      />
    </div>
  );
}

export default SignupPage;

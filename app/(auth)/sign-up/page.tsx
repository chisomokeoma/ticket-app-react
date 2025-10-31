// "use client";
// import React, { useState } from "react";
// import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// export default function SignUpPage() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isLoading, setLoading] = useState(false);

//   const router = useRouter();

//   type FormErrors = {
//     fullName?: string;
//     email?: string;
//     password?: string;
//     confirmPassword?: string;
//     agreeToTerms?: string;
//   };

//   // validate the inputs
//   const validate = () => {
//     const newErrors: FormErrors = {};
//     if (!fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Invalid email address";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     if (confirmPassword !== password) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//     if (!agreeToTerms)
//       newErrors.agreeToTerms = "You must agree to terms and conditions";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     if (!validate()) return;
//     setLoading(true);
//     const newUser = {
//       fullName,
//       email,
//       password,
//       confirmPassword,
//       agreeToTerms,
//     };

//     localStorage.setItem("user", JSON.stringify(newUser));
//     setTimeout(() => {
//       router.push("/dashboard");
//       setLoading(false);
//     }, 1000);
//     toast.success("Account created successfully!");
//   };

//   return (
//     <section>
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
//           CREATE ACCOUNT
//         </h1>
//         <p className="text-sm text-gray-500 text-center">
//           Sign up with your Xomie's mail
//         </p>
//       </div>

//       <div>
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-800 mb-2">
//             Full Name <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <User
//               size={20}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               placeholder="John Doe"
//               className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
//             />
//           </div>
//           {errors.fullName && (
//             <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-800 mb-2">
//             Email <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <Mail
//               size={20}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="example@xomie-soft.com"
//               className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
//             />
//           </div>
//           {errors.email && (
//             <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-800 mb-2">
//             Password <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <Lock
//               size={20}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••"
//               className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-800 mb-2">
//             Confirm Password <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <Lock
//               size={20}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="••••••"
//               className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-gray-400 hover:text-gray-600"
//             >
//               {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-xs mt-1">
//               {errors.confirmPassword}
//             </p>
//           )}
//         </div>

//         <div className="mb-6">
//           <label className="flex items-start text-sm text-gray-600 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={agreeToTerms}
//               onChange={(e) => setAgreeToTerms(e.target.checked)}
//               className="mr-2 mt-1 cursor-pointer"
//             />
//             <span>
//               I agree to the{" "}
//               <a
//                 href="#"
//                 className="text-purple-600 font-semibold no-underline hover:text-purple-700"
//               >
//                 Terms and Conditions
//               </a>{" "}
//               and{" "}
//               <a
//                 href="#"
//                 className="text-purple-600 font-semibold no-underline hover:text-purple-700"
//               >
//                 Privacy Policy
//               </a>
//             </span>
//           </label>
//           {errors.agreeToTerms && (
//             <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className="w-full py-3.5 bg-indigo-900 text-white border-0 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-indigo-800"
//         >
//           Create Account
//         </button>

//         <p className="text-center mt-6 text-sm text-gray-600">
//           Already have an account?{" "}
//           <a
//             href="/sign-in"
//             className="text-purple-600 font-semibold no-underline hover:text-purple-700"
//           >
//             Login
//           </a>
//         </p>
//       </div>
//     </section>
//   );
// }

"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
};

type User = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
};

type SessionToken = {
  userId: number;
  email: string;
  fullName: string;
  token: string;
  createdAt: string;
};

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  // Validate the inputs
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    } else {
      // Check if email already exists
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const emailExists = users.some(
        (user: User) => user.email === email.toLowerCase().trim()
      );
      if (emailExists) {
        newErrors.email = "This email is already registered";
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      // Get existing users or initialize empty array
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

      // Create new user object
      const newUser: User = {
        id: Date.now(), // Simple unique ID
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        password: password, // In production, this should be hashed!
        createdAt: new Date().toISOString(),
      };

      // Add new user to array
      users.push(newUser);

      // Save updated users array
      localStorage.setItem("users", JSON.stringify(users));

      // Create session token (as per project requirements)
      const sessionToken: SessionToken = {
        userId: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };

      // Store session using the required key name
      localStorage.setItem("ticketapp_session", JSON.stringify(sessionToken));

      toast.success("Account created successfully!");

      setTimeout(() => {
        router.push("/dashboard");
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          CREATE ACCOUNT
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Sign up to get started
        </p>
      </div>

      <div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFullName(e.target.value)
              }
              placeholder="John Doe"
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="example@mail.com"
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="••••••"
              className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="••••••"
              className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="flex items-start text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAgreeToTerms(e.target.checked)
              }
              className="mr-2 mt-1 cursor-pointer"
            />
            <span>
              I agree to the{" "}
              <a
                href="#"
                className="text-purple-600 font-semibold no-underline hover:text-purple-700"
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-purple-600 font-semibold no-underline hover:text-purple-700"
              >
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>
          )}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3.5 bg-indigo-900 text-white border-0 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-purple-600 font-semibold no-underline hover:text-purple-700"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  );
}

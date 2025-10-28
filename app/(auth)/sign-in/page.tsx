"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const mockDetails = {
      email: "test@mail.com",
      password: "Internal123",
      token: "fake-login-data",
    };

    if (email === mockDetails.email && password === mockDetails.password) {
      localStorage.setItem("auth-user", mockDetails.token);
      setTimeout(() => {
        router.push("/dashboard");
        setLoading(false);
      }, 1000);
      toast.success("Successfully logged In");
    } else {
      toast.error("Wrong login details");
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          WELCOME BACK
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Login With Xomie's mail
        </p>
      </div>

      <div>
        <div className="mb-5">
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@xomie-soft.com"
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-5">
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
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 cursor-pointer"
            />
            Keep Me Logged In
          </label>
          <a
            href="#"
            className="text-sm text-red-500 no-underline font-medium hover:text-red-600"
          >
            Forgot Your Password?
          </a>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3.5 bg-indigo-900 text-white border-0 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-indigo-800"
        >
          {isLoading ? (
            <div className=" flex items-center justify-center">
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
              Logging in...
            </div>
          ) : (
            "Submit"
          )}
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-purple-600 font-semibold no-underline hover:text-purple-700"
          >
            Sign Up
          </a>
        </p>
      </div>
    </section>
  );
}

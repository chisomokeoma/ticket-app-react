import React from "react";
import { Ticket, Shield, Zap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.05); opacity: 0.15; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>

      <section
        className="relative pt-20 pb-32 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          className="absolute w-72 h-72 rounded-full -top-24 right-[10%] border-2 animate-float"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
        />

        <div
          className="absolute w-48 h-48 rounded-full bottom-24 left-[5%] border-2 animate-float-delayed"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            borderColor: "rgba(255, 255, 255, 0.3)",
          }}
        />

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h1
              className="text-5xl md:text-6xl font-extrabold mb-5"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
            >
              Xomie's Ticket Manager
            </h1>

            <p
              className="text-lg md:text-2xl mb-10 leading-relaxed"
              style={{ opacity: "0.95" }}
            >
              Streamline your workflow with our powerful ticket management
              solution. Track, manage, and resolve issues faster than ever
              before.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/sign-up">
                <button className="px-10 py-4 bg-white text-purple-600 border-0 rounded-xl text-lg font-semibold cursor-pointer shadow-lg transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-xl">
                  Get Started <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="/sign-in">
                <button className="px-10 py-4 bg-transparent text-white border-2 border-white rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>

        <svg
          className="absolute -bottom-0.5 left-0 w-full h-auto"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#F9FAFB"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-20 relative">
        <div
          className="absolute w-36 h-36 rounded-full top-12 right-[5%] z-0 animate-pulse-slow"
          style={{ background: "linear-gradient(135deg, #FCD34D, #F59E0B)" }}
        />

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Everything you need to manage tickets efficiently and effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          <div className="bg-white p-10 rounded-2xl shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
              }}
            >
              <Ticket size={30} color="white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Easy Ticket Management
            </h3>
            <p className="text-base text-gray-500 leading-relaxed">
              Create, update, and track tickets with an intuitive interface.
              Never lose track of important issues again.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
              }}
            >
              <Zap size={30} color="white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Lightning Fast
            </h3>
            <p className="text-base text-gray-500 leading-relaxed">
              Built for speed and efficiency. Handle thousands of tickets
              without breaking a sweat.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              }}
            >
              <Shield size={30} color="white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Secure & Reliable
            </h3>
            <p className="text-base text-gray-500 leading-relaxed">
              Your data is protected with industry standard security. Access
              control and authentication built-in.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
              }}
            >
              <Users size={30} color="white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Team Collaboration
            </h3>
            <p className="text-base text-gray-500 leading-relaxed">
              Work together seamlessly. Assign tickets, track progress, and keep
              everyone in the loop.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-20 bg-white">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Clear Status Tracking
          </h2>
          <p className="text-xl text-gray-500">
            Visual indicators make it easy to see ticket status at a glance
          </p>
        </div>

        <div className="flex justify-center gap-8 flex-wrap">
          <div className="bg-white p-8 rounded-2xl shadow-md min-w-[200px] text-center">
            <div className="w-20 h-20 rounded-full bg-green-500 mx-auto mb-4 flex items-center justify-center text-3xl text-white font-bold">
              ✓
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Open</h4>
            <p className="text-sm text-gray-500">
              New tickets ready for action
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md min-w-[200px] text-center">
            <div className="w-20 h-20 rounded-full bg-amber-500 mx-auto mb-4 flex items-center justify-center text-3xl text-white font-bold">
              ⟳
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              In Progress
            </h4>
            <p className="text-sm text-gray-500">Currently being worked on</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md min-w-[200px] text-center">
            <div className="w-20 h-20 rounded-full bg-gray-500 mx-auto mb-4 flex items-center justify-center text-3xl text-white font-bold">
              ✕
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Closed</h4>
            <p className="text-sm text-gray-500">Resolved and completed</p>
          </div>
        </div>
      </section>

      <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <Ticket size={24} color="white" />
                </div>
                <h3 className="text-xl font-bold">Xomie's Ticket Manager</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4 max-w-md">
                Streamline your workflow with our powerful ticket management
                solution. Track, manage, and resolve issues faster than ever
                before.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-purple-600 flex items-center justify-center transition-all duration-300"
                >
                  <span className="text-lg">𝕏</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-purple-600 flex items-center justify-center transition-all duration-300"
                >
                  <span className="text-lg">in</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-purple-600 flex items-center justify-center transition-all duration-300"
                >
                  <span className="text-lg">@</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Xomie's Ticket Manager. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import { BarChart3, Ticket, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <BarChart3 size={20} />,
  },
  {
    name: "Tickets",
    link: "/tickets",
    icon: <Ticket size={20} />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");

    setTimeout(() => {
      router.push("/sign-in");
    }, 1500);
    setToastMessage("Logged out successfully");
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex h-full">
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in">
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>

      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } bg-white shadow-xl transition-all duration-300 fixed left-0 top-0 h-full overflow-hidden z-40 `}
      >
        <div className="p-6 ">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">XM</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                XOMIE'S MANAGER
              </h2>
              <p className="text-xs text-gray-500">TICKET SOLUTIONS</p>
            </div>
          </div>

          <div className=" flex flex-col  flex-1 h-full">
            {navLinks.map(({ name, link, icon }, idx) => (
              <Link
                href={link}
                key={idx}
                className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg mb-2 font-medium"
              >
                {icon}
                <span className=" cursor-pointer">{name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main
        className={`flex-1 ${
          sidebarOpen ? "ml-72" : "ml-0"
        } transition-all duration-300`}
      >
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-semibold">
              XM
            </div>
          </div>
        </header>

        <div className="p-6 flex items-center">{children}</div>
      </main>
    </div>
  );
}

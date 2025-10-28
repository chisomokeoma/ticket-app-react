"use client";

import React, { useState, useEffect } from "react";
import {
  Ticket,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  Building2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  name?: string;
}

interface TicketData {
  id: number;
  title: string;
  status: "open" | "in_progress" | "closed";
  priority: "high" | "medium" | "low";
  company: string;
  startDate: string;
  createdAt: string;
  employee: string;
  daysLeft: number;
}

interface EmployeeStat {
  name: string;
  count: number;
  percentage: number;
}

interface ClientStat {
  name: string;
  count: number;
  icon: string;
  color: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      return;
    }

    const userData: User = JSON.parse(session);
    setUser(userData);

    loadTicketsFromStorage();
  }, []);

  const loadTicketsFromStorage = (): void => {
    const savedTickets = localStorage.getItem("ticketapp_tickets");

    if (savedTickets) {
      setTickets(JSON.parse(savedTickets) as TicketData[]);
    } else {
      const demoTickets: TicketData[] = [
        {
          id: 1,
          title: "Invalid Invoices",
          status: "open",
          priority: "high",
          company: "Othaim",
          startDate: "2023-11-20",
          createdAt: "2023-11-20",
          employee: "Ahmed Mohamed",
          daysLeft: 0,
        },
        {
          id: 2,
          title: "Implementation",
          status: "in_progress",
          priority: "medium",
          company: "Burger King",
          startDate: "2023-11-18",
          createdAt: "2023-11-18",
          employee: "Ahmed Mohamed",
          daysLeft: 0,
        },
        {
          id: 3,
          title: "Install Program",
          status: "closed",
          priority: "high",
          company: "McDonalds",
          startDate: "2023-11-21",
          createdAt: "2023-11-21",
          employee: "Omar Ali",
          daysLeft: 7,
        },
        {
          id: 4,
          title: "Invalid Invoices",
          status: "open",
          priority: "medium",
          company: "Othaim",
          startDate: "2023-11-19",
          createdAt: "2023-11-19",
          employee: "Ahmed Mohamed",
          daysLeft: 0,
        },
        {
          id: 5,
          title: "Implementation",
          status: "in_progress",
          priority: "medium",
          company: "Burger King",
          startDate: "2023-11-22",
          createdAt: "2023-11-22",
          employee: "Ahmed Mohamed",
          daysLeft: 0,
        },
        {
          id: 6,
          title: "Invalid Invoices",
          status: "open",
          priority: "high",
          company: "Othaim",
          startDate: "2023-11-23",
          createdAt: "2023-11-23",
          employee: "Ahmed Mohamed",
          daysLeft: 0,
        },
      ];

      setTickets(demoTickets);
      localStorage.setItem("ticketapp_tickets", JSON.stringify(demoTickets));
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      return;
    }

    const userData: User = JSON.parse(session);
    setUser(userData);

    loadTicketsFromStorage();

    const handleFocus = (): void => {
      loadTicketsFromStorage();
      console.log("Dashboard refreshed on focus");
    };

    window.addEventListener("focus", handleFocus);

    const interval = setInterval(() => {
      loadTicketsFromStorage();
    }, 5000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, []);

  const refreshTickets = (): void => {
    const savedTickets = localStorage.getItem("ticketapp_tickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets) as TicketData[]);
      setToastMessage("Tickets refreshed!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // Calculate statistics from tickets array
  const totalTickets: number = tickets.length;
  const openTickets: number = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets: number = tickets.filter(
    (t) => t.status === "in_progress"
  ).length;
  const closedTickets: number = tickets.filter(
    (t) => t.status === "closed"
  ).length;

  const getStatusBorderColor = (status: TicketData["status"]): string => {
    if (status === "open") return "border-green-500";
    if (status === "in_progress") return "border-orange-500";
    return "border-red-500";
  };

  const recentTickets: TicketData[] = tickets.slice(0, 4);

  // Calculate employee stats from tickets
  const employeeTicketCounts = tickets.reduce<Record<string, number>>(
    (acc, ticket) => {
      const employee = ticket.employee || "Unknown";
      acc[employee] = (acc[employee] || 0) + 1;
      return acc;
    },
    {}
  );

  const topEmployees: EmployeeStat[] = Object.entries(employeeTicketCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalTickets) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  // Calculate client stats from tickets
  const clientTicketCounts = tickets.reduce<Record<string, number>>(
    (acc, ticket) => {
      const company = ticket.company || "Unknown";
      acc[company] = (acc[company] || 0) + 1;
      return acc;
    },
    {}
  );

  const topClients: ClientStat[] = Object.entries(clientTicketCounts)
    .map(([name, count]) => ({
      name,
      count,
      icon: name === "McDonalds" || name === "Burger King" ? "🍔" : "🏢",
      color: "bg-orange-100",
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
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

      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back{user ? `, ${user.email.split("@")[0]}` : ""}! 👋
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your tickets today
            </p>
          </div>
          <button
            onClick={refreshTickets}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh Data
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Ticket className="text-purple-600" size={24} />
              <h2 className="text-lg font-bold text-gray-800">Last Tickets</h2>
            </div>

            <div className="space-y-4">
              {recentTickets.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No tickets yet</p>
              ) : (
                recentTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`border-l-4 pl-4 py-2 ${getStatusBorderColor(
                      ticket.status
                    )}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-semibold">
                            {ticket.employee
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "AM"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {ticket.employee || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {ticket.title} in {ticket.company} Company
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <span>📅 {ticket.startDate || ticket.createdAt}</span>
                      <span
                        className={`px-2 py-1 rounded-full ${
                          ticket.status === "open"
                            ? "bg-green-100 text-green-700"
                            : ticket.status === "in_progress"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {ticket.status === "in_progress"
                          ? "In Progress"
                          : ticket.status.charAt(0).toUpperCase() +
                            ticket.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => router.push("/tickets")}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Show All Tickets
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-purple-600" size={24} />
              <h2 className="text-lg font-bold text-gray-800">
                Most Employee Active
              </h2>
            </div>

            <div className="space-y-4">
              {topEmployees.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  No employee data
                </p>
              ) : (
                topEmployees.map((emp, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-sm font-semibold">
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        {emp.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        {emp.count}
                      </p>
                      <p className="text-sm text-green-500 font-semibold">
                        {emp.percentage}%
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer">
              Show All
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-purple-600" size={24} />
              <h2 className="text-lg font-bold text-gray-800">
                Most Client Active
              </h2>
            </div>

            <div className="space-y-4">
              {topClients.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No client data</p>
              ) : (
                topClients.map((client, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${client.color} rounded-lg flex items-center justify-center text-2xl`}
                      >
                        {client.icon}
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        {client.name}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      {client.count}
                    </p>
                  </div>
                ))
              )}
            </div>

            <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Show All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {totalTickets}
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Ticket className="text-white" size={24} />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp size={16} />
              <span>All time</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Open Tickets</p>
                <h3 className="text-3xl font-bold text-green-500">
                  {openTickets}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-white" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500">Needs attention</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <h3 className="text-3xl font-bold text-orange-500">
                  {inProgressTickets}
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500">Being worked on</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                <h3 className="text-3xl font-bold text-gray-600">
                  {closedTickets}
                </h3>
              </div>
              <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center">
                <XCircle className="text-white" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Departmental performance
          </h3>
          <div className="h-64 bg-linear-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Chart visualization area - Shows distribution of {totalTickets}{" "}
              tickets
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

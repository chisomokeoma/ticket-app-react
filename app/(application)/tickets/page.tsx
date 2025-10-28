"use client";
import { useState, useEffect } from "react";
import { Ticket, Plus, Edit2, Trash2, X, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface TicketData {
  id: number;
  title: string;
  description?: string;
  status: "open" | "in_progress" | "closed";
  priority: "high" | "medium" | "low";
  company?: string;
  employee?: string;
  startDate?: string;
  endDate?: string;
  daysLeft: number;
  createdAt: string;
  updatedAt?: string;
}

interface FormData {
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "high" | "medium" | "low";
  company: string;
  employee: string;
  startDate: string;
  endDate: string;
}

interface FormErrors {
  title?: string;
  status?: string;
  [key: string]: string | undefined;
}

type ModalMode = "create" | "edit";
type ToastType = "success" | "error";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [currentTicket, setCurrentTicket] = useState<TicketData | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [deleteTicketId, setDeleteTicketId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
    company: "",
    employee: "",
    startDate: "",
    endDate: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<ToastType>("success");

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      return;
    }

    loadTickets();
  }, []);

  const loadTickets = (): void => {
    const savedTickets = localStorage.getItem("ticketapp_tickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets) as TicketData[]);
    } else {
      const demoTickets: TicketData[] = [
        {
          id: 6,
          title: "Invalid Invoices",
          status: "open",
          priority: "high",
          company: "Othaim",
          startDate: "2023-11-23",
          daysLeft: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: 5,
          title: "Implementation",
          status: "in_progress",
          priority: "medium",
          company: "Burger King",
          startDate: "2023-11-22",
          daysLeft: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: 4,
          title: "Install Program",
          status: "closed",
          priority: "high",
          company: "McDonalds",
          startDate: "2023-11-21",
          daysLeft: 7,
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: "Invalid Invoices",
          status: "open",
          priority: "medium",
          company: "Othaim",
          startDate: "2023-11-20",
          daysLeft: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Install Program",
          status: "open",
          priority: "low",
          company: "McDonalds",
          startDate: "2023-11-19",
          daysLeft: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: 1,
          title: "Invalid Invoices",
          status: "in_progress",
          priority: "medium",
          company: "Burger King",
          startDate: "2023-11-18",
          daysLeft: 2,
          createdAt: new Date().toISOString(),
        },
      ];
      setTickets(demoTickets);
      localStorage.setItem("ticketapp_tickets", JSON.stringify(demoTickets));
    }
  };

  const saveTickets = (updatedTickets: TicketData[]): void => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  const showToastMessage = (
    message: string,
    type: ToastType = "success"
  ): void => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.title || formData.title.trim().length === 0) {
      errors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 100) {
      errors.title = "Title must not exceed 100 characters";
    }

    if (!formData.status) {
      errors.status = "Status is required";
    } else if (!["open", "in_progress", "closed"].includes(formData.status)) {
      errors.status = "Invalid status value";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = (): void => {
    setModalMode("create");
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
      company: "",
      employee: "",
      startDate: "",
      endDate: "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleEdit = (ticket: TicketData): void => {
    setModalMode("edit");
    setCurrentTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description || "",
      status: ticket.status,
      priority: ticket.priority || "medium",
      company: ticket.company || "",
      employee: ticket.employee || "",
      startDate: ticket.startDate || "",
      endDate: ticket.endDate || "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleSubmit = (): void => {
    if (!validateForm()) {
      showToastMessage("Please fix the errors in the form", "error");
      return;
    }

    if (modalMode === "create") {
      const newTicket: TicketData = {
        id: Date.now(),
        ...formData,
        daysLeft: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedTickets = [...tickets, newTicket];
      saveTickets(updatedTickets);
      showToastMessage("Ticket created successfully!", "success");
    } else {
      if (!currentTicket) return;

      const updatedTickets = tickets.map((t) =>
        t.id === currentTicket.id
          ? { ...t, ...formData, updatedAt: new Date().toISOString() }
          : t
      );
      saveTickets(updatedTickets);
      showToastMessage("Ticket updated successfully!", "success");
    }

    setShowModal(false);
    setCurrentTicket(null);
  };

  const handleDeleteClick = (ticketId: number): void => {
    setDeleteTicketId(ticketId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = (): void => {
    if (deleteTicketId === null) return;

    const updatedTickets = tickets.filter((t) => t.id !== deleteTicketId);
    saveTickets(updatedTickets);
    showToastMessage("Ticket deleted successfully!", "success");
    setShowDeleteConfirm(false);
    setDeleteTicketId(null);
  };

  const filteredTickets: TicketData[] = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.company &&
        ticket.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 p-6">
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>

      {showToast && (
        <div
          className={`fixed top-5 right-5 ${
            toastType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in`}
        >
          {toastMessage}
        </div>
      )}

      {/* Content Area */}
      <div className="max-w-7xl mx-auto">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Ticket className="text-purple-600" size={28} />
            <h1 className="text-2xl font-bold text-gray-800">Tickets</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
          >
            Create A Task
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600">
                    Id
                  </th>
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600">
                    Company
                  </th> */}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600">
                    Start Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600">
                    Days Left
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600">
                    Issue
                  </th>
                  <th className="px-6 py-4 text-right">
                    <button
                      onClick={loadTickets}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ml-auto"
                    >
                      Refresh
                      <svg
                        className="w-4 h-4"
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
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <Ticket
                        size={48}
                        className="mx-auto mb-4 text-gray-300"
                      />
                      <p className="text-lg">No tickets found</p>
                      <button
                        onClick={handleCreate}
                        className="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
                      >
                        Create your first ticket
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {ticket.company || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {ticket.startDate || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(ticket)}
                          className="group relative"
                          title="Click to change status"
                        >
                          <span
                            className={`inline-block w-6 h-6 rounded-full transition-transform group-hover:scale-110 cursor-pointer ${
                              ticket.status === "open"
                                ? "bg-green-500"
                                : ticket.status === "in_progress"
                                ? "bg-orange-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {ticket.daysLeft || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {ticket.title}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(ticket)}
                            className="inline-flex items-center justify-center w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
                            title="Edit ticket"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(ticket.id)}
                            className="inline-flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                            title="Delete ticket"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {modalMode === "create" ? "Create Ticket" : "Edit Ticket"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="E-Invoice"
                    className={`w-full px-4 py-3 border text-black ${
                      formErrors.title ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {formErrors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as FormData["status"],
                      })
                    }
                    className={`w-full px-4 py-3 border text-black ${
                      formErrors.status ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white cursor-pointer`}
                  >
                    <option value="open">Open (Green)</option>
                    <option value="in_progress">In Progress (Orange)</option>
                    <option value="closed">Closed (Red)</option>
                  </select>
                  {formErrors.status && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.status}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                    <span>Open</span>
                    <span className="inline-block w-3 h-3 rounded-full bg-orange-500 ml-2"></span>
                    <span>In Progress</span>
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 ml-2"></span>
                    <span>Closed</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.employee}
                    onChange={(e) =>
                      setFormData({ ...formData, employee: e.target.value })
                    }
                    placeholder="Ahmed Mahmoud"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                    <Calendar
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                    <Calendar
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Lorem ipsum dolor sit amet consectetur adipiscing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum!"
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-black"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
              >
                {modalMode === "create" ? "Add Task" : "Update Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Delete Ticket?
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              This action cannot be undone. Are you sure you want to delete this
              ticket?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

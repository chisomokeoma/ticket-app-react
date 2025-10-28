import React, { ReactNode } from "react";
import { Mail } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="p-12">{children}</div>

        <div className="bg-linear-to-br from-indigo-100 to-gray-100 p-12 flex flex-col justify-center items-center relative">
          <div
            className="absolute w-24 h-24 rounded-full top-5 right-10"
            style={{ background: "rgba(255, 255, 255, 0.3)" }}
          />
          <div
            className="absolute w-16 h-16 rounded-full bottom-10 left-8"
            style={{ background: "rgba(255, 255, 255, 0.4)" }}
          />

          <div className="animate-float relative z-10">
            <div
              className="w-72 h-48 rounded-xl p-4 shadow-2xl relative"
              style={{
                background: "linear-gradient(135deg, #4A3F6F 0%, #667eea 100%)",
              }}
            >
              <div className="bg-white h-full rounded-lg p-3 flex flex-col gap-2">
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div
                    className="rounded-lg p-3 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                    }}
                  >
                    <Mail size={24} color="white" />
                  </div>

                  <div
                    className="rounded-full p-3 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
                    }}
                  >
                    <div className="w-3 h-4 bg-white rounded-t-lg rounded-b-sm" />
                  </div>

                  <div
                    className="rounded-lg p-3 flex items-end justify-center gap-1"
                    style={{
                      background: "linear-gradient(135deg, #3B82F6, #1E40AF)",
                    }}
                  >
                    <div className="w-1.5 h-3 bg-yellow-300 rounded-sm" />
                    <div className="w-1.5 h-5 bg-yellow-300 rounded-sm" />
                    <div className="w-1.5 h-2 bg-yellow-300 rounded-sm" />
                  </div>

                  <div
                    className="rounded-lg p-3"
                    style={{
                      background: "linear-gradient(135deg, #3B82F6, #1E40AF)",
                    }}
                  >
                    <div className="w-full h-full bg-amber-500 rounded" />
                  </div>

                  <div
                    className="rounded-full p-3 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #60A5FA, #3B82F6)",
                    }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>

                  <div
                    className="rounded-lg p-3 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B, #D97706)",
                    }}
                  >
                    <div className="w-4 h-4 border-3 border-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-24 h-8 bg-indigo-900 mx-auto rounded-b-lg" />
            <div className="w-40 h-3 bg-indigo-900 mx-auto rounded-lg" />

            <div className="mt-6 bg-indigo-900 text-white px-6 py-3 rounded-lg text-lg font-semibold text-center">
              Ticketing System
            </div>
          </div>

          <div
            className="absolute bottom-16 left-8 w-10 h-16 opacity-60 rounded-r-full -rotate-30"
            style={{ background: "linear-gradient(135deg, #3B82F6, #60A5FA)" }}
          />
          <div
            className="absolute bottom-20 right-10 w-10 h-16 opacity-60 rounded-l-full rotate-30"
            style={{ background: "linear-gradient(135deg, #60A5FA, #3B82F6)" }}
          />
        </div>
      </div>
    </div>
  );
}

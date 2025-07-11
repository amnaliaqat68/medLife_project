"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function loginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", form, {
        withCredentials: true 
      });
      if (response.status === 200) {
         const data = response.data; 
        // ✅ FIX: Removed localStorage.setItem since middleware uses cookies
        if (data.user.role === "superAdmin") router.push("/superadmin/dashboard");
      else if (data.user.role === "admin") router.push("/admin/dashboard");
      else if (data.user.role === "dsm") router.push("/dsm/dashboard"); // ✅ FIX: Updated to lowercase
      else alert("Unknown role. Contact system admin.");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
     
  };
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4 text-center">
          Sign Up for MedCSR
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all bg-gray-50 text-sm"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all bg-gray-50 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium shadow-sm transition-colors duration-200 text-sm"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}

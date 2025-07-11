"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
const router = useRouter();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  credentials: "include",
    });

    const data = await res.json();

    

   
    if (formData.role === "superAdmin") {
      router.push("/Superadmin/dashboard");
    } else {
      router.push("/");
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
              type="text"
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all bg-gray-50 text-sm"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all bg-gray-50 text-sm"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all bg-gray-50 text-sm"
            />
          </div>
          <div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="..."
            >
              <option value="">Select Role</option>
              <option value="superAdmin">SuperAdmin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium shadow-sm transition-colors duration-200 text-sm"
          >
            sign up
          </button>
        </form>
      </div>
    </main>
  );
}

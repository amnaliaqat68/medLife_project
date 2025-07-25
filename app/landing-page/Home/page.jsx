"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("User role:", data.user.role);

        // Redirect based on user role
        if (data.user.role === "superAdmin") {
          router.push("/Superadmin/dashboard");
        } else if (data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else if (data.user.role === "dsm") {
          router.push("/SMuser/dashboard");
        } else if (data.user.role === "sm") {
          router.push("/sm/dashboard");
        } else {
          setError("Unknown role. Please contact support.");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br  from-indigo-50 via-white to-teal-50">
      <header className="flex justify-between items-center w-full mx-auto px-6 py-4 bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-indigo-100">
        <div className="flex items-center space-x-3">
          <img
            src="/Medlife logo.png"
            alt="MedLife Logo"
            width={48}
            className="transition-transform hover:scale-105"
          />
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">
            MedLife
          </h1>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md">
          Log Out
        </button>
      </header>

      <section className="w-full bg-gradient-to-br from-white via-indigo-50 to-teal-50 mx-auto px-6 py-28 flex flex-col-reverse md:flex-row gap-16 items-center bg-cover bg-center bg-no-repeat relative">
        <div className="flex-1 z-10 ml-10">
          <h2 className="text-5xl font-extrabold  mb-6 text-indigo-900 leading-tight tracking-tight">
            Empowering MedLife's CSR <br /> with{" "}
            <span className="text-teal-400">MedCSR</span>
          </h2>
          <p className="text-lg text-black mb-8 max-w-xl leading-relaxed">
            MedCSR is MedLife's internal platform to digitally manage doctor
            commitments, streamline CSR approvals, and ensure ethical compliance
            — all in one place.
          </p>
        </div>

        <div className="w-full max-w-md bg-white p-8 mr-8 rounded-2xl shadow-xl border border-indigo-100 z-10">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">
            Login to Your Account
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 bg-gray-50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 bg-gray-50"
            />
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-semibold shadow-md transition-colors duration-300"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-5">
            New user?{" "}
            <Link
              href="/landing-page/signup"
              className="text-teal-500 hover:text-teal-600 font-semibold transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-white via-indigo-50 to-teal-50 py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-extrabold text-indigo-900 mb-4 tracking-tight">
              About MedLife
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              MedLife is a leading pharmaceutical company dedicated to
              delivering safe, effective, and innovative medications. With a
              strong commitment to social responsibility, we ensure our doctors,
              patients, and partners receive the best support through
              transparent and ethical practices.
            </p>
          </div>
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1681995751324-462c07cf331d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fG1lZGljaW5lfGVufDB8fDB8fHww"
              alt="MedLife Office"
              className="rounded-2xl shadow-xl border border-indigo-100 transition-transform hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-8 border-t border-indigo-100">
        © {new Date().getFullYear()} MedLife Pharmaceuticals. All rights
        reserved.
      </footer>
    </main>
  );
}

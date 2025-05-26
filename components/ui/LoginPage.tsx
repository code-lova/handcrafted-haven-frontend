"use client";

import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call login API
    console.log(form);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-white">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center font-playfair">
          Login to Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
          />
          <button
            type="submit"
            className="w-full bg-ctaBtn hover:bg-ctaBtnHover text-white py-3 rounded-md font-medium"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-olive underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;

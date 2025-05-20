"use client";

import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send data to backend
    console.log(form);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#F5F3EF]">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center font-playfair">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
          />
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
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-olive underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
